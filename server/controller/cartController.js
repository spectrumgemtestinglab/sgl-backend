import Cart from '../model/cartModel.js'

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { itemId } = req.params;
      const { quantity } = req.body;

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      // Check if the user has an existing cart
      let cart = await Cart.findOne({ userId: req.user.id });

      if (!cart) {
        // If no cart exists, create a new one for the user
        cart = await Cart.create({
          userId: req.user.id,
          items: [{ itemId, quantity }],
        });
      } else {
        // If a cart exists, check if the item is already in the cart
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
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCart: async (req, res) => {
    try {
      
      const cart = await Cart.findOne({ userId: req.user.id }).populate(
        'items.itemId'
      );

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

export default cartController;
