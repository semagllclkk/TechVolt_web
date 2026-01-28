'use client';

import { useState, useEffect } from 'react';
import { projectsApi } from '@/lib/api';

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imagePath: '',
    date: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const response = await projectsApi.getAll();
    setProjects(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectsApi.create(formData);
      alert('Proje eklendi!');
      setFormData({ title: '', description: '', imagePath: '', date: '' });
      loadProjects();
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      await projectsApi.delete(id);
      loadProjects();
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Proje Yönetimi</h1>
      
      {/* Add Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Yeni Proje Ekle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Proje Başlığı</label>
            <input
              id="title"
              type="text"
              placeholder="Proje Başlığı"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea
              id="description"
              placeholder="Açıklama"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              rows={3}
              required
            />
          </div>
          <div>
            <label htmlFor="imagePath" className="block text-sm font-medium mb-1">Görsel URL</label>
            <input
              id="imagePath"
              type="text"
              placeholder="Görsel URL"
              value={formData.imagePath}
              onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">Tarih</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Ekle
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Mevcut Projeler</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Başlık</th>
              <th className="text-left py-2">Tarih</th>
              <th className="text-left py-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id} className="border-b">
                <td className="py-2">{project.title}</td>
                <td className="py-2">{new Date(project.date).toLocaleDateString('tr-TR')}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}