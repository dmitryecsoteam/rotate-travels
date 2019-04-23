const mongo = {
    connect: jest.fn(() => Promise.resolve({
        collection: (col) => {
            if (col === 'travels') return {
                find: jest.fn(({ date }) => {
                    
                    if (date.$lt === '2019-04-20') return [{
                        _id: "1",
                        origin: 1,
                        destination: 2,
                        date: "2019-02-19",
                        weatherTempStatMax: "10",
                        weatherTempStatMin: "3",
                        carDuration: 400,
                        carDistance: 500,
                        priceAirplane: 100,
                        priceHotel: 15
                    },
                    {
                        _id: "2",
                        origin: 1,
                        destination: 3,
                        date: "2019-02-19",
                        weatherTempStatMax: "12",
                        weatherTempStatMin: "5",
                        carDuration: 300,
                        carDistance: 250,
                        priceAirplane: 150,
                        priceHotel: 20
                    },
                    {
                        _id: "3",
                        origin: 1,
                        destination: 4,
                        date: "2019-02-28",
                        weatherTempStatMax: "15",
                        weatherTempStatMin: "8",
                        carDuration: 100,
                        carDistance: 80,
                        priceHotel: 50
                    }]
                })
            }

        }
    })),
    close: jest.fn(() => Promise.resolve({}))
}

module.exports = mongo;