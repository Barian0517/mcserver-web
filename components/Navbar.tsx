
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { PageType } from '../App';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; id: PageType }[] = [
    { name: '首頁', id: 'home' },
    { name: '多元維度', id: 'worlds' },
    { name: '模組列表', id: 'mods' },
    { name: '指令大全', id: 'commands' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-void-bg/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer select-none group focus:outline-none"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-sakura/20 rounded-lg rotate-3 group-hover:rotate-6 transition-transform"></div>
              <div className="absolute inset-0 bg-sakura/40 rounded-lg -rotate-3 group-hover:-rotate-6 transition-transform"></div>
              <div className="relative bg-void-card border border-sakura/50 rounded-lg w-full h-full flex items-center justify-center shadow-[0_0_15px_rgba(255,183,197,0.3)]">
                <span className="text-sakura font-bold text-xl">幽</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-bold text-lg tracking-wide font-tech group-hover:text-sakura transition-colors">
                幽影櫻的minecraft服務器
              </span>
              <span className="text-gray-400 text-xs tracking-wider uppercase">Forge Server</span>
            </div>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              
              {/* Join Button (Prominent) */}
              <button
                onClick={() => onNavigate('join')}
                className="relative group px-6 py-2 rounded-full font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,183,197,0.3)] hover:shadow-[0_0_30px_rgba(255,183,197,0.6)] ring-1 ring-sakura/50"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-sakura via-pink-400 to-sakura animate-shine bg-[length:200%_100%]"></div>
                 <div className="relative z-10 flex items-center gap-2 text-void-bg group-hover:text-white transition-colors">
                    <span>立即加入</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </div>
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-white/10"></div>

              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium group overflow-hidden transition-colors ${
                    currentPage === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sakura transition-all duration-300 ${
                    currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                  {currentPage === link.id && (
                    <span className="absolute inset-0 bg-sakura/10 blur-md"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sakura hover:bg-white/10 transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-void-bg/95 backdrop-blur-xl border-b border-sakura/20 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
          <button
                onClick={() => {
                    onNavigate('join');
                    setIsOpen(false);
                }}
                className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-sakura to-pink-500 rounded-xl text-void-bg font-bold shadow-lg flex items-center justify-center gap-2"
          >
             立即加入
             <ArrowRight size={16} />
          </button>

          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsOpen(false);
              }}
              className={`w-full text-left block px-3 py-4 rounded-md text-base font-medium border-l-2 transition-all ${
                currentPage === link.id 
                  ? 'text-white border-sakura bg-sakura/5' 
                  : 'text-gray-300 border-transparent hover:text-sakura hover:bg-white/5'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
