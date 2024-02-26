import Cart from '../model/cartModel.js';
import express from 'express';

const cartController = express.Router();

// Controller to create a new cart item
cartController.post('/create', async (req, res) => {
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
      image, // Assuming the image is directly sent in the request body
    } = req.body;

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

export default cartController;