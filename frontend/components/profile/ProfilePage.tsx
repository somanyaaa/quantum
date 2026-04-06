"use client";
import React, { useState, useRef, useEffect } from 'react';
import SynergyChart from '../charts/SynergyChart';
import { 
    Mail, MapPin, Calendar, Pencil, Terminal,
    Check, User as UserIcon, Camera, X, Plus, ExternalLink, 
    Heart, Zap, Code2, Globe 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
const GithubIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const ProfilePage = () => {
    const [showChart, setShowChart] = useState(false);  
    React.useEffect(() => {
        setShowChart(true);
    }, []);
    const { user, updateUser } = useAuth() as any;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [tempName, setTempName] = useState(user?.username || "Guest_Coder");
    const [tempBio, setTempBio] = useState(user?.bio || "A full-stack wizard building the future of dev-social. Currently stuck in a loop of coffee and code at Chandigarh University.");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const stats = [
    { 
        label: "Matches", 
        value: user?.matchCount ?? "0",
        icon: Heart, 
        color: "text-[#B0E4CC]" 
    },
    { 
        label: "Age", 
        value: user?.age ?? "20", 
        icon: UserIcon, 
        color: "text-[#A855F7]" 
    },
    { 
        label: "Location", 
        value: user?.location ?? "Chandigarh, IN", 
        icon: MapPin, 
        color: "text-[#408A71]" 
    }
];
    const projects = [
        { name: "DevMatch Beta", link: "#", tech: "Next.js 15", status: "Active" },
        { name: "Twitter Clone", link: "https://github.com/your-repo/twitter", tech: "React + Tailwind", status: "Completed" }
    ];
    const experiences = [
        { 
            role: "Full Stack Intern", 
            company: "Nullclass", 
            duration: "Dec 2025 - Present" 
        },
        { 
            role: "B.Tech CSE Student", 
            company: "Chandigarh University", 
            duration: "2023 - 2027" 
        }
    ];
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };
    const calculateTotalScore = () => {
        const commitScore = Math.min((user?.totalCommits || 150) / 10, 30);
        const projectScore = projects.reduce((acc, proj) => {
            let points = 10;
            if (proj.status === "Completed") points += 5;
            if (proj.tech.includes("Next.js") || proj.tech.includes("TypeScript")) points += 5;
            return acc + points;
        }, 0);
        const finalProjectScore = Math.min(projectScore, 40);
        const langScore = Math.min((user?.skills?.length || 5) * 6, 30);
        return Math.round(commitScore + finalProjectScore + langScore);
    };
    const totalScore = calculateTotalScore();
    return (
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 space-y-10 pt-10 pb-20 animate-in fade-in duration-500">            
            {/* 1. IDENTITY HEADER */}
            <header className="flex flex-col md:flex-row items-center md:items-start gap-10 pb-12 border-b border-[#285A48]/20">
                <div className="relative shrink-0 group cursor-pointer" onClick={handleAvatarClick}>
                    <div className="w-44 h-44 rounded-[3rem] bg-[#091413] border-4 border-[#285A48]/30 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-[#A855F7]/60">
                        <img 
                            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} 
                            alt="Avatar" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-[#091413]/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-[#A855F7] p-3 rounded-2xl shadow-lg mb-2"><Camera className="w-6 h-6 text-white" /></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#B0E4CC]">Update ID</span>
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" />
                </div>

                <div className="flex-1 flex flex-col items-center md:items-start pt-4 space-y-4">
                    <div className="flex items-center gap-4">
                        {isEditingName ? (
                            <div className="flex items-center gap-3 bg-[#091413] border border-[#A855F7]/30 p-2 pl-4 rounded-3xl">
                                <input 
                                    className="bg-transparent text-4xl font-black italic text-[#B0E4CC] outline-none w-full"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    autoFocus
                                />
                                <div className="flex gap-1 pr-1">
                                    <button 
                                        onClick={() => {
                                            updateUser({ username: tempName });
                                            setIsEditingName(false);
                                            
                                        }} 
                                        className="p-2.5 bg-[#B0E4CC] rounded-2xl text-[#091413] hover:scale-105 transition-transform"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => { setIsEditingName(false); setTempName(user?.username); }} className="p-2 bg-red-500/20 rounded-xl text-red-300"><X className="w-5 h-5" /></button>
                                </div>
                            </div>
                            ) : (
                            <>
                                <h1 className="text-6xl font-black italic tracking-tighter text-[#B0E4CC]">{tempName}</h1>
                                <div className="flex flex-col items-center justify-center bg-[#A855F7]/10 border border-[#A855F7]/40 px-4 py-1 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                                    <span className="text-[10px] font-black uppercase text-[#A855F7] tracking-widest">Synergy Score</span>
                                    <span className="text-2xl font-black text-[#B0E4CC]">{totalScore}</span>
                                </div>
                                <button onClick={() => setIsEditingName(true)} className="p-2.5 bg-[#285A48]/10 border border-[#285A48]/20 rounded-2xl hover:border-[#A855F7]/50 transition-all">
                                    <Pencil className="w-5 h-5 text-[#408A71]" />
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#A855F7]/10 border border-[#A855F7]/30 text-[#A855F7] text-xs font-black uppercase tracking-widest">
                            <Zap className="w-3.5 h-3.5" /> Full-Stack Developer
                        </div>
                        <div className="h-1 w-1 rounded-full bg-[#285A48]/40 md:block hidden" />
                        <span className="text-[#408A71] text-sm font-bold flex items-center gap-2"><Terminal className="w-4 h-4" /> CU Student</span>
                    </div>
                </div>
            </header>

            {/* 2. STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Matches", value: user?.matchCount || "24", icon: Heart, color: "text-[#B0E4CC]", accent: "bg-[#B0E4CC]/10" },
                    { label: "Age", value: user?.age || "20", icon: UserIcon, color: "text-[#A855F7]", accent: "bg-[#A855F7]/10" },
                    { label: "Location", value: user?.location || "Chandigarh", icon: MapPin, color: "text-[#408A71]", accent: "bg-[#408A71]/10" },
                    { label: "Joined", value: "Apr 2026", icon: Calendar, color: "text-[#B0E4CC]", accent: "bg-[#B0E4CC]/10" }
                ].map((stat, i) => (
                    <div key={i} className="bg-[#285A48]/5 border border-[#285A48]/20 p-4 rounded-2xl flex items-center gap-4 hover:border-[#A855F7]/30 transition-all">
                        <div className={`w-12 h-12 rounded-xl ${stat.accent} flex items-center justify-center shrink-0`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#408A71] opacity-60">{stat.label}</p>
                            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- SYNERGY PULSE SECTION --- */}
            <section className="bg-[#285A48]/5 border border-[#285A48]/20 py-3 px-6 rounded-[2rem] shadow-sm hover:border-[#A855F7]/30 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 pl-4"> 
                            <div className="p-1.5 bg-[#A855F7]/10 rounded-xl border border-[#A855F7]/20 shrink-0">
                                <Zap className="w-4 h-4 text-[#A855F7]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic text-[#B0E4CC] tracking-tighter leading-none">
                                    Synergy Pulse
                                </h2>
                                <p className="text-[#408A71] text-[8px] font-bold uppercase tracking-widest mt-1 opacity-80">
                                    Live Match Analytics
                                </p>
                            </div>
                        </div>
                        <p className="text-[#408A71] text-xs font-medium leading-tight">
                            Your technical DNA compared to the platform average.
                        </p>

                        <div className="bg-[#091413] border border-[#285A48]/30 p-2 rounded-xl">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[8px] font-black text-[#408A71] uppercase tracking-widest">Compatibility</span>
                                <span className="text-lg font-black text-[#B0E4CC] italic">{totalScore}%</span>
                            </div>
                            <div className="w-full h-1 bg-[#285A48]/20 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#B0E4CC] to-[#A855F7] transition-all duration-1000" 
                                    style={{ width: `${totalScore}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[140px] relative flex items-center justify-center overflow-visible">
                        {isMounted && (
                            <SynergyChart 
                                userStats={{ syntax: 85, velocity: 92, depth: 70, pulse: 100, impact: 65 }}
                                matchStats={{ syntax: 75, velocity: 80, depth: 90, pulse: 85, impact: 70 }}
                            />
                        )}
                    </div>
                </div>
            </section>
                
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-[#B0E4CC]/10 rounded-xl border border-[#B0E4CC]/20">
                                    <Terminal className="w-5 h-5 text-[#B0E4CC]" />
                                </div>
                                <h2 className="text-3xl font-black italic text-[#B0E4CC] tracking-tighter leading-tight">Mission Log</h2>
                            </div>
                            <button 
                                onClick={() => {
                                    if (isEditingBio) {
                                        updateUser({ bio: tempBio });
                                    }
                                    setIsEditingBio(!isEditingBio);
                                }}
                                className={`p-2 rounded-xl transition-all ${isEditingBio ? 'bg-[#A855F7] text-white' : 'bg-[#285A48]/10 text-[#408A71] hover:text-[#A855F7]'}`}
                            >
                                {isEditingBio ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                            </button>
                        </div>

                        {isEditingBio ? (
                            <textarea 
                                className="w-full h-32 bg-[#091413] border border-[#A855F7]/30 rounded-2xl p-4 text-[#B0E4CC] font-medium outline-none focus:border-[#A855F7] transition-all"
                                value={tempBio}
                                onChange={(e) => setTempBio(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <p className="text-[#408A71] text-lg leading-relaxed font-medium relative z-10 pl-4 border-l-2 border-[#A855F7]/20">
                                {tempBio}
                            </p>
                        )}
                        
                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none">
                            <Code2 className="w-48 h-48 text-[#B0E4CC]" />
                        </div>
                    </section>

                    {/* TECH ARSENAL */}
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-[#A855F7]/10 rounded-xl border border-[#A855F7]/20">
                                    <Code2 className="w-5 h-5 text-[#A855F7]" />
                                </div>
                                <h2 className="text-2xl font-black italic text-[#B0E4CC] tracking-tight">Tech Arsenal</h2>
                            </div>
                            <button className="p-2 bg-[#285A48]/10 rounded-xl text-[#408A71] hover:text-[#B0E4CC] transition-all">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map(skill => (
                                <span key={skill} className="px-4 py-2 rounded-xl bg-[#285A48]/10 border border-[#408A71]/30 text-[#B0E4CC] text-xs font-bold hover:border-[#A855F7]/50 transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-6 rounded-[2rem]">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#408A71] mb-6 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Top Deployments
                        </h2>
                        <div className="space-y-4">
                            {projects.map((project, i) => (
                                <a key={i} href={project.link} className="block p-4 rounded-2xl bg-[#091413] border border-[#285A48]/20 hover:border-[#A855F7]/50 transition-all group">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-xs font-black text-[#B0E4CC] group-hover:text-[#A855F7]">{project.name}</p>
                                        <ExternalLink className="w-3 h-3 text-[#408A71]" />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="font-bold text-[#408A71]">{project.tech}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-[#285A48]/20 text-[#B0E4CC] font-black uppercase">{project.status}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-6 rounded-[2rem]">
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#408A71] mb-4">Transmission</h2>
                        <div className="flex justify-around">
                            <GithubIcon className="w-5 h-5 text-[#B0E4CC] hover:text-[#A855F7] transition-all hover:scale-110 cursor-pointer" />
                            <TwitterIcon className="w-5 h-5 text-[#B0E4CC] hover:text-[#A855F7] transition-all hover:scale-110 cursor-pointer" />
                            <Mail className="w-5 h-5 text-[#B0E4CC] hover:text-[#A855F7] transition-all hover:scale-110 cursor-pointer" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;