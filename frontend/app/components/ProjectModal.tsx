import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MapPin, Zap, Calendar, ArrowUpRight } from 'lucide-react';

export interface ProjectDetail {
  id: number;
  title: string;
  image: string;
  capacity: string;
  location: string;
  category: string;
  description: string;
  details: {
    startDate: string;
    endDate: string;
    panelCount: number;
    status: string;
  };
  benefits: string[];
  images: string[];
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  isDark: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, isDark, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-auto m-4">
        <div className={`rounded-2xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition z-20`}
            aria-label="Kapat"
          >
            <X className={isDark ? 'text-white' : 'text-gray-900'} />
          </button>

          {/* Hero Image */}
          <div className="relative h-64 md:h-96 rounded-t-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 rounded-full bg-yellow-500 text-gray-900 text-sm font-semibold">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Quick Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className={`flex items-center gap-3 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Zap className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Kurulu Güç</p>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.capacity}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <MapPin className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Lokasyon</p>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Proje Hakkında
              </h3>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {project.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Proje Detayları
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Başlama Tarihi
                    </p>
                  </div>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.details.startDate}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Tamamlanma Tarihi
                    </p>
                  </div>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.details.endDate}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Panel Sayısı
                    </p>
                  </div>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.details?.panelCount?.toLocaleString('tr-TR') || 'Belirtilmemiş'}
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            {project.benefits && project.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Sağlanan Faydalar
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Proje Görselleri
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.images.map((img, idx) => (
                    <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} - Görsel ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
