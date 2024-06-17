const { createContainer, asValue, asFunction, asClass } = require('awilix');
const documentsRoutes = require('./../routes/documents.routes');
//const routes = require('./../routes');
const DocumentsController = require('./../controllers/documents.controller');
const DocumentsService = require('./../services/documents.service');
const DocumentsRepository = require('./../repositories/documents.repository');
const DocumentModel = require('./../models/document.model');
const UserModel = require('./../models/user.model');
const UserRepository = require('../repositories/users.repository');
const AuthService = require('../services/auth.service');
const AuthController = require('../controllers/auth.controller');
const authRoutes = require('../routes/auth.routes');


const init = ({ mongoDb, app, config }) => {

    const container = createContainer();

    const documentsCollection = mongoDb.collection('documents');
    const usersCollection = mongoDb.collection('users')

    container.register({
        app: asValue(app),
        config: asValue(config),
        mongoDb: asValue(mongoDb),
        documentsCollection: asValue(documentsCollection),
        usersCollection: asValue(usersCollection),
        //documentModel: asClass(() => new DocumentModel(documentsCollection)).singleton(),
        documentModel: asFunction(() => new DocumentModel(documentsCollection)).singleton(),
        documentsRepository: asClass(DocumentsRepository).singleton(),
        documentsService: asClass(DocumentsService).singleton(),
        documentsController: asClass(DocumentsController).singleton(),
        documentsRoutes: asFunction(documentsRoutes).singleton(),
        userRepository: asClass(UserRepository).singleton(),
        authService: asClass(AuthService).singleton(),
        authController: asClass(AuthController).singleton(),
        authRoutes: asFunction(authRoutes).singleton(),
        //routes: asFunction(routes)
    });

    return container;
};

module.exports = Object.assign({}, { init });