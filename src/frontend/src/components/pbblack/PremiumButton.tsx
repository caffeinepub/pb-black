import { Button } from '@/components/ui/button';
import { type ComponentPropsWithoutRef } from 'react';

interface PremiumButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode;
}

export default function PremiumButton({ children, className = '', ...props }: PremiumButtonProps) {
  return (
    <Button
      className={`gold-gradient text-black font-semibold hover:shadow-gold-lg transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
