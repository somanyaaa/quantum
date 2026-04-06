"use client";
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { 
    LayoutDashboard, 
    MessageSquare, 
    User, 
    LogOut, 
    Code2, 
    Trophy, 
    Calendar,
    ExternalLink 
} from 'lucide-react';

const HACKATHONS = [
    { id: 1, name: "Google Solution Challenge", date: "April 15", prize: "$10k" },
    { id: 2, name: "Smart India Hackathon", date: "May 02", prize: "Govt. Grant" },
    { id: 3, name: "MLH Init 2026", date: "May 20", prize: "Swag Kits" },
];

const SideBar = ({ currentPage = 'home', setCurrentPage }: any) => {
    const { user, logout } = useAuth();

    return (
        <div className="h-full flex flex-col bg-[#091413] p-6 text-[#B0E4CC]">
            {/* 1. Logo Section */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-[#B0E4CC] rounded-xl flex items-center justify-center shadow-[0_0_15px_-3px_#B0E4CC]">
                    <Code2 className="w-6 h-6 text-[#091413]" />
                </div>
                <h1 className="text-2xl font-black italic tracking-tighter">DEV<span className="text-[#408A71]">MATCH</span></h1>
            </div>

            {/* 2. Main Navigation */}
            <nav className="space-y-1 mb-10">
                <p className="text-[10px] text-[#408A71] font-black uppercase tracking-[0.2em] mb-4 px-2">Menu</p>
                <button 
                    onClick={() => setCurrentPage('home')}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${currentPage === 'home' ? 'bg-[#285A48]/30 text-[#B0E4CC] border border-[#408A71]/50' : 'text-[#408A71] hover:text-[#B0E4CC]'}`}
                >
                    <LayoutDashboard className="w-5 h-5" /> Discover
                </button>
                <button 
                    onClick={() => setCurrentPage('matches')}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${currentPage === 'matches' ? 'bg-[#285A48]/30 text-[#B0E4CC] border border-[#408A71]/50' : 'text-[#408A71] hover:text-[#B0E4CC]'}`}
                >
                    <MessageSquare className="w-5 h-5" /> Matches
                </button>
            </nav>

            {/* 3. NEW: Hackathon Feed Section */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-4 px-2">
                    <p className="text-[10px] text-[#408A71] font-black uppercase tracking-[0.2em]">Upcoming Hackathons</p>
                    <Trophy className="w-3 h-3 text-[#408A71]" />
                </div>
                
                <div className="space-y-3">
                    {HACKATHONS.map((hack) => (
                        <div 
                            key={hack.id} 
                            className="p-3 rounded-xl bg-[#285A48]/10 border border-[#408A71]/20 hover:border-[#408A71]/50 transition-colors group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xs font-black text-[#B0E4CC] leading-tight group-hover:text-white">{hack.name}</h3>
                                <ExternalLink className="w-3 h-3 text-[#408A71] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[10px] text-[#408A71] font-bold">
                                    <Calendar className="w-3 h-3" /> {hack.date}
                                </div>
                                <div className="text-[10px] text-[#B0E4CC] bg-[#285A48]/40 px-1.5 py-0.5 rounded uppercase font-black">
                                    {hack.prize}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Footer: User & Logout */}
            <div className="pt-6 border-t border-[#285A48]/30 mt-6">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-[#408A71]" />
                    <div className="overflow-hidden">
                        <p className="font-black text-sm truncate">{user?.username}</p>
                        <p className="text-[10px] text-[#408A71] uppercase font-bold tracking-widest italic">Lvl 1 Coder</p>
                    </div>
                </div>
                <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-2 rounded-xl font-bold text-red-500/60 hover:text-red-500 transition-colors text-sm">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>
        </div>
    )
}

export default SideBar;