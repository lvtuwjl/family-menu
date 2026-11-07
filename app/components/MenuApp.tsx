"use client";

import { useEffect, useMemo, useState } from "react";
import type { FamilyOrder, LifeStage, OrderStatus, Recipe, SpiceLevel } from "@/lib/types";

const stageMeta: Record<LifeStage, { label: string; icon: string; title: string; description: string }> = {
  preconception: { label: "备孕", icon: "🌱", title: "为新开始打底", description: "夫妻均衡饮食与叶酸友好搭配" },
  pregnancy: { label: "孕期", icon: "🤰", title: "安心吃好每一餐", description: "按孕早、中、晚期寻找温和搭配" },
  postpartum: { label: "产后", icon: "🌼", title: "恢复也要慢慢来", description: "产后恢复与哺乳期日常餐" },
  baby: { label: "宝宝", icon: "🥣", title: "从第一口辅食开始", description: "按月龄、质地和过敏原选择" },
  family: { label: "全家", icon: "🏡", title: "一家人一起吃", description: "快手、下饭、清淡的家常菜单" },
};
const stageOrder: LifeStage[] = ["preconception", "pregnancy", "postpartum", "baby", "family"];

const spiceMeta: Record<SpiceLevel, { label: string; icon: string }> = {
  none: { label: "不辣", icon: "🌿" },
  mild: { label: "微辣", icon: "🌶️" },
  medium: { label: "中辣", icon: "🌶️🌶️" },
  hot: { label: "辣", icon: "🔥" },
};

const statusMeta: Record<OrderStatus, { label: string; icon: string; next?: OrderStatus; action?: string }> = {
  pending: { label: "等你接单", icon: "🔔", next: "accepted", action: "接单" },
  accepted: { label: "已经接单", icon: "👌", next: "shopping", action: "去买菜" },
  shopping: { label: "买菜中", icon: "🛒", next: "cooking", action: "开始做饭" },
  cooking: { label: "烹饪中", icon: "🍳", next: "ready", action: "标记开饭" },
  ready: { label: "开饭啦", icon: "🥢", next: "done", action: "吃完啦" },
  done: { label: "已完成", icon: "✅" },
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function RecipeCard({ recipe, quantity, onOpen, onAdd }: { recipe: Recipe; quantity: number; onOpen: () => void; onAdd: () => void }) {
  return <article className="recipe-card">
    <button className="recipe-open" onClick={onOpen} aria-label={`查看${recipe.name}做法`}>
      <div className="dish-art" style={{ background: `linear-gradient(145deg, ${recipe.colorFrom}, ${recipe.colorTo})` }}>
        {recipe.featured && <span className="featured-tag">今日推荐</span>}
        <span className="stage-tag">{stageMeta[recipe.lifeStage].icon} {stageMeta[recipe.lifeStage].label}</span>
        <span className="dish-emoji">{recipe.emoji}</span>
        <span className="art-ring ring-one" /><span className="art-ring ring-two" />
      </div>
      <div className="recipe-body">
        <div className="recipe-title"><div><span>{recipe.category}</span><h3>{recipe.name}</h3></div><span className="arrow">↗</span></div>
        <p>{recipe.description}</p>
        <div className="recipe-tags"><span className={`spice-tag spice-${recipe.spiceLevel}`}>{spiceMeta[recipe.spiceLevel].icon} {spiceMeta[recipe.spiceLevel].label}</span>{recipe.nutritionHighlights.slice(0, 2).map((item) => <span key={item}>{item}</span>)}{recipe.minAgeMonths !== null && <span>{recipe.minAgeMonths}月龄+</span>}</div>
        <div className="recipe-meta"><span>◷ {recipe.cookTime} 分钟</span><span>◈ {recipe.difficulty}</span><span>♨ {recipe.flavor}</span></div>
      </div>
    </button>
    <button className={quantity ? "add-button added" : "add-button"} onClick={onAdd}>
      {quantity ? `已选 ${quantity} 份 · 再加一份` : "+ 点这道菜"}
    </button>
  </article>;
}

export function MenuApp({ initialRecipes, initialOrders }: { initialRecipes: Recipe[]; initialOrders: FamilyOrder[] }) {
  const [role, setRole] = useState<"wife" | "chef">("wife");
  const [section, setSection] = useState<"menu" | "orders">("menu");
  const [lifeStage, setLifeStage] = useState<LifeStage | "all">("all");
  const [subStage, setSubStage] = useState("全部");
  const [nonSpicyOnly, setNonSpicyOnly] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState(initialOrders);
  const [servings, setServings] = useState(2);
  const [requestedFor, setRequestedFor] = useState("18:30");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState("");

  const stageRecipes = useMemo(() => lifeStage === "all" ? initialRecipes : initialRecipes.filter((recipe) => recipe.lifeStage === lifeStage), [initialRecipes, lifeStage]);
  const subStages = useMemo(() => lifeStage === "all" ? [] : ["全部", ...Array.from(new Set(stageRecipes.map((recipe) => recipe.subStage)))], [stageRecipes, lifeStage]);
  const visibleRecipes = initialRecipes.filter((recipe) => {
    const matchesStage = lifeStage === "all" || recipe.lifeStage === lifeStage;
    const matchesSubStage = subStage === "全部" || recipe.subStage === subStage;
    const matchesSpice = !nonSpicyOnly || recipe.spiceLevel === "none";
    const keyword = search.trim().toLowerCase();
    const searchable = `${recipe.name}${recipe.category}${recipe.subStage}${recipe.mealType}${recipe.flavor}${spiceMeta[recipe.spiceLevel].label}${recipe.nutritionHighlights.join("")}${recipe.ingredients.map((item) => item.name).join("")}`.toLowerCase();
    return matchesStage && matchesSubStage && matchesSpice && (!keyword || searchable.includes(keyword));
  });
  const cartItems = initialRecipes.filter((recipe) => cart[recipe.id]).map((recipe) => ({ recipe, quantity: cart[recipe.id] }));
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const activeOrders = orders.filter((order) => order.status !== "done");

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedRecipe(null);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (section !== "orders") return;
    let active = true;
    const controller = new AbortController();
    async function refreshOrders() {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/orders", { cache: "no-store", signal: controller.signal });
        if (!response.ok) return;
        const payload = await response.json();
        if (active && Array.isArray(payload.orders)) setOrders(payload.orders);
      } catch {
        // Keep the last displayed orders when the connection is unavailable.
      }
    }
    void refreshOrders();
    const timer = window.setInterval(refreshOrders, 10000);
    document.addEventListener("visibilitychange", refreshOrders);
    return () => {
      active = false;
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshOrders);
    };
  }, [section]);

  function addToCart(recipeId: string) {
    if ((cart[recipeId] ?? 0) >= 9) {
      setToast("每道菜最多选择 9 份");
      return;
    }
    setCart((current) => ({ ...current, [recipeId]: Math.min(9, (current[recipeId] ?? 0) + 1) }));
    setToast("已放进今晚的菜单");
  }

  function changeQuantity(recipeId: string, delta: number) {
    setCart((current) => {
      const next = Math.min(9, Math.max(0, (current[recipeId] ?? 0) + delta));
      const copy = { ...current };
      if (next === 0) delete copy[recipeId]; else copy[recipeId] = next;
      return copy;
    });
  }

  async function submitOrder() {
    if (!cartItems.length) return;
    setSending(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({ recipeId: item.recipe.id, quantity: item.quantity })),
          servings,
          requestedFor,
          note: [nonSpicyOnly ? "不要辣" : "", note.trim()].filter(Boolean).join("；"),
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "点单失败");
      setOrders((current) => [payload.order, ...current]);
      setCart({});
      setNote("");
      setCartOpen(false);
      setSection("orders");
      setToast("点单成功，等大厨接单啦");
    } catch (error) {
      setToast(error instanceof Error ? error.message : "点单失败，请重试");
    } finally {
      setSending(false);
    }
  }

  async function advanceOrder(order: FamilyOrder) {
    const next = statusMeta[order.status].next;
    if (!next) return;
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const payload = await response.json();
      if (response.ok) {
        setOrders((current) => current.map((item) => item.id === order.id ? payload.order : item));
        setToast(`订单已更新为“${statusMeta[next].label}”`);
      } else {
        setToast(payload.error || "更新失败");
      }
    } catch {
      setToast("网络连接失败，请重试");
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => { setSection("menu"); setRole("wife"); }} aria-label="回到菜单首页">
          <span className="brand-mark">炊</span>
          <span><b>好好吃饭</b><small>全家的阶段营养菜单</small></span>
        </button>
        <div className="role-switch" aria-label="切换身份">
          <button className={role === "wife" ? "active" : ""} onClick={() => setRole("wife")}>💛 我要点菜</button>
          <button className={role === "chef" ? "active" : ""} onClick={() => { setRole("chef"); setSection("orders"); }}>👨‍🍳 我来做饭</button>
        </div>
      </header>

      {role === "wife" && section === "menu" ? (
        <>
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">从备孕到宝宝长大</span>
              <h1>每个阶段，都好好吃饭</h1>
              <p>按家庭阶段、月龄和营养重点，找到今天适合的一餐。</p>
              <div className="search-box">
                <span>⌕</span>
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜菜名、阶段、营养或食材" aria-label="搜索菜谱" />
                {search && <button onClick={() => setSearch("")} aria-label="清空搜索">×</button>}
              </div>
            </div>
            <div className="hero-note">
              <span className="note-pin">♥</span>
              <p>“照顾不是一句话，<br />是认真准备的每一餐。”</p>
              <small>— 我们家的吃饭计划</small>
            </div>
          </section>

          <section className="stage-section" aria-labelledby="stage-heading">
            <div className="stage-heading-row">
              <div><span className="eyebrow">选择家庭阶段</span><h2 id="stage-heading">今天为谁准备？</h2></div>
              <button className={lifeStage === "all" ? "stage-all active" : "stage-all"} onClick={() => { setLifeStage("all"); setSubStage("全部"); }}>查看全部 · {initialRecipes.length}</button>
            </div>
            <div className="stage-grid">
              {stageOrder.map((item) => {
                const meta = stageMeta[item];
                const count = initialRecipes.filter((recipe) => recipe.lifeStage === item).length;
                return <button key={item} className={lifeStage === item ? `stage-card stage-${item} active` : `stage-card stage-${item}`} onClick={() => { setLifeStage(item); setSubStage("全部"); }} aria-pressed={lifeStage === item}>
                  <span className="stage-icon">{meta.icon}</span>
                  <span className="stage-copy"><b>{meta.label}</b><strong>{meta.title}</strong><small>{meta.description}</small></span>
                  <i>{count} 道</i>
                </button>;
              })}
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div><span className="eyebrow">{lifeStage === "all" ? "全生命周期菜单" : stageMeta[lifeStage].description}</span><h2>{lifeStage === "all" ? "全部家庭菜单" : `${stageMeta[lifeStage].label}菜单`}</h2></div>
              <span className="dish-count">{visibleRecipes.length} 道可选</span>
            </div>
            <div className="preference-row">
              <div><span>💛</span><p><b>口味筛选</b><small>开启后只显示不辣菜谱，下单时附上不辣备注</small></p></div>
              <button className={nonSpicyOnly ? "active" : ""} aria-pressed={nonSpicyOnly} onClick={() => setNonSpicyOnly((current) => !current)}>
                {nonSpicyOnly ? "✓ 只看不辣" : "查看全部辣度"}
              </button>
            </div>
            {lifeStage === "all" ? <aside className="menu-map"><span>🧭</span><div><b>菜谱已按 5 个家庭阶段整理</b><p>先从上方选择“备孕、孕期、产后、宝宝或全家”，就能看到清楚的阶段细分。</p></div></aside> : <div className="category-row" role="tablist" aria-label="阶段细分">
              {subStages.map((item) => <button key={item} role="tab" aria-selected={subStage === item} className={subStage === item ? "active" : ""} onClick={() => setSubStage(item)}>{item}</button>)}
            </div>}

            {lifeStage !== "family" && <aside className="safety-banner">
              <span>🛟</span><div><b>先看适用阶段与安全提示</b><p>菜谱用于日常饮食参考，不能替代医生或注册营养师的个体化建议。孕期疾病、过敏、早产或生长问题请遵医嘱。</p></div>
              <small>参考 WHO、CDC 与 NHS 公共健康指南</small>
            </aside>}

            {visibleRecipes.length ? (lifeStage === "all" ? <div className="stage-menu-groups">
              {stageOrder.map((stage) => {
                const recipes = visibleRecipes.filter((recipe) => recipe.lifeStage === stage);
                if (!recipes.length) return null;
                return <section className="stage-menu-group" key={stage}>
                  <div className="group-heading"><div><span>{stageMeta[stage].icon}</span><p><b>{stageMeta[stage].label}菜单</b><small>{stageMeta[stage].description}</small></p></div><button onClick={() => { setLifeStage(stage); setSubStage("全部"); }}>查看 {stageMeta[stage].label} →</button></div>
                  <div className="recipe-grid">{recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} quantity={cart[recipe.id] ?? 0} onOpen={() => setSelectedRecipe(recipe)} onAdd={() => addToCart(recipe.id)} />)}</div>
                </section>;
              })}
            </div> : <div className="recipe-grid">{visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} quantity={cart[recipe.id] ?? 0} onOpen={() => setSelectedRecipe(recipe)} onAdd={() => addToCart(recipe.id)} />)}</div>) : <div className="empty-state"><span>🥢</span><h3>没找到这道菜</h3><p>换个食材或分类试试吧。</p></div>}
          </section>
        </>
      ) : (
        <section className="orders-page">
          <div className="orders-hero">
            <div><span className="eyebrow">{role === "chef" ? "大厨工作台" : "我的点单"}</span><h1>{role === "chef" ? "今晚的任务清单" : "好饭正在路上"}</h1><p>{role === "chef" ? "接单、买菜、开火，随时更新订单进度。" : "查看大厨做到哪一步了，页面会自动更新。"}</p></div>
            <div className="order-summary"><strong>{activeOrders.length}</strong><span>张进行中的订单</span></div>
          </div>
          <div className="orders-list">
            {orders.length ? orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-head">
                  <div><span className="order-number">订单 #{String(order.id).padStart(3, "0")}</span><small>{formatTime(order.createdAt)} · {order.servings} 人份</small></div>
                  <span className={`status status-${order.status}`}>{statusMeta[order.status].icon} {statusMeta[order.status].label}</span>
                </div>
                <div className="order-dishes">
                  {order.items.map((item) => <div key={item.recipeId}><span>{item.emoji}</span><b>{item.name}</b>{item.quantity > 1 && <small>×{item.quantity}</small>}</div>)}
                </div>
                <div className="order-details">
                  <span>🕰 希望 <b>{order.requestedFor}</b> 开饭</span>
                  {order.note && <span>✎ “{order.note}”</span>}
                </div>
                {role === "chef" && statusMeta[order.status].next && <button className="primary-action" onClick={() => advanceOrder(order)}>{statusMeta[order.status].action} <span>→</span></button>}
                {role === "wife" && order.status === "ready" && <div className="ready-message">大厨已标记开饭，可以准备吃饭啦！</div>}
              </article>
            )) : <div className="empty-state"><span>📜</span><h3>还没有点单</h3><p>去菜单里挑几道喜欢的菜吧。</p></div>}
          </div>
        </section>
      )}

      <nav className="bottom-nav" aria-label="主要导航">
        <button className={section === "menu" && role === "wife" ? "active" : ""} onClick={() => { setRole("wife"); setSection("menu"); }}><span>⌂</span>菜单</button>
        <button className={section === "orders" && role === "wife" ? "active" : ""} onClick={() => { setRole("wife"); setSection("orders"); }}><span>▤</span>点单{activeOrders.length > 0 && <i>{activeOrders.length}</i>}</button>
        <button className={role === "chef" ? "active" : ""} onClick={() => { setRole("chef"); setSection("orders"); }}><span>♨</span>做饭</button>
      </nav>

      {cartCount > 0 && role === "wife" && section === "menu" && <button className="floating-cart" onClick={() => setCartOpen(true)}><span className="cart-icon">🥣<i>{cartCount}</i></span><span><small>今晚想吃</small><b>{cartItems.map((item) => item.recipe.name).join("、")}</b></span><strong>去点单 →</strong></button>}

      {selectedRecipe && <RecipeDialog recipe={selectedRecipe} quantity={cart[selectedRecipe.id] ?? 0} onClose={() => setSelectedRecipe(null)} onAdd={() => addToCart(selectedRecipe.id)} />}

      {cartOpen && <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <section className="cart-sheet" role="dialog" aria-modal="true" aria-label="确认点单">
          <div className="sheet-handle" />
          <div className="sheet-head"><div><span className="eyebrow">今晚的菜单</span><h2>确认点单</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="关闭">×</button></div>
          {nonSpicyOnly && <div className="taste-reminder">🌿 已为订单标记：不要辣</div>}
          <div className="cart-list">
            {cartItems.map(({ recipe, quantity }) => <div className="cart-item" key={recipe.id}><span className="mini-dish" style={{ background: `linear-gradient(145deg, ${recipe.colorFrom}, ${recipe.colorTo})` }}>{recipe.emoji}</span><div><b>{recipe.name}</b><small>{recipe.cookTime} 分钟 · {recipe.flavor} · {spiceMeta[recipe.spiceLevel].label}</small></div><div className="stepper"><button onClick={() => changeQuantity(recipe.id, -1)} aria-label={`减少${recipe.name}`}>−</button><span>{quantity}</span><button onClick={() => changeQuantity(recipe.id, 1)} aria-label={`增加${recipe.name}`}>+</button></div></div>)}
          </div>
          <div className="order-form">
            <label><span>几个人吃</span><div className="serving-picker">{[1, 2, 3, 4].map((count) => <button key={count} className={servings === count ? "active" : ""} onClick={() => setServings(count)}>{count} 人</button>)}</div></label>
            <label><span>希望几点开饭</span><input type="time" value={requestedFor} onChange={(event) => setRequestedFor(event.target.value)} /></label>
            <label><span>给大厨留言 <small>选填</small></span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="比如：不要香菜、米饭少一点～" maxLength={200} /></label>
          </div>
          <button className="submit-order" disabled={sending || cartCount === 0} onClick={submitOrder}>{sending ? "正在把菜单送给大厨…" : `确认点单 · ${cartCount} 份`}<span>♥</span></button>
        </section>
      </div>}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}

function RecipeDialog({ recipe, quantity, onClose, onAdd }: { recipe: Recipe; quantity: number; onClose: () => void; onAdd: () => void }) {
  return <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="recipe-dialog" role="dialog" aria-modal="true" aria-label={`${recipe.name}做法`}>
      <button className="close-button floating-close" onClick={onClose} aria-label="关闭">×</button>
      <div className="dialog-art" style={{ background: `linear-gradient(145deg, ${recipe.colorFrom}, ${recipe.colorTo})` }}><span>{recipe.emoji}</span><i className="art-ring ring-one" /><i className="art-ring ring-two" /></div>
      <div className="dialog-content">
        <span className="eyebrow">{stageMeta[recipe.lifeStage].label} · {recipe.subStage} · {recipe.mealType}</span><h2>{recipe.name}</h2><p className="dialog-description">{recipe.description}</p>
        <div className="dialog-stats"><div><b>{recipe.cookTime}</b><span>分钟</span></div><div><b>{recipe.difficulty}</b><span>难度</span></div><div><b>{recipe.servings}</b><span>参考人份</span></div><div><b>{recipe.flavor}</b><span>口味</span></div></div>
        <section className="care-panel">
          <div><span>适合阶段</span><b>{recipe.subStage}{recipe.minAgeMonths !== null ? ` · ${recipe.minAgeMonths}月龄+` : ""}</b></div>
          <div><span>辣度</span><p>{spiceMeta[recipe.spiceLevel].icon} {spiceMeta[recipe.spiceLevel].label}</p></div>
          <div><span>营养亮点</span><p>{recipe.nutritionHighlights.join(" · ")}</p></div>
          {recipe.lifeStage === "baby" && <div><span>建议质地</span><p>{recipe.texture}</p></div>}
          <div><span>过敏原</span><p>{recipe.allergens.length ? recipe.allergens.join("、") : "未发现常见过敏原，仍需核对具体食材"}</p></div>
          <aside>⚠️ {recipe.safetyNote}</aside>
        </section>
        <section className="recipe-section"><div className="subheading"><h3>准备食材</h3><span>{recipe.servings} 人份</span></div><div className="ingredients-list">{recipe.ingredients.map((item) => <div key={item.name}><span>{item.name}</span><b>{item.amount}</b></div>)}</div></section>
        <section className="recipe-section"><div className="subheading"><h3>开始做菜</h3><span>跟着步骤来</span></div><ol className="steps-list">{recipe.steps.map((step, index) => <li key={index}><span>{index + 1}</span><div><p>{step.instruction}</p>{step.duration && <small>◷ {step.duration}</small>}{step.tip && <em>💡 {step.tip}</em>}</div></li>)}</ol></section>
      </div>
      <div className="dialog-footer"><button onClick={onAdd}>{quantity ? `已选 ${quantity} 份 · 再加一份` : `+ 点这道菜`}</button></div>
    </section>
  </div>;
}
