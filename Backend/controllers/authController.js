const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: '1h'
    });

    res.status(201).send({ user, token });
  } catch (error) {
    console.log("THis is error",error)
    res.status(400).send({ error: 'Registration failed.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: '1h'
    });

    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: 'Login failed.' });
  }
};

module.exports = { register, login };