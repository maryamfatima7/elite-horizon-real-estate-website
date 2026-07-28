import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Properties', path: '/properties' },
  { label: 'Agents', path: '/agents' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800">
                <span className="text-lg font-bold text-gold-400">E</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-serif text-lg font-bold tracking-wide transition-colors ${
                    isScrolled ? 'text-navy-900' : 'text-white'
                  }`}
                >
                  Elite Horizon
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    isScrolled ? 'text-navy-600' : 'text-white/80'
                  }`}
                >
                  Real Estate
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-gold-500 ${
                    location.pathname === link.path
                      ? isScrolled
                        ? 'text-gold-600'
                        : 'text-gold-400'
                      : isScrolled
                      ? 'text-navy-800'
                      : 'text-white/90'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+15551234567"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-navy-800' : 'text-white/90'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </a>
              <Link
                to="/contact"
                className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-gold-600 hover:shadow-lg"
              >
                Get in Touch
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled ? 'text-navy-800' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xl font-serif font-medium tracking-wide transition-colors hover:text-gold-400 ${
                location.pathname === link.path ? 'text-gold-400' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 rounded-full bg-gold-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-gold-600"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </>
  );
}
