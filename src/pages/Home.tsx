import HeroSection from '../components/home/HeroSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import Testimonials from '../components/home/Testimonials';
import MeetOurAgents from '../components/home/MeetOurAgents';
import FAQSection from '../components/home/FAQSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <MeetOurAgents />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
