import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { Track } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Cyber Synth',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/300/300'
  },
  {
    id: '2',
    title: 'Midnight Grid',
    artist: 'Data Ghost',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon2/300/300'
  },
  {
    id: '3',
    title: 'Digital Rain',
    artist: 'Bit Runner',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/neon3/300/300'
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Playback blocked', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-[400px] bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 neon-shadow-magenta">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTrack.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover rounded-xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 bg-neon-magenta p-1 rounded-full">
              <Music size={12} className="text-black animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold truncate text-white font-mono uppercase tracking-tight">
            {currentTrack.title}
          </h3>
          <p className="text-sm text-gray-400 truncate font-mono">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden group cursor-pointer">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-magenta to-neon-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button onClick={prevTrack} className="p-2 text-gray-400 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          
          <button
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-white/10"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <button onClick={nextTrack} className="p-2 text-gray-400 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest pt-2">
          <div className="flex items-center gap-2">
            <Volume2 size={12} />
            <span>Stereo Output</span>
          </div>
          <span>Track {currentTrackIndex + 1} / {DUMMY_TRACKS.length}</span>
        </div>
      </div>
    </div>
  );
};
