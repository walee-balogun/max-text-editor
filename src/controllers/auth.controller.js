const jwt = require('jsonwebtoken');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    const { username, password } = req.body;
    try {
      const user = await this.authService.registerUser(username, password);
      res.status(201).json({ userId: user._id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await this.authService.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async profile(req, res) {
    try {
      const user = await this.authService.getUserById(req.user.userId);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
