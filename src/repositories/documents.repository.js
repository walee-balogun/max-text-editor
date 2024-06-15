class DocumentsRepository {

    constructor({ documentModel }) {

        this.documentModel = documentModel;
    }

    async createDocument(content) {

        return await this.documentModel.create(content);
    }

    async getDocumentById(id) {

        return await this.documentModel.findById(id);
    }

    async updateDocumentById(id, content) {

        return await this.documentModel.update(id, content);
    }
}

module.exports = DocumentsRepository;