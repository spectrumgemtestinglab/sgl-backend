import { Schema, model } from 'mongoose';

const blogSchema = Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
});

const Blogs = model('Blogs', blogSchema);

export default Blogs;
