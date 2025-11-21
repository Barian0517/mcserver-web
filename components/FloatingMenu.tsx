import React, { useState } from 'react';
import { Home, ArrowUp, Search, Menu, X } from 'lucide-react';
import { PageType } from '../App';

interface FloatingMenuProps {
  onNavigate: (page: PageType) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    {
      id: 'search',
      icon: <Search size={20} />,
      label: '搜尋模組',
      onClick: () => onNavigate('mods'),
      color: 'text-blue-300',
      bg: 'hover:bg-blue-500/20'
    },
    {
      id: 'top',
      icon: <ArrowUp size={20} />,
      label: '返回最上層',
      onClick: handleScrollToTop,
      color: 'text-sakura',
      bg: 'hover:bg-sakura/20'
    },
    {
      id: 'home',
      icon: <Home size={20} />,
      label: '回到首頁',
      onClick: () => onNavigate('home'),
      color: 'text-green-300',
      bg: 'hover:bg-green-500/20'
    }
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-[2px] z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Menu Container */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-end gap-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Menu Items Column (Left of Button, Top to Bottom) */}
        <div 
          className={`flex flex-col gap-3 transition-all duration-300 transform ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        >
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="group flex items-center justify-end gap-3 p-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Label */}
              <span className="text-sm font-bold text-white bg-void-card/90 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
                {item.label}
              </span>
              
              {/* Icon Circle */}
              <div className={`w-10 h-10 rounded-full bg-void-card border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-opacity-50 ${item.color} ${item.bg}`}>
                {item.icon}
              </div>
            </button>
          ))}
        </div>

        {/* Main Trigger Button */}
        <div className="relative">
           {/* Pulse Effect */}
           <div className={`absolute inset-0 bg-sakura/30 rounded-full blur-md transition-all duration-500 ${isOpen ? 'scale-110 opacity-100' : 'scale-100 opacity-50 animate-pulse'}`}></div>
           
           <button
            className={`relative w-14 h-14 rounded-full bg-void-card border shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-300 ${
              isOpen ? 'border-sakura bg-void-card shadow-[0_0_30px_rgba(255,183,197,0.4)]' : 'border-white/10 hover:border-sakura/50 hover:scale-105'
            }`}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu 
                className={`absolute text-sakura transition-all duration-300 transform ${isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} 
                size={24} 
              />
              <X 
                className={`absolute text-sakura transition-all duration-300 transform ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} 
                size={24} 
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingMenu;