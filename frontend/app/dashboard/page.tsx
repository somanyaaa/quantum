"use client";

import React, { useState } from 'react';
import { X, Heart, Code2, Sparkles, MessageSquare } from 'lucide-react';

const POTENTIAL_MATCHES = [
    {
        id: 1,
        name: "Alex Rivera",
        role: "Frontend Specialist",
        experience: "Intermediate",
        skills: ["React", "Next.js", "Tailwind CSS"],
        bio: "Looking for a backend genius to build a fintech app. I make things look pretty.",
        matchScore: 98
    },
    {
        id: 2,
        name: "Sam Chen",
        role: "Fullstack Architect",
        experience: "Advanced",
        skills: ["Node.js", "MongoDB", "TypeScript", "React"],
        bio: "Third hackathon this year. Let's win this thing. I can carry the API architecture.",
        matchScore: 85
    },
    {
        id: 3,
        name: "Jordan Lee",
        role: "AI/ML Engineer",
        experience: "Advanced",
        skills: ["Python", "Machine Learning", "Figma"],
        bio: "Have an OpenAI API key and a dream. Need someone to build the UI for my wrapper.",
        matchScore: 72
    }
];

export default function DashboardPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [matches, setMatches] = useState<number[]>([]);

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
        <div className="relative h-full w-full flex flex-col items-center justify-center p-6 overflow-hidden">

            <div className="absolute top-6 right-8 z-20">
                <button className="relative p-2 text-[#408A71] hover:text-[#B0E4CC] transition-colors">
                    <MessageSquare className="w-8 h-8" />
                    {matches.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B0E4CC] text-[#091413] text-[10px] font-black flex items-center justify-center rounded-full border-2 border-[#091413]">
                            {matches.length}
                        </span>
                    )}
                </button>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#285A48]/10 blur-[120px] rounded-full -z-10"></div>

            {currentProfile ? (
                <div className="w-full max-w-md animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <div className="bg-[#285A48]/20 border border-[#408A71]/30 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                        
                        <div className="absolute top-6 right-6 px-3 py-1 bg-[#091413]/50 border border-[#B0E4CC]/30 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                            <Sparkles className="w-3 h-3 text-[#B0E4CC]" />
                            <span className="text-[#B0E4CC] text-xs font-black">{currentProfile.matchScore}% Match</span>
                        </div>

                        <div className="mt-8 mb-6">
                            <h2 className="text-4xl font-black text-[#B0E4CC] mb-1 tracking-tight">{currentProfile.name}</h2>
                            <p className="text-[#408A71] font-bold text-sm uppercase tracking-widest">{currentProfile.role}</p>
                            <p className="text-[#408A71]/70 text-xs mt-1">{currentProfile.experience} Level</p>
                        </div>

                        <p className="text-[#B0E4CC]/90 mb-8 leading-relaxed text-lg">
                            "{currentProfile.bio}"
                        </p>

                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Code2 className="w-4 h-4 text-[#408A71]" />
                                <span className="text-[#408A71] text-xs font-bold uppercase tracking-widest">Tech Stack</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {currentProfile.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-[#091413] border border-[#285A48] text-[#B0E4CC] rounded-lg text-xs font-bold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-6 pt-4 border-t border-[#408A71]/20">
                            <button 
                                onClick={handlePass}
                                className="w-16 h-16 rounded-full bg-[#091413] border-2 border-[#285A48] flex items-center justify-center text-[#408A71] hover:bg-[#285A48]/30 hover:scale-110 hover:text-red-400 transition-all shadow-lg"
                            >
                                <X className="w-8 h-8" />
                            </button>
                            <button 
                                onClick={handleConnect}
                                className="w-16 h-16 rounded-full bg-[#B0E4CC] text-[#091413] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_-5px_#B0E4CC] transition-all shadow-lg"
                            >
                                <Heart className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center animate-in fade-in duration-500">
                    <div className="w-24 h-24 bg-[#285A48]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#408A71]/30">
                        <Sparkles className="w-10 h-10 text-[#408A71]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#B0E4CC] mb-3">You're all caught up!</h2>
                    <p className="text-[#408A71] max-w-sm mx-auto mb-8">
                        We are analyzing more profiles to find your perfect teammate. Check back soon.
                    </p>
                    <button 
                        onClick={() => setCurrentIndex(0)}
                        className="text-[#091413] bg-[#408A71] px-6 py-3 rounded-xl font-bold hover:bg-[#B0E4CC] transition-colors"
                    >
                        Refresh Match Queue
                    </button>
                </div>
            )}
        </div>
    );
}