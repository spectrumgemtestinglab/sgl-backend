import Cart from '../model/cartsModel.js';

const cartsController = {
  createCart: async (req, res) => {
    try {
      const newCart = await Cart.create(req.body);
      res.status(201).json(newCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
      if (!deletedCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      res.status(200).json(deletedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cartsController;
