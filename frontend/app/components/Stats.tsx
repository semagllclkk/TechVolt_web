import React from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

interface StatsProps {
  isDark: boolean;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

const STATS: Stat[] = [
  { value: "A+", label: "Kalite Standartı", icon: "🏆" },
  { value: "ISO", label: "Sertifikalı", icon: "✓" },
  { value: "%100", label: "Müşteri Memnuniyeti", icon: "😊" },
  { value: "7/24", label: "Teknik Destek", icon: "⚡" }
];

export default function Stats({ isDark }: StatsProps) {
  return (
    <section className={`py-20 relative overflow-hidden ${isDark ? 'bg-gray-800/50' : 'bg-linear-to-r from-yellow-50 to-white'}`}>
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

      {/* Background blur effect */}
      <div className="absolute inset-0 backdrop-blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <ScrollReveal key={idx} stagger={idx * 100} duration={700}>
              <div className="text-center group cursor-pointer">
                <div className="text-5xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition duration-300">
                  {stat.icon}
                </div>
                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent group-hover:from-yellow-600 group-hover:to-yellow-700 transition`}>
                  {stat.value}
                </div>
                <div className={`text-sm md:text-base font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>

                {/* Hover effect line */}
                <div className="h-1 rounded-full bg-linear-to-r from-yellow-500 to-yellow-600 mt-4 scale-x-0 group-hover:scale-x-100 transition origin-center duration-300"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
