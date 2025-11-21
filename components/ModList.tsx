import React, { useState } from 'react';
import { MODS_AND_PLUGINS } from '../constants';
import { ModCategory } from '../types';
import { Box, Zap, Sparkles, Map, Coffee, Settings, ExternalLink, Star } from 'lucide-react';

const ModList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ModCategory | 'All'>('All');

  const categories: { id: ModCategory | 'All'; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: '全部模組', icon: <Box size={16} /> },
    { id: 'Magic', label: '魔法 & RPG', icon: <Sparkles size={16} /> },
    { id: 'Tech', label: '科技工業', icon: <Zap size={16} /> },
    { id: 'Adventure', label: '冒險世界', icon: <Map size={16} /> },
    { id: 'Decoration', label: '裝飾 & 動漫', icon: <Coffee size={16} /> },
    { id: 'QoL', label: '便利 & 系統', icon: <Settings size={16} /> },
  ];

  const filteredItems = activeTab === 'All' 
    ? MODS_AND_PLUGINS 
    : MODS_AND_PLUGINS.filter(item => item.category === activeTab);

  return (
    <section id="mods" className="py-24 bg-[#0a0a0d] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-sakura/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-tech">
              核心模組 <span className="text-sakura">ARSENAL</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              精選 <span className="text-white font-bold">Forge 1.20.1</span> 熱門模組。
              從建構核反應爐到施展禁忌魔法，這裡擁有無限的可能性。
            </p>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border ${
                        activeTab === cat.id 
                        ? 'bg-sakura text-void-bg border-sakura shadow-[0_0_20px_rgba(255,183,197,0.3)]' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    {cat.icon}
                    {cat.label}
                </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-void-card/50 backdrop-blur-sm border border-white/5 hover:border-sakura/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sakura/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${
                        item.category === 'Magic' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                        item.category === 'Tech' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                        item.category === 'Adventure' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                        item.category === 'Decoration' ? 'bg-pink-500/10 border-pink-500/30 text-pink-400' :
                        'bg-gray-500/10 border-gray-500/30 text-gray-400'
                    }`}>
                        {item.category === 'Magic' && <Sparkles size={20} />}
                        {item.category === 'Tech' && <Zap size={20} />}
                        {item.category === 'Adventure' && <Map size={20} />}
                        {item.category === 'Decoration' && <Coffee size={20} />}
                        {['QoL', 'System'].includes(item.category) && <Settings size={20} />}
                    </div>
                    <div className="flex gap-2">
                        {item.important && (
                            <div className="p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20" title="核心必裝">
                                <Star className="text-yellow-500 fill-yellow-500 animate-pulse-slow" size={16} />
                            </div>
                        )}
                        {item.url && (
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
                                title="查看官網"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sakura transition-colors line-clamp-1" title={item.name}>
                    {item.name}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed min-h-[3rem] line-clamp-3">
                    {item.description}
                </p>
              </div>
              
              {/* Category Tag */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/20">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModList;