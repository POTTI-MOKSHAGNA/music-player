const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 
};

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      if (username === 'demo' && password === 'demo') {
        const user = { id: 1, username: 'demo', name: 'Demo User' };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('session', token, COOKIE_OPTIONS);

        return res.json({ message: 'Login successful', user });
      }

      res.status(401).json({ error: 'Invalid credentials' });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  async logout(req, res) {
    try {
      res.clearCookie('session');
      res.json({ message: 'Logout successful' });
    } catch (err) {
      console.error('Logout error:', err.message);
      res.status(500).json({ error: 'Logout failed' });
    }
  },

  async getSession(req, res) {
    try {
      const token = req.cookies.session;
      if (!token) return res.json({ isAuthenticated: false });

      const user = jwt.verify(token, JWT_SECRET);
      res.json({ isAuthenticated: true, user });
    } catch (err) {
      console.error('Session error:', err.message);
      res.clearCookie('session');
      res.json({ isAuthenticated: false });
    }
  },

  async register(req, res) {
    try {
      const { username, password, name } = req.body;

      if (!username || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const user = { id: Date.now(), username, name };
      res.json({ message: 'Registration successful', user });
    } catch (err) {
      console.error('Registration error:', err.message);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

module.exports = authController;
