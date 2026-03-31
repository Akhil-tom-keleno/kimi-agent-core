import { Routes, Route } from 'react-router-dom'

// Public Pages
import HomePage from './pages/HomePage'
import RevenueManagementPage from './pages/RevenueManagementPage'
import OperationsPage from './pages/OperationsPage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import BookACallPage from './pages/BookACallPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'

// Components
import ProtectedRoute from './components/ProtectedRoute'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPages from './pages/admin/AdminPages'
import AdminPageEditor from './pages/admin/AdminPageEditor'
import AdminBlogPosts from './pages/admin/AdminBlogPosts'
import AdminBlogEditor from './pages/admin/AdminBlogEditor'
import AdminCaseStudies from './pages/admin/AdminCaseStudies'
import AdminCaseStudyEditor from './pages/admin/AdminCaseStudyEditor'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminTestimonialEditor from './pages/admin/AdminTestimonialEditor'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/revenue-management" element={<RevenueManagementPage />} />
      <Route path="/operations" element={<OperationsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/book-a-call" element={<BookACallPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
      <Route path="/admin/pages/edit/:id" element={<ProtectedRoute><AdminPageEditor /></ProtectedRoute>} />
      <Route path="/admin/blog" element={<ProtectedRoute><AdminBlogPosts /></ProtectedRoute>} />
      <Route path="/admin/blog/new" element={<ProtectedRoute><AdminBlogEditor /></ProtectedRoute>} />
      <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><AdminBlogEditor /></ProtectedRoute>} />
      <Route path="/admin/case-studies" element={<ProtectedRoute><AdminCaseStudies /></ProtectedRoute>} />
      <Route path="/admin/case-studies/new" element={<ProtectedRoute><AdminCaseStudyEditor /></ProtectedRoute>} />
      <Route path="/admin/case-studies/edit/:id" element={<ProtectedRoute><AdminCaseStudyEditor /></ProtectedRoute>} />
      <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
      <Route path="/admin/testimonials/new" element={<ProtectedRoute><AdminTestimonialEditor /></ProtectedRoute>} />
      <Route path="/admin/testimonials/edit/:id" element={<ProtectedRoute><AdminTestimonialEditor /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
