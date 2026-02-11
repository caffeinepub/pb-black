import { X } from 'lucide-react';

export default function ComparisonCards() {
  const problems = [
    'Sell insurance.',
    'Disappear during claims.',
    "Don't understand underwriting."
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {problems.map((problem, idx) => (
        <div
          key={idx}
          className="bg-card border border-destructive/30 rounded-lg p-6 hover:border-destructive/50 transition-all"
        >
          <div className="flex items-start gap-3">
            <X className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
            <p className="text-foreground">{problem}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
