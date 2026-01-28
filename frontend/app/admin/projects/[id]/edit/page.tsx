'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, X, Loader } from 'lucide-react';
import Link from 'next/link';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { projectsApi } from '@/lib/api';
import type { UpdateProjectInput } from '@/types/api';

export default function EditProjectPage() {
    useAdminAuth();
    const router = useRouter();
    const params = useParams();
    const projectId = parseInt(params?.id as string);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<UpdateProjectInput>({
        title: '',
        description: '',
        imagePath: '',
        date: '',
        capacity: '',
        location: '',
        category: 'Çatı Tipi',
        startDate: '',
        endDate: '',
        panelCount: 0,
        status: 'Tamamlandı',
        benefits: [''],
        isActive: true,
    });

    useEffect(() => {
        const loadProject = async () => {
            try {
                const project = await projectsApi.getOne(projectId);
                setFormData({
                    title: project.title,
                    description: project.description,
                    imagePath: project.imagePath,
                    date: project.date.split('T')[0], // Format date for input
                    capacity: project.capacity,
                    location: project.location,
                    category: project.category,
                    startDate: project.startDate,
                    endDate: project.endDate,
                    panelCount: project.panelCount,
                    status: project.status,
                    benefits: project.benefits.length > 0 ? project.benefits : [''],
                    isActive: project.isActive,
                });
            } catch (err) {
                console.error('Proje yükleme hatası:', err);
                setError('Proje yüklenemedi');
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            loadProject();
        }
    }, [projectId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value,
        }));
    };

    const handleBenefitChange = (index: number, value: string) => {
        const newBenefits = [...(formData.benefits || [])];
        newBenefits[index] = value;
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    const addBenefit = () => {
        setFormData(prev => ({ ...prev, benefits: [...(prev.benefits || []), ''] }));
    };

    const removeBenefit = (index: number) => {
        setFormData(prev => ({
            ...prev,
            benefits: (prev.benefits || []).filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Filter empty benefits
            const cleanData = {
                ...formData,
                benefits: (formData.benefits || []).filter(b => b.trim() !== ''),
            };

            await projectsApi.update(projectId, cleanData);
            router.push('/admin');
        } catch (err: any) {
            console.error('Proje güncelleme hatası:', err);
            setError(err.response?.data?.message || 'Proje güncellenirken hata oluştu');
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Proje yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 pb-12">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Projeyi Düzenle</h1>
                            <p className="text-sm text-gray-400 mt-1">Proje bilgilerini güncelleyin</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-lg p-8 space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
                            Proje Başlığı *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Örn: Çatı Tipi GES Projesi"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                            Açıklama *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Projenin detaylı açıklaması..."
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                            required
                        />
                    </div>

                    {/* Category & Capacity */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-300 mb-2">
                                Kategori *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            >
                                <option value="Çatı Tipi">Çatı Tipi</option>
                                <option value="Arazi Tipi">Arazi Tipi</option>
                                <option value="Hibrit">Hibrit</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="capacity" className="block text-sm font-semibold text-gray-300 mb-2">
                                Kapasite *
                            </label>
                            <input
                                type="text"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                placeholder="Örn: 11.780 kWp"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Location & Panel Count */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-300 mb-2">
                                Lokasyon *
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Örn: Burdur"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="panelCount" className="block text-sm font-semibold text-gray-300 mb-2">
                                Panel Sayısı *
                            </label>
                            <input
                                type="number"
                                id="panelCount"
                                name="panelCount"
                                value={formData.panelCount}
                                onChange={handleInputChange}
                                placeholder="Örn: 19"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Start Date & End Date */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-300 mb-2">
                                Başlangıç Tarihi *
                            </label>
                            <input
                                type="text"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                placeholder="Örn: 05.11.2025"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-300 mb-2">
                                Bitiş Tarihi *
                            </label>
                            <input
                                type="text"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                placeholder="Örn: 07.11.2025"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Project Date & Status */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-semibold text-gray-300 mb-2">
                                Proje Tarihi *
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-semibold text-gray-300 mb-2">
                                Durum *
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            >
                                <option value="Tamamlandı">Tamamlandı</option>
                                <option value="Devam Ediyor">Devam Ediyor</option>
                                <option value="Planlanıyor">Planlanıyor</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Path */}
                    <div>
                        <label htmlFor="imagePath" className="block text-sm font-semibold text-gray-300 mb-2">
                            Görsel Yolu *
                        </label>
                        <input
                            type="text"
                            id="imagePath"
                            name="imagePath"
                            value={formData.imagePath}
                            onChange={handleInputChange}
                            placeholder="/images/proje-adi.jpeg"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Görseli <code>/public/images/</code> klasörüne yükleyin, ardından yolunu girin (örn: /images/proje.jpeg)
                        </p>
                    </div>

                    {/* Benefits */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Faydalar
                        </label>
                        <div className="space-y-3">
                            {(formData.benefits || []).map((benefit, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                                        placeholder="Fayda açıklaması"
                                        className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    {(formData.benefits || []).length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeBenefit(index)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addBenefit}
                                className="flex items-center gap-2 px-4 py-2 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition"
                            >
                                <Plus className="w-4 h-4" />
                                Fayda Ekle
                            </button>
                        </div>
                    </div>

                    {/* IsActive */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            className="w-5 h-5 bg-gray-900 border-gray-700 rounded text-yellow-500 focus:ring-2 focus:ring-yellow-500"
                        />
                        <label htmlFor="isActive" className="text-sm font-semibold text-gray-300">
                            Aktif (Web sitesinde gösterilsin)
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <Link
                            href="/admin"
                            className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition text-center"
                        >
                            İptal
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
