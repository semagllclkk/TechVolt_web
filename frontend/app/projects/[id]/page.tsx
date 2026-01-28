'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Zap, Calendar, Users, Award, ArrowLeft, CheckCircle, TrendingUp, Play } from 'lucide-react';

interface ProjectDetail {
  id: number;
  title: string;
  image: string;
  capacity: string;
  location: string;
  category: string;
  description: string;
  longDescription?: string;
  details: {
    startDate: string;
    endDate: string;
    client: string;
    investment: string;
    team: number;
    status: string;
  };
  specifications: {
    panelCount: number;
    efficiency: string;
    warranty: string;
    technology: string;
  };
  benefits: string[];
  images: string[];
}

const PROJECTS: ProjectDetail[] = [
  {
    id: 1,
    title: 'İstanbul Güneş Enerjisi Parkı',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop',
    capacity: '50 MW',
    location: 'İstanbul, Türkiye',
    category: 'Güneş Enerjisi',
    description: 'İstanbul\'da kurulmuş, 50 megavatlık güneş enerjisi santrali.',
    longDescription: 'Bu projede, İstanbul\'ın enerji ihtiyacını karşılamak için en son teknoloji kullanılan güneş panelleri kurulmuştur. Proje, çevre dostu ve sürdürülebilir enerji üretiminin yanı sıra, bölgeye ekonomik katkı sağlamış ve yeni istihdamlar oluşturmuştur.',
    details: {
      startDate: 'Ocak 2022',
      endDate: 'Aralık 2023',
      client: 'Istanbul Energy Solutions',
      investment: '$45 Milyon',
      team: 250,
      status: 'Tamamlandı',
    },
    specifications: {
      panelCount: 150000,
      efficiency: '%22.5',
      warranty: '25 Yıl',
      technology: 'Monokristal Silikon',
    },
    benefits: [
      'Yıllık 75.000 ton CO2 azaltımı',
      '180.000 hanelyk enerji üretimi',
      'İstihdam: 250+ kişi',
      'Lokal enerji üretimi',
      'Düşük işletme maliyeti',
      'Enerji bağımsızlığı',
    ],
    images: ['https://images.unsplash.com/photo-1509391366360-2e938aa1df42?w=800&h=600&fit=crop'],
  },
  {
    id: 2,
    title: 'Ankara Enerji Depolama Sistemi',
    image: 'https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop',
    capacity: '30 MWh',
    location: 'Ankara, Türkiye',
    category: 'Enerji Depolama',
    description: 'Ankara\'da kurulan 30 megavatlık/saatlik batarya enerji depolama sistemi.',
    longDescription: 'Bu proje, kesintisiz enerji tedarikini sağlamak için geliştirilmiş bir batarya depolama sistemidir. Enerji şebekesine esneklik katarak, pik saatlerde ve acil durumlarda güvenilir enerji tedarikini garantilemektedir.',
    details: {
      startDate: 'Mayıs 2023',
      endDate: 'Kasım 2024',
      client: 'Ankara Energy Grid',
      investment: '$28 Milyon',
      team: 180,
      status: 'Tamamlandı',
    },
    specifications: {
      panelCount: 0,
      efficiency: '%94.5',
      warranty: '10 Yıl',
      technology: 'LiFePO4 Batarya',
    },
    benefits: [
      'Şebeke stabilizesi',
      'Pik saate karşı koruma',
      'İşletme maliyeti azaltması',
      'Gözden geçirilmiş güvenilirlik',
      'Hızlı tepki süresi',
      'Scalability',
    ],
    images: ['https://images.unsplash.com/photo-1508066806295-23e76319801d?w=800&h=600&fit=crop'],
  },
  {
    id: 3,
    title: 'İzmir Elektrik Altyapı Geliştirmesi',
    image: 'https://images.unsplash.com/photo-1516905041604-2bc40bc5c845?w=800&h=600&fit=crop',
    capacity: '120 km',
    location: 'İzmir, Türkiye',
    category: 'Elektrik Altyapısı',
    description: 'İzmir\'de elektrik altyapısının modernizasyonu ve genişletilmesi projesi.',
    longDescription: 'Bu kapsamlı altyapı projesi, İzmir bölgesinde elektrik dağıtım ağını modernize etmiş ve genişletmiştir. Akıllı teknolojiler kullanılarak şehrin enerji dağıtımı daha verimli ve güvenilir hale getirilmiştir.',
    details: {
      startDate: 'Şubat 2023',
      endDate: 'Ağustos 2024',
      client: 'İzmir Elektrik Dağıtım',
      investment: '$52 Milyon',
      team: 320,
      status: 'Tamamlandı',
    },
    specifications: {
      panelCount: 0,
      efficiency: '%98.2',
      warranty: '15 Yıl',
      technology: 'Akıllı Şebeke Teknolojisi',
    },
    benefits: [
      'Verilen enerjideki kayıp azlığı',
      'Enerji kalitesi iyileştirmesi',
      'Müşteri memnuniyeti artışı',
      'Sistem güvenilirliği',
      'Otomatik arızalandırmalar',
      'Bakım maliyeti azlığı',
    ],
    images: ['https://images.unsplash.com/photo-1516905041604-2bc40bc5c845?w=800&h=600&fit=crop'],
  },
  {
    id: 4,
    title: 'Bursa Konsültasyon Danışmanlığı',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    capacity: '50+ Proje',
    location: 'Bursa, Türkiye',
    category: 'Danışmanlık',
    description: 'Bursa bölgesindeki 50+ enerji ve elektrik projesine stratejik danışmanlık.',
    longDescription: 'Bursa\'da faaliyet gösteren şirketlere verilen kapsamlı danışmanlık hizmetleri, enerji verimliliğini artırmış ve işletme maliyetlerini düşürmüştür. Her proje için özel çözümler geliştirilmiştir.',
    details: {
      startDate: 'Haziran 2021',
      endDate: 'Haziran 2024',
      client: 'Bursa İnovasyon Grubu',
      investment: '$18 Milyon',
      team: 85,
      status: 'Devam Ediyor',
    },
    specifications: {
      panelCount: 0,
      efficiency: '%100',
      warranty: '3 Yıl Destekten',
      technology: 'Danışmanlık Hizmetleri',
    },
    benefits: [
      'Maliyet tasarrufu',
      'Proje yönetimi',
      'Teknik analiz',
      'Kaynak optimizasyonu',
      'Risk yönetimi',
      'Sürdürülebilir çözümler',
    ],
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'],
  },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isDark, setIsDark] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    params.then(({ id }) => setProjectId(id));
  }, [params]);

  const project = projectId ? PROJECTS.find(p => p.id === parseInt(projectId)) : null;

  if (!projectId || !project) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-20 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="text-center animate-fadeIn">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Proje Bulunamadı
          </h1>
          <Link href="/projects" className="text-yellow-500 font-semibold hover:text-yellow-600 transition">
            ← Tüm Projelere Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => new Set([...prev, imageSrc]));
  };

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Tüm Projelere Dön
        </Link>
      </div>

      {/* Hero Section with Video/Image Support */}
      <div className="relative h-96 md:h-125 overflow-hidden group">
        {!imageErrors.has(project.image) ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            onError={() => handleImageError(project.image)}
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            quality={85}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Resim Yüklenemiyor</p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

        {/* Animated Content */}
        <div className="absolute inset-0 flex items-end animate-fadeIn">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="inline-block px-4 py-2 rounded-lg bg-linear-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold mb-4 shadow-lg">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
              {project.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl drop-shadow">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {/* Description */}
            <div className="group">
              <h2 className={`text-3xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="w-1 h-8 bg-linear-to-b from-yellow-500 to-yellow-400 rounded-full"></div>
                Proje Hakkında
              </h2>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: 'Başlama', value: project.details.startDate },
                { icon: CheckCircle, label: 'Tamamlama', value: project.details.endDate },
                { icon: Users, label: 'Takım', value: `${project.details.team} kişi` },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDark
                      ? 'bg-linear-to-br from-gray-800 to-gray-900 border-yellow-500/20 hover:border-yellow-500/50'
                      : 'bg-linear-to-br from-gray-50 to-gray-100 border-yellow-200 hover:border-yellow-400'
                      }`}
                  >
                    <Icon className="w-6 h-6 text-yellow-500 mb-3" />
                    <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Specifications */}
            <div className="group">
              <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="w-1 h-8 bg-linear-to-b from-yellow-500 to-yellow-400 rounded-full"></div>
                Teknik Özellikler
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Zap, label: 'Verimlilik', value: project.specifications.efficiency },
                  { icon: Award, label: 'Garanti', value: project.specifications.warranty },
                  ...(project.specifications.panelCount > 0 ? [{ icon: TrendingUp, label: 'Panel Sayısı', value: project.specifications.panelCount.toLocaleString() }] : []),
                  { icon: Zap, label: 'Teknoloji', value: project.specifications.technology },
                ].map((spec, idx) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDark
                        ? 'bg-linear-to-br from-yellow-500/10 to-transparent border-yellow-500/50 hover:border-yellow-400'
                        : 'bg-linear-to-br from-yellow-50 to-transparent border-yellow-300 hover:border-yellow-400'
                        }`}
                    >
                      <Icon className="w-6 h-6 text-yellow-500 mb-3" />
                      <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {spec.label}
                      </p>
                      <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        {spec.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="group">
              <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="w-1 h-8 bg-linear-to-b from-yellow-500 to-yellow-400 rounded-full"></div>
                Sağlanan Faydalar
              </h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {project.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:shadow-md ${isDark
                      ? 'bg-gray-800/50 hover:bg-gray-800'
                      : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <span className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            {/* Project Info Card */}
            <div className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-lg ${isDark
              ? 'bg-linear-to-br from-gray-800 to-gray-900 border-yellow-500/30 hover:border-yellow-500/50'
              : 'bg-linear-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-yellow-400'
              }`}>
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <div className="w-1 h-6 bg-linear-to-b from-yellow-500 to-yellow-400 rounded-full"></div>
                Proje Bilgileri
              </h3>

              <div className="space-y-6">
                {[
                  { label: 'Kapasite', value: project.capacity, icon: Zap },
                  { label: 'Konum', value: project.location, icon: MapPin },
                  { label: 'Müşteri', value: project.details.client, icon: null },
                  { label: 'Yatırım', value: project.details.investment, icon: null },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="pb-6 border-b border-gray-200/20 last:border-b-0 last:pb-0">
                      <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.label}
                      </p>
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4 text-yellow-500" />}
                        <p className={`text-lg font-bold ${['Kapasite', 'Yatırım'].includes(item.label) ? 'text-yellow-500' : isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-6 border-t border-gray-200/20">
                  <p className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Durum
                  </p>
                  <span className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm ${project.details.status === 'Tamamlandı'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${project.details.status === 'Tamamlandı' ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                    {project.details.status}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${isDark
              ? 'bg-linear-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/50 hover:border-yellow-400'
              : 'bg-linear-to-br from-yellow-50 to-yellow-100/50 border-yellow-300 hover:border-yellow-400'
              }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ⚡ Benzer Bir Proje mi Düşünüyorsunuz?
              </h3>
              <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Bize iletişime geçin ve harika fikirlerinizi birlikte gerçekleştirelim.
              </p>
              <Link
                href="/#contact"
                className="block w-full text-center px-6 py-3 bg-linear-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                İletişime Geç →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <div className={`${isDark ? 'bg-linear-to-b from-gray-800 to-gray-900' : 'bg-linear-to-b from-gray-50 to-white'} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <div className="w-1 h-10 bg-linear-to-b from-yellow-500 to-yellow-400 rounded-full"></div>
            Diğer Projelerimiz
          </h2>
          <p className={`text-lg mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Enerji ve elektrik sektöründe yaptığımız diğer başarılı projeler
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.filter(p => p.id !== project.id).slice(0, 3).map((relatedProject, idx) => (
              <Link
                key={relatedProject.id}
                href={`/projects/${relatedProject.id}`}
                className={`group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fadeIn ${isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden bg-[#0a0a0a]">
                  {!imageErrors.has(relatedProject.image) ? (
                    <Image
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      fill
                      onError={() => handleImageError(relatedProject.image)}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      quality={85}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
                      <Zap className="w-12 h-12 text-yellow-500/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm font-semibold text-yellow-400">Proje Detaylarını Görmek İçin Tıklayın</p>
                    </div>
                  </div>
                </div>
                <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  <h3 className={`font-bold mb-3 text-lg group-hover:text-yellow-500 transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {relatedProject.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Zap className="w-4 h-4" />
                      <p className="font-semibold text-sm">
                        {relatedProject.capacity}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${isDark
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {relatedProject.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
