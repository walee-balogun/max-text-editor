
class DocumentsController {

    constructor({ documentsService }) {
        console.log('--- documentsService ---');
        console.log(documentsService);

        this.documentsService = documentsService;
      }

    async createDocument(req, res) {

        try {

            const id = await this.documentsService.createDocument();

            return res.status(201).json({
                id
            });

        } catch (err) {

            console.error('--- err');
            console.error(err);

            return res.status(500).json({
                error: 'Failed to create document'
            });
        }
    }

    async getDocumentById(req, res) {

        try {
            const docId = req.params.id;

            const document = await this.documentsService.getDocumentById(docId);
      
            if (document) {

                return res.status(200).json({
                    content: document.content.toString('utf-8')
                });

            } else {

                return res.status(404).json({
                    error: 'Document not found'
                });

            }

        } catch (err) {

            console.error('--- err');
            console.error(err);

            return res.status(500).json({
                error: 'Failed to retrieve document'
            });

        }
    }

};

module.exports = DocumentsController;