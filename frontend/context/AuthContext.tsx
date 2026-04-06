"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    id: string;
    username: string;
    avatar: string;
    bio: string;
    email: string;
    skills?: string[];
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean; // 1. Add this to the type
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (updatedData: Partial<User>) => void; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const savedUser = localStorage.getItem('devmatch_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const mockUser: User = {
            id: '1',
            username: 'Rashi',
            avatar: "https://img.freepik.com/free-vector/cute-girl-hacker-operating-laptop-cartoon-vector-icon-illustration-people-technology-isolated-flat_138676-9487.jpg?semt=ais_incoming&w=740&q=80",
            bio: "Full-stack developer with a passion for building impactful projects. Skilled in React, Node.js, and Python. Always eager to learn and collaborate on innovative ideas.",
            email: "rashigoswami@gmail.com",
            skills: ['React', 'Node.js', 'Python']
        }
        setUser(mockUser);
        localStorage.setItem('devmatch_user', JSON.stringify(mockUser));
    };

    const signup = async (username: string, email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
            id: '2',
            username: "John Doe",
            avatar:"https://chingizpro.github.io/portfolio/img/person.png",
            bio: "New user joining the community!",
            email: "johndoe@example.com",
            skills: ['JavaScript', 'CSS', 'HTML']
        };
        setUser(mockUser);
        localStorage.setItem('devmatch_user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('devmatch_user');
    };
    
    const updateProfile = (updatedData: Partial<User>) => {
        if (user) {
            const newUser = { ...user, ...updatedData };
            setUser(newUser);
            localStorage.setItem('devmatch_user', JSON.stringify(newUser));
        }
    };
    
    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading, // 2. Provide the loading state
            isAuthenticated: !!user, 
            login, 
            signup, 
            logout, 
            updateProfile 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}