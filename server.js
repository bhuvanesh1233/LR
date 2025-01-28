const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// User Model
const User = mongoose.model('User', new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
}));

// Register Route
app.post('/register', async (req, res) => {
   const { username, password } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new User({ username, password: hashedPassword });
   await newUser.save();
   res.send('User registered successfully');
});

// Login Route
app.post('/login', async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });
   if (!user) return res.status(400).send('User not found');
   
   const validPassword = await bcrypt.compare(password, user.password);
   if (!validPassword) return res.status(400).send('Invalid credentials');

   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_secret_key
