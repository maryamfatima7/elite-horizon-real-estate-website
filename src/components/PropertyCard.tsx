import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize, ArrowRight } from 'lucide-react';
import type { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number, listingType: string) => {
    if (listingType === 'rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image_url}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">
            {property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          {property.featured && (
            <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 to-transparent p-4 pt-12">
          <p className="text-white font-semibold text-lg font-serif">
            {formatPrice(property.price, property.listing_type)}
          </p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-navy-500 text-sm mb-4">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-navy-600 mb-5">
          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-gold-500" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gold-500" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-gold-500" />
            <span>{property.area_sqft.toLocaleString()} sq ft</span>
          </div>
        </div>
        <Link
          to={`/properties/${property.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
