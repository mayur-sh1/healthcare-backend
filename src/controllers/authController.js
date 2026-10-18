const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, name: user.name, email: user.email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

module.exports = { register, login };
