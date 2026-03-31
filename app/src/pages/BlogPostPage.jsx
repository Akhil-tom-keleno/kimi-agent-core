import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { Calendar, ArrowLeft, Tag, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Layout from '../components/Layout'
import { fetchBlogPostBySlug, fetchBlogPosts } from '../lib/api'

const BlogPostPage = () => {
  const { slug } = useParams()

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPostBySlug(slug),
  })

  const { data: relatedPosts } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  })

  if (postLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const filteredRelatedPosts = relatedPosts
    ?.filter(p => p._id !== post._id && p.category === post.category)
    ?.slice(0, 3) || []

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            {post.category && (
              <span className="inline-flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            )}
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {post.readTime && (
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
            {post.title}
          </h1>

          <p className="text-xl text-gray-400">
            {post.excerpt}
          </p>

          {post.author && (
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-white">{post.author}</div>
                {post.authorTitle && (
                  <div className="text-sm text-gray-400">{post.authorTitle}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-black">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="aspect-video bg-corex-gray rounded-2xl overflow-hidden -mt-10 relative z-10 border border-white/10">
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-10 h-10 text-gray-500" />
                  </div>
                  <p className="text-gray-500">Featured Image</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share:
            </span>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-400 prose-a:text-white prose-strong:text-white prose-blockquote:border-white/20 prose-blockquote:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {filteredRelatedPosts.length > 0 && (
        <section className="py-20 bg-corex-darker">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {filteredRelatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  to={`/blog/${relatedPost.slug}`}
                  className="feature-card rounded-2xl overflow-hidden hover:border-white/30 transition-all group"
                >
                  <div className="aspect-video bg-corex-gray flex items-center justify-center">
                    {relatedPost.featuredImage ? (
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Tag className="w-10 h-10 text-gray-600" />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-white text-sm font-medium">{relatedPost.category}</span>
                    <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-gray-300 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Maximize Your Property's Potential?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how CORE can help you achieve your rental income goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            Get in Touch
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostPage
