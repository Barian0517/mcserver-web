
import React, { useState } from 'react';
import { DISCORD_LINK, CONTACT_EMAIL } from '../constants';
import { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050507] border-t border-white/5 pt-16 pb-8 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 flex items-center justify-center bg-void-card border border-sakura/30 rounded">
                  <span className="text-sakura font-bold">幽</span>
                </div>
              <h3 className="text-2xl font-bold text-white font-tech">幽影櫻的minecraft服務器</h3>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">
              幽影櫻的 Forge 模組伺服器。
              這是一個為探索、建築與戰鬥而打造的專屬世界。
              安裝模組包，立刻加入我們的冒險。
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs text-sakura">Navigation</h4>
            <ul className="space-y-3 text-gray-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-sakura transition-colors hover:pl-1 duration-300 text-left w-full">回到首頁</button></li>
              <li><button onClick={() => onNavigate('worlds')} className="hover:text-sakura transition-colors hover:pl-1 duration-300 text-left w-full">多元維度</button></li>
              <li><button onClick={() => onNavigate('mods')} className="hover:text-sakura transition-colors hover:pl-1 duration-300 text-left w-full">模組清單</button></li>
              <li><button onClick={() => onNavigate('commands')} className="hover:text-sakura transition-colors hover:pl-1 duration-300 text-left w-full">常用指令</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs text-sakura">Contact</h4>
            <ul className="space-y-3 text-gray-500">
              <li className="flex items-center gap-2">
                <span>Discord:</span>
                <a href={DISCORD_LINK} className="text-white hover:underline decoration-sakura underline-offset-4">Join Server</a>
              </li>
              <li className="flex items-center gap-2">
                <span>Email:</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:underline decoration-sakura underline-offset-4">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} 幽影櫻的minecraft服務器. Made by 幽影櫻.
          </p>
          <p className="text-gray-700 font-mono">
            <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-2 animate-pulse"></span>
            System Operational
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
