import { Shield, Clock, MapPin, Users } from 'lucide-react';

export default function MomentOfTruthSection() {
  const features = [
    {
      icon: Users,
      text: 'Your dedicated manager assists end-to-end'
    },
    {
      icon: MapPin,
      text: '180 city on-ground support'
    },
    {
      icon: Clock,
      text: '24×7 claims assistance'
    },
    {
      icon: Shield,
      text: '600+ claim assistants nationwide'
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text">
            Moment of Truth
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insurance is tested during crisis. PB Black stands beside you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-gold/30 rounded-lg p-8 md:p-12 shadow-gold/10 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-gold text-center">
              Concierge Claims Service
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-lg text-foreground pt-2">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
