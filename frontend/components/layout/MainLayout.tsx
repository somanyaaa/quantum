import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { SpinnerCustom } from '@/components/Spinner';
import SideBar from './SideBar';

const MainLayout = ({children}:any) => {
    const {user, isLoading} = useAuth();
    const [currentPage, setCurrentPage] = React.useState('home');

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#091413] text-[#B0E4CC]">
                <div className='text-center'>
                    <SpinnerCustom/>
                </div>
            </div>
        )
    }   
    if (!user) {
        return<>{children}</>;
    }
    return (
        <div>
            <div className='min-h-screen bg-[#091413] text-[#B0E4CC] flex'>
                <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <main className='flex-1 p-6'>
                    {children}
                </main>
            </div>
        </div>
    )
};
export default MainLayout