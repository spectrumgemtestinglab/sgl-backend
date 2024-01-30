import Cart from '../model/cartModel.js';
import multer from 'multer';
import mongoose from 'mongoose';
//
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
          id,
          quantity,
          name,
          price,
          weight,
          colour,
          units,
          value,
          shape,
          dimenensions,
          transparency,
          hardness,
          microscopicexamination,
          size,
          clarity,
          subtype
        } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        if (
          !id ||
          !quantity ||
          !name ||
          !price ||
          !weight ||
          !colour ||
          !units ||
          !value ||
          !shape ||
          !dimenensions ||
          !transparency ||
          !hardness ||
          !microscopicexamination
        ) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const cart = new Cart({
          id,
          quantity,
          name,
          price,
          weight,
          colour,
          units,
          value,
          shape,
          dimenensions,
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

      // Check if the provided ID is valid
      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({ error: 'Invalid cart ID' });
      }

      console.log('Received Cart ID:', cartId);

      const deleteCart = await Cart.findByIdAndDelete(cartId);
      console.log('Deleted cart:', deleteCart); // Add this line for debugging

      if (!deleteCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      res.status(200).json({ message: 'cart deleted successfully', deletedGem: deleteCart });
    } catch (error) {
      console.error('Error deleting cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default cartController;
