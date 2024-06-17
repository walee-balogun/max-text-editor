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
const authRouter = require('./src/routes/auth.routes');

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

    const authRoutes = diContainer.resolve('authRoutes');
    app.use('/api/auth', authRoutes);

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
       
        socket.on('join-document', async (documentId) => {

            if (!docs.has(documentId)) {
              const ydoc = new Y.Doc();
              docs.set(documentId, ydoc);
        
              const documentsService = diContainer.resolve('documentsService');
  
              const doc = await documentsService.getDocumentById(documentId);
  
              if (doc) {
                Y.applyUpdate(ydoc, Uint8Array.from(doc.content.data));
              }
  
            }
        
            const ydoc = docs.get(documentId);
            const provider = new WebsocketProvider(`ws://${config.server.host}:${config.server.port}`, documentId, ydoc);
            const ytext = ydoc.getText('document');
        
            socket.join(documentId);
        
            socket.emit('document', ytext.toString());
        
            socket.on('edit-document', async (content) => {
              ytext.delete(0, ytext.length);
              ytext.insert(0, content);
        
              const update = Y.encodeStateAsUpdate(ydoc);
              ydoc.applyUpdate(update);
        
              const documentsService = diContainer.resolve('documentsService');
              await documentsService.updateDocumentById(documentId, update);
  
              io.to(documentId).emit('document', ytext.toString());
  
            });

          });
          
    });

})();

process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");

    mongo.cleanup();

    process.exit(0);

});