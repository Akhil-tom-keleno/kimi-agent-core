import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowLeft, Search, Star } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { fetchTestimonials, deleteTestimonial } from '../../lib/api';

const AdminTestimonials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries(['testimonials']);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredTestimonials = testimonials?.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-3xl font-bold text-[#0A0A0A]">Testimonials</h1>
              <p className="text-gray-600 mt-1">Manage client testimonials</p>
            </div>
          </div>
          <Link
            to="/admin/testimonials/new"
            className="bg-[#4353FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Testimonial
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
            />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials?.length > 0 ? (
            filteredTestimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 line-clamp-4">"{testimonial.content}"</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#4353FF] font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/admin/testimonials/edit/${testimonial._id}`}
                    className="flex-1 bg-[#4353FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">
                {searchTerm ? 'No testimonials found matching your search' : 'No testimonials yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
