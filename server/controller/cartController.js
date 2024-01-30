// cartController.js
import Cart from '../model/cartModel.js';

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { itemId } = req.params;
      const { quantity } = req.body;

      // Validate quantity
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      // Access user information from session or authentication middleware
      const userId = req.session.user._id; // Adjust this based on your authentication mechanism

      // Find the user's cart or create a new one if it doesn't exist
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = await Cart.create({
          userId,
          items: [],
        });
      }

      // Check if the item is already in the cart
      const existingCartItem = cart.items.find(
        (cartItem) => cartItem.itemId.toString() === itemId
      );

      if (existingCartItem) {
        // If the item is already in the cart, update the quantity
        existingCartItem.quantity += quantity;
      } else {
        // If the item is not in the cart, add a new cart item
        cart.items.push({ itemId, quantity });
      }

      // Save the updated cart
      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      console.error('Error in addToCart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getCart: async (req, res) => {
    try {
      // Access user information from session or authentication middleware
      const userId = req.session.user._id; // Adjust this based on your authentication mechanism

      const cart = await Cart.findOne({ userId }).populate('items.itemId');

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error('Error in getCart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default cartController;
