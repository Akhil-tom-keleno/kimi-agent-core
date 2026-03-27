import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FileText, Edit, Eye, ArrowLeft, Home, TrendingUp, Settings, Users, DollarSign, Mail } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { fetchPages } from '../../lib/api';

const AdminPages = () => {
  const { data: pages, isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: fetchPages,
  });

  const pageIcons = {
    home: Home,
    'revenue-management': TrendingUp,
    operations: Settings,
    about: Users,
    pricing: DollarSign,
    contact: Mail,
    blog: FileText,
  };

  const pageLabels = {
    home: 'Homepage',
    'revenue-management': 'Revenue Management',
    operations: 'Operations',
    about: 'About Us',
    pricing: 'Pricing',
    contact: 'Contact',
    blog: 'Blog',
  };

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
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin"
            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0A0A0A]">Pages</h1>
            <p className="text-gray-600 mt-1">Manage your website pages</p>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages?.map((page) => {
            const Icon = pageIcons[page.slug] || FileText;
            const label = pageLabels[page.slug] || page.title;

            return (
              <div key={page._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#4353FF]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      page.isPublished 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {page.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-1">{label}</h3>
                  <p className="text-gray-500 text-sm mb-4">/{page.slug}</p>

                  <div className="flex gap-2">
                    <Link
                      to={`/admin/pages/edit/${page._id}`}
                      className="flex-1 bg-[#4353FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <a
                      href={`/${page.slug === 'home' ? '' : page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
