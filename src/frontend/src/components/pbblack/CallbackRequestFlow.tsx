import { useState } from 'react';
import { X, Phone, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PremiumButton from './PremiumButton';
import { Button } from '@/components/ui/button';

interface CallbackRequestFlowProps {
  policyType: string;
  onClose: () => void;
}

export default function CallbackRequestFlow({
  policyType,
  onClose,
}: CallbackRequestFlowProps) {
  const [timeWindow, setTimeWindow] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side only - show confirmation
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-gold/30">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2 gold-text">
              Callback Requested
            </h3>
            <p className="text-muted-foreground mb-6">
              Your manager will call you during your preferred time window.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-muted-foreground mb-1">Policy</p>
              <p className="text-base font-medium text-foreground mb-3">
                {policyType}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                Preferred Time
              </p>
              <p className="text-base font-medium text-foreground">
                {timeWindow}
              </p>
            </div>
            <PremiumButton onClick={onClose} className="w-full">
              Close
            </PremiumButton>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif gold-text flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Request a Callback
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Policy</p>
            <p className="text-base font-medium text-foreground">{policyType}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-window" className="text-foreground">
              Preferred Time Window
            </Label>
            <Select value={timeWindow} onValueChange={setTimeWindow} required>
              <SelectTrigger id="time-window">
                <SelectValue placeholder="Select a time window" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-foreground">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any specific questions or concerns..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <PremiumButton type="submit" className="flex-1" disabled={!timeWindow}>
              Submit Request
            </PremiumButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
