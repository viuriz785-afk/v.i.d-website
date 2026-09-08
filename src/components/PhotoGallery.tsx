import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Upload, Image as ImageIcon, Trash2, Maximize2, ChevronLeft, ChevronRight, Download, Link2, Check } from 'lucide-react';
import { PhotoItem } from '../types';
import { PHOTO_CATEGORIES, INITIAL_PHOTOS } from '../data';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_portfolio_photos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load user_portfolio_photos', e);
    }
    return INITIAL_PHOTOS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Form states for adding new photo
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('hairstyle');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAspectRatio, setNewAspectRatio] = useState<'tall' | 'wide' | 'square'>('tall');
  const [dragActive, setDragActive] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('user_portfolio_photos', JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save user_portfolio_photos', e);
    }
  }, [photos]);

  // Filter photos
  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Handle local file upload via FileReader
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WEBP, GIF).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setNewImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      alert('Silakan pilih foto atau masukkan URL gambar.');
      return;
    }

    const newPhotoItem: PhotoItem = {
      id: `custom_photo_${Date.now()}`,
      title: newTitle.trim() || 'Foto Portofolio',
      category: newCategory,
      imageUrl: newImageUrl.trim(),
      description: newDescription.trim() || undefined,
      aspectRatio: newAspectRatio,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    setPhotos((prev) => [newPhotoItem, ...prev]);

    // Reset Form
    setNewTitle('');
    setNewCategory('hairstyle');
    setNewImageUrl('');
    setNewDescription('');
    setNewAspectRatio('tall');
    setIsAddModalOpen(false);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini dari galeri?')) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      if (selectedPhotoIndex !== null) {
        setSelectedPhotoIndex(null);
      }
    }
  };

  const handleResetDefaultPhotos = () => {
    if (window.confirm('Reset galeri ke foto-foto bawaan awal?')) {
      setPhotos(INITIAL_PHOTOS);
      localStorage.removeItem('user_portfolio_photos');
    }
  };

  // Lightbox handlers
  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
  };

  const copyImageLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div id="photo-gallery-section" className="space-y-10 pt-12 border-t border-neutral-200/80 dark:border-neutral-800/80">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[9px] bg-red-600/10 text-red-600 dark:text-red-400 font-bold uppercase tracking-widest rounded-sm">
              📸 Galeri Foto & Visual Showcase
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">
            Galeri <span className="text-red-600">Fotografi</span> & Hasil Cukur
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-1">
            Kumpulan dokumentasi foto resolusi tinggi.
          </p>
        </div>
      </div>

      {/* Filter Tabs (Inspired directly by user reference UI) */}
      <div className="flex items-center justify-center border-b border-neutral-200 dark:border-neutral-800 pb-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 sm:gap-10 min-w-max px-4">
          {Object.entries(PHOTO_CATEGORIES).map(([catKey, label]) => {
            const isActive = activeCategory === catKey;
            return (
              <button
                id={`photo-cat-${catKey}`}
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`relative py-2 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] transition-all cursor-pointer uppercase ${
                  isActive
                    ? 'text-neutral-950 dark:text-white font-extrabold'
                    : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBorder"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry / Asymmetric Photo Grid (Matching User Reference Layout) */}
      {filteredPhotos.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-sm space-y-3">
          <ImageIcon className="mx-auto text-neutral-400 dark:text-neutral-600" size={32} />
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
            Belum ada foto di kategori <span className="font-bold uppercase">{activeCategory}</span>.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-xs text-red-600 dark:text-red-400 font-bold underline"
          >
            + Tambahkan Foto Pertama Di Sini
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[260px]">
          {filteredPhotos.map((photo, index) => {
            // Determine grid span based on aspectRatio or index pattern to mimic reference
            let spanClass = '';
            if (photo.aspectRatio === 'tall') {
              spanClass = 'row-span-2 sm:row-span-2';
            } else if (photo.aspectRatio === 'wide') {
              spanClass = 'col-span-1 sm:col-span-2 row-span-1';
            } else {
              spanClass = 'col-span-1 row-span-1';
            }

            return (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative overflow-hidden rounded-md bg-neutral-900 border border-neutral-800/80 shadow-md cursor-pointer ${spanClass}`}
              >
                {/* Photo Image */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest bg-black/60 text-white/90 backdrop-blur-md rounded-sm border border-white/10">
                    {photo.category}
                  </span>

                  {/* Delete button if photo is user added */}
                  {photo.isCustom && (
                    <button
                      onClick={(e) => handleDeletePhoto(photo.id, e)}
                      className="p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Hapus foto"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>

                {/* Bottom Title & Zoom Hover */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-display text-sm md:text-base font-bold text-white line-clamp-1 drop-shadow-sm">
                    {photo.title}
                  </h4>
                  {photo.description && (
                    <p className="text-[11px] text-neutral-300 font-light line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-red-400 font-mono text-[10px] uppercase font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={12} />
                    <span>Perbesar Foto</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal: Add New Photo */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Tambah Foto Baru Ke Galeri
                  </h3>
                  <p className="text-xs text-neutral-400 font-light">
                    Upload file foto dari perangkat Anda atau tempel link URL foto.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddPhotoSubmit} className="space-y-5">
                {/* File Upload / Image URL Input Area */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                    Foto Kategori Karya *
                  </label>

                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
                      dragActive
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/50'
                    }`}
                  >
                    {newImageUrl ? (
                      <div className="relative group max-h-48 overflow-hidden rounded-md border border-neutral-700">
                        <img
                          src={newImageUrl}
                          alt="Preview"
                          className="w-full h-44 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('')}
                          className="absolute top-2 right-2 bg-black/80 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="mx-auto text-neutral-400" size={28} />
                        <div>
                          <p className="text-xs font-semibold text-neutral-200">
                            Tarik & lepas file foto di sini
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            Atau klik tombol di bawah untuk memilih file foto
                          </p>
                        </div>
                        <label className="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white font-mono text-xs font-bold uppercase px-4 py-2 rounded-sm cursor-pointer transition-colors">
                          <Upload size={14} />
                          <span>Pilih File Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Or enter Image URL */}
                  <div className="pt-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">
                      Atau Tempel URL Gambar (Postimg / Imgur / Unsplash / Drive):
                    </span>
                    <input
                      type="url"
                      placeholder="https://i.postimg.cc/..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                    Judul Foto / Nama Karya
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Fade Haircut & Beard Grooming"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Category & Aspect Ratio */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                      Kategori
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors uppercase font-mono"
                    >
                      {Object.entries(PHOTO_CATEGORIES).map(([catKey, label]) => (
                        <option key={catKey} value={catKey}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                      Bentuk Tampilan
                    </label>
                    <select
                      value={newAspectRatio}
                      onChange={(e) => setNewAspectRatio(e.target.value as any)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
                    >
                      <option value="tall">Tinggi (Portrait / 3:4)</option>
                      <option value="wide">Lebar (Landscape / 16:9)</option>
                      <option value="square">Persegi (Square / 1:1)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                    Keterangan Singkat (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Deskripsikan teknik, alat, atau momen foto ini..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-sm border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-sm bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg transition-all"
                  >
                    Simpan Foto
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Photo Details */}
      <AnimatePresence>
        {currentPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Prev / Next Controls */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 text-white hover:bg-red-600 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 text-white hover:bg-red-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Main Photo View */}
              <div className="flex-1 bg-black flex items-center justify-center p-4 min-h-[300px] md:min-h-[500px]">
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-sm"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 bg-neutral-900 border-t md:border-t-0 md:border-l border-neutral-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-red-600/20 text-red-400 rounded-sm border border-red-500/30">
                      {currentPhoto.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {selectedPhotoIndex! + 1} / {filteredPhotos.length}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white">
                    {currentPhoto.title}
                  </h3>

                  {currentPhoto.description && (
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {currentPhoto.description}
                    </p>
                  )}
                </div>

                <div className="pt-6 space-y-3 border-t border-neutral-800 mt-6">
                  <button
                    onClick={() => copyImageLink(currentPhoto.imageUrl)}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold uppercase py-2.5 rounded-sm transition-colors"
                  >
                    {copiedLink ? <Check size={14} className="text-green-400" /> : <Link2 size={14} />}
                    <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link Foto'}</span>
                  </button>

                  <a
                    href={currentPhoto.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase py-2.5 rounded-sm transition-colors"
                  >
                    <Download size={14} />
                    <span>Buka Resolusi Penuh</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
