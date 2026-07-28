import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, BedDouble, Bath, Maximize, ArrowLeft,
  Check, Phone, Mail, Share2, Heart, Home, Calendar, Shield
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Property } from '../types';
import AnimatedSection from '../components/AnimatedSection';

export default function PropertyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      if (!slug) return;
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) setProperty(data as Property);
      setLoading(false);
    }
    fetchProperty();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-8 w-32 bg-navy-200 rounded" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy-500 text-lg mb-4">Property not found.</p>
          <button onClick={() => navigate('/properties')} className="text-gold-600 font-medium hover:underline">Back to properties</button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') return `$${price.toLocaleString()}/mo`;
    return `$${price.toLocaleString()}`;
  };

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image_url];
  const amenities = property.amenities || [];

  return (
    <div>
      <section className="pt-24 pb-8 bg-navy-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-900 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to listings
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">
                  {property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {property.featured && (
                  <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">Featured</span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900">{property.title}</h1>
              <div className="flex items-center gap-1.5 text-navy-500 mt-2">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">{formatPrice(property.price, property.listing_type)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setLiked(!liked)} className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all ${liked ? 'bg-red-50 border-red-200 text-red-500' : 'border-navy-200 text-navy-500 hover:bg-navy-50'}`}>
                  <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
                </button>
                <button className="h-10 w-10 rounded-full border border-navy-200 flex items-center justify-center text-navy-500 hover:bg-navy-50 transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gallery + Details */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 rounded-2xl overflow-hidden">
                    <img src={gallery[0]} alt={property.title} className="h-96 w-full object-cover" />
                  </div>
                  {gallery.slice(1, 3).map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden">
                      <img src={img} alt={`${property.title} ${i + 2}`} className="h-48 w-full object-cover" />
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-navy-100/50">
                  <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4">Description</h2>
                  <p className="text-navy-700 leading-relaxed">{property.description || 'No description available.'}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-navy-100/50">
                  <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-600">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-navy-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimatedSection>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-navy-100/50">
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-5">Property Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Home className="h-4 w-4 text-gold-500" /> Property Type
                      </div>
                      <span className="text-sm font-medium text-navy-900 capitalize">{property.property_type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <BedDouble className="h-4 w-4 text-gold-500" /> Bedrooms
                      </div>
                      <span className="text-sm font-medium text-navy-900">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Bath className="h-4 w-4 text-gold-500" /> Bathrooms
                      </div>
                      <span className="text-sm font-medium text-navy-900">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Maximize className="h-4 w-4 text-gold-500" /> Area
                      </div>
                      <span className="text-sm font-medium text-navy-900">{property.area_sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Calendar className="h-4 w-4 text-gold-500" /> Listed
                      </div>
                      <span className="text-sm font-medium text-navy-900">
                        {new Date(property.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-navy-600">
                        <Shield className="h-4 w-4 text-gold-500" /> Status
                      </div>
                      <span className="text-sm font-medium text-navy-900 capitalize">{property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="bg-navy-900 rounded-2xl p-6 text-white">
                  <h3 className="font-serif text-lg font-bold mb-4">Interested in this property?</h3>
                  <p className="text-white/60 text-sm mb-5">Contact our team to schedule a private viewing or request more information.</p>
                  <div className="space-y-3">
                    <a href="tel:+15551234567" className="flex items-center justify-center gap-2 w-full rounded-xl bg-gold-500 px-4 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-all">
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                    <a href="mailto:info@elitehorizon.com" className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                      <Mail className="h-4 w-4" /> Send Email
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
