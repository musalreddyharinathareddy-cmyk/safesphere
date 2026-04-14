import { useState, useEffect, useCallback } from 'react';
import { Alert, SmartNode, SentinelState, AlertType } from '../types';

const INITIAL_NODES: SmartNode[] = [
  { id: 'NODE-001', name: 'Central Bus Stop', status: 'Online', type: 'Bus Stop', coordinates: { x: 200, y: 150 } },
  { id: 'NODE-002', name: 'East Side Train', status: 'Online', type: 'Train', coordinates: { x: 450, y: 300 } },
  { id: 'NODE-003', name: 'North Street Pole', status: 'Online', type: 'Street Pole', coordinates: { x: 300, y: 100 } },
  { id: 'NODE-004', name: 'West Side Mall', status: 'Online', type: 'Bus Stop', coordinates: { x: 100, y: 250 } },
];

export function useSentinel() {
  const [state, setState] = useState<SentinelState>({
    alerts: [],
    smartNodes: INITIAL_NODES,
    strobeMode: false,
    transitLockdown: false,
    activeThreat: false,
  });

  const triggerAlert = useCallback((type: AlertType, message: string, confidence: number) => {
    const newAlert: Alert = {
      id: `ALERT-${Date.now()}`,
      type,
      message,
      confidence,
      location: INITIAL_NODES[Math.floor(Math.random() * INITIAL_NODES.length)].name,
      timestamp: new Date().toLocaleTimeString(),
      sensorId: `SENSOR-${Math.floor(Math.random() * 1000)}`,
    };

    setState(prev => {
      const updatedAlerts = [newAlert, ...prev.alerts].slice(0, 10);
      const isCritical = confidence > 80;
      
      return {
        ...prev,
        alerts: updatedAlerts,
        activeThreat: isCritical || prev.activeThreat,
        strobeMode: isCritical || prev.strobeMode,
        transitLockdown: isCritical || prev.transitLockdown,
      };
    });

    // Reset alert after some time (optional)
  }, []);

  const clearAlerts = useCallback(() => {
    setState(prev => ({
      ...prev,
      alerts: [],
      activeThreat: false,
      strobeMode: false,
      transitLockdown: false,
    }));
  }, []);

  return {
    ...state,
    triggerAlert,
    clearAlerts,
  };
}
