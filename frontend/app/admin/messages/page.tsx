'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Trash2, CheckCircle, Eye, LogOut } from 'lucide-react';
import { useAdminAuth, logout } from '@/hooks/useAdminAuth';
import { contactApi } from '@/lib/api';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function AdminMessagesPage() {
    useAdminAuth();

    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            setIsLoading(true);
            const data = await contactApi.getAll();
            // Ensure data is an array
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Mesajlar yüklenirken hata:', error);
            setMessages([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsRead = async (id: number) => {
        try {
            await contactApi.markAsRead(id);
            setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
        } catch (error) {
            console.error('İşaretleme hatası:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;

        try {
            await contactApi.delete(id);
            setMessages(messages.filter(m => m.id !== id));
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error('Silme hatası:', error);
            alert('Mesaj silin irken hata oluştu');
        }
    };

    const unreadCount = messages.filter(m => !m.isRead).length;

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                TechVolt <span className="text-yellow-500">Admin Panel</span>
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">İletişim Mesajları</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                target="_blank"
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition"
                            >
                                <Eye className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                <LogOut className="w-4 h-4" />
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="container mx-auto px-4">
                    <nav className="flex gap-8">
                        <Link
                            href="/admin"
                            className="px-4 py-4 text-gray-400 hover:text-white transition"
                        >
                            Projeler
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="px-4 py-4 text-yellow-500 border-b-2 border-yellow-500 font-medium"
                        >
                            İletişim Mesajları
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <Mail className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Toplam Mesaj</p>
                                <p className="text-2xl font-bold text-white">{messages.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-lg">
                                <Mail className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Okunmamış</p>
                                <p className="text-2xl font-bold text-white">{unreadCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Okundu</p>
                                <p className="text-2xl font-bold text-white">{messages.length - unreadCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                        <p className="text-gray-400 mt-4">Mesajlar yükleniyor...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                        <Mail className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Henüz mesaj yok</p>
                    </div>
                ) : (
                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-800 border-b border-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Gönderen
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            İletişim
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Mesaj
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Tarih
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Durum
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            İşlemler
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {messages.map((message) => (
                                        <tr key={message.id} className={`hover:bg-gray-900/50 transition ${!message.isRead ? 'bg-yellow-500/5' : ''}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white">{message.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-400">{message.email}</div>
                                                <div className="text-xs text-gray-500">{message.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-300 max-w-md truncate">
                                                    {message.message}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(message.createdAt).toLocaleDateString('tr-TR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {message.isRead ? (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500/10 text-green-500">
                                                        Okundu
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500/10 text-yellow-500">
                                                        Yeni
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    {!message.isRead && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(message.id)}
                                                            className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition"
                                                            title="Okundu olarak işaretle"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(message.id)}
                                                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                                                        title="Sil"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
