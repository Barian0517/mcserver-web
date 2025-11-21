import React from 'react';
import { WORLDS } from '../constants';

const WorldShowcase: React.FC = () => {
  return (
    <section id="worlds" className="py-24 bg-void-bg relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sakura/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-tech">
            維度 <span className="text-sakura">DIMENSIONS</span>
          </h2>
          <div className="w-24 h-1 bg-sakura mx-auto rounded-full mb-6 shadow-[0_0_10px_#FFB7C5]"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            在原版的主世界 地獄 終界之外。準備好踏入天境、暮色森林以及未知的黑暗維度。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WORLDS.map((world) => (
            <div 
              key={world.id} 
              className="group relative rounded-2xl overflow-hidden bg-void-card border border-white/5 hover:border-sakura/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Image Area */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-void-card via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-sakura/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <img 
                  src={world.image} 
                  alt={world.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0"
                />
              </div>
              
              {/* Content Area */}
              <div className="p-6 relative z-20 -mt-16">
                <div className="inline-block px-3 py-1 rounded-full bg-sakura/20 backdrop-blur-md border border-sakura/30 text-sakura text-xs font-bold mb-3 shadow-lg">
                    {world.id.toUpperCase()}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sakura transition-colors drop-shadow-md">{world.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {world.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider bg-black/50 backdrop-blur text-gray-300 px-2 py-1 rounded border border-white/10">#{tag}</span>
                    ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed min-h-[3rem]">
                  {world.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldShowcase;