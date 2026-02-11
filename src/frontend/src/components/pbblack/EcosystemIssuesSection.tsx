import { AlertCircle, Users, FileX, PhoneOff, CalendarX } from 'lucide-react';

export default function EcosystemIssuesSection() {
  const issues = [
    {
      icon: Users,
      title: 'Multiple Point of Contacts',
      description: 'Different policies mean dealing with different agents, creating confusion and inefficiency.'
    },
    {
      icon: FileX,
      title: 'Outdated Policies',
      description: 'Stuck with outdated policies and offerings that no longer meet your evolving needs.'
    },
    {
      icon: PhoneOff,
      title: 'No Direct Assistance at Claims',
      description: 'When you need help most during claims, there\'s no one to guide you through the process.'
    },
    {
      icon: CalendarX,
      title: 'No Concierge Support',
      description: 'Renewals and policy updates are left to you with no dedicated support or guidance.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-gold" />
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-gold">
            Insurance related challenges you must be facing today in your busy life
          </h3>
        </div>
        <p className="text-muted-foreground text-lg">
          The problems with traditional insurance management
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {issues.map((issue, idx) => {
          const Icon = issue.icon;
          return (
            <div
              key={idx}
              className="bg-card border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-all hover:shadow-gold/20 hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    {issue.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
