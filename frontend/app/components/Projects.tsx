'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowUpRight, ExternalLink } from 'lucide-react';
import ProjectModal from '@/app/components/ProjectModal';
import { ProjectDetail } from '@/app/components/ProjectModal';
import ScrollReveal from './ScrollReveal';

interface Project {
  id: number;
  title: string;
  image: string;
  capacity: string;
  location: string;
  category: string;
}

interface ProjectsProps {
  isDark: boolean;
}

const PROJECTS_DETAIL: ProjectDetail[] = [
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

export default function Projects({ isDark }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const cardBgClass = isDark ? 'bg-gray-800/30 backdrop-blur-sm border border-gray-700' : 'bg-white/50 backdrop-blur-sm border border-gray-200';

  const projects: Project[] = [
    {
      id: 1,
      title: "Çatı Tipi GES Projesi",
      image: "https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop",
      capacity: "11.780 kWp",
      location: "Burdur",
      category: "Çatı Tipi"
    },
    {
      id: 2,
      title: "Bağlıkaya - Hastelsan GES",
      image: "https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop",
      capacity: "3.933 kWp",
      location: "Burdur",
      category: "Arazi Tipi"
    }
  ];

  return (
    <section id="projects" className={`py-24 relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]/50' : 'bg-white'}`}>
      {/* Transparent Solar Panel Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/solar_hero_bg.png"
          alt="Solar Panels Background"
          fill
          className="object-cover opacity-5"
          quality={60}
        />
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Projelerimiz</h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Tamamladığımız başarılı projeler ve çalışmalarımız
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const projectDetail = PROJECTS_DETAIL.find(p => p.id === project.id);
            return (
              <ScrollReveal key={project.id} stagger={idx * 150} duration={800}>
                <div
                  className={`group rounded-2xl overflow-hidden ${cardBgClass} shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer h-full flex flex-col`}
                  onClick={() => projectDetail && setSelectedProject(projectDetail)}
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden h-64 bg-gray-300">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500 filter group-hover:brightness-125"
                      quality={85}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                    {/* Capacity badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform group-hover:scale-110 transition duration-300">
                      {project.capacity}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-500 transition">
                        Detay Gör
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>
                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-auto`}>
                      <MapPin className="w-5 h-5 text-yellow-500 shrink-0" />
                      <span className="font-semibold">{project.location}</span>
                    </div>

                    {/* Progress bar */}
                    <div className={`mt-4 h-1 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className="h-full w-3/4 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 animate-fade-in-up space-y-4">
          <Link
            href="/projects"
            className={`inline-block px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 ${isDark
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-lg shadow-yellow-500/50'
              : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30'
              }`}
          >
            Tüm Projeleri Gör
          </Link>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          isDark={isDark}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
