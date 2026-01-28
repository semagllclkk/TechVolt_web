'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import Link from 'next/link';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { projectsApi } from '@/lib/api';
import type { CreateProjectInput } from '@/types/api';

export default function NewProjectPage() {
    useAdminAuth();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<CreateProjectInput>({
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value,
        }));
    };

    const handleBenefitChange = (index: number, value: string) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = value;
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    const addBenefit = () => {
        setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
    };

    const removeBenefit = (index: number) => {
        setFormData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index),
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
                benefits: formData.benefits.filter(b => b.trim() !== ''),
            };

            await projectsApi.create(cleanData);
            router.push('/admin');
        } catch (err: any) {
            console.error('Proje ekleme hatası:', err);
            setError(err.response?.data?.message || 'Proje eklenirken hata oluştu');
            setIsSubmitting(false);
        }
    };

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
                            <h1 className="text-2xl font-bold text-white">Yeni Proje Ekle</h1>
                            <p className="text-sm text-gray-400 mt-1">Tüm alanları doldurarak yeni proje oluşturun</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Basic Information */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Temel Bilgiler</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                    Proje Başlığı *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                    Açıklama *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
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
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                                        Lokasyon *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Örn: Burdur, Türkiye"
                                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Teknik Detaylar</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">
                                    Kapasite *
                                </label>
                                <input
                                    type="text"
                                    id="capacity"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                    placeholder="Örn: 11.780 kWp / 10 kWe"
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="panelCount" className="block text-sm font-medium text-gray-300 mb-2">
                                    {/* Panel Sayısı */}
                                </label>
                                <input
                                    type="number"
                                    id="panelCount"
                                    name="panelCount"
                                    value={formData.panelCount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                    min="1"
                                />
                            </div>

                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-2">
                                    Başlama Tarihi *
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
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-2">
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

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
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
                                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                                    Durum
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="Tamamlandı">Tamamlandı</option>
                                    <option value="Devam Ediyor">Devam Ediyor</option>
                                    <option value="Planlama Aşamasında">Planlama Aşamasında</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Görsel</h2>

                        <div>
                            <label htmlFor="imagePath" className="block text-sm font-medium text-gray-300 mb-2">
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
                    </div>

                    {/* Benefits */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">Sağlanan Faydalar</h2>
                            <button
                                type="button"
                                onClick={addBenefit}
                                className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Fayda Ekle
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                                        placeholder="Örn: Yıllık 15.000 kWh enerji üretimi"
                                        className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    {formData.benefits.length > 1 && (
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
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Ayarlar</h2>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-yellow-500 bg-gray-900 border-gray-700 rounded focus:ring-yellow-500"
                            />
                            <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
                                Projeyi aktif olarak yayınla
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/admin"
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                        >
                            İptal
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
                        </button>
                    </div>
                </form>
            </main>
        </div >
    );
}
