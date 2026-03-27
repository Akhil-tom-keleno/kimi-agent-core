import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchBlogPosts, fetchPage } from '../lib/api';

const BlogPage = () => {
  const { data: pageData, isLoading: pageLoading } = useQuery({
    queryKey: ['page', 'blog'],
    queryFn: () => fetchPage('blog'),
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });

  const isLoading = pageLoading || postsLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4353FF]"></div>
        </div>
      </Layout>
    );
  }

  const content = pageData?.content || {};
  const blogPosts = posts || [];
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#4353FF]/20 text-[#4353FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {content.hero?.title || "Insights & Resources"}
            </h1>
            <p className="text-xl text-gray-400">
              {content.hero?.subtitle || "Expert tips, market insights, and strategies for holiday home success in Dubai"}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-8">Featured Article</h2>
            <Link to={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid lg:grid-cols-2 gap-8 bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video lg:aspect-auto bg-gray-200 flex items-center justify-center">
                  {featuredPost.featuredImage ? (
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Featured Image</p>
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    {featuredPost.category && (
                      <span className="inline-flex items-center gap-1 bg-[#4353FF]/10 text-[#4353FF] px-3 py-1 rounded-full text-sm">
                        <Tag className="w-3 h-3" />
                        {featuredPost.category}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#4353FF] transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#4353FF] font-medium">
                    Read More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0A0A0A] mb-8">Recent Articles</h2>
          
          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      {post.category && (
                        <span className="text-[#4353FF] text-sm font-medium">{post.category}</span>
                      )}
                      <span className="text-gray-400 text-sm">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3 group-hover:text-[#4353FF] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">
              {content.categories?.title || "Browse by Topic"}
            </h2>
            <p className="text-gray-600">
              {content.categories?.subtitle || "Explore articles by category"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {(content.categories?.items || [
              "Revenue Management",
              "Property Operations",
              "Guest Experience",
              "Market Insights",
              "Dubai Tourism",
              "Investment Tips"
            ]).map((category, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-gray-100 text-[#0A0A0A] rounded-full font-medium hover:bg-[#4353FF] hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#4353FF]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.newsletter?.title || "Stay Updated"}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {content.newsletter?.subtitle || "Subscribe to our newsletter for the latest insights and tips"}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-[#0A0A0A] outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0A0A0A]/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
