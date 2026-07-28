import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost as BlogPostType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
      if (!error && data) setPosts(data as BlogPostType[]);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600" alt="Blog" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Insights</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Our Blog</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Expert advice, market insights, and stories from the world of luxury real estate.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-navy-50 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, idx) => (
                <AnimatedSection key={post.id} delay={idx * 0.1}>
                  <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      {post.category && (
                        <span className="absolute top-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-navy-500 text-xs mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                        <span className="mx-1">|</span>
                        <Tag className="h-3.5 w-3.5" />
                        <span>{post.category || 'General'}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">{post.title}</h3>
                      <p className="text-navy-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt || post.content?.substring(0, 150) + '...'}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
