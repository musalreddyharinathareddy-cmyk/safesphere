"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Activity, Wifi, ShieldAlert } from 'lucide-react';

interface MetricsGridProps {
  activeThreat: boolean;
}

export default function MetricsGrid({ activeThreat }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-navy/10 border-b border-navy/30 backdrop-blur-sm relative overflow-hidden">
      {/* Dynamic Background for Threat */}
      {activeThreat && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 bg-emergency"
        />
      )}

      <MetricCard 
        label="System Response Time" 
        value="0.24s" 
        subValue="Avg. 0.31s"
        icon={<Clock className="w-4 h-4 text-blue-400" />}
      />
      <MetricCard 
        label="AI Confidence" 
        value="94.2%" 
        subValue="Real-time Score"
        icon={<ShieldCheck className="w-4 h-4 text-green-400" />}
      />
      <MetricCard 
        label="Sensor Integrity" 
        value="100%" 
        subValue="402 Active Nodes"
        icon={<Wifi className="w-4 h-4 text-purple-400" />}
      />
      <MetricCard 
        label="Threat Status" 
        value={activeThreat ? "ACTIVE" : "NOMINAL"} 
        subValue={activeThreat ? "Critical Response" : "Secure Ops"}
        icon={activeThreat ? <ShieldAlert className="w-4 h-4 text-emergency animate-pulse" /> : <ShieldCheck className="w-4 h-4 text-white/40" />}
        isActive={activeThreat}
      />
    </div>
  );
}

function MetricCard({ label, value, subValue, icon, isActive = false }: { label: string, value: string, subValue: string, icon: React.ReactNode, isActive?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border flex flex-col gap-2 relative z-10 transition-all duration-500 ${
      isActive ? 'bg-emergency/20 border-emergency/50' : 'bg-black/40 border-navy/30'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</span>
        {icon}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-xl font-black tracking-tighter ${isActive ? 'text-emergency' : 'text-white'}`}>{value}</span>
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">{subValue}</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-[2px] bg-navy/20 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          className={`h-full ${isActive ? 'bg-emergency' : 'bg-navy'}`}
        />
      </div>
    </div>
  );
}
