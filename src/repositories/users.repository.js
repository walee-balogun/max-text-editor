const { ObjectId } = require('mongodb');
const UserModel = require('../models/user.model');

class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(/* firstName, lastName, email,  */username, password) {
    const user = new UserModel({ /* firstName, lastName, email, */ username });
    await user.setPassword(password);
    const result = await this.collection.insertOne(user.toJSON());
    user._id = result.insertedId;
    return user;
  }

  async findByUsername(username) {
    const userDocument = await this.collection.findOne({ username });
    if (doc) {
      return UserModel.fromDocument(userDocument);
    }
    return null;
  }

  async findById(id) {
    const userDocument = await this.collection.findOne({ _id: new ObjectId(id) });
    if (doc) {
      return UserModel.fromDocument(userDocument);
    }
    return null;
  }
}

module.exports = UserRepository;
