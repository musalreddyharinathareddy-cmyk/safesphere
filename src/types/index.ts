export type AlertType = 'Acoustic' | 'Visual' | 'Biometric';
export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  confidence: number;
  location: string;
  timestamp: string;
  sensorId: string;
}

export interface SmartNode {
  id: string;
  name: string;
  status: 'Online' | 'Offline' | 'Alert';
  type: 'Bus Stop' | 'Train' | 'Street Pole';
  coordinates: { x: number; y: number };
}

export interface SentinelState {
  alerts: Alert[];
  smartNodes: SmartNode[];
  strobeMode: boolean;
  transitLockdown: boolean;
  activeThreat: boolean;
}
