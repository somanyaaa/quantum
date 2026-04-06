"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DevMatchLogo from '@/components/devmatchlogo';
import { ArrowRight, User, Code2, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AVAILABLE_SKILLS = [
    "JavaScript", "React", "Next.js", "Node.js", "Python", 
    "TypeScript", "Tailwind CSS", "Figma", "MongoDB", 
    "PostgreSQL", "Firebase", "Machine Learning", "Solidity"
];

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function OnboardingPage() {
    const router = useRouter();
    const { updateProfile } = useAuth();
    
    const [name, setName] = useState('');
    const [experience, setExperience] = useState('');
    const [mySkills, setMySkills] = useState<string[]>([]);
    
    const [teammatesNeeded, setTeammatesNeeded] = useState('');
    const [seekingSkills, setSeekingSkills] = useState<string[]>([]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleSkill = (skill: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (list.includes(skill)) {
            setList(list.filter(s => s !== skill));
        } else {
            if (list.length < 5) setList([...list, skill]);
        }
    };

    const handleCompleteProfile = async () => {
        setIsSubmitting(true);
        const profileData = { name, experience, mySkills, teammatesNeeded, seekingSkills };
        console.log("Saving Profile:", profileData);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        updateProfile({
            username: name,
            skills: mySkills,
        });
        router.push('/dashboard');
    };
    const isFormValid = name.trim() !== '' && experience !== '' && mySkills.length > 0;
    return (
        <div className="min-h-screen bg-[#091413] text-[#B0E4CC] selection:bg-[#408A71] pb-24">
            <nav className="p-6 border-b border-[#285A48]/30 flex justify-center sticky top-0 bg-[#091413]/80 backdrop-blur-md z-50">
                <DevMatchLogo size="sm" />
            </nav>

            <main className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-[#B0E4CC]">
                        Build Your Profile
                    </h1>
                    <p className="text-[#408A71] font-medium">
                        Set up your hacker identity to get perfectly matched.
                    </p>
                </div>

                <div className="bg-[#285A48]/10 border border-[#408A71]/30 rounded-3xl p-8 mb-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-[#408A71] w-6 h-6" />
                        <h2 className="text-2xl font-bold text-[#B0E4CC]">The Developer</h2>
                    </div>  
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[#408A71] text-sm font-bold uppercase tracking-widest mb-2">Display Name</label>
                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#091413] border border-[#285A48] rounded-xl px-4 py-3 focus:border-[#B0E4CC] outline-none text-[#B0E4CC] placeholder:text-[#408A71]/50 transition-colors" 
                                placeholder="e.g. CodeNinja99" 
                            />
                        </div>

                        <div>
                            <label className="block text-[#408A71] text-sm font-bold uppercase tracking-widest mb-2">Experience Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                {EXPERIENCE_LEVELS.map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setExperience(level)}
                                        className={`py-3 rounded-xl text-sm font-bold transition-all ${
                                            experience === level 
                                                ? 'bg-[#B0E4CC] text-[#091413] shadow-[0_0_15px_-3px_#B0E4CC]' 
                                                : 'bg-[#091413] border border-[#285A48] text-[#408A71] hover:border-[#408A71] hover:text-[#B0E4CC]'
                                        }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#285A48]/10 border border-[#408A71]/30 rounded-3xl p-8 mb-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Code2 className="text-[#408A71] w-6 h-6" />
                            <h2 className="text-2xl font-bold text-[#B0E4CC]">Your Skills</h2>
                        </div>
                        <span className="text-[#408A71] text-xs font-bold uppercase tracking-widest">
                            {mySkills.length} / 5
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {AVAILABLE_SKILLS.map(skill => {
                            const isSelected = mySkills.includes(skill);
                            return (
                                <button
                                    key={`my-${skill}`}
                                    onClick={() => toggleSkill(skill, mySkills, setMySkills)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                        isSelected 
                                            ? 'bg-[#B0E4CC] text-[#091413] shadow-[0_0_15px_-3px_#B0E4CC]' 
                                            : 'bg-[#091413] border border-[#285A48] text-[#408A71] hover:border-[#408A71] hover:text-[#B0E4CC]'
                                    }`}
                                >
                                    {skill} {isSelected && '✓'}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="bg-[#285A48]/10 border border-[#408A71]/30 rounded-3xl p-8 mb-12 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="text-[#408A71] w-6 h-6" />
                        <h2 className="text-2xl font-bold text-[#B0E4CC]">Squad Needs</h2>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <label className="block text-[#408A71] text-sm font-bold uppercase tracking-widest mb-2">
                                How many teammates do you need? <span className="opacity-50 font-normal lowercase">(optional)</span>
                            </label>
                            <input 
                                type="number"
                                min="1"
                                max="4"
                                value={teammatesNeeded}
                                onChange={(e) => setTeammatesNeeded(e.target.value)}
                                className="w-full sm:w-1/3 bg-[#091413] border border-[#285A48] rounded-xl px-4 py-3 focus:border-[#B0E4CC] outline-none text-[#B0E4CC] placeholder:text-[#408A71]/50 transition-colors" 
                                placeholder="e.g. 2" 
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-3">
                                <label className="block text-[#408A71] text-sm font-bold uppercase tracking-widest">
                                    Skills you are looking for
                                </label>
                                <span className="text-[#408A71] text-xs font-bold uppercase tracking-widest">
                                    {seekingSkills.length} / 5
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {AVAILABLE_SKILLS.map(skill => {
                                    const isSelected = seekingSkills.includes(skill);
                                    return (
                                        <button
                                            key={`seek-${skill}`}
                                            onClick={() => toggleSkill(skill, seekingSkills, setSeekingSkills)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                                isSelected 
                                                    ? 'bg-[#408A71] text-[#091413] shadow-[0_0_15px_-3px_#408A71]' 
                                                    : 'bg-[#091413] border border-[#285A48] text-[#408A71] hover:border-[#408A71] hover:text-[#B0E4CC]'
                                            }`}
                                        >
                                            {skill} {isSelected && '✓'}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pb-10">
                    <button 
                        onClick={handleCompleteProfile}
                        disabled={!isFormValid || isSubmitting}
                        className="group px-12 py-5 bg-[#B0E4CC] text-[#091413] rounded-2xl font-black text-xl flex items-center gap-3 hover:shadow-[0_0_30px_-5px_#B0E4CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving Profile...' : 'Enter Matchmaking'}
                        {!isSubmitting && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
                    </button>
                </div>
            </main>
        </div>
    );
}