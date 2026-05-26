// admin.jsx — La Tragonería · Backend form for "Nuevo producto"
// All fields pre-filled with the real Queso Cabra Curado data so the
// shop owner can see the exact mapping between form ↔ live product page.

const { useState, useEffect, useMemo, useRef } = React;

const PHOTO_URL = "https://www.latragoneria.com/wp-content/uploads/2022/02/Queso-Cabra-CURADO-240-gr.-Ecologico-1024x990.jpg";

// ─────────────────────────────────────────────────────────────
// Icon set — single-stroke, currentColor
// ─────────────────────────────────────────────────────────────
const I = {
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  chevron:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  eye:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>,
  logout:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H5v14h4" strokeLinecap="round" /><path d="M15 8l4 4-4 4M11 12h8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  x:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /></svg>,
  plus:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>,
  image:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="9" cy="10" r="2" /><path d="m3 18 6-6 5 5 3-3 4 4" strokeLinejoin="round" /></svg>,
  warn:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4 2 20h20L12 4Z" strokeLinejoin="round" /><path d="M12 10v5M12 18v.5" strokeLinecap="round" /></svg>,
  drag:     <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="7" r="1.4" /><circle cx="9" cy="12" r="1.4" /><circle cx="9" cy="17" r="1.4" /><circle cx="15" cy="7" r="1.4" /><circle cx="15" cy="12" r="1.4" /><circle cx="15" cy="17" r="1.4" /></svg>,
  star:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.6 5.6 6.1.7-4.6 4.2 1.3 6-5.4-3-5.4 3 1.3-6L3.3 9.3l6.1-.7L12 3Z" /></svg>,
  leaf:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20c0-9 5-15 16-16-1 11-7 16-16 16Z" strokeLinejoin="round" /></svg>,
  save:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5h11l3 3v11H5V5Z" strokeLinejoin="round" /><path d="M8 5v5h7V5M8 14h8v5H8z" /></svg>,
  globe:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>,
};

// ─────────────────────────────────────────────────────────────
// TopBar — always visible
// ─────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <header className="topbar" data-screen-label="Topbar">
      <div className="topbar__left">
        <span className="topbar__brand">La Tragonería</span>
        <span className="topbar__divider" />
        <span className="topbar__panel">Panel de administración</span>
        <span className="topbar__divider" />
        <nav className="topbar__breadcrumb">
          <a href="#">Productos</a>
          <span>›</span>
          <strong>Nuevo producto</strong>
        </nav>
      </div>
      <div className="topbar__right">
        <div className="topbar__viewswitch">
          <a href="admin.html" className="is-active">Admin</a>
          <a href="index.html">Vista cliente ↗</a>
        </div>
        <div className="topbar__user">
          <span className="topbar__avatar">JC</span>
          <span>
            Juan Carlos
            <small>Propietario</small>
          </span>
        </div>
        <button className="topbar__logout" aria-label="Cerrar sesión">{I.logout}</button>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Card shell — collapsible, with check + numbering
// ─────────────────────────────────────────────────────────────
function Card({ n, title, hint, complete, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="card" data-collapsed={open ? "0" : "1"}>
      <header className="card__head">
        <div className="card__head-left">
          <span className="card__num">{String(n).padStart(2, "0")}</span>
          <div>
            <div className="card__title">
              {title}
              {hint && <small>{hint}</small>}
            </div>
          </div>
          <span className="card__check" data-on={complete ? "1" : "0"} title={complete ? "Sección completa" : "Sección por revisar"}>
            {complete && I.check}
          </span>
        </div>
        <button className="card__collapse" onClick={() => setOpen(o => !o)} aria-label={open ? "Colapsar" : "Expandir"}>
          {I.chevron}
        </button>
      </header>
      <div className="card__body">{children}</div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Field — wraps label + input(s) + hint + visibility eye
// ─────────────────────────────────────────────────────────────
function Field({ label, required, visible, hint, children }) {
  return (
    <div className="field">
      <span className="field__label">
        {label}
        {required && <span className="field__required">*</span>}
        {visible && (
          <span className="field__eye" data-tip="Visible para el cliente">
            {I.eye}
          </span>
        )}
      </span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tag input — chips you can add/remove
// ─────────────────────────────────────────────────────────────
function TagInput({ value, onChange, placeholder = "Añadir…", variant }) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    if (value.includes(t)) { setDraft(""); return; }
    onChange([...value, t]);
    setDraft("");
  };
  const remove = (t) => onChange(value.filter(x => x !== t));

  return (
    <div className="tags" onClick={() => inputRef.current?.focus()}>
      {value.map(t => (
        <span key={t} className={variant === "flavor" ? "tag tag--flavor" : "tag"}>
          {t}
          <button type="button" onClick={() => remove(t)} aria-label={`Eliminar ${t}`}>{I.x}</button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="tag-input"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); add(); }
          if (e.key === "Backspace" && !draft && value.length) remove(value[value.length - 1]);
        }}
        placeholder={value.length ? "" : placeholder}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 1 — Identidad
// ─────────────────────────────────────────────────────────────
function CardIdentidad({ data, setData }) {
  return (
    <Card n={1} title="Identidad del producto" hint="Nombre, título visible y tagline."
          complete={!!data.name && !!data.displayLine1 && !!data.tagline}>
      <Field label="Nombre del producto" required hint="Aparecerá como título principal en la ficha y en URLs.">
        <input type="text" className="input--lg" value={data.name}
               onChange={(e) => setData({ ...data, name: e.target.value })} />
      </Field>
      <Field label="Nombre en pantalla (serif, dos líneas)" required visible
             hint="Así se muestra en grande en la ficha del producto.">
        <div className="row" style={{ gap: 10 }}>
          <input type="text" className="input--serif" value={data.displayLine1}
                 onChange={(e) => setData({ ...data, displayLine1: e.target.value })} />
          <input type="text" value={data.displayLine2}
                 onChange={(e) => setData({ ...data, displayLine2: e.target.value })} />
        </div>
      </Field>
      <Field label="Tagline sensorial" visible
             hint="Frase corta que el cliente ve antes de leer la descripción.">
        <input type="text" value={data.tagline} style={{ fontStyle: "italic" }}
               onChange={(e) => setData({ ...data, tagline: e.target.value })} />
      </Field>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 2 — Descripción
// ─────────────────────────────────────────────────────────────
function CardDescripcion({ data, setData }) {
  return (
    <Card n={2} title="Descripción" hint="Cómo se cuenta el producto en la ficha y en el listado."
          complete={!!data.descShort && !!data.descLong}>
      <Field label="Descripción corta" visible
             hint="Aparece en el listado del catálogo y en los avances.">
        <textarea rows="2" value={data.descShort}
                  onChange={(e) => setData({ ...data, descShort: e.target.value })} />
      </Field>
      <Field label="Descripción completa" required visible
             hint='Texto del bloque "Sobre este queso" en la ficha.'>
        <textarea rows="6" value={data.descLong}
                  onChange={(e) => setData({ ...data, descLong: e.target.value })} />
      </Field>
      <Field label="Origen (callout de la ficha)" visible
             hint="Caja resaltada con borde dorado debajo de la descripción.">
        <div className="row row--2-1">
          <input type="text" placeholder="Lugar" value={data.originPlace}
                 onChange={(e) => setData({ ...data, originPlace: e.target.value })} />
          <input type="text" placeholder="Detalle" value={data.originDetail}
                 onChange={(e) => setData({ ...data, originDetail: e.target.value })} />
        </div>
      </Field>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 3 — Precio, stock, formato
// ─────────────────────────────────────────────────────────────
function CardPrecio({ data, setData }) {
  const stockLow = data.stock <= data.stockAlert;
  return (
    <Card n={3} title="Precio, stock y formato" hint="Lo que decide si se puede comprar."
          complete={data.price > 0 && data.stock >= 0 && !!data.format}>
      <div className="row row--3">
        <Field label="Precio (€)" required visible>
          <div className="input-prefix">
            <span>€</span>
            <input type="number" step="0.01" value={data.price}
                   onChange={(e) => setData({ ...data, price: e.target.value })} />
          </div>
        </Field>
        <Field label="Precio rebajado (€)" hint="Déjalo vacío si no hay rebaja.">
          <div className="input-prefix">
            <span>€</span>
            <input type="number" step="0.01" placeholder="Sin rebaja" value={data.priceSale}
                   onChange={(e) => setData({ ...data, priceSale: e.target.value })} />
          </div>
        </Field>
        <Field label="Formato / Peso" visible>
          <input type="text" value={data.format}
                 onChange={(e) => setData({ ...data, format: e.target.value })} />
        </Field>
      </div>
      <div className="row row--2">
        <Field label="Unidades en stock" required>
          <input type="number" min="0" value={data.stock}
                 onChange={(e) => setData({ ...data, stock: +e.target.value })} />
          {stockLow && (
            <span className="chip chip--amber" style={{ marginTop: 6, alignSelf: "flex-start" }}>
              Stock bajo — se mostrará aviso al cliente
            </span>
          )}
        </Field>
        <Field label="Umbral de aviso"
               hint="Notificación automática al llegar a esta cantidad.">
          <input type="number" min="0" value={data.stockAlert}
                 onChange={(e) => setData({ ...data, stockAlert: +e.target.value })} />
        </Field>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 4 — Badges
// ─────────────────────────────────────────────────────────────
function CardBadges({ data, setData }) {
  const positions = ["Arriba izquierda", "Arriba derecha", "Abajo izquierda", "Abajo derecha"];
  return (
    <Card n={4} title="Badges y certificaciones"
          hint="Etiquetas flotantes sobre la imagen del producto."
          complete={data.badges.every(b => b.text)}>
      <div className="badges-grid">
        {data.badges.map((b, i) => (
          <div key={i} className="badge-row">
            <span className="badge-row__pos">{positions[i]}</span>
            <span className="badge-row__dot" style={{ background: b.color }} title={b.color} />
            <input type="text" value={b.text}
                   onChange={(e) => {
                     const copy = [...data.badges];
                     copy[i] = { ...copy[i], text: e.target.value };
                     setData({ ...data, badges: copy });
                   }} />
          </div>
        ))}
      </div>
      <p className="field__hint" style={{ marginTop: 12 }}>
        Aparecen superpuestos sobre la foto principal en las cuatro esquinas.
      </p>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 5 — Flavor pills
// ─────────────────────────────────────────────────────────────
function CardFlavors({ data, setData }) {
  return (
    <Card n={5} title="Perfil sensorial" hint="Pills de sabor en la ficha."
          complete={data.flavors.length >= 3}>
      <Field label="Características de sabor" visible
             hint="El cliente las ve como etiquetas visuales antes de añadir al carrito. Enter para añadir.">
        <TagInput
          value={data.flavors}
          onChange={(v) => setData({ ...data, flavors: v })}
          placeholder="Escribe un sabor y pulsa Enter…"
          variant="flavor"
        />
      </Field>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 6 — Imágenes
// ─────────────────────────────────────────────────────────────
function CardImages({ data }) {
  return (
    <Card n={6} title="Imágenes" hint="Foto principal + galería de ángulos."
          complete={true}>
      <div className="images">
        <div className="upload-main">
          <img src={PHOTO_URL} alt="Queso de Cabra Curado" />
          <div className="upload-main__meta">
            <span className="upload-main__file">
              {I.image}
              Queso-Cabra-CURADO-240-gr-Ecologico.jpg
            </span>
            <span className="chip chip--amber">Convertir a WebP recomendado</span>
          </div>
        </div>
        <div className="upload-gallery">
          <span className="upload-gallery__label">
            Galería adicional <span className="muted">(ángulo de corte, corteza, detalle)</span>
          </span>
          <div className="upload-gallery__slots">
            {[0,1,2].map(i => (
              <button key={i} className="upload-slot" type="button" aria-label="Subir imagen">
                {I.plus}
              </button>
            ))}
          </div>
          <p className="field__hint">
            Se muestran como miniaturas bajo la imagen principal.
          </p>
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 7 — Pairings
// ─────────────────────────────────────────────────────────────
function CardPairings({ data, setData }) {
  return (
    <Card n={7} title="Maridaje · Va bien con..." hint="Strip horizontal bajo la ficha."
          complete={data.pairings.every(p => p.name)}>
      <Field label="Productos de maridaje" visible
             hint="Selecciona hasta 4 productos que combinen bien con éste.">
        <div>
          {data.pairings.map((p, i) => (
            <div key={i} className="product-row">
              <div className="product-row__thumb">{I.image}</div>
              <input type="text" value={p.name}
                     onChange={(e) => {
                       const copy = [...data.pairings];
                       copy[i] = { ...copy[i], name: e.target.value };
                       setData({ ...data, pairings: copy });
                     }} />
              <div className="input-prefix">
                <span>€</span>
                <input type="text" value={p.price}
                       onChange={(e) => {
                         const copy = [...data.pairings];
                         copy[i] = { ...copy[i], price: e.target.value };
                         setData({ ...data, pairings: copy });
                       }} />
              </div>
              <button className="product-row__drag" type="button" aria-label="Reordenar">{I.drag}</button>
            </div>
          ))}
        </div>
      </Field>
      <button className="btn btn--text" type="button" style={{ marginTop: 8 }}>
        {I.plus} Añadir otro maridaje
      </button>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 8 — Related
// ─────────────────────────────────────────────────────────────
function CardRelated({ data, setData }) {
  return (
    <Card n={8} title="Productos relacionados"
          hint="Al final de la ficha — solo de la misma familia."
          complete={data.related.every(p => p.name)}>
      <span className="chip chip--red" style={{ marginBottom: 12, display: "inline-flex" }}>
        {I.warn} No mezclar familias — solo quesos con quesos
      </span>
      <Field label="Quesos relacionados" visible
             hint="Tres productos máximo. Solo se aceptan productos de la categoría Queso.">
        <div>
          {data.related.map((p, i) => (
            <div key={i} className="product-row">
              <div className="product-row__thumb">{I.image}</div>
              <input type="text" value={p.name}
                     onChange={(e) => {
                       const copy = [...data.related];
                       copy[i] = { ...copy[i], name: e.target.value };
                       setData({ ...data, related: copy });
                     }} />
              <div className="input-prefix">
                <span>€</span>
                <input type="text" value={p.price}
                       onChange={(e) => {
                         const copy = [...data.related];
                         copy[i] = { ...copy[i], price: e.target.value };
                         setData({ ...data, related: copy });
                       }} />
              </div>
              <button className="product-row__drag" type="button" aria-label="Reordenar">{I.drag}</button>
            </div>
          ))}
        </div>
      </Field>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Card 9 — SEO
// ─────────────────────────────────────────────────────────────
function CardSEO({ data, setData }) {
  const titleLen = data.seoTitle.length;
  const metaLen = data.seoMeta.length;
  const titleWarn = titleLen > 60;
  const metaOk = metaLen >= 120 && metaLen <= 160;

  return (
    <Card n={9} title="SEO" hint="Cómo aparece en Google." complete={!!data.seoTitle && !!data.seoMeta}>
      <Field label="Título SEO (Google)" hint="Ideal entre 50 y 60 caracteres.">
        <input type="text" value={data.seoTitle}
               onChange={(e) => setData({ ...data, seoTitle: e.target.value })} />
        <div className="charcount">
          <span>Cómo aparece el título en los resultados.</span>
          <strong className={titleWarn ? "charcount__warn" : "charcount__ok"}>
            {titleLen} / 60 {titleWarn ? `— Reducir ${titleLen - 60} caracteres` : "— correcto"}
          </strong>
        </div>
      </Field>

      <Field label="Meta descripción" hint="Resumen que Google muestra debajo del título.">
        <textarea rows="3" value={data.seoMeta}
                  onChange={(e) => setData({ ...data, seoMeta: e.target.value })} />
        <div className="charcount">
          <span>Idealmente 140–160 caracteres.</span>
          <strong className={metaOk ? "charcount__ok" : "charcount__warn"}>
            {metaLen} / 160 — {metaOk ? "correcto" : "ajustar"}
          </strong>
        </div>
      </Field>

      <Field label="URL amigable (slug)" hint="Se genera automáticamente. Puedes editarla.">
        <div className="input-prefix">
          <span style={{ color: "var(--oak-faint)" }}>/tienda</span>
          <input type="text" value={data.slug} style={{ paddingLeft: 60 }}
                 onChange={(e) => setData({ ...data, slug: e.target.value })} />
        </div>
      </Field>

      <div className="seo-preview" aria-label="Vista previa Google">
        <div className="seo-preview__url">
          latragoneria.com {" › "} tienda {data.slug}
        </div>
        <div className="seo-preview__title">{data.seoTitle}</div>
        <div className="seo-preview__meta">{data.seoMeta}</div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────
function Sidebar({ data, setData }) {
  return (
    <aside className="sidebar">
      <SidePublish data={data} setData={setData} />
      <SideCategories data={data} setData={setData} />
      <SideTags data={data} setData={setData} />
      <SidePreview data={data} />
    </aside>
  );
}

function SidePublish({ data, setData }) {
  return (
    <div className="side">
      <h4 className="side__head">Publicar</h4>
      <div className="status-toggle">
        <button
          type="button"
          data-kind="draft"
          className={data.status === "draft" ? "is-active" : ""}
          onClick={() => setData({ ...data, status: "draft" })}>
          <span className="dot" /> Borrador
        </button>
        <button
          type="button"
          data-kind="published"
          className={data.status === "published" ? "is-active" : ""}
          onClick={() => setData({ ...data, status: "published" })}>
          <span className="dot" /> Publicado
        </button>
      </div>
      <button className="btn btn--gold btn--block btn--lg" type="button">
        {I.check} Publicar producto
      </button>
      <button className="btn btn--ghost btn--block" type="button" style={{ marginTop: 8 }}>
        {I.save} Guardar borrador
      </button>
      <p className="side__publish-meta">Última edición: hoy, 14:32 · por Juan Carlos</p>
    </div>
  );
}

function SideCategories({ data, setData }) {
  const toggle = (id) => {
    const has = data.categories.includes(id);
    setData({ ...data, categories: has ? data.categories.filter(c => c !== id) : [...data.categories, id] });
  };
  const row = (id, label, child = false) => (
    <label className={child ? "cat-row cat-row--child" : "cat-row"}>
      <input
        type="checkbox"
        className="cb"
        checked={data.categories.includes(id)}
        onChange={() => toggle(id)}
      />
      <span>{label}</span>
    </label>
  );
  return (
    <div className="side">
      <h4 className="side__head">Categorías</h4>
      <div className="cat-tree">
        <div className="cat-tree__group">
          {row("queso-embutido", "Queso y embutido")}
          {row("queso", "Queso", true)}
        </div>
        <div className="cat-tree__group">
          {row("eco-vegano", "Ecológico y vegano")}
          {row("ecologico", "Ecológico", true)}
        </div>
        <div className="cat-tree__group">
          {row("para-untar", "Para untar")}
          {row("queso-untar", "Queso para untar", true)}
        </div>
      </div>
    </div>
  );
}

function SideTags({ data, setData }) {
  return (
    <div className="side">
      <h4 className="side__head">Etiquetas</h4>
      <TagInput
        value={data.tags}
        onChange={(v) => setData({ ...data, tags: v })}
        placeholder="Añadir etiqueta…"
      />
      <p className="field__hint" style={{ marginTop: 10 }}>
        Las etiquetas ayudan a clientes a descubrir el producto.
      </p>
    </div>
  );
}

function Stars({ value = 0 }) {
  return (
    <span className="preview-card__stars-inner" aria-label={`${value} de 5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= value ? "var(--gold)" : "var(--oak-faint)" }}>{I.star}</span>
      ))}
    </span>
  );
}

function SidePreview({ data }) {
  return (
    <div className="side" style={{ background: "var(--surface)" }}>
      <h4 className="side__head">Vista previa rápida</h4>
      <div className="preview-card">
        <div className="preview-card__photo">
          <span className="badge-eco">{I.leaf} Ecológico</span>
          <img src={PHOTO_URL} alt="" />
        </div>
        <div className="preview-card__body">
          <h5 className="preview-card__name">{data.displayLine1}</h5>
          <div className="preview-card__stars">
            <Stars value={0} />
            <span>0 reseñas</span>
          </div>
          <div className="preview-card__row">
            <span className="preview-card__price">€{Number(data.price).toFixed(2).replace(".", ",")}</span>
            <span className="muted" style={{ fontSize: 11 }}>{data.format}</span>
          </div>
          <button className="preview-card__cta" type="button">Añadir al carrito</button>
        </div>
      </div>
      <p className="preview-caption">Así aparece en el catálogo.</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────
function App() {
  const [data, setData] = useState({
    name: "Queso Cabra CURADO Ecológico",
    displayLine1: "Queso de Cabra Curado",
    displayLine2: "Ecológico · 240g",
    tagline: "Corteza de pleita · Leche cruda · Regusto a cava y frutos secos",

    descShort:
      "Elaborado con leche cruda de cabra ecológica y cuajo vegetal. Corteza natural con dibujo de pleita, pasta blanca y firme.",
    descLong:
`Elaborado con leche cruda de cabra de producción ecológica y cuajo vegetal. Corteza natural con dibujo de pleita. Al corte, pasta blanca y firme con algunos ojos mecánicos.
En nariz, olor a cava viejo y aceite de oliva. En boca, textura dura y granulosa, sabor intenso con un largo regusto a cava y frutos secos.`,
    originPlace: "Zuheros, Córdoba",
    originDetail: "Pueblo al sur de la Sierra Subbética, tradición quesera artesanal.",

    price: "8.75",
    priceSale: "",
    format: "Pieza ~240g",
    stock: 3,
    stockAlert: 5,

    badges: [
      { text: "Ecológico certificado", color: "#2C5F2E" },
      { text: "Zuheros · Córdoba",     color: "#3E1F00" },
      { text: "Leche cruda · Cuajo vegetal", color: "#F0E8D6" },
      { text: "Para untar · Para tabla",     color: "#F0E8D6" },
    ],

    flavors: ["Intenso", "Granuloso", "Frutos secos", "Cava", "Vegetal"],

    pairings: [
      { name: "Torta de Romero", price: "4,20" },
      { name: "Crackers con tomate y albahaca", price: "5,90" },
      { name: "Vino Blanco Ecológico", price: "16,50" },
      { name: "Mermelada de Higos", price: "6,75" },
    ],
    related: [
      { name: "Cuña Queso Cabra Payoyo Semi", price: "10,55" },
      { name: "Queso Andazul",                price: "9,80" },
      { name: "Manchego Curado",              price: "13,20" },
    ],

    seoTitle: "Queso de Cabra Curado Ecológico · Zuheros, Córdoba · La Tragonería",
    seoMeta: "Queso de cabra curado ecológico de Zuheros, Córdoba. Leche cruda, cuajo vegetal, corteza de pleita. ~240g · €8.75 · Envío a toda España desde La Tragonería, Sevilla.",
    slug: "/queso-cabra-curado-ecologico",

    status: "published",
    categories: ["queso-embutido", "queso", "eco-vegano", "ecologico", "para-untar", "queso-untar"],
    tags: ["cata de quesos", "ecológico", "queso", "salsa queso", "tabla de quesos", "Zuheros", "leche cruda"],
  });

  return (
    <>
      <TopBar />

      <div className="actionstrip">
        <div className="actionstrip__title">
          <h1>Nuevo producto</h1>
          <p>Completa los campos. Los que tienen el ojo se ven directamente en la ficha del cliente.</p>
        </div>
        <div className="actionstrip__actions">
          <button className="btn btn--ghost" type="button">Descartar</button>
          <button className="btn btn--ghost" type="button">{I.save} Guardar borrador</button>
          <button className="btn btn--gold" type="button">{I.check} Publicar producto</button>
        </div>
      </div>

      <main className="layout">
        <div className="main">
          <CardIdentidad data={data} setData={setData} />
          <CardDescripcion data={data} setData={setData} />
          <CardPrecio data={data} setData={setData} />
          <CardBadges data={data} setData={setData} />
          <CardFlavors data={data} setData={setData} />
          <CardImages data={data} />
          <CardPairings data={data} setData={setData} />
          <CardRelated data={data} setData={setData} />
          <CardSEO data={data} setData={setData} />
        </div>
        <Sidebar data={data} setData={setData} />
      </main>

      {/* Mobile sticky publish bar */}
      <div className="mobile-publish">
        <button className="btn btn--ghost" type="button">{I.save}</button>
        <button className="btn btn--gold btn--lg" type="button">{I.check} Publicar producto</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
