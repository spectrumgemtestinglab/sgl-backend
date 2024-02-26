import Cart from '../model/cartModel.js';
import multer from 'multer';
import express from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cartController = express.Router();

// Controller to create a new cart item
cartController.post('/create', upload.single('image'), async (req, res) => {
  try {
    const {
      clarity,
      colour,
      dimensions,
      hardness,
      name,
      quantity,
      shape,
      size,
      subtype,
      transparency,
      units,
      userIds,
      weight,
    } = req.body;

    const image = req.file ? req.file.buffer.toString('base64') : '';

    const newCartItem = new Cart({
      clarity,
      colour,
      dimensions,
      hardness,
      image,
      name,
      quantity,
      shape,
      size,
      subtype,
      transparency,
      units,
      userIds,
      weight,
    });

    const savedCartItem = await newCartItem.save();

    res.status(201).json({ message: 'Cart item created successfully', cartItem: savedCartItem });
  } catch (error) {
    console.error('Error creating Cart item:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Controller to get all cart items
cartController.get('/getAll', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching Cart items:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default cartController;
