import Orders from "../model/ordersModel.js";

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const { userName, items, orderId, date, status, address, totalPrice } = req.body;

      const newOrder = await Orders.create({
        userName,
        items,
        orderId,
        date,
        status,
        address,
        totalPrice
      });

      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const allOrders = await Orders.find();
  
      // Format the date field to "yyyy-MM-dd"
      const formattedOrders = allOrders.map(order => ({
        ...order.toObject(),
        date: new Date(order.date).toLocaleDateString('en-GB'), // Adjust the locale as needed
      }));
  
      res.status(200).json(formattedOrders);
    } catch (error) {
      console.error('Error getting all orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  

 
  editOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const existingOrder = await Orders.findOne({ orderId });

      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(existingOrder);
    } catch (error) {
      console.error('Error editing order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      console.log('Received Order ID for Update:', orderId);
      // ... (rest of the code)
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  



deleteOrder: async (req, res) => {
  try {
    const { orderId } = req.params; 

    if (!orderId) {
      return res.status(400).json({ error: 'delete orderId is required' });
    }

    const deleteOrder = await Orders.findByIdAndDelete(orderId);

    if (!deleteOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(deleteOrder);
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

};

export default ordersController;
