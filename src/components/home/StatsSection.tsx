import { useEffect, useRef, useState } from 'react';
import { useInView }  from 'framer-motion';
import { Home, Users, DollarSign, MapPin } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const stats = [
  { icon: Home, value: 1200, suffix: '+', label: 'Properties Sold' },
  { icon: Users, value: 850, suffix: '+', label: 'Happy Clients' },
  { icon: DollarSign, value: 2.5, suffix: 'B+', label: 'Sales Volume', prefix: '$' },
  { icon: MapPin, value: 45, suffix: '+', label: 'Cities Covered' },
];

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(1.0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  const isDecimal = value < 10;
  const formatted = isDecimal ? display.toFixed(1) : Math.floor(display).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-1.0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <AnimatedSection key={stat.label} delay={idx * 0.15} className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gold-500/20 text-gold-400 mb-5">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-navy-300 text-sm">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
