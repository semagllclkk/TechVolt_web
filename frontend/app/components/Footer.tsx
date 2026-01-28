import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Instagram, MapPin, ChevronRight } from 'lucide-react';

interface FooterProps {
  isDark?: boolean;
}

export default function Footer({ isDark = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Linkedin, href: 'https://www.linkedin.com/company/techvolt-solutions-danışmanlık-mühendislik-ltd-ştiı̇/', label: 'LinkedIn' },
    { Icon: Instagram, href: 'https://www.instagram.com/tech.voltsolutions?igsh=eWFxNnVrc3JrYWt6', label: 'Instagram' },
    { Icon: Mail, href: 'mailto:info@techvoltsolutions.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Hizmetler', href: '#services' },
    { name: 'Projeler', href: '#projects' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-[#0a0a0a] bg-opacity-50 border-t border-gray-800' : 'bg-gray-100 border-t border-gray-300'}`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src={isDark ? "/images/techvolt_dark.jpeg" : "/images/techvolt_light.jpeg"}
                  alt="TechVolt Solutions Logo"
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  TechVolt <span className="text-yellow-500">Solutions</span>
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  Yenilenebilir Enerji
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sürdürülebilir enerji çözümleriyle Türkiye'nin enerji bağımsızlığına katkı sağlıyoruz.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <MapPin className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <span>Burdur, Türkiye</span>
              </div>
              <div className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Mail className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                <a href="mailto:info@techvoltsolutions.com" className="hover:text-yellow-500 transition">
                  info@techvoltsolutions.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Hızlı Linkler
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 text-sm hover:gap-3 transition-all group ${isDark ? 'text-gray-400 hover:text-yellow-500' : 'text-gray-600 hover:text-yellow-600'
                      }`}
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h4 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Bizi Takip Edin
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg transition-all duration-300 backdrop-blur-sm ${isDark
                    ? 'bg-gray-800/20 hover:bg-yellow-500 text-gray-400 hover:text-gray-900 border border-gray-700/50 hover:border-yellow-500'
                    : 'bg-white hover:bg-yellow-500 text-gray-600 hover:text-white border border-gray-300'
                    } hover:scale-110`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
          <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            © {currentYear} TechVolt Solutions. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
