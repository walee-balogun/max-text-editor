class AuthService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async registerUser(username, password) {
      const existingUser = await this.userRepository.findByUsername(username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
      return await this.userRepository.create(username, password);
    }
  
    async authenticateUser(username, password) {
      const user = await this.userRepository.findByUsername(username);
      if (user && await user.validatePassword(password)) {
        return user;
      }
      return null;
    }
  
    async getUserById(id) {
      return await this.userRepository.findById(id);
    }
  }
  
  module.exports = AuthService;
  