import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Eye,
  ArrowRight
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { fetchBlogPosts, fetchCaseStudies, fetchTestimonials, API_URL } from '../../lib/api';

const AdminDashboard = () => {
  const { data: blogPosts } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });

  const { data: caseStudies } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: fetchCaseStudies,
  });

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const stats = [
    { 
      label: 'Blog Posts', 
      value: blogPosts?.length || 0, 
      icon: BookOpen, 
      color: 'bg-blue-500',
      link: '/admin/blog'
    },
    { 
      label: 'Case Studies', 
      value: caseStudies?.length || 0, 
      icon: Briefcase, 
      color: 'bg-green-500',
      link: '/admin/case-studies'
    },
    { 
      label: 'Testimonials', 
      value: testimonials?.length || 0, 
      icon: MessageSquare, 
      color: 'bg-purple-500',
      link: '/admin/testimonials'
    },
    { 
      label: 'Total Views', 
      value: '12.5K', 
      icon: Eye, 
      color: 'bg-orange-500',
      link: null
    },
  ];

  const quickActions = [
    { label: 'Add New Blog Post', icon: BookOpen, link: '/admin/blog/new', color: 'bg-blue-500' },
    { label: 'Add Case Study', icon: Briefcase, link: '/admin/case-studies/new', color: 'bg-green-500' },
    { label: 'Add Testimonial', icon: MessageSquare, link: '/admin/testimonials/new', color: 'bg-purple-500' },
    { label: 'Edit Homepage', icon: FileText, link: '/admin/pages/home', color: 'bg-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                {stat.link && (
                  <Link 
                    to={stat.link}
                    className="text-gray-400 hover:text-[#4353FF] transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
              <div className="text-3xl font-bold text-[#0A0A0A]">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-medium text-[#0A0A0A] group-hover:text-[#4353FF] transition-colors">
                  {action.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0A0A0A]">Recent Blog Posts</h2>
              <Link to="/admin/blog" className="text-[#4353FF] text-sm hover:underline">
                View All
              </Link>
            </div>
            <div className="p-6">
              {blogPosts && blogPosts.length > 0 ? (
                <div className="space-y-4">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post._id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#0A0A0A] line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to={`/admin/blog/edit/${post._id}`}
                        className="text-[#4353FF] text-sm hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No blog posts yet</p>
              )}
            </div>
          </div>

          {/* Recent Case Studies */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0A0A0A]">Recent Case Studies</h2>
              <Link to="/admin/case-studies" className="text-[#4353FF] text-sm hover:underline">
                View All
              </Link>
            </div>
            <div className="p-6">
              {caseStudies && caseStudies.length > 0 ? (
                <div className="space-y-4">
                  {caseStudies.slice(0, 5).map((study) => (
                    <div key={study._id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#0A0A0A] line-clamp-1">{study.title}</h3>
                        <p className="text-sm text-gray-500">{study.clientName}</p>
                      </div>
                      <Link
                        to={`/admin/case-studies/edit/${study._id}`}
                        className="text-[#4353FF] text-sm hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No case studies yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
