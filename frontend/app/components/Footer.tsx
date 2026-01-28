import React from 'react';
import Image from 'next/image';
import { Linkedin, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  isDark?: boolean;
}

export default function Footer({ isDark = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Linkedin, href: 'https://www.linkedin.com/company/techvolt-solutions-dan%C4%B1%C5%9Fmanl%C4%B1k-m%C3%BChendislik-ltd-%C5%9Fti%CC%87/', label: 'LinkedIn' },
    { Icon: Instagram, href: 'https://www.instagram.com/tech.voltsolutions?igsh=eWFxNnVrc3JrYWt6', label: 'Instagram' },
    { Icon: Mail, href: 'mailto:info@techvoltsolutions.com', label: 'Email' },
  ];

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-[#0a0a0a] border-t border-gray-800' : 'bg-gray-100 border-t border-gray-300'}`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Logo & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src={isDark ? "/images/techvolt_dark.jpeg" : "/images/techvolt_light.jpeg"}
                  alt="TechVolt Solutions Logo"
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  TechVolt <span className="text-yellow-500">Solutions</span>
                </h3>
              </div>
            </div>
            <p className={`text-sm max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Yenilenebilir enerji ve elektrik çözümleriyle geleceğe ışık tutuyoruz.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 ${isDark
                  ? 'bg-gray-800 hover:bg-yellow-500 text-gray-400 hover:text-gray-900'
                  : 'bg-white hover:bg-yellow-500 text-gray-600 hover:text-white'
                  } hover:scale-110 hover:shadow-lg`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className={`pt-8 border-t w-full ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              © {currentYear} TechVolt Solutions. Tüm hakları saklıdır.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
