export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface Weapon {
  id: number;
  name: string;
  type: string;
  rarity: Rarity;
  damage: number;
  price: number;
  image: string;
  description: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export type Tab = "home" | "spin" | "shop" | "inventory" | "upgrade" | "quests" | "profile" | "leaderboard";

export const RARITY_CONFIG: Record<Rarity, { label: string; color: string; textClass: string; chance: number; bg: string }> = {
  common:    { label: "Обычное",     color: "#9ca3af", textClass: "text-gray-400",   chance: 60, bg: "rgba(156,163,175,0.1)" },
  rare:      { label: "Редкое",      color: "#3b82f6", textClass: "text-blue-400",   chance: 25, bg: "rgba(59,130,246,0.1)"  },
  epic:      { label: "Эпическое",   color: "#a855f7", textClass: "text-purple-400", chance: 12, bg: "rgba(168,85,247,0.1)"  },
  legendary: { label: "Легендарное", color: "#f59e0b", textClass: "text-yellow-400", chance: 3,  bg: "rgba(245,158,11,0.1)"  },
};

const IMG_CYAN   = "https://cdn.poehali.dev/projects/716b57f9-bc9a-4523-bf38-7c54b4031542/files/80bd5b64-1b1c-4de1-8f3f-21d3cce49f0f.jpg";
const IMG_PURPLE = "https://cdn.poehali.dev/projects/716b57f9-bc9a-4523-bf38-7c54b4031542/files/5ffa6217-832b-4372-a0f1-1b239eaa597d.jpg";
const IMG_GOLD   = "https://cdn.poehali.dev/projects/716b57f9-bc9a-4523-bf38-7c54b4031542/files/bcd9ef51-33bb-4852-aa3f-f16cc26fe855.jpg";

export const ALL_WEAPONS: Weapon[] = [
  { id: 1,  name: "Плазма-9",          type: "Пистолет",   rarity: "common",    damage: 120,  price: 200,  image: IMG_CYAN,   description: "Стандартный плазменный пистолет НКО" },
  { id: 2,  name: "Нейро-Хлыст",       type: "Холодное",   rarity: "common",    damage: 95,   price: 150,  image: IMG_PURPLE, description: "Кибернетический хлыст из волокна" },
  { id: 3,  name: "Разрядник-Т",       type: "Пистолет",   rarity: "common",    damage: 140,  price: 180,  image: IMG_CYAN,   description: "Электрический разрядник ближнего боя" },
  { id: 4,  name: "ИКС-Карабин",       type: "Винтовка",   rarity: "rare",      damage: 280,  price: 800,  image: IMG_CYAN,   description: "Снайперская винтовка с AI-прицелом" },
  { id: 5,  name: "Фотонный Щит",      type: "Защита",     rarity: "rare",      damage: 0,    price: 600,  image: IMG_PURPLE, description: "Голографический энергощит" },
  { id: 6,  name: "Нано-Клинок",       type: "Холодное",   rarity: "rare",      damage: 320,  price: 950,  image: IMG_CYAN,   description: "Клинок из наноуглерода" },
  { id: 7,  name: "Теневой Клинок",    type: "Холодное",   rarity: "epic",      damage: 520,  price: 2500, image: IMG_GOLD,   description: "Клинок из тёмной материи" },
  { id: 8,  name: "Квантовая Пушка",   type: "Тяжёлое",    rarity: "epic",      damage: 680,  price: 3200, image: IMG_CYAN,   description: "Пушка разрывает квантовую ткань" },
  { id: 9,  name: "Молния Зевса",      type: "Энергетика", rarity: "legendary", damage: 1200, price: 9999, image: IMG_GOLD,   description: "Оружие богов, перекованное машинами" },
  { id: 10, name: "Омега-Разрушитель", type: "Тяжёлое",    rarity: "legendary", damage: 1500, price: 9999, image: IMG_GOLD,   description: "Прототип из секретной лаборатории" },
];

export const SHOP_WEAPONS: Weapon[] = [
  { id: 101, name: "Плазма-9",        type: "Пистолет",   rarity: "common",    damage: 120,  price: 200,  image: IMG_CYAN,   description: "Стандартный плазменный пистолет" },
  { id: 102, name: "ИКС-Карабин",     type: "Винтовка",   rarity: "rare",      damage: 280,  price: 800,  image: IMG_CYAN,   description: "Снайперская винтовка с AI-прицелом" },
  { id: 103, name: "Теневой Клинок",  type: "Холодное",   rarity: "epic",      damage: 520,  price: 2500, image: IMG_GOLD,   description: "Клинок из тёмной материи" },
  { id: 104, name: "Молния Зевса",    type: "Энергетика", rarity: "legendary", damage: 1200, price: 9999, image: IMG_GOLD,   description: "Оружие богов" },
  { id: 105, name: "Нейро-Хлыст",    type: "Холодное",   rarity: "common",    damage: 95,   price: 150,  image: IMG_PURPLE, description: "Кибернетический хлыст" },
  { id: 106, name: "Квантовая Пушка", type: "Тяжёлое",    rarity: "epic",      damage: 680,  price: 3200, image: IMG_CYAN,   description: "Разрывает квантовую ткань" },
];

export const LEADERS = [
  { rank: 1,  name: "CYPHER_X",   coins: 48200, weapons: 47, legendary: 5 },
  { rank: 2,  name: "NEON_BLADE", coins: 39500, weapons: 38, legendary: 3 },
  { rank: 3,  name: "GHOST_7",    coins: 31000, weapons: 29, legendary: 2 },
  { rank: 4,  name: "PHANTOM",    coins: 25800, weapons: 24, legendary: 2 },
  { rank: 5,  name: "NETRUNNER",  coins: 19200, weapons: 18, legendary: 1 },
  { rank: 6,  name: "SHADOW_OPS", coins: 14500, weapons: 14, legendary: 1 },
  { rank: 7,  name: "CRIMSON",    coins: 11200, weapons: 11, legendary: 0 },
  { rank: 8,  name: "VECTOR",     coins: 8900,  weapons: 9,  legendary: 0 },
  { rank: 9,  name: "BYTE_WOLF",  coins: 5600,  weapons: 6,  legendary: 0 },
  { rank: 10, name: "ВЫ",         coins: 1500,  weapons: 0,  legendary: 0 },
];

export const UPGRADE_RARITIES: Rarity[] = ["common", "rare", "epic"];
export const NEXT_RARITY: Record<Rarity, Rarity | null> = { common: "rare", rare: "epic", epic: "legendary", legendary: null };
export const UPGRADE_COST: Record<Rarity, number> = { common: 100, rare: 400, epic: 1200, legendary: 0 };

export function getRarityByChance(): Rarity {
  const roll = Math.random() * 100;
  if (roll < 3) return "legendary";
  if (roll < 15) return "epic";
  if (roll < 40) return "rare";
  return "common";
}

export function getRandomWeaponByRarity(rarity: Rarity): Weapon {
  const pool = ALL_WEAPONS.filter(w => w.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
