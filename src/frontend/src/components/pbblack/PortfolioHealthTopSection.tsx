import { TrendingUp } from 'lucide-react';

interface PortfolioHealthTopSectionProps {
  managerName: string;
  managerPhoto: string;
  healthScore: number;
}

export default function PortfolioHealthTopSection({
  managerName,
  managerPhoto,
  healthScore,
}: PortfolioHealthTopSectionProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-gold-lg">
      <div className="grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
        {/* Concierge Photo & Name */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/40 shadow-gold">
            <img
              src={managerPhoto}
              alt={managerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Your Concierge
            </p>
            <p className="text-sm font-medium text-foreground">{managerName}</p>
          </div>
        </div>

        {/* Portfolio Health Score */}
        <div className="text-center lg:text-left space-y-2">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Portfolio Health Score
              </p>
              <p className="text-4xl font-serif font-bold gold-text">
                {healthScore}/100
              </p>
            </div>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl">
            Your portfolio is strong but can be optimized.
          </p>
        </div>

        {/* Visual Indicator */}
        <div className="hidden lg:block">
          <div className="w-32 h-32 rounded-full border-4 border-gold/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gold">{healthScore}</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
