import { Trash2, AlertTriangle, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Opp, ThreatLevel, OppStatus } from "@/types/opp";

interface OppCardProps {
  opp: Opp;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: OppStatus) => void;
  index: number;
}

const threatColors: Record<ThreatLevel, string> = {
  low: "text-secondary border-secondary",
  medium: "text-yellow-500 border-yellow-500",
  high: "text-orange-500 border-orange-500",
  critical: "text-primary border-primary animate-pulse",
};

const statusLabels: Record<OppStatus, { label: string; color: string }> = {
  active: { label: "ACTIVE", color: "bg-primary/20 text-primary border-primary" },
  neutralized: { label: "NEUTRALIZED", color: "bg-secondary/20 text-secondary border-secondary" },
  missing: { label: "MISSING", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500" },
};

const OppCard = ({ opp, onDelete, onStatusChange, index }: OppCardProps) => {
  const cycleStatus = () => {
    const statuses: OppStatus[] = ['active', 'neutralized', 'missing'];
    const currentIndex = statuses.indexOf(opp.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    onStatusChange(opp.id, nextStatus);
  };

  return (
    <div 
      className="animate-slide-in group relative border border-border bg-card/50 p-3 sm:p-4 hover:border-primary/50 transition-all duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Threat indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${opp.threatLevel === 'critical' ? 'bg-primary' : opp.threatLevel === 'high' ? 'bg-orange-500' : opp.threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-secondary'}`} />
      
      <div className="flex items-start justify-between gap-2 sm:gap-4 pl-3 sm:pl-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground truncate">
                {opp.name}
              </h3>
            </div>
            {opp.alias && (
              <span className="text-[10px] sm:text-xs text-muted-foreground ml-6 sm:ml-0">
                aka "{opp.alias}"
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 border ${threatColors[opp.threatLevel]} uppercase`}>
              <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />
              {opp.threatLevel}
            </span>
            
            <button 
              onClick={cycleStatus}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 border ${statusLabels[opp.status].color} uppercase cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {statusLabels[opp.status].label}
            </button>
            
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {new Date(opp.dateAdded).toLocaleDateString()}
            </span>
          </div>
          
          {opp.notes && (
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {opp.notes}
            </p>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(opp.id)}
          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all h-8 w-8 sm:h-10 sm:w-10"
        >
          
        </Button>
      </div>
    </div>
  );
};

export default OppCard;
