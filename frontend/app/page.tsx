'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function TechVoltFrontend() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { contactApi } = await import('@/lib/api');
      await contactApi.send(formData);
      setToast({ message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', type: 'success' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      setToast({ message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', type: 'error' });
    }
  };

  const bgClass = isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const textClass = isDark ? 'text-white' : 'text-gray-900';



  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass} ${textClass}`}>
      <Navbar isDark={isDark} isMenuOpen={isMenuOpen} toggleTheme={toggleTheme} toggleMenu={toggleMenu} />
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Services isDark={isDark} />
      <Projects isDark={isDark} />
      <Contact isDark={isDark} formData={formData} onFormChange={handleFormChange} onSubmit={handleSubmit} />
      <Footer isDark={isDark} />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
