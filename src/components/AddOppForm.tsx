import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThreatLevel, Opp } from "@/types/opp";

interface AddOppFormProps {
  onAdd: (opp: Omit<Opp, 'id' | 'dateAdded'>) => void;
}

const AddOppForm = ({ onAdd }: AddOppFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>("medium");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd({
      name: name.trim(),
      alias: alias.trim() || undefined,
      threatLevel,
      status: 'active',
      notes: notes.trim() || undefined,
    });
    
    setName("");
    setAlias("");
    setThreatLevel("medium");
    setNotes("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="w-full py-5 sm:py-6 border-dashed text-sm sm:text-base"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        ADD NEW OPP
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-primary bg-card/50 p-3 sm:p-4 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <h3 className="font-display text-base sm:text-lg text-primary">NEW TARGET</h3>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2 block">
            Name *
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter target name..."
            required
            className="h-9 sm:h-10 text-sm"
          />
        </div>
        
        <div>
          <label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2 block">
            Alias
          </label>
          <Input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Known aliases..."
            className="h-9 sm:h-10 text-sm"
          />
        </div>
      </div>
      
      <div>
        <label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2 block">
          Threat Level
        </label>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {(['low', 'medium', 'high', 'critical'] as ThreatLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setThreatLevel(level)}
              className={`py-1.5 sm:py-2 px-1 sm:px-3 border text-[10px] sm:text-xs uppercase transition-all ${
                threatLevel === level 
                  ? level === 'critical' ? 'border-primary bg-primary/20 text-primary'
                  : level === 'high' ? 'border-orange-500 bg-orange-500/20 text-orange-500'
                  : level === 'medium' ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500'
                  : 'border-secondary bg-secondary/20 text-secondary'
                  : 'border-border text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2 block">
          Notes
        </label>
        <Input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional intel..."
          className="h-9 sm:h-10 text-sm"
        />
      </div>
      
      <Button type="submit" variant="default" className="w-full h-9 sm:h-10 text-sm">
        <Plus className="w-4 h-4 mr-2" />
        CONFIRM TARGET
      </Button>
    </form>
  );
};

export default AddOppForm;
