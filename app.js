const path = require('path');
const express = require('express')
const http = require('http');
const mongo = require('./src/database/mongo');
const di = require('./src/di/di');
const dotenv = require('dotenv');
dotenv.config({ path: ['.env.local', '.env'] });
const config = require('./config');
console.log(process.env); // remove this after you've confirmed it is working
const routes = require('./src/routes');
const socketIo = require('socket.io');
const { WebsocketProvider } = require('y-websocket');

const docs = new Map();

(async () => {
    const app = express();

    app.set('view engine', 'ejs');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

        next();
    });

    const mongoDb = await mongo.connect(config);

    const diContainer = di.init({ mongoDb, app, config });

    //routes.init({ diContainer });

    const documentsRoutes = diContainer.resolve('documentsRoutes');
    app.use('/api/documents', documentsRoutes);

    const server = http.createServer(app);
    server.listen(config.server.port, () => {
        console.log(`${config.app.name} is running`);
        console.log(`   listening on port: ${config.server.port}`);
        console.log(`   environment: ${config.server.env.toLowerCase()}`);
    });

    const io = socketIo(server);

    io.on('connection', (socket) => {
       
    });

})();

process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");

    mongo.cleanup();

    process.exit(0);

});