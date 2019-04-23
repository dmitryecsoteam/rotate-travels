//const mongo = require('../server/mongo');
//const moment = require('moment');

const rotateTravels = async (today, db) => {

    const nextYear = today.year() + 1;
    const isLeapYear = ((nextYear % 4 == 0) && (nextYear % 100 != 0)) || (nextYear % 400 == 0);

    try {

        // find all travels that are older than today date
        await db.collection('travels').find({ date: { $lt: today.format('YYYY-MM-DD') } })
            .forEach(async (travel) => {

                // if the date IS NOT 29th Feb roll it to the next year
                // remove unactual info, such as prices
                if (travel.date.substring(5) !== "02-29") {
                    const newDate = nextYear + travel.date.substring(4);
                    try {
                        await db.collection('travels').updateOne(
                            {
                                _id: travel._id
                            },
                            {
                                $set: {
                                    date: newDate
                                },
                                $unset: {
                                    priceAirplane: '',
                                    priceHotel: ''
                                }
                            }
                        );
                    } catch (e) {
                        console.log("Error while updating date for next year");
                        console.log(e);
                    }

                    // copy data from 28th Feb to 29th Feb if next year is leap
                    if (isLeapYear && (travel.date.substring(5) === "02-28")) {

                        try {
                            const insertTravel = {
                                origin: travel.origin,
                                destination: travel.destination,
                                date: nextYear + "-02-29"
                            };
                            if (travel.weatherTempStatMax) { insertTravel.weatherTempStatMax = travel.weatherTempStatMax; }
                            if (travel.weatherTempStatMin) { insertTravel.weatherTempStatMin = travel.weatherTempStatMin; }
                            if (travel.carDuration) { insertTravel.carDuration = travel.carDuration; }
                            if (travel.carDistance) { insertTravel.carDistance = travel.carDistance; }

                            await db.collection('travels').insertOne(insertTravel);
                        } catch (e) {
                            console.log("Error while inserting 29th February for next year");
                            console.log(e);
                        }
                    }
                } else {
                    // remove 29th Febraury
                    try {
                        await db.collection('travels').remove({ _id: travel._id }, true);
                    } catch (e) {
                        console.log("Error while removing 29th February");
                        console.log(e);
                    }
                }
            });
    } catch (err) {
        console.log(err);
    }
}

module.exports = rotateTravels;