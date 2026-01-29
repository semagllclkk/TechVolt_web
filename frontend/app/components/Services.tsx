'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sun, Battery, Zap, TrendingUp, Check, ArrowRight, X, Settings } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ServicesProps {
  isDark: boolean;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  detailedInfo?: string;
}

export default function Services({ isDark }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const cardBgClass = isDark ? 'bg-gray-800/30 backdrop-blur-sm border border-gray-700' : 'bg-white/50 backdrop-blur-sm border border-gray-200';

  const services: Service[] = [
    {
      icon: <Sun className="w-16 h-16" />,
      title: "Güneş Enerjisi Sistemleri",
      description: "Çatı üstü ve arazi tipi güneş paneli kurulumu, bakım ve danışmanlık",
      features: ["On-Grid Sistemler", "Off-Grid Sistemler", "Hibrit Çözümler"],
      gradient: "from-yellow-400 to-yellow-600",
      detailedInfo: "Güneş enerjisi sistemlerimiz, son teknoloji paneller ve inverterler kullanılarak en yüksek verimlilik sağlamaktadır. Profesyonel ekibimiz ile kurulumdan sonrası bakıma kadar tam destek veriyoruz."
    },
    {
      icon: <Battery className="w-16 h-16" />,
      title: "Enerji Depolama",
      description: "Akıllı batarya sistemleri ile kesintisiz enerji çözümleri",
      features: ["Lityum Bataryalar", "Enerji Yönetimi", "Yedekleme Sistemleri"],
      gradient: "from-blue-400 to-blue-600",
      detailedInfo: "Enerji depolama çözümlerimiz ile elektrik kesintilerinde bile enerjiniz güvende. Akıllı sistemlerimiz enerji tüketiminizi optimize eder ve maliyetlerinizi düşürür."
    },
    {
      icon: <Zap className="w-16 h-16" />,
      title: "Elektrik Tesisat",
      description: "Endüstriyel ve konut elektrik altyapı projeleri",
      features: ["Proje Tasarım", "Uygulama", "Bakım-Onarım"],
      gradient: "from-orange-400 to-orange-600",
      detailedInfo: "Elektrik tesisat hizmetlerimiz ile güvenli ve standartlara uygun altyapı oluşturuyoruz. Tüm projelerimiz TSE standartlarına uygun olarak gerçekleştirilmektedir."
    },
    {
      icon: <TrendingUp className="w-16 h-16" />,
      title: "Enerji Danışmanlığı",
      description: "Enerji verimliliği analizi ve optimizasyon çözümleri",
      features: ["Enerji Analizi", "Maliyet Optimizasyonu", "Sürdürülebilirlik"],
      gradient: "from-green-400 to-green-600",
      detailedInfo: "Enerji danışmanlığı hizmetimiz ile işletmenizin enerji tüketimini analiz ediyor ve tasarruf fırsatları sunuyoruz. Yatırım getirinizi maksimize ediyoruz."
    },
    {
      icon: <Settings className="w-16 h-16" />,
      title: "Saha Bakım ve İşletme",
      description: "Güneş enerjisi santrallerinin periyodik bakımı ve işletilmesi",
      features: ["Periyodik Bakım", "Arıza Müdahale", "Performans Takibi"],
      gradient: "from-purple-400 to-purple-600",
      detailedInfo: "Santrallerinizin maksimum verimle çalışması için profesyonel bakım ve işletme hizmetleri sunuyoruz. 7/24 uzaktan izleme ve hızlı müdahale ekiplerimizle üretim kaybınızı minimize ediyoruz."
    }
  ];

  return (
    <section id="services" className={`py-24 relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]/50' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Hizmetlerimiz</h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Enerji ihtiyaçlarınız için kapsamlı çözümler sunuyoruz. Modern teknoloji ve uzman kadro ile hizmetinizde.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, idx) => (
            <ScrollReveal key={idx} stagger={idx * 100} duration={700}>
              <div
                className={`group relative p-5 rounded-xl ${cardBgClass} shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 h-full flex flex-col`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-xl bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition duration-300`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`text-${service.gradient.split('-')[1]}-500 mb-4 group-hover:scale-110 transition duration-300 group-hover:rotate-6`}>
                    {React.cloneElement(service.icon as React.ReactElement<{ className: string }>, { className: "w-12 h-12" })}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-3`}>
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-4 flex-grow">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-xs">
                        <Check className={`w-3.5 h-3.5 ${service.gradient.includes('yellow') ? 'text-yellow-500' : service.gradient.includes('blue') ? 'text-blue-500' : service.gradient.includes('orange') ? 'text-orange-500' : service.gradient.includes('purple') ? 'text-purple-500' : 'text-green-500'} mr-1.5 shrink-0`} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedService(service)}
                    className={`inline-flex items-center gap-2 font-semibold group/btn ${service.gradient.includes('yellow') ? 'text-yellow-500 hover:text-yellow-600' :
                      service.gradient.includes('blue') ? 'text-blue-500 hover:text-blue-600' :
                        service.gradient.includes('orange') ? 'text-orange-500 hover:text-orange-600' :
                          service.gradient.includes('purple') ? 'text-purple-500 hover:text-purple-600' :
                            'text-green-500 hover:text-green-600'
                      } transition`}
                  >
                    Detaylı Bilgi
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div
            className={`relative max-w-2xl w-full ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <X className="w-6 h-6" />
            </button>

            <div className={`mb-6 ${selectedService?.gradient.includes('yellow') ? 'text-yellow-500' : selectedService?.gradient.includes('blue') ? 'text-blue-500' : selectedService?.gradient.includes('orange') ? 'text-orange-500' : selectedService?.gradient.includes('purple') ? 'text-purple-500' : 'text-green-500'}`}>
              {selectedService?.icon}
            </div>

            <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedService?.title}
            </h3>

            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedService?.description}
            </p>

            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedService?.detailedInfo}
            </p>

            <div className="mb-6">
              <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Özellikler:</h4>
              <ul className="space-y-2">
                {selectedService?.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${selectedService?.gradient.includes('yellow') ? 'text-yellow-500' : selectedService?.gradient.includes('blue') ? 'text-blue-500' : selectedService?.gradient.includes('orange') ? 'text-orange-500' : selectedService?.gradient.includes('purple') ? 'text-purple-500' : 'text-green-500'}`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              onClick={() => setSelectedService(null)}
              className={`inline-block px-8 py-3 rounded-lg font-semibold transition ${isDark
                ? 'bg-linear-to-r from-yellow-500 to-yellow-600 text-gray-900'
                : 'bg-linear-to-r from-yellow-500 to-yellow-600 text-white'
                }`}
            >
              Teklif Al
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

