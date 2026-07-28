import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Agent } from '../../types';
import AnimatedSection from '../AnimatedSection';

export default function MeetOurAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .limit(4);
      if (!error && data) setAgents(data as Agent[]);
      setLoading(false);
    }
    fetchAgents();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-gold-600 text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Team</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Meet Our Agents</h2>
          <p className="text-navy-600 max-w-xl mx-auto">Our experienced team of professionals is dedicated to helping you achieve your real estate goals.</p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-navy-50 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent, idx) => (
              <AnimatedSection key={agent.id} delay={idx * 0.1}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={agent.image_url}
                      alt={agent.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-3">
                        {agent.phone && (
                          <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/20 backdrop-blur-sm px-3 py-2 text-xs font-medium text-white hover:bg-white/30 transition-colors">
                            <Phone className="h-3.5 w-3.5" /> Call
                          </a>
                        )}
                        {agent.email && (
                          <a href={`mailto:${agent.email}`} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white/20 backdrop-blur-sm px-3 py-2 text-xs font-medium text-white hover:bg-white/30 transition-colors">
                            <Mail className="h-3.5 w-3.5" /> Email
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-serif text-lg font-semibold text-navy-900 mb-1">{agent.name}</h3>
                    <p className="text-gold-600 text-sm font-medium mb-3">{agent.title}</p>
                    <p className="text-navy-500 text-xs leading-relaxed line-clamp-3">{agent.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <AnimatedSection className="text-center mt-12">
          <Link
            to="/agents"
            className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl"
          >
            View All Agents
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
