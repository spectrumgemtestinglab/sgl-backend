import Orders from "../model/ordersModel.js";

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const { userName, userId, items, orderId, date, status, address, totalPrice } = req.body;

      const newOrder = await Orders.create({
        userName,
        userId,
        items,
        orderId,
        date,
        status,
        address,
        totalPrice,
      });

      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      console.log('Fetching all orders...');
      const allOrders = await Orders.find();
      console.log('Fetched orders:', allOrders);
  
      const formattedOrders = allOrders.map((order) => ({
        ...order.toObject(),
        date: new Date(order.date).toLocaleDateString('en-GB'), 
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

      // Implement your update logic here
      // Example: const updatedOrder = await Orders.findByIdAndUpdate(orderId, { yourUpdateFields }, { new: true });

      res.status(200).json({ message: 'Order updated successfully', updatedOrder });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const orderId = id;
  
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
  
  
  
  

  // Add a new item to an order
  addItemToOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { newItem } = req.body;

      const existingOrder = await Orders.findById(orderId);

      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      existingOrder.items.push(newItem);

      const updatedOrder = await existingOrder.save();

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error adding item to order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update an item in an order
  updateItemInOrder: async (req, res) => {
    try {
      const { orderId, itemId } = req.params;
      const { updatedItem } = req.body;

      const existingOrder = await Orders.findById(orderId);

      if (!existingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const existingItemIndex = existingOrder.items.findIndex(item => item._id == itemId);

      if (existingItemIndex === -1) {
        return res.status(404).json({ error: 'Item not found in order' });
      }

      existingOrder.items[existingItemIndex] = { ...existingOrder.items[existingItemIndex], ...updatedItem };

      const updatedOrder = await existingOrder.save();

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating item in order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default ordersController;