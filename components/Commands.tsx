
import React from 'react';
import { COMMANDS } from '../constants';
import { Terminal, Copy, ChevronRight } from 'lucide-react';

const Commands: React.FC = () => {
  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-void-bg animate-fade-in pb-20">
        {/* Header */}
        <div className="relative h-[40vh] overflow-hidden flex flex-col items-center justify-center bg-void-card border-b border-white/5">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#32a852_1px,#32a852_2px)] bg-[length:100%_4px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-void-bg/0 to-[#0a0a0d]"></div>
            </div>
            <div className="relative z-10 text-center px-4 mt-10">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-2 font-mono tracking-tighter">
                &gt;_ COMMANDS
                </h1>
                <p className="text-green-400 font-mono text-sm md:text-base">
                    root@minecraft-server:~# help
                </p>
            </div>
        </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
        <div className="bg-[#0d0d10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
            {/* Terminal Bar */}
            <div className="bg-[#1a1a20] border-b border-white/5 p-4 flex items-center gap-2">
                <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                </div>
                <div className="flex-1 text-center text-xs text-gray-500 font-mono">bash — 80x24</div>
            </div>
            
            <div className="p-2 md:p-6 space-y-2">
                {COMMANDS.map((cmd, index) => (
                    <div key={index} className="group rounded-lg p-4 hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5 flex flex-col md:flex-row md:items-center gap-4">
                        
                        <div className="flex-1">
                            <div className="flex items-start md:items-center gap-3 mb-2">
                                <ChevronRight className="text-green-500 mt-1 md:mt-0 flex-shrink-0" size={16} />
                                <div className="font-mono text-lg text-sakura break-all flex items-center gap-3 flex-wrap">
                                    {cmd.command.split(' ')[0]}
                                    {cmd.maintenance && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/30 tracking-wider">
                                            維修中
                                        </span>
                                    )}
                                    <span className="text-gray-500 text-sm">{cmd.command.substring(cmd.command.indexOf(' ') + 1)}</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm pl-7 border-l-2 border-white/5 ml-2 md:ml-0 md:border-none md:pl-0">
                                {cmd.description}
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end gap-4 pl-7 md:pl-0">
                             <code className="hidden md:block text-xs text-gray-500 bg-black/50 px-3 py-1.5 rounded border border-white/5 font-mono">
                                {cmd.usage}
                            </code>
                            <button 
                                onClick={() => copyCommand(cmd.usage || cmd.command)}
                                className="p-2 rounded-md bg-white/5 hover:bg-sakura hover:text-void-bg text-gray-400 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-active:scale-95"
                            >
                                <Copy size={14} />
                                <span className="md:hidden">Copy</span>
                            </button>
                        </div>
                    </div>
                ))}
                
                <div className="p-4 flex items-center gap-2 animate-pulse">
                    <ChevronRight className="text-green-500" size={16} />
                    <div className="h-5 w-2 bg-green-500"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Commands;