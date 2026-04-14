"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Joint {
  x: number;
  y: number;
}

interface Skeleton {
  head: Joint;
  neck: Joint;
  leftShoulder: Joint;
  rightShoulder: Joint;
  leftElbow: Joint;
  rightElbow: Joint;
  leftHand: Joint;
  rightHand: Joint;
  spine: Joint;
  leftHip: Joint;
  rightHip: Joint;
  leftKnee: Joint;
  rightKnee: Joint;
  leftFoot: Joint;
  rightFoot: Joint;
}

const INITIAL_SKELETON: Skeleton = {
  head: { x: 100, y: 30 },
  neck: { x: 100, y: 50 },
  leftShoulder: { x: 80, y: 60 },
  rightShoulder: { x: 120, y: 60 },
  leftElbow: { x: 70, y: 90 },
  rightElbow: { x: 130, y: 90 },
  leftHand: { x: 60, y: 120 },
  rightHand: { x: 140, y: 120 },
  spine: { x: 100, y: 90 },
  leftHip: { x: 85, y: 120 },
  rightHip: { x: 115, y: 120 },
  leftKnee: { x: 80, y: 150 },
  rightKnee: { x: 120, y: 150 },
  leftFoot: { x: 75, y: 180 },
  rightFoot: { x: 125, y: 180 },
};

const Bone = ({ start, end, color = "rgba(0, 255, 0, 0.5)" }: { start: Joint, end: Joint, color?: string }) => (
  <motion.line
    x1={start.x}
    y1={start.y}
    x2={end.x}
    y2={end.y}
    stroke={color}
    strokeWidth="2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  />
);

const JointPoint = ({ point, color = "rgba(0, 255, 0, 0.8)" }: { point: Joint, color?: string }) => (
  <motion.circle
    cx={point.x}
    cy={point.y}
    r="3"
    fill={color}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
  />
);

export default function SkeletalWireframe({ isActive = false }: { isActive?: boolean }) {
  const color = isActive ? "#ef4444" : "#4ade80";
  const [skeleton, setSkeleton] = React.useState(INITIAL_SKELETON);

  // Simple animation for simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSkeleton(prev => ({
        ...prev,
        leftHand: { x: prev.leftHand.x + (Math.random() - 0.5) * 5, y: prev.leftHand.y + (Math.random() - 0.5) * 5 },
        rightHand: { x: prev.rightHand.x + (Math.random() - 0.5) * 5, y: prev.rightHand.y + (Math.random() - 0.5) * 5 },
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/40 rounded-lg border border-navy/30 relative overflow-hidden">
      <div className="absolute top-2 left-2 text-[10px] text-white/40 uppercase tracking-widest font-mono">
        Privacy-First Privacy-Skeletal Engine v2.4
      </div>
      <svg viewBox="0 0 200 220" className="w-48 h-48 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
        {/* Upper Body */}
        <Bone start={skeleton.head} end={skeleton.neck} color={color} />
        <Bone start={skeleton.neck} end={skeleton.leftShoulder} color={color} />
        <Bone start={skeleton.neck} end={skeleton.rightShoulder} color={color} />
        <Bone start={skeleton.leftShoulder} end={skeleton.leftElbow} color={color} />
        <Bone start={skeleton.rightShoulder} end={skeleton.rightElbow} color={color} />
        <Bone start={skeleton.leftElbow} end={skeleton.leftHand} color={color} />
        <Bone start={skeleton.rightElbow} end={skeleton.rightHand} color={color} />
        
        {/* Spine & Hips */}
        <Bone start={skeleton.neck} end={skeleton.spine} color={color} />
        <Bone start={skeleton.spine} end={skeleton.leftHip} color={color} />
        <Bone start={skeleton.spine} end={skeleton.rightHip} color={color} />
        
        {/* Lower Body */}
        <Bone start={skeleton.leftHip} end={skeleton.leftKnee} color={color} />
        <Bone start={skeleton.rightHip} end={skeleton.rightKnee} color={color} />
        <Bone start={skeleton.leftKnee} end={skeleton.leftFoot} color={color} />
        <Bone start={skeleton.rightKnee} end={skeleton.rightFoot} color={color} />
        
        {/* Joints */}
        {Object.values(skeleton).map((point, i) => (
          <JointPoint key={i} point={point} color={color} />
        ))}
      </svg>
      {isActive && (
        <div className="absolute bottom-2 right-2 text-emergency font-mono text-[10px] animate-pulse">
          ANOMALY DETECTED
        </div>
      )}
    </div>
  );
}
