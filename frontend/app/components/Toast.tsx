'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const borderColor = type === 'success' ? 'border-green-300' : 'border-red-300';
    const shadowColor = type === 'success' ? 'shadow-green-500/50' : 'shadow-red-500/50';
    const Icon = type === 'success' ? CheckCircle : XCircle;

    return (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
            <div className={`${bgColor} ${borderColor} ${shadowColor} border-2 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}>
                <Icon className="w-6 h-6 shrink-0" />
                <p className="flex-1 font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded transition"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
