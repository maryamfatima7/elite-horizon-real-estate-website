import { Shield, Users, TrendingUp, Award, Clock, HeartHandshake } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const features = [
  {
    icon: Shield,
    title: 'Trusted Expertise',
    description: 'Over 20 years of experience in luxury real estate with a proven track record of successful transactions.',
  },
  {
    icon: Users,
    title: 'Personalized Service',
    description: 'Every client receives dedicated attention from our expert agents tailored to your unique needs.',
  },
  {
    icon: TrendingUp,
    title: 'Market Leaders',
    description: 'We consistently achieve above-market prices for sellers and negotiate the best deals for buyers.',
  },
  {
    icon: Award,
    title: 'Award-Winning Team',
    description: 'Recognized as one of the top luxury real estate agencies with numerous industry accolades.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Our team is available around the clock to address your questions and show properties on your schedule.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Approach',
    description: 'Your satisfaction is our priority. We guide you through every step with transparency and integrity.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">Why Elite Horizon</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Why Choose Us</h2>
          <p className="text-navy-600 max-w-xl mx-auto">We combine deep market knowledge with personalized service to deliver exceptional results for every client.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <AnimatedSection key={feature.title} delay={idx * 1.1}>
              <div className="group p-8 rounded-2xl bg-navy-50/50 border border-navy-100/50 hover:bg-navy-800 hover:border-navy-700 transition-all duration-300">
                <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy-900 mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed group-hover:text-navy-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
