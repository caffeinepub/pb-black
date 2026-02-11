import { FileSearch, CheckCircle, Phone } from 'lucide-react';

export default function WhatHappensNextSection() {
  const steps = [
    {
      icon: FileSearch,
      title: 'Application Review',
      description: 'Our team carefully reviews your qualification form within 48 hours.'
    },
    {
      icon: CheckCircle,
      title: 'Eligibility Decision',
      description: 'We assess your profile against our membership criteria and notify you of the outcome.'
    },
    {
      icon: Phone,
      title: 'Personal Connect',
      description: 'If approved, your dedicated insurance manager reaches out to begin your onboarding.'
    }
  ];

  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text">
            What Happens Next
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to premium insurance concierge
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative">
                  <div className="bg-card border border-border/50 rounded-lg p-8 h-full hover:border-gold/50 transition-all hover:shadow-gold/10 hover:shadow-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-gold" />
                      </div>
                      <div className="text-5xl font-serif font-bold gold-text mb-4">
                        {idx + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gold/30" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
