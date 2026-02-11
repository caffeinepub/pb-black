import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PortfolioHealthTopSection from '../components/pbblack/PortfolioHealthTopSection';
import PBBlackInsightsSection from '../components/pbblack/PBBlackInsightsSection';
import CoverageGapAnalysisSection from '../components/pbblack/CoverageGapAnalysisSection';
import ClaimsReadinessStatusSection from '../components/pbblack/ClaimsReadinessStatusSection';
import UpcomingActionsSection from '../components/pbblack/UpcomingActionsSection';
import PoliciesSection from '../components/pbblack/PoliciesSection';
import ContactMyManagerDialog from '../components/pbblack/ContactMyManagerDialog';
import PBBlackPrivilegesBlock from '../components/pbblack/PBBlackPrivilegesBlock';
import CallbackRequestFlow from '../components/pbblack/CallbackRequestFlow';
import MeetingSchedulerFlow from '../components/pbblack/MeetingSchedulerFlow';

export default function MemberDashboardPage() {
  const [showCallbackFlow, setShowCallbackFlow] = useState(false);
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
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

      <main className="container mx-auto px-4 py-12 max-w-7xl space-y-12">
        {/* Portfolio Health Top Section */}
        <PortfolioHealthTopSection
          managerName={managerDetails.name}
          managerPhoto="/assets/generated/udit-matta-portrait.dim_512x512.png"
          healthScore={82}
        />

        {/* PB Black Insights */}
        <PBBlackInsightsSection />

        {/* Coverage Gap Analysis */}
        <CoverageGapAnalysisSection />

        {/* Claims Readiness Status */}
        <ClaimsReadinessStatusSection />

        {/* Upcoming Actions */}
        <UpcomingActionsSection
          onRequestCallback={() => setShowCallbackFlow(true)}
          onScheduleMeeting={() => setShowMeetingScheduler(true)}
        />

        {/* Policies Section */}
        <PoliciesSection />

        {/* PB Black Privileges */}
        <PBBlackPrivilegesBlock />

        {/* Contact My Manager - Single CTA */}
        <div className="flex justify-center pt-8">
          <ContactMyManagerDialog managerDetails={managerDetails} />
        </div>
      </main>

      {/* Callback Request Flow */}
      {showCallbackFlow && (
        <CallbackRequestFlow
          policyType=""
          onClose={() => setShowCallbackFlow(false)}
        />
      )}

      {/* Meeting Scheduler Flow */}
      {showMeetingScheduler && (
        <MeetingSchedulerFlow
          policyType=""
          onClose={() => setShowMeetingScheduler(false)}
        />
      )}
    </div>
  );
}
