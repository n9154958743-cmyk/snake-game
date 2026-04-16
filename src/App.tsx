import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Terminal, Cpu, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-magenta/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg flex items-center justify-center neon-shadow-cyan">
            <Zap size={20} className="text-neon-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono tracking-tighter uppercase">Neon Snake & Beats</h1>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
              <span className="flex items-center gap-1"><Cpu size={10} /> System Active</span>
              <span className="w-1 h-1 bg-neon-lime rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <div className="flex flex-col items-end">
            <span>Core Temp</span>
            <span className="text-neon-cyan">32°C</span>
          </div>
          <div className="flex flex-col items-end">
            <span>Memory</span>
            <span className="text-neon-magenta">12.4GB</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Column - Info/Stats */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-8">
          <section className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-xs font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Terminal size={14} /> Terminal Output
            </h2>
            <div className="space-y-2 font-mono text-[10px] text-gray-400">
              <p className="text-neon-lime">{'>'} Initializing kernel...</p>
              <p className="text-neon-lime">{'>'} Loading audio drivers...</p>
              <p className="text-neon-lime">{'>'} Snake module loaded.</p>
              <p className="animate-pulse">{'>'} Waiting for input_</p>
            </div>
          </section>

          <section className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-xs font-mono text-gray-500 uppercase mb-4">High Scores</h2>
            <div className="space-y-3 font-mono text-xs">
              {[
                { name: 'CYBER_PUNK', score: 2450 },
                { name: 'BIT_RUNNER', score: 1820 },
                { name: 'DATA_GHOST', score: 1540 },
              ].map((entry, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-400">{entry.name}</span>
                  <span className="text-neon-cyan">{entry.score}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Center Column - Game */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <SnakeGame />
        </div>

        {/* Right Column - Music */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center">
          <MusicPlayer />
          
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl w-full">
            <h2 className="text-xs font-mono text-gray-500 uppercase mb-4">System Controls</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase hover:bg-white/10 transition-colors">
                Mute Game
              </button>
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase hover:bg-white/10 transition-colors">
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em] relative z-10">
        © 2026 NEON_SNAKE_SYSTEMS // ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
