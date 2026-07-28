import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, ChevronDown, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [listingType, setListingType] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (propertyType !== 'all') params.set('type', propertyType);
    if (listingType !== 'all') params.set('listing', listingType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt="Luxury villa"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-400 text-sm uppercase tracking-[0.3em] font-medium mb-4"
        >
          Welcome to Elite Horizon
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Find Your Dream Home
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Whether you are looking to buy, rent, or invest in luxury real estate, our expert team is here to guide you every step of the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-gold-600 hover:shadow-xl hover:-translate-y-0.5"
          >
            Browse Properties
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSearch}
          className="mx-auto max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
              <input
                type="text"
                placeholder="Location or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-navy-100 bg-navy-50/50 pl-10 pr-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
              />
            </div>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-navy-100 bg-navy-50/50 pl-10 pr-8 py-3 text-sm text-navy-900 appearance-none focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
              >
                <option value="all">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="condo">Condo</option>
                <option value="estate">Estate</option>
                <option value="townhouse">Townhouse</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400 pointer-events-none" />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-400" />
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full rounded-xl border border-navy-100 bg-navy-50/50 pl-10 pr-8 py-3 text-sm text-navy-900 appearance-none focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
              >
                <option value="all">For Sale or Rent</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-700 hover:shadow-lg"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
