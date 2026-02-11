import { useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PremiumButton from './PremiumButton';

interface ContactMyManagerDialogProps {
  managerDetails: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
}

export default function ContactMyManagerDialog({
  managerDetails,
}: ContactMyManagerDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PremiumButton className="w-full sm:w-auto">
          Contact My Manager
        </PremiumButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif gold-text">
            Contact {managerDetails.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <a
            href={`mailto:${managerDetails.email}`}
            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">Email</p>
              <p className="text-xs text-muted-foreground truncate">
                {managerDetails.email}
              </p>
            </div>
          </a>

          <a
            href={`tel:${managerDetails.phone}`}
            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">Phone</p>
              <p className="text-xs text-muted-foreground">
                {managerDetails.phone}
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${managerDetails.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
            onClick={() => setOpen(false)}
          >
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
              <MessageCircle className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                WhatsApp
              </p>
              <p className="text-xs text-muted-foreground">
                Instant messaging
              </p>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
