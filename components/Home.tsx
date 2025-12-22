
import React, { useState, useEffect } from 'react';
import { Copy, Check, Server, Sparkles, Map, Box, Terminal, ArrowRight, Loader2, Users, RefreshCw } from 'lucide-react';
import { SERVER_IP, SERVER_VERSION } from '../constants';
import { PageType } from '../App';
import { fetchServerStatus } from '../services/api';
import { ServerStatus } from '../services/types';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const getStatus = async () => {
    setLoadingStatus(true);
    // Removed SERVER_IP argument as requested by user to use generic endpoint
    const status = await fetchServerStatus();
    setServerStatus(status);
    setLoadingStatus(false);
  };

  useEffect(() => {
    getStatus();
    
    // Refresh every 60 seconds
    const interval = setInterval(getStatus, 60000);
    return () => clearInterval(interval);
  }, []);

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
            className="absolute inset-0 opacity-80 bg-cover bg-center transition-transform duration-[30s] animate-pulse-slow hover:scale-105"
            style={{ backgroundImage: 'url("./img/server2.png")' }}
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
              minecraft server
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            融合 <span className="text-purple-300 font-medium text-glow">魔法</span>、
            <span className="text-blue-300 font-medium text-glow">拔刀劍</span> 與 
            <span className="text-green-300 font-medium text-glow">槍械</span> 的極致體驗。
          </p>

          {/* IP Card */}
          <div className="relative max-w-4xl mx-auto group mb-24">
              <div className="absolute inset-0 bg-gradient-to-r from-sakura/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
              
              <div className="relative bg-void-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-sakura/50 transition-all duration-300 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sakura/20 to-purple-600/20 flex items-center justify-center border border-sakura/30 shadow-[0_0_15px_rgba(255,183,197,0.2)]">
                              <Server className="text-sakura w-8 h-8" />
                          </div>
                          <div className="text-left">
                              <h3 className="text-2xl font-bold text-white mb-1">加入伺服器</h3>
                              
                              {/* Dynamic Status Display */}
                              <div className="flex items-center gap-2 min-h-[24px]">
                                  {loadingStatus ? (
                                      <>
                                        <Loader2 size={14} className="text-gray-400 animate-spin" />
                                        <span className="text-gray-400 font-mono text-sm tracking-tight">正在取得狀態...</span>
                                      </>
                                  ) : (serverStatus?.error || !serverStatus) ? (
                                      <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse"></span>
                                        <span className="text-red-400 font-mono text-sm font-bold">Offline ({serverStatus?.error || 'Unknown Error'})</span>
                                        <button onClick={getStatus} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white" title="重試">
                                          <RefreshCw size={12} />
                                        </button>
                                      </div>
                                  ) : (
                                      <>
                                        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>
                                        <span className="text-gray-300 font-mono text-sm font-bold">
                                            {serverStatus?.version?.name || SERVER_VERSION}
                                        </span>
                                        <span className="mx-1 text-gray-600">•</span>
                                        <div className="flex items-center gap-1 text-sakura font-mono text-sm">
                                            <Users size={12} />
                                            {serverStatus?.players?.online ?? 0}/{serverStatus?.players?.max ?? 20} Online
                                        </div>
                                      </>
                                  )}
                              </div>
                          </div>
                      </div>
                      
                      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                           <button 
                              onClick={copyToClipboard}
                              className="flex-1 md:flex-none bg-black/40 hover:bg-sakura/20 border border-white/10 hover:border-sakura/50 rounded-xl py-4 px-6 flex items-center justify-between gap-4 group/btn transition-all duration-300"
                          >
                              <span className="font-mono text-lg text-gray-200 group-hover/btn:text-white tracking-wide select-all">
                                  {SERVER_IP}
                              </span>
                              {copied ? <Check className="text-green-400 w-5 h-5" /> : <Copy className="text-gray-500 group-hover/btn:text-sakura w-5 h-5" />}
                          </button>
                          
                           <button 
                              onClick={() => onNavigate('join')}
                              className="flex-1 md:flex-none bg-sakura hover:bg-white text-void-bg font-bold text-lg rounded-xl py-4 px-8 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(255,183,197,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:-translate-y-0.5"
                          >
                              <span>加入服務器</span>
                              <ArrowRight size={20} />
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 pb-20">
            
            {/* World Nav */}
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <button 
                onClick={() => onNavigate('worlds')}
                className="w-full h-full group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-64 flex flex-col justify-end p-6 text-left border border-white/5 hover:border-sakura/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_10px_50px_-10px_rgba(255,183,197,0.2)] hover:scale-105"
                >
                {/* Collage Container */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 transition-transform duration-[1.5s] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0">
                    <div className="row-span-2 relative overflow-hidden">
                        <img src="./img/Worlds/aether.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden">
                        <img src="./img/Worlds/twili.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden">
                        <img src="./img/Worlds/deepdarker.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
                
                {/* Gradients & Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-void-bg via-void-bg/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-sakura/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>

                {/* Content */}
                <div className="relative z-20">
                    <div className="w-10 h-10 rounded-full bg-sakura/20 backdrop-blur border border-sakura/30 flex items-center justify-center mb-4 text-sakura shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Map size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-sakura transition-colors drop-shadow-md duration-300">多元維度</h3>
                    <p className="text-gray-300 text-sm mb-4 font-medium group-hover:text-gray-200 transition-colors duration-300">探索天境、暮色森林與未知的深暗維度。</p>
                    <div className="flex items-center text-sakura text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    開始冒險 <ArrowRight size={16} />
                    </div>
                </div>
                </button>
            </div>

            {/* Mod Nav - Slashed Design (2 Images) */}
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <button 
                onClick={() => onNavigate('mods')}
                className="w-full h-full group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-64 flex flex-col justify-end p-6 text-left border border-white/5 hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_10px_50px_-10px_rgba(96,165,250,0.2)] hover:scale-105"
                >
                {/* Slashed Image Container */}
                <div className="absolute inset-0 transition-transform duration-[1.5s] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0">
                    {/* Left Slice */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                            backgroundImage: 'url("https://cloudreve.barian.moe/f/RKfW/1.png")',
                            clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)'
                        }}
                    ></div>
                    {/* Right Slice */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                            backgroundImage: 'url("https://cloudreve.barian.moe/f/OOcE/2.png")',
                            clipPath: 'polygon(55.5% 0, 100% 0, 100% 100%, 45.5% 100%)'
                        }}
                    ></div>
                </div>
                
                {/* Gradients & Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-void-bg via-void-bg/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>

                {/* Content */}
                <div className="relative z-20">
                    <div className="w-10 h-10 rounded-full bg-blue-400/20 backdrop-blur border border-blue-400/30 flex items-center justify-center mb-4 text-blue-300 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Box size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors drop-shadow-md duration-300">模組列表</h3>
                    <p className="text-gray-300 text-sm mb-4 font-medium group-hover:text-gray-200 transition-colors duration-300">查看伺服器安裝的魔法、科技與輔助模組。</p>
                    <div className="flex items-center text-blue-300 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    查看列表 <ArrowRight size={16} />
                    </div>
                </div>
                </button>
            </div>

            {/* Command Nav */}
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '500ms' }}>
                <button 
                onClick={() => onNavigate('commands')}
                className="w-full h-full group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-64 flex flex-col justify-end p-6 text-left border border-white/5 hover:border-green-400/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_10px_50px_-10px_rgba(74,222,128,0.2)] hover:scale-105"
                >
                {/* Image */}
                <div className="absolute inset-0">
                    <img 
                    src="./img/cammandpic.png"
                    alt="Commands" 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
                    />
                </div>
                
                {/* Gradients & Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-void-bg via-void-bg/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>

                {/* Content */}
                <div className="relative z-20">
                    <div className="w-10 h-10 rounded-full bg-green-400/20 backdrop-blur border border-green-400/30 flex items-center justify-center mb-4 text-green-300 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Terminal size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors drop-shadow-md duration-300">指令指南</h3>
                    <p className="text-gray-300 text-sm mb-4 font-medium group-hover:text-gray-200 transition-colors duration-300">學會如何使用家園、傳送與TPA系統。</p>
                    <div className="flex items-center text-green-300 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    閱讀指南 <ArrowRight size={16} />
                    </div>
                </div>
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
