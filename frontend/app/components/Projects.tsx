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
    image: '/images/dikmetas.jpeg',
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
      '/images/dikmetas.jpeg',
    ],
  },
  {
    id: 2,
    title: 'Bağlıkaya - Hastelsan GES',
    image: '/images/baglikaya.jpeg',
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
      '/images/baglikaya.jpeg',
    ],
  },
];

export default function Projects({ isDark }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardBgClass = isDark ? 'bg-gray-800/20 border border-gray-700/50 backdrop-blur-sm' : 'bg-white/30 border border-gray-300/50 backdrop-blur-sm';

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { projectsApi } = await import('@/lib/api');
        const data = await projectsApi.getAll();

        // Map API data to component format
        const mappedProjects = data
          .filter((p: any) => p.isActive)
          .slice(0, 2) // Show only first 2 on homepage
          .map((p: any) => ({
            id: p.id,
            title: p.title,
            image: p.imagePath.startsWith('/') ? p.imagePath : `/${p.imagePath.replace(/^public\//, '')}`,
            capacity: p.capacity,
            location: p.location,
            category: p.category
          }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error('Projeler yüklenirken hata:', error);
        // Fallback to static data if API fails
        setProjects([
          {
            id: 1,
            title: "Çatı Tipi GES Projesi",
            image: "/images/dikmetas.jpeg",
            capacity: "11.780 kWp",
            location: "Burdur",
            category: "Çatı Tipi"
          },
          {
            id: 2,
            title: "Bağlıkaya - Hastelsan GES",
            image: "/images/baglikaya.jpeg",
            capacity: "3.933 kWp",
            location: "Burdur",
            category: "Arazi Tipi"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

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

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-4`}>Projeler yükleniyor...</p>
          </div>
        ) : (
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects.map((project, idx) => {
                const projectDetail = PROJECTS_DETAIL.find(p => p.id === project.id);
                return (
                  <div
                    key={project.id}
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

                      {/* Category badge */}
                      <div className="mt-4">
                        <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-semibold">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* View All Button */}
        <ScrollReveal>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg shadow-yellow-500/50 transition transform hover:scale-105"
            >
              Tüm Projeleri Gör
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
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
