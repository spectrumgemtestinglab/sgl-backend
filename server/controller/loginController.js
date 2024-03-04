import bcrypt from 'bcrypt';
import User from '../model/loginModel.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });
const userController = {
  signup: [
    upload.single('image'), // Updated field name to match the frontend
    async function (req, res) {
      try {
        const { email, password, username, whatsapp, address } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Check if the request contains a file
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
          image: req.file.buffer.toString('base64'), // Save image as base64 string
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Failed to signup' });
      }
    },
  ],

    // login: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await User.findOne({ email });

    //         if (!user) {
    //             return res.status(404).json({ message: "User not found" });
    //         }

    //         const isPasswordValid = await bcrypt.compare(password, user.password);

    //         if (!isPasswordValid) {
    //             return res.status(401).json({ error: "Invalid password" });
    //         }

    //         res.status(200).json({ message: "Login successful" });
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         res.status(500).json({ error: 'Failed to login' });
    //     }
    // },



    login: async function (req, res) {
      try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
    
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
    },
    

   // generateOTP function with added logging
// generateOTP function to log OTP to console without sending an email

generateOTP: async (req, res) => {
    try {
        const { email } = req.body;
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

        // console.log('Generated OTP:', generatedOTP);

        // Save OTP to the database
        const user = await User.findOneAndUpdate({ email }, { otp: generatedOTP, otpCreatedAt: new Date() }, { new: true });

        if (!user) {
            console.error('User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'OTP generated successfully', generatedOTP });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
},




    verifyOTP: async (req, res) => {
        try {
            const { email, otp } = req.body;

            // Check if the provided OTP is valid
            const user = await User.findOne({ email, otp, otpCreatedAt: { $gt: new Date(new Date() - 5 * 60000) } });

            if (user) {
                // OTP is valid
                res.status(200).json({ message: 'OTP verification successful' });
            } else {
                // OTP is invalid or expired
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
    
          // Check if the provided OTP is valid and not expired
          const user = await User.findOne({
            email,
            otp,
            otpCreatedAt: { $gt: new Date(new Date() - 5 * 60000) },
          });
    
          if (!user) {
            // OTP is invalid or expired
            return res.status(401).json({ error: 'Invalid or expired OTP' });
          }
    
          // Update the user's password with the new one
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
          user.otp = null; // Clear the OTP after successful reset
          user.otpCreatedAt = null;
    
          await user.save();
    
          res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
          console.error('Error during password reset:', error);
          res.status(500).json({ error: 'Failed to reset password' });
        }
      },
        
};

export default userController;
