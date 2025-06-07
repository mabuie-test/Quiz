const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// Registo
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  res.json({ msg: 'Registo concluído.' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Credenciais inválidas.' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: 'Credenciais inválidas.' });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
