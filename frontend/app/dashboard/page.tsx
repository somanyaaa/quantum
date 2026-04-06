"use client";
import React, { useState, useEffect } from 'react';
import { X, Heart, Code2, Sparkles, Zap } from 'lucide-react';
import SynergyChart from '@/components/charts/SynergyChart';

const POTENTIAL_MATCHES = [
    { 
        id: 1, 
        name: "Alex Rivera", 
        role: "Frontend Specialist", 
        skills: ["React", "Next.js", "Tailwind", "Framer Motion"], 
        bio: "Looking for a backend genius to build a fintech app. I make things look pretty." 
    },
    { 
        id: 2, 
        name: "Sam Chen", 
        role: "Fullstack Architect", 
        skills: ["Node.js", "MongoDB", "TypeScript", "React"], 
        bio: "Third hackathon this year. Let's win this thing. I can carry the API architecture." 
    },
    { 
        id: 3, 
        name: "Jordan Lee", 
        role: "AI/ML Engineer", 
        skills: ["Python", "PyTorch", "Next.js", "FastAPI"], 
        bio: "Have an OpenAI API key and a dream. Need someone to build the UI for my wrapper." 
    }
];

export default function DashboardPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matches, setMatches] = useState<number[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { 
        setIsMounted(true); 
    }, []);

    const currentProfile = POTENTIAL_MATCHES[currentIndex];

    const handlePass = () => {
        if (currentIndex < POTENTIAL_MATCHES.length) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handleConnect = () => {
        if (currentProfile) {
            setMatches([...matches, currentProfile.id]);
            setCurrentIndex(prev => prev + 1);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-[#091413]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#285A48]/10 blur-[120px] rounded-full -z-10" />

            {currentProfile ? (
                <div className="w-full max-w-[420px] animate-in zoom-in-95 fade-in duration-500">
                    <div className="bg-[#285A48]/20 border border-[#408A71]/30 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                        
                        {/* 1. Profile Header */}
                        <div className="text-center mb-4">
                            <h2 className="text-3xl font-black text-[#B0E4CC] tracking-tighter leading-tight italic">
                                {currentProfile.name}
                            </h2>
                            <p className="text-[#408A71] font-bold text-xs uppercase tracking-[0.2em] mt-1">
                                {currentProfile.role}
                            </p>
                        </div>

                        {/* 2. Bio Section */}
                        <p className="text-[#B0E4CC]/90 mb-8 leading-relaxed text-md text-center px-4 italic font-medium">
                            "{currentProfile.bio}"
                        </p>

                        <div className="relative mb-6 h-[260px] w-full bg-[#091413]/50 rounded-3xl border border-[#285A48]/30 overflow-hidden shadow-inner">
                            
                            <div className="absolute top-5 flex items-center gap-2 z-20">
                                <Zap className="w-3.5 h-3.5 text-[#A855F7] animate-pulse shrink-0" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#408A71] whitespace-nowrap">
                                    Synergy Pulse
                                </span>
                            </div>

                            {/* 3. The Chart itself */}
                            <div className="w-full h-full flex items-center justify-center p-4">
                                {isMounted && (
                                    <SynergyChart 
                                        userStats={{ syntax: 80, velocity: 90, depth: 70, pulse: 100, impact: 60 }}
                                        matchStats={{ syntax: 75, velocity: 70, depth: 85, pulse: 90, impact: 50 }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* 4. Tech Stack - Proportional Tags */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {currentProfile.skills.map(skill => (
                                    <span 
                                        key={skill} 
                                        className="px-3 py-1 bg-[#091413] border border-[#285A48]/50 text-[#B0E4CC] rounded-xl text-[10px] font-bold hover:border-[#A855F7]/50 transition-colors uppercase tracking-wider"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 5. Control Buttons - Sized for Screen Fit */}
                        <div className="flex justify-center gap-6 pt-5 border-t border-[#408A71]/20">
                            <button 
                                onClick={handlePass} 
                                className="w-16 h-16 rounded-full bg-[#091413] border-2 border-[#285A48] flex items-center justify-center text-[#408A71] hover:text-red-400 hover:border-red-400/50 transition-all active:scale-90 shadow-xl group"
                            >
                                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                            <button 
                                onClick={handleConnect} 
                                className="w-16 h-16 rounded-full bg-[#B0E4CC] text-[#091413] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_-5px_#B0E4CC] transition-all active:scale-90 shadow-xl"
                            >
                                <Heart className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center space-y-4 animate-in fade-in duration-700">
                    <Sparkles className="w-12 h-12 text-[#408A71] mx-auto animate-bounce" />
                    <h2 className="text-2xl font-black text-[#B0E4CC] italic">Queue Empty</h2>
                    <p className="text-[#408A71] text-sm max-w-[200px]">No more hackers in your orbit.</p>
                    <button 
                        onClick={() => setCurrentIndex(0)} 
                        className="text-[#091413] bg-[#B0E4CC] px-8 py-3 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform"
                    >
                        Reload
                    </button>
                </div>
            )}
        </div>
    );
}