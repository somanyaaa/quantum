"use client"; // Required for hooks like useAuth and usePathname

import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation'; 
import { SpinnerCustom } from '@/components/Spinner';
import SideBar from './SideBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = React.useState('home');

    // 1. Determine if we are on a "Public" page (No Sidebar needed)
    const isPublicPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#091413]">
                <SpinnerCustom />
            </div>
        )
    }

    // 2. If it's a public page OR user isn't logged in, just show the page content
    if (isPublicPage || !user) {
        return <>{children}</>;
    }

    // 3. For the rest of the app (Dashboard, Matches, etc.), show the Sidebar
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