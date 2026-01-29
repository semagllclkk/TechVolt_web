# TechVolt Solutions - Kurumsal Yenilenebilir Enerji Platformu

TechVolt Solutions için geliştirilmiş, modern web teknolojilerini barındıran, yönetim paneli destekli, SEO uyumlu ve yüksek performanslı kurumsal web platformu.

🔗 **Canlı Proje:** [www.techvoltsolutions.com.tr](https://www.techvoltsolutions.com.tr)

## 🚀 Proje Hakkında

Bu proje, yenilenebilir enerji sektöründe faaliyet gösteren TechVolt Solutions'ın kurumsal kimliğini yansıtmak, projelerini sergilemek ve müşteri taleplerini yönetmek amacıyla geliştirilmiştir.

Hem **B2B** hem de **B2C** odaklı tasarlanan platform, müşterilerin hizmetleri inceleyebileceği interaktif bir ön yüz (Frontend) ve içeriklerin dinamik olarak yönetilebildiği güvenli bir yönetim paneli (Backend/Admin) içerir.

### 🌟 Temel Özellikler

*   **⚡ Next.js 16 & React 19:** En güncel React ekosistemi ile maksimum performans ve Server Side Rendering (SSR) avantajı.
*   **🎨 Tailwind CSS v4:** Modern, responsive ve özelleştirilebilir tasarım sistemi.
*   **🛠️ Dinamik İçerik Yönetimi (CMS):** Kod bilgisi gerektirmeden proje ekleme, düzenleme ve silme işlemleri.
*   **📊 Admin Paneli:** Güvenli admin girişi, gelen mesaj takibi ve proje portföy yönetimi.
*   **🌍 SEO Optimizasyonu:** Dinamik meta etiketleri, Open Graph desteği ve semantik HTML yapısı.
*   **📱 Tam Responsive:** Mobil, tablet ve masaüstü cihazlarda kusursuz görünüm.
*   **🗺️ İnteraktif Haritalar:** OpenLayers entegrasyonu ile proje konumlarının harita üzerinde gösterimi.
*   **Security:** NestJS tabanlı güvenli backend mimarisi ve veri doğrulama.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

### Frontend (İstemci Tarafı)
*   **Framework:** Next.js 16.1 (App Router)
*   **Library:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4, CSS Modules
*   **Icons:** Lucide React
*   **Maps:** OpenLayers (ol)
*   **HTTP Client:** Axios
*   **State Management:** React Hooks

### Backend (Sunucu Tarafı)
*   **Framework:** NestJS 11 (Node.js)
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **API:** RESTful API
*   **Validation:** Class Validator & Transformer

---

## 📂 Proje Yapısı

Proje, Frontend ve Backend olmak üzere iki ana modülden oluşan bir **Monorepo** yapısına sahiptir.

```
TechVolt/
├── frontend/          # Next.js 16 Web Uygulaması
│   ├── app/           # App Router sayfaları ve layout
│   ├── components/    # Yeniden kullanılabilir UI bileşenleri
│   ├── lib/           # Yardımcı fonksiyonlar ve API yapılandırmaları
│   └── public/        # Statik dosyalar (Görseller bu klasöre yüklenir)
│
├── backend/           # NestJS API Sunucusu
│   ├── src/           # Controller, Service ve Modüller
│   └── prisma/        # Veritabanı şeması ve migrasyonlar
```

---

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda (Localhost) çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Gereksinimler
*   Node.js (v18 veya üzeri)
*   PostgreSQL Veritabanı

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/semagllclkk/TechVolt.git
cd TechVolt
```

### 2. Backend Kurulumu
Backend servisini ayağa kaldırmak için:

```bash
cd backend
npm install

# .env dosyasını oluşturun (Örnek)
# DATABASE_URL="postgresql://user:password@localhost:5432/techvoltdb"
# JWT_SECRET="gizli_anahtariniz"

# Veritabanı tablolarını oluşturun
npx prisma migrate dev

# Sunucuyu başlatın
npm run start:dev
```
*Backend `http://localhost:4000` adresinde çalışacaktır.*

### 3. Frontend Kurulumu
Arayüzü başlatmak için yeni bir terminal açın:

```bash
cd frontend
npm install

# .env.local dosyasını oluşturun (Opsiyonel)
# NEXT_PUBLIC_API_URL=http://localhost:4000

# Uygulamayı başlatın
npm run dev
```
*Frontend `http://localhost:3000` adresinde çalışacaktır.*

---

## 🔐 Admin Paneli Kullanımı

Platform, içerik yönetimi için `/admin` uzantısında bir yönetim paneline sahiptir.
*   **Proje Yönetimi:** Yeni referans projeler ekleyebilirsiniz.
    *   **Görsel Yönetimi:** Proje görsellerini manuel olarak projenin `frontend/public/images` klasörüne ekleyin.
    *   Admin panelinde "Görsel Yolu" alanına `/images/dosya-adi.jpg` formatında yolu girin.
*   **İletişim Talepleri:** "Bize Ulaşın" formundan gelen mesajları görüntüleyebilir ve durumlarını (Okundu/Okunmadı) güncelleyebilirsiniz.

---

## 📞 İletişim

Geliştirici veya Proje Sahibi ile iletişime geçmek için:
*   **Web:** [www.techvoltsolutions.com.tr](https://www.techvoltsolutions.com.tr)
*   **Email:** info@techvoltsolutions.com.tr

---
&copy; 2026 TechVolt Solutions. Tüm hakları saklıdır.
