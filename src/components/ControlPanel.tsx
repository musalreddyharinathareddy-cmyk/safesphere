"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShieldAlert, Heart, Siren, Volume2, Eye, Activity, Lightbulb, Train } from 'lucide-react';
import { AlertType } from '../types';

interface ControlPanelProps {
  onTrigger: (type: AlertType, message: string, confidence: number) => void;
  onClear: () => void;
  strobeMode: boolean;
  transitLockdown: boolean;
}

export default function ControlPanel({ onTrigger, onClear, strobeMode, transitLockdown }: ControlPanelProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-card/40 backdrop-blur-md rounded-xl border border-navy/30 h-full">
      <div className="flex items-center gap-3 border-b border-navy/30 pb-4">
        <Play className="w-5 h-5 text-white/60" />
        <h2 className="text-sm font-bold tracking-widest uppercase">Simulation Engine</h2>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Manual Triggers</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => onTrigger('Acoustic', 'High-intensity scream detected in corridor B', 92)}
            className="flex items-center justify-between p-4 bg-navy/20 hover:bg-emergency/10 border border-navy/40 hover:border-emergency/50 rounded-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-blue-400 group-hover:text-emergency" />
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-white">Detect Scream</p>
                <p className="text-[10px] text-white/40">Acoustic Alert Simulation</p>
              </div>
            </div>
            <ShieldAlert className="w-4 h-4 text-white/20 group-hover:text-emergency" />
          </button>

          <button 
            onClick={() => onTrigger('Visual', 'Physical struggle / Skeletal anomaly detected', 88)}
            className="flex items-center justify-between p-4 bg-navy/20 hover:bg-emergency/10 border border-navy/40 hover:border-emergency/50 rounded-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-purple-400 group-hover:text-emergency" />
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-white">Detect Struggle</p>
                <p className="text-[10px] text-white/40">Visual Anomaly Simulation</p>
              </div>
            </div>
            <ShieldAlert className="w-4 h-4 text-white/20 group-hover:text-emergency" />
          </button>

          <button 
            onClick={() => onTrigger('Biometric', 'User HR > 160bpm. Potential cardiac/panic event.', 75)}
            className="flex items-center justify-between p-4 bg-navy/20 hover:bg-navy/40 border border-navy/40 hover:border-white/20 rounded-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-white">High Heart Rate</p>
                <p className="text-[10px] text-white/40">Wearable Biometric Feed</p>
              </div>
            </div>
            <Activity className="w-4 h-4 text-white/20 group-hover:text-white/40" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Autonomous Protocols</h3>
        
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
            strobeMode ? 'bg-emergency/20 border-emergency text-emergency strobe-mode' : 'bg-black/40 border-navy/30 text-white/40'
          }`}>
            <div className="flex items-center gap-3">
              <Lightbulb className={`w-5 h-5 ${strobeMode ? 'text-emergency' : 'text-white/20'}`} />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest">Smart Lighting</p>
                <p className="text-[9px] font-mono">{strobeMode ? 'MODE: STROBE_ACTIVE' : 'MODE: STANDARD'}</p>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
            transitLockdown ? 'bg-emergency/20 border-emergency text-emergency' : 'bg-black/40 border-navy/30 text-white/40'
          }`}>
            <div className="flex items-center gap-3">
              <Train className={`w-5 h-5 ${transitLockdown ? 'text-emergency' : 'text-white/20'}`} />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest">Transit Lockdown</p>
                <p className="text-[9px] font-mono">{transitLockdown ? 'STATUS: ENGAGED' : 'STATUS: DISENGAGED'}</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={onClear}
          className="w-full py-3 mt-2 bg-navy hover:bg-navy/80 border border-navy/40 text-white/60 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-all rounded-lg"
        >
          Reset All Systems
        </button>
      </div>
    </div>
  );
}
