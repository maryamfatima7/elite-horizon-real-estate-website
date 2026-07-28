import { Award, Target, Users, Globe } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const values = [
  { icon: Target, title: 'Excellence', description: 'We strive for excellence in every transaction, ensuring our clients receive the highest level of service and the best possible outcomes.' },
  { icon: Users, title: 'Integrity', description: 'Transparency and honesty are at the core of everything we do. We build lasting relationships through trust and open communication.' },
  { icon: Globe, title: 'Innovation', description: 'We leverage cutting-edge technology and market insights to deliver a modern, efficient real estate experience.' },
  { icon: Award, title: 'Legacy', description: 'We are building a legacy of exceptional service that spans generations, treating every client like a member of our family.' },
];

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <section className="relative py-32 bg-navy-900">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600" alt="City skyline" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">About Us</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Redefining luxury real estate since 2006 with a commitment to excellence and client success.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden">
                <img src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Office interior" className="h-full w-full object-cover" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Story</p>
              <h2 className="font-serif text-3xl font-bold text-navy-900 mb-6">Two Decades of Excellence</h2>
              <div className="space-y-4 text-navy-700 leading-relaxed">
                <p>Founded in 2006, Elite Horizon Real Estate began with a simple mission: to transform the luxury real estate experience by putting clients first. What started as a small boutique agency in Beverly Hills has grown into one of the most respected names in the industry.</p>
                <p>Our team of over 50 seasoned professionals brings together expertise in sales, investment, property management, and market analysis. We have closed more than $2.5 billion in transactions and helped over 850 families find their perfect homes.</p>
                <p>Today, we continue to innovate while maintaining the personalized approach that has defined our success. From historic brownstones to modern penthouses, we are passionate about matching extraordinary properties with extraordinary people.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Values</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">What We Stand For</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <AnimatedSection key={v.title} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-navy-100/50 h-full">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gold-500/10 text-gold-600 mb-5">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-navy-900 mb-3">{v.title}</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Achievements</p>
              <h2 className="font-serif text-3xl font-bold text-white mb-6">Recognized Excellence</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>Over the years, Elite Horizon has earned numerous industry accolades and recognition. We have been ranked among the top 1% of real estate agencies nationwide by the Luxury Real Estate Network.</p>
                <p>Our agents consistently earn top producer awards, and our agency has been featured in publications including Architectural Digest, Forbes, and The Wall Street Journal for our market insights and innovative approach.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '20+', label: 'Years of Experience' },
                  { number: '50+', label: 'Expert Agents' },
                  { number: '$2.5B', label: 'Total Sales Volume' },
                  { number: '98%', label: 'Client Satisfaction' },
                ].map((item) => (
                  <div key={item.label} className="bg-navy-700/50 rounded-xl p-6 text-center">
                    <div className="font-serif text-3xl font-bold text-gold-400 mb-2">{item.number}</div>
                    <div className="text-white/60 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
