"use client";
import React, { useState } from 'react';
import DevMatchLogo from './devmatchlogo';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    const openAuthModal = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setShowAuthModal(true);
    }

    return (
        <div className="min-h-screen bg-[#091413] text-[#B0E4CC] selection:bg-[#408A71] overflow-hidden relative">
            
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#285A48]/20 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#408A71]/10 blur-[120px] rounded-full -z-10"></div>

            {/* --- NAVBAR --- */}
            <nav className="flex items-center justify-between px-8 py-6 border-b border-[#285A48]/20 backdrop-blur-md sticky top-0 z-50">
                <DevMatchLogo size="md" />
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => openAuthModal('login')}
                        className="text-[#408A71] font-bold text-sm hover:text-[#B0E4CC] transition-colors"
                    >
                        LOG IN
                    </button>
                    <button 
                        onClick={() => openAuthModal('signup')}
                        className="bg-[#B0E4CC] text-[#091413] px-6 py-2.5 rounded-xl font-black text-sm hover:scale-105 transition-all"
                    >
                        SIGN UP
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <main className="flex flex-col items-center justify-center pt-16 pb-12 px-6 text-center">
                <div className="mb-6 px-4 py-1 border border-[#408A71]/30 rounded-full bg-[#285A48]/10 text-[#408A71] text-[10px] font-black tracking-widest uppercase">
                    Hackathon Matchmaking // Beta 1.0
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                    Commit to the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#408A71] via-[#B0E4CC] to-[#408A71]">
                        perfect team.
                    </span>
                </h1>

                <p className="text-[#408A71] text-lg md:text-xl max-w-2xl mb-12 font-medium">
                    Finding your next co-founder or teammate is just a match away. 
                    Stop coding solo and start building with DevMatch.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <button className="group px-10 py-5 bg-[#B0E4CC] text-[#091413] rounded-2xl font-black text-xl flex items-center gap-3 hover:shadow-[0_0_30px_-5px_#B0E4CC] transition-all">
                        Start Matching
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </main>

            {/* --- AUTH MODAL (Conditional Rendering) --- */}
            {showAuthModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#091413]/80 backdrop-blur-sm">
                    <div className="bg-[#285A48]/20 border border-[#408A71]/30 p-8 rounded-3xl max-w-md w-full relative">
                        <button 
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 text-[#408A71] hover:text-[#B0E4CC]"
                        >
                            ✕
                        </button>
                        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">
                            {authMode === 'login' ? 'Welcome Back' : 'Join the Squad'}
                        </h2>
                        {/* Placeholder for your Login/Signup forms */}
                        <div className="space-y-4">
                            <input className="w-full bg-[#091413] border border-[#285A48] rounded-xl px-4 py-3 focus:border-[#B0E4CC] outline-none" placeholder="Email" />
                            <button className="w-full bg-[#B0E4CC] text-[#091413] font-black py-3 rounded-xl uppercase tracking-widest">
                                {authMode === 'login' ? 'Enter' : 'Create Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Landing;