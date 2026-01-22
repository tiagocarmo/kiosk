import React, { useState, useEffect, useCallback, useRef } from 'react';
import Stage from './Stage';
import { SLIDE_COMPONENTS, SlideData } from '../slides/registry';
import { Maximize, Pause, Play, SkipBack, SkipForward } from 'lucide-react';

const Player: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const timerRef = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Playlist state (loaded at runtime so we can choose via ?playlist=...)
  const [playlistData, setPlaylistData] = useState<any | null>(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(true);
  const [playlistError, setPlaylistError] = useState<string | null>(null);

  const slides = (playlistData?.slides || []) as SlideData[];
  const defaultConfig = playlistData?.config || { defaultDuration: 10000 };

  // Load playlist file based on ?playlist=<id> query param at runtime.
  // Fetch from /playlists/*.json so files can be changed without rebuild.
  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('playlist');

    const fetchJson = async (path: string) => {
      const resp = await fetch(path, { cache: 'no-store' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.json();
    };

    (async () => {
      try {
        setLoadingPlaylist(true);

        const defaultPath = 'playlists/playlist.json';
        let data: any | null = null;

        if (id) {
          const requestedPath = `playlists/playlist-${id}.json`;
          try {
            data = await fetchJson(requestedPath);
          } catch (err) {
            console.warn(`Requested playlist ${requestedPath} not found, falling back to ${defaultPath}`);
          }
        }

        if (!data) {
          data = await fetchJson(defaultPath);
        }

        if (cancelled) return;

        if (!data || !Array.isArray(data.slides)) {
          throw new Error('Invalid playlist format (missing slides array)');
        }

        setPlaylistData(data);
        setPlaylistError(null);
        setCurrentIndex(0);
      } catch (err: any) {
        console.error('Error loading playlist', err);
        if (!cancelled) setPlaylistError(String(err?.message || err));
      } finally {
        if (!cancelled) setLoadingPlaylist(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen mode: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (!playlistData) return; // wait until playlist loaded
    if (slides.length === 0) return; // nothing to schedule

    if (isPlaying) {
      const currentSlide = slides[currentIndex];
      const duration = currentSlide?.duration || defaultConfig.defaultDuration;

      timerRef.current = window.setTimeout(() => {
        nextSlide();
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying, nextSlide, slides, defaultConfig.defaultDuration, playlistData]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Reveal controls on interaction
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), 3000);

      switch (e.key) {
        case 'ArrowRight':
          nextSlide();
          break;
        case 'ArrowLeft':
          prevSlide();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [nextSlide, prevSlide, togglePlay, toggleFullscreen]);

  // Mouse move to show controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Preload next image logic (simple version)
  useEffect(() => {
    if (slides.length === 0) return;
    const nextIdx = (currentIndex + 1) % slides.length;
    const nextSlideData = slides[nextIdx];
    if (nextSlideData?.props?.photoAsset) {
      const img = new Image();
      img.src = nextSlideData.props.photoAsset;
    }
  }, [currentIndex, slides]);

  if (loadingPlaylist) {
    return <div className="w-full h-full flex items-center justify-center text-white">Carregando playlist...</div>;
  }

  if (playlistError) {
    return <div className="w-full h-full flex items-center justify-center text-red-400">Erro carregando playlist: {playlistError}</div>;
  }

  if (slides.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-white">Nenhum slide na playlist</div>;
  }

  // protect against currentIndex being out of range for new playlist
  const safeIndex = slides.length === 0 ? 0 : Math.min(currentIndex, slides.length - 1);
  const CurrentComponent = SLIDE_COMPONENTS[slides[safeIndex].type];

  if (!CurrentComponent) {
    return <div className="text-white">Slide type not found: {slides[safeIndex]?.type}</div>;
  }

  return (
    <div className="relative w-full h-full group">
      <Stage>
        <CurrentComponent {...slides[safeIndex].props} />
      </Stage>

      {/* Floating Controls */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <button onClick={prevSlide} className="text-white hover:text-green-400 transition">
          <SkipBack size={24} />
        </button>
        <button onClick={togglePlay} className="text-white hover:text-green-400 transition">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={nextSlide} className="text-white hover:text-green-400 transition">
          <SkipForward size={24} />
        </button>
        <div className="w-px h-6 bg-white/20 mx-2"></div>
        <button onClick={toggleFullscreen} className="text-white hover:text-green-400 transition">
          <Maximize size={24} />
        </button>
      </div>

      {/* Status Info (Optional) */}
      <div className={`absolute top-4 left-4 text-white/50 text-sm font-mono transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {safeIndex + 1} / {slides.length} • {isPlaying ? 'Playing' : 'Paused'}
      </div>
    </div>
  );
};

export default Player;
