
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
