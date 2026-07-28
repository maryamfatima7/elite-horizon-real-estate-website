import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import AnimatedSection from '../components/AnimatedSection';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    type: searchParams.get('type') || 'all',
    listing: searchParams.get('listing') || 'all',
    minPrice: '',
    maxPrice: '',
    beds: 'all',
  });

  useEffect(() => {
    async function fetchProperties() {
      let query = supabase.from('properties').select('*');

      if (filters.q) {
        query = query.or(`title.ilike.%${filters.q}%,location.ilike.%${filters.q}%,description.ilike.%${filters.q}%`);
      }
      if (filters.type !== 'all') {
        query = query.eq('property_type', filters.type);
      }
      if (filters.listing !== 'all') {
        query = query.eq('listing_type', filters.listing);
      }
      if (filters.minPrice) {
        query = query.gte('price', parseInt(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseInt(filters.maxPrice));
      }
      if (filters.beds !== 'all') {
        query = query.gte('bedrooms', parseInt(filters.beds));
      }

      const { data, error } = await query.order('featured', { ascending: false });
      if (!error && data) setProperties(data as Property[]);
      setLoading(false);
    }
    fetchProperties();
  }, [filters]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.type !== 'all') params.set('type', filters.type);
    if (filters.listing !== 'all') params.set('listing', filters.listing);
    setSearchParams(params);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({ q: '', type: 'all', listing: 'all', minPrice: '', maxPrice: '', beds: 'all' });
    setSearchParams(new URLSearchParams());
  };

  return (
    <div>
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600" alt="Properties" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Listings</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Properties</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Browse our curated collection of luxury homes, estates, and investment properties.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
              <input
                type="text"
                placeholder="Search by location, title, or keyword..."
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                className="w-full rounded-xl border border-navy-100 bg-navy-50/50 pl-10 pr-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-200 px-5 py-3 text-sm font-medium text-navy-800 hover:bg-navy-50 transition-all"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-navy-50/50 rounded-xl p-6 mb-8 border border-navy-100/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-navy-700 mb-1.5">Property Type</label>
                  <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400/50">
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="condo">Condo</option>
                    <option value="estate">Estate</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-700 mb-1.5">Listing Type</label>
                  <select value={filters.listing} onChange={(e) => setFilters({ ...filters, listing: e.target.value })} className="w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400/50">
                    <option value="all">All</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-700 mb-1.5">Min Price</label>
                  <input type="number" placeholder="0" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-700 mb-1.5">Max Price</label>
                  <input type="number" placeholder="No max" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-700 mb-1.5">Min Bedrooms</label>
                  <select value={filters.beds} onChange={(e) => setFilters({ ...filters, beds: e.target.value })} className="w-full rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400/50">
                    <option value="all">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={applyFilters} className="rounded-lg bg-navy-800 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-700 transition-all">Apply Filters</button>
                <button onClick={clearFilters} className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-5 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50 transition-all">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-navy-500 text-lg">No properties found matching your criteria.</p>
              <button onClick={clearFilters} className="mt-4 text-gold-600 font-medium hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, idx) => (
                <AnimatedSection key={property.id} delay={idx * 0.08}>
                  <PropertyCard property={property} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
