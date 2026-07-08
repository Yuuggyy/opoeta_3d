import { useState } from 'react';
import { createCommande } from '../lib/supabase';

const T = {
  fr: {
    panier: 'Ma Commande', vide: 'Panier vide',
    table: 'Numéro de table *', tablePh: 'Ex: 5, Bar…',
    demandes: 'Demandes particulières', demandesPh: 'Allergies, sans sel…',
    commander: 'Commander', total: 'Total',
    confirmation: '✅ Commande envoyée !',
    errTable: 'Indiquez votre numéro de table.',
    errCommande: "Erreur: impossible d'envoyer la commande.",
  },
  en: {
    panier: 'My Order', vide: 'Empty cart',
    table: 'Table number *', tablePh: 'e.g. 5, Bar…',
    demandes: 'Special requests', demandesPh: 'Allergies, no salt…',
    commander: 'Place order', total: 'Total',
    confirmation: '✅ Order sent!',
    errTable: 'Please enter your table number.',
    errCommande: 'Error: could not send order. Try again.',
  },
};

export default function Panier({ items, onUpdateQty, onRemove, onClose, onConfirm, lang, isMobile }) {
  const [table, setTable]       = useState('');
  const [demandes, setDemandes] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const L = T[lang] || T.fr;

  const total = items.reduce((s, i) => s + i.prix_unit * i.quantite, 0);

  const handleSubmit = async () => {
    if (!table.trim()) { setError(L.errTable); return; }
    setLoading(true); setError('');
    const { error: err } = await createCommande(table.trim(), items, demandes.trim());
    setLoading(false);
    if (err) {
      console.error('Erreur commande:', err);
      setError(err.message || L.errCommande);
      return;
    }
    onConfirm(L.confirmation);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: isMobile ? '16px 16px 0 0' : 12,
          width: '100%',
          maxWidth: isMobile ? '100%' : 480,
          maxHeight: isMobile ? '90dvh' : '85vh',
          overflowY: 'auto',
          padding: isMobile ? '20px 18px 32px' : '28px 28px 28px',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.1)',
          ...(isMobile ? {
            position: 'fixed', bottom: 0, left: 0, right: 0,
            animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
          } : {
            animation: 'modalIn 0.3s cubic-bezier(0.4,0,0.2,1)',
          }),
        }}
      >
        <style>{`
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          @keyframes modalIn { from { opacity:0; transform: scale(0.95) translateY(10px); } to { opacity:1; transform: scale(1) translateY(0); } }
        `}</style>

        {isMobile && (
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E0E0E0', margin: '0 auto 16px' }} />
        )}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isMobile ? 20 : 24, color: '#1A1A1A', margin: 0,
          }}>{L.panier}</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#999',
            fontSize: 24, cursor: 'pointer', touchAction: 'manipulation',
          }}>✕</button>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🛒</div>
            <p style={{ fontSize: 14 }}>{L.vide}</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div style={{ marginBottom: 16 }}>
              {items.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0',
                  borderBottom: '1px solid #F0F0F0',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 2,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.nom}</p>
                    <p style={{ fontSize: 13, color: '#999' }}>{Number(item.prix_unit).toFixed(2)} $</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => onUpdateQty(idx, -1)} style={{
                      width: isMobile ? 30 : 28, height: isMobile ? 30 : 28, borderRadius: 8,
                      border: '1px solid #E0E0E0', background: '#FFFFFF',
                      color: '#1A1A1A', cursor: 'pointer', fontSize: 16, touchAction: 'manipulation',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 600, minWidth: 18, textAlign: 'center', color: '#1A1A1A' }}>{item.quantite}</span>
                    <button onClick={() => onUpdateQty(idx, 1)} style={{
                      width: isMobile ? 30 : 28, height: isMobile ? 30 : 28, borderRadius: 8,
                      border: 'none', background: '#1A1A1A', color: '#FFFFFF',
                      cursor: 'pointer', fontSize: 16, touchAction: 'manipulation',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>+</button>
                    <button onClick={() => onRemove(idx)} style={{
                      background: 'none', border: 'none', color: '#CCC',
                      cursor: 'pointer', fontSize: 16, padding: '0 2px', touchAction: 'manipulation',
                    }}>🗑️</button>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', minWidth: 56, textAlign: 'right' }}>
                    {(item.prix_unit * item.quantite).toFixed(2)} $
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0', marginBottom: 20,
              borderTop: '2px solid #B5451F',
            }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{L.total}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>{total.toFixed(2)} $</span>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="label" style={{ color: '#666', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{L.table}</label>
                <input className="input" value={table} onChange={e => setTable(e.target.value)}
                  placeholder={L.tablePh}
                  style={{ fontSize: isMobile ? 16 : 15 }}
                />
              </div>
              <div>
                <label className="label" style={{ color: '#666', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{L.demandes}</label>
                <textarea className="input" value={demandes} onChange={e => setDemandes(e.target.value)}
                  placeholder={L.demandesPh} rows={2}
                  style={{ resize: 'none', fontSize: isMobile ? 16 : 15 }} />
              </div>
              {error && <p style={{ color: '#e63946', fontSize: 13 }}>⚠️ {error}</p>}
              <button onClick={handleSubmit} disabled={loading}
                style={{
                  width: '100%', padding: isMobile ? 16 : 14,
                  fontSize: isMobile ? 16 : 15, fontWeight: 700,
                  background: '#B5451F', color: '#FFFFFF',
                  border: 'none', borderRadius: 10, cursor: loading ? 'default' : 'pointer',
                  touchAction: 'manipulation',
                }}>
                {loading ? '⏳ Envoi…' : `✅ ${L.commander}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
