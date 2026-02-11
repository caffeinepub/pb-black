import { Calendar, AlertCircle, Phone } from 'lucide-react';
import PremiumButton from './PremiumButton';

interface UpcomingActionsSectionProps {
  onRequestCallback: () => void;
  onScheduleMeeting: () => void;
}

export default function UpcomingActionsSection({
  onRequestCallback,
  onScheduleMeeting,
}: UpcomingActionsSectionProps) {
  const actions = [
    {
      icon: <Calendar className="w-5 h-5 text-gold" />,
      type: 'Renewal',
      title: 'Health Insurance Renewal',
      date: 'Due March 15, 2026',
      priority: 'normal',
    },
    {
      icon: <Calendar className="w-5 h-5 text-gold" />,
      type: 'Review',
      title: 'Quarterly Portfolio Review',
      date: 'Scheduled for March 1, 2026',
      priority: 'normal',
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-gold" />,
      type: 'Alert',
      title: 'Document Upload Required',
      date: 'Complete by Feb 28, 2026',
      priority: 'high',
    },
  ];

  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
        Upcoming Actions
      </h3>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-4 mb-6">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gold uppercase tracking-wider">
                    {action.type}
                  </span>
                  {action.priority === 'high' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold">
                      Priority
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {action.title}
                </p>
                <p className="text-xs text-muted-foreground">{action.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <PremiumButton onClick={onRequestCallback} className="flex-1 sm:flex-none">
            <Phone className="w-4 h-4 mr-2" />
            Request Callback
          </PremiumButton>
          <PremiumButton onClick={onScheduleMeeting} className="flex-1 sm:flex-none">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
