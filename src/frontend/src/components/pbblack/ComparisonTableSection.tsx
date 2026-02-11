import { Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ComparisonTableSection() {
  const comparisons = [
    {
      feature: 'Dedicated Manager',
      pbBlack: true,
      traditional: false
    },
    {
      feature: 'Single Point of Contact',
      pbBlack: true,
      traditional: false
    },
    {
      feature: 'Regular Policy Reviews',
      pbBlack: true,
      traditional: false
    },
    {
      feature: 'End-to-End Claims Support',
      pbBlack: true,
      traditional: false
    },
    {
      feature: '24×7 Availability',
      pbBlack: true,
      traditional: false
    },
    {
      feature: 'On-Ground Assistance (180 Cities)',
      pbBlack: true,
      traditional: false
    }
  ];

  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text">
            Why Choose PB Black
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare our concierge service with traditional advisors
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 bg-card/50">
                  <TableHead className="text-foreground font-semibold text-base py-4">Feature</TableHead>
                  <TableHead className="text-gold font-semibold text-base text-center py-4">PB Black</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-base text-center py-4">Traditional Advisors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisons.map((item, idx) => (
                  <TableRow key={idx} className="border-b border-border/30 hover:bg-card/50">
                    <TableCell className="font-medium text-foreground py-4">{item.feature}</TableCell>
                    <TableCell className="text-center py-4">
                      {item.pbBlack ? (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-gold" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center">
                            <X className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center py-4">
                      {item.traditional ? (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-gold" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center">
                            <X className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
