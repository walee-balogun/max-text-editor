
module.exports = {
    app: {
        name: process.env.APP_NAME || "Max Text Editor"
    },
    server: {
        env: process.env.ENV || "development",
        host: process.env.HOST || "127.0.0.1",
        hostname: process.env.HOST_NAME || "localhost",
        port: parseInt(process.env.PORT) || 3000,
    },
    database: {
        mongo: {
            host: process.env.MONGO_DB_HOST || "127.0.0.1",
            hostname: process.env.MONGO_DB_HOST_NAME || "localhost",
            port: process.env.MONGO_DB_PORT || "27017",
            username: process.env.MONGO_DB_USERNAME || "wale",
            password: process.env.MONGO_DB_PASSWORD || "P@33w0rd.123$",
            dbName: process.env.MONGO_DB_DB_NAME || "max-text-editor"
        }
    }
}