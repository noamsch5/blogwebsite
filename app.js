import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import morgan from 'morgan';
import postsRouter from './routes/posts.js';
import ejsMate from 'ejs-mate';
import { seedPosts } from './lib/store.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Seed a few demo posts (in-memory)
seedPosts();

// Routes
app.get('/', (req, res) => res.redirect('/posts'));
app.use('/posts', postsRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});


