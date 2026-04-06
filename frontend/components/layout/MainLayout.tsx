"use client";

import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation'; 
import { SpinnerCustom } from '@/components/Spinner';
import SideBar from './SideBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = React.useState('home');

    // 1. Add your profile creation route to this list
    const hideSidebarRoutes = [
        '/login', 
        '/signup', 
        '/', 
        '/create-profile', // Add whatever your actual path is here
        '/onboarding'
    ];

    const shouldHideSidebar = hideSidebarRoutes.includes(pathname) || !user;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#091413]">
                <SpinnerCustom />
            </div>
        )
    }

    // 2. If it's a "No Sidebar" page OR user isn't logged in, just show content
    if (shouldHideSidebar) {
        return <>{children}</>;
    }

    // 3. The "Matchmaking" world - Sidebar is now active
    return (
        <div className="min-h-screen bg-[#091413] text-[#B0E4CC] flex overflow-hidden">
            <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
};

export default MainLayout;