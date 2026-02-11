import { CheckCircle2 } from 'lucide-react';

export default function ComparisonCards() {
  const solutions = [
    {
      title: 'One Point of Contact',
      description: 'Your dedicated insurance manager handles all your policies in one place.'
    },
    {
      title: 'Always Up-to-Date',
      description: 'Regular reviews ensure your coverage evolves with your needs and latest offerings.'
    },
    {
      title: 'End-to-End Claims Support',
      description: 'Your manager assists you throughout the entire claims process with 24×7 availability.'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {solutions.map((solution, idx) => (
        <div
          key={idx}
          className="bg-card border border-gold/30 rounded-lg p-6 hover:border-gold/50 transition-all hover:shadow-gold/20 hover:shadow-lg group"
        >
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gold">
                {solution.title}
              </h4>
              <p className="text-foreground leading-relaxed">
                {solution.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
