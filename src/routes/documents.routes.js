const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');

const documentRoutes = ({ documentsController }) => {
    
    router.post('/', ensureAuthenticated, documentsController.createDocument);
    router.get('/:id', ensureAuthenticated, documentsController.getDocumentById);

    return router;
};

module.exports = documentRoutes;