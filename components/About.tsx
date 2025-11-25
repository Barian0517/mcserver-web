
import React from 'react';
import { Code, Server, Github, Globe, Mail, Crown } from 'lucide-react';

const About: React.FC = () => {
  const admins = [
    {
      name: "幽影櫻 (Barian)",
      role: "服務器創始人 & 遊戲策劃",
      description: "負責 Minecraft 伺服器的核心玩法設計、伺服器硬體提供、模組規劃、模組同步器與網頁製作。致力於打造一個融合魔法與科技的完美世界。",
      avatar: "https://cloudreve.barian.moe/f/44ir/avator.jpg", 
      color: "text-sakura",
      bg: "bg-sakura/10",
      border: "border-sakura/30",
      icon: <Crown size={20} />,
      links: [
        { icon: <Globe size={18} />, url: "https://home.barian.moe/", label: "Website" },
        { icon: <Github size={18} />, url: "https://github.com/Barian0517", label: "GitHub" },
        { icon: <Mail size={18} />, url: "mailto:barianjapan@gmail.com", label: "Email" }
      ]
    },
    {
      name: "元兒 (Chyuaner)",
      role: "系統架構 & 後端開發",
      description: "負責 API 系統、網站後端與伺服器硬體提供。開發了強大的服務器模組資訊API與即時狀態監控系統。",
      avatar: "https://github.com/chyuaner.png",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/30",
      icon: <Code size={20} />,
      links: [
        { icon: <Globe size={18} />, url: "https://yuaner.tw/", label: "Website" },
        { icon: <Github size={18} />, url: "https://github.com/chyuaner", label: "GitHub" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-void-bg animate-fade-in pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
           <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-tech">
              關於我們 <span className="text-sakura">ABOUT US</span>
           </h1>
           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              認識這個世界的創始人。
           </p>
           {/* Background Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sakura/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        </div>

        {/* Admins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {admins.map((admin, index) => (
            <div 
              key={index}
              className="group relative bg-void-card border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            >
              {/* Decorative Background */}
              <div className={`absolute top-0 right-0 w-48 h-48 ${admin.bg} blur-[80px] rounded-full -mr-16 -mt-16 transition-opacity opacity-40 group-hover:opacity-80`}></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div className={`absolute inset-0 rounded-full ${admin.bg} blur-md opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  <img 
                    src={admin.avatar} 
                    alt={admin.name} 
                    className={`w-32 h-32 rounded-full border-4 ${admin.border} object-cover relative z-10 shadow-xl bg-void-bg`}
                  />
                  <div className={`absolute bottom-0 right-0 p-2.5 rounded-full bg-void-card border ${admin.border} ${admin.color} z-20 shadow-lg`}>
                    {admin.icon}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-2xl font-bold text-white mb-2">{admin.name}</h3>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider mb-6 ${admin.color} px-3 py-1 rounded-full bg-white/5 border border-white/5`}>
                  {admin.role}
                </span>
                
                <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                  {admin.description}
                </p>

                {/* Links */}
                <div className="flex gap-4">
                  {admin.links.map((link, i) => (
                    <a 
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all hover:scale-110 border border-transparent hover:border-white/10 shadow-lg`}
                      title={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
