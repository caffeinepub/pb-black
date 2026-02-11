import { Crown, Shield, Clock, Sparkles } from 'lucide-react';

export default function PBBlackPrivilegesBlock() {
  const privileges = [
    {
      icon: <Crown className="w-5 h-5 text-gold" />,
      text: 'Dedicated concierge service',
    },
    {
      icon: <Shield className="w-5 h-5 text-gold" />,
      text: 'Priority claims processing',
    },
    {
      icon: <Clock className="w-5 h-5 text-gold" />,
      text: '24×7 assistance across 180 cities',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      text: 'Exclusive advisory insights',
    },
  ];

  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
        PB Black Privileges
      </h3>
      <div className="bg-gradient-to-br from-card via-card to-gold/5 border border-gold/30 rounded-lg p-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {privileges.map((privilege, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                {privilege.icon}
              </div>
              <p className="text-sm font-medium text-foreground">
                {privilege.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
