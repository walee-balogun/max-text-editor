const { MongoClient, ObjectId } = require('mongodb');

let client;

const getMongoURL = (config) => {

    console.log('--- config ---');
    console.log(config);

    const { env } = config.server;

    const { dbName, hostname, host, password, port, username } = config.database.mongo;

    if (hostname && env == 'local') {
        return `mongodb://${host}:${port}/${dbName}`;
    }

    const uri = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${dbName}?authSource=admin`;
    //const uri = `mongodb://${host}:${port}/${dbName}?retryWrites=true&w=majority`;
    console.log('uri: ', uri);
    return uri;

};

const connect = async (config) => {

    const { dbName } = config.database.mongo;
    const mongoUri = getMongoURL(config);

    console.log('mongoUri: ', mongoUri)

    try {

        client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

        const clientConnn = await client.connect();

        const db = clientConnn.db(dbName);

        console.log(`Connection to database: ${dbName} was successful`);

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
        process.on('SIGHUP', cleanup);

        return db;

    } catch (err) {
        console.error('--- MongoDB connection error ---');
        console.error(err);

        cleanup();
    }

}

const getClient = () => {

    if (!client) {
        
        throw new Error('MongoDB client has not been initialized.');
    }

    return client;
};

const cleanup = (client) => {

    client = getClient();

    if (client) {
        client.close();
    }
}

module.exports = Object.assign({}, { connect, cleanup, getClient });
