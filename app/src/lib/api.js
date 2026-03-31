import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data)
}

// Pages API
export const pagesAPI = {
  getAll: () => api.get('/pages'),
  getBySlug: (slug) => api.get(`/pages/${slug}`),
  getAllAdmin: () => api.get('/admin/pages'),
  create: (data) => api.post('/admin/pages', data),
  update: (id, data) => api.put(`/admin/pages/${id}`, data),
  delete: (id) => api.delete(`/admin/pages/${id}`)
}

// Blog Posts API
export const blogAPI = {
  getAll: () => api.get('/blog-posts'),
  getBySlug: (slug) => api.get(`/blog-posts/${slug}`),
  getById: (id) => api.get(`/blog-posts/id/${id}`),
  getAllAdmin: () => api.get('/admin/blog-posts'),
  create: (data) => api.post('/admin/blog-posts', data),
  update: (id, data) => api.put(`/admin/blog-posts/${id}`, data),
  delete: (id) => api.delete(`/admin/blog-posts/${id}`)
}

// Case Studies API
export const caseStudiesAPI = {
  getAll: () => api.get('/case-studies'),
  getBySlug: (slug) => api.get(`/case-studies/${slug}`),
  getById: (id) => api.get(`/case-studies/id/${id}`),
  getAllAdmin: () => api.get('/admin/case-studies'),
  create: (data) => api.post('/admin/case-studies', data),
  update: (id, data) => api.put(`/admin/case-studies/${id}`, data),
  delete: (id) => api.delete(`/admin/case-studies/${id}`)
}

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  getById: (id) => api.get(`/testimonials/${id}`),
  getAllAdmin: () => api.get('/admin/testimonials'),
  create: (data) => api.post('/admin/testimonials', data),
  update: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  delete: (id) => api.delete(`/admin/testimonials/${id}`)
}

// Site Settings API
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/admin/settings', data)
}

// Stats API
export const statsAPI = {
  get: () => api.get('/admin/stats')
}

// Seed API
export const seedAPI = {
  run: () => api.post('/seed')
}

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data)
}

// Book a Call API
export const bookACallAPI = {
  submit: (data) => api.post('/book-a-call', data),
  getAll: () => api.get('/admin/book-a-call'),
  updateStatus: (id, status) => api.put(`/admin/book-a-call/${id}/status`, { status }),
  delete: (id) => api.delete(`/admin/book-a-call/${id}`)
}

// Convenience functions for components
export const login = async (email, password) => {
  const response = await authAPI.login(email, password)
  return response.data
}

export const fetchPages = async () => {
  const response = await pagesAPI.getAllAdmin()
  return response.data
}

export const fetchPage = async (slugOrId) => {
  // Try to fetch by slug first, if that fails try by ID
  try {
    const response = await pagesAPI.getBySlug(slugOrId)
    return response.data
  } catch (error) {
    // If slug lookup fails, try by ID
    const response = await api.get(`/pages/id/${slugOrId}`)
    return response.data
  }
}

export const updatePage = async (id, data) => {
  const response = await pagesAPI.update(id, data)
  return response.data
}

export const fetchBlogPosts = async () => {
  const response = await blogAPI.getAll()
  return response.data
}

export const fetchBlogPost = async (id) => {
  const response = await blogAPI.getById(id)
  return response.data
}

export const fetchBlogPostBySlug = async (slug) => {
  const response = await blogAPI.getBySlug(slug)
  return response.data
}

export const createBlogPost = async (data) => {
  const response = await blogAPI.create(data)
  return response.data
}

export const updateBlogPost = async (id, data) => {
  const response = await blogAPI.update(id, data)
  return response.data
}

export const deleteBlogPost = async (id) => {
  const response = await blogAPI.delete(id)
  return response.data
}

export const fetchCaseStudies = async () => {
  const response = await caseStudiesAPI.getAll()
  return response.data
}

export const fetchCaseStudy = async (id) => {
  const response = await caseStudiesAPI.getById(id)
  return response.data
}

export const createCaseStudy = async (data) => {
  const response = await caseStudiesAPI.create(data)
  return response.data
}

export const updateCaseStudy = async (id, data) => {
  const response = await caseStudiesAPI.update(id, data)
  return response.data
}

export const deleteCaseStudy = async (id) => {
  const response = await caseStudiesAPI.delete(id)
  return response.data
}

export const fetchTestimonials = async () => {
  const response = await testimonialsAPI.getAll()
  return response.data
}

export const fetchTestimonial = async (id) => {
  const response = await testimonialsAPI.getById(id)
  return response.data
}

export const createTestimonial = async (data) => {
  const response = await testimonialsAPI.create(data)
  return response.data
}

export const updateTestimonial = async (id, data) => {
  const response = await testimonialsAPI.update(id, data)
  return response.data
}

export const deleteTestimonial = async (id) => {
  const response = await testimonialsAPI.delete(id)
  return response.data
}

export const fetchSiteSettings = async () => {
  const response = await settingsAPI.get()
  return response.data
}

export const updateSiteSettings = async (data) => {
  const response = await settingsAPI.update(data)
  return response.data
}

export const submitContactForm = async (data) => {
  const response = await contactAPI.submit(data)
  return response.data
}

export const submitBookACall = async (data) => {
  const response = await bookACallAPI.submit(data)
  return response.data
}

export default api
