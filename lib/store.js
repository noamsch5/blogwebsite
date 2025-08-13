const posts = [];

function generateId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function listPosts() {
  return [...posts].sort((a, b) => b.createdAt - a.createdAt);
}

export function findPostById(id) {
  return posts.find((p) => p.id === id);
}

export function createPost({ title, body }) {
  const now = Date.now();
  const post = {
    id: generateId(),
    title: title?.trim() ?? '',
    body: body?.trim() ?? '',
    createdAt: now,
    updatedAt: now,
  };
  posts.push(post);
  return post;
}

export function updatePost(id, { title, body }) {
  const post = findPostById(id);
  if (!post) return null;
  if (typeof title === 'string') post.title = title.trim();
  if (typeof body === 'string') post.body = body.trim();
  post.updatedAt = Date.now();
  return post;
}

export function deletePost(id) {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}

export function seedPosts() {
  if (posts.length > 0) return;
  createPost({
    title: 'Welcome to your Blog',
    body:
      'This is a demo post. You can create, edit, and delete posts. Data is stored only in memory and will reset when the server restarts.',
  });
  createPost({
    title: 'Getting Started',
    body:
      'Click the New Post button to add your own content. Use Edit to modify and Delete to remove posts. Enjoy building!',
  });
}

export default {
  listPosts,
  findPostById,
  createPost,
  updatePost,
  deletePost,
  seedPosts,
};


