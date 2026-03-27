import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { fetchCaseStudy, createCaseStudy, updateCaseStudy } from '../../lib/api';

const AdminCaseStudyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    clientName: '',
    clientLocation: '',
    propertyType: '',
    excerpt: '',
    content: '',
    challenge: '',
    solution: '',
    results: [],
    featuredImage: '',
    isPublished: false,
  });

  const { data: caseStudy, isLoading } = useQuery({
    queryKey: ['caseStudy', id],
    queryFn: () => fetchCaseStudy(id),
    enabled: !isNew,
  });

  useEffect(() => {
    if (caseStudy && !isNew) {
      setFormData({
        title: caseStudy.title || '',
        slug: caseStudy.slug || '',
        clientName: caseStudy.clientName || '',
        clientLocation: caseStudy.clientLocation || '',
        propertyType: caseStudy.propertyType || '',
        excerpt: caseStudy.excerpt || '',
        content: caseStudy.content || '',
        challenge: caseStudy.challenge || '',
        solution: caseStudy.solution || '',
        results: caseStudy.results || [],
        featuredImage: caseStudy.featuredImage || '',
        isPublished: caseStudy.isPublished || false,
      });
    }
  }, [caseStudy, isNew]);

  const createMutation = useMutation({
    mutationFn: createCaseStudy,
    onSuccess: () => {
      queryClient.invalidateQueries(['caseStudies']);
      navigate('/admin/case-studies');
    },
    onError: (error) => {
      alert('Error creating case study: ' + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateCaseStudy(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['caseStudies']);
      queryClient.invalidateQueries(['caseStudy', id]);
      navigate('/admin/case-studies');
    },
    onError: (error) => {
      alert('Error updating case study: ' + error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isNew) {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate(formData);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { metric: '', value: '' }],
    }));
  };

  const updateResult = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.map((r, i) => i === index ? { ...r, [field]: value } : r),
    }));
  };

  const removeResult = (index) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }));
  };

  if (isLoading && !isNew) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4353FF]" />
        </div>
      </AdminLayout>
    );
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/case-studies"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#0A0A0A]">
                {isNew ? 'New Case Study' : 'Edit Case Study'}
              </h1>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#4353FF] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Case Study
              </>
            )}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                    placeholder="e.g. How We Increased Revenue by 40%"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                      placeholder="case-study-slug"
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                    placeholder="Brief summary of the case study"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">Case Study Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    The Challenge
                  </label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                    placeholder="What challenge did the client face?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Our Solution
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                    placeholder="How did we solve the problem?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={10}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none font-mono text-sm"
                    placeholder="Full case study content (HTML supported)"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#0A0A0A]">Results</h2>
                <button
                  type="button"
                  onClick={addResult}
                  className="px-4 py-2 bg-[#4353FF] text-white rounded-lg text-sm hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Result
                </button>
              </div>
              <div className="space-y-4">
                {formData.results.map((result, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Metric (e.g. Revenue Increase)"
                        value={result.metric}
                        onChange={(e) => updateResult(index, 'metric', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 40%)"
                        value={result.value}
                        onChange={(e) => updateResult(index, 'value', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeResult(index)}
                      className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                ))}
                {formData.results.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No results added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-[#0A0A0A] mb-4">Publish Settings</h3>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#4353FF] focus:ring-[#4353FF]"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Publish this case study
                </label>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-[#0A0A0A] mb-4">Client Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                    placeholder="e.g. Dubai Marina Properties"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="clientLocation"
                    value={formData.clientLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                    placeholder="e.g. Dubai Marina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-[#0A0A0A] mb-4">Featured Image</h3>
              <div className="space-y-4">
                {formData.featuredImage && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminCaseStudyEditor;
