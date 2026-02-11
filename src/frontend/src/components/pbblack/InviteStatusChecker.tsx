import { useState } from 'react';
import { useCheckQualificationStatus } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PremiumButton from './PremiumButton';
import { validateEmail } from '../../lib/validators';
import { CheckCircle2, XCircle, Clock, Loader2, ArrowRight } from 'lucide-react';
import type { PremiumQualification } from '../../backend';
import { InviteStatus } from '../../backend';

export default function InviteStatusChecker() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');

  const { data: status, isLoading, refetch } = useCheckQualificationStatus(searchedEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setError('');
    setSearchedEmail(email);
    refetch();
  };

  const handleGoToDashboard = () => {
    window.history.pushState({}, '', '/member');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const getStatusIcon = (inviteStatus: PremiumQualification['status']) => {
    switch (inviteStatus) {
      case InviteStatus.approved:
        return <CheckCircle2 className="w-12 h-12 text-gold" />;
      case InviteStatus.rejected:
        return <XCircle className="w-12 h-12 text-destructive" />;
      case InviteStatus.pending:
        return <Clock className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getStatusText = (inviteStatus: PremiumQualification['status']) => {
    switch (inviteStatus) {
      case InviteStatus.approved:
        return 'Approved';
      case InviteStatus.rejected:
        return 'Rejected';
      case InviteStatus.pending:
        return 'Pending Review';
    }
  };

  const getStatusColor = (inviteStatus: PremiumQualification['status']) => {
    switch (inviteStatus) {
      case InviteStatus.approved:
        return 'border-gold/50';
      case InviteStatus.rejected:
        return 'border-destructive/50';
      case InviteStatus.pending:
        return 'border-border';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="status-email" className="text-foreground">
            Email Address
          </Label>
          <Input
            id="status-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="your.email@example.com"
            className={error ? 'border-destructive' : ''}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <PremiumButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Status'
          )}
        </PremiumButton>
      </form>

      {searchedEmail && !isLoading && (
        <div className="mt-6">
          {status ? (
            <div className={`bg-card border ${getStatusColor(status.status)} rounded-lg p-8 text-center`}>
              <div className="mb-4 flex justify-center">
                {getStatusIcon(status.status)}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2 gold-text">
                {getStatusText(status.status)}
              </h3>
              <p className="text-muted-foreground mb-4">
                Application for: {status.name}
              </p>
              
              {status.status === InviteStatus.approved && (
                <>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-foreground mb-4">
                      Welcome to PB Black! Your dedicated insurance manager will contact you shortly.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <PremiumButton onClick={handleGoToDashboard} className="w-full">
                      Go to Member Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </PremiumButton>
                  </div>
                </>
              )}

              {status.status === InviteStatus.pending && (
                <p className="text-sm text-muted-foreground mt-4">
                  Your application is under review. We'll contact you within 48 hours.
                </p>
              )}

              {status.status === InviteStatus.rejected && (
                <p className="text-sm text-muted-foreground mt-4">
                  Unfortunately, we are unable to proceed with your application at this time.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                No Application Found
              </h3>
              <p className="text-muted-foreground">
                We couldn't find an application for this email address.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
