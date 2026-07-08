import { useState, useRef, useCallback, useEffect } from 'react';

const ACCENT = '#B5451F';
const CREAM = '#FBF3E7';

/* ─────────────────────────────────────────
   Ligne produit — style menu imprimé + image
───────────────────────────────────────── */
export function ProduitCard({ produit, onAdd, lang, isMobile }) {
  const L = lang === 'en' ? { add: 'Add' } : { add: 'Ajouter' };

  const hasImage = produit.image_url && produit.image_url.trim() !== '';

  if (isMobile) {
    return (
      <div style={{
        padding: '14px 0',
        borderBottom: '1px solid #F0EBE3',
        display: 'flex',
        gap: hasImage ? 14 : 0,
        alignItems: 'flex-start',
      }}>
        {hasImage && (
          <div style={{
            width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
            background: '#F5F0E8', border: '1px solid #EDE5D8',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <img src={produit.image_url} alt={produit.nom}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy" />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 15.5, fontWeight: 700, color: '#2C1810',
              whiteSpace: 'nowrap',
            }}>{produit.nom}</span>

            <span style={{
              flex: 1, borderBottom: '1.5px dotted #D5CDB8',
              position: 'relative', top: -3, minWidth: 8,
            }} />

            <span style={{
              fontSize: 15.5, fontWeight: 800, color: ACCENT,
              whiteSpace: 'nowrap',
            }}>{Number(produit.prix).toFixed(2)} $</span>
          </div>

          {produit.description && (
            <p style={{
              fontSize: 12.5, color: '#8A7F70', fontStyle: 'italic',
              marginTop: 3, lineHeight: 1.35,
            }}>{produit.description}</p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 }}>
            <button onClick={() => onAdd({ ...produit, prix_unit: produit.prix, quantite: 1 })} style={{
              width: 36, height: 36, borderRadius: 10,
              border: 'none', background: ACCENT, color: '#FFFFFF',
              fontSize: 22, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              touchAction: 'manipulation',
              boxShadow: '0 2px 8px rgba(184,52,42,0.25)',
            }}>+</button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div style={{ padding: '8px 0', borderBottom: '1px solid #F5F0E8' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 13.5, fontWeight: 700, color: '#2C1810',
          whiteSpace: 'nowrap',
        }}>{produit.nom}</span>
        <span style={{ flex: 1, borderBottom: '1.5px dotted #D5CDB8', position: 'relative', top: -3, minWidth: 8 }} />
        <span style={{ fontSize: 13.5, fontWeight: 800, color: ACCENT, whiteSpace: 'nowrap' }}>{Number(produit.prix).toFixed(2)} $</span>
      </div>
      {produit.description && (
        <p style={{ fontSize: 10.5, color: '#8A7F70', fontStyle: 'italic', marginTop: 2, lineHeight: 1.3 }}>
          {produit.description.length > 55 ? produit.description.slice(0, 55) + '…' : produit.description}
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <button onClick={() => onAdd({ ...produit, prix_unit: produit.prix, quantite: 1 })} style={{
          width: 26, height: 26, borderRadius: 6, border: 'none', background: ACCENT, color: '#FFFFFF',
          fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'manipulation',
        }}>+</button>
      </div>
    </div>
  );
}

/* ─── Desktop book page ─── */
function PageContent({ produits, categorie, pageNum, totalPages, onAdd, lang, side }) {
  return (
    <div style={{ width: '100%', height: '100%', background: CREAM, padding: '20px 16px 12px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {categorie && (
        <div style={{ borderBottom: `2px solid ${ACCENT}`, marginBottom: 10, paddingBottom: 8 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 800, color: ACCENT, margin: 0 }}>
            {categorie?.nom}
            <span style={{ fontSize: 10, fontWeight: 500, color: '#B5A98F', marginLeft: 6 }}>({produits.length})</span>
          </h3>
        </div>
      )}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {produits.map(p => <ProduitCard key={p.id} produit={p} onAdd={onAdd} lang={lang} isMobile={false} />)}
      </div>
      <p style={{ textAlign: side === 'left' ? 'left' : 'right', fontSize: 10, color: '#D5CDB8', marginTop: 6, fontFamily: "'Playfair Display', serif" }}>{pageNum} / {totalPages}</p>
    </div>
  );
}

function FlippingPage({ flipping, flipDir, fromPage, toPage, onAdd, lang, totalPages, spreadIndex }) {
  if (!flipping) return null;
  return (
    <div style={{ position: 'absolute', width: '50%', top: 0, bottom: 0, [flipDir === 'next' ? 'right' : 'left']: 0, transformOrigin: flipDir === 'next' ? 'left center' : 'right center', transformStyle: 'preserve-3d', zIndex: 20, animation: `pageFlip 0.6s cubic-bezier(0.4,0,0.2,1) forwards` }}>
      <style>{`@keyframes pageFlip { from { transform: rotateY(0deg); } to { transform: rotateY(${flipDir === 'next' ? '-180deg' : '180deg'}); } }`}</style>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: flipDir === 'next' ? '0 10px 10px 0' : '10px 0 0 10px' }}>
        {fromPage && <PageContent produits={fromPage.produits} categorie={fromPage.categorie} pageNum={flipDir === 'next' ? spreadIndex * 2 + 2 : spreadIndex * 2 + 1} totalPages={totalPages} onAdd={onAdd} lang={lang} side={flipDir === 'next' ? 'right' : 'left'} />}
      </div>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) scaleX(-1)', borderRadius: flipDir === 'next' ? '10px 0 0 10px' : '0 10px 10px 0' }}>
        {toPage && <PageContent produits={toPage.produits} categorie={toPage.categorie} pageNum={flipDir === 'next' ? spreadIndex * 2 + 3 : spreadIndex * 2} totalPages={totalPages} onAdd={onAdd} lang={lang} side={flipDir === 'next' ? 'left' : 'right'} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Book3D — main component
───────────────────────────────────────── */
export default function Book3D({ pages, onAdd, lang, isMobile, parametres }) {
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null);
  const [nextSpread, setNextSpread] = useState(0);
  const totalSpreads = Math.ceil(pages.length / 2);

  // Mobile swipe state — vraie page qui se tourne, suit le doigt en temps reel
  const [activeCat, setActiveCat] = useState(0);
  const [dragDir, setDragDir] = useState(null);      // 'next' | 'prev' | null
  const [dragProgress, setDragProgress] = useState(0); // 0 -> 1
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
  const touchDeltaY = useRef(0);
  const isHorizontalSwipe = useRef(null);
  const containerWidth = useRef(0);
  const dragDirRef = useRef(null);

  const flip = useCallback((dir) => {
    if (flipping) return;
    if (dir === 'next' && spread >= totalSpreads - 1) return;
    if (dir === 'prev' && spread <= 0) return;
    const next = dir === 'next' ? spread + 1 : spread - 1;
    setFlipDir(dir); setNextSpread(next); setFlipping(true);
    setTimeout(() => { setSpread(next); setFlipping(false); setFlipDir(null); }, 600);
  }, [flipping, spread, totalSpreads]);

  if (!pages || pages.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#B5A98F' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <p style={{ fontSize: 15 }}>Aucun produit disponible</p>
    </div>
  );

  // ═══════════════════════════════════════════
  //  MOBILE — Horizontal swipe between categories
  // ═══════════════════════════════════════════
  if (isMobile) {
    // Build categories with their products
    const categories = [];
    pages.forEach(p => {
      if (!categories.find(c => c.nom === p.categorie?.nom)) {
        categories.push({ ...p.categorie, _products: [] });
      }
      const cat = categories.find(c => c.nom === p.categorie?.nom);
      cat._products.push(...p.produits);
    });

    const catCount = categories.length;
    const panelWidth = containerWidth.current || window.innerWidth;

    const goToCat = (idx) => {
      if (idx < 0 || idx >= catCount) return;
      setDragDir(null);
      dragDirRef.current = null;
      setDragProgress(0);
      setActiveCat(idx);
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchDeltaX.current = 0;
      touchDeltaY.current = 0;
      isHorizontalSwipe.current = null;
      setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      // Determine swipe direction on first significant movement
      if (isHorizontalSwipe.current === null) {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
        }
      }

      if (isHorizontalSwipe.current === true) {
        touchDeltaX.current = dx;
        e.preventDefault?.(); // Empeche le scroll vertical pendant le tourne-page

        // Determine la direction de la page qu'on tourne au premier mouvement significatif
        if (dragDirRef.current === null && Math.abs(dx) > 4) {
          const dir = dx < 0 ? 'next' : 'prev';
          if ((dir === 'next' && activeCat < catCount - 1) || (dir === 'prev' && activeCat > 0)) {
            dragDirRef.current = dir;
            setDragDir(dir);
          } else {
            dragDirRef.current = 'blocked';
          }
        }

        if (dragDirRef.current === 'next' || dragDirRef.current === 'prev') {
          // Suit le doigt en temps reel : 0 -> 1 sur toute la largeur de l'ecran
          const progress = Math.min(1, Math.abs(dx) / panelWidth);
          setDragProgress(progress);
        } else if (dragDirRef.current === 'blocked') {
          // Deja a la premiere/derniere categorie : petite resistance elastique
          const elastic = Math.min(0.15, Math.abs(dx) / panelWidth * 0.3);
          setDragProgress(elastic);
        }
      }
    };

    const handleTouchEnd = () => {
      setIsSwiping(false);
      const threshold = 0.3; // 30% de la largeur pour valider la page tournee

      if (dragProgress > threshold && (dragDirRef.current === 'next' || dragDirRef.current === 'prev')) {
        const dir = dragDirRef.current;
        // Termine la rotation a 100%, puis bascule la categorie active une fois l'anim finie
        setDragProgress(1);
        setTimeout(() => {
          setActiveCat(c => dir === 'next' ? c + 1 : c - 1);
          setDragDir(null);
          dragDirRef.current = null;
          setDragProgress(0);
        }, 280);
      } else {
        // Retour elastique a la position de depart
        setDragProgress(0);
        setTimeout(() => {
          setDragDir(null);
          dragDirRef.current = null;
        }, 280);
      }
      isHorizontalSwipe.current = null;
    };

    const currentCat = categories[activeCat];
    // Page visible EN DESSOUS pendant le tourne-page (celle qui se revele) :
    // - en tournant vers 'next' -> c'est la categorie suivante qui apparait
    // - en tournant vers 'prev' -> c'est la categorie actuelle qui reste visible en dessous
    const underneathCat = dragDir === 'next' ? categories[activeCat + 1] : dragDir === 'prev' ? currentCat : null;
    // Angle de la page qui tourne : 0 (a plat, face visible) -> -90deg (tranche, disparait)
    const turnAngle = -dragProgress * 90;

    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column',
          width: '100%', height: '100%',
          background: CREAM, overflow: 'hidden',
        }}
        ref={el => { if (el) containerWidth.current = el.offsetWidth; }}
      >
        {/* ══ Category tabs bar ══ */}
        <div style={{
          flexShrink: 0,
          background: '#FFFFFF',
          borderBottom: '1px solid #EDE5D8',
          padding: '10px 12px',
        }}>
          <div style={{
            display: 'flex', gap: 6, overflowX: 'auto',
            scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {categories.map((cat, i) => (
              <button key={i} onClick={() => goToCat(i)} style={{
                flexShrink: 0,
                padding: '8px 16px', borderRadius: 24,
                background: i === activeCat ? ACCENT : 'transparent',
                color: i === activeCat ? '#FFFFFF' : '#8A7F70',
                border: i === activeCat ? 'none' : '1px solid #E0D8C8',
                fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                whiteSpace: 'nowrap', touchAction: 'manipulation',
                transition: 'all 0.25s ease',
              }}>
                <span style={{ fontSize: 14 }}>{cat?.emoji || '🍽️'}</span>
                {cat?.nom}
              </button>
            ))}
          </div>
        </div>

        {/* ══ Category title bar ══ */}
        <div style={{
          flexShrink: 0,
          background: CREAM,
          padding: '14px 20px 10px',
          borderBottom: `2px solid ${ACCENT}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 20, fontWeight: 800, color: ACCENT, margin: 0,
          }}>
            {currentCat?.nom}
            <span style={{ fontSize: 12, fontWeight: 500, color: '#B5A98F', marginLeft: 8 }}>
              ({currentCat?._products.length})
            </span>
          </h2>
          {currentCat?.emoji && (
            <span style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#FFFFFF', border: '1px solid #EDE5D8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{currentCat.emoji}</span>
          )}
        </div>

        {/* ══ Page qui se tourne — vrai effet livre, suit le doigt en temps reel ══ */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            flex: 1, overflow: 'hidden', position: 'relative',
            touchAction: 'pan-y', // Autorise le scroll vertical dans chaque page
            perspective: 1400,
          }}
        >
          {/* Page revelee en dessous pendant le tourne-page */}
          {underneathCat && (
            <div style={{
              position: 'absolute', inset: 0,
              overflowY: 'auto', WebkitOverflowScrolling: 'touch',
              padding: '4px 20px 100px',
              background: CREAM, zIndex: 1,
            }}>
              {underneathCat._products.map(p => (
                <ProduitCard key={p.id} produit={p} onAdd={onAdd} lang={lang} isMobile={true} />
              ))}
            </div>
          )}

          {/* Page active — celle qui tourne physiquement (hinge droite si 'next', gauche si 'prev') */}
          <div style={{
            position: 'absolute', inset: 0,
            overflowY: dragDir ? 'hidden' : 'auto', WebkitOverflowScrolling: 'touch',
            padding: '4px 20px 100px',
            background: CREAM, zIndex: 2,
            transform: dragDir === 'prev'
              ? `rotateY(${90 - dragProgress * 90}deg)`    // arrive de la tranche (90, invisible) vers a plat (0), charniere a droite
              : `rotateY(${turnAngle}deg)`,                 // part a plat (0) vers la tranche (-90, invisible), charniere a gauche
            transformOrigin: dragDir === 'prev' ? 'right center' : 'left center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: dragDir ? '0 0 24px rgba(0,0,0,0.15)' : 'none',
            transition: isSwiping ? 'none' : 'transform 0.28s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.28s',
          }}>
            {(dragDir === 'prev' ? categories[activeCat - 1] : currentCat)?._products.map(p => (
              <ProduitCard key={p.id} produit={p} onAdd={onAdd} lang={lang} isMobile={true} />
            ))}
          </div>
        </div>

        {/* ══ Category dots indicator ══ */}
        <div style={{
          flexShrink: 0,
          display: 'flex', justifyContent: 'center', gap: 6,
          padding: '8px 0 8px',
          background: '#FFFFFF',
          borderTop: '1px solid #EDE5D8',
        }}>
          {categories.map((_, i) => (
            <div key={i} onClick={() => goToCat(i)} style={{
              width: i === activeCat ? 24 : 7, height: 7, borderRadius: 4,
              background: i === activeCat ? ACCENT : '#E0D8C8',
              transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>

        {/* ══ Footer bar — adresse + WhatsApp ══ */}
        <div style={{
          flexShrink: 0,
          background: '#2C1810',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            {parametres?.adresse && (
              <p style={{ fontSize: 11, color: '#C5BBA8', margin: 0, lineHeight: 1.3,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                📍 {parametres.adresse}
              </p>
            )}
            {parametres?.telephone && (
              <p style={{ fontSize: 11, color: '#C5BBA8', margin: '2px 0 0', lineHeight: 1.3 }}>
                📞 {parametres.telephone}
              </p>
            )}
          </div>
          {parametres?.whatsapp && (
            <a href={`https://wa.me/${parametres.whatsapp}`} target="_blank" rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                background: '#25D366', color: '#FFFFFF',
                padding: '8px 14px', borderRadius: 8,
                fontSize: 12, fontWeight: 700, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 5,
                whiteSpace: 'nowrap',
              }}>
              <span style={{ fontSize: 14 }}>💬</span> WhatsApp
            </a>
          )}
        </div>

        {/* ══ Signature — développé par Inspire by YuuStore ══ */}
        <a href="https://wa.me/243977555768" target="_blank" rel="noopener noreferrer" style={{
          flexShrink: 0, display: 'block', textAlign: 'center',
          background: '#20130C', color: '#8A7A68',
          padding: '5px 8px', fontSize: 10, textDecoration: 'none',
        }}>
          Développé par Inspire by YuuStore
        </a>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  //  DESKTOP — Book layout
  // ═══════════════════════════════════════════
  const leftPage = pages[spread * 2] || null;
  const rightPage = pages[spread * 2 + 1] || null;
  const nextLeftPage = pages[nextSpread * 2] || null;
  const nextRightPage = pages[nextSpread * 2 + 1] || null;
  const flippingFromPage = flipDir === 'next' ? rightPage : leftPage;
  const flippingToPage = flipDir === 'next' ? nextLeftPage : nextRightPage;
  const bookHeight = 540;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div
        onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}
        onTouchEnd={(e) => {
          if (touchStartX.current === 0) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) flip(diff > 0 ? 'next' : 'prev');
          touchStartX.current = 0;
        }}
        style={{ width: '100%', maxWidth: 820, perspective: '2000px', userSelect: 'none' }}
      >
        <div style={{
          display: 'flex', height: bookHeight, position: 'relative',
          boxShadow: '0 12px 40px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          borderRadius: '6px 12px 12px 6px', transformStyle: 'preserve-3d',
        }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, transform: 'translateX(-50%)', background: 'linear-gradient(to right, #F0EBE3, #E0D8C8, #F0EBE3)', zIndex: 15 }} />
          <div style={{ flex: 1, overflow: 'hidden', borderRadius: '6px 0 0 6px', opacity: flipping && flipDir === 'prev' ? 0 : 1, background: CREAM }}>
            {leftPage ? <PageContent produits={leftPage.produits} categorie={leftPage.categorie} pageNum={spread * 2 + 1} totalPages={pages.length} onAdd={onAdd} lang={lang} side="left" /> : <div style={{ width: '100%', height: '100%', background: CREAM }} />}
          </div>
          <div style={{ flex: 1, overflow: 'hidden', borderRadius: '0 6px 6px 0', opacity: flipping && flipDir === 'next' ? 0 : 1, background: CREAM }}>
            {rightPage ? <PageContent produits={rightPage.produits} categorie={rightPage.categorie} pageNum={spread * 2 + 2} totalPages={pages.length} onAdd={onAdd} lang={lang} side="right" /> : <div style={{ width: '100%', height: '100%', background: CREAM }} />}
          </div>
          {flipping && (
            <>
              {flipDir === 'next' && nextLeftPage && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', overflow: 'hidden', borderRadius: '6px 0 0 6px', zIndex: 5 }}>
                  <PageContent produits={nextLeftPage.produits} categorie={nextLeftPage.categorie} pageNum={nextSpread * 2 + 1} totalPages={pages.length} onAdd={onAdd} lang={lang} side="left" />
                </div>
              )}
              {flipDir === 'prev' && nextRightPage && (
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', overflow: 'hidden', borderRadius: '0 6px 6px 0', zIndex: 5 }}>
                  <PageContent produits={nextRightPage.produits} categorie={nextRightPage.categorie} pageNum={nextSpread * 2 + 2} totalPages={pages.length} onAdd={onAdd} lang={lang} side="right" />
                </div>
              )}
            </>
          )}
          <FlippingPage flipping={flipping} flipDir={flipDir} fromPage={flippingFromPage} toPage={flippingToPage} onAdd={onAdd} lang={lang} totalPages={pages.length} spreadIndex={spread} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button onClick={() => flip('prev')} disabled={spread === 0 || flipping} style={{
          width: 44, height: 44, borderRadius: '50%',
          background: spread === 0 ? '#F5F0E8' : ACCENT, border: 'none', color: spread === 0 ? '#D5CDB8' : '#FFFFFF',
          fontSize: 20, cursor: spread === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <div key={i} onClick={() => !flipping && setSpread(i)} style={{
              width: i === spread ? 24 : 7, height: 7, borderRadius: 4,
              background: i === spread ? ACCENT : '#E0D8C8', transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>
        <button onClick={() => flip('next')} disabled={spread >= totalSpreads - 1 || flipping} style={{
          width: 44, height: 44, borderRadius: '50%',
          background: spread >= totalSpreads - 1 ? '#F5F0E8' : ACCENT, border: 'none', color: spread >= totalSpreads - 1 ? '#D5CDB8' : '#FFFFFF',
          fontSize: 20, cursor: spread >= totalSpreads - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>›</button>
      </div>
    </div>
  );
}
