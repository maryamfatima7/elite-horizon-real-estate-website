import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Property } from '../../types';
import PropertyCard from '../PropertyCard';
import AnimatedSection from '../AnimatedSection';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('featured', true)
        .limit(6);
      if (!error && data) setProperties(data as Property[]);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 bg-navy-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">Featured Listings</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Exclusive Properties</h2>
          <p className="text-navy-600 max-w-xl mx-auto">Discover our handpicked selection of luxury properties in the most prestigious locations.</p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, idx) => (
              <AnimatedSection key={property.id} delay={idx * 0.1}>
                <PropertyCard property={property} />
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl"
          >
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
