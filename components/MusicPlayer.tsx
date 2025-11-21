
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, ListMusic, Music } from 'lucide-react';
import { MUSIC_PLAYLIST } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Current song info
  const currentSong = MUSIC_PLAYLIST[currentSongIndex];

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio(currentSong.file);
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;

    const tryPlay = () => {
        audio.play()
            .then(() => {
                setIsPlaying(true);
                // Remove listeners once successful to avoid restarting or errors
                document.removeEventListener('click', tryPlay);
                document.removeEventListener('keydown', tryPlay);
            })
            .catch((error) => {
                console.log("Auto-play prevented, waiting for interaction:", error);
                setIsPlaying(false);
            });
    };

    // 1. Attempt immediate play (works if user has interacted with domain before)
    tryPlay();

    // 2. Add fallback listeners to trigger play on first interaction
    document.addEventListener('click', tryPlay);
    document.addEventListener('keydown', tryPlay);

    // Event listeners
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleNext);
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('keydown', tryPlay);
    };
  }, []);

  // Handle song changes
  useEffect(() => {
    if (audioRef.current) {
      // Only change source if it's different (initially handled by mount effect)
      if (!audioRef.current.src.includes(encodeURI(currentSong.file))) {
         audioRef.current.src = currentSong.file;
         if (isPlaying) {
             audioRef.current.play().catch(e => console.log("Play error:", e));
         }
      }
    }
  }, [currentSongIndex]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
            console.log("Play prevented:", e);
            setIsPlaying(false); // Revert state if play fails
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      
      {/* Playlist Popover */}
      <div className={`origin-bottom-left transition-all duration-300 ${
          showPlaylist ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none h-0'
      }`}>
          <div className="bg-void-card/90 backdrop-blur-xl border border-sakura/20 rounded-2xl p-4 w-64 shadow-2xl mb-2">
             <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                 <ListMusic size={16} className="text-sakura" />
                 <span className="text-white font-bold text-sm">播放清單</span>
             </div>
             <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-sakura/20">
                 {MUSIC_PLAYLIST.map((song, idx) => (
                     <button
                        key={idx}
                        onClick={() => {
                            setCurrentSongIndex(idx);
                            setIsPlaying(true);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between group ${
                            currentSongIndex === idx 
                            ? 'bg-sakura/20 text-sakura' 
                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                        }`}
                     >
                        <span className="truncate">{song.title}</span>
                        {currentSongIndex === idx && <div className="w-2 h-2 rounded-full bg-sakura animate-pulse"></div>}
                     </button>
                 ))}
             </div>
          </div>
      </div>

      {/* Main Player Control */}
      <div 
        className={`relative bg-void-card/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-500 flex items-center overflow-hidden ${
          isExpanded ? 'w-80 pr-6' : 'w-14 hover:w-[18rem] pr-0 hover:pr-6'
        } h-14 group`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
            setIsExpanded(false);
            setShowPlaylist(false);
        }}
      >
         {/* Disc / Cover Art */}
         <div 
            className="absolute left-0 top-0 w-14 h-14 rounded-full bg-black flex items-center justify-center z-20 border-2 border-void-card cursor-pointer"
            onClick={togglePlay}
         >
             <div className={`w-full h-full rounded-full overflow-hidden relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-sakura/80 to-purple-600/80"></div>
                 {/* Vinyl Grooves */}
                 <div className="absolute inset-0 rounded-full border-[10px] border-black/10"></div>
                 <div className="absolute inset-0 rounded-full border-[4px] border-black/20 m-3"></div>
                 {/* Center Label */}
                 <div className="absolute inset-0 m-auto w-4 h-4 bg-void-card rounded-full border border-sakura/30"></div>
             </div>
             
             {/* Status Icon Overlay */}
             <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                 {isPlaying ? <Pause size={16} className="text-white fill-white" /> : <Play size={16} className="text-white fill-white ml-1" />}
             </div>
         </div>

         {/* Controls & Info */}
         <div className="flex-1 flex items-center justify-between pl-16 overflow-hidden">
             <div className="flex flex-col min-w-0 mr-4">
                 <span className="text-white font-bold text-xs truncate font-tech">
                    {currentSong?.title || "Unknown Track"}
                 </span>
                 <div className="flex items-center gap-1 h-3">
                     {/* Mini Visualizer */}
                     {isPlaying ? (
                         <div className="flex items-end gap-0.5 h-full">
                             {[...Array(5)].map((_, i) => (
                                 <div 
                                    key={i} 
                                    className="w-0.5 bg-sakura rounded-t-sm animate-visualizer"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                 ></div>
                             ))}
                         </div>
                     ) : (
                         <span className="text-[10px] text-gray-500">Paused</span>
                     )}
                 </div>
             </div>

             <div className="flex items-center gap-3">
                 <button onClick={() => setShowPlaylist(!showPlaylist)} className="text-gray-400 hover:text-sakura transition-colors">
                     <ListMusic size={16} />
                 </button>
                 <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors">
                     <SkipBack size={16} />
                 </button>
                 <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors">
                     <SkipForward size={16} />
                 </button>
             </div>
         </div>
      </div>

    </div>
  );
};

export default MusicPlayer;
