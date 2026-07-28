import { useEffect, useState } from 'react';
import { Phone, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Agent } from '../types';
import AnimatedSection from '../components/AnimatedSection';

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      const { data, error } = await supabase.from('agents').select('*');
      if (!error && data) setAgents(data as Agent[]);
      setLoading(false);
    }
    fetchAgents();
  }, []);

  return (
    <div>
      <section className="relative py-28 bg-navy-900">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600" alt="Team" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Team</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Meet Our Agents</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Experienced professionals dedicated to helping you navigate the luxury real estate market.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-navy-50 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents.map((agent, idx) => (
                <AnimatedSection key={agent.id} delay={idx * 0.1}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img src={agent.image_url} alt={agent.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-3 justify-center">
                          {agent.social?.linkedin && (
                            <a href={agent.social.linkedin} className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {agent.social?.twitter && (
                            <a href={agent.social.twitter} className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                          {agent.social?.instagram && (
                            <a href={agent.social.instagram} className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                              <Instagram className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-serif text-xl font-semibold text-navy-900 mb-1">{agent.name}</h3>
                      <p className="text-gold-600 text-sm font-medium mb-3">{agent.title}</p>
                      <p className="text-navy-500 text-sm leading-relaxed mb-5">{agent.bio}</p>
                      <div className="flex gap-3 justify-center">
                        {agent.phone && (
                          <a href={`tel:${agent.phone}`} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-50 px-4 py-2 text-xs font-medium text-navy-700 hover:bg-navy-100 transition-colors">
                            <Phone className="h-3.5 w-3.5" /> Call
                          </a>
                        )}
                        {agent.email && (
                          <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-50 px-4 py-2 text-xs font-medium text-navy-700 hover:bg-navy-100 transition-colors">
                            <Mail className="h-3.5 w-3.5" /> Email
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
