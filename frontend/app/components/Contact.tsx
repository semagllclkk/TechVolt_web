import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactProps {
  isDark: boolean;
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  onFormChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Contact({ isDark, formData, onFormChange, onSubmit }: ContactProps) {
  const cardBgClass = isDark ? 'bg-gray-800/30 backdrop-blur-sm border border-gray-700' : 'bg-white/50 backdrop-blur-sm border border-gray-200';
  const inputBgClass = isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/50 border-gray-300 text-gray-900';



  return (
    <section id="contact" className={`py-24 relative overflow-hidden ${isDark ? 'bg-[#0a0a0a]/50' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Background decoration */}
      <div className="absolute top-1/2 -right-96 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>İletişim</h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Sorularınız mı var? Bize ulaşın, size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-left">
            {/* Address Card with Embedded Map */}
            <div
              className={`flex flex-col p-6 rounded-2xl ${isDark ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-100'} transition`}
            >
              <div className="flex items-start mb-4">
                <div className={`text-red-500 mr-4 mt-1 p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Adres
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Pazar Mh. Belediye Sk. No:2, MERKEZ / BURDUR
                  </p>
                </div>
              </div>

              {/* Embedded Google Maps */}
              <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-yellow-500 transition-all duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d30.288299!3d37.720599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQzJzE0LjIiTiAzMMKwMTcnMTcuOSJF!5e0!3m2!1sen!2str!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TechVolt Solutions Konum"
                ></iframe>
              </div>
            </div>

            {/* Email Card */}
            <div
              className={`flex items-start p-6 rounded-2xl ${isDark ? 'bg-gray-800/30 border border-gray-700' : 'bg-gray-100'} transition transform hover:scale-105 animate-fade-in-up`}
            >
              <div className={`text-green-500 mr-4 mt-1 p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  E-posta
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  info@techvoltsolutions.com
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'}`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>Çalışma Saatleri</h4>
              <p className={isDark ? 'text-yellow-300' : 'text-yellow-600'}>Pazartesi - Cuma: 09:00 - 18:00</p>
              <p className={isDark ? 'text-yellow-300' : 'text-yellow-600'}>Cumartesi: 10:00 - 16:00</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl ${cardBgClass} shadow-xl animate-slide-in-right`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Bize Ulaşın
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  value={formData.name}
                  onChange={(e) => onFormChange('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${inputBgClass} border focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition`}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => onFormChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${inputBgClass} border focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    placeholder="+90 XXX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => onFormChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${inputBgClass} border focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mesajınız
                </label>
                <textarea
                  placeholder="Mesajınızı yazınız..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => onFormChange('message', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${inputBgClass} border focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition resize-none`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-lg font-bold hover:shadow-lg shadow-yellow-500/50 transition transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition" />
                Gönder
              </button>

              <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                24 saat içinde sizinle iletişime geçeceğiz.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
