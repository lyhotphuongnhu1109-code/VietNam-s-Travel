import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  Sparkles,
  MapPin,
  Utensils,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Search,
  Tv,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  VIETNAM_REGION_VIDEOS,
  VietnamShowcaseVideo,
  VideoCategory,
  VideoRegion,
} from '../data/videoData';
import { playVoiceGuide } from '../utils/speech';
import { Language } from '../types';

interface VietnamVideoShowcaseProps {
  currentLang: Language;
}

export const VietnamVideoShowcase: React.FC<VietnamVideoShowcaseProps> = ({ currentLang }) => {
  // Option 1: Show authentic video showcase
  // Option 2: Hide / collapse video showcase
  const [videoOption, setVideoOption] = useState<'option1' | 'option2'>(() => {
    const saved = localStorage.getItem('vietnam_travel_video_mode');
    return saved === 'option2' ? 'option2' : 'option1';
  });

  const handleSetVideoOption = (opt: 'option1' | 'option2') => {
    setVideoOption(opt);
    localStorage.setItem('vietnam_travel_video_mode', opt);
  };

  // Filters
  const [selectedRegion, setSelectedRegion] = useState<VideoRegion>('all');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active video
  const [activeVideo, setActiveVideo] = useState<VietnamShowcaseVideo>(VIETNAM_REGION_VIDEOS[0]);

  // Player mode: 'video' (direct HTML5 stream) | 'cinematic' (4K Photo Slideshow with voice) | 'youtube' (embedded YouTube)
  const [playerMode, setPlayerMode] = useState<'video' | 'cinematic' | 'youtube'>('video');

  // Video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [fullscreenModal, setFullscreenModal] = useState<boolean>(false);

  // Cinematic slideshow state
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);
  const [isAutoSlide, setIsAutoSlide] = useState<boolean>(true);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return VIETNAM_REGION_VIDEOS.filter((video) => {
      const matchRegion =
        selectedRegion === 'all' || video.region === selectedRegion || video.region === 'all';
      const matchCategory =
        selectedCategory === 'all' || video.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        video.titleVi.toLowerCase().includes(q) ||
        video.titleEn.toLowerCase().includes(q) ||
        video.descriptionVi.toLowerCase().includes(q) ||
        video.highlights.some((h) => h.toLowerCase().includes(q));

      return matchRegion && matchCategory && matchSearch;
    });
  }, [selectedRegion, selectedCategory, searchQuery]);

  // When activeVideo changes, reset player & slideshow state
  useEffect(() => {
    setActiveSceneIdx(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [activeVideo]);

  // Auto advance scenes in cinematic mode
  useEffect(() => {
    if (playerMode !== 'cinematic' || !isAutoSlide || !activeVideo.scenes || activeVideo.scenes.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setActiveSceneIdx((prev) => (prev + 1) % activeVideo.scenes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [playerMode, isAutoSlide, activeVideo.scenes]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleVoiceNarration = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    const textToRead = currentLang === 'vi' ? activeVideo.voiceGuideVi : activeVideo.voiceGuideEn;
    playVoiceGuide(textToRead, currentLang);
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 14000);
  };

  const handleVideoError = () => {
    // If browser cannot load or decode direct stream, smoothly fall back to cinematic presentation
    setPlayerMode('cinematic');
  };

  const activeScene = activeVideo.scenes?.[activeSceneIdx] || activeVideo.scenes?.[0];

  return (
    <div id="video-showcase" className="mt-8">
      {/* Option 2 Display: Collapsed banner */}
      {videoOption === 'option2' ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">
                {currentLang === 'vi'
                  ? 'Khu Vực Thước Phim Đã Được Thu Gọn (Phương Án 2)'
                  : 'Video Showcase Section is Hidden (Option 2)'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {currentLang === 'vi'
                  ? 'Bạn đã chọn Phương án 2 để ẩn phần video. Bấm nút bên phải nếu muốn bật lại thước phim về vẻ đẹp & ẩm thực 3 miền Bắc, Trung, Nam.'
                  : 'You selected Option 2. Click to restore videos of beauty and food across North, Central, and South Vietnam.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSetVideoOption('option1')}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>
              {currentLang === 'vi' ? 'Bật Thước Phim 3 Miền (Phương Án 1)' : 'Switch to Option 1'}
            </span>
          </button>
        </div>
      ) : (
        /* Option 1 Display: Complete 3-Region Beauty & Gastronomy Showcase */
        <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white shadow-xl relative overflow-hidden border border-sky-800/40">
          {/* Header Controls: Options toggle & Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>
                    {currentLang === 'vi'
                      ? 'Thước Phim Vẻ Đẹp & Ẩm Thực 3 Miền: Bắc - Trung - Nam'
                      : 'Beauty & Gastronomy Across North, Central & South Vietnam'}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-sky-500/30 text-sky-200 border border-sky-400/30 font-bold">
                    HD / 4K
                  </span>
                </h3>
                <p className="text-xs text-sky-200/70">
                  {currentLang === 'vi'
                    ? 'Trải nghiệm video độ nét cao, âm thanh thuyết minh sống động & hình ảnh thực tế danh thắng ẩm thực 3 miền'
                    : 'Experience high-definition video, voice narration and authentic scenic gastronomy across 3 regions'}
                </p>
              </div>
            </div>

            {/* Option 1 / 2 Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSetVideoOption('option1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  videoOption === 'option1'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentLang === 'vi' ? 'Phương Án 1: Xem Video' : 'Option 1: Watch'}</span>
              </button>

              <button
                onClick={() => handleSetVideoOption('option2')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800/80 hover:bg-rose-950 hover:text-rose-200 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                title={currentLang === 'vi' ? 'Bỏ phần này đi' : 'Hide this section'}
              >
                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                <span>{currentLang === 'vi' ? 'Phương Án 2: Bỏ Phần Này' : 'Option 2: Hide'}</span>
              </button>
            </div>
          </div>

          {/* Filtering Toolbar for 3 Regions & Topics */}
          <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-sky-900/50 mb-6 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* 3-Region Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-sky-300/80 mr-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {currentLang === 'vi' ? 'Vùng miền:' : 'Region:'}
                </span>

                {(
                  [
                    { id: 'all', labelVi: 'Toàn Quốc (3 Miền)', labelEn: 'All Regions' },
                    { id: 'North', labelVi: 'Miền Bắc (Bắc Bộ)', labelEn: 'North' },
                    { id: 'Central', labelVi: 'Miền Trung (Trung Bộ)', labelEn: 'Central' },
                    { id: 'South', labelVi: 'Miền Nam (Nam Bộ)', labelEn: 'South' },
                  ] as const
                ).map((reg) => {
                  const isSel = selectedRegion === reg.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => setSelectedRegion(reg.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSel
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {currentLang === 'vi' ? reg.labelVi : reg.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Category Filter Pills (Vẻ đẹp vs Ẩm thực) */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-amber-300/80 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {currentLang === 'vi' ? 'Chủ đề:' : 'Theme:'}
                </span>

                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {currentLang === 'vi' ? 'Tất Cả' : 'All'}
                </button>

                <button
                  onClick={() => setSelectedCategory('beauty')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedCategory === 'beauty'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Vẻ Đẹp Non Nước' : 'Scenic Beauty'}</span>
                </button>

                <button
                  onClick={() => setSelectedCategory('cuisine')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedCategory === 'cuisine'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Tinh Hoa Ẩm Thực' : 'Cuisine'}</span>
                </button>
              </div>
            </div>

            {/* Quick search inside videos */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  currentLang === 'vi'
                    ? 'Tìm thước phim theo tên danh thắng, món ăn (Ví dụ: Hạ Long, Phở, Bún bò Huế, Chợ nổi, Bánh xèo...)'
                    : 'Search video by scenic spot, dish (e.g. Ha Long, Pho, Bun Bo Hue, Floating market...)'
                }
                className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Main Video Arena: Player on Left / Playlist on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Player Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Player Mode Switcher Tabs */}
              <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPlayerMode('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      playerMode === 'video'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Video Trực Tiếp HD' : 'Direct HD Video'}</span>
                  </button>

                  <button
                    onClick={() => setPlayerMode('cinematic')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      playerMode === 'cinematic'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === 'vi' ? 'Trình Chiếu Điện Ảnh 4K' : '4K Cinematic Slides'}
                    </span>
                  </button>

                  <button
                    onClick={() => setPlayerMode('youtube')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      playerMode === 'youtube'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>YouTube 4K</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setFullscreenModal(true)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title={currentLang === 'vi' ? 'Toàn màn hình' : 'Fullscreen'}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Video Screen Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-sky-500/40 bg-black group">
                {/* 1. Direct Video Mode */}
                {playerMode === 'video' && (
                  <>
                    <video
                      ref={videoRef}
                      src={activeVideo.videoStreamUrl}
                      poster={activeVideo.thumbnail}
                      onTimeUpdate={handleTimeUpdate}
                      onError={handleVideoError}
                      onEnded={() => setIsPlaying(false)}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {/* Floating Controls Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300">
                      {/* Scrubber Bar */}
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                        />
                        <span className="text-[11px] font-mono text-slate-300 whitespace-nowrap">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      {/* Buttons Bar */}
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={togglePlay}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                            title={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 fill-current" />
                            )}
                          </button>

                          <button
                            onClick={toggleMute}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>

                          <span className="text-[11px] text-sky-200 font-medium truncate max-w-[200px] sm:max-w-xs">
                            {currentLang === 'vi' ? activeVideo.titleVi : activeVideo.titleEn}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setFullscreenModal(true)}
                            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                            title="Fullscreen"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 2. Cinematic Photo Slideshow Mode */}
                {playerMode === 'cinematic' && activeScene && (
                  <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={activeScene.image}
                      alt={activeScene.titleVi}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000"
                    />

                    {/* Gradient Overlay for Subtitles */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-black text-xs">
                          {currentLang === 'vi'
                            ? `Cảnh ${activeSceneIdx + 1} / ${activeVideo.scenes.length}`
                            : `Scene ${activeSceneIdx + 1} / ${activeVideo.scenes.length}`}
                        </span>
                        <div className="flex items-center gap-2 pointer-events-auto">
                          <button
                            onClick={() => setIsAutoSlide(!isAutoSlide)}
                            className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 cursor-pointer"
                          >
                            {isAutoSlide
                              ? currentLang === 'vi'
                                ? 'Tự Động Chiếu'
                                : 'Auto-Play'
                              : currentLang === 'vi'
                              ? 'Tạm Dừng'
                              : 'Paused'}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h5 className="text-base sm:text-lg font-black text-white drop-shadow-md">
                          {currentLang === 'vi' ? activeScene.titleVi : activeScene.titleEn}
                        </h5>
                        <p className="text-xs text-sky-200/90 max-w-xl leading-relaxed drop-shadow-sm">
                          {currentLang === 'vi' ? activeScene.descVi : activeScene.descEn}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() =>
                        setActiveSceneIdx((prev) =>
                          prev === 0 ? activeVideo.scenes.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveSceneIdx((prev) => (prev + 1) % activeVideo.scenes.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* 3. YouTube Embed Mode */}
                {playerMode === 'youtube' && (
                  <div className="w-full h-full bg-black flex flex-col justify-between">
                    <iframe
                      src={activeVideo.youtubeEmbedUrl}
                      title={activeVideo.titleVi}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                )}

                {/* Overlay Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 border border-white/10">
                    {activeVideo.category === 'beauty' ? (
                      <MapPin className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Utensils className="w-3 h-3 text-amber-400" />
                    )}
                    <span>
                      {activeVideo.category === 'beauty'
                        ? currentLang === 'vi'
                          ? 'Vẻ Đẹp Non Nước'
                          : 'Scenic Beauty'
                        : currentLang === 'vi'
                        ? 'Tinh Hoa Ẩm Thực'
                        : 'Gastronomy'}
                    </span>
                  </span>

                  <span className="px-2.5 py-1 rounded-md bg-sky-600/90 backdrop-blur-md text-white text-[11px] font-bold border border-sky-400/30">
                    {activeVideo.region === 'North'
                      ? currentLang === 'vi'
                        ? 'Miền Bắc'
                        : 'North'
                      : activeVideo.region === 'Central'
                      ? currentLang === 'vi'
                        ? 'Miền Trung'
                        : 'Central'
                      : activeVideo.region === 'South'
                      ? currentLang === 'vi'
                        ? 'Miền Nam'
                        : 'South'
                      : currentLang === 'vi'
                      ? 'Toàn Quốc'
                      : 'Vietnam All'}
                  </span>
                </div>
              </div>

              {/* Voice Narration & Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVoiceNarration}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-emerald-600 text-white animate-pulse shadow-md'
                        : 'bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white shadow-sm'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>
                      {isSpeaking
                        ? currentLang === 'vi'
                          ? 'Đang Thuyết Minh...'
                          : 'Speaking Audio...'
                        : currentLang === 'vi'
                        ? 'Nghe Thuyết Minh Giọng Đọc'
                        : 'Listen to Voice Guide'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeVideo.youtubeWatchUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{currentLang === 'vi' ? 'Xem Trên YouTube' : 'Open in YouTube'}</span>
                  </a>
                </div>
              </div>

              {/* Active Video Details & Highlights */}
              <div className="space-y-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                <h4 className="text-xl font-black text-white leading-tight">
                  {currentLang === 'vi' ? activeVideo.titleVi : activeVideo.titleEn}
                </h4>
                <p className="text-xs text-amber-300 font-medium">
                  {currentLang === 'vi' ? activeVideo.subtitleVi : activeVideo.subtitleEn}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLang === 'vi' ? activeVideo.descriptionVi : activeVideo.descriptionEn}
                </p>

                {/* Highlights tags */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mr-1">
                    {currentLang === 'vi' ? 'Địa danh & Món ăn tiêu biểu:' : 'Featured Highlights:'}
                  </span>
                  {activeVideo.highlights.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800 text-sky-200 text-[11px] font-medium border border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Playlist Column (Right) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  <span>
                    {currentLang === 'vi'
                      ? `Danh Sách Thước Phim (${filteredVideos.length}):`
                      : `Video Playlist (${filteredVideos.length}):`}
                  </span>
                </p>
                <span className="text-[11px] text-slate-400">
                  {currentLang === 'vi' ? 'Nhấn để chọn phát' : 'Click to play'}
                </span>
              </div>

              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                {filteredVideos.map((video) => {
                  const isCur = activeVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                        isCur
                          ? 'bg-sky-950/80 border-sky-400 shadow-md ring-1 ring-sky-400/50'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                      }`}
                    >
                      {/* Thumbnail with duration */}
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                        <img
                          src={video.thumbnail}
                          alt={video.titleVi}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          {isCur ? (
                            <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center">
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                          )}
                        </div>
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded-sm bg-black/80 text-[9px] font-mono text-white">
                          {video.duration}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`px-1.5 py-0.2 rounded-sm text-[10px] font-bold ${
                              video.region === 'North'
                                ? 'bg-sky-500/20 text-sky-300'
                                : video.region === 'Central'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : video.region === 'South'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}
                          >
                            {video.region === 'North'
                              ? currentLang === 'vi'
                                ? 'Miền Bắc'
                                : 'North'
                              : video.region === 'Central'
                              ? currentLang === 'vi'
                                ? 'Miền Trung'
                                : 'Central'
                              : video.region === 'South'
                              ? currentLang === 'vi'
                                ? 'Miền Nam'
                                : 'South'
                              : currentLang === 'vi'
                              ? 'Toàn Cảnh'
                              : 'All'}
                          </span>

                          <span className="text-[10px] text-slate-400">
                            {video.category === 'beauty'
                              ? currentLang === 'vi'
                                ? '• Danh thắng'
                                : '• Beauty'
                              : currentLang === 'vi'
                              ? '• Ẩm thực'
                              : '• Cuisine'}
                          </span>
                        </div>

                        <h5
                          className={`text-xs font-bold line-clamp-1 ${
                            isCur ? 'text-sky-300' : 'text-white'
                          }`}
                        >
                          {currentLang === 'vi' ? video.titleVi : video.titleEn}
                        </h5>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {currentLang === 'vi' ? video.subtitleVi : video.subtitleEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {fullscreenModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-white">
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                {currentLang === 'vi' ? activeVideo.titleVi : activeVideo.titleEn}
              </h4>
              <p className="text-xs text-sky-400">
                {currentLang === 'vi' ? activeVideo.subtitleVi : activeVideo.subtitleEn}
              </p>
            </div>
            <button
              onClick={() => setFullscreenModal(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800 relative">
              {playerMode === 'youtube' ? (
                <iframe
                  src={activeVideo.youtubeEmbedUrl}
                  title={activeVideo.titleVi}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : playerMode === 'cinematic' && activeScene ? (
                <div className="w-full h-full relative">
                  <img
                    src={activeScene.image}
                    alt={activeScene.titleVi}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-6 text-white">
                    <h5 className="text-xl font-bold">
                      {currentLang === 'vi' ? activeScene.titleVi : activeScene.titleEn}
                    </h5>
                    <p className="text-sm text-slate-300">
                      {currentLang === 'vi' ? activeScene.descVi : activeScene.descEn}
                    </p>
                  </div>
                </div>
              ) : (
                <video
                  src={activeVideo.videoStreamUrl}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
