
export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}

export interface WorldItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export type ModCategory = 'Magic' | 'Tech' | 'Adventure' | 'Decoration' | 'QoL' | 'System';

export interface ModItem {
  name: string;
  description: string;
  category: ModCategory;
  url?: string; // Link to CurseForge or Modrinth
  important?: boolean;
}

export interface CommandItem {
  command: string;
  description: string;
  usage?: string;
  maintenance?: boolean;
}

export interface SongItem {
  title: string;
  file: string; // path relative to public root, e.g., "/mp3/song.mp3"
  artist?: string;
}

// API Response Types

export interface ApiModItem {
  name: string;
  authors?: string[];
  version?: string;
  filename: string;
  fileName?: string; // API sometimes returns fileName
  downloadUrl: string;
  download?: string; // Added to support legacy/alternative API field
  sha1?: string;
  size?: number;
  mtime?: number;
  path?: string; // For ofolder files
}

export interface ApiModsResponse {
  modsHash: string;
  updateAt: string;
  mods: ApiModItem[];
}

export type FolderType = 'mods' | 'client-mods' | 'ofolder';

export interface FolderItem {
  name: string;
  path: string;
}

// Server Status Types
export interface ServerPlayerSample {
  id: string;
  name: string;
}

export interface ServerPlayers {
  max: number;
  online: number;
  sample?: ServerPlayerSample[];
}

export interface ServerVersion {
  name: string;
  protocol: number;
}

export interface ServerStatus {
  description?: string | { text: string };
  players?: ServerPlayers;
  version?: ServerVersion;
  error?: string; // For error responses
}
