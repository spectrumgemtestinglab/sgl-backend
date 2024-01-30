//cartController.js

import Cart from '../model/cartModel.js'

const cartController = {
  // Add item to cart
  addToCart: async (req, res) => {
    try {
      // ... (previous cod

      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      cart.items.push(cartItem);
      cart.totalAmount += product.price * quantity;

      await cart.save();

      return res.status(201).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },


  // Ge
  getCart: async (req, res) => {
    try {
      const userId = req.user._id; // Adjust this based on your authentication setup

      const cart = await Cart.findOne({ user: userId }).populate('items.item', 'name price');

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      return res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Update item quantity in cart
  updateCartItem: async (req, res) => {
    try {
      const { cartItemId, quantity } = req.body;

      const userId = req.user._id; // Adjust this based on your authentication setup

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const cartItem = cart.items.id(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      const product = await Product.findById(cartItem.item);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      cart.totalAmount += (quantity - cartItem.quantity) * product.price;
      cartItem.quantity = quantity;

      await cart.save();

      return res.status(200).json({ message: 'Cart item updated successfully', cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const { cartItemId } = req.params;

      const userId = req.user._id; // Adjust this based on your authentication setup

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const cartItem = cart.items.id(cartItemId);

      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      const product = await Product.findById(cartItem.item);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      cart.totalAmount -= cartItem.quantity * product.price;

      cartItem.remove();
      await cart.save();

      return res.status(200).json({ message: 'Cart item removed successfully', cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

export default cartController;
