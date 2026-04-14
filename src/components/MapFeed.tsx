"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Signal, Wifi, Activity } from 'lucide-react';
import { SmartNode, Alert } from '../types';

interface MapFeedProps {
  nodes: SmartNode[];
  activeAlert?: Alert;
}

export default function MapFeed({ nodes, activeAlert }: MapFeedProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-4 bg-black/40 cyber-grid overflow-hidden rounded-xl border border-navy/20">
      {/* Header Info */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 p-3 bg-black/80 backdrop-blur-md rounded-lg border border-navy/30">
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <Navigation className="w-3 h-3 text-white/60" />
          <span>Operational Zone: CENTRAL_01</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <Signal className="w-3 h-3 text-white/60" />
          <span>Network: SECURE_MESH_LINK</span>
        </div>
      </div>

      {/* Grid of Nodes */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-[600px] h-[400px] relative">
          {nodes.map((node) => {
            const isAlerting = activeAlert?.location === node.name;
            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ left: node.coordinates.x, top: node.coordinates.y }}
                animate={{
                  scale: isAlerting ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  repeat: isAlerting ? Infinity : 0,
                  duration: 1,
                }}
              >
                <div className="relative group cursor-pointer">
                  {/* Ripple Effect for Alert */}
                  {isAlerting && (
                    <div className="absolute inset-0 bg-emergency/20 rounded-full animate-ping scale-150" />
                  )}
                  
                  {/* Node Icon */}
                  <div className={`p-2 rounded-full border shadow-lg transition-all duration-300 ${
                    isAlerting 
                      ? 'bg-emergency/20 border-emergency text-emergency drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                      : 'bg-navy/40 border-navy/30 text-white/60 group-hover:border-white/40 group-hover:text-white'
                  }`}>
                    {node.type === 'Bus Stop' ? <MapPin className="w-4 h-4" /> :
                     node.type === 'Train' ? <Activity className="w-4 h-4" /> :
                     <Wifi className="w-4 h-4" />}
                  </div>

                  {/* Label */}
                  <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 border text-[8px] font-mono uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 ${
                    isAlerting ? 'border-emergency/40 text-emergency' : 'border-navy/40 text-white/40'
                  }`}>
                    {node.name}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Connectors (Simulated Fiber Lines) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="200" y1="150" x2="450" y2="300" stroke="#1a237e" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="200" y1="150" x2="300" y2="100" stroke="#1a237e" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="300" y1="100" x2="450" y2="300" stroke="#1a237e" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="100" y1="250" x2="200" y2="150" stroke="#1a237e" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      {/* Bottom Footer for Status */}
      <div className="mt-auto flex justify-between items-center p-3 bg-black/40 backdrop-blur-sm border-t border-navy/20 rounded-b-xl">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-white/40">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Telemetry Link: ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-white/40">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>GPS Constellation: LOCKED (12)</span>
          </div>
        </div>
        <div className="text-[9px] font-mono uppercase tracking-widest text-white/20">
          CENTRAL_OPS_GEO_V2.0.1
        </div>
      </div>
    </div>
  );
}
