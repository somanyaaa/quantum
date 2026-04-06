"use client";
import React from 'react';
import { Search, Settings, MoreHorizontal, MessageSquare, UserPlus, TrendingUp } from 'lucide-react';

const TRENDING = [
    { category: "Technology · Trending", title: "#NextJS15", posts: "12.4K Commits" },
    { category: "Hackathons", title: "Google Solution Challenge", posts: "2 days left" },
    { category: "Web Development", title: "Tailwind v4.0", posts: "8.1K Discussions" },
    { category: "Music", title: "Taylor's Version (Dev Edition)", posts: "64K Listeners" }, // Little Easter egg for you
];

const SUGGESTIONS = [
    { name: "Pranay", username: "@pranay_codes", tags: ["React", "Node.js"] },
    { name: "Aarav Sharma", username: "@aarav_dev", tags: ["Python", "AI"] },
    { name: "Ishita", username: "@ishita_ui", tags: ["UI/UX", "Figma"] },
];

const RightSideBar = () => {
    return (
        <div className="w-80 h-full flex flex-col bg-[#091413] py-3 px-4 text-[#B0E4CC] border-l border-[#285A48]/20">
            
            {/* 1. Search Bar */}
            <div className="sticky top-0 bg-[#091413] py-2 z-10">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#408A71] group-focus-within:text-[#B0E4CC] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search DevMatch" 
                        className="w-full bg-[#285A48]/10 border border-transparent focus:border-[#408A71]/50 focus:bg-transparent rounded-full py-2.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-[#408A71]"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pt-2">
                
                {/* 2. What's Happening  */}
                <section className="bg-[#285A48]/5 border border-[#285A48]/20 rounded-2xl overflow-hidden">
                    <h2 className="px-4 py-3 text-xl font-black italic tracking-tighter border-b border-[#285A48]/20">
                        What's happening
                    </h2>
                    
                    <div className="divide-y divide-[#285A48]/10">
                        {TRENDING.map((item, i) => (
                            <div key={i} className="px-4 py-3 hover:bg-[#285A48]/10 transition-colors cursor-pointer group">
                                <div className="flex justify-between text-[11px] text-[#408A71] font-bold uppercase tracking-wider mb-0.5">
                                    <span>{item.category}</span>
                                    <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-sm font-black text-[#B0E4CC] group-hover:text-white transition-colors">
                                    {item.title}
                                </p>
                                <p className="text-[11px] text-[#408A71] mt-0.5">{item.posts}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full text-left px-4 py-3 text-sm text-[#FFDE42] hover:bg-[#285A48]/10 transition-colors font-bold">
                        Show more
                    </button>
                </section>

                {/* 3. People you may know */}
                <section className="bg-[#285A48]/5 border border-[#285A48]/20 rounded-2xl overflow-hidden">
                    <h2 className="px-4 py-3 text-xl font-black italic tracking-tighter border-b border-[#285A48]/20">
                        Who to connect
                    </h2>
                    
                    <div className="divide-y divide-[#285A48]/10">
                        {SUGGESTIONS.map((person, i) => (
                            <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-[#285A48]/10 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-full bg-[#B0E4CC] flex items-center justify-center text-[#091413] font-black text-xs shrink-0">
                                        {person.name[0]}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-black truncate text-[#B0E4CC] group-hover:text-white">
                                            {person.name}
                                        </p>
                                        <p className="text-[11px] text-[#408A71] truncate">{person.username}</p>
                                    </div>
                                </div>
                                <button className="bg-[#B0E4CC] text-[#091413] text-xs font-black px-4 py-1.5 rounded-full hover:scale-105 transition-transform active:scale-95">
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="w-full text-left px-4 py-3 text-sm text-[#FFDE42] hover:bg-[#285A48]/10 transition-colors font-bold">
                        Show more
                    </button>
                </section>

                {/* 4. Footer */}
                <footer className="px-4 py-2 flex flex-wrap gap-x-3 gap-y-1">
                    {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Ads info', '© 2026 DevMatch Corp.'].map((link) => (
                        <span key={link} className="text-[10px] text-[#408A71] hover:underline cursor-pointer">
                            {link}
                        </span>
                    ))}
                </footer>
            </div>
        </div>
    );
};
export default RightSideBar;