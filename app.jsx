// app.jsx — La Tragonería · Queso de Cabra Curado product page

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "serif": "Cormorant Garamond",
  "accent": "#C07D0A",
  "density": "regular",
  "showFacts": true,
  "stockState": "low"
}/*EDITMODE-END*/;

// ── Icons (Lucide-style stroked) ───────────────────────────────
const I = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>,
  bag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></svg>,
  leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20c0-9 5-15 16-16-1 11-7 16-16 16Z" strokeLinejoin="round" /><path d="M4 20c2-5 6-9 14-12" strokeLinecap="round" /></svg>,
  gift: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="9" width="18" height="12" rx="1" /><path d="M3 13h18M12 9v12" /><path d="M12 9c-3 0-5-1.5-5-3.5S9 4 12 9c3-5 5-3.5 5-3.5S15 9 12 9Z" strokeLinejoin="round" /></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.6 5.6 6.1.7-4.6 4.2 1.3 6-5.4-3-5.4 3 1.3-6L3.3 9.3l6.1-.7L12 3Z" /></svg>,
  starOutline: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="m12 3 2.6 5.6 6.1.7-4.6 4.2 1.3 6-5.4-3-5.4 3 1.3-6L3.3 9.3l6.1-.7L12 3Z" /></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  bio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M8 12c2-4 6-4 8 0-2 4-6 4-8 0Z" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 6v12M6 12h12" strokeLinecap="round" /></svg>,
  minus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 12h12" strokeLinecap="round" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

// ── Nav ─────────────────────────────────────────────────────────
function Nav({ cartCount }) {
  return (
    <header className="nav" data-screen-label="Nav">
      <div className="nav__brand">
        La Tragonería
        <small>Delicatessen · Sevilla</small>
      </div>
      <a href="admin.html" className="nav__admin-link" title="Ir al panel de administración">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13"><path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Z" strokeLinejoin="round" /></svg>
        Admin
      </a>
      <nav className="nav__menu">
        <a href="#">Queso y embutido</a>
        <a href="#">Conservas</a>
        <a href="#">Vinos y bebidas</a>
        <a href="#">Aceites</a>
        <a href="#">Cestas de regalo</a>
        <a href="#">Tienda</a>
      </nav>
      <div className="nav__icons">
        <button aria-label="Buscar">{I.search}</button>
        <button aria-label="Cuenta">{I.user}</button>
        <button aria-label="Cesta" className="nav__cart">
          {I.bag}
          {cartCount > 0 && <span className="nav__cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

// ── Product photo block ────────────────────────────────────────
const PRODUCT_PHOTO_URL = "https://www.latragoneria.com/wp-content/uploads/2022/02/Queso-Cabra-CURADO-240-gr.-Ecologico-1024x990.jpg";

function ProductPhoto({ activeAngle, setAngle }) {
  // angle "front" = real photo; "top" / "wedge" = illustrated alternates
  return (
    <div className="photo" data-screen-label="Product photo">
      <div className="photo__stage">
        {activeAngle === "front" ? (
          <img
            src={PRODUCT_PHOTO_URL}
            alt="Queso de Cabra Curado Ecológico — La Tragonería"
            className="photo__img"
            loading="eager"
          />
        ) : (
          <CheeseHero angle={activeAngle} />
        )}
      </div>

      <span className="badge badge--eco">
        {I.leaf}
        Ecológico certificado
      </span>
      <span className="badge badge--origin">Zuheros · Córdoba</span>
      <span className="badge badge--milk">Leche cruda · Cuajo vegetal</span>
      <span className="badge badge--use">Para untar · Para tabla</span>

      <div className="thumbs" role="tablist" aria-label="Ángulos del producto">
        {["front", "top", "wedge"].map((a) => (
          <button
            key={a}
            role="tab"
            aria-selected={activeAngle === a}
            data-active={activeAngle === a ? "1" : "0"}
            onClick={() => setAngle(a)}
          >
            {a === "front" ? (
              <img src={PRODUCT_PHOTO_URL} alt="" className="photo__img" />
            ) : (
              <CheeseHero angle={a} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Purchase column ────────────────────────────────────────────
function BuyColumn({ qty, setQty, added, onAdd, accent, stockState }) {
  const flavors = ["Intenso", "Granuloso", "Frutos secos", "Cava", "Vegetal"];

  const stockCopy = {
    low: { dot: "var(--amber)", text: "Solo 3 disponibles" },
    mid: { dot: "#7BA84E", text: "Reposición semanal · listo para enviar" },
    out: { dot: "#9C5757", text: "Próxima maduración disponible en 12 días" },
  }[stockState];

  return (
    <div className="buy" data-screen-label="Purchase column">
      <span className="cat-tag">
        {I.leaf}
        Queso Ecológico
      </span>

      <h1 className="product-name">
        Queso de Cabra Curado
        <span className="product-name__sub">Ecológico · 240 g</span>
      </h1>

      <p className="tagline">
        Corteza de pleita · Pasta blanca firme · Olor a cava viejo y aceite
      </p>

      <div className="pills">
        {flavors.map((f) => (
          <span key={f} className="pill">{f}</span>
        ))}
      </div>

      <div className="price-row">
        <span className="price">€8,75</span>
        <span className="price-meta">/ pieza ~240 g</span>
      </div>

      <div className="stock">
        <span className="stock__dot" style={{ background: stockCopy.dot, boxShadow: `0 0 0 3px ${stockCopy.dot}28` }} />
        {stockCopy.text}
      </div>

      <div className="divider" />

      <div className="qty-cta">
        <div className="qty" role="group" aria-label="Cantidad">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Restar">{I.minus}</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} aria-label="Sumar">{I.plus}</button>
        </div>
        <button
          className={`cta ${added ? "cta--added" : ""}`}
          onClick={onAdd}
          style={!added ? { background: accent } : undefined}
          disabled={stockState === "out"}
        >
          {added ? <>{I.check} Añadido</> : <>{I.bag} Añadir al carrito</>}
        </button>
      </div>

      <button className="ghost-cta">
        {I.gift}
        Añadir a una cesta de regalo
        <span className="ghost-cta__arrow">→</span>
      </button>

      <ul className="shipping">
        <li>{I.truck}<span><strong>Envío a domicilio</strong> · España peninsular · €6,00</span></li>
        <li>{I.gift}<span><strong>Envío gratuito</strong> en pedidos superiores a €90</span></li>
        <li>{I.clock}<span><strong>Plazo habitual</strong> 48–72 h hábiles desde confirmación</span></li>
        <li>{I.shield}<span><strong>Máximo 7 días hábiles</strong> garantizado o reembolso íntegro</span></li>
      </ul>
    </div>
  );
}

// ── Pairings strip ─────────────────────────────────────────────
function Pairings() {
  const items = [
    { kind: "torta", name: "Torta de Romero", origin: "Tosta artesana", price: "€4,20" },
    { kind: "crackers", name: "Crackers con tomate y albahaca", origin: "Sevilla · Artesanos", price: "€5,90" },
    { kind: "jam", name: "Crema de queso de cabra", origin: "Con cebolla caramelizada", price: "€7,90" },
    { kind: "wine", name: "Vino blanco ecológico", origin: "Andalucía · 2023", price: "€16,50" },
  ];
  return (
    <section className="section section--pairings" data-screen-label="Pairings">
      <div className="section__head">
        <h2 className="section__title">Va bien con <em>...</em></h2>
        <a href="#" className="section__link">Ver maridajes {I.arrow}</a>
      </div>
      <div className="scroller">
        {items.map((it) => (
          <button key={it.name} className="pair-card">
            <div className="pair-card__photo"><PairingPhoto kind={it.kind} /></div>
            <div className="pair-card__sub">{it.origin}</div>
            <div className="pair-card__name">{it.name}</div>
            <div className="pair-card__price">{it.price}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Editorial block ────────────────────────────────────────────
function Editorial({ showFacts }) {
  return (
    <section className="section" data-screen-label="Editorial">
      <div className="editorial">
        <div>
          <h2 className="editorial__title">Sobre este <em>queso</em></h2>
          <div className="editorial__body">
            <p>
              Elaborado con leche cruda de cabra de producción ecológica y
              cuajo vegetal. Su corteza natural lleva el dibujo característico
              de la pleita; al corte, pasta blanca y firme con algunos ojos
              mecánicos.
            </p>
            <p>
              En nariz, olor a cava viejo y aceite de oliva. En boca, textura
              dura y granulosa, sabor intenso con un largo regusto a cava y
              frutos secos.
            </p>
          </div>
          <div className="callout">
            <strong>Origen</strong>
            Zuheros, pueblo al sur de la provincia de Córdoba. Elaboración
            artesanal con leche cruda de cabra ecológica y cuajo 100 % vegetal.
          </div>
        </div>
        {showFacts && (
          <aside className="facts" aria-label="Ficha técnica">
            <h4>Ficha</h4>
            <dl>
              <dt>Origen</dt><dd>Zuheros · Córdoba</dd>
              <dt>Leche</dt><dd>Cabra cruda</dd>
              <dt>Cuajo</dt><dd>Vegetal</dd>
              <dt>Curación</dt><dd>6 meses</dd>
              <dt>Peso</dt><dd>~240 g</dd>
              <dt>Conservación</dt><dd>2–8 ºC</dd>
              <dt>Certificación</dt><dd>Bio · CAAE</dd>
              <dt>Alérgenos</dt><dd>Lácteos</dd>
            </dl>
          </aside>
        )}
      </div>
    </section>
  );
}

// ── Related cheeses ────────────────────────────────────────────
function Stars({ value = 5 }) {
  return (
    <span className="stars" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= value ? "stars__star stars__star--on" : "stars__star"}>
          {i <= value ? I.star : I.starOutline}
        </span>
      ))}
    </span>
  );
}

function Related({ onAdd }) {
  const cheeses = [
    { id: "payoyo",   kind: "payoyo",   name: "Cuña Queso Cabra Payoyo Semi",     origin: "Villaluenga · Cádiz",   price: "€10,55", rating: 5 },
    { id: "andazul",  kind: "andazul",  name: "Queso Cabra Curado Ecológico",     origin: "Formato cuña · 180 g",  price: "€7,40",  rating: 5 },
    { id: "manchego", kind: "manchego", name: "Queso Cabra Semicurado",           origin: "Sierra de Cádiz",        price: "€8,90",  rating: 4 },
  ];
  return (
    <section className="section" data-screen-label="Related">
      <div className="section__head">
        <h2 className="section__title">Otros quesos que te van a <em>gustar</em></h2>
        <a href="#" className="section__link">Ver todos los quesos {I.arrow}</a>
      </div>
      <div className="related-grid">
        {cheeses.map((c) => (
          <article key={c.id} className="related-card">
            <div className="related-card__photo"><CheesePhoto kind={c.kind} /></div>
            <div className="related-card__body">
              <span className="related-card__origin">{c.origin}</span>
              <h3 className="related-card__name">{c.name}</h3>
              <Stars value={c.rating} />
              <div className="related-card__row">
                <span className="related-card__price">{c.price}</span>
                <button className="related-card__add" aria-label={`Añadir ${c.name}`} onClick={() => onAdd(c.name)}>
                  {I.plus}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── Reviews empty state ────────────────────────────────────────
function Reviews({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !name || !comment) return;
    setSubmitted(true);
    onSubmit && onSubmit({ rating, name, comment });
  };

  return (
    <section className="section reviews" data-screen-label="Reviews">
      <div className="reviews__inner">
        <header className="reviews__head">
          <h2 className="section__title">Valoraciones <em>(0)</em></h2>
          <p className="reviews__prompt">Sé el primero en valorar este queso.</p>
        </header>

        {submitted ? (
          <div className="reviews__thanks">
            <span className="reviews__check">{I.check}</span>
            <div>
              <strong>Gracias, {name.split(" ")[0]}.</strong>
              <p>Tu valoración será publicada tras una breve revisión.</p>
            </div>
          </div>
        ) : (
          <form className="reviews__form" onSubmit={handleSubmit}>
            <div className="reviews__field reviews__field--stars">
              <label>Tu valoración</label>
              <div className="reviews__stars" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => {
                  const filled = (hover || rating) >= i;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={filled ? "reviews__star reviews__star--on" : "reviews__star"}
                      onMouseEnter={() => setHover(i)}
                      onClick={() => setRating(i)}
                      aria-label={`${i} ${i === 1 ? "estrella" : "estrellas"}`}
                    >
                      {filled ? I.star : I.starOutline}
                    </button>
                  );
                })}
                <span className="reviews__rating-hint">
                  {(hover || rating) ? `${hover || rating} / 5` : "Toca una estrella"}
                </span>
              </div>
            </div>

            <div className="reviews__row">
              <div className="reviews__field">
                <label htmlFor="r-name">Tu nombre</label>
                <input id="r-name" type="text" placeholder="Cómo firmas"
                       value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="reviews__field">
                <label htmlFor="r-comment">Tu reseña</label>
                <textarea id="r-comment" rows="3"
                          placeholder="Cuéntanos cómo lo probaste — con qué pan, qué vino, qué momento."
                          value={comment} onChange={(e) => setComment(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="cta reviews__submit"
                    disabled={!rating || !name || !comment}>
              Publicar valoración
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Categories / tags ──────────────────────────────────────────
function Taxonomy() {
  const categories = ["Ecológico", "Para untar", "Queso", "Queso para untar", "Queso y embutido"];
  const tags = ["cata de quesos", "ecológico", "queso", "salsa queso"];
  return (
    <section className="section taxonomy" data-screen-label="Taxonomy">
      <div className="taxonomy__group">
        <h4>Categorías</h4>
        <div className="taxonomy__pills">
          {categories.map((c) => <a key={c} href="#" className="taxonomy__pill">{c}</a>)}
        </div>
      </div>
      <div className="taxonomy__group">
        <h4>Etiquetas</h4>
        <div className="taxonomy__pills">
          {tags.map((t) => <a key={t} href="#" className="taxonomy__pill taxonomy__pill--tag">{t}</a>)}
        </div>
      </div>
    </section>
  );
}

// ── Sticky mobile bottom bar ───────────────────────────────────
function StickyBar({ accent, onAdd, added }) {
  return (
    <div className="sticky-bar">
      <div className="sticky-bar__price">
        €8,75
        <small>~240 g · Zuheros</small>
      </div>
      <button
        className={`cta ${added ? "cta--added" : ""}`}
        onClick={onAdd}
        style={!added ? { background: accent } : undefined}
      >
        {added ? <>{I.check} Añadido</> : "Añadir al carrito"}
      </button>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────
function Toast({ visible, message }) {
  return (
    <div className={`toast ${visible ? "toast--visible" : ""}`} role="status" aria-live="polite">
      <span className="toast__dot" />
      {message}
    </div>
  );
}

// ── App root ───────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [angle, setAngle] = useState("front");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimer = useRef(null);

  // Apply tweaks to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty("--serif",
      `"${t.serif}", "Times New Roman", Georgia, serif`);
    document.documentElement.style.setProperty("--gold", t.accent);
    document.documentElement.style.setProperty("--gold-deep",
      shade(t.accent, -0.18));
    document.body.dataset.density = t.density;
  }, [t.serif, t.accent, t.density]);

  const showToast = (message) => {
    setToast({ visible: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((s) => ({ ...s, visible: false })), 2400);
  };

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    setCartCount((c) => c + qty);
    showToast(`Queso de Cabra Curado · ${qty} en la cesta`);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleAddRelated = (name) => {
    setCartCount((c) => c + 1);
    showToast(`${name} · 1 en la cesta`);
  };

  return (
    <>
      <Nav cartCount={cartCount} />

      <main className="page">
        <nav className="breadcrumb" aria-label="Migas de pan">
          <a href="#">Inicio</a> <span style={{ opacity: .5 }}>›</span>{" "}
          <a href="#">Queso y embutido</a> <span style={{ opacity: .5 }}>›</span>{" "}
          <a href="#">Queso</a> <span style={{ opacity: .5 }}>›</span>{" "}
          <span style={{ color: "var(--oak)" }}>Queso Cabra CURADO Ecológico</span>
        </nav>

        <section className="hero" data-screen-label="Hero">
          <ProductPhoto activeAngle={angle} setAngle={setAngle} />
          <BuyColumn
            qty={qty}
            setQty={setQty}
            added={added}
            onAdd={handleAdd}
            accent={t.accent}
            stockState={t.stockState}
          />
        </section>

        <Pairings />
        <Editorial showFacts={t.showFacts} />
        <Related onAdd={handleAddRelated} />
        <Reviews onSubmit={() => showToast("Valoración enviada · pendiente de revisión")} />
        <Taxonomy />
      </main>

      <footer className="footer">
        <div className="footer__brand">La Tragonería</div>
        <div className="footer__meta">
          <a href="#">Calle Mateos Gago 18 · Sevilla</a>
          <a href="#">+34 954 22 18 03</a>
          <a href="#">hola@latragoneria.es</a>
          <a href="#" style={{ marginTop: 8 }}>Instagram ↗</a>
        </div>
      </footer>

      <StickyBar accent={t.accent} onAdd={handleAdd} added={added} />
      <Toast visible={toast.visible} message={toast.message} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tipografía" />
        <TweakRadio
          label="Serif"
          value={t.serif}
          options={["Cormorant Garamond", "Playfair Display"]}
          onChange={(v) => setTweak("serif", v)}
        />
        <TweakRadio
          label="Densidad"
          value={t.density}
          options={["compact", "regular", "comfortable"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Marca" />
        <TweakColor
          label="Acento"
          value={t.accent}
          options={["#C07D0A", "#3E1F00", "#2C5F2E", "#9C5757"]}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Estado" />
        <TweakRadio
          label="Stock"
          value={t.stockState}
          options={[
            { value: "low", label: "Bajo" },
            { value: "mid", label: "Normal" },
            { value: "out", label: "Agotado" },
          ]}
          onChange={(v) => setTweak("stockState", v)}
        />
        <TweakToggle
          label="Mostrar ficha técnica"
          value={t.showFacts}
          onChange={(v) => setTweak("showFacts", v)}
        />
      </TweaksPanel>
    </>
  );
}

// shade(): lighten/darken a hex color by a fraction (-1..1)
function shade(hex, amt) {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(v, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (amt < 0 ? c : 255 - c) * amt)));
  r = f(r); g = f(g); b = f(b);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
