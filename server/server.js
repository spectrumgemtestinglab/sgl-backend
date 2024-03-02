import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './conn.js';
import router from './routes.js';
import bcrypt from 'bcryptjs';
import Login from './Model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(router);

// Routes
app.post('/signup', signUp);
app.post('/login', login);
app.get('/getAllUsers', getAllUsers);
app.post('/forgot-password', forgotPassword);
app.put('/updateUser/:userId', updateUser);
app.delete('/deleteUser/:userId', deleteUser);

// Server
let server;

const startServer = async () => {
  try {
    await connectToMongoDB();
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  if (server) {
    await server.close(() => {
      console.log('Server closed');
      connectToMongoDB().then(() => process.exit(0));
    });
  }
};

process.on('SIGINT', async () => {
  console.log('Received SIGINT signal');
  await shutdownServer();
});

process.on('uncaughtException', async (error) => {
  console.error(error);
  await shutdownServer();
  process.exit(1);
});

// Route Handlers
async function signUp(req, res) {
  try {
    const { username, email, password, whatsapp, imageBase64, address } = req.body;

    const existingUser = await Login.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    const newUser = new Login({ username, email, password: hashedPassword, whatsapp, image: imageBuffer.toString('base64'), address });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const userDataToSend = {
      _id: user._id,
      username: user.username,
      email: user.email,
      whatsapp: user.whatsapp,
      image: user.image,
      address: user.address,
    };

    res.status(200).json({
      message: 'Login successful',
      user: userDataToSend,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await Login.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email, whatsapp, newPassword } = req.body;

    const user = await Login.findOne({ email, whatsapp });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { username, email, password, whatsapp, imageBase64, address } = req.body;

    const user = await Login.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (whatsapp) user.whatsapp = whatsapp;
    if (imageBase64) {
      const imageBuffer = Buffer.from(imageBase64, 'base64');
      user.image = imageBuffer.toString('base64');
    }
    if (address) user.address = address;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    const user = await Login.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Generic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

startServer();
