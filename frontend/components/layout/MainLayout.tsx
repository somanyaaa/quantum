"use client";

import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation'; 
import { SpinnerCustom } from '@/components/Spinner';
import SideBar from './SideBar';
import RightSideBar from './RightSideBar';
import ProfilePage from '../profile/ProfilePage';
import MatchesView from '../matches/MatchesView';

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
        <div className="h-screen w-full bg-[#091413] text-[#B0E4CC] flex items-start overflow-hidden">
            <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-1 h-full overflow-y-auto border-x border-[#285A48]/10 no-scrollbar">
                {currentPage === 'home' && children}
                {currentPage === 'matches' && <MatchesView />}
                {currentPage === 'profile' && <ProfilePage />}
            </main>
            <RightSideBar />
        </div>
    )
};

export default MainLayout;