const rotateTravels = require('../../service/rotateTravels');


test('should rotate days and create 29th Feb next year', async () => {

    const year = jest.fn(() => 2019);
    const format = jest.fn(() => '2019-04-20');

    const find = jest.fn(() => ([{
        _id: "1",
        origin: 1,
        destination: 4,
        date: "2019-02-28",
        weatherTempStatMax: "15",
        weatherTempStatMin: "8",
        carDuration: 100,
        carDistance: 80,
        priceHotel: 50,
        priceAirplane: 150
    }]));

    const updateOne = jest.fn(() => Promise.resolve({}));
    const insertOne = jest.fn(() => Promise.resolve({}));

    const collection = jest.fn(() => ({
        find,
        updateOne,
        insertOne
    }));

    // Run rotate days function
    await rotateTravels({
        year,
        format
    }, {
            collection
        });

    expect(year).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith('YYYY-MM-DD');

    expect(collection).toHaveBeenCalledWith('travels');
    expect(find).toHaveBeenCalledWith({ date: { $lt: '2019-04-20' } });
    expect(updateOne).toHaveBeenCalledWith({ _id: '1' }, { $set: { date: '2020-02-28' }, $unset: { priceAirplane: '', priceHotel: '' } });
    expect(insertOne).toHaveBeenCalledWith({
        origin: 1,
        destination: 4,
        date: "2020-02-29",
        weatherTempStatMax: "15",
        weatherTempStatMin: "8",
        carDuration: 100,
        carDistance: 80
    });
});

test('should rotate days and delete 29th Feb', async () => {

    const year = jest.fn(() => 2020);
    const format = jest.fn(() => '2020-04-20');

    const find = jest.fn(() => ([{
        _id: "1",
        origin: 1,
        destination: 4,
        date: "2020-02-29",
        weatherTempStatMax: "15",
        weatherTempStatMin: "8",
        carDuration: 100,
        carDistance: 80,
        priceHotel: 50,
        priceAirplane: 150
    }]));
    const remove = jest.fn(() => Promise.resolve({}));

    const collection = jest.fn(() => ({
        find,
        remove
    }));


    // Run rotate days function
    await rotateTravels({
        year,
        format
    }, {
            collection
        });

    expect(year).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith('YYYY-MM-DD');

    expect(collection).toHaveBeenCalledWith('travels');
    expect(find).toHaveBeenCalledWith({ date: { $lt: '2020-04-20' } });
    expect(remove).toHaveBeenCalledWith({ _id: '1' }, true);
});