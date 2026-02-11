import { Shield, TrendingUp, Users, Award } from 'lucide-react';

export default function EligibilitySection() {
  const criteria = [
    {
      icon: TrendingUp,
      title: 'HNI Clients',
      description: 'Annual premium ₹100,000+'
    },
    {
      icon: Award,
      title: 'Senior Professionals',
      description: 'CXOs, Partners, Directors'
    },
    {
      icon: Users,
      title: 'Entrepreneurs',
      description: 'Business owners & founders'
    },
    {
      icon: Shield,
      title: 'Member Referrals',
      description: 'Referred by existing members'
    }
  ];

  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 gold-text">
            Who Qualifies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            PB Black is invite-only. We serve India's select families.
          </p>
          <p className="text-lg text-gold font-medium">
            Limited quarterly onboarding. Apply early.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {criteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border/50 rounded-lg p-6 text-center hover:border-gold/50 transition-all hover:shadow-gold/20 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
