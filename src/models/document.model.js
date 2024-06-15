const { ObjectId } = require('mongodb');

class DocumentModel {

  constructor(collection) {

    this.collection = collection
  }

  async create(content) {

    const result = await this.collection.insertOne({ content: Buffer.from(content) });

    return result.insertedId;
  }

  async findById(id) {

    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, content) {

    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { content: Buffer.from(content) } },
      { upsert: true }
    );
  }
}

//module.exports = (mongoDb) => new DocumentModel(mongoDb);
module.exports = DocumentModel;