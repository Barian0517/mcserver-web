
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Download, Search, FileArchive, HardDrive, Loader2, File, Calendar, User, Folder, ArrowLeft, ChevronRight, AlertTriangle, Home as HomeIcon } from 'lucide-react';
import { FolderType, ApiModItem } from '../services/types';
import { fetchModList, fetchOFolders, getZipDownloadUrl } from '../services/api';

const Mods: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FolderType>('mods');
  const [currentRootFolder, setCurrentRootFolder] = useState<string | null>(null); // e.g. "config"
  const [currentBrowsePath, setCurrentBrowsePath] = useState<string>(''); // e.g. "biomeswevegone/structures"
  
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<ApiModItem[]>([]);
  const [rootFolders, setRootFolders] = useState<string[]>([]); // Top level folders for ofolder
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const tabs: { id: FolderType; label: string; icon: React.ReactNode }[] = [
    { id: 'mods', label: '伺服器模組', icon: <Box size={16} /> },
    { id: 'client-mods', label: '客戶端模組', icon: <HardDrive size={16} /> },
    { id: 'ofolder', label: '其他檔案', icon: <FileArchive size={16} /> },
  ];

  // Reset state when tab changes
  useEffect(() => {
    setSearchTerm('');
    setItems([]);
    setRootFolders([]);
    setCurrentRootFolder(null);
    setCurrentBrowsePath('');
    setError(false);
  }, [activeTab]);

  // Fetch Data
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // Case 1: Other Files - Root List
        if (activeTab === 'ofolder' && !currentRootFolder) {
          const folderData = await fetchOFolders();
          if (isMounted) setRootFolders(folderData);
        } 
        // Case 2: Mods, Client Mods, or Inside an 'ofolder' root
        else {
          // For ofolder, we fetch the entire file tree of that root folder
          const targetFolder = activeTab === 'ofolder' ? currentRootFolder : undefined;
          const fileData = await fetchModList(activeTab, targetFolder || undefined);
          if (isMounted) setItems(fileData);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, [activeTab, currentRootFolder]);

  // Filter and Organize Data
  const { currentFiles, currentFolders } = useMemo(() => {
    // 1. Basic Search Filter
    let filtered = items;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = items.filter(item => {
        const name = item.name || item.filename || item.fileName || '';
        return name.toLowerCase().includes(term);
      });
      // If searching, we flatten the view (show all matching files)
      return { currentFiles: filtered, currentFolders: [] };
    }

    // 2. Mods/Client Mods (Flat List)
    if (activeTab !== 'ofolder') {
      return { currentFiles: filtered, currentFolders: [] };
    }

    // 3. Other Files (Folder Navigation)
    if (!currentRootFolder) return { currentFiles: [], currentFolders: [] };

    const folders = new Set<string>();
    const files: ApiModItem[] = [];

    // Construct the prefix to match based on current depth
    // path usually looks like "config/sub/file.txt"
    // prefix would be "config/" or "config/sub/"
    const prefix = currentBrowsePath 
      ? `${currentRootFolder}/${currentBrowsePath}/` 
      : `${currentRootFolder}/`;

    filtered.forEach(item => {
      const path = item.path || '';
      if (!path.startsWith(prefix)) return;

      const relativePath = path.substring(prefix.length);
      const parts = relativePath.split('/');

      if (parts.length > 1) {
        // It's a folder
        folders.add(parts[0]);
      } else {
        // It's a file in current directory
        files.push(item);
      }
    });

    return { 
      currentFiles: files.sort((a, b) => (a.filename || '').localeCompare(b.filename || '')), 
      currentFolders: Array.from(folders).sort() 
    };
  }, [items, searchTerm, activeTab, currentRootFolder, currentBrowsePath]);

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Navigation Handlers
  const handleRootFolderClick = (folderName: string) => {
    setCurrentRootFolder(folderName);
    setCurrentBrowsePath('');
  };

  const handleSubFolderClick = (subFolderName: string) => {
    setCurrentBrowsePath(prev => prev ? `${prev}/${subFolderName}` : subFolderName);
  };

  const handleBack = () => {
    if (currentBrowsePath) {
      // Go up one level
      const parts = currentBrowsePath.split('/');
      parts.pop();
      setCurrentBrowsePath(parts.join('/'));
    } else {
      // Go back to root folder list
      setCurrentRootFolder(null);
    }
  };

  const getDownloadPath = () => {
    if (activeTab === 'ofolder' && currentRootFolder) {
      return currentBrowsePath 
        ? `${currentRootFolder}/${currentBrowsePath}`
        : currentRootFolder;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0d] animate-fade-in pb-20">
       {/* Header */}
      <div className="relative h-[40vh] overflow-hidden flex flex-col items-center justify-center bg-void-card border-b border-white/5">
         <div className="absolute inset-0 opacity-20">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631624215749-b10b3ae7b13c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-void-bg/0 to-[#0a0a0d]"></div>
         </div>
         <div className="relative z-10 text-center px-4 mt-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 font-tech">
              檔案下載 <span className="text-sakura">DOWNLOADS</span>
            </h1>
            <p className="text-gray-400">瀏覽伺服器模組、設定檔與資源包</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
        
        {/* Controls Panel */}
        <div className="bg-void-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-xl flex flex-col gap-6">
            
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-2 border-b border-white/5 pb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                            activeTab === tab.id 
                            ? 'bg-sakura text-void-bg shadow-[0_0_20px_rgba(255,183,197,0.4)]' 
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Left: Breadcrumbs / Back Button */}
                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                    {(currentRootFolder || (activeTab === 'ofolder' && currentRootFolder)) ? (
                        <button 
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors shrink-0"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-sm">{currentBrowsePath ? '上一層' : '返回目錄'}</span>
                        </button>
                    ) : null}

                    {activeTab === 'ofolder' && currentRootFolder && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm overflow-hidden">
                            <HomeIcon size={14} className="text-gray-600" />
                            <ChevronRight size={14} />
                            <span className={`font-mono font-bold ${!currentBrowsePath ? 'text-sakura' : ''}`}>
                                {currentRootFolder}
                            </span>
                            {currentBrowsePath.split('/').map((part, idx) => (
                                <React.Fragment key={idx}>
                                    <ChevronRight size={14} />
                                    <span className={`font-mono font-bold whitespace-nowrap ${
                                        idx === currentBrowsePath.split('/').length - 1 ? 'text-sakura' : ''
                                    }`}>
                                        {part}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Search & Download All */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full md:w-64">
                        <input 
                            type="text" 
                            placeholder="搜尋檔案..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-sakura/50 focus:ring-1 focus:ring-sakura/50 text-sm"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>

                    <a 
                      href={getZipDownloadUrl(activeTab, getDownloadPath())}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 text-sm whitespace-nowrap"
                    >
                        <FileArchive size={18} />
                        {currentBrowsePath ? `下載資料夾 (ZIP)` : '下載全部 (ZIP)'}
                    </a>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 text-sakura">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="text-gray-400 animate-pulse">正在與伺服器同步資料...</p>
           </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-20 text-red-400 bg-void-card/50 border border-red-500/20 rounded-2xl">
              <AlertTriangle size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-bold mb-2">無法載入列表</p>
              <p className="text-sm opacity-70">請檢查 API 連線狀態或稍後再試。</p>
           </div>
        ) : (
          <div className="animate-fade-in">
            
            {/* View: Root Folders (Only for 'ofolder' root with no search) */}
            {activeTab === 'ofolder' && !currentRootFolder && !searchTerm && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {rootFolders.map((folder, index) => (
                        <button 
                            key={index}
                            onClick={() => handleRootFolderClick(folder)}
                            className="group p-6 bg-void-card border border-white/5 rounded-2xl hover:border-yellow-500/50 hover:bg-white/[0.02] transition-all duration-300 flex items-center gap-4 text-left hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform">
                                <Folder size={24} className="fill-yellow-500/20" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg group-hover:text-yellow-400 transition-colors">{folder}</h3>
                                <p className="text-gray-600 text-xs font-mono mt-1">/files/{folder}/</p>
                            </div>
                            <ChevronRight className="ml-auto text-white/10 group-hover:text-yellow-500/50 transition-colors" size={20} />
                        </button>
                    ))}
                    {rootFolders.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">沒有可用的資料夾</div>
                    )}
                </div>
            )}

            {/* View: Mixed Content (Folders + Files) */}
            {(activeTab !== 'ofolder' || currentRootFolder || searchTerm) && (
                <div className="space-y-4">
                    
                    {/* Sub-folders Grid */}
                    {currentFolders.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                            {currentFolders.map((folder, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSubFolderClick(folder)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-void-card/50 border border-white/5 hover:bg-white/5 hover:border-yellow-500/30 transition-all group text-left"
                                >
                                    <Folder size={18} className="text-yellow-500 fill-yellow-500/10 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white truncate">{folder}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Files List */}
                    {currentFiles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentFiles.map((item, index) => (
                            <div 
                                key={index}
                                className="group relative p-4 rounded-xl bg-void-card border border-white/5 hover:border-sakura/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_-5px_rgba(0,0,0,0.5)] flex items-center gap-4 opacity-0 animate-slide-up"
                                style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${
                                    (item.name || '').toLowerCase().includes('zip') 
                                    ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                    : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                }`}>
                                    { (item.name || '').toLowerCase().includes('zip') ? <FileArchive size={20} /> : <File size={20} /> }
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-bold truncate text-sm group-hover:text-sakura transition-colors" title={item.name || item.filename}>
                                            {item.name || item.filename || item.fileName}
                                        </h3>
                                        {item.version && (
                                            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 border border-white/5 shrink-0">
                                                v{item.version}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                        {item.filename && item.filename !== item.name && (
                                            <span className="truncate max-w-[200px] opacity-70">{item.filename}</span>
                                        )}
                                        
                                        {item.authors && item.authors.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <User size={10} />
                                                {item.authors[0]}
                                            </span>
                                        )}

                                        {item.size && (
                                            <span>{formatSize(item.size)}</span>
                                        )}

                                        {item.mtime && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={10} />
                                                {new Date(item.mtime * 1000).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Download Button */}
                                <a 
                                    href={item.downloadUrl || item.download}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg bg-white/5 hover:bg-sakura hover:text-void-bg text-gray-400 transition-all shadow-lg group-hover:scale-105 shrink-0"
                                    title="下載此檔案"
                                >
                                    <Download size={18} />
                                </a>
                            </div>
                            ))}
                        </div>
                    ) : currentFolders.length === 0 && (
                         <div className="py-20 text-center text-gray-500">
                            <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                                <Search size={32} />
                            </div>
                            <p>此資料夾為空或找不到符合 "{searchTerm}" 的檔案。</p>
                        </div>
                    )}
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mods;
