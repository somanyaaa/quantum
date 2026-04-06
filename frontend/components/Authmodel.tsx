import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // It's back!

interface AuthmodelProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: 'login' | 'signup';
}

export default function Authmodel({ isOpen, onClose, initialMode }: AuthmodelProps) {
    const router = useRouter();
    const { login, signup } = useAuth(); // Grabbing your global functions!
    
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<any>({});

    useEffect(() => { setMode(initialMode); }, [initialMode, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (mode === 'login') {
                // Call global login
                await login(formData.email, formData.password);
                router.push('/dashboard'); 
            } else {
                // Call global signup
                await signup(formData.username, formData.email, formData.password);
                router.push('/onboarding'); 
            }
            onClose();
        } catch (err) {
            console.error("Auth failed");
        } finally {
            setIsLoading(false);
            setFormData({ username: '', email: '', password: '' });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prevData => ({ ...prevData, [field]: value }));
        if (error[field]) setError((prev: any) => ({ ...prev, [field]: '' }));
    };

    const switchMode = () => {
        setMode(mode === "login" ? "signup" : "login");
        setError({});
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#091413]/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#285A48]/20 border border-[#408A71]/30 p-8 rounded-3xl max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-5 right-5 text-[#408A71] hover:text-[#B0E4CC] transition-colors">✕</button>
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-[#B0E4CC]">
                    {mode === 'login' ? 'Welcome Back' : 'Join the Squad'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    {mode === 'signup' && (
                        <input value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)} className="w-full bg-[#091413] border border-[#285A48] rounded-xl px-4 py-3 focus:border-[#B0E4CC] outline-none text-[#B0E4CC] placeholder:text-[#408A71]/50" placeholder="Your Name / Handle" required />
                    )}
                    <input value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-[#091413] border border-[#285A48] rounded-xl px-4 py-3 focus:border-[#B0E4CC] outline-none text-[#B0E4CC] placeholder:text-[#408A71]/50" placeholder="Email" type="email" required />
                    
                    <div className="relative">
                        <input value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-full bg-[#091413] border border-[#285A48] rounded-xl px-4 py-3 focus:border-[#B0E4CC] outline-none text-[#B0E4CC] placeholder:text-[#408A71]/50 pr-12" placeholder="Password" type={showPassword ? "text" : "password"} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#408A71] hover:text-[#B0E4CC] text-xs font-bold uppercase">{showPassword ? "Hide" : "Show"}</button>
                    </div>
                    
                    <button type="submit" disabled={isLoading} className="w-full bg-[#B0E4CC] text-[#091413] font-black py-3 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all mt-2 shadow-[0_0_20px_-5px_#B0E4CC] disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? 'Processing...' : (mode === 'login' ? 'Enter System' : 'Create Profile')}
                    </button>
                </form>

                <div className="text-center text-sm font-medium text-[#408A71]">
                    {mode === 'signup' ? (
                        <p>Already have an account? <button onClick={switchMode} type="button" className="text-[#B0E4CC] font-bold hover:underline">Log in here.</button></p>
                    ) : (
                        <p>Don't have a profile yet? <button onClick={switchMode} type="button" className="text-[#B0E4CC] font-bold hover:underline">Sign up here.</button></p>
                    )}
                </div>
            </div>
        </div>
    );
}