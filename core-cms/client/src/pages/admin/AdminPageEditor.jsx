import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { fetchPage, updatePage, API_URL } from '../../lib/api';

const AdminPageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [content, setContent] = useState({});
  const [seo, setSeo] = useState({});
  const [isPublished, setIsPublished] = useState(true);
  const [activeTab, setActiveTab] = useState('content');

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', id],
    queryFn: () => fetchPage(id),
  });

  useEffect(() => {
    if (page) {
      setContent(page.content || {});
      setSeo(page.seo || {});
      setIsPublished(page.isPublished);
    }
  }, [page]);

  const updateMutation = useMutation({
    mutationFn: (data) => updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['page', id]);
      queryClient.invalidateQueries(['pages']);
      alert('Page saved successfully!');
    },
    onError: (error) => {
      alert('Error saving page: ' + error.message);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      content,
      seo,
      isPublished,
    });
  };

  const handleContentChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSeoChange = (field, value) => {
    setSeo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4353FF]" />
        </div>
      </AdminLayout>
    );
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <p className="text-gray-500">Page not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/pages"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#0A0A0A]">Edit Page</h1>
              <p className="text-gray-600 mt-1">{page.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`/${page.slug === 'home' ? '' : page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="bg-[#4353FF] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['content', 'seo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#4353FF] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={content.hero?.title || ''}
                    onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={content.hero?.subtitle || ''}
                    onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">Features Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content.features?.title || ''}
                    onChange={(e) => handleContentChange('features', 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle
                  </label>
                  <textarea
                    value={content.features?.subtitle || ''}
                    onChange={(e) => handleContentChange('features', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">CTA Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Title
                  </label>
                  <input
                    type="text"
                    value={content.cta?.title || ''}
                    onChange={(e) => handleContentChange('cta', 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Description
                  </label>
                  <textarea
                    value={content.cta?.description || ''}
                    onChange={(e) => handleContentChange('cta', 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={seo.metaTitle || ''}
                  onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={seo.metaDescription || ''}
                  onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={seo.keywords || ''}
                  onChange={(e) => handleSeoChange('keywords', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-[#4353FF] focus:ring-[#4353FF]"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                  Publish this page
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPageEditor;
