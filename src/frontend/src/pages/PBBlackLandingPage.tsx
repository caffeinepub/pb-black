import PremiumQualificationForm from '../components/pbblack/PremiumQualificationForm';
import InviteStatusChecker from '../components/pbblack/InviteStatusChecker';
import PremiumButton from '../components/pbblack/PremiumButton';
import EligibilitySection from '../components/pbblack/EligibilitySection';
import MomentOfTruthSection from '../components/pbblack/MomentOfTruthSection';
import ComparisonTableSection from '../components/pbblack/ComparisonTableSection';
import ProofSection from '../components/pbblack/ProofSection';
import WhatHappensNextSection from '../components/pbblack/WhatHappensNextSection';
import PremiumDivider from '../components/pbblack/PremiumDivider';
import Disclaimer from '../components/pbblack/Disclaimer';
import ComprehensiveCoverageSection from '../components/pbblack/ComprehensiveCoverageSection';

export default function PBBlackLandingPage() {
  const scrollToQualification = () => {
    const element = document.getElementById('qualification-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center">
            <img 
              src="/assets/generated/pb-black-logo.dim_1024x256.png" 
              alt="PB Black" 
              className="h-8 md:h-10 w-auto max-w-full object-contain block"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/pb-black-hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in max-w-5xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8 gold-text leading-tight">
            Crisis-tested insurance. PB Black stands with you.
          </h1>
          
          <div className="space-y-4 mb-12 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground">
              Invite-only insurance concierge for HNI clients in India
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-base md:text-lg text-foreground/90">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Dedicated Insurance Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>24×7 Claims Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>180 City Presence</span>
              </div>
            </div>
          </div>

          <PremiumButton onClick={scrollToQualification} size="lg" className="text-lg px-8 py-6">
            Check If You Qualify
          </PremiumButton>
        </div>
      </section>

      <PremiumDivider />

      {/* Eligibility Section */}
      <EligibilitySection />

      <PremiumDivider />

      {/* Comprehensive Coverage Section */}
      <ComprehensiveCoverageSection />

      <PremiumDivider />

      {/* Moment of Truth Section */}
      <MomentOfTruthSection />

      <PremiumDivider />

      {/* Comparison Table Section */}
      <ComparisonTableSection />

      <PremiumDivider />

      {/* Proof Section */}
      <ProofSection />

      <PremiumDivider />

      {/* Premium Qualification Form Section */}
      <section id="qualification-section" className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text">
              Apply for PB Black
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete the qualification form. Our team reviews each application carefully.
            </p>
          </div>
          <PremiumQualificationForm />
          <Disclaimer className="mt-10" />
        </div>
      </section>

      <PremiumDivider />

      {/* What Happens Next Section */}
      <WhatHappensNextSection />

      <PremiumDivider />

      {/* Status Checker Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 gold-text">
            Check Application Status
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Already applied? Check your status here.
          </p>
          <InviteStatusChecker />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PB Black. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
