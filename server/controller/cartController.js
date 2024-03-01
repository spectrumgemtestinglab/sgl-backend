import Cart from '../model/cartModel.js';
import express from 'express';

const cartController = express.Router();

//

cartController.post('/create', async (req, res) => {
  try {
    // Assuming req.body contains the necessary data for creating a new cart item
    const newCartItem = new CartItem(req.body);

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
  };
});

// Controller to delete a cart item
cartController.delete('/deleteCart/:cartItemId', async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;

    const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

    if (!deletedCartItem) {
      return res.status(404).json({ error: 'Cart item not found or already deleted' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    console.error('Error deleting Cart item:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Controller to get cart items by userIds
cartController.get('/getByUserId/:userIds', async (req, res) => {
  try {
    const userIds = req.params.userIds.split(','); // Assuming userIds are passed as comma-separated values

    const cartItems = await Cart.find({ userId: { $in: userIds } });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching Cart items by userIds:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default cartController;
