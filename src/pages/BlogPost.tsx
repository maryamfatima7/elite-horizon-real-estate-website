import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost as BlogPostType } from '../types';
import AnimatedSection from '../components/AnimatedSection';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<BlogPostType[]>([]);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) {
        setPost(data as BlogPostType);
        const { data: rel } = await supabase
          .from('blog_posts')
          .select('*')
          .neq('slug', slug)
          .limit(3);
        if (rel) setRelated(rel as BlogPostType[]);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-8 w-32 bg-navy-200 rounded" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy-500 text-lg mb-4">Article not found.</p>
          <button onClick={() => navigate('/blog')} className="text-gold-600 font-medium hover:underline">Back to blog</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="pt-28 pb-8 bg-navy-50/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-900 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </button>
          <div className="flex items-center gap-3 text-sm text-navy-500 mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at || post.created_at).toLocaleDateString()}
            </span>
            <span>|</span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {post.category || 'General'}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-6">{post.title}</h1>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={post.image_url} alt={post.title} className="w-full h-80 sm:h-96 object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="prose prose-navy max-w-none">
              <p className="text-lg text-navy-700 leading-relaxed mb-6 font-medium">{post.excerpt}</p>
              <div className="text-navy-700 leading-relaxed whitespace-pre-line">
                {post.content || 'Full article content coming soon.'}
              </div>
            </div>
          </AnimatedSection>

          {related.length > 0 && (
            <AnimatedSection className="mt-16 pt-12 border-t border-navy-100">
              <h3 className="font-serif text-2xl font-bold text-navy-900 mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group block">
                    <div className="rounded-xl overflow-hidden mb-3">
                      <img src={r.image_url} alt={r.title} className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-2">{r.title}</h4>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
