"use client";
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis 
} from 'recharts';

interface SynergyChartProps {
  userStats?: {
    syntax: number;
    velocity: number;
    depth: number;
    pulse: number;
    impact: number;
  };
  matchStats?: {
    syntax: number;
    velocity: number;
    depth: number;
    pulse: number;
    impact: number;
  };
}

const SynergyChart = ({ userStats, matchStats }: any) => {
    const data = [
        { subject: 'Syntax', A: userStats?.syntax || 85, B: matchStats?.syntax || 65, fullMark: 100 },
        { subject: 'Velocity', A: userStats?.velocity || 90, B: matchStats?.velocity || 75, fullMark: 100 },
        { subject: 'Depth', A: userStats?.depth || 70, B: matchStats?.depth || 90, fullMark: 100 },
        { subject: 'Pulse', A: userStats?.pulse || 100, B: matchStats?.pulse || 80, fullMark: 100 },
        { subject: 'Impact', A: userStats?.impact || 60, B: matchStats?.impact || 70, fullMark: 100 },
    ];
    
    return (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}> 
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    data={data}
                    margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                >
                    <PolarGrid stroke="#285A48" strokeOpacity={0.2} />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#408A71', fontSize: 9, fontWeight: '900' }} 
                    />
                    <PolarRadiusAxis angle={30} tick={false} axisLine={false} domain={[0, 100]} />
                    <Radar
                        name="You"
                        dataKey="A"
                        stroke="#B0E4CC"
                        fill="#B0E4CC"
                        fillOpacity={0.2}
                        strokeWidth={2}
                    />
                    <Radar
                        name="Match"
                        dataKey="B"
                        stroke="#A855F7"
                        fill="#A855F7"
                        fillOpacity={0.4}
                        strokeWidth={2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SynergyChart;