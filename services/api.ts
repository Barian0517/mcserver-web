
import { API_BASE_URL } from '../constants';
import { ApiModItem, ApiModsResponse, FolderType, ServerStatus } from './types';

export const fetchOFolders = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ofolder/folders?only-name=1&type=json`);
    if (!response.ok) return [];
    
    const data = await response.json();
    // Data format: { "/files/config/": "config", ... }
    return Object.values(data);
  } catch (error) {
    console.error("Failed to fetch folders:", error);
    return [];
  }
};

export const fetchModList = async (folder: FolderType, subFolder?: string): Promise<ApiModItem[]> => {
  try {
    let url = '';
    
    if (folder === 'mods' || folder === 'client-mods') {
      url = `${API_BASE_URL}/${folder}?type=json`;
    } else if (folder === 'ofolder') {
      if (subFolder) {
        url = `${API_BASE_URL}/ofolder/${subFolder}?type=json`;
      } else {
         // Fallback if needed, but we usually use fetchOFolders for the root of ofolder
        url = `${API_BASE_URL}/ofolder?type=json`;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const data = await response.json();

    // Handle 'mods' and 'client-mods' structure
    if (folder === 'mods' || folder === 'client-mods') {
      // The API returns { modsHash: ..., mods: [...] }
      return (data as ApiModsResponse).mods || [];
    } 
    
    // Handle 'ofolder' structure
    if (folder === 'ofolder') {
      // Based on docs and typical usage, it might return nested arrays [[{file}]]
      if (Array.isArray(data)) {
        return data.flat(Infinity) as ApiModItem[]; 
      }
      
      // Fallback: If it returns an object with arrays
      const values = Object.values(data);
      let items: ApiModItem[] = [];
      for (const val of values) {
        if (Array.isArray(val)) {
             items = items.concat(val.flat(Infinity));
        }
      }
      return items;
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch ${folder} list:`, error);
    return [];
  }
};

export const getZipDownloadUrl = (folder: FolderType, subFolder?: string): string => {
  if (folder === 'ofolder' && subFolder) {
    return `${API_BASE_URL}/ofolder/${subFolder}/zip`;
  }
  if (folder === 'ofolder') {
      return `${API_BASE_URL}/ofolder/zip`;
  }
  return `${API_BASE_URL}/${folder}/zip`;
};

export const fetchServerStatus = async (): Promise<ServerStatus | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    // Construct the URL directly as requested: /ping/?type=json
    const url = `${API_BASE_URL}/ping/?type=json`;

    const response = await fetch(url, { signal: controller.signal });
    
    if (!response.ok) {
        return { error: `HTTP ${response.status}` };
    }
    
    const data = await response.json();
    return data as ServerStatus;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { error: "Ping Timeout (25s)" };
    }
    console.warn("Server status fetch failed:", error.message || error);
    return { error: "Connection Failed" };
  } finally {
    clearTimeout(timeoutId);
  }
};
