// cartController.js
import Cart from '../model/cartModel.js';
import multer from 'multer';
import mongoose from 'mongoose';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.find();
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createCart: [
    upload.single('image'),
    async (req, res) => {
      try {
        const {
          quantity,
          name,
          price,
          weight,
          colour,
          units,
          value,
          shape,
          dimensions,
          transparency,
          hardness,
          microscopicexamination,
          size,
          clarity,
          subtype
        } = req.body;
        

        // Check if req.user is defined and has the username property
        const username = req.user && req.user.username;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        // Check if required fields are missing
        if (!username || !name || !price) {
          return res.status(400).json({ error: 'Username, name, and price are required fields' });
        }

        const cart = new Cart({
          username,
          quantity,
          name,
          price,
          weight,
          colour,
          units,
          value,
          shape,
          dimensions,
          transparency,
          hardness,
          microscopicexamination,
          size,
          clarity,
          image,
          subtype
        });

        const savedCart = await cart.save();

        res.status(201).json(savedCart);
      } catch (error) {
        console.error('Error creating Cart:', error);
        res.status(400).json({ error: 'Failed to create Cart', details: error.message });
      }
    },
  ],

  deleteCart: async (req, res) => {
    try {
      const cartId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ error: 'Invalid cart ID' });
      }

      const deleteCart = await Cart.findByIdAndDelete(cartId);

      if (!deleteCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      res.status(200).json({ message: 'Cart deleted successfully', deletedCart: deleteCart });
    } catch (error) {
      console.error('Error deleting cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default cartController;
