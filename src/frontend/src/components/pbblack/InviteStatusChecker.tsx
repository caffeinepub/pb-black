import { useState } from 'react';
import { useCheckInviteStatus, useGetAllManagers } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PremiumButton from './PremiumButton';
import { validateEmail } from '../../lib/validators';
import { CheckCircle2, XCircle, Clock, Loader2, User, ArrowRight } from 'lucide-react';
import type { InviteRequest } from '../../backend';

export default function InviteStatusChecker() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');

  const { data: status, isLoading, refetch } = useCheckInviteStatus(searchedEmail);
  const { data: managers } = useGetAllManagers();

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

  const getStatusIcon = (inviteStatus: InviteRequest['status']) => {
    switch (inviteStatus) {
      case 'approved':
        return <CheckCircle2 className="w-12 h-12 text-gold" />;
      case 'rejected':
        return <XCircle className="w-12 h-12 text-destructive" />;
      case 'pending':
        return <Clock className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getStatusText = (inviteStatus: InviteRequest['status']) => {
    switch (inviteStatus) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending Review';
    }
  };

  const getStatusColor = (inviteStatus: InviteRequest['status']) => {
    switch (inviteStatus) {
      case 'approved':
        return 'border-gold/50';
      case 'rejected':
        return 'border-destructive/50';
      case 'pending':
        return 'border-border';
    }
  };

  const getAssignedManager = (managerId?: bigint) => {
    if (!managerId || !managers) return null;
    return managers.find(m => m.id === managerId);
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
              
              {status.status === 'approved' && status.assignedManagerId && (
                <>
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <User className="w-5 h-5 text-gold" />
                      <h4 className="text-lg font-semibold text-gold">
                        Your Dedicated Manager
                      </h4>
                    </div>
                    {(() => {
                      const manager = getAssignedManager(status.assignedManagerId);
                      return manager ? (
                        <div className="bg-muted/30 rounded-lg p-4">
                          <p className="text-lg font-semibold text-foreground mb-2">
                            {manager.name}
                          </p>
                          {manager.bio && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {manager.bio}
                            </p>
                          )}
                          {manager.contactInfo && (
                            <p className="text-sm text-foreground">
                              {manager.contactInfo}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Manager details will be shared shortly.
                        </p>
                      );
                    })()}
                  </div>
                  
                  <div className="mt-6">
                    <PremiumButton onClick={handleGoToDashboard} className="w-full">
                      Go to Member Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </PremiumButton>
                  </div>
                </>
              )}

              {status.status === 'pending' && (
                <p className="text-sm text-muted-foreground mt-4">
                  Your application is under review. We'll contact you soon.
                </p>
              )}

              {status.status === 'rejected' && (
                <p className="text-sm text-muted-foreground mt-4">
                  Unfortunately, we are unable to proceed with your application at this time.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                No Request Found
              </h3>
              <p className="text-muted-foreground">
                We couldn't find an invitation request for this email address.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
