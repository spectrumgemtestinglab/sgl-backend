import UserOrders from "../model/userOrderModel.js";

const userOrderController = {
  createUserOrder: async (req, res) => {
    try {
      const newUserOrder = await UserOrders.create(req.body);
      res.status(201).json(newUserOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllUserOrders: async (req, res) => {
    try {
      const userOrders = await UserOrders.find();
      res.status(200).json(userOrders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateUserOrder: async (req, res) => {
    try {
      const updatedUserOrder = await UserOrders.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedUserOrder) {
        return res.status(404).json({ error: 'User order not found' });
      }

      res.status(200).json(updatedUserOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteUserOrder: async (req, res) => {
    try {
      const deletedUserOrder = await UserOrders.findByIdAndDelete(req.params.id);
      if (!deletedUserOrder) {
        return res.status(404).json({ error: 'User order not found' });
      }
      res.status(200).json(deletedUserOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};

export default userOrderController;
