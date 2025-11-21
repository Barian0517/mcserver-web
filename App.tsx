
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Worlds from './components/Worlds';
import Mods from './components/Mods';
import Commands from './components/Commands';
import JoinGuide from './components/JoinGuide';
import Footer from './components/Footer';
import FloatingMenu from './components/FloatingMenu';
import MusicPlayer from './components/MusicPlayer';

export type PageType = 'home' | 'worlds' | 'mods' | 'commands' | 'join';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (page: PageType) => {
    if (page === currentPage) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsTransitioning(true);
    // Small delay for transition effect could go here, but React state update is fast enough
    setCurrentPage(page);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'worlds':
        return <Worlds />;
      case 'mods':
        return <Mods />;
      case 'commands':
        return <Commands />;
      case 'join':
        return <JoinGuide />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-void-bg text-white font-sans flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className={`flex-grow transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingMenu onNavigate={handleNavigate} />
      <MusicPlayer />
    </div>
  );
}

export default App;
