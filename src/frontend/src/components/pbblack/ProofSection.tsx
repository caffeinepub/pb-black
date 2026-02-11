import { Users, MapPin, Award } from 'lucide-react';

export default function ProofSection() {
  const proofPoints = [
    {
      icon: Users,
      number: '600+',
      label: 'Claim Assistants',
      description: 'Nationwide support network'
    },
    {
      icon: MapPin,
      number: '180',
      label: 'Cities',
      description: 'On-ground presence across India'
    },
    {
      icon: Award,
      number: '#1',
      label: 'Insurance Seller',
      description: 'Largest in India'
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text">
            Backed by Scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            India's largest insurance infrastructure at your service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {proofPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-gold/30 rounded-lg p-8 text-center hover:border-gold/50 transition-all hover:shadow-gold/20 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold gold-text mb-2">
                  {point.number}
                </div>
                <div className="text-xl font-semibold text-foreground mb-2">
                  {point.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
