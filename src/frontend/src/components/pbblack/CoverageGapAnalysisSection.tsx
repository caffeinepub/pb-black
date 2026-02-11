import { AlertTriangle, TrendingDown, ArrowUpCircle } from 'lucide-react';

export default function CoverageGapAnalysisSection() {
  const gaps = [
    {
      icon: <AlertTriangle className="w-5 h-5 text-gold" />,
      title: 'Missing Policies',
      items: [
        'Personal Accident Cover',
        'Cyber Insurance for Digital Assets',
      ],
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-gold" />,
      title: 'Underinsured Risks',
      items: [
        'Motor: Current IDV may not cover replacement cost',
        'Health: No super top-up for catastrophic events',
      ],
    },
    {
      icon: <ArrowUpCircle className="w-5 h-5 text-gold" />,
      title: 'Suggested Upgrades',
      items: [
        'Increase health sum insured to ₹75L',
        'Add international coverage to health policy',
      ],
    },
  ];

  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
        Coverage Gap Analysis
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {gaps.map((gap, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                {gap.icon}
              </div>
              <h4 className="text-base font-semibold text-foreground">
                {gap.title}
              </h4>
            </div>
            <ul className="space-y-2">
              {gap.items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-gold mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
