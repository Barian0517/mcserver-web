
import React from 'react';
import { WORLDS } from '../constants';

const Worlds: React.FC = () => {
  return (
    <div className="min-h-screen bg-void-bg animate-fade-in pb-20">
      {/* Header */}
      <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover object-center" 
                alt="Worlds Header"
            />
            <div className="absolute inset-0 bg-void-bg/60 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-bg/20 to-void-bg"></div>
         </div>
         
         <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-tech tracking-wider">
                多元維度 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sakura">DIMS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                除了原版的主世界 地獄 終界。你還可踏入傳說中的天堂 進入神秘的暮色森林 以及深暗的世界等 還有更多的維度等待你的探索
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORLDS.map((world, index) => (
            <div 
              key={world.id} 
              className="group relative rounded-3xl overflow-hidden bg-void-card border border-white/5 hover:border-sakura/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_10px_50px_-10px_rgba(255,183,197,0.2)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Area */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-void-card via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-sakura/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <img 
                  src={world.image} 
                  alt={world.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Tags Overlay */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                     {world.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10 shadow-lg">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-8 relative z-20">
                <div className="inline-block px-3 py-1 rounded-full bg-sakura/10 border border-sakura/20 text-sakura text-xs font-bold mb-4">
                    ID: {world.id}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-sakura transition-colors drop-shadow-md font-tech">
                    {world.title}
                </h3>
                
                <p className="text-gray-300 text-base leading-relaxed">
                  {world.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Worlds;
