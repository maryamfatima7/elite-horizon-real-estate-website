import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../types';
import AnimatedSection from '../components/AnimatedSection';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data) setTestimonials(data as Testimonial[]);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <div>
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600" alt="Interior" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Testimonials</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Client Stories</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Real experiences from the clients who have trusted us with their most important real estate decisions.</p>
        </div>
      </section>

      <section className="py-20 bg-navy-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <AnimatedSection key={t.id} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-navy-100/50 h-full flex flex-col">
                    <Quote className="h-8 w-8 text-gold-400 mb-4" />
                    <p className="text-navy-700 leading-relaxed mb-6 flex-1">{t.content}</p>
                    <div className="flex items-center gap-4">
                      <img src={t.image_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
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
        </div>
      </section>
    </div>
  );
}
