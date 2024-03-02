import Cart from '../model/cartModel.js'

const cartController = {
  createCartItem: async (req, res) => {
    try {
      const requestData = req.body;
      const cartItem = new Cart(requestData);
      await cartItem.save();

      res.status(201).json({ message: "Cart item created successfully",cartItem });
    } catch (error) {
      console.error("Error creating cart item:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllCartItems: async (req, res) => {
    try {
      const allCartItems = await Cart.find();
      res.status(200).json(allCartItems);
    } catch (error) {
      console.error("Error getting all cart items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getByUserIds: async (req, res) => {
    const { userIds } = req.params;
  
    try {
      const cartItems = await Cart.find({ userIds });
      
      if (cartItems.length === 0) {
        return res.status(404).json({ error: 'No cart items found for the specified userIds' });
      }
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get cart items by userIds' });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const {id} = req.params;

      if (!id) {
        return res.status(400).json({ message: "Cart ID is required for deletion" });
      }

      const deleteItem = await Cart.findByIdAndDelete(id);

      if (!deleteItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUserCart: async (req, res) => {
    try {
      const { userIds } = req.body; // Use userIds instead of userId
  
      if (!userIds) {
        return res.status(400).json({ message: "UserIds is required for deletion" });
      }
  
      const deleteResult = await Cart.deleteMany({ userIds });
  
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ message: "No cart items found for the specified UserIds" });
      }
  
      res.status(200).json({ message: "Cart items deleted successfully for the specified UserIds" });
    } catch (error) {
      console.error("Error deleting user cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  

  deleteAllCartItems: async (req, res) => {
    try {
      const deleteResult = await Cart.deleteMany();

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ message: "No cart items found to delete" });
      }

      res.status(200).json({ message: "All cart items deleted successfully" });
    } catch (error) {
      console.error("Error deleting all cart items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default cartController;
