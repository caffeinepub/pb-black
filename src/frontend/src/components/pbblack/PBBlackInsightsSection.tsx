import { FileText, TrendingUp, Shield } from 'lucide-react';

export default function PBBlackInsightsSection() {
  const insights = [
    {
      icon: <FileText className="w-5 h-5 text-gold" />,
      title: 'Monthly Advisory Note',
      content:
        'Your health coverage remains adequate for current needs. We recommend reviewing your term insurance coverage given recent market changes in premium rates.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-gold" />,
      title: 'Medical Inflation Trends',
      content:
        'Healthcare costs have risen 12% YoY. Your current sum insured of ₹50L provides adequate buffer for the next 18 months. Consider increasing coverage during next renewal.',
    },
    {
      icon: <Shield className="w-5 h-5 text-gold" />,
      title: 'Coverage Suggestions',
      content:
        'Based on your profile, consider adding critical illness rider to your health policy. This provides additional protection without significantly impacting premium outlay.',
    },
  ];

  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
        PB Black Insights
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:border-gold/30 transition-all duration-300"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                {insight.icon}
              </div>
              <h4 className="text-base font-semibold text-foreground pt-2">
                {insight.title}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {insight.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
