import { useState } from 'react';
import { Calendar as CalendarIcon, Video, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PremiumButton from './PremiumButton';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface MeetingSchedulerFlowProps {
  policyType: string;
  onClose: () => void;
}

export default function MeetingSchedulerFlow({
  policyType,
  onClose,
}: MeetingSchedulerFlowProps) {
  const [meetingType, setMeetingType] = useState<'in-person' | 'video'>('video');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    // Client-side only - show confirmation
    setIsSubmitted(true);
  };

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  if (isSubmitted && date) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-gold/30">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2 gold-text">
              Meeting Scheduled
            </h3>
            <p className="text-muted-foreground mb-6">
              Your meeting has been scheduled successfully. You'll receive a confirmation shortly.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Policy</p>
                <p className="text-base font-medium text-foreground">
                  {policyType}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Meeting Type</p>
                <div className="flex items-center gap-2">
                  {meetingType === 'video' ? (
                    <Video className="w-4 h-4 text-gold" />
                  ) : (
                    <MapPin className="w-4 h-4 text-gold" />
                  )}
                  <p className="text-base font-medium text-foreground">
                    {meetingType === 'video' ? 'Video Meeting' : 'In-person Meeting'}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <p className="text-base font-medium text-foreground">
                    {format(date, 'MMMM dd, yyyy')} at {time}
                  </p>
                </div>
              </div>
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
      <DialogContent className="sm:max-w-lg bg-card border-gold/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif gold-text flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            Schedule a Meeting
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Policy</p>
            <p className="text-base font-medium text-foreground">{policyType}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Meeting Type</Label>
            <RadioGroup
              value={meetingType}
              onValueChange={(value) => setMeetingType(value as 'in-person' | 'video')}
            >
              <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-gold/50 transition-colors cursor-pointer">
                <RadioGroupItem value="video" id="video" />
                <Label
                  htmlFor="video"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Video Meeting</p>
                    <p className="text-sm text-muted-foreground">
                      Connect via video call
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-gold/50 transition-colors cursor-pointer">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label
                  htmlFor="in-person"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">In-person Meeting</p>
                    <p className="text-sm text-muted-foreground">
                      Meet at our office
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-foreground">
              Select Time
            </Label>
            <Select value={time} onValueChange={setTime} required>
              <SelectTrigger id="time">
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meeting-note" className="text-foreground">
              Agenda / Notes (Optional)
            </Label>
            <Textarea
              id="meeting-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What would you like to discuss..."
              rows={3}
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
            <PremiumButton
              type="submit"
              className="flex-1"
              disabled={!date || !time}
            >
              Schedule Meeting
            </PremiumButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
