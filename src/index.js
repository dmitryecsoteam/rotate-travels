const rotateTravels = require('./service/rotateTravels');
const mongo = require('./server/mongo');
const moment = require('moment');

const run = async () => {

    // Connect to mongo DB
    const db = await mongo.connect();

    await rotateTravels(moment(), db);

    await mongo.close();
}

run();