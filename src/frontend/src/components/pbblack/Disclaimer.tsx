import { AlertCircle } from 'lucide-react';

interface DisclaimerProps {
  className?: string;
}

export default function Disclaimer({ className = '' }: DisclaimerProps) {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong className="text-foreground">Important:</strong> PB Black is an invite-only service. 
              Submitting this form is a request for invitation and does not guarantee acceptance or enrollment.
            </p>
            <p>
              Our services provide insurance management and concierge support. We do not guarantee specific 
              underwriting outcomes or claim approvals, which remain subject to policy terms and insurer decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
