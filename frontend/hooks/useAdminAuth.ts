'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = localStorage.getItem('adminAuth');
            const authTime = localStorage.getItem('adminAuthTime');

            if (!isAuth || isAuth !== 'true') {
                router.push('/admin/login');
                return false;
            }

            // Check if session expired (24 hours)
            if (authTime) {
                const elapsed = Date.now() - parseInt(authTime);
                const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

                if (elapsed > TWENTY_FOUR_HOURS) {
                    localStorage.removeItem('adminAuth');
                    localStorage.removeItem('adminAuthTime');
                    router.push('/admin/login');
                    return false;
                }
            }

            return true;
        };

        checkAuth();
    }, [router]);
}

export function logout() {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthTime');
    window.location.href = '/admin/login';
}
