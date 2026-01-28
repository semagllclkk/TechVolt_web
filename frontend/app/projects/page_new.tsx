'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Zap, ArrowUpRight } from 'lucide-react';
import ProjectModal from '@/app/components/ProjectModal';
import { ProjectDetail } from '@/app/components/ProjectModal';

const PROJECTS: ProjectDetail[] = [
    {
        id: 1,
        title: 'Çatı Tipi GES Projesi',
        image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop',
        capacity: '11.780 kWp / 10 kWe',
        location: 'Burdur, Türkiye',
        category: 'Çatı Tipi',
        description: 'Burdur\'da tamamlanmış çatı tipi güneş enerjisi santrali. Proje, müşterimizin enerji ihtiyacının büyük bir kısmını karşılamakta ve yıllık enerji maliyetlerinde önemli tasarruf sağlamaktadır.',
        details: {
            startDate: '05.11.2025',
            endDate: '07.11.2025',
            panelCount: 19,
            status: 'Tamamlandı',
        },
        benefits: [
            'Yıllık enerji maliyetlerinde tasarruf',
            'Temiz enerji üretimi',
            'Çevre dostu çözüm',
            'Uzun ömürlü sistem',
        ],
        images: [
            'https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop',
        ],
    },
    {
        id: 2,
        title: 'Bağlıkaya - Hastelsan GES',
        image: 'https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop',
        capacity: '3.933 kWp / 2.910 kWe',
        location: 'Burdur, Türkiye',
        category: 'Arazi Tipi',
        description: 'Bağlıkaya bölgesinde tamamlanmış arazi tipi güneş enerjisi santrali. Hastelsan için gerçekleştirilen bu proje, geniş alan kullanımı ile yüksek verimli enerji üretimi sağlamaktadır.',
        details: {
            startDate: '01.09.2025',
            endDate: '22.10.2025',
            panelCount: 6344,
            status: 'Tamamlandı',
        },
        benefits: [
            'Yüksek kapasiteli enerji üretimi',
            'Geniş alan optimizasyonu',
            'Sürdürülebilir enerji kaynağı',
            'CO2 emisyon azaltımı',
        ],
        images: [
            'https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop',
        ],
    },
];
