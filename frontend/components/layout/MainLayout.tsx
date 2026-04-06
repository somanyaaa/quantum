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

    const hideSidebarRoutes = [
        '/login', 
        '/signup', 
        '/', 
        '/create-profile',
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

    if (shouldHideSidebar) {
        return <>{children}</>;
    }
    
    return (
        <div className="min-h-screen bg-[#091413] text-[#B0E4CC] flex overflow-hidden">
            <SideBar currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
};

export default MainLayout;