// Dummy data untuk destinasi wisata
export const destinations = [
  {
    id: 1,
    name: "Pantai Kuta",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 2845,
    category: "Pantai",
    price: "Rp 150.000",
    description: "Pantai terkenal dengan sunset indah dan ombak untuk surfing",
  },
  {
    id: 2,
    name: "Gunung Bromo",
    location: "Jawa Timur, Indonesia",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 3120,
    category: "Gunung",
    price: "Rp 300.000",
    description: "Gunung berapi aktif dengan pemandangan sunrise spektakuler",
  },
  {
    id: 3,
    name: "Danau Toba",
    location: "Sumatera Utara, Indonesia",
    image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 1987,
    category: "Danau",
    price: "Rp 200.000",
    description: "Danau vulkanik terbesar di Indonesia dengan pulau Samosir",
  },
  {
    id: 4,
    name: "Candi Borobudur",
    location: "Jawa Tengah, Indonesia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 4532,
    category: "Budaya",
    price: "Rp 50.000",
    description: "Candi Buddha terbesar di dunia, warisan UNESCO",
  },
  {
    id: 5,
    name: "Raja Ampat",
    location: "Papua Barat, Indonesia",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 1256,
    category: "Diving",
    price: "Rp 500.000",
    description: "Surga bawah laut dengan biodiversitas tertinggi di dunia",
  },
  {
    id: 6,
    name: "Kawah Ijen",
    location: "Jawa Timur, Indonesia",
    image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 2103,
    category: "Gunung",
    price: "Rp 250.000",
    description: "Kawah dengan fenomena blue fire yang menakjubkan",
  },
];

// Dummy data untuk kategori
export const categories = [
  { id: 1, name: "Pantai", icon: "🏖️", count: 45 },
  { id: 2, name: "Gunung", icon: "⛰️", count: 32 },
  { id: 3, name: "Budaya", icon: "🏛️", count: 28 },
  { id: 4, name: "Danau", icon: "🏞️", count: 18 },
  { id: 5, name: "Diving", icon: "🤿", count: 15 },
  { id: 6, name: "Kuliner", icon: "🍜", count: 56 },
];

// Dummy data untuk statistik
export const stats = [
  { label: "Destinasi", value: "500+", icon: "map" },
  { label: "Wisatawan", value: "1M+", icon: "users" },
  { label: "Rating", value: "4.9", icon: "star" },
  { label: "Mitra", value: "200+", icon: "handshake" },
];
