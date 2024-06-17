const bcrypt = require('bcrypt');

class UserModel {
  constructor({ _id, firstName, lastName, email, username, password }) {
    this._id = _id;
    /* this.firstName = firstName,
    this.lastName = lastName;
    this.email = email; */
    this.username = username;
    this.password = password;
  }

  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    return {
      _id: this._id,
      /* firstName: this.firstName,
      lastName: this.lastName,
      email: this.email, */
      username: this.username,
      password: this.password
    };
  }

  static fromDocument(document) {
    return new UserModel(document);
  }
}

module.exports = UserModel;
