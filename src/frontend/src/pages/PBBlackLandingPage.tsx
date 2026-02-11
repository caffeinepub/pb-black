import { Shield, Users, FileCheck, Heart } from 'lucide-react';
import InviteRequestForm from '../components/pbblack/InviteRequestForm';
import InviteStatusChecker from '../components/pbblack/InviteStatusChecker';
import PremiumButton from '../components/pbblack/PremiumButton';
import ComparisonCards from '../components/pbblack/ComparisonCards';
import PremiumDivider from '../components/pbblack/PremiumDivider';
import Disclaimer from '../components/pbblack/Disclaimer';

export default function PBBlackLandingPage() {
  const scrollToApplication = () => {
    const element = document.getElementById('application-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/pb-black-logo.dim_1024x256.png" 
              alt="PB Black" 
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={navigateToAdmin}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/pb-black-hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 gold-text">
            PB Black
          </h1>
          <p className="text-2xl md:text-4xl font-serif mb-4 text-foreground">
            Insurance. Managed Like Premium Private Banking.
          </p>
          <p className="text-xl md:text-2xl mb-3 text-muted-foreground">
            Invite-only insurance concierge for India's select families.
          </p>
          <p className="text-lg md:text-xl mb-8 text-gold font-medium">
            This is not open for everyone.
          </p>
          <p className="text-base md:text-lg mb-10 text-muted-foreground">
            Request an invitation.
          </p>
          <PremiumButton onClick={scrollToApplication} size="lg">
            Apply for PB Black
          </PremiumButton>
        </div>
      </section>

      <PremiumDivider />

      {/* Target Audience Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 gold-text">
            For India's Select Few
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              'Existing HNI customers (SI > ₹25L)',
              'Corporate CXOs / Founders',
              'IIT / IIM / Top Institute Graduates',
              'Referrals from Members'
            ].map((audience, idx) => (
              <div 
                key={idx}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-gold/50 transition-all hover:shadow-gold"
              >
                <p className="text-foreground font-medium">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* Why PB Black Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 gold-text">
            Why PB Black
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Most wealth managers:
          </p>
          <ComparisonCards />
        </div>
      </section>

      <PremiumDivider />

      {/* Core Offering Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 gold-text">
            Core Offering
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-gold flex items-center gap-3">
                <Users className="w-6 h-6" />
                Your Dedicated Insurance Manager
              </h3>
              <ul className="space-y-4 text-foreground">
                <li className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <span>Free evaluation of your current insurances</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <span>All insurance managed in one place</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-gold">
                Comprehensive Coverage
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Health (Domestic & Global)',
                  'Term Insurance',
                  'ULIPs / Investment Plans',
                  'Home, Motor, Travel',
                  'Cyber / SME / Group'
                ].map((coverage, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-foreground">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                    <span>{coverage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-gold">
                Single View Insurance Overview
              </h3>
              <p className="text-foreground">
                Complete visibility of insurance coverage for you and your family in one unified dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* Moment of Truth Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 gold-text">
            Moment of Truth
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            When Claims Matter Most
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-gold/30 rounded-lg p-8 shadow-gold">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-gold">
                Concierge Claims Service
              </h3>
              <ul className="space-y-4">
                {[
                  'Your one insurance manager will assist you end to end',
                  '180 city on-ground support',
                  '24×7 assistance',
                  '600+ claim assistants'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                    </div>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PremiumDivider />

      {/* Application Section */}
      <section id="application-section" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 gold-text">
            Request an Invitation
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Submit your details to request access to PB Black. Our team will review your application.
          </p>
          <InviteRequestForm />
          <Disclaimer className="mt-8" />
        </div>
      </section>

      <PremiumDivider />

      {/* Status Checker Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 gold-text">
            Check Invitation Status
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Already applied? Check your application status here.
          </p>
          <InviteStatusChecker />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PB Black. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-gold fill-gold" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
