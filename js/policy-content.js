/**
 * Service-specific policies for booking modals and inline Book now sections.
 */
(function () {
  const EXAM_PREP_ITEMS = [
    'booking',
    'cancellation',
    'noshow',
    'payment',
    'refund',
    'online',
    'online_platform',
    'exam',
    'recording',
    'confidentiality'
  ];

  const COURS_POLICY_ITEMS = [
    'monthly_confirm',
    'scheduling_48h',
    'cancellation',
    'monthly_packages',
    'payment',
    'online_platform',
    'inperson_location',
    'recording',
    'materials',
    'confidentiality'
  ];

  const SOUTIEN_POLICY_ITEMS = [
    'booking',
    'cancellation',
    'noshow',
    'payment',
    'refund',
    'online',
    'online_platform',
    'recording',
    'materials',
    'confidentiality'
  ];

  const INTERVIEW_POLICY_ITEMS = [
    'booking',
    'cancellation',
    'noshow',
    'payment',
    'refund',
    'online',
    'online_platform',
    'interview_prep',
    'recording',
    'confidentiality'
  ];

  const TRADUCTION_POLICY_ITEMS = [
    'booking',
    'translation',
    'traduction_delivery',
    'payment',
    'confidentiality',
    'cancellation',
    'refund'
  ];

  const FORMATION_POLICY_ITEMS = [
    'booking',
    'corporate_training',
    'payment',
    'cancellation',
    'confidentiality',
    'refund'
  ];

  const DESIGN_POLICY_ITEMS = [
    'quote',
    'deposit',
    'brief',
    'revisions',
    'timelines',
    'ownership',
    'portfolio',
    'licenses',
    'cancellation',
    'prohibited'
  ];

  const LIVESTREAM_POLICY_ITEMS = [...DESIGN_POLICY_ITEMS, 'livestream_tech'];

  const MATERIEL_POLICY_ITEMS = [
    'quote',
    'deposit',
    'equipment_rental',
    'timelines',
    'payment',
    'cancellation',
    'ownership'
  ];

  /** Maps service slug → policy category + clause ids shown for that service */
  const POLICY_SCOPES = {
    cours: { type: 'langues', items: COURS_POLICY_ITEMS },
    tcf: { type: 'langues', items: EXAM_PREP_ITEMS },
    ielts: { type: 'langues', items: EXAM_PREP_ITEMS },
    toeic: { type: 'langues', items: EXAM_PREP_ITEMS },
    interview: { type: 'langues', items: INTERVIEW_POLICY_ITEMS },
    soutien: { type: 'langues', items: SOUTIEN_POLICY_ITEMS },
    traduction: { type: 'langues', items: TRADUCTION_POLICY_ITEMS },
    formation: { type: 'langues', items: FORMATION_POLICY_ITEMS },
    logo: { type: 'design', items: DESIGN_POLICY_ITEMS },
    montage: { type: 'design', items: [...DESIGN_POLICY_ITEMS, 'rush'] },
    graphic: { type: 'design', items: DESIGN_POLICY_ITEMS },
    livestream: { type: 'design', items: LIVESTREAM_POLICY_ITEMS },
    materiel: { type: 'design', items: MATERIEL_POLICY_ITEMS }
  };

  const SERVICE_POLICIES = {
    langues: {
      fr: {
        title: 'Politique des services linguistiques',
        intro:
          'S\'applique aux cours, préparations aux examens, traductions et accompagnements linguistiques.',
        items: [
          {
            id: 'monthly_confirm',
            label: 'Confirmation',
            text: 'Une réservation de forfait mensuel est confirmée uniquement après réception du premier paiement mensuel.'
          },
          {
            id: 'scheduling_48h',
            label: 'Planification',
            text: 'Les séances sont planifiées d\'un commun accord dans les 48 h suivant la confirmation du forfait.'
          },
          {
            id: 'monthly_packages',
            label: 'Forfaits mensuels',
            text: 'Les forfaits mensuels ne sont ni transférables ni remboursables une fois les séances commencées.'
          },
          {
            id: 'online_platform',
            label: 'Séances en ligne',
            text: 'Les séances en ligne ont lieu via {platform}.'
          },
          {
            id: 'inperson_location',
            label: 'Séances en présentiel',
            text: 'Les séances en présentiel ont lieu à {address}.'
          },
          {
            id: 'booking',
            label: 'Réservation',
            text: 'Toute prestation est confirmée par email ou message écrit (date, durée, tarif). Sans confirmation, la séance n\'est pas garantie.'
          },
          {
            id: 'cancellation',
            label: 'Annulation',
            text: 'Toute séance annulée moins de 24 h à l\'avance est facturée à 50 % du tarif convenu.'
          },
          {
            id: 'noshow',
            label: 'Absence & retard',
            text: 'En cas d\'absence non signalée, la séance est due intégralement. Un retard de plus de 15 minutes peut entraîner une réduction de durée sans remboursement.'
          },
          {
            id: 'payment',
            label: 'Paiement',
            text: 'Le paiement est exigible avant ou lors de la première séance, sauf accord écrit préalable. Modes acceptés : Mixx by Yas au +228 92 53 99 53 (même numéro que WhatsApp) ; virement Orabank (coordonnées transmises avec le devis).'
          },
          {
            id: 'refund',
            label: 'Remboursement',
            text: 'Aucun remboursement après le début d\'une formation ou d\'un forfait, sauf circonstance exceptionnelle dûment justifiée et acceptée par écrit.'
          },
          {
            id: 'online',
            label: 'Séances en ligne',
            text: 'Le client doit disposer d\'une connexion stable et d\'un environnement adapté. Les difficultés techniques côté client ne donnent pas droit à un report gratuit.'
          },
          {
            id: 'recording',
            label: 'Enregistrement',
            text: 'L\'enregistrement audio ou vidéo des séances est interdit sans accord écrit préalable des deux parties.'
          },
          {
            id: 'materials',
            label: 'Matériel pédagogique',
            text: 'Exercices, corrections et fichiers fournis sont strictement à usage personnel — reproduction ou diffusion interdites sans autorisation.'
          },
          {
            id: 'translation',
            label: 'Traduction & relecture',
            text: 'Le client garantit l\'exactitude des textes sources. Le devis précise le volume, le délai, le format de livraison et le niveau de certification le cas échéant.'
          },
          {
            id: 'traduction_delivery',
            label: 'Livraison',
            text: 'Les fichiers traduits ou relus sont livrés par email ou lien sécurisé aux dates convenues. Toute modification du périmètre après validation du devis peut entraîner un ajustement tarifaire.'
          },
          {
            id: 'exam',
            label: 'Résultats aux examens',
            text: 'LINGUAPHIX fournit un enseignement professionnel ; les résultats officiels dépendent de l\'implication et du travail personnel de l\'apprenant — aucune garantie de score.'
          },
          {
            id: 'interview_prep',
            label: 'Préparation entretien',
            text: 'Les séances ciblent la prise de parole, la structure des réponses et la confiance — sans garantie d\'embauche ou d\'admission. Le contenu s\'adapte au poste ou au programme visé.'
          },
          {
            id: 'corporate_training',
            label: 'Formation en entreprise',
            text: 'Le programme, le nombre de participants et les modalités (présentiel, en ligne ou mixte) sont définis par devis. Toute session supplémentaire ou module hors périmètre est facturée séparément.'
          },
          {
            id: 'confidentiality',
            label: 'Confidentialité',
            text: 'Documents, copies et échanges restent confidentiels et ne sont pas partagés avec des tiers.'
          }
        ]
      },
      en: {
        title: 'Language Services Policy',
        intro:
          'Applies to courses, exam preparation, translation, and language coaching.',
        items: [
          {
            id: 'monthly_confirm',
            label: 'Confirmation',
            text: 'A monthly package booking is confirmed only after receipt of the first monthly payment.'
          },
          {
            id: 'scheduling_48h',
            label: 'Scheduling',
            text: 'Sessions are scheduled by mutual agreement within 48 hours of package confirmation.'
          },
          {
            id: 'monthly_packages',
            label: 'Monthly packages',
            text: 'Monthly packages are non-transferable and non-refundable once sessions have started.'
          },
          {
            id: 'online_platform',
            label: 'Online sessions',
            text: 'Online sessions are conducted via {platform}.'
          },
          {
            id: 'inperson_location',
            label: 'In-person sessions',
            text: 'In-person sessions take place at {address}.'
          },
          {
            id: 'booking',
            label: 'Booking',
            text: 'Every session is confirmed in writing (email or message) with date, duration, and rate. Without confirmation, the slot is not guaranteed.'
          },
          {
            id: 'cancellation',
            label: 'Cancellation',
            text: 'Any session canceled less than 24 hours in advance is billed at 50% of the agreed rate.'
          },
          {
            id: 'noshow',
            label: 'No-show & lateness',
            text: 'Unannounced absences are charged in full. Arrivals more than 15 minutes late may shorten the session without a refund.'
          },
          {
            id: 'payment',
            label: 'Payment',
            text: 'Payment is due before or at the first session unless a prior written arrangement is made. Accepted methods: Mixx by Yas at +228 92 53 99 53 (same number as WhatsApp); Orabank transfer (details sent with your quote).'
          },
          {
            id: 'refund',
            label: 'Refunds',
            text: 'No refunds after a course or package has started, except in exceptional circumstances accepted in writing.'
          },
          {
            id: 'online',
            label: 'Online sessions',
            text: 'The client must have a stable connection and a suitable environment. Client-side technical issues do not entitle a free reschedule.'
          },
          {
            id: 'recording',
            label: 'Recording',
            text: 'Audio or video recording of sessions is prohibited without prior written consent from both parties.'
          },
          {
            id: 'materials',
            label: 'Learning materials',
            text: 'Exercises, corrections, and files provided are for personal use only — reproduction or sharing requires written permission.'
          },
          {
            id: 'translation',
            label: 'Translation & proofreading',
            text: 'The client warrants the accuracy of source texts. The quote states volume, deadline, delivery format, and certification level if applicable.'
          },
          {
            id: 'traduction_delivery',
            label: 'Delivery',
            text: 'Translated or proofread files are delivered by email or secure link on agreed dates. Scope changes after quote approval may incur additional fees.'
          },
          {
            id: 'exam',
            label: 'Exam results',
            text: 'LINGUAPHIX provides professional instruction; official outcomes depend on the learner\'s commitment — no score guarantee.'
          },
          {
            id: 'interview_prep',
            label: 'Interview preparation',
            text: 'Sessions focus on speaking, answer structure, and confidence — with no guarantee of hiring or admission. Content is tailored to the role or program targeted.'
          },
          {
            id: 'corporate_training',
            label: 'Corporate training',
            text: 'Program, headcount, and format (in-person, online, or blended) are defined in the quote. Extra sessions or modules outside scope are billed separately.'
          },
          {
            id: 'confidentiality',
            label: 'Confidentiality',
            text: 'Documents, drafts, and correspondence remain confidential and are not shared with third parties.'
          }
        ]
      }
    },
    design: {
      fr: {
        title: 'Politique des services design & audiovisuel',
        intro:
          'S\'applique à la création graphique, identité visuelle, montage vidéo et live streaming.',
        items: [
          {
            id: 'quote',
            label: 'Devis & périmètre',
            text: 'Chaque projet fait l\'objet d\'un devis précisant livrables, formats, nombre de révisions et délai estimatif. Toute demande hors périmètre est facturée séparément.'
          },
          {
            id: 'deposit',
            label: 'Acompte',
            text: 'Un acompte de 50 % est exigible avant le démarrage. Le solde est dû à la livraison des fichiers finaux.'
          },
          {
            id: 'brief',
            label: 'Brief & contenus client',
            text: 'Le client fournit textes, logos, images et validations dans les délais convenus. Les retards client peuvent repousser la livraison.'
          },
          {
            id: 'revisions',
            label: 'Révisions',
            text: 'Deux (2) cycles de révisions mineures sont inclus par prestation. Les révisions supplémentaires ou refontes majeures sont facturées au tarif en vigueur.'
          },
          {
            id: 'timelines',
            label: 'Délais',
            text: 'Les délais annoncés sont indicatifs et dépendent de la complexité du projet et de la réactivité du client (retours sous 5 jours ouvrés recommandés).'
          },
          {
            id: 'ownership',
            label: 'Propriété des fichiers',
            text: 'Les livrables finaux et sources appartiennent au client après paiement intégral. LINGUAPHIX peut conserver une copie de travail archivée.'
          },
          {
            id: 'portfolio',
            label: 'Portfolio & crédits',
            text: 'Sauf demande écrite contraire, LINGUAPHIX peut présenter le projet (aperçu, avant/après) dans son portfolio et ses réseaux professionnels.'
          },
          {
            id: 'licenses',
            label: 'Licences tierces',
            text: 'Polices, musiques, images stock ou plugins sous licence restent soumis à leurs conditions ; le client est informé des limitations d\'usage.'
          },
          {
            id: 'cancellation',
            label: 'Annulation',
            text: 'En cas d\'annulation après démarrage, l\'acompte reste acquis ; le travail déjà réalisé peut être facturé au prorata.'
          },
          {
            id: 'rush',
            label: 'Urgence',
            text: 'Les demandes express (délai inférieur au standard) peuvent entraîner un supplément de 25 à 50 %, indiqué sur le devis.'
          },
          {
            id: 'prohibited',
            label: 'Contenu interdit',
            text: 'LINGUAPHIX se réserve le droit de refuser tout projet illégal, diffamatoire, discriminatoire ou contraire à l\'éthique professionnelle.'
          },
          {
            id: 'livestream_tech',
            label: 'Live streaming',
            text: 'La prestation couvre la configuration technique et l\'assistance le jour J selon le devis. Le client fournit l\'accès aux plateformes, le matériel sur site et une connexion adaptée.'
          },
          {
            id: 'equipment_rental',
            label: 'Matériel',
            text: 'Location ou mise à disposition du matériel selon devis. Le client est responsable du lieu, de l\'accès et de la sécurité du matériel sur site ; toute casse due à une mauvaise utilisation peut être facturée.'
          },
          {
            id: 'payment',
            label: 'Paiement',
            text: 'Acompte et solde selon devis. Modes acceptés : Mixx by Yas au +228 92 53 99 53 ; virement Orabank (coordonnées avec le devis).'
          }
        ]
      },
      en: {
        title: 'Design & Audiovisual Services Policy',
        intro:
          'Applies to graphic design, visual identity, video editing, and live streaming.',
        items: [
          {
            id: 'quote',
            label: 'Quote & scope',
            text: 'Each project includes a quote listing deliverables, formats, revision rounds, and estimated timeline. Out-of-scope requests are billed separately.'
          },
          {
            id: 'deposit',
            label: 'Deposit',
            text: 'A 50% deposit is required before work begins. The balance is due upon delivery of final files.'
          },
          {
            id: 'brief',
            label: 'Brief & client assets',
            text: 'The client supplies copy, logos, images, and approvals on agreed dates. Client delays may push delivery.'
          },
          {
            id: 'revisions',
            label: 'Revisions',
            text: 'Two (2) rounds of minor revisions are included per project. Extra rounds or major redesigns are billed at the current rate.'
          },
          {
            id: 'timelines',
            label: 'Timelines',
            text: 'Stated deadlines are estimates and depend on project complexity and client responsiveness (feedback within 5 business days recommended).'
          },
          {
            id: 'ownership',
            label: 'File ownership',
            text: 'Final deliverables and source files belong to the client after full payment. LINGUAPHIX may keep an archived working copy.'
          },
          {
            id: 'portfolio',
            label: 'Portfolio & credits',
            text: 'Unless the client objects in writing, LINGUAPHIX may showcase the project (preview, before/after) in its portfolio and professional channels.'
          },
          {
            id: 'licenses',
            label: 'Third-party licenses',
            text: 'Fonts, music, stock assets, or licensed plugins remain subject to their terms; the client is informed of usage limits.'
          },
          {
            id: 'cancellation',
            label: 'Cancellation',
            text: 'If canceled after work has started, the deposit is non-refundable; work completed may be invoiced pro rata.'
          },
          {
            id: 'rush',
            label: 'Rush work',
            text: 'Express requests (shorter than standard turnaround) may incur a 25–50% surcharge, stated on the quote.'
          },
          {
            id: 'prohibited',
            label: 'Prohibited content',
            text: 'LINGUAPHIX may refuse any project that is illegal, defamatory, discriminatory, or contrary to professional ethics.'
          },
          {
            id: 'livestream_tech',
            label: 'Live streaming',
            text: 'The service covers technical setup and day-of support as stated in the quote. The client provides platform access, on-site equipment, and a suitable connection.'
          },
          {
            id: 'equipment_rental',
            label: 'Equipment',
            text: 'Rental or provision of equipment per quote. The client is responsible for the venue, access, and on-site safety; damage from misuse may be billed.'
          },
          {
            id: 'payment',
            label: 'Payment',
            text: 'Deposit and balance per quote. Accepted methods: Mixx by Yas at +228 92 53 99 53; Orabank transfer (details sent with the quote).'
          }
        ]
      }
    }
  };

  const SCOPED_INTRO = {
    fr: (name) =>
      `Les conditions ci-dessous s'appliquent uniquement à la prestation suivante : <strong>${name}</strong>.`,
    en: (name) =>
      `The following terms apply only to this service: <strong>${name}</strong>.`
  };

  const BOOKING_TITLE = {
    fr: 'Politique de réservation & paiement',
    en: 'Booking & Payment Policy'
  };

  const ACCEPT_SUBMIT = {
    fr: 'En validant le formulaire ou en cliquant sur « Accepter & réserver », vous confirmez avoir lu et accepté ces conditions.',
    en: 'By submitting the form or clicking "Accept & Book", you confirm you have read and accepted these terms.'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getPolicyPageUrl(anchor, lang) {
    const path = (window.location.pathname || '').replace(/\\/g, '/');
    const prefix = /\/services\//.test(path) ? '../' : '';
    let base = `${prefix}policy.html`;
    if (anchor) base += `#${anchor}`;
    const l = lang || (typeof currentLang !== 'undefined' ? currentLang : 'fr');
    return typeof withLangInHref === 'function' ? withLangInHref(base, l) : base;
  }

  function getConfig() {
    return window.LINGUAPHIX_CONFIG || {};
  }

  function applyPlaceholders(text) {
    const cfg = getConfig();
    const platform = cfg.onlinePlatform || 'Zoom / Google Meet (TBD)';
    const address = cfg.inPersonAddress || 'Lomé, Togo (address TBD)';
    return String(text)
      .replace(/\{platform\}/g, platform)
      .replace(/\{address\}/g, address);
  }

  const PACKAGE_SCOPED_INTRO = {
    fr: (name) =>
      `Les conditions ci-dessous s'appliquent au forfait sélectionné : <strong>${name}</strong>.`,
    en: (name) =>
      `The following terms apply to your selected package: <strong>${name}</strong>.`
  };

  function getPackagePolicyScopes() {
    return window.PACKAGE_POLICY_SCOPES || {};
  }

  function applyModePolicyAddons(itemIds, serviceKey, packageId, mode) {
    if (!mode || !itemIds?.length) return itemIds;
    const modeServices = window.LANGUES_MODE_PACKAGE_SERVICES;
    const addons = window.MODE_POLICY_ADDONS;
    if (!modeServices?.has(serviceKey) || !addons?.[mode]) return itemIds;

    const list = [...itemIds];
    const toAdd = mode === 'online' ? addons.online : addons.inperson;
    toAdd.forEach((id) => {
      if (!list.includes(id)) list.push(id);
    });
    if (mode === 'online') {
      return list.filter((id) => id !== 'inperson_location');
    }
    if (mode === 'inperson') {
      return list.filter((id) => id !== 'online_platform');
    }
    return list;
  }

  function resolveScope(type, serviceKey, packageId, mode) {
    const serviceScope = serviceKey && POLICY_SCOPES[serviceKey];
    let policyType = serviceScope?.type || type;
    let items = null;

    const pkgMap = serviceKey && getPackagePolicyScopes()[serviceKey];
    if (packageId && pkgMap && pkgMap[packageId]) {
      items = [...pkgMap[packageId]];
    } else if (serviceScope) {
      items = serviceScope.items ? [...serviceScope.items] : null;
    }

    if (items && mode) {
      items = applyModePolicyAddons(items, serviceKey, packageId, mode);
    }

    return { type: policyType, items };
  }

  function getPolicyData(type, lang, serviceKey, packageId, mode) {
    const scope = resolveScope(type, serviceKey, packageId, mode);
    const policyType = scope.type || type;
    const section = SERVICE_POLICIES[policyType];
    if (!section) return null;

    const locale = lang === 'en' ? 'en' : 'fr';
    const data = section[locale];
    if (!data) return null;

    const items = filterItems(data.items, scope.items).map((item) => ({
      ...item,
      text: applyPlaceholders(item.text)
    }));

    return { scope, policyType, locale, data, items };
  }

  function filterItems(items, itemIds) {
    if (!itemIds || !itemIds.length) return items;
    const allowed = new Set(itemIds);
    return items.filter((item) => allowed.has(item.id));
  }

  function renderListItems(items, withLabels) {
    return items
      .map((item) => {
        const text = escapeHtml(item.text);
        if (withLabels) {
          return `<li><strong>${escapeHtml(item.label)} :</strong> ${text}</li>`;
        }
        return `<li>${text}</li>`;
      })
      .join('');
  }

  window.getBookingPolicyTitle = function getBookingPolicyTitle(
    type,
    lang,
    serviceKey,
    serviceLabel,
    packageName
  ) {
    const locale = lang === 'en' ? 'en' : 'fr';
    const base = BOOKING_TITLE[locale];
    if (packageName) return `${base} — ${packageName}`;
    if (serviceLabel) return `${base} — ${serviceLabel}`;
    return base;
  };

  window.getBookingPolicyPackageIntroHtml = function getBookingPolicyPackageIntroHtml(
    lang,
    packageName
  ) {
    if (!packageName) return '';
    const locale = lang === 'en' ? 'en' : 'fr';
    return `<p class="booking-policy-package-intro">${PACKAGE_SCOPED_INTRO[locale](escapeHtml(packageName))}</p>`;
  };

  window.getBookingPolicyListHtml = function getBookingPolicyListHtml(
    type,
    lang,
    serviceKey,
    packageId,
    mode
  ) {
    const built = getPolicyData(type, lang, serviceKey, packageId, mode);
    if (!built || !built.items.length) return '';

    const locale = built.locale;
    const itemsHtml = renderListItems(built.items, true);
    const footnote = `<li class="booking-policy-list__accept">${escapeHtml(ACCEPT_SUBMIT[locale])}</li>`;
    return itemsHtml + footnote;
  };

  window.getBookingPolicyPlaceholderHtml = function getBookingPolicyPlaceholderHtml(lang) {
    const locale = lang === 'en' ? 'en' : 'fr';
    const msg =
      (typeof i18n !== 'undefined' && i18n[locale]?.['book.policy.selectPackage']) ||
      (locale === 'en'
        ? 'Select a package above to view the booking and payment terms that apply to it.'
        : 'Sélectionnez un forfait ci-dessus pour afficher les conditions de réservation et de paiement qui s\'appliquent.');
    return `<li class="booking-policy-list__placeholder">${escapeHtml(msg)}</li>`;
  };

  window.getServicePolicyHtml = function getServicePolicyHtml(
    type,
    lang,
    serviceKey,
    serviceLabel,
    packageId,
    packageName,
    mode
  ) {
    const built = getPolicyData(type, lang, serviceKey, packageId, mode);
    if (!built) return '';

    const { policyType, locale, data, items } = built;
    const listHtml = renderListItems(items, true);

    const anchor = policyType === 'design' ? 'policy-design' : 'policy-langues';
    const linkLabel =
      locale === 'fr' ? 'Politique complète (toutes prestations) →' : 'Full policy (all services) →';

    let introHtml = `<p class="policy-modal-intro">${escapeHtml(data.intro)}</p>`;
    if (packageName) {
      introHtml = `<p class="policy-modal-intro policy-modal-intro--scoped">${PACKAGE_SCOPED_INTRO[locale](escapeHtml(packageName))}</p>`;
    } else if (serviceLabel) {
      introHtml = `<p class="policy-modal-intro policy-modal-intro--scoped">${SCOPED_INTRO[locale](escapeHtml(serviceLabel))}</p>`;
    }

    const sectionTitle = packageName || serviceLabel ? '' : `<h4>${escapeHtml(data.title)}</h4>`;

    return (
      sectionTitle +
      introHtml +
      `<ul class="policy-modal-list">${listHtml}</ul>` +
      `<p class="policy-modal-more"><a href="${getPolicyPageUrl(anchor, locale)}">${linkLabel}</a></p>`
    );
  };

  window.getServicePolicyModalTitle = function getServicePolicyModalTitle(
    type,
    lang,
    serviceKey,
    serviceLabel,
    packageName
  ) {
    return getBookingPolicyTitle(type, lang, serviceKey, serviceLabel, packageName);
  };
})();
