import { Router } from 'express';
import {
  listPosts,
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from '../lib/store.js';

const router = Router();

router.get('/', (req, res) => {
  const posts = listPosts();
  res.render('index', { title: 'All Posts', posts, message: req.query.message || null });
});

router.get('/new', (req, res) => {
  res.render('new', { title: 'New Post', values: { title: '', body: '' }, errors: {} });
});

router.post('/', (req, res) => {
  const { title, body } = req.body;
  const errors = {};
  if (!title || !title.trim()) errors.title = 'Title is required';
  if (!body || !body.trim()) errors.body = 'Body is required';
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('new', { title: 'New Post', values: { title, body }, errors });
  }
  const post = createPost({ title, body });
  return res.redirect(`/posts/${post.id}?created=1`);
});

router.get('/:id', (req, res) => {
  const post = findPostById(req.params.id);
  if (!post) return res.status(404).render('404', { title: 'Not Found' });
  return res.render('show', { title: post.title, post });
});

router.get('/:id/edit', (req, res) => {
  const post = findPostById(req.params.id);
  if (!post) return res.status(404).render('404', { title: 'Not Found' });
  return res.render('edit', { title: `Edit: ${post.title}`, post, errors: {} });
});

router.put('/:id', (req, res) => {
  const { title, body } = req.body;
  const errors = {};
  if (!title || !title.trim()) errors.title = 'Title is required';
  if (!body || !body.trim()) errors.body = 'Body is required';
  const post = findPostById(req.params.id);
  if (!post) return res.status(404).render('404', { title: 'Not Found' });
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('edit', { title: `Edit: ${post.title}`, post: { ...post, title, body }, errors });
  }
  updatePost(req.params.id, { title, body });
  return res.redirect(`/posts/${req.params.id}?updated=1`);
});

router.delete('/:id', (req, res) => {
  const ok = deletePost(req.params.id);
  const message = ok ? 'Post deleted' : 'Post not found';
  return res.redirect(`/posts?message=${encodeURIComponent(message)}`);
});

export default router;


