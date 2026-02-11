import { User, Shield, Heart, Home, Car, Plane, Briefcase, Users } from 'lucide-react';

export default function ComprehensiveCoverageSection() {
  const insuranceTypes = [
    { icon: Heart, label: 'Health Insurance' },
    { icon: Shield, label: 'Life Insurance' },
    { icon: Home, label: 'Home Insurance' },
    { icon: Car, label: 'Motor Insurance' },
    { icon: Plane, label: 'Travel Insurance' },
    { icon: Briefcase, label: 'Business Insurance' },
    { icon: Users, label: 'Group Insurance' },
    { icon: Shield, label: 'Personal Accident' }
  ];

  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 gold-text">
              Comprehensive Coverage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              One dedicated insurance manager for all your policies
            </p>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              Your personal insurance manager oversees your entire portfolio—from health to motor, travel to home. No more juggling multiple advisors or scattered policies.
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <User className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gold">
                All Insurance Types Covered
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {insuranceTypes.map((type, idx) => {
                const Icon = type.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-gold/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-sm font-medium text-center text-foreground/90">
                      {type.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-border/30">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-muted-foreground">
                  <span className="text-gold font-medium">Single point of contact:</span> Your manager knows your complete risk profile and coordinates across all policies for seamless coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
