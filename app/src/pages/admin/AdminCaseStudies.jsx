import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { fetchCaseStudies, deleteCaseStudy } from '../../lib/api';

const AdminCaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: fetchCaseStudies,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCaseStudy,
    onSuccess: () => {
      queryClient.invalidateQueries(['caseStudies']);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredStudies = caseStudies?.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-3xl font-bold text-[#0A0A0A]">Case Studies</h1>
              <p className="text-gray-600 mt-1">Manage your success stories</p>
            </div>
          </div>
          <Link
            to="/admin/case-studies/new"
            className="bg-[#4353FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Case Study
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none"
            />
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies?.length > 0 ? (
            filteredStudies.map((study) => (
              <div key={study._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  {study.featuredImage ? (
                    <img
                      src={study.featuredImage}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No image</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#0A0A0A] mb-1 line-clamp-1">{study.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{study.clientName}</p>
                  
                  {study.results && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.results.map((result, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs"
                        >
                          {result.metric}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link
                      to={`/admin/case-studies/edit/${study._id}`}
                      className="flex-1 bg-[#4353FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(study._id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">
                {searchTerm ? 'No case studies found matching your search' : 'No case studies yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCaseStudies;
