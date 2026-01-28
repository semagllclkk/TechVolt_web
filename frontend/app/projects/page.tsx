'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import ProjectModal from '@/app/components/ProjectModal';
import { ProjectDetail } from '@/app/components/ProjectModal';

const PROJECTS: ProjectDetail[] = [
  {
    id: 1,
    title: "Çatı Tipi GES Projesi",
    image: "https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop",
    capacity: "11.780 kWp / 10 kWe",
    location: "Burdur, Türkiye",
    category: "Çatı Tipi",
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
      "https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Bağlıkaya - Hastelsan GES",
    image: "https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop",
    capacity: "3.933 kWp / 2.910 kWe",
    location: "Burdur, Türkiye",
    category: "Arazi Tipi",
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
      "https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop",
    ],
  }
];

export default function ProjectsPage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => new Set([...prev, imageSrc]));
  };

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-16 h-16">
            <Image
              src={isDark ? "/images/techvolt_dark.jpeg" : "/images/techvolt_light.jpeg"}
              alt="TechVolt Logo"
              width={64}
              height={64}
              className="object-contain rounded-lg"
            />
          </div>
          <span className={`font-bold text-lg ${isDark ? 'text-yellow-500' : 'text-yellow-600'}`}>
            Portföyümüz
          </span>
        </div>
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent`}>
          Tüm Projelerimiz
        </h1>
        <p className={`text-xl max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          TechVolt Solutions olarak gerçekleştirdiğimiz başarılı enerji ve elektrik projelerini keşfedin. Her proje, yenilikçiliğin ve mükemmelliğin bir belgesidir.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeIn border-2 ${isDark
                ? 'bg-gray-800 border-gray-700 hover:border-yellow-500/50'
                : 'bg-white border-gray-200 hover:border-yellow-400'
                }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-96 overflow-hidden bg-[#0a0a0a]">
                {!imageErrors.has(project.image) ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    onError={() => handleImageError(project.image)}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    quality={85}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center text-gray-500">
                      <p className="text-sm">Resim Yüklenemiyor</p>
                    </div>
                  </div>
                )}
                {/* Overlay */}
                <div className={`absolute inset-0 bg-linear-to-t from-gray-900/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6`}>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-yellow-300">
                      <span className="font-semibold">Proje Detaylarını Görmek İçin Tıklayın</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Card Info */}
              <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold mb-2 group-hover:text-yellow-500 transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.location}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg font-semibold text-sm whitespace-nowrap ml-2 ${isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                    {project.capacity}
                  </span>
                </div>
                <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description.substring(0, 100)}...
                </p>
                <Link
                  href={`/projects/${project.id}`}
                  className={`inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all text-yellow-500 hover:text-yellow-400`}
                >
                  Detayları Gör <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        isDark={isDark}
        onClose={() => setSelectedProject(null)}
      />

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:gap-3 transition-all hover:text-yellow-400"
        >
          ← Ana Sayfaya Dön
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
