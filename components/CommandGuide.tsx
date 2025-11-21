
import React from 'react';
import { COMMANDS } from '../constants';
import { Terminal, Copy, ArrowRight } from 'lucide-react';

const CommandGuide: React.FC = () => {
  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="commands" className="py-24 bg-void-bg relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-tech">
            常用指令 <span className="text-sakura">COMMANDS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            快速上手伺服器的基本操作。
          </p>
        </div>

        <div className="bg-void-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#121214] border-b border-white/5 p-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs text-gray-500 font-mono">user@terranova:~</span>
            </div>
            
            <div className="divide-y divide-white/5">
                {COMMANDS.map((cmd, index) => (
                    <div key={index} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <code className="text-sakura font-mono font-bold bg-sakura/10 px-2 py-1 rounded">
                                    {cmd.command.split(' ')[0]}
                                </code>
                                {cmd.maintenance && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/30 tracking-wider">
                                        維修中
                                    </span>
                                )}
                                <span className="text-gray-500 text-sm font-mono hidden md:inline-block">{cmd.command.substring(cmd.command.indexOf(' ') + 1)}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{cmd.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Example</p>
                                <code className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded border border-white/5">
                                    {cmd.usage}
                                </code>
                            </div>
                            <button 
                                onClick={() => copyCommand(cmd.usage || cmd.command)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-sakura hover:text-void-bg text-gray-400 transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default CommandGuide;