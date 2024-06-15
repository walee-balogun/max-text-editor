const Y = require('yjs');

class DocumentsService {

    constructor({ documentsRepository }) {

        this.documentsRepository = documentsRepository;
    }

    async createDocument() {

        const ydoc = new Y.Doc();
        const content = Y.encodeStateAsUpdate(ydoc);
      
        return await this.documentsRepository.createDocument(content);
    }

    async getDocumentById(id) {

        return await this.documentsRepository.getDocumentById(id);
    }

    async updateDocumentById(id, content) {

        return await this.documentsRepository.updateDocumentById(id, content);
    }
}

module.exports = DocumentsService;
