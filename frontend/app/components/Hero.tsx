import React from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  return (
    <section
      id="home"
      className={`relative pt-32 pb-20 overflow-hidden ${isDark ? 'bg-[#0a0a0a] bg-opacity-50' : 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50'}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/solar_hero_bg.png"
          alt="Solar Panels Background"
          fill
          className="object-cover opacity-20"
          priority
          quality={90}
        />
      </div>

      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-[#0a0a0a]/85 via-[#0a0a0a]/80 to-[#0a0a0a]/85' : 'bg-gradient-to-br from-yellow-50/80 via-white/70 to-yellow-50/80'}`}></div>


      {/* Enhanced animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob z-0"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 z-0"></div>

      {/* Spotlight effect - top right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-yellow-400/20 to-transparent rounded-full filter blur-3xl -mr-48 -mt-48 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content - Enhanced animations */}
          <div className="animate-fade-in-up space-y-6">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-linear-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-500/40 hover:border-yellow-500/70 transition-all duration-300 hover:scale-105">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-600 to-yellow-500 font-semibold text-sm flex items-center gap-2">
                ⚡ Yenilenebilir Enerji Çözümleri
              </span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight animate-pulse-slow ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Enerjide Geleceği
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-yellow-400 block"> Birlikte İnşa Ediyoruz</span>
            </h1>

            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Güncel teknolojiler ve yenilikçi çözümlerle sürdürülebilir enerji projeleri geliştiren dinamik ve uzman ekibimizle tanışın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className={`group inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 ${isDark
                  ? 'bg-linear-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-lg shadow-yellow-500/50'
                  : 'bg-linear-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30'
                  }`}
              >
                Teklif Alın
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="#projects"
                className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 transition transform hover:scale-105 ${isDark
                  ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900'
                  : 'border-gray-900 text-gray-900 hover:bg-[#0a0a0a] hover:text-white'
                  }`}
              >
                Projelerimiz
              </a>
            </div>
          </div>
          {/* Image Content */}
          <div className="hidden md:flex justify-center animate-slide-in-right">
            <div className="relative w-full max-w-md">
              {/* Glowing background circle */}
              <div className="absolute inset-0 bg-linear-to-r from-yellow-500 to-yellow-600 rounded-2xl blur-3xl opacity-30 animate-glow"></div>

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500/20">
                <Image
                  src={isDark ? '/images/techvolt_dark.jpeg' : '/images/techvolt_light.jpeg'}
                  alt="TechVolt Solutions"
                  width={400}
                  height={500}
                  priority
                  className="w-full h-auto object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/20 to-transparent"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-500 rounded-full opacity-20 blur-2xl animate-float"></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl animate-float float-delayed"></div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

