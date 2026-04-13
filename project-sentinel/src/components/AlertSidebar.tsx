"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Volume2, Eye, Activity, Clock, ShieldAlert } from 'lucide-react';
import { Alert } from '../types';

interface AlertSidebarProps {
  alerts: Alert[];
  onClear: () => void;
}

export default function AlertSidebar({ alerts, onClear }: AlertSidebarProps) {
  return (
    <div className="w-80 h-full flex flex-col bg-sidebar/50 border-l border-navy/30 backdrop-blur-md overflow-hidden relative">
      <div className="p-6 border-b border-navy/30 flex justify-between items-center bg-navy/20">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emergency animate-pulse" />
          <h2 className="text-sm font-bold tracking-widest uppercase">Active Alerts</h2>
        </div>
        <button 
          onClick={onClear}
          className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest font-mono"
        >
          Clear All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white/20 text-center space-y-2"
            >
              <Activity className="w-12 h-12 mb-2" />
              <p className="text-xs uppercase tracking-widest font-mono">System Nominal</p>
              <p className="text-[10px]">No active threats detected</p>
            </motion.div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className={`p-4 rounded-lg border relative overflow-hidden group transition-all duration-300 ${
                  alert.confidence > 80 
                    ? 'bg-emergency/10 border-emergency/50 alert-active' 
                    : 'bg-navy/10 border-navy/30'
                }`}
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div className={`p-2 rounded-md ${
                    alert.type === 'Acoustic' ? 'bg-blue-500/20 text-blue-400' :
                    alert.type === 'Visual' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-pink-500/20 text-pink-400'
                  }`}>
                    {alert.type === 'Acoustic' ? <Volume2 className="w-4 h-4" /> :
                     alert.type === 'Visual' ? <Eye className="w-4 h-4" /> :
                     <Activity className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                        {alert.type} Alert
                      </span>
                      <span className={`text-[10px] font-mono ${
                        alert.confidence > 80 ? 'text-emergency' : 'text-white/40'
                      }`}>
                        {alert.confidence}% Conf
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white group-hover:text-emergency transition-colors line-clamp-2 mb-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-[9px] text-white/40 uppercase font-mono tracking-tighter">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.timestamp}</span>
                      <span className="truncate">{alert.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Background Glitch Effect for High Confidence */}
                {alert.confidence > 80 && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emergency/5 blur-3xl rounded-full -mr-8 -mt-8" />
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-navy/30 bg-black/40 text-[9px] font-mono text-white/40 uppercase tracking-widest text-center">
        Real-time Sentinel Data Pipeline v1.0.2
      </div>
    </div>
  );
}
