import cartData from '../model/cart.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cartController = {
  createCart: [
    upload.single('image'),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        
        const {
          name,
          colour,
          dimensions, 
          hardness,
          shape,
          transparency,
          units,
          weight,
          clarity,
          size,
          subtype,
          quantity,
          userIds,
        } = req.body;

        const newCartItem = new cartData({
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

        const requiredFields = [name, colour, dimensions, shape, transparency, units, userIds, weight];
        if (requiredFields.some((field) => !field)) {
          return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const savedCartItem = await newCartItem.save();

        res.status(201).json(savedCartItem);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
    },
  ],

    getAllCart: async (req, res) => {
      try {
        const allCart = await cartData.find();
        res.status(200).json(allCart); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get all cart' });
  }      
},
getByUserIds: async (req, res) => {
  const { userIds } = req.params;

  try {
    const cartItems = await cartData.find({ userIds });
    
    if (cartItems.length === 0) {
      return res.status(404).json({ error: 'No cart items found for the specified userIds' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get cart items by userIds' });
  }
},

}


export default cartController;
