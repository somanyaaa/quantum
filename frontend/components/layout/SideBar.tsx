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
    ExternalLink,
    Settings
} from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';

const HACKATHONS = [
    { id: 1, name: "Google Solution Challenge", date: "April 15", prize: "$10k" },
    { id: 2, name: "Smart India Hackathon", date: "May 02", prize: "Govt. Grant" },
    { id: 3, name: "MLH Init 2026", date: "May 20", prize: "Swag Kits" },
];

const SideBar = ({ currentPage = 'home', setCurrentPage }: any) => {
    const { user, logout } = useAuth();
    const navigation = [
        { name: "Discover", icon: LayoutDashboard, page: "home" },
        { name: "Matches", icon: MessageSquare, page: "matches" },
    ];
    return (
        <div className="w-80 h-full flex flex-col bg-[#091413] p-6 text-[#B0E4CC] border-r border-[#285A48]/20">
            {/* 1. Logo Section */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-[#B0E4CC] rounded-xl flex items-center justify-center shadow-[0_0_15px_-3px_#B0E4CC]">
                    <Code2 className="w-6 h-6 text-[#091413]" />
                </div>
                <h1 className="text-2xl font-black italic tracking-tighter">DEV<span className="text-[#408A71]">MATCH</span></h1>
            </div>

            {/* 2. Main Navigation (Mapped) */}
            <nav className="space-y-1 mb-10">
                <p className="text-[10px] text-[#408A71] font-black uppercase tracking-[0.2em] mb-4 px-2">Menu</p>
                {navigation.map((item) => (
                    <button 
                        key={item.page}
                        onClick={() => setCurrentPage(item.page)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                            currentPage === item.page 
                            ? 'bg-[#285A48]/30 text-[#B0E4CC] border border-[#408A71]/50' 
                            : 'text-[#408A71] hover:text-[#B0E4CC] hover:bg-[#285A48]/10'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                    </button>
                ))}
            </nav>

            {/* 3. Hackathon Feed Section */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-4 px-2">
                    <p className="text-[10px] text-[#408A71] font-black uppercase tracking-[0.2em]">Upcoming Hackathons</p>
                    <Trophy className="w-3 h-3 text-[#408A71]" />
                </div>
                <div className="space-y-3">
                    {HACKATHONS.map((hack) => (
                        <div key={hack.id} className="p-3 rounded-xl bg-[#285A48]/10 border border-[#408A71]/20 hover:border-[#408A71]/50 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xs font-black text-[#B0E4CC] leading-tight group-hover:text-white">{hack.name}</h3>
                                <ExternalLink className="w-3 h-3 text-[#408A71] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex items-center gap-3 text-[10px]">
                                <span className="flex items-center gap-1 text-[#408A71] font-bold"><Calendar className="w-3 h-3" /> {hack.date}</span>
                                <span className="text-[#B0E4CC] bg-[#285A48]/40 px-1.5 py-0.5 rounded uppercase font-black">{hack.prize}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Footer with Dropdown User Menu */}
            <div className="pt-6 border-t border-[#285A48]/30 mt-6">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#285A48]/20 transition-all outline-none group text-left">
                            <Avatar.Root className="w-10 h-10 rounded-full border-2 border-[#408A71] overflow-hidden">
                                <Avatar.Image src={user?.avatar} className="w-full h-full object-cover" />
                                <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-[#285A48] text-xs font-bold">
                                    {user?.username?.substring(0, 2).toUpperCase()}
                                </Avatar.Fallback>
                            </Avatar.Root>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-black text-sm truncate">{user?.username || "Guest Coder"}</p>
                                <p className="text-[10px] text-[#408A71] uppercase font-bold italic">Lvl 1 Coder</p>
                            </div>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content 
                            className="w-56 bg-[#0D1F1D] border border-[#408A71]/30 rounded-xl p-1 shadow-2xl z-50 animate-in fade-in zoom-in duration-200"
                            sideOffset={10}
                            align="start"
                        >
                            <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#B0E4CC] outline-none hover:bg-[#285A48]/40 rounded-lg cursor-pointer transition-colors">
                                <User className="w-4 h-4" /> View Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#B0E4CC] outline-none hover:bg-[#285A48]/40 rounded-lg cursor-pointer transition-colors">
                                <Settings className="w-4 h-4" /> Settings
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-[1px] bg-[#285A48]/30 my-1" />
                            <DropdownMenu.Item 
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 outline-none hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </div>
    )
}

export default SideBar;