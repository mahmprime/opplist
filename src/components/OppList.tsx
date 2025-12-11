import { useState } from "react";
import { Opp, OppStatus } from "@/types/opp";
import OppCard from "./OppCard";
import AddOppForm from "./AddOppForm";
import { Skull, Target } from "lucide-react";

const initialOpps: Opp[] = [
  {
    id: '1',
    name: 'Grigor Babić',
    alias: 'Merkat',
    threatLevel: 'high',
    status: 'low',
    notes: 'Known associate of multiple underground organizations. Approach with caution.',
    dateAdded: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Vasilije Malešević',
    alias: 'Skeva',
    threatLevel: 'high',
    status: 'active',
    notes: 'Last seen in downtown Kadar.',
    dateAdded: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Stefan Malešević',
    alias: 'Twink',
    threatLevel: 'medium',
    status: 'active',
    dateAdded: new Date('2024-03-10'),
    notes : "Last seen in Ramici"
  },
  {
    id: '4',
    name: 'Marko Ne znam',
    alias: 'Pizda',
    threatLevel: 'medium',
    status: 'active',
    dateAdded: new Date('2024-03-10'),
    notes : "Last seen in BG"
  },
];

const OppList = () => {
  const [opps, setOpps] = useState<Opp[]>(initialOpps);

  const addOpp = (newOpp: Omit<Opp, 'id' | 'dateAdded'>) => {
    setOpps(prev => [{
      ...newOpp,
      id: crypto.randomUUID(),
      dateAdded: new Date(),
    }, ...prev]);
  };

  const deleteOpp = (id: string) => {
    setOpps(prev => prev.filter(opp => opp.id !== id));
  };

  const updateStatus = (id: string, status: OppStatus) => {
    setOpps(prev => prev.map(opp => 
      opp.id === id ? { ...opp, status } : opp
    ));
  };

  const activeCount = opps.filter(o => o.status === 'active').length;
  const neutralizedCount = opps.filter(o => o.status === 'neutralized').length;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-muted-foreground">Active:</span>
            <span className="text-primary font-bold">{activeCount}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Skull className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-muted-foreground">Neutralized:</span>
            <span className="text-secondary font-bold">{neutralizedCount}</span>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs text-muted-foreground">
          TOTAL ENTRIES: {opps.length}
        </span>
      </div>

    
      {/* List */}
      <div className="space-y-2 sm:space-y-3">
        {opps.length === 0 ? (
          <div className="text-center py-8 sm:py-12 border border-dashed border-border">
            <Target className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-muted-foreground">No targets in database</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Add your first opp to begin surveillance</p>
          </div>
        ) : (
          opps.map((opp, index) => (
            <OppCard 
              key={opp.id} 
              opp={opp} 
              onDelete={deleteOpp}
              onStatusChange={updateStatus}
              index={index}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 pt-4 border-t border-border text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          [END OF CLASSIFIED DOCUMENT] • UNAUTHORIZED ACCESS IS PROHIBITED
        </p>
      </footer>
    </div>
  );
};

export default OppList;
