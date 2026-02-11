import { AlertCircle } from 'lucide-react';

interface DisclaimerProps {
  className?: string;
}

export default function Disclaimer({ className = '' }: DisclaimerProps) {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="bg-card/50 border border-border/50 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Invite-Only Service:</strong> PB Black membership is by invitation only. 
              Submission of this application does not guarantee acceptance.
            </p>
            <p>
              <strong className="text-foreground">No Guarantees:</strong> While we provide dedicated concierge support, 
              insurance underwriting and claims decisions are made by insurance companies per policy terms. 
              PB Black does not guarantee policy approval or claim outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
