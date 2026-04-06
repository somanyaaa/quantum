"use client";
import React, { useState } from 'react';
import { 
    GitHub, Twitter, Mail, MapPin, Calendar, 
    Edit3, Terminal, Award, Briefcase, 
    User as UserIcon, Camera, Plus, ExternalLink, 
    Heart, Zap, Code2, Globe
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // 4. Recent Projects (Specific to DevMatch)
    const projects = [
        { name: "DevMatch Dashboard", link: "#", tech: "Next.js 15", status: "In Progress" },
        { name: "Twitter Clone", link: "https://github.com/your-repo/twitter", tech: "React + Tailwind", status: "Completed" }
    ];

    // 9. Experiences
    const experiences = [
        { role: "Full Stack Intern", company: "Nullclass", duration: "Dec 2025 - Present" },
        { role: "B.Tech CSE Student", company: "Chandigarh University", duration: "2023 - 2027" }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1 & 2. Header: Username & Avatar */}
            <section className="relative h-60 w-full bg-[#091413] rounded-3xl border border-[#285A48]/30 overflow-hidden shadow-[0_0_50px_-12px_rgba(168,85,247,0.15)]">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                
                <div className="absolute -bottom-10 left-10 flex items-end gap-6">
                    <div className="relative group">
                        {/* 2. Avatar to Change */}
                        <div className="w-40 h-40 rounded-3xl bg-[#091413] border-4 border-[#091413] overflow-hidden shadow-2xl relative z-10">
                            <img 
                                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} 
                                alt="Profile" 
                                className="w-full h-full object-cover group-hover:opacity-40 transition-all duration-300" 
                            />
                        </div>
                        <label className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-[#B0E4CC]" />
                            <span className="text-[8px] font-black uppercase text-[#B0E4CC] mt-1">Change Identity</span>
                            <input type="file" className="hidden" />
                        </label>
                        <div className="absolute -top-2 -right-2 z-30 bg-[#A855F7] text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-[0_0_15px_#A855F7]">
                            LVL 1
                        </div>
                    </div>
                    
                    {/* 1. Username to Edit */}
                    <div className="mb-14 relative z-10">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black italic tracking-tighter text-[#B0E4CC]">
                                {user?.username || "Guest_Coder"}
                            </h1>
                            <button onClick={() => setIsEditing(!isEditing)} className="p-1.5 hover:bg-[#285A48]/20 rounded-lg transition-colors">
                                <Edit3 className="w-4 h-4 text-[#408A71] hover:text-[#A855F7]" />
                            </button>
                        </div>
                        <p className="text-[#408A71] text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-[#A855F7]" /> DevMatch Beta Tester
                        </p>
                    </div>
                </div>

                <button className="absolute top-8 right-8 z-10 bg-[#A855F7] text-white px-6 py-2.5 rounded-2xl font-black text-xs hover:shadow-[0_0_25px_#A855F7] transition-all active:scale-95">
                    {isEditing ? "Save Parameters" : "Customize Profile"}
                </button>
            </section>

            {/* 7 & 10. Age & Matches */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#285A48]/5 border border-[#285A48]/20 p-5 rounded-2xl flex flex-col items-center group hover:border-[#B0E4CC]/40 transition-all">
                    <Heart className="w-4 h-4 text-[#B0E4CC] mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#408A71] mb-1">Matches</p>
                    <p className="text-xl font-black text-[#B0E4CC]">{user?.matchCount || "24"}</p>
                </div>
                <div className="bg-[#285A48]/5 border border-[#285A48]/20 p-5 rounded-2xl flex flex-col items-center group hover:border-[#A855F7]/40 transition-all">
                    <UserIcon className="w-4 h-4 text-[#A855F7] mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#408A71] mb-1">Age</p>
                    <p className="text-xl font-black text-[#A855F7]">{user?.age || "20"}</p>
                </div>
                {/* 5 & 6. Location & Joined Date */}
                <div className="bg-[#285A48]/5 border border-[#285A48]/20 p-5 rounded-2xl flex flex-col items-center">
                    <MapPin className="w-4 h-4 text-[#408A71] mb-2" />
                    <p className="text-[10px] font-black text-[#408A71] uppercase mb-1">Location</p>
                    <p className="text-xs font-black text-[#B0E4CC]">{user?.location || "Chandigarh, IN"}</p>
                </div>
                <div className="bg-[#285A48]/5 border border-[#285A48]/20 p-5 rounded-2xl flex flex-col items-center">
                    <Calendar className="w-4 h-4 text-[#408A71] mb-2" />
                    <p className="text-[10px] font-black text-[#408A71] uppercase mb-1">Joined</p>
                    <p className="text-xs font-black text-[#B0E4CC]">{user?.joinedDate || "April 2026"}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* 8. Bio */}
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-8 rounded-3xl relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Code2 className="w-32 h-32 text-[#B0E4CC]" />
                        </div>
                        <h2 className="text-xl font-black italic mb-4 text-[#B0E4CC]">Mission Log / Bio</h2>
                        <p className="text-[#408A71] leading-relaxed font-medium">
                            {user?.bio || "No mission log established. Define your parameters to improve matchmaking accuracy."}
                        </p>
                    </section>

                    {/* 3. Skills */}
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-8 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black italic text-[#B0E4CC]">Tech Arsenal</h2>
                            <Plus className="w-4 h-4 text-[#408A71] cursor-pointer hover:text-[#A855F7]" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(user?.skills || ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"]).map(skill => (
                                <span key={skill} className="px-4 py-2 rounded-xl bg-[#285A48]/10 border border-[#408A71]/30 text-[#B0E4CC] text-xs font-bold hover:border-[#A855F7]/50 hover:text-white transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* 9. Experiences */}
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-8 rounded-3xl">
                        <h2 className="text-xl font-black italic mb-8 text-[#B0E4CC]">Career Timeline</h2>
                        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#285A48]/30">
                            {experiences.map((exp, i) => (
                                <div key={i} className="flex gap-6 relative">
                                    <div className="w-10 h-10 rounded-xl bg-[#091413] border border-[#285A48] flex items-center justify-center shrink-0 z-10 group-hover:border-[#A855F7]">
                                        <Briefcase className="w-5 h-5 text-[#A855F7]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-[#B0E4CC]">{exp.role}</h3>
                                        <p className="text-xs font-bold text-[#408A71] uppercase tracking-tighter">{exp.company}</p>
                                        <p className="text-[10px] text-[#408A71]/60 mt-1">{exp.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Project Links */}
                <div className="space-y-6">
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-6 rounded-3xl">
                        <h2 className="text-sm font-black uppercase tracking-widest text-[#408A71] mb-6 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Deployments
                        </h2>
                        <div className="space-y-4">
                            {projects.map((project, i) => (
                                <a 
                                    href={project.link} 
                                    key={i} 
                                    className="block p-4 rounded-2xl bg-[#091413] border border-[#285A48]/20 hover:border-[#A855F7]/50 transition-all group shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-xs font-black text-[#B0E4CC] group-hover:text-[#A855F7] transition-colors">{project.name}</p>
                                        <ExternalLink className="w-3 h-3 text-[#408A71]" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-[#408A71] uppercase">{project.tech}</span>
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#285A48]/20 text-[#B0E4CC] font-black uppercase">{project.status}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Socials / Transmission */}
                    <section className="bg-[#285A48]/5 border border-[#285A48]/20 p-6 rounded-3xl">
                        <h2 className="text-sm font-black uppercase tracking-widest text-[#408A71] mb-4">Transmission</h2>
                        <div className="flex justify-around">
                            <Github className="w-5 h-5 text-[#B0E4CC] hover:text-[#A855F7] cursor-pointer transition-all hover:scale-110" />
                            <Twitter className="w-5 h-5 text-[#B0E4CC] hover:text-[#A855F7] cursor-pointer transition-all hover:scale-110" />
                            <Mail className="w-5 h-5 text-[#B0E4CC] hover:text-[#A855F7] cursor-pointer transition-all hover:scale-110" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;