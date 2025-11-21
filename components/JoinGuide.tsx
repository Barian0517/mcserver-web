
import React, { useState } from 'react';
import { ExternalLink, AlertTriangle, Wifi, Download, BookOpen, CheckCircle2, Copy, Check } from 'lucide-react';
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

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Step 1 */}
                <div className="bg-void-card border border-white/10 rounded-2xl p-8 hover:border-sakura/30 transition-all">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-sakura/10 text-sakura flex items-center justify-center font-bold text-xl border border-sakura/20 shrink-0">
                         1
                      </div>
                      <div>
                         <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            下載啟動器與更新器
                            <Download size={18} className="text-gray-500" />
                         </h3>
                         <p className="text-gray-400 leading-relaxed mb-4">
                            請前往下方的 <span className="text-sakura font-bold">更新器下載中心</span>。
                            下載模組更新器。將其放在版本資料夾下啟動就能自動更新了<br />
                            我們推薦使用PCL啟動器或prism啟動器，該啟動器允許使用者設定啟動腳本讓遊戲器動時執行自定義命令(用於運行更新器)
                         </p>
                         <ul className="space-y-2 text-sm text-gray-500">
                            <li className="flex items-center gap-2">
                               <CheckCircle2 size={14} className="text-green-500" />
                               確認 Java 版本為 17 或以上
                            </li>
                            <li className="flex items-center gap-2">
                               <CheckCircle2 size={14} className="text-green-500" />
                               分配記憶體建議 8GB+
                            </li>
                         </ul>
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

          {/* Embedded Download Page */}
          <div className="h-[800px]">
              <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-white/10"></div>
                  <span className="text-sakura font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <Download size={16} className="animate-bounce" />
                      模組下載中心
                  </span>
                  <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <div className="bg-void-card border border-white/10 rounded-2xl overflow-hidden h-full shadow-2xl flex flex-col relative group ring-1 ring-white/5">
                  {/* Header Bar */}
                  <div className="p-4 border-b border-white/5 bg-[#151518] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <div className="ml-4 flex items-center gap-2 text-gray-400 text-sm font-mono">
                            <Wifi size={14} className="text-sakura animate-pulse" />
                            modapi.barian.moe
                        </div>
                    </div>
                    <a href="http://modapi.barian.moe/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded bg-white/5 hover:bg-sakura hover:text-void-bg text-sakura text-sm flex items-center gap-2 transition-all">
                        <span className="font-bold">在新視窗開啟</span>
                        <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Iframe Container */}
                  <div className="flex-1 relative bg-white">
                      <iframe
                          src="http://modapi.barian.moe/"
                          className="w-full h-full border-0 block"
                          title="Download Center"
                          sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                      
                      {/* Safety Overlay for Mixed Content (HTTP vs HTTPS) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-void-card/95 backdrop-blur-lg p-6 border-t border-sakura/30 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 opacity-100 transition-opacity z-10">
                          <div className="flex items-start gap-4">
                              <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500/30 shrink-0">
                                  <AlertTriangle className="text-yellow-500" size={24} />
                              </div>
                              <div>
                                  <h3 className="text-white font-bold text-lg mb-1">無法顯示下載頁面？</h3>
                                  <p className="text-gray-400 text-sm max-w-md">
                                      由於下載中心使用 HTTP 協議，您的瀏覽器可能會阻擋嵌入內容。若無法瀏覽或下載請點擊按鈕前往下載頁面。
                                  </p>
                              </div>
                          </div>
                          <a
                              href="http://modapi.barian.moe/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="whitespace-nowrap px-8 py-3 bg-sakura hover:bg-white text-void-bg font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,183,197,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center gap-2"
                          >
                              <Download size={18} />
                              前往下載中心
                          </a>
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};

export default JoinGuide;
