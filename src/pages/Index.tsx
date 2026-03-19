import { useState } from "react";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";
type IconName = keyof typeof LucideIcons;

type Rarity = "common" | "rare" | "epic" | "legendary";

interface Weapon {
  id: number;
  name: string;
  type: string;
  rarity: Rarity;
  damage: number;
  price: number;
  image: string;
  description: string;
}

interface Quest {
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

const RARITY_CONFIG: Record<Rarity, { label: string; color: string; textClass: string; chance: number; bg: string }> = {
  common:    { label: "Обычное",     color: "#9ca3af", textClass: "text-gray-400",   chance: 60, bg: "rgba(156,163,175,0.1)" },
  rare:      { label: "Редкое",      color: "#3b82f6", textClass: "text-blue-400",   chance: 25, bg: "rgba(59,130,246,0.1)"  },
  epic:      { label: "Эпическое",   color: "#a855f7", textClass: "text-purple-400", chance: 12, bg: "rgba(168,85,247,0.1)"  },
  legendary: { label: "Легендарное", color: "#f59e0b", textClass: "text-yellow-400", chance: 3,  bg: "rgba(245,158,11,0.1)"  },
};

const IMG_CYAN  = "https://cdn.poehali.dev/projects/716b57f9-bc9a-4523-bf38-7c54b4031542/files/80bd5b64-1b1c-4de1-8f3f-21d3cce49f0f.jpg";
const IMG_PURPLE = "https://cdn.poehali.dev/projects/716b57f9-bc9a-4523-bf38-7c54b4031542/files/5ffa6217-832b-4372-a0f1-1b239eaa597d.jpg";
const IMG_GOLD  = "https://cdn.poehali.dev/projects/716b57f9-bc9a-4523-bf38-7c54b4031542/files/bcd9ef51-33bb-4852-aa3f-f16cc26fe855.jpg";

const ALL_WEAPONS: Weapon[] = [
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

const SHOP_WEAPONS: Weapon[] = [
  { id: 101, name: "Плазма-9",          type: "Пистолет",   rarity: "common",    damage: 120,  price: 200,  image: IMG_CYAN,   description: "Стандартный плазменный пистолет" },
  { id: 102, name: "ИКС-Карабин",       type: "Винтовка",   rarity: "rare",      damage: 280,  price: 800,  image: IMG_CYAN,   description: "Снайперская винтовка с AI-прицелом" },
  { id: 103, name: "Теневой Клинок",    type: "Холодное",   rarity: "epic",      damage: 520,  price: 2500, image: IMG_GOLD,   description: "Клинок из тёмной материи" },
  { id: 104, name: "Молния Зевса",      type: "Энергетика", rarity: "legendary", damage: 1200, price: 9999, image: IMG_GOLD,   description: "Оружие богов" },
  { id: 105, name: "Нейро-Хлыст",       type: "Холодное",   rarity: "common",    damage: 95,   price: 150,  image: IMG_PURPLE, description: "Кибернетический хлыст" },
  { id: 106, name: "Квантовая Пушка",   type: "Тяжёлое",    rarity: "epic",      damage: 680,  price: 3200, image: IMG_CYAN,   description: "Разрывает квантовую ткань" },
];

const LEADERS = [
  { rank: 1, name: "CYPHER_X",   coins: 48200, weapons: 47, legendary: 5 },
  { rank: 2, name: "NEON_BLADE", coins: 39500, weapons: 38, legendary: 3 },
  { rank: 3, name: "GHOST_7",    coins: 31000, weapons: 29, legendary: 2 },
  { rank: 4, name: "PHANTOM",    coins: 25800, weapons: 24, legendary: 2 },
  { rank: 5, name: "NETRUNNER",  coins: 19200, weapons: 18, legendary: 1 },
  { rank: 6, name: "SHADOW_OPS", coins: 14500, weapons: 14, legendary: 1 },
  { rank: 7, name: "CRIMSON",    coins: 11200, weapons: 11, legendary: 0 },
  { rank: 8, name: "VECTOR",     coins: 8900,  weapons: 9,  legendary: 0 },
  { rank: 9, name: "BYTE_WOLF",  coins: 5600,  weapons: 6,  legendary: 0 },
  { rank: 10, name: "ВЫ",        coins: 1500,  weapons: 0,  legendary: 0 },
];

type Tab = "home" | "spin" | "shop" | "inventory" | "upgrade" | "quests" | "profile" | "leaderboard";

function getRarityByChance(): Rarity {
  const roll = Math.random() * 100;
  if (roll < 3) return "legendary";
  if (roll < 15) return "epic";
  if (roll < 40) return "rare";
  return "common";
}

function getRandomWeaponByRarity(rarity: Rarity): Weapon {
  const pool = ALL_WEAPONS.filter(w => w.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

function WeaponCard({ weapon, onSell, compact = false }: { weapon: Weapon; onSell?: (w: Weapon) => void; compact?: boolean }) {
  const r = RARITY_CONFIG[weapon.rarity];
  return (
    <div className="relative rounded-sm overflow-hidden transition-all duration-300 hover:scale-105"
      style={{ background: "linear-gradient(135deg, rgba(10,15,28,0.98), rgba(7,11,20,1))", border: `1px solid ${r.color}55`, boxShadow: `0 0 12px ${r.color}22` }}>
      <div className="absolute top-0 right-0 px-2 py-0.5 text-xs font-orbitron font-bold"
        style={{ background: r.bg, color: r.color, borderLeft: `1px solid ${r.color}`, borderBottom: `1px solid ${r.color}`, fontSize: "9px" }}>
        {r.label.toUpperCase()}
      </div>
      <div className="relative">
        <img src={weapon.image} alt={weapon.name} className={`w-full object-cover ${compact ? "h-20" : "h-32"}`}
          style={{ filter: `saturate(1.2) drop-shadow(0 0 6px ${r.color}44)` }} />
        <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)" }} />
      </div>
      <div className="p-3">
        <div className="font-orbitron font-bold text-xs truncate mb-0.5" style={{ color: r.color }}>{weapon.name}</div>
        <div className="text-gray-600 mb-2 font-rajdhani" style={{ fontSize: "11px" }}>{weapon.type}</div>
        {!compact && <div className="text-gray-500 mb-3 font-rajdhani text-xs">{weapon.description}</div>}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-red-400" style={{ fontSize: "10px" }}>⚡</span>
            <span className="text-red-400 font-rajdhani font-semibold" style={{ fontSize: "11px" }}>{weapon.damage}</span>
          </div>
          {onSell && (
            <button onClick={() => onSell(weapon)} className="neon-btn-cyan rounded-sm font-orbitron" style={{ fontSize: "9px", padding: "2px 8px" }}>
              ПРОДАТЬ {Math.floor(weapon.price * 0.6)}◈
            </button>
          )}
          {!onSell && (
            <span className="font-orbitron font-bold" style={{ color: "#ffd700", fontSize: "11px" }}>◈{weapon.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [coins, setCoins] = useState(1500);
  const [inventory, setInventory] = useState<Weapon[]>([]);
  const [quests, setQuests] = useState<Quest[]>([
    { id: 1, title: "Первая кровь",       description: "Получи первое оружие через прокрутку", reward: 100,  progress: 0, total: 1, completed: false, claimed: false, icon: "Sword" },
    { id: 2, title: "Коллекционер",       description: "Собери 5 единиц оружия",              reward: 300,  progress: 0, total: 5, completed: false, claimed: false, icon: "Package" },
    { id: 3, title: "Охотник за редкими", description: "Получи редкое оружие",                reward: 250,  progress: 0, total: 1, completed: false, claimed: false, icon: "Star" },
    { id: 4, title: "Торговец",           description: "Продай 3 единицы оружия",             reward: 150,  progress: 0, total: 3, completed: false, claimed: false, icon: "ShoppingCart" },
    { id: 5, title: "Эпическая удача",    description: "Получи эпическое оружие",             reward: 500,  progress: 0, total: 1, completed: false, claimed: false, icon: "Zap" },
    { id: 6, title: "Легенда арсенала",   description: "Получи легендарное оружие",           reward: 1000, progress: 0, total: 1, completed: false, claimed: false, icon: "Crown" },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<Weapon | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalSpins, setTotalSpins] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [upgradeWeapon, setUpgradeWeapon] = useState<Weapon | null>(null);
  const [upgradeState, setUpgradeState] = useState<"idle" | "animating" | "success" | "fail">("idle");
  const SPIN_COST = 150;

  const UPGRADE_RARITIES: Rarity[] = ["common", "rare", "epic"];
  const NEXT_RARITY: Record<Rarity, Rarity | null> = { common: "rare", rare: "epic", epic: "legendary", legendary: null };
  const UPGRADE_COST: Record<Rarity, number> = { common: 100, rare: 400, epic: 1200, legendary: 0 };

  const handleUpgrade = () => {
    if (!upgradeWeapon) return;
    const nextRarity = NEXT_RARITY[upgradeWeapon.rarity];
    if (!nextRarity) return;
    const cost = UPGRADE_COST[upgradeWeapon.rarity];
    if (coins < cost) { notify("Недостаточно монет!", "error"); return; }
    setCoins(c => c - cost);
    setUpgradeState("animating");
    setTimeout(() => {
      const success = Math.random() < 0.25;
      if (success) {
        const pool = ALL_WEAPONS.filter(w => w.rarity === nextRarity);
        const newW: Weapon = { ...pool[Math.floor(Math.random() * pool.length)], id: Date.now() };
        setInventory(prev => {
          const next = prev.filter(w => w.id !== upgradeWeapon!.id);
          next.push(newW);
          triggerQuestCheck(next, soldCount, nextRarity);
          return next;
        });
        setUpgradeWeapon(newW);
        setUpgradeState("success");
        notify(`🔥 УЛУЧШЕНО до ${RARITY_CONFIG[nextRarity].label}!`, "success");
      } else {
        setInventory(prev => prev.filter(w => w.id !== upgradeWeapon!.id));
        setUpgradeWeapon(null);
        setUpgradeState("fail");
        notify("💀 Оружие уничтожено при улучшении!", "error");
      }
      setTimeout(() => setUpgradeState("idle"), 2000);
    }, 2000);
  };

  const notify = (text: string, type: "success" | "error" | "info" = "info") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const triggerQuestCheck = (newInventory: Weapon[], newSoldCount: number, gotRarity?: Rarity) => {
    setQuests(prev => prev.map(q => {
      if (q.claimed) return q;
      let p = q.progress;
      if (q.id === 1) p = Math.min(q.total, newInventory.length > 0 ? 1 : 0);
      if (q.id === 2) p = Math.min(q.total, newInventory.length);
      if (q.id === 3 && gotRarity === "rare") p = Math.min(q.total, q.progress + 1);
      if (q.id === 4) p = Math.min(q.total, newSoldCount);
      if (q.id === 5 && gotRarity === "epic") p = Math.min(q.total, q.progress + 1);
      if (q.id === 6 && gotRarity === "legendary") p = Math.min(q.total, q.progress + 1);
      const completed = p >= q.total;
      if (completed && !q.completed) {
        setTimeout(() => notify(`🏆 Задание "${q.title}" выполнено! +${q.reward}◈`, "success"), 600);
      }
      return { ...q, progress: p, completed };
    }));
  };

  const handleSpin = () => {
    if (coins < SPIN_COST) { notify("Недостаточно монет!", "error"); return; }
    if (isSpinning) return;
    setIsSpinning(true);
    setShowResult(false);
    setSpinResult(null);
    setCoins(c => c - SPIN_COST);
    setTotalSpins(s => s + 1);

    setTimeout(() => {
      const rarity = getRarityByChance();
      const base = getRandomWeaponByRarity(rarity);
      const weapon: Weapon = { ...base, id: Date.now() };
      setInventory(prev => {
        const next = [...prev, weapon];
        triggerQuestCheck(next, soldCount, rarity);
        return next;
      });
      setSpinResult(weapon);
      setIsSpinning(false);
      setShowResult(true);
    }, 2500);
  };

  const handleSell = (weapon: Weapon) => {
    const sellPrice = Math.floor(weapon.price * 0.6);
    setInventory(prev => {
      const next = prev.filter(w => w.id !== weapon.id);
      const newSold = soldCount + 1;
      setSoldCount(newSold);
      triggerQuestCheck(next, newSold);
      return next;
    });
    setCoins(c => c + sellPrice);
    notify(`Продано: ${weapon.name} за ${sellPrice}◈`, "success");
  };

  const handleBuy = (weapon: Weapon) => {
    if (coins < weapon.price) { notify("Недостаточно монет!", "error"); return; }
    setCoins(c => c - weapon.price);
    const w: Weapon = { ...weapon, id: Date.now() };
    setInventory(prev => {
      const next = [...prev, w];
      triggerQuestCheck(next, soldCount);
      return next;
    });
    notify(`Куплено: ${weapon.name}`, "success");
  };

  const handleClaimQuest = (quest: Quest) => {
    if (!quest.completed || quest.claimed) return;
    setCoins(c => c + quest.reward);
    setQuests(prev => prev.map(q => q.id === quest.id ? { ...q, claimed: true } : q));
    notify(`Получено +${quest.reward}◈`, "success");
  };

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: "home",        label: "Главная",  icon: "Home" },
    { id: "spin",        label: "Прокрут.", icon: "RotateCw" },
    { id: "shop",        label: "Магазин",  icon: "ShoppingBag" },
    { id: "inventory",   label: "Инвент.",  icon: "Package" },
    { id: "upgrade",     label: "Улучш.",   icon: "TrendingUp" },
    { id: "quests",      label: "Задания",  icon: "Target" },
    { id: "profile",     label: "Профиль",  icon: "User" },
    { id: "leaderboard", label: "Лидеры",   icon: "Trophy" },
  ];

  const rarityStats = {
    legendary: inventory.filter(w => w.rarity === "legendary").length,
    epic:      inventory.filter(w => w.rarity === "epic").length,
    rare:      inventory.filter(w => w.rarity === "rare").length,
    common:    inventory.filter(w => w.rarity === "common").length,
  };

  const notifColor = notification?.type === "success" ? "#00ff88" : notification?.type === "error" ? "#ff0055" : "#00f5ff";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#070b14", fontFamily: "'Rajdhani', sans-serif" }}>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-sm font-semibold text-sm animate-slide-in-up"
          style={{ background: `${notifColor}18`, border: `1px solid ${notifColor}`, color: notifColor, boxShadow: `0 0 20px ${notifColor}44`, fontFamily: "'Rajdhani', sans-serif" }}>
          {notification.text}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(7,11,20,0.97)", borderBottom: "1px solid rgba(0,245,255,0.2)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))", border: "1px solid rgba(0,245,255,0.5)" }}>
            <Icon name="Crosshair" size={16} style={{ color: "#00f5ff", filter: "drop-shadow(0 0 4px rgba(0,245,255,0.8))" }} />
          </div>
          <span className="font-orbitron font-black text-sm tracking-widest" style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.6)" }}>NEON ARMS</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
          style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.4)", boxShadow: "0 0 10px rgba(255,215,0,0.15)" }}>
          <span style={{ color: "#ffd700" }}>◈</span>
          <span className="font-orbitron font-black text-sm" style={{ color: "#ffd700" }}>{coins.toLocaleString()}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-24">

        {/* ─── HOME ─── */}
        {tab === "home" && (
          <div className="p-4 space-y-5 animate-fade-in">
            {/* Hero */}
            <div className="relative rounded-sm overflow-hidden p-6 text-center"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.07), rgba(191,0,255,0.07))", border: "1px solid rgba(0,245,255,0.3)", boxShadow: "0 0 30px rgba(0,245,255,0.08)" }}>
              <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)" }} />
              <div className="relative">
                <div className="text-5xl mb-3 animate-float">⚔️</div>
                <h1 className="font-orbitron font-black text-2xl mb-1" style={{ color: "#00f5ff", textShadow: "0 0 20px rgba(0,245,255,0.7)" }}>NEON ARMS</h1>
                <p className="text-gray-500 text-sm mb-5 font-rajdhani">Арсенал Будущего · Система Редкости</p>
                <button onClick={() => setTab("spin")} className="neon-btn-purple px-6 py-3 rounded-sm font-orbitron font-black text-sm tracking-wider">
                  ⚡ НАЧАТЬ ПРОКРУТКУ
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Монеты",    value: coins.toLocaleString(), icon: "Coins",    color: "#ffd700" },
                { label: "Оружий",    value: inventory.length,       icon: "Package",  color: "#00f5ff" },
                { label: "Прокруток", value: totalSpins,             icon: "RotateCw", color: "#bf00ff" },
              ].map(s => (
                <div key={s.label} className="rounded-sm p-3 text-center"
                  style={{ background: "rgba(10,15,28,0.9)", border: `1px solid ${s.color}33`, boxShadow: `0 0 10px ${s.color}11` }}>
                  <Icon name={s.icon as IconName} size={18} style={{ color: s.color, margin: "0 auto 4px", filter: `drop-shadow(0 0 4px ${s.color}88)` }} />
                  <div className="font-orbitron font-black text-xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-gray-600 font-rajdhani" style={{ fontSize: "11px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Rarity chances */}
            <div className="rounded-sm p-4" style={{ background: "rgba(10,15,28,0.9)", border: "1px solid rgba(0,245,255,0.15)" }}>
              <div className="font-orbitron font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "#00f5ff" }}>
                <Icon name="BarChart2" size={14} /> ШАНСЫ ВЫПАДЕНИЯ
              </div>
              <div className="space-y-2">
                {(["legendary", "epic", "rare", "common"] as Rarity[]).map(r => {
                  const cfg = RARITY_CONFIG[r];
                  return (
                    <div key={r} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-rajdhani font-semibold" style={{ color: cfg.color }}>{cfg.label}</div>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="h-full rounded-full" style={{ width: `${cfg.chance}%`, background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
                      </div>
                      <div className="w-8 text-right font-orbitron text-xs" style={{ color: cfg.color }}>{cfg.chance}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA row */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setTab("shop")} className="neon-btn-cyan py-3 rounded-sm font-orbitron font-bold text-xs tracking-wider">
                <Icon name="ShoppingBag" size={13} className="inline mr-1" /> МАГАЗИН
              </button>
              <button onClick={() => setTab("quests")} className="neon-btn-purple py-3 rounded-sm font-orbitron font-bold text-xs tracking-wider">
                <Icon name="Target" size={13} className="inline mr-1" /> ЗАДАНИЯ
              </button>
            </div>
          </div>
        )}

        {/* ─── SPIN ─── */}
        {tab === "spin" && (
          <div className="p-4 animate-fade-in">
            <h2 className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#00f5ff", textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>ПРОКРУТКА</h2>
            <p className="text-gray-500 text-sm mb-5 font-rajdhani">Стоимость: <span className="text-yellow-400 font-bold">{SPIN_COST}◈</span> · Баланс: <span className="text-yellow-400 font-bold">{coins}◈</span></p>

            {/* Machine */}
            <div className="rounded-sm overflow-hidden mb-5"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(191,0,255,0.05))", border: "1px solid rgba(0,245,255,0.3)", padding: "24px" }}>

              {/* Display */}
              <div className="h-52 flex items-center justify-center mb-5">
                {!showResult && !isSpinning && (
                  <div className="text-center">
                    <div className="text-6xl mb-3 animate-float">🎰</div>
                    <p className="text-gray-600 font-rajdhani text-sm">Нажми ЗАПУСТИТЬ для прокрутки</p>
                  </div>
                )}
                {isSpinning && (
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                        style={{ borderTopColor: "#00f5ff", boxShadow: "0 0 20px rgba(0,245,255,0.5)" }} />
                      <div className="absolute inset-4 rounded-full border-2 border-transparent animate-spin"
                        style={{ borderBottomColor: "#bf00ff", animationDirection: "reverse", animationDuration: "0.6s", boxShadow: "0 0 15px rgba(191,0,255,0.5)" }} />
                      <div className="absolute inset-9 flex items-center justify-center">
                        <Icon name="Crosshair" size={26} style={{ color: "#00f5ff", filter: "drop-shadow(0 0 6px #00f5ff)" }} />
                      </div>
                    </div>
                    <p className="font-orbitron text-sm animate-pulse-glow" style={{ color: "#00f5ff" }}>СКАНИРОВАНИЕ...</p>
                  </div>
                )}
                {showResult && spinResult && (
                  <div className="text-center animate-spin-reveal">
                    <div className="inline-block p-1 rounded-sm mb-3"
                      style={{ border: `2px solid ${RARITY_CONFIG[spinResult.rarity].color}`, boxShadow: `0 0 20px ${RARITY_CONFIG[spinResult.rarity].color}66, 0 0 40px ${RARITY_CONFIG[spinResult.rarity].color}22` }}>
                      <img src={spinResult.image} alt={spinResult.name} className="w-32 h-32 object-cover rounded-sm" />
                    </div>
                    <div className="font-orbitron font-black text-lg" style={{ color: RARITY_CONFIG[spinResult.rarity].color, textShadow: `0 0 10px ${RARITY_CONFIG[spinResult.rarity].color}` }}>
                      {spinResult.name}
                    </div>
                    <div style={{ color: RARITY_CONFIG[spinResult.rarity].color, fontSize: "11px", fontFamily: "'Rajdhani', sans-serif" }}>
                      {RARITY_CONFIG[spinResult.rarity].label.toUpperCase()} · {spinResult.type} · ⚡{spinResult.damage}
                    </div>
                    {spinResult.rarity === "legendary" && (
                      <div className="mt-2 font-orbitron text-xs animate-pulse-glow" style={{ color: "#ffd700" }}>✨ ЛЕГЕНДАРНОЕ ОРУЖИЕ ✨</div>
                    )}
                  </div>
                )}
              </div>

              {/* Rarity bar */}
              <div className="flex gap-0.5 mb-4 rounded-full overflow-hidden h-2">
                {(["common", "rare", "epic", "legendary"] as Rarity[]).map((r, i) => (
                  <div key={r} style={{ flex: [60, 25, 12, 3][i], background: RARITY_CONFIG[r].color, boxShadow: `0 0 4px ${RARITY_CONFIG[r].color}` }} />
                ))}
              </div>

              <button onClick={handleSpin} disabled={isSpinning || coins < SPIN_COST}
                className="w-full py-4 rounded-sm font-orbitron font-black text-sm tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,0,255,0.15))", border: "1px solid rgba(0,245,255,0.5)", color: "#00f5ff", boxShadow: "0 0 20px rgba(0,245,255,0.2)" }}>
                {isSpinning ? "ОБРАБОТКА..." : `⚡ ЗАПУСТИТЬ — ${SPIN_COST}◈`}
              </button>
            </div>

            {/* Recent */}
            {inventory.length > 0 && (
              <div>
                <div className="font-orbitron font-bold text-xs text-gray-500 mb-3">ПОСЛЕДНИЕ ПОЛУЧЕНИЯ</div>
                <div className="grid grid-cols-3 gap-2">
                  {[...inventory].reverse().slice(0, 3).map(w => (
                    <WeaponCard key={w.id} weapon={w} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── SHOP ─── */}
        {tab === "shop" && (
          <div className="p-4 animate-fade-in">
            <h2 className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#00f5ff", textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>МАГАЗИН</h2>
            <p className="text-gray-500 text-sm mb-5 font-rajdhani">Прямая покупка оружия · Баланс: <span className="text-yellow-400">{coins}◈</span></p>
            <div className="grid grid-cols-2 gap-3">
              {SHOP_WEAPONS.map(w => {
                const r = RARITY_CONFIG[w.rarity];
                return (
                  <div key={w.id} className="rounded-sm overflow-hidden flex flex-col"
                    style={{ background: "rgba(10,15,28,0.98)", border: `1px solid ${r.color}44`, boxShadow: `0 0 10px ${r.color}11` }}>
                    <div className="relative">
                      <img src={w.image} alt={w.name} className="w-full h-28 object-cover" />
                      <div className="absolute top-0 right-0 px-2 py-0.5 font-orbitron font-bold"
                        style={{ background: r.bg, color: r.color, borderLeft: `1px solid ${r.color}`, borderBottom: `1px solid ${r.color}`, fontSize: "9px" }}>
                        {r.label.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="font-orbitron font-bold text-xs truncate mb-0.5" style={{ color: r.color }}>{w.name}</div>
                      <div className="text-gray-600 text-xs font-rajdhani mb-3 flex-1">{w.type} · ⚡{w.damage}</div>
                      <div className="flex items-center justify-between">
                        <span className="font-orbitron font-black text-sm" style={{ color: "#ffd700" }}>◈{w.price}</span>
                        <button onClick={() => handleBuy(w)} disabled={coins < w.price}
                          className="neon-btn-cyan rounded-sm font-orbitron disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{ fontSize: "10px", padding: "3px 10px" }}>
                          КУПИТЬ
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── INVENTORY ─── */}
        {tab === "inventory" && (
          <div className="p-4 animate-fade-in">
            <h2 className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#00f5ff", textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>ИНВЕНТАРЬ</h2>
            <p className="text-gray-500 text-sm mb-4 font-rajdhani">{inventory.length} единиц оружия</p>

            {inventory.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4 opacity-20">📦</div>
                <p className="text-gray-600 font-rajdhani mb-1">Инвентарь пуст</p>
                <p className="text-gray-700 text-xs font-rajdhani mb-4">Получи оружие через прокрутку или купи в магазине</p>
                <button onClick={() => setTab("spin")} className="neon-btn-cyan px-5 py-2 rounded-sm font-orbitron text-xs">ПРОКРУТКА</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {(["legendary", "epic", "rare", "common"] as Rarity[]).map(r => (
                    <div key={r} className="rounded-sm p-2 text-center"
                      style={{ background: "rgba(10,15,28,0.9)", border: `1px solid ${RARITY_CONFIG[r].color}44` }}>
                      <div className="font-orbitron font-black text-lg" style={{ color: RARITY_CONFIG[r].color }}>{rarityStats[r]}</div>
                      <div className="font-rajdhani" style={{ color: RARITY_CONFIG[r].color, fontSize: "9px" }}>{RARITY_CONFIG[r].label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {inventory.map(w => <WeaponCard key={w.id} weapon={w} onSell={handleSell} />)}
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── QUESTS ─── */}
        {tab === "quests" && (
          <div className="p-4 animate-fade-in">
            <h2 className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#00f5ff", textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>ЗАДАНИЯ</h2>
            <p className="text-gray-500 text-sm mb-5 font-rajdhani">Выполняй задания — получай монеты</p>
            <div className="space-y-3">
              {quests.map(q => (
                <div key={q.id} className="rounded-sm p-4"
                  style={{ background: "rgba(10,15,28,0.9)", border: `1px solid ${q.completed ? "rgba(0,255,136,0.4)" : "rgba(0,245,255,0.15)"}`, opacity: q.claimed ? 0.4 : 1 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ background: q.completed ? "rgba(0,255,136,0.1)" : "rgba(0,245,255,0.08)", border: `1px solid ${q.completed ? "#00ff88" : "rgba(0,245,255,0.25)"}` }}>
                      <Icon name={q.icon as IconName} size={18} style={{ color: q.completed ? "#00ff88" : "#00f5ff" }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-orbitron font-bold text-xs" style={{ color: q.completed ? "#00ff88" : "#00f5ff" }}>{q.title}</div>
                      <div className="text-gray-500 text-xs font-rajdhani">{q.description}</div>
                    </div>
                    <div className="font-orbitron font-black text-sm text-yellow-400 flex-shrink-0">+{q.reward}◈</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (q.progress / q.total) * 100)}%`, background: q.completed ? "#00ff88" : "#00f5ff", boxShadow: `0 0 6px ${q.completed ? "#00ff88" : "#00f5ff"}` }} />
                    </div>
                    <span className="text-gray-600 text-xs font-rajdhani">{q.progress}/{q.total}</span>
                    {q.completed && !q.claimed && (
                      <button onClick={() => handleClaimQuest(q)} className="rounded-sm font-orbitron text-xs"
                        style={{ background: "rgba(0,255,136,0.12)", border: "1px solid #00ff88", color: "#00ff88", padding: "2px 10px" }}>
                        ЗАБРАТЬ
                      </button>
                    )}
                    {q.claimed && <span className="text-gray-700 text-xs font-orbitron">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── PROFILE ─── */}
        {tab === "profile" && (
          <div className="p-4 animate-fade-in">
            <div className="rounded-sm overflow-hidden p-6 text-center mb-5"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(191,0,255,0.06))", border: "1px solid rgba(0,245,255,0.25)" }}>
              <div className="w-20 h-20 rounded-sm mx-auto mb-3 flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,0,255,0.15))", border: "1px solid rgba(0,245,255,0.4)" }}>
                🥷
              </div>
              <div className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#00f5ff" }}>ИГРОК_777</div>
              <div className="text-gray-500 text-sm font-rajdhani">Охотник за оружием</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Монеты",      value: `${coins.toLocaleString()}◈`, color: "#ffd700" },
                { label: "Прокруток",   value: totalSpins,                    color: "#bf00ff" },
                { label: "Всего оружия", value: inventory.length,             color: "#00f5ff" },
                { label: "Легендарных", value: rarityStats.legendary,         color: "#f59e0b" },
                { label: "Эпических",   value: rarityStats.epic,              color: "#a855f7" },
                { label: "Редких",      value: rarityStats.rare,              color: "#3b82f6" },
              ].map(s => (
                <div key={s.label} className="rounded-sm p-3"
                  style={{ background: "rgba(10,15,28,0.9)", border: `1px solid ${s.color}33` }}>
                  <div className="font-orbitron font-black text-xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-gray-600 text-xs font-rajdhani">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-sm p-4" style={{ background: "rgba(10,15,28,0.9)", border: "1px solid rgba(0,245,255,0.15)" }}>
              <div className="font-orbitron font-bold text-sm mb-3" style={{ color: "#00f5ff" }}>СТАТИСТИКА</div>
              {totalSpins > 0 ? (
                <div className="space-y-2 text-sm font-rajdhani">
                  <div className="flex justify-between text-gray-500">
                    <span>Потрачено на прокрутки</span>
                    <span style={{ color: "#ff0055" }}>{(totalSpins * SPIN_COST).toLocaleString()}◈</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Ценность арсенала</span>
                    <span style={{ color: "#00f5ff" }}>{inventory.reduce((s, w) => s + w.price, 0).toLocaleString()}◈</span>
                  </div>
                  <div className="flex justify-between text-gray-500 border-t pt-2" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <span>Легенд. на 100 прокруток</span>
                    <span style={{ color: "#ffd700" }}>{((rarityStats.legendary / totalSpins) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm font-rajdhani">Начни прокрутку для статистики</p>
              )}
            </div>
          </div>
        )}

        {/* ─── UPGRADE ─── */}
        {tab === "upgrade" && (
          <div className="p-4 animate-fade-in">
            <h2 className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#ff6b00", textShadow: "0 0 12px rgba(255,107,0,0.6)" }}>УЛУЧШЕНИЕ</h2>
            <p className="text-gray-500 text-sm mb-5 font-rajdhani">
              <span style={{ color: "#00ff88" }}>25% успех</span> — повышает редкость · <span style={{ color: "#ff0055" }}>75% провал</span> — оружие уничтожается
            </p>

            {/* Weapon selector */}
            <div className="rounded-sm p-4 mb-4" style={{ background: "rgba(10,15,28,0.95)", border: "1px solid rgba(255,107,0,0.25)" }}>
              <div className="font-orbitron font-bold text-xs mb-3" style={{ color: "#ff6b00" }}>ВЫБЕРИ ОРУЖИЕ ДЛЯ УЛУЧШЕНИЯ</div>
              {inventory.filter(w => UPGRADE_RARITIES.includes(w.rarity)).length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2 opacity-20">⚗️</div>
                  <p className="text-gray-600 text-sm font-rajdhani">Нет оружия доступного для улучшения</p>
                  <p className="text-gray-700 text-xs font-rajdhani mt-1">Легендарное оружие улучшить нельзя</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {inventory.filter(w => UPGRADE_RARITIES.includes(w.rarity)).map(w => {
                    const r = RARITY_CONFIG[w.rarity];
                    const selected = upgradeWeapon?.id === w.id;
                    return (
                      <button key={w.id} onClick={() => { setUpgradeWeapon(selected ? null : w); setUpgradeState("idle"); }}
                        className="rounded-sm p-2 text-left transition-all duration-200"
                        style={{ background: selected ? `${r.color}18` : "rgba(7,11,20,0.8)", border: `1px solid ${selected ? r.color : `${r.color}44`}`, boxShadow: selected ? `0 0 12px ${r.color}44` : "none" }}>
                        <div className="flex items-center gap-2">
                          <img src={w.image} alt={w.name} className="w-8 h-8 object-cover rounded-sm flex-shrink-0" style={{ filter: `saturate(1.3)` }} />
                          <div className="min-w-0">
                            <div className="font-orbitron font-bold truncate" style={{ fontSize: "9px", color: r.color }}>{w.name}</div>
                            <div className="font-rajdhani text-gray-600" style={{ fontSize: "10px" }}>{r.label}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Upgrade panel */}
            {upgradeWeapon && (
              <div className="rounded-sm p-5" style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.06), rgba(255,0,85,0.06))", border: "1px solid rgba(255,107,0,0.4)", boxShadow: "0 0 20px rgba(255,107,0,0.1)" }}>
                {/* Before → After */}
                <div className="flex items-center justify-center gap-4 mb-5">
                  {/* Current */}
                  <div className="text-center flex-1">
                    <div className="inline-block p-1 rounded-sm mb-2"
                      style={{ border: `2px solid ${RARITY_CONFIG[upgradeWeapon.rarity].color}`, boxShadow: `0 0 10px ${RARITY_CONFIG[upgradeWeapon.rarity].color}44` }}>
                      <img src={upgradeWeapon.image} alt={upgradeWeapon.name} className="w-16 h-16 object-cover rounded-sm" />
                    </div>
                    <div className="font-orbitron font-bold" style={{ fontSize: "9px", color: RARITY_CONFIG[upgradeWeapon.rarity].color }}>{upgradeWeapon.name}</div>
                    <div className="font-rajdhani text-xs mt-0.5" style={{ color: RARITY_CONFIG[upgradeWeapon.rarity].color }}>{RARITY_CONFIG[upgradeWeapon.rarity].label}</div>
                  </div>

                  {/* Arrow + chance */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="font-orbitron font-black text-xs" style={{ color: "#00ff88" }}>25%</div>
                    <Icon name="ArrowRight" size={22} style={{ color: "#ff6b00", filter: "drop-shadow(0 0 6px rgba(255,107,0,0.8))" }} />
                    <div className="font-orbitron font-black text-xs" style={{ color: "#ff0055" }}>75%</div>
                  </div>

                  {/* Next rarity */}
                  {NEXT_RARITY[upgradeWeapon.rarity] && (() => {
                    const nextR = NEXT_RARITY[upgradeWeapon.rarity]!;
                    return (
                      <div className="text-center flex-1">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-sm mb-2"
                          style={{ border: `2px dashed ${RARITY_CONFIG[nextR].color}88`, background: `${RARITY_CONFIG[nextR].color}0a` }}>
                          <div className="text-2xl opacity-60">?</div>
                        </div>
                        <div className="font-orbitron font-bold" style={{ fontSize: "9px", color: RARITY_CONFIG[nextR].color }}>УЛУЧШЕНИЕ</div>
                        <div className="font-rajdhani text-xs mt-0.5" style={{ color: RARITY_CONFIG[nextR].color }}>{RARITY_CONFIG[nextR].label}</div>
                      </div>
                    );
                  })()}
                </div>

                {/* Risk bar */}
                <div className="mb-4">
                  <div className="flex rounded-full overflow-hidden h-2 mb-2">
                    <div className="h-full" style={{ width: "25%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }} />
                    <div className="h-full" style={{ width: "75%", background: "#ff0055", boxShadow: "0 0 8px #ff0055" }} />
                  </div>
                  <div className="flex justify-between font-rajdhani" style={{ fontSize: "10px" }}>
                    <span style={{ color: "#00ff88" }}>✓ Успех 25%</span>
                    <span style={{ color: "#ff0055" }}>✗ Уничтожение 75%</span>
                  </div>
                </div>

                {/* Animate state */}
                {upgradeState === "animating" && (
                  <div className="text-center mb-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                        style={{ borderTopColor: "#ff6b00", boxShadow: "0 0 16px rgba(255,107,0,0.7)", animationDuration: "0.4s" }} />
                      <div className="absolute inset-3 flex items-center justify-center">
                        <Icon name="Zap" size={18} style={{ color: "#ff6b00", filter: "drop-shadow(0 0 6px #ff6b00)" }} />
                      </div>
                    </div>
                    <p className="font-orbitron text-xs mt-2 animate-pulse" style={{ color: "#ff6b00" }}>УЛУЧШЕНИЕ...</p>
                  </div>
                )}
                {upgradeState === "success" && (
                  <div className="text-center mb-4 animate-scale-in">
                    <div className="text-3xl mb-1">🔥</div>
                    <p className="font-orbitron font-black text-sm" style={{ color: "#00ff88", textShadow: "0 0 12px #00ff88" }}>УСПЕХ!</p>
                  </div>
                )}
                {upgradeState === "fail" && (
                  <div className="text-center mb-4 animate-scale-in">
                    <div className="text-3xl mb-1">💀</div>
                    <p className="font-orbitron font-black text-sm" style={{ color: "#ff0055", textShadow: "0 0 12px #ff0055" }}>УНИЧТОЖЕНО</p>
                  </div>
                )}

                {/* Cost + button */}
                <div className="flex items-center justify-between gap-3">
                  <div className="font-rajdhani text-sm" style={{ color: "#9ca3af" }}>
                    Стоимость: <span className="font-bold" style={{ color: "#ffd700" }}>{UPGRADE_COST[upgradeWeapon.rarity]}◈</span>
                  </div>
                  <button
                    onClick={handleUpgrade}
                    disabled={upgradeState === "animating" || coins < UPGRADE_COST[upgradeWeapon.rarity]}
                    className="rounded-sm font-orbitron font-black text-xs tracking-wider px-5 py-2.5 transition-all duration-200"
                    style={{
                      background: upgradeState === "animating" ? "rgba(255,107,0,0.1)" : "linear-gradient(135deg, rgba(255,107,0,0.25), rgba(255,0,85,0.25))",
                      border: "1px solid #ff6b00",
                      color: upgradeState === "animating" ? "#4b5563" : "#ff6b00",
                      boxShadow: upgradeState !== "animating" ? "0 0 16px rgba(255,107,0,0.4)" : "none",
                      cursor: upgradeState === "animating" ? "not-allowed" : "pointer"
                    }}>
                    ⚗️ УЛУЧШИТЬ
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── LEADERBOARD ─── */}
        {tab === "leaderboard" && (
          <div className="p-4 animate-fade-in">
            <h2 className="font-orbitron font-black text-xl mb-0.5" style={{ color: "#00f5ff", textShadow: "0 0 12px rgba(0,245,255,0.5)" }}>ЛИДЕРБОРД</h2>
            <p className="text-gray-500 text-sm mb-5 font-rajdhani">Топ игроков по монетам</p>
            <div className="space-y-2">
              {LEADERS.map((l, i) => {
                const isMe = l.name === "ВЫ";
                const top3Colors = ["#ffd700", "#c0c0c0", "#cd7f32"];
                const isTop3 = i < 3;
                return (
                  <div key={l.rank} className="rounded-sm p-3 flex items-center gap-3"
                    style={{ background: "rgba(10,15,28,0.9)", border: `1px solid ${isMe ? "#00f5ff" : isTop3 ? `${top3Colors[i]}44` : "rgba(0,245,255,0.1)"}`, boxShadow: isMe ? "0 0 10px rgba(0,245,255,0.15)" : "none" }}>
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center font-orbitron font-black text-sm flex-shrink-0"
                      style={{ background: isTop3 ? `${top3Colors[i]}18` : "rgba(255,255,255,0.03)", color: isTop3 ? top3Colors[i] : "#374151", border: `1px solid ${isTop3 ? `${top3Colors[i]}66` : "#1f2937"}` }}>
                      {isTop3 ? ["🥇","🥈","🥉"][i] : l.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-orbitron font-bold text-sm truncate" style={{ color: isMe ? "#00f5ff" : isTop3 ? top3Colors[i] : "#d1d5db" }}>{l.name}</div>
                      <div className="text-gray-600 font-rajdhani" style={{ fontSize: "11px" }}>{l.weapons} оружий · {l.legendary} легенд.</div>
                    </div>
                    <div className="font-orbitron font-black text-sm" style={{ color: "#ffd700" }}>{l.coins.toLocaleString()}◈</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 pt-2 pb-3"
        style={{ background: "rgba(7,11,20,0.97)", borderTop: "1px solid rgba(0,245,255,0.2)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center overflow-x-auto scrollbar-none px-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {navItems.map(item => {
            const active = tab === item.id;
            return (
              <button key={item.id} onClick={() => setTab(item.id)}
                className="flex flex-col items-center gap-0.5 flex-shrink-0 py-1 transition-all duration-200"
                style={{ minWidth: "56px", padding: "4px 6px" }}>
                <div className="relative">
                  <Icon name={item.icon as IconName} size={19} style={{ color: active ? "#00f5ff" : "#4b5563", filter: active ? "drop-shadow(0 0 5px rgba(0,245,255,0.9))" : "none" }} />
                  {active && <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#00f5ff", boxShadow: "0 0 4px #00f5ff" }} />}
                </div>
                <span className="font-rajdhani font-semibold" style={{ fontSize: "9px", color: active ? "#00f5ff" : "#4b5563", textShadow: active ? "0 0 6px rgba(0,245,255,0.7)" : "none" }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}