import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <BenefitsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
