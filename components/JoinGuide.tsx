
import React, { useState } from 'react';
import { AlertTriangle, Download, BookOpen, CheckCircle2, Copy, Check, Settings } from 'lucide-react';
import { SERVER_IP } from '../constants';

const JoinGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] animate-fade-in pb-20 pt-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tutorial Section (Text Area) */}
          <div className="mb-12">
             <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 font-tech">
                  加入伺服器 <span className="text-sakura">JOIN US</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                   按照以下步驟，只需幾分鐘即可開始您的冒險。
                </p>
             </div>

             {/* Steps Container - Changed to vertical layout */}
             <div className="flex flex-col gap-8 mb-12 max-w-4xl mx-auto">
                
                {/* Step 1 */}
                <div className="bg-void-card border border-white/10 rounded-2xl p-8 hover:border-sakura/30 transition-all">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-sakura/10 text-sakura flex items-center justify-center font-bold text-xl border border-sakura/20 shrink-0">
                         1
                      </div>
                      <div className="w-full">
                         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            下載啟動器與安裝 (以 PCL 為例)
                            <Download size={18} className="text-gray-500" />
                         </h3>
                         
                         <div className="space-y-6">
                            {/* Basic Steps */}
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-sakura bg-sakura/10 px-3 py-1 rounded-lg text-sm whitespace-nowrap">Step 1</span>
                                        <span>下載 PCL 啟動器</span>
                                    </div>
                                    <a 
                                        href="https://raw.githubusercontent.com/Meloong-Git/PCL/refs/heads/main/%E6%9C%80%E6%96%B0%E6%AD%A3%E5%BC%8F%E7%89%88.zip" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="ml-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-sakura hover:bg-white text-void-bg font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(255,183,197,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] text-sm whitespace-nowrap"
                                    >
                                        <Download size={16} />
                                        下載 PCL
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                    <span className="font-bold text-sakura bg-sakura/10 px-3 py-1 rounded-lg text-sm whitespace-nowrap">Step 2</span>
                                    <span>安裝 Forge 1.20.1 版本</span>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-sakura bg-sakura/10 px-3 py-1 rounded-lg text-sm whitespace-nowrap">Step 3</span>
                                        <span>下載模組更新器放入該 Forge 版本資料夾中</span>
                                    </div>
                                    <a 
                                        href="http://modapi.barian.moe/clientupdate" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="ml-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-sakura hover:bg-white text-void-bg font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(255,183,197,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] text-sm whitespace-nowrap"
                                    >
                                        <Download size={16} />
                                        下載更新器
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                    <span className="font-bold text-sakura bg-sakura/10 px-3 py-1 rounded-lg text-sm whitespace-nowrap">Step 4</span>
                                    <span>運行更新器</span>
                                </div>
                            </div>

                             {/* RAM Warning */}
                             <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h4 className="font-bold text-red-200 text-sm mb-1">重要設定：記憶體分配</h4>
                                    <p className="text-red-200/70 text-sm">
                                        請務必在啟動器設定中為遊戲分配 <span className="font-bold text-white">至少 8GB (8192MB)</span> 記憶體，否則遊戲將無法正常啟動或頻繁崩潰。
                                    </p>
                                </div>
                            </div>

                            {/* Advanced Usage */}
                            <div className="bg-black/20 border border-white/5 rounded-xl p-6">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Settings size={16} className="text-sakura" />
                                    進階用法：設定自動更新(PCL)
                                </h4>
                                <div className="text-gray-400 text-sm space-y-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span>進入</span>
                                        <span className="text-white font-bold bg-white/10 px-2 py-1 rounded text-xs">版本設置</span> 
                                        <span className="text-gray-600">→</span> 
                                        <span className="text-white font-bold bg-white/10 px-2 py-1 rounded text-xs">設置</span> 
                                        <span className="text-gray-600">→</span> 
                                        <span className="text-white font-bold bg-white/10 px-2 py-1 rounded text-xs">高級選項</span>
                                    </div>
                                    <div>
                                        <p className="mb-2">於 <span className="text-white font-bold">啟動前執行命令</span> 中填入：</p>
                                        <code className="block bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-green-400 text-sm break-all select-all shadow-inner">
                                            "{`{verpath}`}mainGUI.exe"
                                        </code>
                                    </div>
                                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <CheckCircle2 size={12} className="text-green-500" />
                                        設定後，啟動器將在每次啟動遊戲前自動運行更新腳本。
                                    </p>
                                </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Step 2 */}
                <div className="bg-void-card border border-white/10 rounded-2xl p-8 hover:border-sakura/30 transition-all">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-sakura/10 text-sakura flex items-center justify-center font-bold text-xl border border-sakura/20 shrink-0">
                         2
                      </div>
                      <div className="w-full">
                         <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            開始連線
                            <BookOpen size={18} className="text-gray-500" />
                         </h3>
                         <p className="text-gray-400 leading-relaxed mb-4">
                            啟動遊戲後，進入多人連線。點擊新增伺服器，輸入我們的 IP 位址。<br />
                            由於整合包內容較多，中低配電腦可能需要較多時間啟動
                         </p>
                          <ul className="space-y-2 text-sm text-gray-500 mb-6">
                            <li className="flex items-center gap-2">
                              <AlertTriangle size={14} className="text-yellow-500" />
                               啟動遊戲載入模組可能花費一到五分鐘
                            </li>
                            <li className="flex items-center gap-2">
                              <AlertTriangle size={14} className="text-yellow-500" />
                               加入世界可能花費一分鐘以上時間
                            </li>
                         </ul>
                         
                         <button 
                            onClick={copyIp}
                            className="w-full group relative bg-black/40 hover:bg-sakura/10 border border-white/10 hover:border-sakura/50 rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-300"
                         >
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1 group-hover:text-sakura transition-colors">Server IP</span>
                                <span className="text-white font-mono text-lg tracking-wide break-all">{SERVER_IP}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-sakura text-gray-400 group-hover:text-void-bg transition-all">
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </div>
                         </button>

                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JoinGuide;
