const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/core-cms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ==================== SCHEMAS ====================

// User Schema (for admin)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Page Schema
const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: String },
  hero: {
    label: String,
    headline: String,
    subtitle: String,
    ctaText: String,
    ctaLink: String,
    image: String
  },
  content: {
    sections: [{
      title: String,
      content: String,
      image: String,
      order: Number
    }]
  },
  stats: [{
    value: String,
    label: String
  }],
  cta: {
    label: String,
    headline: String,
    description: String,
    buttonText: String,
    image: String
  },
  isPublished: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

const Page = mongoose.model('Page', pageSchema);

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  author: { type: String, default: 'CORE Team' },
  authorTitle: { type: String },
  featuredImage: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Case Study Schema
const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  client: { type: String },
  clientName: { type: String },
  clientLocation: { type: String },
  propertyType: { type: String },
  content: { type: String, required: true },
  excerpt: { type: String },
  challenge: { type: String },
  solution: { type: String },
  results: [{
    metric: String,
    value: String
  }],
  stats: [{
    value: String,
    label: String
  }],
  featuredImage: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  company: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// Site Settings Schema
const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'CORE' },
  siteTitle: { type: String, default: 'CORE | Operating Partner for Holiday Home Businesses' },
  siteDescription: { type: String, default: 'The operating partner for holiday home operators.' },
  logo: { type: String },
  favicon: { type: String },
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String
  },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

// ==================== AUTH MIDDLEWARE ====================

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register (for initial setup)
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== PAGES API ====================

// Get all pages (public)
app.get('/api/pages', async (req, res) => {
  try {
    const pages = await Page.find({ isPublished: true }, 'slug title metaTitle metaDescription');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single page by slug (public)
app.get('/api/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isPublished: true });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pages (admin)
app.get('/api/admin/pages', authMiddleware, async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update page (admin)
app.post('/api/admin/pages', authMiddleware, async (req, res) => {
  try {
    const { slug } = req.body;
    const page = await Page.findOneAndUpdate(
      { slug },
      { ...req.body, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update page (admin)
app.put('/api/admin/pages/:id', authMiddleware, async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete page (admin)
app.delete('/api/admin/pages/:id', authMiddleware, async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get page by ID (admin)
app.get('/api/pages/id/:id', authMiddleware, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== BLOG POSTS API ====================

// Get all blog posts (public)
app.get('/api/blog-posts', async (req, res) => {
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .select('title slug excerpt category author featuredImage publishedAt')
      .sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog post (public)
app.get('/api/blog-posts/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all blog posts (admin)
app.get('/api/admin/blog-posts', authMiddleware, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog post (admin)
app.post('/api/admin/blog-posts', authMiddleware, async (req, res) => {
  try {
    // Ensure publishedAt is set if isPublished is true
    const data = { ...req.body };
    if (data.isPublished && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    
    const post = new BlogPost(data);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A post with this slug already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

// Update blog post (admin)
app.put('/api/admin/blog-posts/:id', authMiddleware, async (req, res) => {
  try {
    // Ensure publishedAt is set if isPublished is true and wasn't before
    const data = { ...req.body, updatedAt: Date.now() };
    if (data.isPublished && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A post with this slug already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});

// Delete blog post (admin)
app.delete('/api/admin/blog-posts/:id', authMiddleware, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog post by ID (admin)
app.get('/api/blog-posts/id/:id', authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== CASE STUDIES API ====================

// Get all case studies (public)
app.get('/api/case-studies', async (req, res) => {
  try {
    const studies = await CaseStudy.find({ isPublished: true })
      .select('title slug client excerpt stats featuredImage')
      .sort({ createdAt: -1 });
    res.json(studies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single case study (public)
app.get('/api/case-studies/:slug', async (req, res) => {
  try {
    const study = await CaseStudy.findOne({ slug: req.params.slug, isPublished: true });
    if (!study) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(study);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all case studies (admin)
app.get('/api/admin/case-studies', authMiddleware, async (req, res) => {
  try {
    const studies = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(studies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create case study (admin)
app.post('/api/admin/case-studies', authMiddleware, async (req, res) => {
  try {
    const study = new CaseStudy(req.body);
    await study.save();
    res.status(201).json(study);
  } catch (error) {
    console.error('Error creating case study:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A case study with this slug already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to create case study' });
  }
});

// Update case study (admin)
app.put('/api/admin/case-studies/:id', authMiddleware, async (req, res) => {
  try {
    const study = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!study) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(study);
  } catch (error) {
    console.error('Error updating case study:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A case study with this slug already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update case study' });
  }
});

// Delete case study (admin)
app.delete('/api/admin/case-studies/:id', authMiddleware, async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ message: 'Case study deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get case study by ID (admin)
app.get('/api/case-studies/id/:id', authMiddleware, async (req, res) => {
  try {
    const study = await CaseStudy.findById(req.params.id);
    if (!study) {
      return res.status(404).json({ message: 'Case study not found' });
    }
    res.json(study);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== TESTIMONIALS API ====================

// Get all testimonials (public)
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true })
      .select('name title company content rating image')
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all testimonials (admin)
app.get('/api/admin/testimonials', authMiddleware, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create testimonial (admin)
app.post('/api/admin/testimonials', authMiddleware, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to create testimonial' });
  }
});

// Update testimonial (admin)
app.put('/api/admin/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to update testimonial' });
  }
});

// Delete testimonial (admin)
app.delete('/api/admin/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get testimonial by ID (admin)
app.get('/api/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== SITE SETTINGS API ====================

// Get site settings (public)
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update site settings (admin)
app.put('/api/admin/settings', authMiddleware, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    settings.updatedAt = Date.now();
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== CONTACT API ====================

// Contact Form Submission Schema
const contactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  propertyType: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

// Book a Call Submission Schema
const bookACallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
});

const BookACall = mongoose.model('BookACall', bookACallSchema);

// Submit contact form (public)
app.post('/api/contact', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, propertyType, message } = req.body;
    
    const submission = new ContactSubmission({
      name,
      email,
      phone: phone || '',
      propertyType: propertyType || '',
      message
    });
    
    await submission.save();
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      submission: {
        id: submission._id,
        name: submission.name,
        email: submission.email,
        createdAt: submission.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Failed to submit contact form. Please try again.' });
  }
});

// Get all contact submissions (admin)
app.get('/api/admin/contact-submissions', authMiddleware, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find()
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark submission as read (admin)
app.put('/api/admin/contact-submissions/:id/read', authMiddleware, async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact submission (admin)
app.delete('/api/admin/contact-submissions/:id', authMiddleware, async (req, res) => {
  try {
    await ContactSubmission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== BOOK A CALL API ====================

// Submit book a call form (public)
app.post('/api/book-a-call', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('preferredDate').trim().notEmpty().withMessage('Preferred date is required'),
  body('preferredTime').trim().notEmpty().withMessage('Preferred time is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, company, preferredDate, preferredTime, message } = req.body;
    
    const booking = new BookACall({
      name,
      email,
      phone,
      company: company || '',
      preferredDate,
      preferredTime,
      message: message || ''
    });
    
    await booking.save();
    
    res.status(201).json({ 
      message: 'Call booked successfully',
      booking: {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Book a call submission error:', error);
    res.status(500).json({ message: 'Failed to book call. Please try again.' });
  }
});

// Get all bookings (admin)
app.get('/api/admin/book-a-call', authMiddleware, async (req, res) => {
  try {
    const bookings = await BookACall.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (admin)
app.put('/api/admin/book-a-call/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await BookACall.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete booking (admin)
app.delete('/api/admin/book-a-call/:id', authMiddleware, async (req, res) => {
  try {
    await BookACall.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== STATS API ====================

// Get dashboard stats (admin)
app.get('/api/admin/stats', authMiddleware, async (req, res) => {
  try {
    const [pages, posts, studies, testimonials] = await Promise.all([
      Page.countDocuments(),
      BlogPost.countDocuments(),
      CaseStudy.countDocuments(),
      Testimonial.countDocuments()
    ]);

    res.json({
      pages,
      blogPosts: posts,
      caseStudies: studies,
      testimonials
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== SEED DATA ====================

// Seed initial data
app.post('/api/seed', async (req, res) => {
  try {
    // Check if pages exist
    const pagesCount = await Page.countDocuments();
    if (pagesCount === 0) {
      // Create default pages
      const defaultPages = [
        {
          slug: 'index',
          title: 'Homepage',
          metaTitle: 'CORE | Operating Partner for Holiday Home Businesses',
          metaDescription: 'CORE is the operating partner for holiday home operators.',
          hero: {
            headline: 'Operating Partner for Holiday Home Businesses',
            subtitle: "We built the infrastructure so you don't have to. Plug in world-class distribution, revenue management, and operational efficiency — and focus on what makes your brand great.",
            ctaText: 'Partner With Us',
            ctaLink: '#contact',
            image: 'https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/d0bfeee6e555a530435123d01951d22097b0fd13.jpg'
          },
          stats: [
            { value: '200+', label: 'Properties Managed' },
            { value: '+20%', label: 'Avg. Revenue Increase' },
            { value: '4.9', label: 'Guest Rating' }
          ],
          cta: {
            headline: 'Ready to scale your holiday home business?',
            description: "Let's discuss how CORE can help you grow.",
            buttonText: 'Book a call'
          },
          isPublished: true
        },
        {
          slug: 'revenue-management',
          title: 'Revenue Management',
          metaTitle: 'Revenue Management | CORE',
          metaDescription: "Put your rates on autopilot with CORE's AI-powered revenue management.",
          hero: {
            label: 'SOLUTIONS',
            headline: 'Revenue Management',
            subtitle: "Put your rates on autopilot. CORE ensures your listings are priced to maximize revenue, boost occupancy, and stay ahead of the market.",
            ctaText: 'Book a call',
            ctaLink: '/book-a-call'
          },
          stats: [
            { value: '+20%', label: 'Average Revenue Increase' },
            { value: '24/7', label: 'Price Optimization' },
            { value: '50+', label: 'Data Points Analyzed' }
          ],
          cta: {
            label: 'GET STARTED',
            headline: 'Ready to maximize your revenue?',
            description: "Join hundreds of property owners who trust CORE's revenue management to optimize their pricing strategy.",
            buttonText: 'Talk to Our Team'
          },
          isPublished: true
        },
        {
          slug: 'operations',
          title: 'Operations',
          metaTitle: 'Operations | CORE',
          metaDescription: "End-to-end operations management that ensures your properties are maintained to the highest standards.",
          hero: {
            label: 'SOLUTIONS',
            headline: 'Operations',
            subtitle: 'End-to-end operations management that ensures your properties are maintained to the highest standards.',
            ctaText: 'Book a call',
            ctaLink: '/book-a-call'
          },
          stats: [
            { value: '<2min', label: 'Average Response Time' },
            { value: '4.9', label: 'Guest Rating' },
            { value: '99%', label: 'Satisfaction Rate' }
          ],
          cta: {
            label: 'GET STARTED',
            headline: 'Ready to streamline your operations?',
            description: 'Let us handle the day-to-day while you focus on growing your portfolio.',
            buttonText: 'Talk to Our Team'
          },
          isPublished: true
        },
        {
          slug: 'about',
          title: 'About',
          metaTitle: 'About | CORE',
          metaDescription: 'Learn about CORE - the operating partner for holiday home businesses.',
          hero: {
            label: 'ABOUT US',
            headline: 'WELCOME TO CORE',
            subtitle: "Running a holiday home business isn't hard because of the guests — it's hard because of everything around them.",
            image: 'https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/1147490b45d1707e4edbbe34efea6c4f76ed9352.jpg'
          },
          stats: [
            { value: '200+', label: 'Properties Managed' },
            { value: '+20%', label: 'Avg. Revenue Increase' },
            { value: '4.9', label: 'Guest Rating' }
          ],
          cta: {
            label: 'Join Us',
            headline: 'Ready to partner with CORE?',
            description: "Let's discuss how we can help you scale your holiday home business.",
            buttonText: 'Get in Touch'
          },
          isPublished: true
        },
        {
          slug: 'pricing',
          title: 'Pricing',
          metaTitle: 'Pricing | CORE',
          metaDescription: 'Transparent pricing for CORE management services.',
          hero: {
            headline: 'Simple, transparent pricing',
            subtitle: 'Choose the plan that fits your portfolio. No hidden fees, no surprises.'
          },
          cta: {
            headline: 'Still have questions?',
            description: 'Schedule a call with our team to discuss your specific needs.',
            buttonText: 'Book a call'
          },
          isPublished: true
        },
        {
          slug: 'contact',
          title: 'Contact',
          metaTitle: 'Contact | CORE',
          metaDescription: 'Get in touch with CORE.',
          hero: {
            headline: 'Get in Touch',
            subtitle: "Have questions? We'd love to hear from you."
          },
          isPublished: true
        },
        {
          slug: 'book-a-call',
          title: 'Book a Call',
          metaTitle: 'Book a Call | CORE',
          metaDescription: 'Schedule a call with our team.',
          hero: {
            headline: 'Book a Call',
            subtitle: 'Schedule a call with our team to learn how CORE can help you grow.'
          },
          isPublished: true
        },
        {
          slug: 'blog',
          title: 'Blog',
          metaTitle: 'Blog | CORE',
          metaDescription: 'Insights and tips for holiday home operators.',
          hero: {
            headline: 'Blog',
            subtitle: 'Insights, tips, and industry news for holiday home operators.'
          },
          isPublished: true
        }
      ];

      await Page.insertMany(defaultPages);
    }

    // Create default testimonials
    const testimonialsCount = await Testimonial.countDocuments();
    if (testimonialsCount === 0) {
      const defaultTestimonials = [
        {
          name: 'Abir Chammah',
          title: 'Manager, Monty Holiday Home',
          content: "CORE has been an absolute asset to our team. Their sharp eye for market trends, dynamic pricing strategies, and consistent focus on revenue growth have made a real impact on our performance.",
          rating: 5,
          isPublished: true
        },
        {
          name: 'Charlie Ridge',
          title: 'Owner, Farwell and Gervase',
          content: "Working with CORE has been an absolute game changer for my Airbnb business in Dubai. Their expertise in revenue management and pricing strategy has helped me maximise my earnings.",
          rating: 5,
          isPublished: true
        }
      ];
      await Testimonial.insertMany(defaultTestimonials);
    }

    // Create default case study
    const caseStudiesCount = await CaseStudy.countDocuments();
    if (caseStudiesCount === 0) {
      const defaultCaseStudy = {
        title: 'Turning Properties Into Market Leaders',
        slug: 'turning-properties-into-market-leaders',
        client: 'Ahmed Al-Rashid',
        content: 'How we helped a luxury villa owner in Palm Jumeirah increase their RevPAR by 35% while maintaining 85%+ occupancy year-round.',
        excerpt: 'How we helped a luxury villa owner increase their RevPAR by 35% while maintaining 85%+ occupancy.',
        stats: [
          { value: '35%', label: 'RevPAR Increase' },
          { value: '85%', label: 'Occupancy Rate' }
        ],
        featuredImage: 'https://kimi-web-img.moonshot.cn/img/cf.bstatic.com/1147490b45d1707e4edbbe34efea6c4f76ed9352.jpg',
        isPublished: true
      };
      await CaseStudy.create(defaultCaseStudy);
    }

    // Create default user if none exists
    const usersCount = await User.countDocuments();
    if (usersCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        email: 'admin@core.com',
        password: hashedPassword,
        name: 'Admin'
      });
    }

    res.json({ message: 'Seed data created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
