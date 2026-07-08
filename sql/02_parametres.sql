-- ============================================
-- PARAMÈTRES RESTAURANT (logo / photo de profil)
-- ============================================

-- Table paramètres (une seule ligne)
CREATE TABLE IF NOT EXISTS public.parametres (
  id            INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- force une seule ligne
  nom_restaurant TEXT DEFAULT 'O Poeta',
  logo_url      TEXT,
  adresse       TEXT DEFAULT '4, Avenue du Cercle, Quartier du Golf, Gombe, Kinshasa, RDC',
  telephone     TEXT DEFAULT '+243 819 922 909',
  whatsapp      TEXT DEFAULT '243819922909',
  horaires      TEXT DEFAULT 'Tous les jours 12h00 - 23h00',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Ligne unique par défaut
INSERT INTO public.parametres (id, nom_restaurant, logo_url, adresse, telephone, whatsapp, horaires)
VALUES (1, 'O Poeta', NULL, '4, Avenue du Cercle, Quartier du Golf, Gombe, Kinshasa, RDC', '+243 819 922 909', '243819922909', 'Tous les jours 12h00 - 23h00')
ON CONFLICT (id) DO NOTHING;

-- Trigger updated_at
CREATE TRIGGER trg_parametres_updated_at
  BEFORE UPDATE ON public.parametres
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.parametres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lecture_publique_parametres" ON public.parametres FOR SELECT USING (true);
CREATE POLICY "admin_update_parametres" ON public.parametres FOR UPDATE
  USING (auth.role() = 'service_role' OR auth.uid() IN (SELECT id FROM public.admin_profiles));

-- ============================================
-- STORAGE : bucket pour les images (logo + produits)
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- Lecture publique des images
CREATE POLICY "lecture_publique_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'menu-images');

-- Upload réservé aux admins connectés
CREATE POLICY "upload_admin_images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'menu-images'
    AND auth.uid() IN (SELECT id FROM public.admin_profiles)
  );

-- Suppression/modif réservée aux admins
CREATE POLICY "update_admin_images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'menu-images' AND auth.uid() IN (SELECT id FROM public.admin_profiles));

CREATE POLICY "delete_admin_images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'menu-images' AND auth.uid() IN (SELECT id FROM public.admin_profiles));

SELECT 'Table parametres + bucket menu-images créés ✅ (O Poeta)' AS status;
