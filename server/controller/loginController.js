import bcrypt from 'bcrypt';
import User from '../model/loginModel.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jobminarinfo@gmail.com',
    pass: 'yqsp pvul xaww tpyi',
  },
});

const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const userController = {
  signup: async (req, res) => {
    try {
      const { email, password, username, whatsapp, address } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        username,
        whatsapp,
        address,
        image: req.file.buffer.toString('base64'),
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Failed to signup' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  },

  generateOTP: async (req, res) => {
    try {
      const { email } = req.body;
      const generatedOTP = generateOTP();

      await User.findOneAndUpdate(
        { email },
        { otp: generatedOTP, otpCreatedAt: new Date() },
        { new: true }
      );

      await transporter.sendMail({
        from: 'chandrasekhar8120@gmail.com',
        to: email,
        subject: 'Your OTP',
        html: `<p>Your OTP: ${generatedOTP}</p>`,
      });

      res.status(200).json({ message: 'OTP generated and sent successfully' });
    } catch (error) {
      console.error('Error generating OTP:', error);
      res.status(500).json({ error: 'Failed to generate OTP' });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({
        email,
        otp,
        otpCreatedAt: { $gt: new Date(new Date() - 5 * 60000) },
      });

      if (user) {
        res.status(200).json({ message: 'OTP verification successful' });
      } else {
        res.status(401).json({ error: 'Invalid or expired OTP' });
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;

      const user = await User.findOne({
        email,
        otp,
        otpCreatedAt: { $gt: new Date(new Date() - 5 * 60000) },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid or expired OTP' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.otp = null;
      user.otpCreatedAt = null;

      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error during password reset:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  },
  
  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(500).json({ error: 'Failed to fetch user by email' });
    }
  },
    

  
  updatePassword: async (req, res) => {
    try {
      const { email, currentPassword, newPassword } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save();

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error during password update:', error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  },

};

export default userController;
