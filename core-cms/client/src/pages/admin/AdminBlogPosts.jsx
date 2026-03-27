import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { fetchBlogPosts, deleteBlogPost } from '../../lib/api';

const AdminBlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogPosts']);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4353FF]"></div>
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
              to="/admin"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#0A0A0A]">Blog Posts</h1>
              <p className="text-gray-600 mt-1">Manage your blog content</p>
            </div>
          </div>
          <Link
            to="/admin/blog/new"
            className="bg-[#4353FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Post
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Post</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Date</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts?.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {post.featuredImage ? (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs">No img</div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-[#0A0A0A] line-clamp-1">{post.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#4353FF]/10 text-[#4353FF] rounded-full text-sm">
                          {post.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          post.isPublished
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <Link
                            to={`/admin/blog/edit/${post._id}`}
                            className="w-8 h-8 bg-[#4353FF]/10 rounded-lg flex items-center justify-center hover:bg-[#4353FF]/20 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-[#4353FF]" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      {searchTerm ? 'No posts found matching your search' : 'No blog posts yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPosts;
