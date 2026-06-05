// ── CONFIG: js/site-config.js + site-config.local.js (see docs/CONFIG-SETUP.md) ──
function getSupabaseConfig() {
  const cfg = typeof window !== 'undefined' ? window.LINGUAPHIX_CONFIG || {} : {};
  return {
    url: String(cfg.supabaseUrl || '').trim().replace(/\/$/, ''),
    key: String(cfg.supabaseAnonKey || '').trim(),
  };
}

function getContactEmail() {
  const cfg = typeof window !== 'undefined' ? window.LINGUAPHIX_CONFIG || {} : {};
  return (cfg.contactEmail || 'contact@linguaphix.com').trim();
}

const CONTACT_EMAIL = getContactEmail();

const FORM_LIMITS = {
  name: 120,
  role: 120,
  email: 254,
  message: 4000,
  location: 120,
  service: 80,
};

function isSupabaseConfigured() {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return false;
  if (/YOUR-PROJECT|YOUR_ANON_KEY/i.test(url + key)) return false;
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && key.length > 20;
}

function resolveLang(lang) {
  if (typeof normalizeLang === 'function') return normalizeLang(lang) || 'fr';
  const base = String(lang || '').trim().toLowerCase().split('-')[0];
  return base === 'en' ? 'en' : 'fr';
}

function isValidEmail(email) {
  if (!email || email.length > FORM_LIMITS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clampField(value, max) {
  return String(value || '').trim().slice(0, max);
}

function isHoneypotFilled() {
  const hp = document.getElementById('c-website');
  return Boolean(hp?.value?.trim());
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getInitials(name) {
  return name.split(/\s+/).filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
}

function showTestimonialsEmpty() {
  const grid = document.getElementById('testimonialsGrid');
  const empty = document.getElementById('testimonialsEmpty');
  if (grid) {
    grid.innerHTML = '';
    grid.removeAttribute('data-count');
    grid.classList.remove('testimonials-grid--count-1', 'testimonials-grid--count-2');
  }
  if (empty) empty.hidden = false;
}

function syncTestimonialsGridLayout(count) {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  grid.dataset.count = String(count);
  grid.classList.toggle('testimonials-grid--count-1', count === 1);
  grid.classList.toggle('testimonials-grid--count-2', count === 2);
}

function renderTestimonials(items) {
  const grid = document.getElementById('testimonialsGrid');
  const empty = document.getElementById('testimonialsEmpty');
  if (!grid) return;

  if (!items || items.length === 0) {
    showTestimonialsEmpty();
    return;
  }

  if (empty) empty.hidden = true;
  syncTestimonialsGridLayout(items.length);
  grid.innerHTML = items.map(t => {
    const rating = Math.min(5, Math.max(0, parseInt(t.rating, 10) || 0));
    const name = escapeHtml(t.name);
    const role = escapeHtml(String(t.role || '').trim());
    const message = escapeHtml(t.message);
    const service = escapeHtml(
      typeof getServiceLabel === 'function' ? getServiceLabel(t.service, currentLang, i18n) : t.service
    );
    const country = t.location ? escapeHtml(t.location) : '';
    const starsHtml = `<div class="testimonial-card__stars stars" aria-label="${rating}/5">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>`;
    const rolePart = role
      ? `<span class="testimonial-sep" aria-hidden="true"> · </span><span class="testimonial-role">${role}</span>`
      : '';
    const countryHtml = country
      ? `<span class="testimonial-country">${country}</span>`
      : '';
    return `
        <article class="testimonial-card is-rendered">
          <header class="testimonial-card__head">
            <p class="testimonial-card__service">${service}</p>
            ${starsHtml}
          </header>
          <div class="testimonial-card__quote">
            <blockquote class="testimonial-text">${message}</blockquote>
          </div>
          <div class="testimonial-card__foot">
            <div class="testimonial-avatar" title="${name}">${escapeHtml(getInitials(t.name))}</div>
            <div class="testimonial-client">
              <div class="testimonial-identity">
                <span class="testimonial-name">${name}</span>
                ${rolePart}
              </div>
              ${countryHtml}
            </div>
          </div>
        </article>`;
  }).join('');
}

// ── LANGUAGE DATA ──
const i18n = {
  fr: {
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.testimonials': 'Témoignages',
    'nav.portfolio': 'Portfolio',
    'nav.design': 'Design',
    'nav.contact': 'Contact',
    'nav.cta': 'Réserver un appel',
    'ticker.badge.lang': 'Langues',
    'ticker.badge.design': 'Design',
    'ticker.tcf': 'Préparation TCF',
    'ticker.english': 'Cours d\'Anglais',
    'ticker.french': 'Cours de Français',
    'ticker.ielts': 'IELTS / TOEFL',
    'ticker.toeic': 'TOEIC / Cambridge',
    'ticker.trad': 'Traduction FR⇄EN',
    'ticker.design': 'Design graphique',
    'ticker.montage': 'Montage vidéo',
    'ticker.logo': 'Création de logo',
    'ticker.live': 'Live streaming',
    'ticker.soutien': 'Soutien scolaire',
    'ticker.online': 'Cours en ligne',
    'hero.eyebrow': 'Expert Langues & Créativité Visuelle',
    'hero.title': 'Maîtrisez les langues. Rayonnez par le design.',
    'hero.subtitle': 'Expert certifié en enseignement, traduction et préparation aux examens internationaux — et créatif en design graphique, montage vidéo et live streaming.',
    'hero.cta1': '📅 Prendre rendez-vous',
    'hero.cta2': 'Voir les services →',
    'hero.stat1': 'Ans d\'enseignement',
    'hero.stat2': 'Ans de traduction',
    'hero.stat3': 'Ans en audiovisuel',
    'hero.logoRefresh.hint': 'Cliquer pour actualiser la page',
    'hero.logoRefresh.aria': 'Cliquer pour actualiser la page',
    'pullRefresh.pull': 'Tirez vers le bas pour actualiser',
    'pullRefresh.release': 'Relâchez pour actualiser',
    'about.badge': 'À propos',
    'about.title': 'Une double expertise,<br>une seule vision',
    'about.role': 'Freelance · Consultant · Examinateur TCF',
    'about.p1': 'Fort de plus de 10 ans d\'expérience dans l\'enseignement de l\'anglais langue étrangère (ESL) et examinateur oral certifié au TCF à l\'Institut Français du Togo depuis 2022, Akuété SEWA-DOVI combine rigueur académique et créativité visuelle pour offrir des services d\'excellence.',
    'about.p2': 'Traducteur FR-EN depuis 5 ans spécialisé dans les documents officiels et littéraires, et professionnel de l\'audiovisuel depuis 8 ans, LINGUAPHIX est la plateforme qui unit ces deux mondes en parfaite cohérence.',
    'about.stat': 'Plus de 300 clients accompagnés',
    'about.exp1.title': 'Institut Français du Togo',
    'about.exp1.detail': 'Examinateur TCF · depuis 2022',
    'about.exp2.title': 'Enseignant ESL / FLE',
    'about.exp2.detail': '10+ ans d\'expérience',
    'about.exp3.title': 'Traducteur FR⇄EN',
    'about.exp3.detail': '5+ ans · Docs officiels & livres',
    'about.exp4.title': 'Audiovisuel & Design',
    'about.exp4.detail': '8+ ans · Production pro',
    'about.cert.tcf': 'TCF Certifié',
    'about.cert.ielts': 'IELTS Expert',
    'about.cert.toefl': 'TOEFL Prep',
    'about.cert.cambridge': 'Cambridge Prep',
    'about.cert.toeic': 'TOEIC',
    'about.cert.adobe': 'Adobe Suite',
    'about.cert.video': 'Production Vidéo',
    'about.linkedin': 'Voir mon LinkedIn',
    'about.cta': 'Travailler ensemble',
    'about.page.back': '← Retour à l\'accueil',
    'services.badge': 'Nos Services',
    'services.title': 'Services linguistiques',
    'services.subtitle': 'Cours, examens, traduction et formation — sur mesure pour particuliers et entreprises, en ligne et en présentiel.',
    'home.design.teaser': 'Logo, vidéo, design graphique et live streaming sont sur une page dédiée.',
    'home.design.cta': 'Découvrir le design →',
    'design.page.back': '← Retour à l\'accueil',
    'design.page.badge': 'Design',
    'design.page.title': 'Créatif & audiovisuel',
    'design.page.subtitle': 'Logo, montage vidéo, design graphique, live streaming et conseil matériel — pour particuliers et entreprises.',
    'design.portfolio.badge': 'Réalisations',
    'design.portfolio.title': 'Voir le portfolio',
    'design.portfolio.text': 'Montages, live streaming et créations graphiques — exemples de projets livrés pour particuliers, marques et entreprises.',
    'design.portfolio.cta': 'Ouvrir le portfolio →',
    'design.contact.hint': 'Une question ou un projet design ?',
    'design.contact.cta': 'Nous contacter →',
    'footer.design.services': 'Services design',
    'services.tab.all': 'Tous',
    'services.tab.ind': 'Particuliers',
    'services.tab.biz': 'Entreprises',
    'services.tab.lang': '🌐 Langues',
    'services.tab.design': '🎨 Design',
    'services.audience.ind': 'Particuliers',
    'services.audience.biz': 'Entreprises',
    'services.subsection.lang': '🌐 Langues',
    'services.subsection.lang.ind': '🌐 Langues — Particuliers',
    'services.subsection.lang.biz': '🌐 Langues — Entreprises',
    'services.subsection.design': '🎨 Design',
    'services.subsection.design.ind': '🎨 Design — Particuliers',
    'services.subsection.design.biz': '🎨 Design — Entreprises',
    'services.popular': 'Populaire',
    'services.catalogue.txt': 'Parcourez toutes nos offres en images sur la page catalogue',
    'services.catalogue.cta': '📋 Voir le catalogue complet',
    'catalogue.page.back': '← Retour aux services',
    'catalogue.badge': 'Catalogue',
    'catalogue.title': 'Catalogue complet des services',
    'catalogue.hint.label': 'Dossier photos :',
    'catalogue.gallery.empty': 'Images carrées (1:1) — décommentez ou copiez un bloc catalogue-photo.',
    'catalogue.alt.tcf': 'Préparation TCF — France Éducation international',
    'catalogue.alt.ielts': 'Préparation IELTS, TOEFL iBT et Cambridge',
    'catalogue.alt.toeic': 'Préparation TOEIC — ETS',
    'catalogue.alt.livestream': 'Production live streaming — régie vidéo et multi-écrans',
    'catalogue.alt.cours': 'Cours d\'anglais (ESL) et de français (FLE)',
    'catalogue.alt.interview': 'Préparation aux entretiens en anglais',
    'catalogue.alt.soutien': 'Soutien scolaire',
    'catalogue.alt.traduction': 'Traduction professionnelle FR⇄EN',
    'catalogue.alt.logo': 'Création et animation de logo',
    'catalogue.alt.montage': 'Montage vidéo',
    'catalogue.alt.graphic': 'Design graphique — flyers et visuels',
    'catalogue.alt.formation': 'Formation linguistique en entreprise',
    'catalogue.alt.materiel': 'Conseil et achat de matériel audiovisuel et streaming',
    'catalogue.cta.rates': 'Tarifs sur l\'accueil →',
    'catalogue.cta.rates.design': 'Tarifs sur la page Design →',
    'catalogue.cta.text': 'Une question ou un devis pour l\'un de ces services ?',
    'catalogue.cta.contact': 'Nous contacter →',
    'catalogue.cta.whatsapp': 'WhatsApp',
    'srv.book': 'Réserver →',
    'srv.quote': 'Demander un devis',
    'srv.tcf.title': 'Préparation au TCF',
    'srv.tcf.desc': 'Préparation intensive au Test de Connaissance du Français par un examinateur officiel certifié. Toutes composantes : CO, CE, EE, EO.',
    'srv.ielts.title': 'IELTS / TOEFL / Cambridge',
    'srv.ielts.desc': 'Préparation complète aux tests internationaux d\'anglais. Coaching personnalisé selon votre objectif de score.',
    'srv.toeic.title': 'TOEIC',
    'srv.toeic.desc': 'Préparation ciblée au TOEIC Listening & Reading et Speaking & Writing.',
    'srv.cours.title': 'Cours de Français / Anglais',
    'srv.cours.desc': 'Cours personnalisés en ligne ou en présentiel. Niveaux A1 à C2.',
    'srv.interview.title': 'Préparation aux interviews en anglais',
    'srv.interview.desc': 'Coaching pour entretiens d\'embauche, visa ou admission universitaire.',
    'srv.soutien.title': 'Soutien scolaire',
    'srv.soutien.desc': 'Accompagnement scolaire en français et en anglais pour collégiens et lycéens.',
    'srv.corp.training.title': 'Formation linguistique en entreprise',
    'srv.corp.training.desc': 'Programmes de formation sur mesure pour équipes, managers ou directions.',
    'srv.trad.title': 'Traduction professionnelle FR⇄EN',
    'srv.trad.desc': 'Pour particuliers et entreprises : documents officiels, visas, diplômes, contrats, actes juridiques, livres et articles. Qualité certifiée.',
    'srv.logo.title': 'Création & Animation de Logo',
    'srv.logo.desc': 'Conception de logos originaux, modernes et mémorables. Version animée incluse.',
    'srv.montage.title': 'Montage vidéo professionnel',
    'srv.montage.desc': 'Montage professionnel de vos vidéos. Rendu HD/4K.',
    'srv.design.title': 'Design Graphique',
    'srv.design.desc': 'Création de visuels pour réseaux sociaux, affiches, cartes de visite.',
    'srv.live.title': 'Production Live Streaming',
    'srv.live.desc': 'Configuration complète pour live streaming : équipement, logiciels OBS.',
    'srv.mat.title': 'Conseil & Achat de matériel',
    'srv.mat.desc': 'Conseil expert pour l\'acquisition de matériel audiovisuel et streaming.',
    'process.badge': 'Comment ça marche',
    'process.title': 'Un processus simple et transparent',
    'process.step1.title': 'Prise de contact',
    'process.step1.desc': 'Via WhatsApp, email ou formulaire. Réponse sous 24h garantie.',
    'process.step2.title': 'Appel de découverte',
    'process.step2.desc': 'Consultation gratuite de 30 min pour cerner vos besoins.',
    'process.step3.title': 'Proposition personnalisée',
    'process.step3.desc': 'Devis détaillé et plan de travail adapté à votre profil.',
    'process.step4.title': 'Acceptation & politique',
    'process.step4.desc': 'Lecture et acceptation des politiques de service avant démarrage.',
    'process.step5.title': 'Démarrage & suivi',
    'process.step5.desc': 'Début des sessions avec rapports de progression réguliers.',
    'testi.badge': 'Témoignages',
    'testi.title': 'Ce que disent nos clients',
    'testi.subtitle': 'Des résultats concrets et des transformations réelles.',
    'testi.empty': 'Aucun témoignage publié pour le moment. Soyez le premier à partager votre expérience ci-dessous.',
    'addtesti.badge': 'Votre avis compte',
    'addtesti.title': 'Partagez votre expérience',
    'addtesti.subtitle': 'Votre témoignage apparaîtra sur le site après validation.',
    'form.name': 'Nom complet *',
    'form.role': 'Rôle / statut *',
    'form.ph.role': 'Ex : Candidate TCF, Entrepreneur, Étudiant…',
    'form.email': 'Email *',
    'form.service': 'Service utilisé *',
    'form.select': '— Sélectionner —',
    'form.ph.name': 'Ex : Jean Dupont',
    'form.ph.email': 'votre@email.com',
    'form.ph.testimonial': 'Décrivez votre expérience avec LINGUAPHIX...',
    'form.ph.contact.name': 'Votre nom',
    'form.ph.message': 'Décrivez votre besoin...',
    'form.ph.question': 'Posez votre question en détail...',
    'optgroup.langues': 'Langues',
    'optgroup.design': 'Design',
    'opt.tcf': 'Préparation TCF',
    'opt.ielts': 'IELTS / TOEFL / Cambridge',
    'opt.toeic': 'TOEIC',
    'opt.cambridge': 'Cambridge',
    'opt.cours': 'Cours de Français / Anglais',
    'opt.cours.short': 'Cours de langues',
    'opt.traduction': 'Traduction',
    'opt.soutien': 'Soutien scolaire',
    'opt.interview': 'Préparation aux interviews',
    'opt.formation': 'Formation en entreprise',
    'opt.logo': 'Création de logo',
    'opt.montage': 'Montage vidéo',
    'opt.design': 'Design graphique',
    'opt.livestream': 'Live streaming',
    'opt.mat': 'Conseil & Achat de matériel',
    'opt.autre': 'Autre',
    'price.from': 'À partir de',
    'price.or': 'ou',
    'price.quote': 'Sur devis',
    'price.unit.session': 'séance',
    'price.unit.hour': 'heure',
    'price.unit.page': 'page',
    'price.unit.word': 'mot',
    'price.unit.visual': 'visuel',
    'price.unit.month': 'mois',
    'price.unit.pack': 'forfait',
    'price.unit.project': 'projet',
    'price.unit.day': 'jour',
    'price.unit.assistance': 'assistance',
    'form.rating': 'Note *',
    'form.message': 'Votre témoignage *',
    'form.location': 'Ville / Pays',
    'form.location.hint': 'Sélectionnez un pays dans la liste ou saisissez librement (ville, pays).',
    'form.ph.location': 'Ex : Lomé, Togo ou choisir un pays',
    'form.submit': 'Soumettre mon témoignage →',
    'booking.badge': 'Réservation',
    'booking.title': 'Prêt à passer à l\'action ?',
    'booking.desc': 'Réservez un appel de découverte gratuit de 30 minutes.',
    'booking.f1': 'Consultation 100% gratuite',
    'booking.f2': 'Aucun engagement requis',
    'booking.f3': 'Disponible en ligne (Zoom, Meet, WhatsApp)',
    'booking.f4': 'Réponse dans les 24h',
    'booking.f5': 'Devis personnalisé offert',
    'booking.wa': '💬 WhatsApp direct',
    'booking.email': '✉️ Envoyer un email',
    'booking.cal.title': 'Réserver un appel',
    'booking.cal.desc': 'Choisissez le créneau qui vous convient dans mon agenda.',
    'booking.cal.cta': 'Ouvrir le calendrier →',
    'booking.cal.alt.prefix': 'Ou ',
    'booking.cal.alt.link': 'WhatsApp',
    'contact.badge': 'Contact',
    'contact.title': 'Parlons de votre projet',
    'contact.desc': 'Disponible par WhatsApp, email ou LinkedIn. Réponse sous 24h.',
    'contact.catalogue': 'Catalogue des services',
    'contact.catalogue.sub': 'Voir toutes nos offres en images',
    'payment.title': 'Modes de paiement acceptés',
    'payment.toggle': 'Voir les modes de paiement acceptés',
    'payment.mixx': 'Paiement mobile Mixx by Yas',
    'payment.orabank.note': 'Virement Orabank : les coordonnées bancaires vous seront transmises avec le devis de la prestation concernée.',
    'svcpage.back': '← Retour aux services',
    'svcpage.back.design': '← Retour au design',
    'svcpage.packages': 'Forfaits & tarifs',
    'svcpage.packages.lead': 'Les tarifs s\'affichent dans votre devise locale.',
    'svcpage.nav.label': 'Sur cette page',
    'svcpage.nav.packages': 'Forfaits',
    'svcpage.nav.how': 'Modalités & processus',
    'svcpage.nav.delivery': 'Délais',
    'svcpage.nav.payment': 'Paiement',
    'svcpage.nav.faq': 'FAQ',
    'svcpage.nav.book': 'Réserver',
    'svcpage.modalities': 'Modalités',
    'svcpage.process': 'Processus',
    'svcpage.payment': 'Moyens de paiement',
    'svcpage.payment.lead': 'Paiement mobile Mixx by Yas ou virement Orabank selon votre devis.',
    'svcpage.delivery': 'Délais de livraison',
    'svcpage.delivery.normal': 'Standard',
    'svcpage.delivery.express': 'Express',
    'svcpage.faq': 'Questions fréquentes',
    'svcpage.cta.book': 'Réserver',
    'svcpage.cta.quote': 'Demander un devis',
    'svcpage.cta.policy': 'Politique du service',
    'svcpage.cta.details': 'Voir le détail',
    'book.badge': 'Réserver',
    'book.title': 'Réserver vos cours',
    'book.lead': 'Choisissez votre forfait, remplissez le formulaire et confirmez en un clic. Nous vous recontactons sous 24 h.',
    'book.title.service': 'Réserver ce service',
    'book.lead.service': 'Sélectionnez un forfait, complétez le formulaire et acceptez la politique. Envoi simultané par email, WhatsApp et Calendly.',
    'book.mostPopular': 'Le plus populaire',
    'book.perMonth': 'mois',
    'book.perHour': 'heure',
    'book.perSession': 'séance',
    'svcpage.packages.individuals': 'Traduction professionnelle (particuliers)',
    'svcpage.packages.business': 'Traduction professionnelle (entreprises)',
    'book.languagesAvailable': 'Langues : anglais, français ou les deux',
    'book.mode.online': 'En ligne',
    'book.mode.inperson': 'En présentiel',
    'book.mode.online.desc': 'Visio · horaires flexibles',
    'book.mode.inperson.desc': 'Présentiel à Lomé',
    'svcpage.mode.heading': 'Choisissez votre format',
    'book.field.mode': 'Mode',
    'book.field.service': 'Service',
    'book.field.package': 'Sélectionnez un forfait ci-dessus',
    'book.field.package.placeholder': 'Sélectionnez un forfait ci-dessus',
    'book.field.summary': 'Votre sélection',
    'book.field.language': 'Langue',
    'book.lang.en': 'Anglais',
    'book.lang.fr': 'Français',
    'book.lang.both': 'Les deux',
    'book.field.name': 'Nom complet',
    'book.field.email': 'Email',
    'book.field.phone': 'Téléphone / WhatsApp',
    'book.field.startDate': 'Date de début souhaitée',
    'book.policy.title': 'Politique de réservation & paiement',
    'book.policy.1': 'Une réservation est confirmée uniquement après réception du premier paiement mensuel.',
    'book.policy.2': 'Les séances sont planifiées d\'un commun accord dans les 48 h suivant la confirmation.',
    'book.policy.3': 'Toute annulation doit être signalée au moins 24 h à l\'avance. Les annulations tardives ne sont pas remboursées.',
    'book.policy.4': 'Les forfaits mensuels ne sont ni transférables ni remboursables une fois les séances commencées.',
    'book.policy.5': 'Les séances en ligne ont lieu via {platform}.',
    'book.policy.6': 'Les séances en présentiel ont lieu à {address}.',
    'book.policy.7': 'En cliquant sur « Accepter & réserver », vous confirmez avoir lu et accepté ces conditions.',
    'book.policy.accept': 'J\'ai lu et j\'accepte la politique de réservation',
    'book.policy.selectPackage': 'Sélectionnez un forfait ci-dessus pour afficher les conditions de réservation et de paiement qui s\'appliquent à ce forfait.',
    'book.submit': 'Accepter & réserver',
    'book.submitWhatsapp': 'Envoyer par WhatsApp',
    'book.actionsHint':
      'Vous pouvez utiliser l\'un ou l\'autre bouton, ou les deux : réservez un créneau sur Calendly et/ou envoyez votre demande par WhatsApp avec les mêmes informations.',
    'book.whatsappOpened':
      'WhatsApp s\'ouvre avec votre message — appuyez sur Envoyer dans l\'application. Vous pouvez aussi utiliser « Accepter & réserver » pour planifier un appel sur Calendly.',
    'book.sending': 'Envoi en cours…',
    'book.success': '✅ Votre demande de réservation a été envoyée ! Nous vous contacterons sous 24 h pour confirmer votre séance. Vérifiez WhatsApp et votre email.',
    'book.onQuote': 'Sur devis',
    'bookPick.title': 'Choisir un service',
    'bookPick.lead': 'Sélectionnez la prestation à réserver. Vous accéderez au formulaire de réservation de ce service.',
    'bookPick.close': 'Fermer',
    'bookPick.go': 'Réserver ce service →',
    'catalogue.cta.details': 'Voir le détail →',
    'contact.form.title': 'Posez votre question',
    'contact.form.subtitle': 'Une question sur nos services, tarifs ou disponibilités ? Envoyez par email ou WhatsApp.',
    'contact.form.service': 'Service concerné *',
    'contact.form.question': 'Votre question *',
    'contact.form.submit': 'Envoyer ma question →',
    'contact.form.submit.email': 'Envoyer par email →',
    'contact.form.submit.whatsapp': 'Envoyer via WhatsApp →',
    'contact.form.sending': 'Envoi en cours…',
    'contact.form.ok': '✓ Votre question a été envoyée. Nous vous répondrons par email sous 24h.',
    'contact.form.err': 'Impossible d\'envoyer pour le moment. Écrivez-nous à contact@linguaphix.com.',
    'policy.page.back': '← Retour au site',
    'policy.page.home': 'Accueil',
    'portfolio.page.back': '← Retour au design',
    'portfolio.page.home': 'Accueil',
    'portfolio.badge': 'Portfolio',
    'portfolio.title': 'Vidéo & design graphique',
    'portfolio.subtitle': 'Montages, productions audiovisuelles et créations visuelles réalisés pour particuliers, marques et entreprises.',
    'portfolio.tab.all': 'Tout',
    'portfolio.tab.video': 'Vidéo',
    'portfolio.tab.graphic': 'Design graphique',
    'portfolio.empty': 'Aucun projet dans cette catégorie pour le moment.',
    'portfolio.video.local': 'Placez votre fichier MP4 dans assets/portfolio/videos/',
    'portfolio.playlist.empty': 'Aucun média dans ce dossier pour le moment.',
    'portfolio.playlist.sync': 'node scripts/build-portfolio-playlists.mjs',
    'portfolio.playlist.hint': 'Déposez vos fichiers dans le dossier indiqué, puis exécutez la commande ci-dessus pour mettre à jour la playlist.',
    'portfolio.gallery.open': 'Voir la playlist',
    'portfolio.gallery.openAria': 'Ouvrir la playlist',
    'portfolio.gallery.count': '{n} éléments',
    'portfolio.gallery.slide': '{current} / {total}',
    'portfolio.gallery.close': 'Fermer',
    'portfolio.gallery.prev': 'Précédent',
    'portfolio.gallery.next': 'Suivant',
    'portfolio.gallery.clickNext': 'Cliquer pour voir la suivante',
    'portfolio.gallery.clickNav': 'Clic à droite : suivant · à gauche : précédent',
    'portfolio.tiktok.open': 'Voir sur TikTok',
    'portfolio.tiktok.openAria': 'Ouvrir le profil TikTok',
    'portfolio.tag.montage': 'Montage vidéo',
    'portfolio.tag.prod': 'Production AV',
    'portfolio.tag.live': 'Live streaming',
    'portfolio.tag.logo': 'Logo & identité',
    'portfolio.tag.social': 'Réseaux sociaux',
    'portfolio.tag.print': 'Print & affiche',
    'portfolio.v1.title': 'Animation',
    'portfolio.v1.desc': 'Motion design, habillage animé et séquences pour réseaux ou présentation.',
    'portfolio.v2.title': 'Social handles',
    'portfolio.v2.desc': 'Intros, reels et formats courts pour profils et campagnes sur les réseaux.',
    'portfolio.g1.title': 'Identité visuelle — marque',
    'portfolio.g1.desc': 'Logos marque par thème : habitat, bien-être, mode, audit et institutions.',
    'portfolio.g2.title': 'Série visuels — campagne',
    'portfolio.g2.desc': 'Série réseaux sociaux Le Cogitorium — organisation scolaire, en 7 visuels.',
    'portfolio.g3.title': 'Flyer & affiche',
    'portfolio.g3.desc': 'Flyers, affiches et déclinaisons print — corporate, mode et événementiel.',
    'portfolio.cta.text': 'Un projet similaire pour votre marque ou votre événement ?',
    'portfolio.cta.btn': 'Discutons de votre projet →',
    'policy.badge': 'Politique',
    'policy.title': 'Politique Générale & de Confidentialité',
    'policy.date': 'Dernière mise à jour : Juin 2025 · LINGUAPHIX',
    'policy.h1': '1. Présentation',
    'policy.p1': 'LINGUAPHIX est une plateforme de services linguistiques et créatifs dirigée par Akuété SEWA-DOVI.',
    'policy.h2': '2. Conditions d\'utilisation',
    'policy.p2': 'En réservant un service LINGUAPHIX, le client accepte les conditions suivantes :',
    'policy.l2.1': 'Annulation sans préavis de 24h : facturée à 50%.',
    'policy.l2.2': 'Paiements non remboursables sauf accord écrit.',
    'policy.l2.3': 'Fichiers design propriété du client après paiement intégral.',
    'policy.l2.4': 'Droit de refus pour tout service contraire à l\'éthique.',
    'policy.l2.5': 'Délais indicatifs selon complexité du projet.',
    'policy.h3': '3. Collecte des données personnelles',
    'policy.p3': 'Données collectées : nom, email, téléphone. Utilisées exclusivement pour la prestation.',
    'policy.h4': '4. Utilisation des données',
    'policy.l4.1': 'Données jamais vendues à des tiers.',
    'policy.l4.2': 'Utilisées pour informations relatives à vos services (opt-out disponible).',
    'policy.l4.3': 'Suppression de données possible sur demande.',
    'policy.h5': '5. Cookies',
    'policy.p5': 'Cookies fonctionnels et analytiques (Google Analytics). Désactivables depuis votre navigateur.',
    'policy.h6': '6. Droits RGPD',
    'policy.p6': 'Droits d\'accès, rectification, suppression et portabilité. Contact : contact@linguaphix.com.',
    'policy.h7': '7. Propriété intellectuelle',
    'policy.p7': 'Contenus protégés par le droit d\'auteur. Livrables au client après paiement intégral.',
    'policy.h8': '8. Responsabilité',
    'policy.p8': 'Responsabilité limitée aux montants facturés. Pas de garantie de résultats aux examens.',
    'policy.h9': '9. Litiges',
    'policy.p9': 'Résolution amiable prioritaire. Loi togolaise applicable.',
    'policy.toc': 'Sommaire',
    'policy.toc.general': 'Général & confidentialité',
    'policy.toc.lang': 'Services linguistiques',
    'policy.toc.design': 'Design & audiovisuel',
    'policy.amend': 'Ces politiques peuvent être mises à jour. La version en vigueur est celle publiée sur cette page — vous pouvez demander des précisions à contact@linguaphix.com.',
    'policy.lang.badge': 'Langues',
    'policy.lang.title': 'Politique — Services linguistiques',
    'policy.lang.intro': 'S\'applique aux cours, préparations aux examens (TCF, IELTS, TOEFL, TOEIC, Cambridge), traductions, relectures et accompagnements linguistiques.',
    'policy.lang.l1': 'Réservation : toute prestation est confirmée par écrit (date, durée, tarif). Sans confirmation, la séance n\'est pas garantie.',
    'policy.lang.l2': 'Annulation : séance annulée moins de 24 h à l\'avance facturée à 50 % du tarif convenu.',
    'policy.lang.l3': 'Absence & retard : absence non signalée due intégralement ; retard de plus de 15 minutes peut réduire la durée sans remboursement.',
    'policy.lang.l4': 'Paiement : exigible avant ou lors de la première séance, sauf accord écrit préalable. Mixx by Yas au +228 92 53 99 53 (même numéro que WhatsApp) ; Orabank (coordonnées avec le devis).',
    'policy.lang.l5': 'Remboursement : aucun remboursement après le début d\'une formation ou forfait, sauf exception acceptée par écrit.',
    'policy.lang.l6': 'Séances en ligne : connexion stable et environnement adaptés requis ; problèmes techniques côté client sans report gratuit.',
    'policy.lang.l7': 'Enregistrement : audio/vidéo des séances interdit sans accord écrit des deux parties.',
    'policy.lang.l8': 'Matériel pédagogique : exercices et fichiers à usage personnel uniquement.',
    'policy.lang.l9': 'Traduction & relecture : le client garantit l\'exactitude des textes sources ; délais et certification précisés au devis.',
    'policy.lang.l10': 'Résultats aux examens : enseignement professionnel fourni — aucune garantie de score officiel.',
    'policy.lang.l11': 'Confidentialité : documents et échanges non partagés avec des tiers.',
    'policy.design.badge': 'Design',
    'policy.design.title': 'Politique — Services design & audiovisuel',
    'policy.design.intro': 'S\'applique à la création graphique, identité visuelle, montage vidéo, live streaming et contenus pour réseaux sociaux.',
    'policy.design.l1': 'Devis & périmètre : livrables, formats, révisions et délai précisés ; hors périmètre facturé séparément.',
    'policy.design.l2': 'Acompte : 50 % avant démarrage ; solde à la livraison des fichiers finaux.',
    'policy.design.l3': 'Brief & contenus client : textes, logos et validations fournis aux dates convenues ; retards client repoussent la livraison.',
    'policy.design.l4': 'Révisions : deux (2) cycles mineurs inclus ; révisions supplémentaires ou refontes majeures facturées.',
    'policy.design.l5': 'Délais : indicatifs selon complexité et réactivité client (retours sous 5 jours ouvrés recommandés).',
    'policy.design.l6': 'Propriété : livrables et sources au client après paiement intégral.',
    'policy.design.l7': 'Portfolio : présentation du projet autorisée sauf objection écrite du client.',
    'policy.design.l8': 'Licences tierces : polices, musiques et assets stock soumis à leurs conditions d\'usage.',
    'policy.design.l9': 'Annulation : après démarrage, acompte acquis ; travail réalisé facturable au prorata.',
    'policy.design.l10': 'Urgence : délai express peut entraîner un supplément de 25 à 50 % sur devis.',
    'policy.design.l11': 'Contenu interdit : refus possible pour tout projet illégal, diffamatoire ou contraire à l\'éthique.',
    'footer.tagline': 'Langues · Design · Excellence.',
    'footer.col1': 'Langues',
    'footer.col2': 'Design',
    'footer.col3': 'Liens rapides',
    'footer.tcf': 'Préparation TCF',
    'footer.cours': 'Cours de langues',
    'footer.trad': 'Traduction',
    'footer.soutien': 'Soutien scolaire',
    'footer.logo': 'Création de logo',
    'footer.montage': 'Montage vidéo',
    'footer.design': 'Design graphique',
    'footer.live': 'Live Streaming',
    'footer.policy': 'Politique de confidentialité',
    'footer.sitemap': 'Plan du site',
    'sitemap.page.back': '← Retour au site',
    'sitemap.badge': 'Navigation',
    'sitemap.title': 'Plan du site',
    'sitemap.intro': 'Retrouvez ici toutes les pages et sections importantes de LINGUAPHIX.',
    'sitemap.h.pages': 'Pages principales',
    'sitemap.h.home': 'Page d\'accueil — sections',
    'sitemap.h.services': 'Services (aperçu)',
    'sitemap.h.design': 'Page Design',
    'sitemap.h.policy': 'Politiques de service',
    'sitemap.h.book': 'Réserver & devis',
    'sitemap.h.contact': 'Contact & réseaux',
    'sitemap.link.home': 'Accueil',
    'sitemap.link.about': 'À propos — Présentation',
    'sitemap.link.design': 'Design — Services créatifs',
    'sitemap.link.portfolio': 'Portfolio — Vidéo & design',
    'sitemap.link.catalogue': 'Catalogue des services',
    'sitemap.link.policy': 'Politique & confidentialité',
    'sitemap.link.sitemap': 'Plan du site',
    'sitemap.link.prices': 'Tarifs par service',
    'sitemap.link.process': 'Comment ça marche',
    'sitemap.link.booking': 'Réservation',
    'sitemap.link.policy.general': 'Général & confidentialité',
    'sitemap.link.policy.lang': 'Services linguistiques',
    'sitemap.link.policy.design': 'Design & audiovisuel',
    'sitemap.link.quote': 'Demander un devis / poser une question',
    'sitemap.link.whatsapp': 'WhatsApp',
    'footer.catalogue': 'Catalogue',
    'footer.copy.prefix': '© 2026 LINGUAPHIX · Développé par ',
    'footer.copy.name': 'Akuété SEWA-DOVI',
    'footer.copy.suffix': ' · Tous droits réservés',
    'wa.float': 'WhatsApp',
    'modal.accept': 'J\'accepte & Je réserve →',
    'modal.decline': 'Retour',
    'quote.modal.title': 'Demander un devis',
    'quote.modal.text': 'Décrivez votre projet via le formulaire « Posez votre question » dans la section Contact. Nous vous répondons par email sous 24h avec le devis et les modalités de paiement (Mixx by Yas, Orabank).',
    'quote.modal.go': 'Aller au formulaire →',
    'quote.modal.close': 'Fermer',
  },
  en: {
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.testimonials': 'Reviews',
    'nav.portfolio': 'Portfolio',
    'nav.design': 'Design',
    'nav.contact': 'Contact',
    'nav.cta': 'Book a call',
    'ticker.badge.lang': 'Languages',
    'ticker.badge.design': 'Design',
    'ticker.tcf': 'TCF preparation',
    'ticker.english': 'English courses',
    'ticker.french': 'French courses',
    'ticker.ielts': 'IELTS / TOEFL',
    'ticker.toeic': 'TOEIC / Cambridge',
    'ticker.trad': 'FR⇄EN translation',
    'ticker.design': 'Graphic design',
    'ticker.montage': 'Video editing',
    'ticker.logo': 'Logo design',
    'ticker.live': 'Live streaming',
    'ticker.soutien': 'Academic tutoring',
    'ticker.online': 'Online courses',
    'hero.eyebrow': 'Language & Visual Creativity Expert',
    'hero.title': 'Master Languages. Shine Through Design.',
    'hero.subtitle': 'Certified expert in language teaching, translation, and international exam preparation — plus graphic design, video editing, and live streaming. One professional, two complementary expertises.',
    'hero.cta1': '📅 Book an appointment',
    'hero.cta2': 'Explore services →',
    'hero.stat1': 'Years teaching',
    'hero.stat2': 'Years translating',
    'hero.stat3': 'Years in AV',
    'hero.logoRefresh.hint': 'Click to refresh the page',
    'hero.logoRefresh.aria': 'Click to refresh the page',
    'pullRefresh.pull': 'Pull down to refresh',
    'pullRefresh.release': 'Release to refresh',
    'about.badge': 'About',
    'about.title': 'Dual expertise,<br>one clear vision',
    'about.role': 'Freelance · Consultant · TCF Examiner',
    'about.p1': 'With over 10 years of ESL teaching experience and as an official TCF oral examiner at the Institut Français du Togo since 2022, Akuété SEWA-DOVI combines academic rigor with creative vision to deliver excellence.',
    'about.p2': 'A certified FR-EN translator for 5+ years specializing in official and literary documents, and an audiovisual professional for 8+ years — LINGUAPHIX unites both worlds in perfect harmony.',
    'about.stat': 'More than 300 clients served',
    'about.exp1.title': 'Institut Français du Togo',
    'about.exp1.detail': 'TCF Examiner · since 2022',
    'about.exp2.title': 'ESL / FLE Teacher',
    'about.exp2.detail': '10+ years of experience',
    'about.exp3.title': 'FR⇄EN Translator',
    'about.exp3.detail': '5+ years · Official & literary docs',
    'about.exp4.title': 'Audiovisual & Design',
    'about.exp4.detail': '8+ years · Pro production',
    'about.cert.tcf': 'TCF Certified',
    'about.cert.ielts': 'IELTS Expert',
    'about.cert.toefl': 'TOEFL Prep',
    'about.cert.cambridge': 'Cambridge Prep',
    'about.cert.toeic': 'TOEIC',
    'about.cert.adobe': 'Adobe Suite',
    'about.cert.video': 'Video Production',
    'about.linkedin': 'View LinkedIn',
    'about.cta': 'Work with me',
    'about.page.back': '← Back to home',
    'services.badge': 'Services',
    'services.title': 'Language services',
    'services.subtitle': 'Courses, exams, translation, and training — tailored for individuals and businesses, online and in-person.',
    'home.design.teaser': 'Logo, video, graphic design, and live streaming live on a dedicated page.',
    'home.design.cta': 'Explore design →',
    'design.page.back': '← Back to home',
    'design.page.badge': 'Design',
    'design.page.title': 'Creative & audiovisual',
    'design.page.subtitle': 'Logo, video editing, graphic design, live streaming, and equipment consulting — for individuals and businesses.',
    'design.portfolio.badge': 'Work',
    'design.portfolio.title': 'View the portfolio',
    'design.portfolio.text': 'Edits, live streaming, and graphic work — sample projects delivered for individuals, brands, and businesses.',
    'design.portfolio.cta': 'Open portfolio →',
    'design.contact.hint': 'A question or a design project?',
    'design.contact.cta': 'Contact us →',
    'footer.design.services': 'Design services',
    'services.tab.all': 'All',
    'services.tab.ind': 'Individuals',
    'services.tab.biz': 'Businesses',
    'services.tab.lang': '🌐 Languages',
    'services.tab.design': '🎨 Design',
    'services.audience.ind': 'Individuals',
    'services.audience.biz': 'Businesses',
    'services.subsection.lang': '🌐 Languages',
    'services.subsection.lang.ind': '🌐 Languages — Individuals',
    'services.subsection.lang.biz': '🌐 Languages — Businesses',
    'services.subsection.design': '🎨 Design',
    'services.subsection.design.ind': '🎨 Design — Individuals',
    'services.subsection.design.biz': '🎨 Design — Businesses',
    'services.popular': 'Popular',
    'services.catalogue.txt': 'Browse our full range with photos on the catalogue page',
    'services.catalogue.cta': '📋 View full catalog',
    'catalogue.page.back': '← Back to services',
    'catalogue.badge': 'Catalog',
    'catalogue.title': 'Full service catalog',
    'catalogue.hint.label': 'Photo folder:',
    'catalogue.gallery.empty': 'Square images (1:1) — uncomment or copy a catalogue-photo block.',
    'catalogue.alt.tcf': 'TCF preparation — France Éducation international',
    'catalogue.alt.ielts': 'IELTS, TOEFL iBT and Cambridge exam preparation',
    'catalogue.alt.toeic': 'TOEIC preparation — ETS',
    'catalogue.alt.livestream': 'Live streaming production — video control and multi-view setup',
    'catalogue.alt.cours': 'English (ESL) and French (FLE) courses',
    'catalogue.alt.interview': 'English interview preparation',
    'catalogue.alt.soutien': 'Academic tutoring',
    'catalogue.alt.traduction': 'Professional FR⇄EN translation',
    'catalogue.alt.logo': 'Logo creation and animation',
    'catalogue.alt.montage': 'Video editing',
    'catalogue.alt.graphic': 'Graphic design — flyers and visuals',
    'catalogue.alt.formation': 'Corporate language training',
    'catalogue.alt.materiel': 'Audiovisual and streaming equipment consulting and procurement',
    'catalogue.cta.rates': 'See rates on homepage →',
    'catalogue.cta.rates.design': 'See rates on Design page →',
    'catalogue.cta.text': 'Questions or a quote for one of these services?',
    'catalogue.cta.contact': 'Contact us →',
    'catalogue.cta.whatsapp': 'WhatsApp',
    'srv.book': 'Book now →',
    'srv.quote': 'Get a quote',
    'srv.tcf.title': 'TCF Preparation',
    'srv.tcf.desc': 'Intensive TCF preparation by a certified official examiner. All components: CO, CE, EE, EO.',
    'srv.ielts.title': 'IELTS / TOEFL / Cambridge',
    'srv.ielts.desc': 'Complete preparation for international English tests. Personalized coaching toward your target score.',
    'srv.toeic.title': 'TOEIC',
    'srv.toeic.desc': 'Targeted TOEIC preparation for Listening & Reading and Speaking & Writing.',
    'srv.cours.title': 'French / English Courses',
    'srv.cours.desc': 'Personalized online or in-person courses. Levels A1 to C2. Individual or group.',
    'srv.interview.title': 'English Interview Preparation',
    'srv.interview.desc': 'Coaching for job interviews, visas, or university admissions.',
    'srv.soutien.title': 'Academic Tutoring',
    'srv.soutien.desc': 'Academic support in French and English for middle and high school students.',
    'srv.corp.training.title': 'Corporate Language Training',
    'srv.corp.training.desc': 'Customized training programs in English or French for teams and executives.',
    'srv.trad.title': 'Professional Translation FR⇄EN',
    'srv.trad.desc': 'For individuals and businesses: official documents, visas, diplomas, contracts, legal acts, books, and articles. Certified quality.',
    'srv.logo.title': 'Logo Design & Animation',
    'srv.logo.desc': 'Original, modern, and memorable logo design. Static + animated version. HD files provided.',
    'srv.montage.title': 'Professional Video Editing',
    'srv.montage.desc': 'Professional video editing: clips, ads, interviews, vlogs, events. HD/4K output.',
    'srv.design.title': 'Graphic Design',
    'srv.design.desc': 'Visuals for social media, posters, flyers, business cards, and full visual identity.',
    'srv.live.title': 'Live Streaming Production',
    'srv.live.desc': 'Full live streaming setup: equipment, lighting, sound, OBS/Streamlabs. Webinars, events.',
    'srv.mat.title': 'Equipment Consulting & Procurement',
    'srv.mat.desc': 'Expert advice for acquiring audiovisual and streaming equipment.',
    'process.badge': 'How it works',
    'process.title': 'A simple, transparent process',
    'process.step1.title': 'Get in touch',
    'process.step1.desc': 'Via WhatsApp, email, or the form. Response within 24h guaranteed.',
    'process.step2.title': 'Discovery call',
    'process.step2.desc': 'Free 30-min consultation to understand your needs and goals.',
    'process.step3.title': 'Custom proposal',
    'process.step3.desc': 'Detailed quote and work plan tailored to your profile.',
    'process.step4.title': 'Accept & policy',
    'process.step4.desc': 'Read and accept the service policy before starting.',
    'process.step5.title': 'Start & track',
    'process.step5.desc': 'Begin sessions with regular progress reports.',
    'testi.badge': 'Testimonials',
    'testi.title': 'What our clients say',
    'testi.subtitle': 'Real results and genuine transformations.',
    'testi.empty': 'No published reviews yet. Be the first to share your experience below.',
    'addtesti.badge': 'Your voice matters',
    'addtesti.title': 'Share your experience',
    'addtesti.subtitle': 'Your testimonial will appear on the site after review.',
    'form.name': 'Full name *',
    'form.role': 'Role / status *',
    'form.ph.role': 'e.g. TCF candidate, entrepreneur, student…',
    'form.email': 'Email *',
    'form.service': 'Service used *',
    'form.select': '— Select —',
    'form.ph.name': 'e.g. John Smith',
    'form.ph.email': 'you@email.com',
    'form.ph.testimonial': 'Describe your experience with LINGUAPHIX...',
    'form.ph.contact.name': 'Your name',
    'form.ph.message': 'Describe what you need...',
    'form.ph.question': 'Ask your question in detail...',
    'optgroup.langues': 'Languages',
    'optgroup.design': 'Design',
    'opt.tcf': 'TCF preparation',
    'opt.ielts': 'IELTS / TOEFL / Cambridge',
    'opt.toeic': 'TOEIC',
    'opt.cambridge': 'Cambridge',
    'opt.cours': 'French / English courses',
    'opt.cours.short': 'Language courses',
    'opt.traduction': 'Translation',
    'opt.soutien': 'Academic tutoring',
    'opt.interview': 'Interview preparation',
    'opt.formation': 'Corporate training',
    'opt.logo': 'Logo design',
    'opt.montage': 'Video editing',
    'opt.design': 'Graphic design',
    'opt.livestream': 'Live streaming',
    'opt.mat': 'Equipment consulting & purchase',
    'opt.autre': 'Other',
    'price.from': 'From',
    'price.or': 'or',
    'price.quote': 'Custom quote',
    'price.unit.session': 'session',
    'price.unit.hour': 'hour',
    'price.unit.page': 'page',
    'price.unit.word': 'word',
    'price.unit.visual': 'visual',
    'price.unit.month': 'month',
    'price.unit.pack': 'package',
    'price.unit.project': 'project',
    'price.unit.day': 'day',
    'price.unit.assistance': 'assistance',
    'form.rating': 'Rating *',
    'form.message': 'Your testimonial *',
    'form.location': 'City / Country',
    'form.location.hint': 'Pick a country from the list or type freely (city, country).',
    'form.ph.location': 'e.g. Lomé, Togo or choose a country',
    'form.submit': 'Submit my testimonial →',
    'booking.badge': 'Booking',
    'booking.title': 'Ready to take action?',
    'booking.desc': 'Book a free 30-minute discovery call. We\'ll define the plan best suited to your goals.',
    'booking.f1': '100% free consultation',
    'booking.f2': 'No commitment required',
    'booking.f3': 'Available online (Zoom, Meet, WhatsApp)',
    'booking.f4': 'Response within 24h',
    'booking.f5': 'Personalized quote provided',
    'booking.wa': '💬 WhatsApp direct',
    'booking.email': '✉️ Send an email',
    'booking.cal.title': 'Book a call',
    'booking.cal.desc': 'Pick the time slot that works for you directly in my calendar.',
    'booking.cal.cta': 'Open calendar →',
    'booking.cal.alt.prefix': 'Or ',
    'booking.cal.alt.link': 'WhatsApp',
    'contact.badge': 'Contact',
    'contact.title': 'Let\'s talk about your project',
    'contact.desc': 'Available via WhatsApp, email, or LinkedIn. Response within 24 business hours.',
    'contact.catalogue': 'Service catalog',
    'contact.catalogue.sub': 'View all our offers with photos',
    'payment.title': 'Accepted payment methods',
    'payment.toggle': 'View accepted payment methods',
    'payment.mixx': 'Mixx by Yas mobile payment',
    'payment.orabank.note': 'Orabank transfer: bank details will be sent with the quote for the relevant service.',
    'svcpage.back': '← Back to services',
    'svcpage.back.design': '← Back to design',
    'svcpage.packages': 'Packages & pricing',
    'svcpage.packages.lead': 'Prices are shown in your local currency.',
    'svcpage.nav.label': 'On this page',
    'svcpage.nav.packages': 'Packages',
    'svcpage.nav.how': 'How it works',
    'svcpage.nav.delivery': 'Timelines',
    'svcpage.nav.payment': 'Payment',
    'svcpage.nav.faq': 'FAQ',
    'svcpage.nav.book': 'Book now',
    'svcpage.modalities': 'How it works',
    'svcpage.process': 'Our process',
    'svcpage.payment': 'Payment methods',
    'svcpage.payment.lead': 'Mixx by Yas mobile payment or Orabank transfer as stated on your quote.',
    'svcpage.delivery': 'Delivery timelines',
    'svcpage.delivery.normal': 'Standard',
    'svcpage.delivery.express': 'Express',
    'svcpage.faq': 'FAQ',
    'svcpage.cta.book': 'Book now',
    'svcpage.cta.quote': 'Request a quote',
    'svcpage.cta.policy': 'Service policy',
    'svcpage.cta.details': 'View details',
    'book.badge': 'Book now',
    'book.title': 'Book your classes',
    'book.lead': 'Choose your package, complete the form, and confirm in one click. We will get back to you within 24 hours.',
    'book.title.service': 'Book this service',
    'book.lead.service': 'Select a package, complete the form, and accept the policy. We notify you by email, WhatsApp, and Calendly at once.',
    'book.mostPopular': 'Most Popular',
    'book.perMonth': 'month',
    'book.perHour': 'hour',
    'book.perSession': 'session',
    'svcpage.packages.individuals': 'Professional translation (individuals)',
    'svcpage.packages.business': 'Professional translation (businesses)',
    'book.languagesAvailable': 'Languages: English, French, or Both',
    'book.mode.online': 'Online',
    'book.mode.inperson': 'In-Person',
    'book.mode.online.desc': 'Video call · flexible schedule',
    'book.mode.inperson.desc': 'Face-to-face in Lomé',
    'svcpage.mode.heading': 'Choose your format',
    'book.field.mode': 'Mode',
    'book.field.service': 'Service',
    'book.field.package': 'Select a package above',
    'book.field.package.placeholder': 'Select a package above',
    'book.field.summary': 'Your selection',
    'book.field.language': 'Language',
    'book.lang.en': 'English',
    'book.lang.fr': 'French',
    'book.lang.both': 'Both',
    'book.field.name': 'Full name',
    'book.field.email': 'Email',
    'book.field.phone': 'Phone / WhatsApp number',
    'book.field.startDate': 'Preferred start date',
    'book.policy.title': 'Booking & Payment Policy',
    'book.policy.1': 'A booking is confirmed only after receipt of the first monthly payment.',
    'book.policy.2': 'Sessions are scheduled by mutual agreement within 48 hours of booking confirmation.',
    'book.policy.3': 'Cancellation must be notified at least 24 hours in advance. Late cancellations are not refunded.',
    'book.policy.4': 'Monthly packages are non-transferable and non-refundable once sessions have started.',
    'book.policy.5': 'Online sessions are conducted via {platform}.',
    'book.policy.6': 'In-person sessions take place at {address}.',
    'book.policy.7': 'By clicking "Accept & Book", you confirm you have read and accepted these terms.',
    'book.policy.accept': 'I have read and accept the booking policy',
    'book.policy.selectPackage': 'Select a package above to view the booking and payment terms that apply to that package.',
    'book.submit': 'Accept & Book',
    'book.submitWhatsapp': 'Send via WhatsApp',
    'book.actionsHint':
      'You can use either button, or both: book a time on Calendly and/or send your request via WhatsApp with the same details.',
    'book.whatsappOpened':
      'WhatsApp will open with your message — tap Send in the app. You can also use "Accept & Book" to schedule a call on Calendly.',
    'book.sending': 'Sending…',
    'book.success': '✅ Your booking request has been sent! We will contact you within 24 hours to confirm your session. Check your WhatsApp and email.',
    'book.onQuote': 'On quote',
    'bookPick.title': 'Choose a service',
    'bookPick.lead': 'Select the service you want to book. You will be taken to that service\'s booking page.',
    'bookPick.close': 'Close',
    'bookPick.go': 'Book this service →',
    'catalogue.cta.details': 'View details →',
    'contact.form.title': 'Ask a question',
    'contact.form.subtitle': 'Questions about our services, pricing, or availability? Send by email or WhatsApp.',
    'contact.form.service': 'Related service *',
    'contact.form.question': 'Your question *',
    'contact.form.submit': 'Send my question →',
    'contact.form.submit.email': 'Send by email →',
    'contact.form.submit.whatsapp': 'Send via WhatsApp →',
    'contact.form.sending': 'Sending…',
    'contact.form.ok': '✓ Your question was sent. We will reply by email within 24 hours.',
    'contact.form.err': 'Could not send right now. Please email contact@linguaphix.com.',
    'policy.page.back': '← Back to site',
    'policy.page.home': 'Home',
    'portfolio.page.back': '← Back to design',
    'portfolio.page.home': 'Home',
    'portfolio.badge': 'Portfolio',
    'portfolio.title': 'Video & graphic design',
    'portfolio.subtitle': 'Edits, audiovisual productions, and visual work for individuals, brands, and businesses.',
    'portfolio.tab.all': 'All',
    'portfolio.tab.video': 'Video',
    'portfolio.tab.graphic': 'Graphic design',
    'portfolio.empty': 'No projects in this category yet.',
    'portfolio.video.local': 'Place your MP4 file in assets/portfolio/videos/',
    'portfolio.playlist.empty': 'No media in this folder yet.',
    'portfolio.playlist.sync': 'node scripts/build-portfolio-playlists.mjs',
    'portfolio.playlist.hint': 'Drop files into the folder shown, then run the command above to refresh the playlist.',
    'portfolio.gallery.open': 'View playlist',
    'portfolio.gallery.openAria': 'Open playlist',
    'portfolio.gallery.count': '{n} items',
    'portfolio.gallery.slide': '{current} / {total}',
    'portfolio.gallery.close': 'Close',
    'portfolio.gallery.prev': 'Previous',
    'portfolio.gallery.next': 'Next',
    'portfolio.gallery.clickNext': 'Click to see next',
    'portfolio.gallery.clickNav': 'Click right for next · left for previous',
    'portfolio.tiktok.open': 'View on TikTok',
    'portfolio.tiktok.openAria': 'Open TikTok profile',
    'portfolio.tag.montage': 'Video editing',
    'portfolio.tag.prod': 'AV production',
    'portfolio.tag.live': 'Live streaming',
    'portfolio.tag.logo': 'Logo & branding',
    'portfolio.tag.social': 'Social media',
    'portfolio.tag.print': 'Print & posters',
    'portfolio.v1.title': 'Animation',
    'portfolio.v1.desc': 'Motion design, animated branding, and sequences for social or presentation.',
    'portfolio.v2.title': 'Social handles',
    'portfolio.v2.desc': 'Intros, reels, and short formats for profiles and social campaigns.',
    'portfolio.g1.title': 'Visual identity — brand',
    'portfolio.g1.desc': 'Brand logos by theme: home, wellness, fashion, advisory, and institutions.',
    'portfolio.g2.title': 'Visual series — campaign',
    'portfolio.g2.desc': 'Le Cogitorium social series — school organization, 7 visuals.',
    'portfolio.g3.title': 'Flyer & poster',
    'portfolio.g3.desc': 'Flyers, posters, and print applications — corporate, fashion, and events.',
    'portfolio.cta.text': 'Want something similar for your brand or event?',
    'portfolio.cta.btn': 'Let\'s talk about your project →',
    'policy.badge': 'Policy',
    'policy.title': 'General Policy & Privacy Policy',
    'policy.date': 'Last updated: June 2025 · LINGUAPHIX',
    'policy.h1': '1. Overview',
    'policy.p1': 'LINGUAPHIX is a language and creative services platform run by Akuété SEWA-DOVI, independent freelancer based in Togo.',
    'policy.h2': '2. Terms of Use',
    'policy.p2': 'By booking a LINGUAPHIX service, the client agrees to the following:',
    'policy.l2.1': 'Cancellations without 24h notice: billed at 50% of the rate.',
    'policy.l2.2': 'Payments are non-refundable unless agreed in writing.',
    'policy.l2.3': 'Design files become client property after full payment.',
    'policy.l2.4': 'Right to refuse any service deemed unethical.',
    'policy.l2.5': 'Delivery timelines are indicative and may vary.',
    'policy.h3': '3. Personal Data Collection',
    'policy.p3': 'Data collected: name, email, phone number. Used exclusively for service delivery.',
    'policy.h4': '4. Data Use',
    'policy.l4.1': 'Data is never sold to third parties.',
    'policy.l4.2': 'Used for service-related communications (opt-out available).',
    'policy.l4.3': 'Data deletion possible upon request.',
    'policy.h5': '5. Cookies',
    'policy.p5': 'Functional and analytics cookies (Google Analytics). Disable in your browser settings.',
    'policy.h6': '6. GDPR Rights',
    'policy.p6': 'Rights of access, rectification, deletion, and portability. Contact: contact@linguaphix.com.',
    'policy.h7': '7. Intellectual Property',
    'policy.p7': 'All content is copyright protected. Deliverables belong to the client after full payment.',
    'policy.h8': '8. Liability',
    'policy.p8': 'Liability limited to amounts billed for the service. No guarantee of exam results.',
    'policy.h9': '9. Disputes',
    'policy.p9': 'Amicable resolution first. Governed by Togolese law.',
    'policy.toc': 'Contents',
    'policy.toc.general': 'General & privacy',
    'policy.toc.lang': 'Language services',
    'policy.toc.design': 'Design & audiovisual',
    'policy.amend': 'These policies may be updated. The current version is the one published on this page — contact contact@linguaphix.com for clarifications.',
    'policy.lang.badge': 'Languages',
    'policy.lang.title': 'Policy — Language services',
    'policy.lang.intro': 'Applies to courses, exam preparation (TCF, IELTS, TOEFL, TOEIC, Cambridge), translation, proofreading, and language coaching.',
    'policy.lang.l1': 'Booking: every session is confirmed in writing (date, duration, rate). Without confirmation, the slot is not guaranteed.',
    'policy.lang.l2': 'Cancellation: sessions cancelled less than 24 hours in advance are billed at 50% of the agreed rate.',
    'policy.lang.l3': 'No-show & lateness: unannounced absences are charged in full; lateness over 15 minutes may shorten the session without refund.',
    'policy.lang.l4': 'Payment: due before or at the first session unless a prior written arrangement is made. Mixx by Yas at +228 92 53 99 53 (same number as WhatsApp); Orabank (details sent with your quote).',
    'policy.lang.l5': 'Refunds: none after a course or package has started, except in exceptional cases accepted in writing.',
    'policy.lang.l6': 'Online sessions: stable connection and suitable environment required; client-side technical issues do not entitle a free reschedule.',
    'policy.lang.l7': 'Recording: audio/video recording prohibited without written consent from both parties.',
    'policy.lang.l8': 'Learning materials: exercises and files for personal use only.',
    'policy.lang.l9': 'Translation & proofreading: client warrants source accuracy; deadlines and certification stated in the quote.',
    'policy.lang.l10': 'Exam results: professional instruction provided — no guarantee of official scores.',
    'policy.lang.l11': 'Confidentiality: documents and correspondence are not shared with third parties.',
    'policy.design.badge': 'Design',
    'policy.design.title': 'Policy — Design & audiovisual services',
    'policy.design.intro': 'Applies to graphic design, visual identity, video editing, live streaming, and social media content.',
    'policy.design.l1': 'Quote & scope: deliverables, formats, revisions, and timeline stated; out-of-scope work billed separately.',
    'policy.design.l2': 'Deposit: 50% before work begins; balance due on delivery of final files.',
    'policy.design.l3': 'Brief & client assets: copy, logos, and approvals supplied on agreed dates; client delays may push delivery.',
    'policy.design.l4': 'Revisions: two (2) minor revision rounds included; extra rounds or major redesigns billed separately.',
    'policy.design.l5': 'Timelines: estimates depend on complexity and client responsiveness (feedback within 5 business days recommended).',
    'policy.design.l6': 'Ownership: deliverables and source files belong to the client after full payment.',
    'policy.design.l7': 'Portfolio: project may be showcased unless the client objects in writing.',
    'policy.design.l8': 'Third-party licenses: fonts, music, and stock assets subject to their usage terms.',
    'policy.design.l9': 'Cancellation: after work starts, deposit is non-refundable; completed work may be invoiced pro rata.',
    'policy.design.l10': 'Rush work: express deadlines may incur a 25–50% surcharge on the quote.',
    'policy.design.l11': 'Prohibited content: projects that are illegal, defamatory, or unethical may be refused.',
    'footer.tagline': 'Languages · Design · Excellence.',
    'footer.col1': 'Languages',
    'footer.col2': 'Design',
    'footer.col3': 'Quick links',
    'footer.tcf': 'TCF Preparation',
    'footer.cours': 'Language courses',
    'footer.trad': 'Translation',
    'footer.soutien': 'Academic tutoring',
    'footer.logo': 'Logo creation',
    'footer.montage': 'Video editing',
    'footer.design': 'Graphic design',
    'footer.live': 'Live streaming',
    'footer.policy': 'Privacy policy',
    'footer.sitemap': 'Sitemap',
    'sitemap.page.back': '← Back to site',
    'sitemap.badge': 'Navigation',
    'sitemap.title': 'Sitemap',
    'sitemap.intro': 'Find every important page and section on LINGUAPHIX.',
    'sitemap.h.pages': 'Main pages',
    'sitemap.h.home': 'Homepage — sections',
    'sitemap.h.services': 'Services (overview)',
    'sitemap.h.design': 'Design page',
    'sitemap.h.policy': 'Service policies',
    'sitemap.h.book': 'Book & quotes',
    'sitemap.h.contact': 'Contact & social',
    'sitemap.link.home': 'Home',
    'sitemap.link.about': 'About — Profile',
    'sitemap.link.design': 'Design — Creative services',
    'sitemap.link.portfolio': 'Portfolio — Video & design',
    'sitemap.link.catalogue': 'Service catalog',
    'sitemap.link.policy': 'Privacy & policies',
    'sitemap.link.sitemap': 'Sitemap',
    'sitemap.link.prices': 'Rates per service',
    'sitemap.link.process': 'How it works',
    'sitemap.link.booking': 'Booking',
    'sitemap.link.policy.general': 'General & privacy',
    'sitemap.link.policy.lang': 'Language services',
    'sitemap.link.policy.design': 'Design & audiovisual',
    'sitemap.link.quote': 'Request a quote / ask a question',
    'sitemap.link.whatsapp': 'WhatsApp',
    'footer.catalogue': 'Catalog',
    'footer.copy.prefix': '© 2026 LINGUAPHIX · Developed by ',
    'footer.copy.name': 'Akuété SEWA-DOVI',
    'footer.copy.suffix': ' · All rights reserved',
    'wa.float': 'WhatsApp',
    'modal.accept': 'I accept & Book →',
    'modal.decline': 'Back',
    'quote.modal.title': 'Request a quote',
    'quote.modal.text': 'Tell us about your project using the « Ask a question » form in the Contact section. We reply by email within 24 hours with your quote and payment details (Mixx by Yas, Orabank).',
    'quote.modal.go': 'Go to the form →',
    'quote.modal.close': 'Close',
  }
};

// ── LANGUAGE STATE ──
let currentLang = 'fr';

function detectLang() {
  if (typeof getPreferredLang === 'function') return resolveLang(getPreferredLang());
  return 'fr';
}

function applySitePhones() {
  const phone = window.LINGUAPHIX_CONFIG?.phone;
  if (!phone) return;
  document.querySelectorAll('[data-site-phone-display]').forEach((el) => {
    el.textContent = phone.display;
    if (el.tagName === 'A') el.href = `tel:${phone.tel}`;
  });
}

function applyLang(lang) {
  const resolved = resolveLang(lang);
  currentLang = resolved;
  document.documentElement.lang = resolved;
  lang = resolved;
  updateLangToggleUI(lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) {
      const text = i18n[lang][key];
      if (text.includes('{currency}') && typeof getDetectedCurrency === 'function') {
        el.textContent = text.replace('{currency}', getDetectedCurrency());
      } else {
        el.textContent = text;
      }
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[lang][key]) el.placeholder = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (i18n[lang][key]) el.innerHTML = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (i18n[lang][key]) el.setAttribute('aria-label', i18n[lang][key]);
  });
  if (typeof applySelectI18n === 'function') applySelectI18n(lang, i18n);
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    if (lang === 'fr') heroTitle.innerHTML = 'Maîtrisez les <span>langues.</span><br>Rayonnez par le <span>design.</span>';
    else heroTitle.innerHTML = 'Master <span>Languages.</span><br>Shine Through <span>Design.</span>';
  }
  if (typeof applyHomeServicePrices === 'function') applyHomeServicePrices(lang);
  if (typeof applyGeoPrices === 'function') applyGeoPrices(lang, i18n);
  if (document.getElementById('services-ticker')) {
    requestAnimationFrame(updateSiteHeaderHeight);
  }
  if (typeof populateCountryDatalist === 'function') populateCountryDatalist(lang);
  if (typeof applyCatalogueImages === 'function') applyCatalogueImages(lang);
  if (typeof renderServicePage === 'function' && document.body.classList.contains('page-service')) {
    renderServicePage(lang);
  } else if (typeof renderServiceBooking === 'function' && document.body.classList.contains('page-service')) {
    renderServiceBooking(lang);
  }
  if (typeof refreshBookingPolicy === 'function' && document.getElementById('booking-policy-list')) {
    refreshBookingPolicy(lang);
  }
  refreshPolicyModalIfOpen(lang);
  renderServiceBookModal(lang);
  if (typeof syncBrowserUrlLang === 'function') syncBrowserUrlLang(lang, { replace: true });
  if (typeof applyLocalizedLinks === 'function') applyLocalizedLinks(lang);
  syncHeroLogoRefreshCopy(lang);
}

function refreshPolicyModalIfOpen(lang) {
  const modal = document.getElementById('policyModal');
  if (!modal?.classList.contains('open')) return;
  renderPolicyModal(currentPolicyType, lang, currentPolicyServiceKey);
}

function updateLangToggleUI(lang) {
  document.querySelectorAll('.lang-toggle__btn[data-lang]').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function setLang(lang) {
  const resolved = resolveLang(lang);
  if (!resolved) return;
  if (typeof setStoredLang === 'function') setStoredLang(resolved);
  else {
    try {
      localStorage.setItem('linguaphix-lang', resolved);
    } catch (_) { /* ignore */ }
  }
  applyLang(resolved);
}

function initUrlLangSync() {
  window.addEventListener('popstate', () => {
    const fromUrl = typeof getLangFromUrl === 'function' ? getLangFromUrl() : null;
    if (fromUrl && fromUrl !== currentLang) {
      if (typeof setStoredLang === 'function') setStoredLang(fromUrl);
      applyLang(fromUrl);
      return;
    }
    if (!fromUrl && currentLang) {
      if (typeof syncBrowserUrlLang === 'function') syncBrowserUrlLang(currentLang, { replace: true });
      if (typeof applyLocalizedLinks === 'function') applyLocalizedLinks(currentLang);
    }
  });
}

function toggleLang() {
  setLang(currentLang === 'fr' ? 'en' : 'fr');
}

// ── FIXED HEADER (nav + ticker on home) ──
function updateSiteHeaderHeight() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const h = header.offsetHeight;
  document.documentElement.style.setProperty('--site-header-height', `${h}px`);
}

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const btn = document.getElementById('back-to-top');
  if (nav) {
    const wasScrolled = nav.classList.contains('scrolled');
    syncNavbarScrolledState();
    if (document.getElementById('site-header') && wasScrolled !== nav.classList.contains('scrolled')) {
      updateSiteHeaderHeight();
    }
  }
  if (btn) {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }
});
window.addEventListener('resize', updateSiteHeaderHeight);

// ── MOBILE MENU ──
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
}

function closeMobileMenuOnResize() {
  if (window.innerWidth > 1024) {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.classList.remove('menu-open');
  }
}
window.addEventListener('resize', closeMobileMenuOnResize);

// ── FADE-UP ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── SERVICES FILTER (langues split by audience; design shared) ──
function revealElementForHash(el) {
  if (!el) return;

  if (el.classList.contains('catalogue-service') || el.closest('#catalogueSections')) {
    if (!el.dataset.audience || typeof switchCatalogueAudience !== 'function') return;
    const audiences = el.dataset.audience.trim().split(/\s+/);
    const type = audiences.length === 1 ? audiences[0] : 'all';
    const tabs = document.querySelectorAll('.catalogue-filter-bar .stab');
    if (!tabs.length) return;
    const tabIndex = type === 'particuliers' ? 1 : type === 'entreprises' ? 2 : 0;
    switchCatalogueAudience(type, tabs[tabIndex]);
    return;
  }

  if (!el.dataset.audience) return;
  const audiences = el.dataset.audience.trim().split(/\s+/);
  const type = audiences.length === 1 ? audiences[0] : 'all';
  const tabs = document.querySelectorAll('.services-filter-bar .stab');
  if (!tabs.length) return;
  const tabIndex = type === 'particuliers' ? 1 : type === 'entreprises' ? 2 : 0;
  switchAudience(type, tabs[tabIndex]);
}

function scrollToHashTarget() {
  const id = location.hash.replace(/^#/, '');
  if (!id) return;
  if (id === 'book-now' && document.body.classList.contains('page-service')) {
    if (typeof renderServiceBooking === 'function' && !document.getElementById('book-now')) {
      renderServiceBooking(typeof currentLang !== 'undefined' ? currentLang : 'fr');
    }
    if (typeof scrollToServiceBooking === 'function') {
      requestAnimationFrame(() => scrollToServiceBooking());
      return;
    }
  }
  const el = document.getElementById(id);
  if (!el) return;
  revealElementForHash(el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initHashScroll() {
  scrollToHashTarget();
  window.addEventListener('hashchange', scrollToHashTarget);
}

function switchAudience(type, btn) {
  document.querySelectorAll('.services-filter-bar .stab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const section = document.getElementById('services');
  if (section) {
    section.classList.toggle('services-filter-all', type === 'all');
    section.classList.toggle('services-filter-particuliers', type === 'particuliers');
    section.classList.toggle('services-filter-entreprises', type === 'entreprises');
  }

  document.querySelectorAll('.services-subsection[data-audience]').forEach(sub => {
    const audiences = sub.dataset.audience.trim().split(/\s+/);
    const show = type === 'all' || audiences.includes(type);
    sub.hidden = !show;
  });

  document.querySelectorAll('.services-lang-matrix [data-audience]').forEach(el => {
    const audiences = el.dataset.audience.trim().split(/\s+/);
    const show = type === 'all' || audiences.includes(type);
    el.hidden = !show;
  });
}

// ── STAR RATING ──
const stars = document.querySelectorAll('#starRating span');
stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const v = parseInt(star.dataset.v);
    stars.forEach((s, i) => s.style.color = i < v ? '#f0b429' : '#ddd');
  });
  star.addEventListener('mouseout', () => {
    const rating = parseInt(document.getElementById('t-rating').value) || 0;
    stars.forEach((s, i) => s.style.color = i < rating ? '#f0b429' : '#ddd');
  });
  star.addEventListener('click', () => {
    const v = parseInt(star.dataset.v);
    document.getElementById('t-rating').value = v;
    stars.forEach((s, i) => s.style.color = i < v ? '#f0b429' : '#ddd');
  });
});

// ── TESTIMONIAL SUBMIT (Supabase) ──
async function submitTestimonial() {
  const name = clampField(document.getElementById('t-name').value, FORM_LIMITS.name);
  const role = clampField(document.getElementById('t-role').value, FORM_LIMITS.role);
  const service = clampField(document.getElementById('t-service').value, FORM_LIMITS.service);
  const rating = Math.min(5, Math.max(1, parseInt(document.getElementById('t-rating').value, 10) || 0));
  const message = clampField(document.getElementById('t-text').value, FORM_LIMITS.message);
  const location = clampField(document.getElementById('t-location').value, FORM_LIMITS.location);
  const msgEl = document.getElementById('testi-msg');

  if (!name || !role || !service || !rating || !message) {
    msgEl.style.display = 'block';
    msgEl.style.background = '#fef2f2';
    msgEl.style.color = '#b91c1c';
    msgEl.textContent = currentLang === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : 'Please fill in all required fields.';
    return;
  }

  if (!isSupabaseConfigured()) {
    msgEl.style.display = 'block';
    msgEl.style.background = '#fff8e1';
    msgEl.style.color = '#92400e';
    msgEl.textContent = currentLang === 'fr'
      ? 'L\'envoi en ligne sera activé prochainement. En attendant, contactez-nous sur WhatsApp pour partager votre avis.'
      : 'Online submission will be enabled soon. Meanwhile, contact us on WhatsApp to share your feedback.';
    return;
  }

  try {
    const { url, key } = getSupabaseConfig();
    const res = await fetch(`${url}/rest/v1/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ name, role, service, rating, message, location, approved: false })
    });
    if (res.ok) {
      msgEl.style.display = 'block';
      msgEl.style.background = '#f0fdf4';
      msgEl.style.color = '#166534';
      msgEl.textContent = currentLang === 'fr'
        ? '✓ Merci ! Votre témoignage sera publié ici après validation.'
        : '✓ Thank you! Your review will appear here after approval.';
      ['t-name', 't-role', 't-text', 't-location'].forEach(id => { document.getElementById(id).value = ''; });
      document.getElementById('t-service').value = '';
      document.getElementById('t-rating').value = '0';
      stars.forEach(s => { s.style.color = '#ddd'; });
      return;
    }
    throw new Error('submit failed');
  } catch (err) {
    msgEl.style.display = 'block';
    msgEl.style.background = '#fef2f2';
    msgEl.style.color = '#b91c1c';
    msgEl.textContent = currentLang === 'fr'
      ? 'Erreur de connexion. Réessayez ou contactez-nous par WhatsApp.'
      : 'Connection error. Please try again or contact us via WhatsApp.';
  }
}

// ── CONTACT QUESTION FORM (email via FormSubmit · WhatsApp deep link) ──
function showContactFeedback(msgEl, type, text) {
  if (!msgEl) return;
  msgEl.hidden = false;
  msgEl.className = `form-feedback form-feedback--${type}`;
  msgEl.textContent = text;
}

function readContactFormValues() {
  const service = clampField(document.getElementById('c-service')?.value, FORM_LIMITS.service);
  return {
    name: clampField(document.getElementById('c-name')?.value, FORM_LIMITS.name),
    email: clampField(document.getElementById('c-email')?.value, FORM_LIMITS.email),
    service,
    question: clampField(document.getElementById('c-question')?.value, FORM_LIMITS.message),
    serviceLabel: typeof getServiceLabel === 'function'
      ? getServiceLabel(service, currentLang, i18n)
      : service,
  };
}

function validateContactForm(values, msgEl) {
  if (isHoneypotFilled()) return false;

  if (!values.name || !values.email || !values.service || !values.question) {
    showContactFeedback(
      msgEl,
      'error',
      currentLang === 'fr' ? 'Veuillez remplir les champs obligatoires.' : 'Please fill in all required fields.'
    );
    return false;
  }

  if (!isValidEmail(values.email)) {
    showContactFeedback(
      msgEl,
      'error',
      currentLang === 'fr' ? 'Adresse email invalide.' : 'Invalid email address.'
    );
    return false;
  }

  return true;
}

function sendContactViaWhatsApp(e) {
  if (e) e.preventDefault();
  const msgEl = document.getElementById('contact-msg');
  const values = readContactFormValues();
  if (!validateContactForm(values, msgEl)) return;

  const lines = currentLang === 'fr'
    ? [
      'Bonjour LINGUAPHIX,',
      '',
      `Nom : ${values.name}`,
      `Email : ${values.email}`,
      `Service : ${values.serviceLabel}`,
      '',
      'Message :',
      values.question,
    ]
    : [
      'Hello LINGUAPHIX,',
      '',
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Service: ${values.serviceLabel}`,
      '',
      'Message:',
      values.question,
    ];

  const waId = window.LINGUAPHIX_CONFIG?.phone?.waMe || '22892539953';
  const url = `https://wa.me/${waId}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  showContactFeedback(
    msgEl,
    'info',
    currentLang === 'fr'
      ? 'WhatsApp s\'ouvre avec votre message — appuyez sur Envoyer dans l\'application.'
      : 'WhatsApp will open with your message — tap Send in the app.'
  );
}

async function submitContact(e) {
  if (e) e.preventDefault();

  const msgEl = document.getElementById('contact-msg');
  const form = document.getElementById('contact-question-form');
  const submitBtn = form?.querySelector('[data-contact-action="email"]');
  const t = i18n[currentLang];
  const values = readContactFormValues();

  if (!validateContactForm(values, msgEl)) return;

  const { name, email, serviceLabel, question } = values;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.dataset.prevLabel = submitBtn.textContent;
    submitBtn.textContent = t['contact.form.sending'] || '…';
  }
  showContactFeedback(msgEl, 'info', t['contact.form.sending'] || '…');

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        service: serviceLabel,
        message: question,
        _subject: currentLang === 'fr'
          ? `Question LINGUAPHIX — ${name}`
          : `LINGUAPHIX question — ${name}`,
        _template: 'table',
        _gotcha: '',
        website: '',
      })
    });

    if (!res.ok) throw new Error('submit failed');

    showContactFeedback(msgEl, 'success', t['contact.form.ok']);
    form.reset();
    if (typeof applySelectI18n === 'function') applySelectI18n(currentLang, i18n);
  } catch {
    showContactFeedback(msgEl, 'error', t['contact.form.err']);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      if (submitBtn.dataset.prevLabel) submitBtn.textContent = submitBtn.dataset.prevLabel;
    }
  }
}

// ── POLICY MODAL ──
/** Homepage / nav “book appointment” — slug, i18n label key, category for grouping */
const BOOKABLE_SERVICES = [
  { slug: 'tcf', category: 'langues', i18n: 'srv.tcf.title' },
  { slug: 'ielts', category: 'langues', i18n: 'srv.ielts.title' },
  { slug: 'toeic', category: 'langues', i18n: 'srv.toeic.title' },
  { slug: 'cours', category: 'langues', i18n: 'srv.cours.title' },
  { slug: 'interview', category: 'langues', i18n: 'srv.interview.title' },
  { slug: 'soutien', category: 'langues', i18n: 'srv.soutien.title' },
  { slug: 'traduction', category: 'langues', i18n: 'srv.trad.title' },
  { slug: 'formation', category: 'langues', i18n: 'srv.corp.training.title' },
  { slug: 'logo', category: 'design', i18n: 'srv.logo.title' },
  { slug: 'montage', category: 'design', i18n: 'srv.montage.title' },
  { slug: 'graphic', category: 'design', i18n: 'srv.design.title' },
  { slug: 'livestream', category: 'design', i18n: 'srv.live.title' },
  { slug: 'materiel', category: 'design', i18n: 'srv.mat.title' }
];

const POLICY_SERVICE_I18N = {
  tcf: 'srv.tcf.title',
  ielts: 'srv.ielts.title',
  toeic: 'srv.toeic.title',
  cours: 'srv.cours.title',
  interview: 'srv.interview.title',
  soutien: 'srv.soutien.title',
  traduction: 'srv.trad.title',
  formation: 'srv.corp.training.title',
  logo: 'srv.logo.title',
  montage: 'srv.montage.title',
  graphic: 'srv.design.title',
  livestream: 'srv.live.title',
  materiel: 'srv.mat.title'
};

let currentPolicyType = 'langues';
let currentPolicyServiceKey = null;

function getPolicyServiceLabel(serviceKey, lang) {
  if (!serviceKey || !POLICY_SERVICE_I18N[serviceKey]) return null;
  const text = i18n[lang]?.[POLICY_SERVICE_I18N[serviceKey]];
  return text || null;
}

function renderPolicyModal(type, lang, serviceKey) {
  const title = document.getElementById('modalTitle');
  const content = document.getElementById('modalContent') || document.getElementById('policyModalContent');
  const serviceLabel = getPolicyServiceLabel(serviceKey, lang);
  if (typeof getServicePolicyModalTitle === 'function' && title) {
    title.textContent = getServicePolicyModalTitle(type, lang, serviceKey, serviceLabel);
  }
  if (typeof getServicePolicyHtml === 'function' && content) {
    content.innerHTML = getServicePolicyHtml(type, lang, serviceKey, serviceLabel);
  }
}
let scrollLockY = 0;

function lockBodyScroll() {
  if (document.body.classList.contains('scroll-locked')) return;
  scrollLockY = window.scrollY;
  document.documentElement.classList.add('scroll-locked');
  document.body.classList.add('scroll-locked');
}

function unlockBodyScroll() {
  if (!document.body.classList.contains('scroll-locked')) return;
  document.documentElement.classList.remove('scroll-locked');
  document.body.classList.remove('scroll-locked');
  window.scrollTo(0, scrollLockY);
}

function isAnyModalOpen() {
  return document.querySelector('.modal-overlay.open') !== null;
}

function openPolicy(type, e, serviceKey) {
  if (e) e.preventDefault();
  currentPolicyType = type;
  currentPolicyServiceKey = serviceKey || null;
  const modal = document.getElementById('policyModal');
  renderPolicyModal(type, currentLang, currentPolicyServiceKey);
  lockBodyScroll();
  modal.classList.add('open');
}

function closePolicy() {
  document.getElementById('policyModal')?.classList.remove('open');
  if (!isAnyModalOpen()) unlockBodyScroll();
}

function getServiceBookPageUrl(slug, lang, audience) {
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  const prefix = /\/services\//.test(path) ? '' : 'services/';
  let base = `${prefix}${slug}.html`;
  if (slug === 'traduction' && audience) {
    base += `?audience=${encodeURIComponent(audience)}`;
  }
  base += '#book-now';
  const l = lang || currentLang || 'fr';
  return typeof withLangInHref === 'function' ? withLangInHref(base, l) : base;
}

function renderServiceBookModal(lang) {
  const root = document.getElementById('serviceBookModalList');
  if (!root) return;

  const t = i18n[lang] || i18n.fr;
  const goLabel = t['bookPick.go'] || '→';
  const langKey = 'services.subsection.lang';
  const designKey = 'services.subsection.design';

  const renderGroup = (category, headingKey) => {
    const items = BOOKABLE_SERVICES.filter((s) => s.category === category);
    if (!items.length) return '';
    const heading = t[headingKey] || headingKey;
    const links = items
      .map((s) => {
        const label = t[s.i18n] || s.slug;
        const href = getServiceBookPageUrl(s.slug, lang);
        const icon = window.SERVICE_PAGES?.[s.slug]?.icon || '✦';
        return `<li>
          <a href="${href}" class="service-book-modal__item service-book-modal__item--${category}">
            <span class="service-book-modal__icon" aria-hidden="true">${icon}</span>
            <span class="service-book-modal__text">
              <span class="service-book-modal__name">${label}</span>
              <span class="service-book-modal__action">${goLabel}</span>
            </span>
          </a>
        </li>`;
      })
      .join('');
    return `
      <div class="service-book-modal__group">
        <h4 class="service-book-modal__group-title">${heading}</h4>
        <ul class="service-book-modal__list">${links}</ul>
      </div>`;
  };

  root.innerHTML = renderGroup('langues', langKey) + renderGroup('design', designKey);
}

function getSiteAssetPrefix() {
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  return /\/services\//.test(path) ? '../' : '';
}

function ensureServiceBookModal() {
  if (document.getElementById('serviceBookModal')) return;

  const p = getSiteAssetPrefix();
  const wrap = document.createElement('div');
  wrap.innerHTML = `
<div class="modal-overlay" id="serviceBookModal" role="dialog" aria-modal="true" aria-labelledby="serviceBookModalTitle">
  <div class="modal-box modal-box--service-pick" style="position:relative;">
    <button type="button" class="modal-close-btn" onclick="closeServiceBookModal()" aria-label="Fermer">✕</button>
    <h3 id="serviceBookModalTitle" data-i18n="bookPick.title">Choisir un service</h3>
    <p class="service-book-modal__lead" data-i18n="bookPick.lead">Sélectionnez la prestation à réserver. Vous serez dirigé vers la page de réservation du service.</p>
    <div id="serviceBookModalList" class="service-book-modal__body"></div>
    <div class="modal-actions">
      <button type="button" class="btn btn-outline" onclick="closeServiceBookModal()" data-i18n="bookPick.close">Fermer</button>
    </div>
  </div>
</div>`;
  const modal = wrap.firstElementChild;
  if (modal) document.body.appendChild(modal);
}

function bindNavBookCtas() {
  const handler = (e) => {
    openServiceBookModal(e);
    const menu = document.getElementById('mobileMenu');
    if (menu?.classList?.contains('open') && typeof toggleMobileMenu === 'function') {
      toggleMobileMenu();
    }
  };

  document.querySelectorAll('a[data-i18n="nav.cta"]:not([data-keep-calendly]), [data-open-service-book]').forEach((el) => {
    if (el.dataset.openServiceBookBound) return;
    el.dataset.openServiceBookBound = '1';
    if (el.tagName === 'A') {
      el.setAttribute('href', 'javascript:void(0)');
      el.setAttribute('role', 'button');
      el.removeAttribute('target');
    }
    el.addEventListener('click', handler);
  });
}

function openServiceBookModal(e) {
  if (e) e.preventDefault();
  ensureServiceBookModal();
  renderServiceBookModal(currentLang);
  lockBodyScroll();
  document.getElementById('serviceBookModal')?.classList.add('open');
}

function closeServiceBookModal() {
  document.getElementById('serviceBookModal')?.classList.remove('open');
  if (!isAnyModalOpen()) unlockBodyScroll();
}

function openQuoteModal(e) {
  if (e) e.preventDefault();
  lockBodyScroll();
  document.getElementById('quoteModal')?.classList.add('open');
}

function closeQuoteModal() {
  document.getElementById('quoteModal')?.classList.remove('open');
  document.getElementById('quote-payment-methods')?.removeAttribute('open');
  if (!isAnyModalOpen()) unlockBodyScroll();
}

function getContactPageUrl(lang) {
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  const base = /\/services\//.test(path) ? '../index.html#contact' : 'index.html#contact';
  const l = lang || currentLang || 'fr';
  return typeof withLangInHref === 'function' ? withLangInHref(base, l) : base;
}

function goToContactFromQuote() {
  closeQuoteModal();
  unlockBodyScroll();
  const contact = document.getElementById('contact');
  if (contact) {
    const headerOffset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')
    ) || 0;
    const top = contact.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    return;
  }
  window.location.href = getContactPageUrl();
}

function acceptAndBook() {
  const pageSlug = document.body.dataset?.serviceSlug || null;
  const slug = currentPolicyServiceKey || pageSlug;
  closePolicy();

  if (!slug) {
    openServiceBookModal();
    return;
  }

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const onSameServicePage =
    document.body.classList.contains('page-service') && pageSlug === slug;

  if (onSameServicePage) {
    if (typeof renderServiceBooking === 'function' && !document.getElementById('book-now')) {
      renderServiceBooking(lang);
    }
    if (typeof applyGeoPrices === 'function') {
      applyGeoPrices(lang, typeof i18n !== 'undefined' ? i18n : {});
    }
    if (typeof scrollToServiceBooking === 'function') {
      scrollToServiceBooking();
    } else {
      const el = document.getElementById('book-now');
      if (el) {
        const headerOffset =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')
          ) || 72;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }
    return;
  }

  window.location.href = getServiceBookPageUrl(slug, lang);
}

function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target !== overlay) return;
      if (overlay.id === 'policyModal') closePolicy();
      if (overlay.id === 'quoteModal') closeQuoteModal();
      if (overlay.id === 'serviceBookModal') closeServiceBookModal();
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('serviceBookModal')?.classList.contains('open')) closeServiceBookModal();
    else if (document.getElementById('quoteModal')?.classList.contains('open')) closeQuoteModal();
    else if (document.getElementById('policyModal')?.classList.contains('open')) closePolicy();
  });
}

// ── INIT ──
function syncNavbarScrolledState() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const solidNavPage = document.body.classList.contains('page-policy')
    || document.body.classList.contains('page-portfolio')
    || document.body.classList.contains('page-design')
    || document.body.classList.contains('page-about')
    || document.body.classList.contains('page-catalogue')
    || document.body.classList.contains('page-service')
    || document.body.classList.contains('page-sitemap');
  if (solidNavPage || window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}

function hardRefreshPage() {
  const url = new URL(window.location.href);
  url.searchParams.set('_', String(Date.now()));
  const target = `${url.pathname}${url.search}${url.hash}`;
  const reload = () => { window.location.assign(target); };
  if ('caches' in window) {
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .finally(reload)
      .catch(reload);
    return;
  }
  reload();
}

function isMobilePullRefreshDevice() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function shouldShowHeroLogoTip() {
  return window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)').matches;
}

function pullRefreshLabel(key) {
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  const dict = typeof i18n !== 'undefined' ? i18n[lang] : {};
  return dict[key] || key;
}

function isHeroLogoTouchTarget(target) {
  if (!target || typeof target.closest !== 'function') return false;
  return Boolean(
    target.closest('#heroLogoRefresh')
    || target.closest('.hero-logo-float-wrap')
  );
}

function bindPullToRefresh() {
  if (!isMobilePullRefreshDevice()) return;

  const THRESHOLD = 72;
  const MAX_PULL = 120;
  let startY = 0;
  let pulling = false;
  let pullDistance = 0;
  let indicator = null;

  const ensureIndicator = () => {
    if (indicator) return indicator;
    indicator = document.createElement('div');
    indicator.id = 'pullRefreshIndicator';
    indicator.className = 'pull-refresh-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    document.body.appendChild(indicator);
    return indicator;
  };

  const resetIndicator = () => {
    if (!indicator) return;
    indicator.style.transform = '';
    indicator.classList.remove('pull-refresh-indicator--ready');
    indicator.textContent = '';
  };

  const updateIndicator = () => {
    const el = ensureIndicator();
    el.style.transform = `translateY(${pullDistance}px)`;
    el.textContent = pullDistance >= THRESHOLD
      ? pullRefreshLabel('pullRefresh.release')
      : pullRefreshLabel('pullRefresh.pull');
    el.classList.toggle('pull-refresh-indicator--ready', pullDistance >= THRESHOLD);
  };

  document.addEventListener('touchstart', (event) => {
    if (window.scrollY > 2 || event.touches.length !== 1) return;
    if (isHeroLogoTouchTarget(event.target)) return;
    startY = event.touches[0].clientY;
    pulling = true;
    pullDistance = 0;
  }, { passive: true });

  document.addEventListener('touchmove', (event) => {
    if (!pulling) return;
    if (isHeroLogoTouchTarget(event.target)) {
      pulling = false;
      resetIndicator();
      return;
    }
    if (window.scrollY > 2) {
      pulling = false;
      resetIndicator();
      return;
    }
    const delta = event.touches[0].clientY - startY;
    if (delta <= 0) {
      pullDistance = 0;
      resetIndicator();
      return;
    }
    pullDistance = Math.min(MAX_PULL, delta * 0.45);
    updateIndicator();
    event.preventDefault();
  }, { passive: false });

  const onTouchEnd = () => {
    if (!pulling) return;
    pulling = false;
    if (pullDistance >= THRESHOLD) {
      hardRefreshPage();
      return;
    }
    resetIndicator();
  };

  document.addEventListener('touchend', onTouchEnd, { passive: true });
  document.addEventListener('touchcancel', onTouchEnd, { passive: true });
}

const HERO_LOGO_TIP_VISIBLE_MS = 1400;
const HERO_LOGO_TIP_PAUSE_MS = 5000;
let heroLogoTipBlinkTimer = null;

function clearHeroLogoTipBlink() {
  if (heroLogoTipBlinkTimer) {
    window.clearTimeout(heroLogoTipBlinkTimer);
    heroLogoTipBlinkTimer = null;
  }
}

function removeHeroLogoTipFromDom() {
  const tip = document.getElementById('heroLogoRefreshTip');
  if (!tip) return null;
  clearHeroLogoTipBlink();
  tip.remove();
  return null;
}

function startHeroLogoTipBlink(tip) {
  if (!tip || tip.dataset.blinkBound === '1') return;
  if (!shouldShowHeroLogoTip()) return;

  tip.dataset.blinkBound = '1';
  tip.hidden = false;
  tip.classList.remove('hero-logo-float__tip--show', 'hero-logo-float__tip--static');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tip.classList.add('hero-logo-float__tip--static');
    return;
  }

  const runCycle = () => {
    if (!shouldShowHeroLogoTip() || !document.getElementById('heroLogoRefreshTip')) {
      clearHeroLogoTipBlink();
      return;
    }
    tip.classList.add('hero-logo-float__tip--show');
    heroLogoTipBlinkTimer = window.setTimeout(() => {
      tip.classList.remove('hero-logo-float__tip--show');
      heroLogoTipBlinkTimer = window.setTimeout(runCycle, HERO_LOGO_TIP_PAUSE_MS);
    }, HERO_LOGO_TIP_VISIBLE_MS);
  };

  runCycle();
}

function syncHeroLogoRefreshCopy(lang) {
  const resolved = resolveLang(lang);
  const dict = i18n[resolved] || i18n.fr;
  let tip = document.getElementById('heroLogoRefreshTip');
  const btn = document.getElementById('heroLogoRefresh');
  const showTip = shouldShowHeroLogoTip();

  if (!showTip) {
    tip = removeHeroLogoTipFromDom();
  } else if (tip) {
    tip.hidden = false;
    if (dict['hero.logoRefresh.hint']) {
      tip.textContent = dict['hero.logoRefresh.hint'];
      tip.setAttribute('lang', resolved);
    }
  }

  if (btn) {
    if (showTip && tip) {
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-describedby', 'heroLogoRefreshTip');
    } else {
      btn.removeAttribute('aria-describedby');
      btn.removeAttribute('role');
      btn.removeAttribute('tabindex');
    }
    if (dict['hero.logoRefresh.aria']) {
      btn.setAttribute('aria-label', dict['hero.logoRefresh.aria']);
    }
  }
}

function bindHeroLogoRefresh() {
  const btn = document.getElementById('heroLogoRefresh');
  if (!btn || btn.dataset.refreshBound === '1') return;
  btn.dataset.refreshBound = '1';

  if (!shouldShowHeroLogoTip()) {
    removeHeroLogoTipFromDom();
  } else {
    const tip = document.getElementById('heroLogoRefreshTip');
    startHeroLogoTipBlink(tip);
  }
  syncHeroLogoRefreshCopy(typeof currentLang !== 'undefined' ? currentLang : 'fr');

  const tipMedia = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)');
  tipMedia.addEventListener('change', () => {
    if (!shouldShowHeroLogoTip()) {
      removeHeroLogoTipFromDom();
    } else {
      const tip = document.getElementById('heroLogoRefreshTip');
      if (tip && tip.dataset.blinkBound !== '1') startHeroLogoTipBlink(tip);
    }
    syncHeroLogoRefreshCopy(typeof currentLang !== 'undefined' ? currentLang : 'fr');
  });

  const runRefresh = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    hardRefreshPage();
  };

  btn.addEventListener('touchstart', (event) => {
    event.stopPropagation();
  }, { passive: true, capture: true });

  btn.addEventListener('touchend', (event) => {
    event.preventDefault();
    event.stopPropagation();
    runRefresh(event);
  }, { passive: false });

  btn.addEventListener('click', (event) => {
    if (isMobilePullRefreshDevice()) return;
    runRefresh(event);
  });

  btn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') runRefresh(event);
  });
}

async function waitForSupabaseConfig(maxAttempts = 40) {
  if (window.LINGUAPHIX_CONFIG_READY_PROMISE) {
    try {
      await window.LINGUAPHIX_CONFIG_READY_PROMISE;
    } catch (err) {
      console.warn('[LINGUAPHIX] config ready promise failed:', err);
    }
  }
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (isSupabaseConfigured()) return true;
    if (window.LINGUAPHIX_CONFIG_READY_PROMISE && attempt === 5) {
      try { await window.LINGUAPHIX_CONFIG_READY_PROMISE; } catch (err) { /* retry */ }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return isSupabaseConfigured();
}

async function fetchApprovedTestimonials(url, key, attempts = 3) {
  let lastError = null;
  const query = 'select=*&approved=is.true&order=created_at.desc&limit=12';
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const res = await fetch(
        `${url}/rest/v1/testimonials?${query}`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            Accept: 'application/json',
            'Cache-Control': 'no-cache, no-store',
            Pragma: 'no-cache',
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      }
      const detail = await res.text().catch(() => '');
      lastError = new Error(`testimonials fetch failed: ${res.status}${detail ? ` ${detail}` : ''}`);
    } catch (err) {
      lastError = err;
    }
    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  throw lastError || new Error('testimonials fetch failed');
}

function hardenExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
    const parts = new Set((anchor.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    parts.add('noopener');
    parts.add('noreferrer');
    anchor.setAttribute('rel', [...parts].join(' '));
  });
}

window.addEventListener('DOMContentLoaded', () => {
  hardenExternalLinks();
  ensureServiceBookModal();
  bindNavBookCtas();
  bindHeroLogoRefresh();
  bindPullToRefresh();
  const detectedLang = detectLang();
  if (typeof setStoredLang === 'function') setStoredLang(detectedLang);
  if (typeof initUrlLangSync === 'function') initUrlLangSync();
  applyLang(detectedLang);
  syncNavbarScrolledState();
  updateSiteHeaderHeight();
  requestAnimationFrame(updateSiteHeaderHeight);
  const nav = document.getElementById('navbar');
  if (nav && document.getElementById('site-header')) {
    const obs = new ResizeObserver(updateSiteHeaderHeight);
    obs.observe(nav);
    obs.observe(document.getElementById('site-header'));
  }
  const servicesTab = document.querySelector('.services-filter-bar .stab.active');
  if (servicesTab) switchAudience('all', servicesTab);
  initHashScroll();
  if (document.getElementById('testimonialsGrid')) loadTestimonials();
  initModals();
  applySitePhones();
});

let testimonialsLoadPromise = null;

async function loadTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;

  if (testimonialsLoadPromise) return testimonialsLoadPromise;

  testimonialsLoadPromise = (async () => {
    const empty = document.getElementById('testimonialsEmpty');
    grid.dataset.loading = 'true';
    if (empty) empty.hidden = true;

    try {
      const ready = isSupabaseConfigured() || await waitForSupabaseConfig();
      if (!ready) {
        console.warn('[LINGUAPHIX] Supabase config not ready for testimonials.');
        showTestimonialsEmpty();
        return;
      }

      const { url, key } = getSupabaseConfig();
      const data = await fetchApprovedTestimonials(url, key);
      if (!data.length) {
        showTestimonialsEmpty();
        return;
      }
      renderTestimonials(data);
    } catch (e) {
      console.warn('[LINGUAPHIX] testimonials load error:', e);
      showTestimonialsEmpty();
    } finally {
      grid.removeAttribute('data-loading');
      if (!grid.children.length) showTestimonialsEmpty();
      else if (empty) empty.hidden = true;
      testimonialsLoadPromise = null;
    }
  })();

  return testimonialsLoadPromise;
}

window.addEventListener('load', () => {
  if (document.getElementById('testimonialsGrid')) loadTestimonials();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  const grid = document.getElementById('testimonialsGrid');
  if (!grid || grid.children.length > 0) return;
  loadTestimonials();
});

window.addEventListener('hashchange', () => {
  if (window.location.hash !== '#testimonials') return;
  const grid = document.getElementById('testimonialsGrid');
  if (!grid || grid.children.length > 0) return;
  loadTestimonials();
});