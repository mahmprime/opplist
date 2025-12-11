export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';
export type OppStatus = 'active' | 'neutralized' | 'missing';

export interface Opp {
  id: string;
  name: string;
  alias?: string;
  threatLevel: ThreatLevel;
  status: OppStatus;
  notes?: string;
  dateAdded: Date;
}
