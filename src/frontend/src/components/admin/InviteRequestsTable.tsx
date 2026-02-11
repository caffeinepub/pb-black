import { useState } from 'react';
import { useGetAllQualifications, useUpdateQualificationStatus } from '../../hooks/useQueries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { InviteStatus, type PremiumQualification } from '../../backend';

export default function InviteRequestsTable() {
  const { data: qualifications, isLoading } = useGetAllQualifications();
  const updateStatus = useUpdateQualificationStatus();
  const [expandedRow, setExpandedRow] = useState<bigint | null>(null);

  const handleStatusUpdate = async (qualificationId: bigint, status: InviteStatus) => {
    try {
      await updateStatus.mutateAsync({ qualificationId, status });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusBadge = (status: InviteStatus) => {
    switch (status) {
      case InviteStatus.approved:
        return <Badge className="bg-gold/20 text-gold border-gold/30">Approved</Badge>;
      case InviteStatus.rejected:
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const formatPremiumRange = (range: string) => {
    const rangeMap: Record<string, string> = {
      range25kTo50k: '₹25k-50k',
      range50kTo75k: '₹50k-75k',
      range75kTo100k: '₹75k-100k',
      range100kPlus: '₹100k+'
    };
    return rangeMap[range] || range;
  };

  const formatOccupation = (occupation: string) => {
    const occupationMap: Record<string, string> = {
      ceoOrExecutive: 'CEO/Executive',
      partnerOrDirector: 'Partner/Director',
      entrepreneurBusinessOwner: 'Entrepreneur',
      medicalProfessional: 'Medical',
      lawProfessional: 'Law',
      pilot: 'Pilot',
      corporateProfessional: 'Corporate',
      notListed: 'Other'
    };
    return occupationMap[occupation] || occupation;
  };

  const formatCallTime = (time: string) => {
    const timeMap: Record<string, string> = {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening'
    };
    return timeMap[time] || time;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!qualifications || qualifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No qualification applications yet.</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-card/50">
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qualifications.map((qualification: PremiumQualification) => (
            <>
              <TableRow key={qualification.id.toString()} className="hover:bg-card/30">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedRow(expandedRow === qualification.id ? null : qualification.id)}
                  >
                    {expandedRow === qualification.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{qualification.name}</TableCell>
                <TableCell>{qualification.email}</TableCell>
                <TableCell>{qualification.phone}</TableCell>
                <TableCell>{getStatusBadge(qualification.status)}</TableCell>
                <TableCell>
                  {new Date(Number(qualification.timestamp / BigInt(1000000))).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {qualification.status === InviteStatus.pending && (
                    <>
                      <Button
                        size="sm"
                        className="bg-gold/20 text-gold hover:bg-gold/30 border-gold/30"
                        onClick={() => handleStatusUpdate(qualification.id, InviteStatus.approved)}
                        disabled={updateStatus.isPending}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusUpdate(qualification.id, InviteStatus.rejected)}
                        disabled={updateStatus.isPending}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
              {expandedRow === qualification.id && (
                <TableRow className="bg-card/20">
                  <TableCell colSpan={7}>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                          <p className="text-sm text-foreground break-all">{qualification.linkedin}</p>
                        </div>
                        {qualification.totalHealthCover && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Health Cover</p>
                            <p className="text-sm text-foreground">₹{qualification.totalHealthCover.toString()}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Annual Premium</p>
                          <p className="text-sm text-foreground">{formatPremiumRange(qualification.annualPremiumRange)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                          <p className="text-sm text-foreground">{formatOccupation(qualification.occupation)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Preferred Call Time</p>
                          <p className="text-sm text-foreground">{formatCallTime(qualification.preferredCallTime)}</p>
                        </div>
                        {qualification.referredBy && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Referred By</p>
                            <p className="text-sm text-foreground">{qualification.referredBy}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
