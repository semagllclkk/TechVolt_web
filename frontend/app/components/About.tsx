import React from 'react';
import Image from 'next/image';
import { Wind, TrendingUp, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const cardBgClass = isDark ? 'bg-gray-800/30 backdrop-blur-sm border border-gray-700' : 'bg-white/50 backdrop-blur-sm border border-gray-200';

  return (
    <section id="about" className={`py-24 relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]/30' : 'bg-gray-50'}`}>
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
      <div className="absolute top-1/2 -left-96 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Hakkımızda</h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                TechVolt Solutions, yenilenebilir enerji ve elektrik sektöründe uzman kadrosuyla hizmet veren bir mühendislik şirketidir.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vision Card */}
            <ScrollReveal stagger={100} duration={700} direction="left">
              <div className={`p-8 rounded-2xl ${cardBgClass} shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 h-full`}>
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                  <Wind className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Vizyonumuz</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Sürdürülebilir enerji çözümleriyle Türkiye'nin enerji bağımsızlığına katkı sağlamak ve çevre dostu teknolojileri yaygınlaştırmak.
                </p>
                <div className="mt-6 flex items-center gap-2 text-blue-500">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold">Sürdürülebilir Gelecek</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal stagger={200} duration={700} direction="right">
              <div className={`p-8 rounded-2xl ${cardBgClass} shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 h-full`}>
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Misyonumuz</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Kaliteli, güvenilir ve verimli elektrik çözümleriyle müşteri memnuniyetini en üst düzeyde tutmak ve yenilikçi projeler geliştirmek.
                </p>
                <div className="mt-6 flex items-center gap-2 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">Sürekli Gelişim</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Values section */}
          <div className="mt-16 pt-16 border-t border-gray-200/30">
            <ScrollReveal>
              <h3 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Temel Değerlerimiz
              </h3>
            </ScrollReveal>
            {/* Our Values */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Kalite', description: 'En yüksek standartlarda hizmet sunma' },
                { title: 'Güvenilirlik', description: 'Müşteri odaklı güvenilir çözümler' },
                { title: 'İnovasyon', description: 'En güncel teknolojilerle çalışma' }
              ].map((value, idx) => (
                <ScrollReveal key={idx} stagger={idx * 100} duration={600}>
                  <div className={`p-6 rounded-xl text-center transform transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isDark
                    ? 'bg-gray-800/20 border border-gray-700/50 hover:bg-gray-800/30 hover:border-yellow-500/50'
                    : 'bg-white/30 border border-gray-300/50 hover:bg-white/50 hover:border-yellow-500/50'
                    }`}>
                    <h4 className={`font-bold text-xl mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {value.title}
                    </h4>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

