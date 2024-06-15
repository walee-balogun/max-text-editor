const express = require('express');
const router = express.Router();

const documentRoutes = ({ documentsController }) => {
    
    const { createDocument, getDocumentById } = documentsController;

    router.post('/', (req, res) => documentsController.createDocument(req, res));
    router.get('/:id', (req, res) => documentsController.getDocumentById(req, res));

    return router;
};

module.exports = documentRoutes;