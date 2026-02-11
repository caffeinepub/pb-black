import { CheckCircle2, Clock } from 'lucide-react';

export default function ClaimsReadinessStatusSection() {
  const statuses = [
    { label: 'Nominee Status', status: 'On file', ready: true },
    { label: 'KYC', status: 'Verified', ready: true },
    { label: 'Document Readiness', status: 'Pending 2 documents', ready: false },
    { label: 'Network Hospitals', status: '180 cities covered', ready: true },
  ];

  return (
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
        Claims Readiness Status
      </h3>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statuses.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                {item.ready ? (
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-foreground" />
                )}
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
              <p
                className={`text-sm font-medium ${
                  item.ready ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
