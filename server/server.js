import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './conn.js';
import router from './routes.js';
import { json } from 'express';
import bcrypt from 'bcryptjs';
import Login from './Model.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json({ limit: '10mb' }));
connectToMongoDB();
app.use(json());
app.use('/', router);
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, whatsapp, imageBase64, address } = req.body;
      console.log('Received data:', { username, email, password, whatsapp, imageBase64, address });
    const existingUser = await Login.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageBuffer = Buffer.from(imageBase64, 'base64');

    const newUser = new Login({
      username,
      email,
      password: hashedPassword,
      whatsapp,
      image: imageBuffer.toString('base64'),
      address,
     
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password, whatsapp, imageBase64, address } = req.body;

//     console.log('Received data:', { username, email, password, whatsapp, imageBase64, address });

//     // ... rest of the code
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.post('/login', async (req, res) => {
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
      address:user.address,
      
    };
    res.status(200).json({
      message: 'Login successful',
      user: userDataToSend,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAllUsers', async (req, res) => {
  try {
    const users = await Login.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/forgot-password', async (req, res) => {
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
});

app.delete('/deleteUser/:userId', async (req, res) => {
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

  app.post('/logout', (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Logout successful' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.put('/editUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, whatsapp, imageBase64, address,password } = req.body;

    // Implement your logic to update user details here
    const updatedUser = await Login.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          email,
          whatsapp,
          image: Buffer.from(imageBase64, 'base64').toString('base64'),
          address,
          password
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

startServer();
