import { useState } from 'react';
import { Phone, Mail, MessageCircle, ArrowLeft } from 'lucide-react';
import PremiumButton from '../components/pbblack/PremiumButton';
import PremiumDivider from '../components/pbblack/PremiumDivider';
import PoliciesSection from '../components/pbblack/PoliciesSection';
import CallbackRequestFlow from '../components/pbblack/CallbackRequestFlow';
import MeetingSchedulerFlow from '../components/pbblack/MeetingSchedulerFlow';

export default function MemberDashboardPage() {
  const [showCallbackFlow, setShowCallbackFlow] = useState(false);
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleConnectManager = () => {
    // Opens contact options
  };

  const handleRequestCallback = (policyType: string) => {
    setSelectedPolicy(policyType);
    setShowCallbackFlow(true);
  };

  const handleScheduleMeeting = (policyType: string) => {
    setSelectedPolicy(policyType);
    setShowMeetingScheduler(true);
  };

  const managerDetails = {
    name: 'Udit Matta',
    email: 'udit.matta@policybazaar.com',
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </button>
            <h1 className="text-2xl font-serif font-bold gold-text">PB Black</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gold-text">
            Welcome to Your Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Your premium insurance experience, managed with excellence
          </p>
        </div>

        {/* Assigned Manager Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
            Your Dedicated Manager
          </h3>
          <div className="bg-card border border-border rounded-lg p-8 shadow-gold">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
              {/* Manager Photo */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold/30 shadow-gold">
                    <img
                      src="/assets/generated/udit-matta-portrait.dim_512x512.png"
                      alt={managerDetails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>

              {/* Manager Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-3xl font-serif font-bold mb-2 text-foreground">
                    {managerDetails.name}
                  </h4>
                  <p className="text-gold font-medium">
                    Senior Insurance Concierge
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <a
                    href={`mailto:${managerDetails.email}`}
                    className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {managerDetails.email}
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${managerDetails.phone}`}
                    className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Phone</p>
                      <p className="text-sm font-medium text-foreground">
                        {managerDetails.phone}
                      </p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${managerDetails.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <PremiumButton className="w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Connect on WhatsApp
                  </PremiumButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        <PremiumDivider />

        {/* Policies Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
            Your Policies
          </h3>
          <PoliciesSection
            onConnectManager={handleConnectManager}
            onRequestCallback={handleRequestCallback}
            onScheduleMeeting={handleScheduleMeeting}
            managerDetails={managerDetails}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} PB Black. Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Callback Request Flow */}
      {showCallbackFlow && (
        <CallbackRequestFlow
          policyType={selectedPolicy || ''}
          onClose={() => {
            setShowCallbackFlow(false);
            setSelectedPolicy(null);
          }}
        />
      )}

      {/* Meeting Scheduler Flow */}
      {showMeetingScheduler && (
        <MeetingSchedulerFlow
          policyType={selectedPolicy || ''}
          onClose={() => {
            setShowMeetingScheduler(false);
            setSelectedPolicy(null);
          }}
        />
      )}
    </div>
  );
}
