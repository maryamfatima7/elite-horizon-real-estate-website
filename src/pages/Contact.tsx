import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AnimatedSection from '../components/AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('contact_inquiries').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      subject: formData.subject || null,
      message: formData.message,
    });
    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div>
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600" alt="Contact" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Contact</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-white/70 max-w-2xl mx-auto">We would love to hear from you. Reach out and our team will respond within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection>
              <div className="bg-navy-900 rounded-2xl p-8 sm:p-10 text-white h-full">
                <h3 className="font-serif text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gold-500/20 text-gold-400 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-white/60 text-sm mt-1">123 Luxury Avenue, Suite 500<br />Beverly Hills, CA 90210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gold-500/20 text-gold-400 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Phone</p>
                      <a href="tel:+15551234567" className="text-white/60 text-sm mt-1 hover:text-gold-400 transition-colors">(555) 123-4567</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gold-500/20 text-gold-400 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <a href="mailto:info@elitehorizon.com" className="text-white/60 text-sm mt-1 hover:text-gold-400 transition-colors">info@elitehorizon.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gold-500/20 text-gold-400 shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Business Hours</p>
                      <p className="text-white/60 text-sm mt-1">Mon – Fri: 9:00 AM – 7:00 PM<br />Sat – Sun: 10:00 AM – 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl border border-navy-100/50 p-8 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-navy-900 mb-2">Thank You!</h3>
                    <p className="text-navy-600 text-sm">We have received your inquiry and will be in touch shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-800 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-800 mb-1.5">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                          placeholder="Property inquiry"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-800 mb-1.5">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all resize-none"
                        placeholder="Tell us about your dream property..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-12 rounded-2xl overflow-hidden border border-navy-100/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.0!2d-118.4006!3d34.0736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d0e6f5a5%3A0x7e3!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="400"
              style={{ border: 1.0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elite Horizon Location"
              className="grayscale-[30%]"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
