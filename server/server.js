require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);

// Mock auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  req.user = { id: '1', name: 'Alex Morgan', email: 'alex@cineverse.com', isAdmin: true };
  next();
};

const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) req.user = { id: '1', name: 'Alex Morgan', email: 'alex@cineverse.com', isAdmin: true };
  next();
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CineVerse API', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  res.json({
    token: 'mock-jwt-token-' + Date.now(),
    user: { id: '1', name: 'Alex Morgan', email, isAdmin: true },
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  res.json({
    token: 'mock-jwt-token-' + Date.now(),
    user: { id: '1', name, email, isAdmin: false },
  });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Content routes
app.get('/api/titles', optionalAuth, (req, res) => {
  const { type, genre, language, country, year, minRating, sort, page = 1, limit = 20 } = req.query;
  res.json({
    titles: [],
    pagination: { page: parseInt(page), limit: parseInt(limit), total: 0 },
  });
});

app.get('/api/titles/:slug', optionalAuth, (req, res) => {
  res.json({ title: null });
});

app.get('/api/titles/:slug/related', optionalAuth, (req, res) => {
  res.json({ titles: [] });
});

// Search
app.get('/api/search', optionalAuth, (req, res) => {
  const { q, type, page = 1 } = req.query;
  res.json({ results: [], total: 0 });
});

// User routes
app.get('/api/user/watchlist', authenticateToken, (req, res) => {
  res.json({ watchlist: [] });
});

app.post('/api/user/watchlist/:titleId', authenticateToken, (req, res) => {
  res.json({ success: true });
});

app.delete('/api/user/watchlist/:titleId', authenticateToken, (req, res) => {
  res.json({ success: true });
});

app.get('/api/user/favorites', authenticateToken, (req, res) => {
  res.json({ favorites: [] });
});

app.post('/api/user/favorites/:titleId', authenticateToken, (req, res) => {
  res.json({ success: true });
});

app.delete('/api/user/favorites/:titleId', authenticateToken, (req, res) => {
  res.json({ success: true });
});

app.get('/api/user/history', authenticateToken, (req, res) => {
  res.json({ history: [] });
});

app.post('/api/user/history', authenticateToken, (req, res) => {
  res.json({ success: true });
});

app.post('/api/user/rate', authenticateToken, (req, res) => {
  const { titleId, rating } = req.body;
  res.json({ success: true });
});

// Comments
app.get('/api/titles/:slug/comments', optionalAuth, (req, res) => {
  res.json({ comments: [] });
});

app.post('/api/titles/:slug/comments', authenticateToken, (req, res) => {
  res.json({ success: true });
});

// Admin routes
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  res.json({
    totalContent: 20,
    activeUsers: 2400,
    totalComments: 1200,
    pageViews: 156000,
  });
});

app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  res.json({ users: [] });
});

app.post('/api/admin/content', authenticateToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  res.json({ success: true });
});

app.put('/api/admin/content/:id', authenticateToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  res.json({ success: true });
});

app.delete('/api/admin/content/:id', authenticateToken, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  res.json({ success: true });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`CineVerse API running on port ${PORT}`);
});
