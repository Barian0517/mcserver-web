import React, { useState } from 'react';
import { Copy, Check, Server, Sparkles, Map, Box, Terminal, ArrowRight } from 'lucide-react';
import { SERVER_IP, SERVER_VERSION } from '../constants';
import { PageType } from '../App';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="relative animate-fade-in">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-void-bg"></div>
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-[30s] animate-pulse-slow hover:scale-105"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1627389955611-705d2f1d5001?q=80&w=2000&auto=format&fit=crop")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-void-bg/40 via-void-bg/80 to-void-bg"></div>
          
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {[...Array(15)].map((_, i) => (
               <div 
                 key={i}
                 className="absolute bg-sakura/40 rounded-full blur-[1px] animate-float"
                 style={{
                   width: `${Math.random() * 6 + 2}px`,
                   height: `${Math.random() * 6 + 2}px`,
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 5}s`,
                   animationDuration: `${6 + Math.random() * 6}s`,
                   opacity: Math.random() * 0.6 + 0.1
                 }}
               ></div>
             ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-sakura/10 border border-sakura/30 text-sakura text-sm font-bold animate-float backdrop-blur-md shadow-[0_0_15px_rgba(255,183,197,0.2)]">
            <Sparkles size={14} className="animate-pulse" />
            <span className="tracking-wider">SEASON 2025</span>
            <span className="w-1 h-1 rounded-full bg-sakura mx-2"></span>
            <span>{SERVER_VERSION}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl font-sans">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">幽影櫻</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sakura-light via-sakura to-sakura-dark filter drop-shadow-[0_0_25px_rgba(255,183,197,0.4)] mt-2">
              Forge Realms
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            融合 <span className="text-purple-300 font-medium text-glow">奧術魔法</span>、
            <span className="text-blue-300 font-medium text-glow">未來科技</span> 與 
            <span className="text-green-300 font-medium text-glow">深淵探險</span> 的極致體驗。
          </p>

          {/* IP Card */}
          <div className="relative max-w-2xl mx-auto group mb-24">
              <div className="absolute inset-0 bg-gradient-to-r from-sakura/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
              
              <div className="relative bg-void-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-sakura/50 transition-all duration-300 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sakura/20 to-purple-600/20 flex items-center justify-center border border-sakura/30 shadow-[0_0_15px_rgba(255,183,197,0.2)]">
                              <Server className="text-sakura w-8 h-8" />
                          </div>
                          <div className="text-left">
                              <h3 className="text-2xl font-bold text-white mb-1">加入伺服器</h3>
                              <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>
                                  <span className="text-gray-400 font-mono text-sm">{SERVER_VERSION} • Online</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="w-full md:w-auto">
                           <button 
                              onClick={copyToClipboard}
                              className="w-full md:w-auto bg-black/40 hover:bg-sakura/20 border border-white/10 hover:border-sakura/50 rounded-xl py-4 px-6 flex items-center justify-between gap-4 group/btn transition-all duration-300"
                          >
                              <span className="font-mono text-lg text-gray-200 group-hover/btn:text-white tracking-wide select-all">
                                  {SERVER_IP}
                              </span>
                              {copied ? <Check className="text-green-400 w-5 h-5" /> : <Copy className="text-gray-500 group-hover/btn:text-sakura w-5 h-5" />}
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 pb-20">
            
            {/* World Nav */}
            <button 
              onClick={() => onNavigate('worlds')}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-64 flex flex-col justify-end p-6 text-left border border-white/10 hover:border-sakura/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter grayscale-[50%] group-hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-void-bg via-void-bg/50 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-sakura/20 backdrop-blur border border-sakura/30 flex items-center justify-center mb-4 text-sakura">
                  <Map size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-sakura transition-colors">多元世界</h3>
                <p className="text-gray-400 text-sm mb-4">探索天境、暮色森林與未知的深暗維度</p>
                <div className="flex items-center text-sakura text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  開始冒險 <ArrowRight size={16} />
                </div>
              </div>
            </button>

            {/* Mod Nav */}
            <button 
              onClick={() => onNavigate('mods')}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-64 flex flex-col justify-end p-6 text-left border border-white/10 hover:border-sakura/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365723-49cfae966437?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter grayscale-[50%] group-hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-void-bg via-void-bg/50 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 backdrop-blur border border-blue-400/30 flex items-center justify-center mb-4 text-blue-300">
                  <Box size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">模組百科</h3>
                <p className="text-gray-400 text-sm mb-4">查看伺服器安裝的魔法、科技與輔助模組。</p>
                <div className="flex items-center text-blue-300 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  查看列表 <ArrowRight size={16} />
                </div>
              </div>
            </button>

            {/* Command Nav */}
            <button 
              onClick={() => onNavigate('commands')}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-64 flex flex-col justify-end p-6 text-left border border-white/10 hover:border-sakura/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter grayscale-[50%] group-hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-void-bg via-void-bg/50 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-green-400/20 backdrop-blur border border-green-400/30 flex items-center justify-center mb-4 text-green-300">
                  <Terminal size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">指令指南</h3>
                <p className="text-gray-400 text-sm mb-4">學會如何使用家園、傳送與領地系統。</p>
                <div className="flex items-center text-green-300 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  閱讀指南 <ArrowRight size={16} />
                </div>
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

// Make Home available as 'Hero' component concept if needed, but export as Home
export default Home;