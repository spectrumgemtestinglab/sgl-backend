import Blogs from '../model/blogsModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const blogsController = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blogs.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createBlog: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { content, title, subtitle } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        if (!content || !title) {
          return res.status(400).json({ error: 'Content and title are required' });
        }

        const blog = new Blogs({ content, title, subtitle, image });
        const savedBlog = await blog.save();

        res.status(201).json(savedBlog);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ],

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      const deletedBlog = await Blogs.findByIdAndDelete(id);

      if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json(deletedBlog);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default blogsController;
