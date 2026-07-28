import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Testimonial } from '../../types';
import AnimatedSection from '../AnimatedSection';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      if (!error && data) setTestimonials(data as Testimonial[]);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">What Our Clients Say</h2>
          <p className="text-navy-600 max-w-xl mx-auto">Hear from the families and investors who have found their perfect properties with Elite Horizon.</p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <AnimatedSection key={t.id} delay={idx * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-navy-100/50 h-full flex flex-col">
                  <Quote className="h-8 w-8 text-gold-400 mb-4" />
                  <p className="text-navy-700 leading-relaxed mb-6 flex-1">{t.content}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-navy-900 text-sm">{t.name}</h4>
                      <p className="text-navy-500 text-xs">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-12">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
          >
            Read All Testimonials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
