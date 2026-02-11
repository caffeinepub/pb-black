import { Shield, Car, Heart, Phone, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Policy {
  id: string;
  type: string;
  icon: React.ReactNode;
  insurer: string;
  policyNumber: string;
  sumInsured: string;
  premium: string;
  renewalDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
}

interface PoliciesSectionProps {
  onConnectManager: () => void;
  onRequestCallback: (policyType: string) => void;
  onScheduleMeeting: (policyType: string) => void;
  managerDetails: {
    email: string;
    phone: string;
    whatsapp: string;
  };
}

export default function PoliciesSection({
  onConnectManager,
  onRequestCallback,
  onScheduleMeeting,
  managerDetails,
}: PoliciesSectionProps) {
  const policies: Policy[] = [
    {
      id: '1',
      type: 'Health Insurance',
      icon: <Heart className="w-6 h-6 text-gold" />,
      insurer: 'Star Health Insurance',
      policyNumber: 'SH-2024-789456',
      sumInsured: '₹50,00,000',
      premium: '₹24,500/year',
      renewalDate: 'March 15, 2026',
      status: 'Active',
    },
    {
      id: '2',
      type: 'Term Insurance',
      icon: <Shield className="w-6 h-6 text-gold" />,
      insurer: 'HDFC Life Insurance',
      policyNumber: 'HDFC-TERM-456123',
      sumInsured: '₹1,00,00,000',
      premium: '₹18,000/year',
      renewalDate: 'June 20, 2026',
      status: 'Active',
    },
    {
      id: '3',
      type: 'Motor Insurance',
      icon: <Car className="w-6 h-6 text-gold" />,
      insurer: 'ICICI Lombard',
      policyNumber: 'ICICI-MTR-321789',
      sumInsured: '₹15,00,000 (IDV)',
      premium: '₹12,800/year',
      renewalDate: 'April 10, 2026',
      status: 'Active',
    },
  ];

  const getStatusColor = (status: Policy['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Expiring Soon':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expired':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {policies.map((policy) => (
        <div
          key={policy.id}
          className="bg-card border border-border rounded-lg p-6 hover:border-gold/50 transition-all duration-300 shadow-sm hover:shadow-gold"
        >
          <div className="grid lg:grid-cols-[auto_1fr_auto] gap-6 items-start">
            {/* Icon & Type */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                {policy.icon}
              </div>
              <div className="lg:hidden">
                <h4 className="text-xl font-serif font-bold text-foreground mb-1">
                  {policy.type}
                </h4>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    policy.status
                  )}`}
                >
                  {policy.status}
                </span>
              </div>
            </div>

            {/* Policy Details */}
            <div className="space-y-4">
              <div className="hidden lg:flex items-center gap-4">
                <h4 className="text-xl font-serif font-bold text-foreground">
                  {policy.type}
                </h4>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    policy.status
                  )}`}
                >
                  {policy.status}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Insurer</p>
                  <p className="text-sm font-medium text-foreground">
                    {policy.insurer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Policy Number
                  </p>
                  <p className="text-sm font-medium text-foreground font-mono">
                    {policy.policyNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Sum Insured
                  </p>
                  <p className="text-sm font-medium text-gold">
                    {policy.sumInsured}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Premium</p>
                  <p className="text-sm font-medium text-foreground">
                    {policy.premium}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Renewal Date
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {policy.renewalDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              {/* Connect to Manager Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full lg:w-48 border-gold/30 hover:border-gold hover:bg-gold/10"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Connect to Manager
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <a
                      href={`mailto:${managerDetails.email}?subject=Query about ${policy.type}`}
                      className="cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={`tel:${managerDetails.phone}`}
                      className="cursor-pointer"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={`https://wa.me/${managerDetails.whatsapp}?text=Hi, I have a query about my ${policy.type}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Request Callback */}
              <Button
                variant="outline"
                className="w-full lg:w-48 border-gold/30 hover:border-gold hover:bg-gold/10"
                onClick={() => onRequestCallback(policy.type)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Request a Callback
              </Button>

              {/* Schedule Meeting */}
              <Button
                variant="outline"
                className="w-full lg:w-48 border-gold/30 hover:border-gold hover:bg-gold/10"
                onClick={() => onScheduleMeeting(policy.type)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Meeting
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
