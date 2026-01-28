'use client';

import React, { useEffect } from 'react';

const COMPANY_LOCATION = {
    lat: 37.7206,
    lon: 30.2903,
    address: 'Pazar Mh. Belediye Sk. No:2 MERKEZ / BURDUR'
};

export default function MiniMap() {
    useEffect(() => {
        console.log('🗺️ MiniMap component rendered!');
    }, []);

    const handleMapClick = () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${COMPANY_LOCATION.lat},${COMPANY_LOCATION.lon}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            onClick={handleMapClick}
            style={{
                width: '100%',
                maxWidth: '300px',
                height: '200px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                border: '2px solid #d1d5db',
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#eab308';
                e.currentTarget.style.backgroundColor = '#fef9c3';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
        >
            {/* Map Icon */}
            <svg
                style={{ width: '64px', height: '64px', marginBottom: '12px', color: '#eab308' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            {/* Address Text */}
            <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 8px 0'
            }}>
                {COMPANY_LOCATION.address}
            </p>

            {/* Instruction Text */}
            <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
            }}>
                Haritada görüntülemek için tıklayın
            </p>
        </div>
    );
}
