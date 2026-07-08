import { useState, useEffect } from 'react';
import { getCategories, getProduits, appelServeur, getParametres } from '../lib/supabase';
import Book3D, { ProduitCard } from '../components/Book3D';
import Panier from '../components/Panier';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
}

const ITEMS_PER_PAGE = 6;

const T = {
  fr: {
    titre: 'Notre Menu', chargement: 'Chargement…',
    panier: 'Commande', appelServeur: '🔔 Serveur',
    appelServeurFull: '🔔 Appeler le serveur',
    tableModal: 'Votre numéro de table ?',
    tablePh: 'Ex: 5, Bar, Terrasse…',
    envoyer: 'Appeler', annuler: 'Annuler',
    appelOk: '🔔 Le serveur arrive !',
    errTable: 'Indiquez votre numéro de table.',
    errAppel: "Erreur: impossible d'appeler le serveur.",
  },
  en: {
    titre: 'Our Menu', chargement: 'Loading…',
    panier: 'Order', appelServeur: '🔔 Waiter',
    appelServeurFull: '🔔 Call waiter',
    tableModal: 'Your table number?',
    tablePh: 'e.g. 5, Bar, Terrace…',
    envoyer: 'Call', annuler: 'Cancel',
    appelOk: '🔔 Waiter is coming!',
    errTable: 'Please enter your table number.',
    errAppel: 'Error: could not call the waiter. Try again.',
  },
};

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [lang]                      = useState('fr');
  const [panier, setPanier]         = useState([]);
  const [showPanier, setShowPanier] = useState(false);
  const [showAppel, setShowAppel]   = useState(false);
  const [tableAppel, setTableAppel] = useState('');
  const [errAppel, setErrAppel]     = useState('');
  const [toast, setToast]           = useState('');
  const [appelLoading, setAppelLoading] = useState(false);
  const [parametres, setParametres] = useState(null);
  const [search, setSearch]         = useState('');

  const isMobile = useIsMobile();
  const L = T[lang];

  useEffect(() => {
    Promise.all([getCategories(), getProduits(), getParametres()]).then(([cats, prods, params]) => {
      setCategories(cats.data || []);
      setProduits(prods.data || []);
      setParametres(params.data || null);
      setLoading(false);
    });
  }, []);

  // Met à jour l'onglet du navigateur (titre + favicon) dès que les paramètres
  // du restaurant sont chargés, sans attendre un nouveau déploiement.
  useEffect(() => {
    if (!parametres) return;
    if (parametres.nom_restaurant) {
      document.title = `${parametres.nom_restaurant} - Menu`;
    }
    if (parametres.logo_url) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = parametres.logo_url;
    }
  }, [parametres]);

  const buildPages = () => {
    const pages = [];
    categories.forEach(cat => {
      const catProds = produits.filter(p => p.categorie_id === cat.id);
      if (!catProds.length) return;
      for (let i = 0; i < catProds.length; i += ITEMS_PER_PAGE) {
        pages.push({ categorie: cat, produits: catProds.slice(i, i + ITEMS_PER_PAGE) });
      }
    });
    const sansCat = produits.filter(p => !p.categorie_id);
    if (sansCat.length > 0) {
      for (let i = 0; i < sansCat.length; i += ITEMS_PER_PAGE) {
        pages.push({ categorie: { nom: 'Autres', emoji: '🍽️' }, produits: sansCat.slice(i, i + ITEMS_PER_PAGE) });
      }
    }
    return pages;
  };

  const handleAdd = (produit) => {
    setPanier(prev => {
      const idx = prev.findIndex(i => i.id === produit.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantite: next[idx].quantite + produit.quantite };
        return next;
      }
      return [...prev, { ...produit }];
    });
    showToast(`✓ ${produit.nom} ajouté`);
  };

  const handleUpdateQty = (idx, delta) => {
    setPanier(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], quantite: next[idx].quantite + delta };
      if (next[idx].quantite <= 0) next.splice(idx, 1);
      return next;
    });
  };

  const handleConfirm = (msg) => {
    setPanier([]); setShowPanier(false); showToast(msg);
  };

  const handleAppelServeur = async () => {
    if (!tableAppel.trim()) { setErrAppel(L.errTable); return; }
    setAppelLoading(true); setErrAppel('');
    const { error } = await appelServeur(tableAppel.trim());
    setAppelLoading(false);
    if (error) {
      setErrAppel(L.errAppel);
      return;
    }
    setShowAppel(false); setTableAppel('');
    showToast(L.appelOk);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const pages = buildPages();
  const totalItems = panier.reduce((s, i) => s + i.quantite, 0);

  // Recherche — insensible aux accents/majuscules, sur nom produit, description et categorie
  const normalize = (s) => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const searchActive = search.trim().length > 0;
  const getCatName = (catId) => categories.find(c => c.id === catId)?.nom || '';
  const filteredProduits = searchActive
    ? produits.filter(p => {
        const q = normalize(search);
        return normalize(p.nom).includes(q)
          || normalize(p.description).includes(q)
          || normalize(getCatName(p.categorie_id)).includes(q);
      })
    : [];

  return (
    <div style={{
      height: '100dvh',
      background: '#FBF3E7',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: 'hidden',
    }}>

      {/* ══ HEADER ══ */}
      <header style={{
        padding: isMobile ? '12px 16px' : '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #F0F0F0',
        background: '#FFFFFF',
        flexShrink: 0,
        gap: 10,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {parametres?.logo_url && (
            <img src={parametres.logo_url} alt="Logo"
              style={{
                width: isMobile ? 32 : 42, height: isMobile ? 32 : 42,
                borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
              }} />
          )}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isMobile ? 20 : 28,
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            margin: 0,
          }}>{parametres?.nom_restaurant || L.titre}</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12, flexShrink: 0 }}>
          <button onClick={() => setShowAppel(true)} style={{
            background: 'transparent', border: '1px solid #E0E0E0',
            color: '#666', borderRadius: 8,
            padding: isMobile ? '6px 12px' : '8px 16px',
            fontSize: isMobile ? 12 : 13, fontWeight: 600, cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>{isMobile ? '🔔' : L.appelServeurFull}</button>

          <button onClick={() => setShowPanier(true)} style={{
            background: totalItems > 0 ? '#B5451F' : 'transparent',
            border: totalItems > 0 ? 'none' : '1px solid #E0E0E0',
            color: totalItems > 0 ? '#FFFFFF' : '#666',
            borderRadius: 8,
            padding: isMobile ? '6px 12px' : '8px 18px',
            fontSize: isMobile ? 12 : 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
            whiteSpace: 'nowrap',
          }}>
            🛒 {!isMobile && L.panier}
            {totalItems > 0 && (
              <span style={{
                background: isMobile ? '#E8A94A' : 'rgba(255,255,255,0.25)',
                color: isMobile ? '#1A1A1A' : '#FFFFFF',
                borderRadius: '50%',
                minWidth: isMobile ? 18 : 20, height: isMobile ? 18 : 20,
                padding: '0 5px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isMobile ? 10 : 11, fontWeight: 800,
              }}>{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      {/* ══ BARRE DE RECHERCHE ══ */}
      <div style={{
        flexShrink: 0,
        padding: isMobile ? '10px 16px' : '14px 32px',
        background: '#FFFFFF',
        borderBottom: '1px solid #F0F0F0',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#F7F5EF', borderRadius: 10,
          padding: isMobile ? '8px 12px' : '9px 14px',
          maxWidth: isMobile ? '100%' : 480,
          margin: isMobile ? 0 : '0 auto',
          border: '1px solid #EDE7DA',
        }}>
          <span style={{ fontSize: 14, color: '#999' }}>🔎</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'en' ? 'Search a dish, a category…' : 'Rechercher un plat, une catégorie…'}
            style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              fontSize: isMobile ? 13.5 : 14, color: '#1A1A1A',
              fontFamily: "'Inter', sans-serif",
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              border: 'none', background: 'transparent', color: '#999',
              fontSize: 15, cursor: 'pointer', padding: 2, lineHeight: 1,
            }}>✕</button>
          )}
        </div>
      </div>

      {/* ══ CONTENU ══ */}
      <main style={{
        flex: 1,
        overflow: (isMobile && !searchActive) ? 'hidden' : 'auto',
        maxWidth: isMobile ? '100%' : 960,
        width: '100%', margin: '0 auto',
        boxSizing: 'border-box',
        padding: isMobile ? (searchActive ? '4px 16px 40px' : 0) : '32px 24px 60px',
        background: isMobile ? '#FBF3E7' : 'transparent',
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '80px 0' }}>
            <div className="spinner" />
            <p style={{ color: '#999', fontSize: 14 }}>{L.chargement}</p>
          </div>
        ) : searchActive ? (
          filteredProduits.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#B5A98F' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
              <p style={{ fontSize: 14 }}>{lang === 'en' ? 'No results found.' : 'Aucun résultat trouvé.'}</p>
            </div>
          ) : (
            <div>
              {Object.entries(
                filteredProduits.reduce((acc, p) => {
                  const key = getCatName(p.categorie_id) || (lang === 'en' ? 'Others' : 'Autres');
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(p);
                  return acc;
                }, {})
              ).map(([catName, prods]) => (
                <div key={catName} style={{ marginBottom: 18 }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 15, fontWeight: 800, color: '#B5451F',
                    margin: '0 0 6px', borderBottom: '2px solid #B5451F', paddingBottom: 6,
                  }}>{catName} <span style={{ fontSize: 11, fontWeight: 500, color: '#B5A98F' }}>({prods.length})</span></h3>
                  {prods.map(p => (
                    <ProduitCard key={p.id} produit={p} onAdd={handleAdd} lang={lang} isMobile={isMobile} />
                  ))}
                </div>
              ))}
            </div>
          )
        ) : (
          <Book3D pages={pages} onAdd={handleAdd} lang={lang} isMobile={isMobile} parametres={parametres} />
        )}
      </main>

      {/* ══ FOOTER — desktop only (mobile footer is in scroll area) ══ */}
      {!isMobile && !loading && parametres && (parametres.adresse || parametres.telephone) && (
        <footer style={{
          borderTop: '1px solid #F0F0F0',
          padding: '28px 24px 40px',
          textAlign: 'center',
          color: '#999',
          fontSize: 13,
          maxWidth: 960, width: '100%', margin: '0 auto',
          flexShrink: 0,
        }}>
          {parametres.adresse && <p style={{ marginBottom: 6, color: '#666' }}>{parametres.adresse}</p>}
          {parametres.horaires && <p style={{ marginBottom: 6 }}>{parametres.horaires}</p>}
          {parametres.telephone && (
            <p style={{ color: '#666' }}>
              {parametres.telephone}
              {parametres.whatsapp && (
                <a href={`https://wa.me/${parametres.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#1A1A1A', marginLeft: 10, textDecoration: 'none', fontWeight: 600 }}>
                  WhatsApp
                </a>
              )}
            </p>
          )}
          <a href="https://wa.me/243977555768" target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', marginTop: 16, color: '#BBB', fontSize: 11, textDecoration: 'none' }}>
            Développé par Inspire by YuuStore
          </a>
        </footer>
      )}

      {/* ══ Mobile footer inside scroll ══ */}
      {isMobile && !loading && parametres && (parametres.adresse || parametres.telephone) && null}

      {/* ══ PANIER ══ */}
      {showPanier && (
        <Panier
          items={panier}
          onUpdateQty={handleUpdateQty}
          onRemove={(idx) => setPanier(prev => prev.filter((_, i) => i !== idx))}
          onClose={() => setShowPanier(false)}
          onConfirm={handleConfirm}
          lang={lang}
          isMobile={isMobile}
        />
      )}

      {/* ══ MODAL APPEL SERVEUR ══ */}
      {showAppel && (
        <div className="modal-overlay" onClick={() => setShowAppel(false)}>
          <div className="modal"
            style={{ maxWidth: isMobile ? '92vw' : 420 }}
            onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: isMobile ? 36 : 44, marginBottom: 10 }}>🔔</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 18 : 22, color: '#1A1A1A',
                margin: 0,
              }}>{L.tableModal}</h2>
            </div>
            <div style={{ marginBottom: 16 }}>
              <input className="input" value={tableAppel}
                onChange={e => { setTableAppel(e.target.value); setErrAppel(''); }}
                placeholder={L.tablePh}
                onKeyDown={e => e.key === 'Enter' && handleAppelServeur()}
                autoFocus
                style={{ fontSize: isMobile ? 16 : 15 }}
              />
              {errAppel && <p style={{ color: '#e63946', fontSize: 12, marginTop: 6 }}>⚠️ {errAppel}</p>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline" onClick={() => setShowAppel(false)}
                style={{ flex: 1, padding: isMobile ? 14 : 12, fontSize: isMobile ? 15 : 14 }}>
                {L.annuler}
              </button>
              <button className="btn btn-dark" onClick={handleAppelServeur} disabled={appelLoading}
                style={{ flex: 1, padding: isMobile ? 14 : 12, fontSize: isMobile ? 15 : 14 }}>
                {appelLoading ? '⏳…' : L.envoyer}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: isMobile ? 20 : 30, left: '50%',
          transform: 'translateX(-50%)',
          background: '#1A1A1A', color: '#FFFFFF',
          padding: '12px 24px', borderRadius: 12,
          fontSize: 14, fontWeight: 500, zIndex: 200,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          animation: 'modalIn 0.3s ease',
        }}>{toast}</div>
      )}
    </div>
  );
}
