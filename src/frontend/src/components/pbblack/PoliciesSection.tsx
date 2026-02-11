import { Shield, Car, Heart, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export default function PoliciesSection() {
  const policies: Policy[] = [
    {
      id: '1',
      type: 'Health Insurance',
      icon: <Heart className="w-5 h-5 text-gold" />,
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
      icon: <Shield className="w-5 h-5 text-gold" />,
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
      icon: <Car className="w-5 h-5 text-gold" />,
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
    <section>
      <h3 className="text-2xl font-serif font-bold mb-6 gold-text">
        Your Policies
      </h3>
      <Accordion type="single" collapsible className="space-y-4">
        {policies.map((policy) => (
          <AccordionItem
            key={policy.id}
            value={policy.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:border-gold/30 transition-all duration-300"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
              <div className="flex items-center gap-4 flex-1 text-left">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  {policy.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-base font-semibold text-foreground">
                      {policy.type}
                    </h4>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        policy.status
                      )}`}
                    >
                      {policy.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                    <span>{policy.insurer}</span>
                    <span>Renewal: {policy.renewalDate}</span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
