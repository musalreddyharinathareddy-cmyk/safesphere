"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Bell, Settings, User, Search, Map as MapIcon, LayoutDashboard, Database, Activity } from 'lucide-react';
import { useSentinel } from '../hooks/useSentinel';
import AlertSidebar from '../components/AlertSidebar';
import MapFeed from '../components/MapFeed';
import ControlPanel from '../components/ControlPanel';
import SkeletalWireframe from '../components/SkeletalWireframe';
import MetricsGrid from '../components/MetricsGrid';

export default function Dashboard() {
  const { 
    alerts, 
    smartNodes, 
    strobeMode, 
    transitLockdown, 
    activeThreat, 
    triggerAlert, 
    clearAlerts 
  } = useSentinel();

  return (
    <main className={`flex h-screen w-full bg-background overflow-hidden transition-colors duration-1000 ${
      activeThreat ? 'border-4 border-emergency/30' : ''
    }`}>
      {/* Sidebar Navigation */}
      <div className="w-16 h-full flex flex-col items-center py-6 bg-sidebar border-r border-navy/30 gap-8">
        <div className="p-3 bg-navy/20 rounded-xl border border-navy/40">
          <Shield className="w-6 h-6 text-white" />
        </div>
        
        <nav className="flex flex-col gap-6">
          <NavItem icon={<LayoutDashboard className="w-5 h-5" />} active />
          <NavItem icon={<MapIcon className="w-5 h-5" />} />
          <NavItem icon={<Database className="w-5 h-5" />} />
          <NavItem icon={<Activity className="w-5 h-5" />} />
          <NavItem icon={<Settings className="w-5 h-5" />} />
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <div className="relative cursor-pointer hover:text-white transition-colors text-white/40">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emergency rounded-full" />
          </div>
          <div className="p-1 rounded-full border border-navy/40 overflow-hidden">
            <div className="w-8 h-8 bg-navy flex items-center justify-center text-[10px] font-bold">JD</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-navy/30 bg-black/40 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-black tracking-[0.2em] uppercase text-white/80">Project Sentinel</h1>
            <div className="h-4 w-[1px] bg-navy/30" />
            <div className="flex items-center gap-2 px-3 py-1 bg-navy/20 rounded-full border border-navy/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">System Status: Secure</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-black/40 rounded-lg border border-navy/40 text-white/40 focus-within:border-white/20 transition-all">
              <Search className="w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search nodes, alerts, sensors..." 
                className="bg-transparent border-none outline-none text-[10px] uppercase tracking-widest font-mono w-64"
              />
            </div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              Time: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <MetricsGrid activeThreat={activeThreat} />

        {/* Dashboard Grid */}
        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Left Column: Live Feed & Skeletal Engine */}
          <div className="flex-[2] flex flex-col gap-6 overflow-hidden">
            <div className="flex-1 min-h-0">
              <MapFeed nodes={smartNodes} activeAlert={alerts[0]} />
            </div>
            
            <div className="h-1/3 flex gap-6">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Live Feed Alpha</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Rec 1080p_24fps</span>
                  </div>
                </div>
                <SkeletalWireframe isActive={activeThreat} />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Live Feed Beta</h3>
                  <div className="flex items-center gap-2 text-white/20">
                    <span className="text-[8px] font-mono uppercase tracking-widest">Idle_Stream</span>
                  </div>
                </div>
                <SkeletalWireframe isActive={false} />
              </div>
            </div>
          </div>

          {/* Right Column: Control Panel */}
          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            <ControlPanel 
              onTrigger={triggerAlert} 
              onClear={clearAlerts}
              strobeMode={strobeMode}
              transitLockdown={transitLockdown}
            />
          </div>
        </div>
      </div>

      {/* Right Alert Sidebar */}
      <AlertSidebar alerts={alerts} onClear={clearAlerts} />

      {/* Global Alert Overlay */}
      <AnimatePresence>
        {activeThreat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 border-[12px] border-emergency/20"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-emergency text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-b-xl animate-bounce">
              Sentinel Active Protocol Engaged
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function NavItem({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-navy/40 text-white shadow-[0_0_15px_rgba(26,35,126,0.5)] border border-navy/40' 
        : 'text-white/20 hover:text-white/60 hover:bg-navy/10'
    }`}>
      {icon}
    </div>
  );
}
