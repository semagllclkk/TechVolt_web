import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  isDark: boolean;
  isMenuOpen: boolean;
  toggleTheme: () => void;
  toggleMenu: () => void;
}

export default function Navbar({ isDark, isMenuOpen, toggleTheme, toggleMenu }: NavbarProps) {
  const navLinks = [
    { href: '#home', label: 'Ana Sayfa' },
    { href: '#about', label: 'Hakkımızda' },
    { href: '#services', label: 'Hizmetler' },
    { href: '#projects', label: 'Projeler' },
    { href: '#contact', label: 'İletişim' }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isDark ? 'bg-[#0a0a0a]/95' : 'bg-white/95'} backdrop-blur-xl shadow-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition transform group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden shrink-0 bg-white/10 backdrop-blur-sm">
              <Image
                src={isDark ? '/images/techvolt_dark.jpeg' : '/images/techvolt_light.jpeg'}
                alt="TechVolt Solutions Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain rounded-lg p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-2xl font-bold transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                TechVolt{' '}
                <span className="text-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Yenilenebilir Enerji
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-semibold transition relative group ${isDark ? 'text-white hover:text-yellow-500' : 'text-gray-900 hover:text-yellow-600'
                  }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-lg transition transform hover:scale-110 ${isDark
                ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
                }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-3 rounded-lg transition ${isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 space-y-2 animate-fade-in-up ${isDark ? 'border-t border-gray-800 pt-4' : 'border-t border-gray-200 pt-4'}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => toggleMenu()}
                className={`block px-4 py-2 rounded-lg font-semibold transition ${isDark
                  ? 'text-white hover:bg-yellow-500/10 hover:text-yellow-500'
                  : 'text-gray-900 hover:bg-yellow-50 hover:text-yellow-600'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
