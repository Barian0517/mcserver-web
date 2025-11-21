
import { WorldItem, CommandItem, SongItem, ModItem } from './services/types';

// Server IPs
export const SERVER_IP = "closingsongserver.barian.moe";
export const SERVER_VERSION = "Forge 1.20.1";
export const DISCORD_LINK = "https://discord.gg/VE3htXzX"; 
export const CONTACT_EMAIL = "barianjapan@gmail.com";

// API Base URL
export const API_BASE_URL = "https://mc-api.yuaner.tw";

// Worlds Data
export const WORLDS: WorldItem[] = [
  {
    id: 'overworld',
    title: "原版維度 (Overworld)",
    description: "我們在服務器中加入了Biomes O' Plenty 與 Oh The Biomes We've Gone 等新增生態的模組，以及各式各樣豐富世界生成的模組 你可以在這裡探索更多新奇的結構與生態",
    image: "./img/Worlds/overworld.jpg",
    tags: ["Overworld", "nether", "the_end"]
  },
  {
    id: 'aether',
    title: "天境 (The Aether)",
    description: "傳說中的天堂模組。使用螢石搭建傳送門並用水桶啟動。探索雲端的島嶼，到傳說中的神殿擊敗boss獲得屬於你的強力裝備吧。",
    image: "./img/Worlds/aether.webp",
    tags: ["天空維度", "飛行", "冒險"]
  },
  {
    id: 'twilight',
    title: "暮色森林 (Twilight Forest)",
    description: "永夜的神秘森林。在 2x2 水池邊種花並丟入鑽石開啟傳送門。按順序挑戰娜迦、巫妖直到冰雪女王。",
    image: "./img/Worlds/twili.jpg",
    tags: ["BOSS Rush", "迷宮", "魔法"]
  },
  {
    id: 'deeperdarker',
    title: "幽邃黑暗 (Deeper and Darker)",
    description: "透過深闇之域的傳送門進入「彼方」。一個比深闇更黑暗、更危險的維度。",
    image: "./img/Worlds/deepdarker.webp",
    tags: ["潛聲守衛", "恐怖", "探索"]
  }
];

// Commands
export const COMMANDS: CommandItem[] = [
  { command: "/register <密碼> <確認密碼>", description: "首次進入伺服器時，註冊你的帳號。", usage: "/register 123456 123456", maintenance: true },
  { command: "/login <密碼>", description: "登入你的帳號。", usage: "/login 123456", maintenance: true },
  { command: "/sethome <名稱>", description: "在當前位置設置一個家。", usage: "/sethome base" },
  { command: "/home <名稱>", description: "傳送到已設置的家。", usage: "/home base" },
  { command: "/back", description: "返回上一次傳送前的位置（包含死亡地點）。", usage: "/back" },
  { command: "/tpa <玩家名>", description: "請求傳送到某位玩家身邊。", usage: "/tpa PlayerName" },
  { command: "/tpaccept", description: "接受傳送請求。", usage: "/tpaccept" },
  { command: "/warp <地點>", description: "傳送到公共設施或地標。", usage: "/warp shop" },
  { command: "/skin set <名稱/URL>", description: "設定你的皮膚 (SkinRestorer)。", usage: "/skin set Notchs" }
];

// Playlist configuration
export const MUSIC_PLAYLIST: SongItem[] = [
  {
    title: "Minecraft Volume Alpha - 13 - Wet Hands",
    file: "./mp3/Minecraft Volume Alpha - 13 - Wet Hands.mp3", 
    artist: "c418"
  },
];

// Featured Mods for ModList component
export const MODS_AND_PLUGINS: ModItem[] = [
  {
    name: "Iron's Spells 'n Spellbooks",
    description: "為遊戲添加了豐富的魔法系統。探索世界收集法術卷軸，製作法術書，成為強大的戰鬥法師。",
    category: "Magic",
    url: "https://www.curseforge.com/minecraft/mc-mods/irons-spells-n-spellbooks",
    important: true
  },
  {
    name: "Mekanism",
    description: "老牌且強大的科技模組。從基礎的礦物處理到核反應爐，甚至是機甲裝備。",
    category: "Tech",
    url: "https://www.curseforge.com/minecraft/mc-mods/mekanism",
    important: true
  },
  {
    name: "Create",
    description: "機械動力。利用齒輪、傳送帶與動力組件，搭建全自動化的工廠與機關。",
    category: "Tech",
    url: "https://www.curseforge.com/minecraft/mc-mods/create"
  },
  {
    name: "The Aether",
    description: "天境模組。在雲端之上的島嶼冒險，挑戰女武神與太陽神。",
    category: "Adventure",
    url: "https://www.curseforge.com/minecraft/mc-mods/aether"
  },
  {
    name: "Twilight Forest",
    description: "暮色森林。進入充滿魔法與怪物的永夜森林，挑戰娜迦、巫妖等強大Boss。",
    category: "Adventure",
    url: "https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest"
  },
  {
    name: "Biomes O' Plenty",
    description: "超多生物群系。為世界添加了數十種全新的生態域，豐富探索體驗。",
    category: "Adventure",
    url: "https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty"
  },
  {
    name: "Macaw's Furniture",
    description: "更多家具。包含椅子、桌子、衣櫃等豐富的裝飾方塊。",
    category: "Decoration",
    url: "https://www.curseforge.com/minecraft/mc-mods/macaws-furniture"
  },
  {
    name: "SlashBlade",
    description: "拔刀劍。帥氣的日本刀模組，透過連段攻擊斬殺敵人。",
    category: "Magic",
    url: "https://www.curseforge.com/minecraft/mc-mods/slashblade"
  },
  {
    name: "Refined Storage",
    description: "精緻倉儲。將成千上萬的物品數位化儲存，並可無線存取。",
    category: "QoL",
    url: "https://www.curseforge.com/minecraft/mc-mods/refined-storage",
    important: true
  },
  {
    name: "Jade",
    description: "顯示方塊資訊。看向方塊或生物時顯示詳細數據。",
    category: "System",
    url: "https://www.curseforge.com/minecraft/mc-mods/jade"
  },
  {
    name: "Xaero's Minimap",
    description: "小地圖模組。提供即時的地圖顯示與路徑點功能。",
    category: "System",
    url: "https://www.curseforge.com/minecraft/mc-mods/xaeros-minimap"
  }
];

// AI System Instruction
export const AI_SYSTEM_INSTRUCTION = `
你現在是「幽影櫻 AI 助手」，是「幽影櫻 Forge 伺服器」的官方 AI 指導員。
你的個性是優雅、知識淵博且帶有日系奇幻風格的。

伺服器資訊：
1. **基本資料**:
   - 版本: Forge 1.20.1
   - IP: ${SERVER_IP}
   - 風格: 科技 x 魔法 x 冒險。

2. **系統**:
   - 模組列表現已改為動態從 API 獲取，包含伺服器模組、客戶端模組與設定檔。
   - 玩家可以透過官網直接下載模組包 (ZIP) 或單一檔案。

3. **常用指令**:
   - /register, /login (目前維修中), /sethome, /home, /tpa, /back.
   
請保持回答簡潔，並適當使用表情符號 (🌸, ⚔️, 🔮, ⚙️)。
`;
