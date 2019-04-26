const MongoClient = require('mongodb').MongoClient;
require('log-timestamp');

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

let client;

const connect = async () => {
    client = new MongoClient('mongodb://' + MONGO_USER + ':' + MONGO_PASS + '@' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB, { useNewUrlParser: true });

    try {
        await client.connect();
        console.log("Connected to DB " + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DB);
        const db = client.db(MONGO_DB);
        return db;
    } catch (err) {
        console.log(err.stack);
    }
}

const close = async () => {
    await client.close();
    console.log("Connection to DB is closed");
}

module.exports = { connect, close };