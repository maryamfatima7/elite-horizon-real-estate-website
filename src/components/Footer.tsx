import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 border border-gold-500/30">
                <span className="text-lg font-bold text-gold-400">E</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg font-bold tracking-wide text-white">Elite Horizon</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Real Estate</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Redefining luxury real estate with exceptional properties, personalized service, and unmatched market expertise.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-gold-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-white/50 hover:text-gold-400 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-white/50 hover:text-gold-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-white/50 hover:text-gold-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Properties', 'Agents', 'Blog', 'Contact'].map((label) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {['Buy a Home', 'Sell a Home', 'Rent a Property', 'Property Management', 'Investment Consulting', 'Market Analysis'].map(
                (label) => (
                  <li key={label}>
                    <span className="text-sm text-white/60 hover:text-gold-400 transition-colors cursor-pointer">
                      {label}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">123 Luxury Avenue, Suite 500<br />Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-400 shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-white/60 hover:text-gold-400 transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <a href="mailto:info@elitehorizon.com" className="text-sm text-white/60 hover:text-gold-400 transition-colors">info@elitehorizon.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© 2026 Elite Horizon Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-xs text-white/40 hover:text-white/60 cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
