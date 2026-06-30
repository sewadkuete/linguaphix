/**
 * Per-service detail page content (FR / EN).
 * Consumed by service-page.js as window.SERVICE_PAGES.
 *
 * Parent cards (index.html, design.html) read prices from the featured
 * package here. Optional override per service:
 *   homeCard: { priceXof: 35000, unit: 'month' } | { quote: true }
 */
window.SERVICE_PAGES = {
  tcf: {
    category: 'langues',
    icon: '📝',
    policyKey: 'tcf',
    fr: {
      badge: 'Examen officiel',
      title: 'Préparation au TCF',
      seoTitle: 'Préparation au TCF en ligne | Lomé — LINGUAPHIX',
      intro: 'Préparation intensive au Test de Connaissance du Français avec un examinateur certifié. Compréhension orale et écrite, expression écrite et orale — en ligne ou en présentiel.',
      metaDescription: 'Préparation au TCF en ligne et à Lomé avec examinateur certifié. Cours TCF, simulations CO CE EE EO. Réservez LINGUAPHIX.',
      packages: [
        {
          name: 'Session diagnostic',
          desc: 'Évaluation de niveau et plan d\'action personnalisé sur une séance.',
          priceXof: 10000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Test blanc ciblé', 'Analyse des points faibles', 'Feuille de route TCF']
        },
        {
          name: 'Bilan pré-examen',
          desc: 'Simulation complète en conditions réelles et coaching de dernière ligne.',
          priceXof: 15000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Simulation intégrale', 'Feedback oral et écrit', 'Stratégies gestion du temps']
        },
        {
          name: 'Pack intensif',
          desc: '5-6 séances structurées pour un total de 10 h afin d\'atteindre votre score cible avant le jour de l\'examen.',
          priceXof: 50000,
          unit: 'month',
          featured: true,
          features: ['90-120 min par séance', 'Programme CO / CE / EE / EO', 'Simulations chronométrées', 'Suivi WhatsApp entre séances', 'Conseils jour J']
        }
      ],
      modalities: [
        'Cours en ligne (visio) ou en présentiel à Lomé',
        'Séances de 90 à 120 minutes',
        'Horaires flexibles, y compris soir et week-end',
        'Supports officiels et annales TCF',
        'Suivi de progression après chaque séance'
      ],
      process: [
        'Prise de contact et définition de votre objectif de score',
        'Diagnostic initial et calendrier de préparation',
        'Séances ciblées par composante avec exercices types',
        'Simulations et corrections personnalisées',
        'Préparation mentale et logistique pour le jour de l\'examen'
      ],
      delivery: { show: false },
      faq: [
        { q: 'Quelle durée pour être prêt au TCF ?', a: 'En général 4 à 12 semaines selon votre niveau de départ et la fréquence des séances. Un plan précis est établi dès le diagnostic.' },
        { q: 'Proposez-vous des cours en ligne ?', a: 'Oui, toutes les composantes peuvent être préparées en visio avec les mêmes supports qu\'en présentiel.' },
        { q: 'Êtes-vous examinateur officiel ?', a: 'Oui, la préparation est assurée par un examinateur TCF certifié à l\'IFT, habitué aux critères d\'évaluation officiels.' },
        { q: 'Comment réserver ma première séance ?', a: 'Réservez un appel découverte sur Calendly ou contactez-nous par WhatsApp ; nous fixons ensuite vos créneaux.' }
      ]
    },
    en: {
      badge: 'Official exam',
      title: 'TCF Preparation',
      seoTitle: 'TCF preparation online | Lomé — LINGUAPHIX',
      intro: 'Intensive Test de Connaissance du Français preparation with a certified examiner. Listening, reading, written and oral expression — online or in person.',
      metaDescription: 'TCF preparation online and in Lomé with a certified examiner. TCF coaching, CO CE EE EO mock exams. Book LINGUAPHIX.',
      packages: [
        {
          name: 'Diagnostic session',
          desc: 'Level assessment and a personalized action plan in one session.',
          priceXof: 10000,
          unit: 'session',
          features: ['90-120 min session', 'Targeted mock test', 'Weakness analysis', 'TCF roadmap']
        },
        {
          name: 'Pre-exam review',
          desc: 'Full simulation under real conditions plus last-mile coaching.',
          priceXof: 15000,
          unit: 'session',
          features: ['90-120 min session', 'Full mock exam', 'Oral and written feedback', 'Time-management strategies']
        },
        {
          name: 'Intensive pack',
          desc: '5-6 structured sessions for a total of 10 hours to reach your target score before exam day.',
          priceXof: 50000,
          unit: 'month',
          featured: true,
          features: ['90-120 min per session', 'CO / CE / EE / EO program', 'Timed mock exams', 'WhatsApp support between sessions', 'Exam-day tips']
        }
      ],
      modalities: [
        'Online (video) or in-person lessons in Lomé',
        '90-120 minute sessions',
        'Flexible scheduling, including evenings and weekends',
        'Official TCF materials and past papers',
        'Progress review after every session'
      ],
      process: [
        'Initial contact and target score definition',
        'Baseline assessment and preparation calendar',
        'Component-focused sessions with exam-style exercises',
        'Mock exams and personalized feedback',
        'Mental and logistical prep for exam day'
      ],
      delivery: { show: false },
      faq: [
        { q: 'How long does TCF preparation take?', a: 'Typically 4–12 weeks depending on your starting level and session frequency. A clear plan is set at the diagnostic stage.' },
        { q: 'Do you offer online classes?', a: 'Yes. All components can be prepared via video call with the same materials as in-person sessions.' },
        { q: 'Are you an official examiner?', a: 'Yes. Preparation is led by a certified TCF examiner at IFT, familiar with official scoring criteria.' },
        { q: 'How do I book my first session?', a: 'Book a discovery call on Calendly or reach us on WhatsApp; we then schedule your slots.' }
      ]
    }
  },

  ielts: {
    category: 'langues',
    icon: '🎯',
    policyKey: 'ielts',
    fr: {
      badge: 'Tests internationaux',
      title: 'IELTS / TOEFL / Cambridge',
      seoTitle: 'Préparation IELTS & TOEFL en ligne | Lomé — LINGUAPHIX',
      intro: 'Préparation complète aux tests d\'anglais internationaux. Academic et General Training, stratégies par bande score et coaching oral personnalisé.',
      metaDescription: 'Préparation IELTS, TOEFL et Cambridge en ligne et à Lomé. Coaching score cible, simulations, Speaking & Writing. LINGUAPHIX.',
      packages: [
        {
          name: 'Session stratégie',
          desc: 'Analyse de votre profil et méthode adaptée à IELTS, TOEFL ou Cambridge.',
          priceXof: 10000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Diagnostic rapide', 'Choix du test adapté', 'Plan par compétence']
        },
        {
          name: 'Simulation complète',
          desc: 'Test blanc intégral avec debrief et priorités avant la date officielle.',
          priceXof: 15000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Mock test chronométré', 'Grille d\'évaluation IELTS', 'Plan de révision 7 jours']
        },
        {
          name: 'Coaching band score',
          desc: '5-6 séances structurées pour un total de 10 h afin d\'atteindre votre score cible avant le jour de l\'examen.',
          priceXof: 50000,
          unit: 'month',
          featured: true,
          features: ['90-120 min par séance', 'Objectif band score défini', 'Correction Writing détaillée', 'Simulations Speaking', 'Suivi hebdomadaire']
        }
      ],
      modalities: [
        'En ligne ou en présentiel',
        'Séances de 90 à 120 minutes',
        'IELTS Academic, General, TOEFL iBT, Cambridge B2/C1',
        'Séances individuelles (groupes sur devis)',
        'Enregistrements Speaking pour auto-évaluation',
        'Flexibilité fuseaux horaires pour l\'international'
      ],
      process: [
        'Définition du test et du score visé',
        'Évaluation diagnostique par skill',
        'Entraînement ciblé et correction des erreurs récurrentes',
        'Simulations complètes et ajustement du plan',
        'Préparation logistique (identité, timing, format numérique)'
      ],
      delivery: { show: false },
      faq: [
        { q: 'IELTS Academic ou General : lequel choisir ?', a: 'Academic pour études supérieures ; General pour immigration ou travail. Nous vous orientons selon votre projet.' },
        { q: 'Préparez-vous aussi le TOEFL ?', a: 'Oui, les compétences sont similaires ; le programme est adapté au format et aux critères de chaque test.' },
        { q: 'Combien de séances pour gagner 0,5 band ?', a: 'Variable selon le niveau ; en moyenne 6 à 15 séances avec travail personnel régulier entre les cours.' },
        { q: 'Les cours sont-ils en anglais uniquement ?', a: 'Les séances se déroulent en anglais ; des explications en français sont possibles si besoin pour clarifier une stratégie.' }
      ]
    },
    en: {
      badge: 'International tests',
      title: 'IELTS / TOEFL / Cambridge',
      seoTitle: 'IELTS & TOEFL preparation online | Lomé — LINGUAPHIX',
      intro: 'Complete preparation for international English exams. Academic and General Training, band-score strategies, and personalized speaking coaching.',
      metaDescription: 'IELTS, TOEFL and Cambridge preparation online and in Lomé. Target-score coaching, mock tests, Speaking & Writing. LINGUAPHIX.',
      packages: [
        {
          name: 'Strategy session',
          desc: 'Profile review and a tailored approach for IELTS, TOEFL, or Cambridge.',
          priceXof: 10000,
          unit: 'session',
          features: ['90-120 min session', 'Quick diagnostic', 'Best test for your goals', 'Skill-by-skill plan']
        },
        {
          name: 'Full simulation',
          desc: 'Complete mock test with debrief and priorities before your official date.',
          priceXof: 15000,
          unit: 'session',
          features: ['90-120 min session', 'Timed full mock', 'IELTS scoring grid', '7-day revision plan']
        },
        {
          name: 'Band-score coaching',
          desc: '5-6 structured sessions for a total of 10 hours to reach your target score before exam day.',
          priceXof: 50000,
          unit: 'month',
          featured: true,
          features: ['90-120 min per session', 'Defined target band', 'Detailed Writing feedback', 'Speaking mock tests', 'Weekly check-ins']
        }
      ],
      modalities: [
        'Online or in person',
        '90-120 minute sessions',
        'IELTS Academic, General, TOEFL iBT, Cambridge B2/C1',
        'One-to-one sessions (groups on quote)',
        'Speaking recordings for self-review',
        'Timezone-friendly scheduling for international clients'
      ],
      process: [
        'Choose test and target score',
        'Diagnostic by skill',
        'Targeted practice and error correction',
        'Full mocks and plan adjustments',
        'Logistics prep (ID, timing, digital format)'
      ],
      delivery: { show: false },
      faq: [
        { q: 'IELTS Academic or General — which one?', a: 'Academic for higher education; General for immigration or work. We guide you based on your project.' },
        { q: 'Do you also prepare for TOEFL?', a: 'Yes. Skills overlap; the program is adapted to each test\'s format and scoring criteria.' },
        { q: 'How many sessions to gain 0.5 band?', a: 'It varies by level; typically 6–15 sessions with consistent self-study between classes.' },
        { q: 'Are lessons only in English?', a: 'Sessions run in English; brief explanations in French are available if needed to clarify a strategy.' }
      ]
    }
  },

  toeic: {
    category: 'langues',
    icon: '🎓',
    policyKey: 'toeic',
    fr: {
      badge: 'Anglais professionnel',
      title: 'Préparation TOEIC',
      seoTitle: 'Préparation TOEIC en ligne | Lomé — LINGUAPHIX',
      intro: 'Préparation ciblée TOEIC Listening & Reading et Speaking & Writing. Stratégies, grilles de score et simulations pour maximiser votre résultat professionnel.',
      metaDescription: 'Préparation TOEIC en ligne et à Lomé : L&R et S&W, simulations, stratégies entreprise. LINGUAPHIX.',
      packages: [
        {
          name: 'Diagnostic TOEIC',
          desc: 'Test blanc et analyse des sections à fort potentiel de gain.',
          priceXof: 15000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Score estimé L&R', 'Priorisation des sections', 'Planning type 4 semaines']
        },
        {
          name: 'Speaking & Writing',
          desc: 'Coaching expression orale et écrite pour les versions S&W.',
          priceXof: 15000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Modèles de réponses S&W', 'Prononciation et fluidité', 'Correction rédaction professionnelle']
        },
        {
          name: 'Pack L&R intensif',
          desc: '5-6 séances structurées pour un total de 10 h afin d\'atteindre votre score cible avant le jour de l\'examen.',
          priceXof: 65000,
          unit: 'month',
          featured: true,
          features: ['90-120 min par séance', 'Drills photos / réponses', 'Gestion du temps part 7', '2 simulations complètes', 'Rapport de progression']
        }
      ],
      modalities: [
        'Présentiel ou visio',
        'Séances de 90 à 120 minutes',
        'Focus L&R, S&W ou pack combiné',
        'Supports officiels et banques d\'exercices',
        'Adaptation objectifs RH / certification interne'
      ],
      process: [
        'Objectif de score et échéance définis',
        'Test blanc initial',
        'Séances par type de question TOEIC',
        'Simulations et optimisation du temps',
        'Recommandations 48 h avant l\'examen'
      ],
      delivery: { show: false },
      faq: [
        { q: 'Quel score TOEIC viser pour le marché du travail ?', a: 'Souvent 750+ pour un bon niveau professionnel ; certains employeurs exigent 850+. Nous calibrons le programme sur votre cible.' },
        { q: 'Préparez-vous le nouveau format TOEIC ?', a: 'Oui, les contenus sont alignés sur les formats et rubriques actuellement publiés par ETS.' },
        { q: 'Peut-on préparer en ligne ?', a: 'Oui, les simulations et le coaching fonctionnent entièrement en visio.' },
        { q: 'Proposez-vous des tarifs entreprise ?', a: 'Oui, pour les équipes contactez-nous pour un devis groupé et un planning commun.' }
      ]
    },
    en: {
      badge: 'Professional English',
      title: 'TOEIC Preparation',
      seoTitle: 'TOEIC preparation online | Lomé — LINGUAPHIX',
      intro: 'Focused TOEIC Listening & Reading and Speaking & Writing preparation. Strategies, score grids, and mock tests to maximize your professional result.',
      metaDescription: 'TOEIC preparation online and in Lomé: L&R and S&W, mock exams, corporate strategies. LINGUAPHIX.',
      packages: [
        {
          name: 'TOEIC diagnostic',
          desc: 'Mock test and analysis of sections with the highest score upside.',
          priceXof: 15000,
          unit: 'session',
          features: ['90-120 min session', 'Estimated L&R score', 'Section prioritization', 'Sample 4-week plan']
        },
        {
          name: 'Speaking & Writing',
          desc: 'Oral and written coaching for S&W versions.',
          priceXof: 15000,
          unit: 'session',
          features: ['90-120 min session', 'S&W response templates', 'Pronunciation and fluency', 'Professional writing corrections']
        },
        {
          name: 'Intensive L&R pack',
          desc: '5-6 structured sessions for a total of 10 hours to reach your target score before exam day.',
          priceXof: 65000,
          unit: 'month',
          featured: true,
          features: ['90-120 min per session', 'Photo / response drills', 'Part 7 time management', '2 full mock tests', 'Progress report']
        }
      ],
      modalities: [
        'In person or video call',
        '90-120 minute sessions',
        'L&R, S&W, or combined focus',
        'Official materials and question banks',
        'Aligned with HR / internal certification goals'
      ],
      process: [
        'Target score and deadline set',
        'Initial mock test',
        'Sessions by TOEIC question type',
        'Mocks and time optimization',
        '48-hour pre-exam recommendations'
      ],
      delivery: { show: false },
      faq: [
        { q: 'What TOEIC score should I aim for?', a: 'Often 750+ for solid professional English; some employers require 850+. We align the program to your target.' },
        { q: 'Do you cover the current TOEIC format?', a: 'Yes. Content follows formats and sections published by ETS.' },
        { q: 'Can I prepare online?', a: 'Yes. Mocks and coaching work fully via video call.' },
        { q: 'Do you offer corporate pricing?', a: 'Yes. For teams, contact us for a group quote and shared schedule.' }
      ]
    }
  },

  cours: {
    category: 'langues',
    icon: '💬',
    policyKey: 'cours',
    fr: {
      badge: 'Cours sur mesure',
      title: 'Cours de Français / Anglais',
      seoTitle: 'Cours de français et d\'anglais en ligne | Lomé — LINGUAPHIX',
      intro: 'Cours de français et d\'anglais personnalisés du niveau A1 au C2, en ligne ou en présentiel à Lomé. Objectifs professionnels, académiques ou quotidiens avec progression suivie.',
      metaDescription: 'Cours de français et cours d\'anglais en ligne et à Lomé : A1–C2, horaires flexibles, en ligne ou présentiel. LINGUAPHIX.',
      packages: [
        {
          name: 'Starter',
          desc: '1 h · 1 séance/semaine · 4 séances/mois — en ligne dès 35 000 XOF/mois (présentiel 45 000 XOF).',
          priceXof: 35000,
          unit: 'month',
          featured: true,
          features: [
            'Anglais, français ou les deux',
            'En ligne (le plus populaire) ou présentiel',
            'Plan de progression personnalisé',
            'Devoirs entre séances',
            'Bilan mensuel'
          ]
        },
        {
          name: 'Intensif',
          desc: '1 h · 2 séances/semaine · 8 séances/mois — en ligne dès 68 000 XOF/mois (présentiel 85 000 XOF).',
          priceXof: 68000,
          unit: 'month',
          features: [
            'Anglais, français ou les deux',
            'En ligne ou présentiel',
            'Progression accélérée',
            'Pratique orale renforcée',
            'Idéal avant examen ou mission'
          ]
        }
      ],
      modalities: [
        'Français et anglais, tous niveaux CECRL',
        'Séances de 60 minutes',
        'Individuel (duo ou petit groupe sur devis)',
        'Visio, WhatsApp vocal ou présentiel Lomé',
        'Matériel adapté (business, voyage, études)'
      ],
      process: [
        'Échange sur vos objectifs et contraintes horaires',
        'Test de niveau et choix du manuel / ressources',
        'Séances interactives avec pratique orale prioritaire',
        'Devoirs et auto-évaluation guidée',
        'Bilan et ajustement du programme chaque mois'
      ],
      delivery: { show: false },
      faq: [
        { q: 'Puis-je mélanger français et anglais ?', a: 'Chaque inscription concerne une langue de travail ; des parcours bilingues sont possibles sur devis pour profils professionnels.' },
        { q: 'Quelle durée minimale par séance ?', a: '1 heure recommandée ; des créneaux de 90 minutes sont possibles pour l\'immersion.' },
        { q: 'Fournissez-vous un certificat de niveau ?', a: 'Non, mais nous recommandons les examens officiels (TCF, IELTS) pour une certification reconnue.' },
        { q: 'Les cours en ligne sont-ils efficaces ?', a: 'Oui, avec une bonne connexion et un casque ; de nombreux apprenants atteignent leurs objectifs entièrement en visio.' }
      ]
    },
    en: {
      badge: 'Tailored lessons',
      title: 'French / English Courses',
      seoTitle: 'English & French classes online | Lomé — LINGUAPHIX',
      intro: 'Personalized English and French classes from A1 to C2, online or in person in Lomé. Professional, academic, or everyday goals with tracked progress.',
      metaDescription: 'English and French classes & courses online and in Lomé: A1–C2, flexible hours, online or in person. LINGUAPHIX.',
      packages: [
        {
          name: 'Starter',
          desc: '1 hr · 1 session/week · 4 sessions/month — online from 35,000 XOF/month (in-person 45,000 XOF).',
          priceXof: 35000,
          unit: 'month',
          featured: true,
          features: [
            'English, French, or Both',
            'Online (most popular) or in-person',
            'Personalized progression plan',
            'Homework between sessions',
            'Monthly review'
          ]
        },
        {
          name: 'Intensive',
          desc: '1 hr · 2 sessions/week · 8 sessions/month — online from 68,000 XOF/month (in-person 85,000 XOF).',
          priceXof: 68000,
          unit: 'month',
          features: [
            'English, French, or Both',
            'Online or in-person',
            'Accelerated progress',
            'Extra speaking practice',
            'Ideal before exams or travel'
          ]
        }
      ],
      modalities: [
        'French and English, all CEFR levels',
        '60-minute sessions',
        'One-to-one (pairs or small groups on quote)',
        'Video call, voice notes, or in person in Lomé',
        'Materials for business, travel, or study'
      ],
      process: [
        'Discuss goals and schedule constraints',
        'Placement test and resource selection',
        'Interactive sessions with speaking priority',
        'Homework and guided self-assessment',
        'Monthly review and program adjustment'
      ],
      delivery: { show: false },
      faq: [
        { q: 'Can I study both French and English?', a: 'Each enrollment focuses on one working language; bilingual tracks are available on quote for professional profiles.' },
        { q: 'What is the minimum session length?', a: '1 hour recommended; 90-minute slots are available for immersion.' },
        { q: 'Do you issue a level certificate?', a: 'No, but we recommend official exams (TCF, IELTS) for recognized certification.' },
        { q: 'Are online lessons effective?', a: 'Yes, with a stable connection and headset; many learners meet their goals fully online.' }
      ]
    }
  },

  interview: {
    category: 'langues',
    icon: '🎤',
    policyKey: 'interview',
    fr: {
      badge: 'Carrière & mobilité',
      title: 'Préparation aux interviews en anglais',
      seoTitle: 'Préparation entretien en anglais | Lomé — LINGUAPHIX',
      intro: 'Coaching pour entretiens d\'embauche, visa, admission universitaire ou promotion. Fluidité, vocabulaire métier et confiance à l\'oral.',
      metaDescription: 'Préparation entretien en anglais : embauche, visa, université. Simulations et coaching oral LINGUAPHIX Lomé.',
      packages: [
        {
          name: 'Session découverte',
          desc: 'Analyse du poste ou du programme et préparation des questions clés.',
          priceXof: 25000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Audit CV / lettre en anglais', 'Liste de questions probables', 'Conseils culturels']
        },
        {
          name: 'Pack confiance',
          desc: 'Plusieurs simulations + coaching express avant la date réelle.',
          priceXof: 35000,
          unit: 'session',
          features: ['Séance 90-120 min', 'Gestion du stress', 'Questions difficiles / négociation salaire', 'Support email J-1']
        },
        {
          name: 'Simulation interview',
          desc: 'Entretien blanc filmé ou en direct avec feedback détaillé.',
          priceXof: 20000,
          unit: 'session',
          featured: true,
          features: ['Séance 90-120 min', 'Mock interview + feedback', 'Réponses STAR structurées', 'Fiches vocabulaire secteur', 'Plan de révision 48 h']
        }
      ],
      modalities: [
        'En ligne ou présentiel',
        'Séances de 90 à 120 minutes',
        'Entretiens RH, techniques, visa, admission',
        'Secteurs : IT, santé, commerce, ONG, etc.',
        'Enregistrement séance sur demande',
        'Relecture CV / cover letter en option'
      ],
      process: [
        'Brief sur le poste et l\'intervieweur',
        'Préparation des réponses et du storytelling',
        'Simulation réaliste avec timer',
        'Feedback ligne par ligne',
        'Répétition des points faibles identifiés'
      ],
      delivery: { show: false },
      faq: [
        { q: 'Combien de séances avant un entretien ?', a: '1 à 3 séances selon votre niveau et la pression du calendrier ; une simulation intensive est souvent suffisante avec préparation entre les cours.' },
        { q: 'Préparez-vous les entretiens visa ?', a: 'Oui, nous travaillons les questions fréquentes consulat / ambassade et la clarté des réponses courtes.' },
        { q: 'Mon anglais est B1 : est-ce réaliste ?', a: 'Oui, avec des scripts adaptés et de la pratique ciblée vous pouvez gagner en fluidité rapidement pour un entretien précis.' },
        { q: 'Corrigez-vous le CV en anglais ?', a: 'Une relecture de base est incluse dans la session découverte ; une réécriture complète peut faire l\'objet d\'un devis séparé.' }
      ]
    },
    en: {
      badge: 'Career & mobility',
      title: 'English Interview Preparation',
      seoTitle: 'English interview preparation | Lomé — LINGUAPHIX',
      intro: 'Coaching for job interviews, visas, university admission, or promotion. Fluency, industry vocabulary, and speaking confidence.',
      metaDescription: 'English interview preparation: hiring, visa, university. Mock interviews and coaching at LINGUAPHIX Lomé.',
      packages: [
        {
          name: 'Discovery session',
          desc: 'Role or program analysis and preparation for key questions.',
          priceXof: 25000,
          unit: 'session',
          features: ['90-120 min session', 'CV / cover letter review', 'Likely question list', 'Cultural tips']
        },
        {
          name: 'Confidence pack',
          desc: 'Multiple mocks plus express coaching before your real date.',
          priceXof: 35000,
          unit: 'session',
          features: ['90-120 min session', 'Stress management', 'Tough questions / salary talk', 'Email support D-1']
        },
        {
          name: 'Mock interview',
          desc: 'Live or recorded mock interview with detailed feedback.',
          priceXof: 20000,
          unit: 'session',
          featured: true,
          features: ['90-120 min session', 'Mock + detailed feedback', 'STAR-structured answers', 'Industry vocabulary sheets', '48-hour revision plan']
        }
      ],
      modalities: [
        'Online or in person',
        '90-120 minute sessions',
        'HR, technical, visa, and admission interviews',
        'Sectors: IT, healthcare, business, NGOs, etc.',
        'Session recording on request',
        'Optional CV / cover letter editing'
      ],
      process: [
        'Brief on role and interviewer',
        'Answer prep and storytelling',
        'Realistic timed mock',
        'Line-by-line feedback',
        'Drill weak points identified'
      ],
      delivery: { show: false },
      faq: [
        { q: 'How many sessions before an interview?', a: '1–3 depending on level and timeline; one intensive mock is often enough with practice between sessions.' },
        { q: 'Do you prepare for visa interviews?', a: 'Yes. We work on common embassy questions and clear, concise answers.' },
        { q: 'My English is B1 — is that enough?', a: 'Yes. With tailored scripts and focused practice you can gain fluency quickly for a specific interview.' },
        { q: 'Do you edit English CVs?', a: 'Basic review is included in the discovery session; full rewriting can be quoted separately.' }
      ]
    }
  },

  soutien: {
    category: 'langues',
    icon: '📖',
    policyKey: 'soutien',
    fr: {
      badge: 'Scolaire',
      title: 'Soutien scolaire FR / EN',
      seoTitle: 'Soutien scolaire français anglais | Lomé — LINGUAPHIX',
      intro: 'Accompagnement collège et lycée en français et en anglais : remise à niveau, méthodologie, préparation aux contrôles et examens nationaux.',
      metaDescription: 'Soutien scolaire français et anglais à Lomé : collège, lycée, devoirs, examens. Cours en ligne et présentiel LINGUAPHIX.',
      packages: [
        {
          name: 'Heure ciblée',
          desc: 'Aide sur un chapitre, devoir ou contrôle imminent.',
          priceXof: 10000,
          unit: 'hour',
          features: ['Explication cours + exercices', 'Fiches de révision', 'Méthode mémorisation', 'Contact parent possible']
        },
        {
          name: 'Suivi hebdomadaire',
          desc: '1 h par séance, 1 fois par semaine, 4 fois par mois.',
          priceXof: 35000,
          unit: 'month',
          featured: true,
          features: ['Séance 60 min', '4 séances / mois', 'Alignement programme officiel', 'Bilan mensuel aux parents', 'En ligne ou à domicile (zone Lomé)']
        },
        {
          name: 'Préparation examen',
          desc: 'Bloc d\'heures avant BEPC, BAC ou examen international.',
          priceXof: 10000,
          unit: 'hour',
          features: ['Annales et sujets types', 'Stratégies gestion du temps', 'Correction des erreurs fréquentes', 'Planning de révision']
        }
      ],
      modalities: [
        'Français et anglais, collège et lycée',
        'Séances de 60 minutes',
        'Visio ou présentiel',
        'Groupes de 2 élèves possibles (tarif sur devis)',
        'Coordination avec parents et enseignants',
        'Créneaux après l\'école et week-end'
      ],
      process: [
        'Échange parents / élève sur les difficultés',
        'Repérage des lacunes par matière',
        'Séances explicatives + pratique guidée',
        'Suivi des notes et ajustement',
        'Préparation aux périodes d\'examens'
      ],
      delivery: { show: false },
      faq: [
        { q: 'À partir de quelle classe ?', a: 'De la 6ème à la Terminale, pour le français, l\'anglais et la méthodologie bilingue.' },
        { q: 'Intervenez-vous à domicile ?', a: 'Oui dans la grande Lomé, sous réserve de disponibilité ; sinon les cours en ligne sont proposés.' },
        { q: 'Comment suivez-vous la progression ?', a: 'Un court bilan mensuel est partagé avec les parents ; l\'élève reçoit des objectifs clairs à chaque séance.' },
        { q: 'Peut-on mélanger français et anglais sur une heure ?', a: 'Une séance traite en priorité une matière ; des créneaux séparés sont recommandés pour de meilleurs résultats.' }
      ]
    },
    en: {
      badge: 'School support',
      title: 'French / English Tutoring',
      seoTitle: 'French & English tutoring | Lomé — LINGUAPHIX',
      intro: 'Middle and high school support in French and English: catch-up, study skills, and prep for tests and national exams.',
      metaDescription: 'French and English tutoring in Lomé: middle school, high school, homework, exams. Online and in person LINGUAPHIX.',
      packages: [
        {
          name: 'Focused hour',
          desc: 'Help on one chapter, assignment, or upcoming test.',
          priceXof: 10000,
          unit: 'hour',
          features: ['Lesson recap + practice', 'Revision sheets', 'Memory techniques', 'Optional parent update']
        },
        {
          name: 'Weekly support',
          desc: '1 h per session, once a week, 4 times a month.',
          priceXof: 35000,
          unit: 'month',
          featured: true,
          features: ['60 min session', '4 sessions / month', 'Official curriculum alignment', 'Monthly parent report', 'Online or home (Lomé area)']
        },
        {
          name: 'Exam prep block',
          desc: 'Hours bundled before BEPC, BAC, or international exams.',
          priceXof: 10000,
          unit: 'hour',
          features: ['Past papers and drills', 'Time-management strategies', 'Common mistake fixes', 'Revision timetable']
        }
      ],
      modalities: [
        'French and English, middle and high school',
        '60-minute sessions',
        'Video or in person',
        'Pairs possible (quoted rate)',
        'Coordination with parents and teachers',
        'After-school and weekend slots'
      ],
      process: [
        'Parent / student discussion of difficulties',
        'Gap analysis by subject',
        'Explanations plus guided practice',
        'Grade tracking and adjustments',
        'Exam-period preparation'
      ],
      delivery: { show: false },
      faq: [
        { q: 'From which grade level?', a: 'From 6ème to Terminale for French, English, and bilingual study skills.' },
        { q: 'Do you tutor at home?', a: 'Yes in greater Lomé when available; otherwise online sessions are offered.' },
        { q: 'How is progress tracked?', a: 'A short monthly report goes to parents; students get clear goals every session.' },
        { q: 'Can one hour cover both languages?', a: 'Each session focuses on one subject; separate slots are recommended for best results.' }
      ]
    }
  },

  traduction: {
    category: 'langues',
    icon: '📜',
    policyKey: 'traduction',
    audienceOverrides: {
      particuliers: {
        fr: {
          title: 'Traduction professionnelle (particuliers)',
          seoTitle: 'Traduction particuliers FR-EN | Lomé — LINGUAPHIX',
          intro: 'Traduction fidèle pour vos documents personnels : actes, visas, diplômes, casiers et courriers officiels. Tarifs à la page ou au mot selon le volume.',
          metaDescription: 'Traduction professionnelle pour particuliers : actes, visas, diplômes FR-EN à Lomé. LINGUAPHIX.'
        },
        en: {
          title: 'Professional translation (individuals)',
          seoTitle: 'Individual FR-EN translation | Lomé — LINGUAPHIX',
          intro: 'Accurate translation for personal documents: certificates, visas, diplomas, records, and official letters. Per-page or per-word rates depending on volume.',
          metaDescription: 'Professional translation for individuals: certificates, visas, diplomas FR-EN in Lomé. LINGUAPHIX.'
        }
      },
      entreprises: {
        fr: {
          title: 'Traduction professionnelle (entreprises)',
          seoTitle: 'Traduction entreprise FR-EN | Lomé — LINGUAPHIX',
          intro: 'Traduction pour équipes et organisations : documents professionnels, contrats, rapports et dossiers réglementés. Facturation entreprise et devis sur mesure.',
          metaDescription: 'Traduction professionnelle entreprise : contrats, rapports, documents officiels FR-EN à Lomé. LINGUAPHIX.'
        },
        en: {
          title: 'Professional translation (businesses)',
          seoTitle: 'Business FR-EN translation | Lomé — LINGUAPHIX',
          intro: 'Translation for teams and organizations: professional documents, contracts, reports, and regulated dossiers. Corporate billing and tailored quotes.',
          metaDescription: 'Professional business translation: contracts, reports, official documents FR-EN in Lomé. LINGUAPHIX.'
        }
      }
    },
    fr: {
      badge: 'Certifié FR⇄EN',
      title: 'Traduction professionnelle',
      seoTitle: 'Traduction français anglais | Lomé — LINGUAPHIX',
      intro: 'Traduction fidèle et soignée pour particuliers et entreprises : documents officiels, juridiques, académiques, marketing et contenus web.',
      metaDescription: 'Traduction professionnelle français anglais à Lomé : visas, contrats, diplômes, documents officiels. LINGUAPHIX.',
      packages: [
        {
          name: 'Document simple',
          desc: 'Actes, attestations, courriers — tarif à la page.',
          priceXof: 15000,
          unit: 'page',
          features: ['Traduction certifiée sur demande', 'Mise en forme proche de l\'original', 'Relecture bilingue', 'Fichier Word / PDF livré']
        },
        {
          name: 'Volume & entreprise',
          desc: 'Contrats, rapports et documents volumineux pour particuliers.',
          dualPageWord: true,
          priceXof: 25000,
          priceFromXof: 60,
          priceToXof: 80,
          unit: 'page',
          features: ['Glossaire conservé', 'Relecture senior incluse', 'Tarif à la page ou au mot', 'Formats DOCX, PDF', 'Devis gratuit']
        },
        {
          name: 'Dossier officiel',
          desc: 'Visas, diplômes, casiers — terminologie consulaire précise.',
          priceXof: 15000,
          unit: 'page',
          featured: true,
          features: ['Terminologie consulaire', 'Cohérence noms et dates', 'Notes de traducteur si requis', 'Confidentialité stricte']
        }
      ],
      businessPackages: [
        {
          name: 'Document simple',
          desc: 'Courriers, fiches produit et contenus professionnels courts.',
          priceXof: 25000,
          unit: 'page',
          features: ['Relecture bilingue', 'Mise en forme pro', 'Livraison Word / PDF', 'Facturation entreprise']
        },
        {
          name: 'Volume & corporate',
          desc: 'Contrats, rapports, sites web et volumes récurrents.',
          priceFromXof: 60,
          priceToXof: 80,
          unit: 'word',
          features: ['Glossaire client conservé', 'Relecture senior incluse', 'Tarif au mot', 'Planning prioritaire', 'NDA sur demande']
        },
        {
          name: 'Dossier officiel',
          desc: 'Dossiers conformité, documents réglementés et pièces institutionnelles.',
          priceXof: 25000,
          unit: 'page',
          featured: true,
          features: ['Terminologie métier', 'Cohérence noms et dates', 'Notes de traducteur', 'Confidentialité stricte']
        }
      ],
      modalities: [
        'FR → EN et EN → FR',
        'Envoi sécurisé par email ou cloud',
        'Devis gratuit après analyse du fichier',
        'Certification / apostille : orientation fournie',
        'Paiement à la livraison ou 50 % acompte grands volumes'
      ],
      process: [
        'Réception et analyse du document source',
        'Devis, délai et confirmation des termes',
        'Traduction par un traducteur expert',
        'Relecture et contrôle qualité',
        'Livraison des fichiers finaux et ajustements mineurs'
      ],
      delivery: {
        normal: '5 à 7 jours ouvrés selon le volume et la complexité.',
        express: '48 à 72 h pour les dossiers urgents (sous réserve de disponibilité).',
        expressNote: 'Majoration express de 25 à 50 % selon le volume et le délai demandé.'
      },
      faq: [
        { q: 'Proposez-vous une traduction assermentée ?', a: 'Nous réalisons des traductions professionnelles ; pour une assermentation officielle nous vous orientons vers les démarches adaptées au pays destinataire.' },
        { q: 'Comment est calculé le prix ?', a: 'Au nombre de pages du document source (250 mots ≈ 1 page). Un devis précis est envoyé avant tout travail.' },
        { q: 'Quels formats acceptez-vous ?', a: 'PDF, Word, images lisibles, PowerPoint ; les fichiers scannés doivent être lisibles ou faire l\'objet d\'une OCR préalable.' },
        { q: 'Mes données sont-elles protégées ?', a: 'Oui. Les documents ne sont partagés qu\'avec l\'équipe projet et peuvent faire l\'objet d\'un accord de confidentialité sur demande.' }
      ]
    },
    en: {
      badge: 'Certified FR⇄EN',
      title: 'Professional Translation',
      seoTitle: 'French English translation | Lomé — LINGUAPHIX',
      intro: 'Accurate, polished translation for individuals and businesses: official, legal, academic, marketing, and web content.',
      metaDescription: 'Professional French–English translation in Lomé: visas, contracts, diplomas, official documents. LINGUAPHIX.',
      packages: [
        {
          name: 'Simple document',
          desc: 'Certificates, letters — per-page rate.',
          priceXof: 15000,
          unit: 'page',
          features: ['Certified wording on request', 'Layout close to original', 'Bilingual proofreading', 'Word / PDF delivery']
        },
        {
          name: 'Volume & corporate',
          desc: 'Contracts, reports, and larger documents for individuals.',
          dualPageWord: true,
          priceXof: 25000,
          priceFromXof: 60,
          priceToXof: 80,
          unit: 'page',
          features: ['Glossary on file', 'Senior review included', 'Per-page or per-word rate', 'DOCX, PDF formats', 'Free quote']
        },
        {
          name: 'Official dossier',
          desc: 'Visas, diplomas, records — precise consular terminology.',
          priceXof: 15000,
          unit: 'page',
          featured: true,
          features: ['Consular terminology', 'Name and date consistency', 'Translator notes if required', 'Strict confidentiality']
        }
      ],
      businessPackages: [
        {
          name: 'Simple document',
          desc: 'Letters, product sheets, and short professional content.',
          priceXof: 25000,
          unit: 'page',
          features: ['Bilingual proofreading', 'Professional layout', 'Word / PDF delivery', 'Corporate invoicing']
        },
        {
          name: 'Volume & corporate',
          desc: 'Contracts, reports, websites, and recurring volume.',
          priceFromXof: 60,
          priceToXof: 80,
          unit: 'word',
          features: ['Client glossary on file', 'Senior review included', 'Per-word rate', 'Priority scheduling', 'NDA available']
        },
        {
          name: 'Official dossier',
          desc: 'Compliance files, regulated documents, and institutional dossiers.',
          priceXof: 25000,
          unit: 'page',
          featured: true,
          features: ['Industry terminology', 'Name and date consistency', 'Translator notes', 'Strict confidentiality']
        }
      ],
      modalities: [
        'FR → EN and EN → FR',
        'Secure delivery by email or cloud',
        'Free quote after file review',
        'Certification / apostille guidance provided',
        'Payment on delivery or 50 % deposit for large jobs'
      ],
      process: [
        'Source file received and assessed',
        'Quote, timeline, and terms confirmed',
        'Translation by an expert linguist',
        'Proofreading and quality check',
        'Final files delivered plus minor tweaks'
      ],
      delivery: {
        normal: '5–7 business days depending on volume and complexity.',
        express: '48–72 hours for urgent files (subject to availability).',
        expressNote: 'Express surcharge of 25–50 % based on volume and requested deadline.'
      },
      faq: [
        { q: 'Do you provide sworn translation?', a: 'We deliver professional translations; for sworn certification we guide you through requirements in the destination country.' },
        { q: 'How is pricing calculated?', a: 'By source page count (≈250 words per page). A firm quote is sent before work starts.' },
        { q: 'Which file formats do you accept?', a: 'PDF, Word, clear images, PowerPoint; scans must be readable or need OCR first.' },
        { q: 'Is my data protected?', a: 'Yes. Files are only shared with the project team; NDAs are available on request.' }
      ]
    }
  },

  formation: {
    category: 'langues',
    icon: '🏢',
    policyKey: 'formation',
    fr: {
      badge: 'Entreprises',
      title: 'Formation linguistique en entreprise',
      seoTitle: 'Formation linguistique entreprise | Lomé — LINGUAPHIX',
      intro: 'Programmes sur mesure en français ou en anglais pour équipes, managers et directions. Présentiel, hybride ou 100 % en ligne avec indicateurs de progression.',
      metaDescription: 'Formation anglais et français en entreprise au Togo : programmes sur mesure, présentiel et en ligne. Devis LINGUAPHIX.',
      packages: [
        {
          name: 'Audit linguistique',
          desc: 'Évaluation des besoins et cartographie des compétences de l\'équipe.',
          quote: true,
          features: ['Entretiens RH et métiers', 'Tests de niveau groupe', 'Rapport avec recommandations', 'Proposition de parcours']
        },
        {
          name: 'Parcours équipe',
          desc: 'Modules réguliers (communication pro, réunions, emails, appels).',
          quote: true,
          featured: true,

          features: ['Planning trimestriel', 'Groupes par niveau', 'Supports sectoriels', 'Feuilles de présence', 'Bilan mi-parcours et final']
        },
        {
          name: 'Executive coaching',
          desc: 'Accompagnement individuel dirigeants et cadres expatriés.',
          quote: true,
          features: ['Confidentialité renforcée', 'Scénarios négociation et pitch', 'Préparation missions à l\'étranger', 'Horaires flexibles']
        }
      ],
      modalities: [
        'Français, anglais ou bilingue métier',
        'Intra-entreprise à Lomé ou dans vos locaux',
        'Classes virtuelles et LMS sur demande',
        'Groupes de 5 à 20 participants',
        'Convention et facturation adaptées aux entreprises'
      ],
      process: [
        'Atelier cadrage avec RH / direction',
        'Tests de positionnement des participants',
        'Conception du syllabus et des supports',
        'Déploiement des sessions et suivi assiduité',
        'Évaluation des acquis et recommandations'
      ],
      delivery: {
        normal: 'Démarrage sous 2 à 4 semaines après validation du devis et du planning.',
        express: 'Lancement accéléré possible pour besoins urgents (sous réserve de disponibilité formateurs).',
        expressNote: 'Le calendrier express est précisé sur le devis signé.'
      },
      faq: [
        { q: 'Intervenez-vous hors Lomé ?', a: 'Oui, en présentiel sur devis pour le Togo et la sous-région ; l\'online couvre les équipes multi-sites.' },
        { q: 'Peut-on former 50 personnes à la fois ?', a: 'Nous organisons plusieurs groupes de niveau avec formateurs dédiés ; un devis détaillé est établi après l\'audit.' },
        { q: 'Fournissez-vous des attestations ?', a: 'Oui, attestation de formation avec heures et module suivis, utile pour les dossiers RH et financements.' },
        { q: 'Comment obtenir un devis ?', a: 'Demandez un devis via le formulaire ou Calendly ; nous planifions un appel découverte sous 24 h.' }
      ]
    },
    en: {
      badge: 'Corporate',
      title: 'Corporate Language Training',
      seoTitle: 'Corporate language training | Lomé — LINGUAPHIX',
      intro: 'Custom French and English programs for teams, managers, and leadership. In person, hybrid, or fully online with progress metrics.',
      metaDescription: 'Corporate English and French training in Togo: tailored programs, in person and online. Quote from LINGUAPHIX.',
      packages: [
        {
          name: 'Linguistic audit',
          desc: 'Needs analysis and skills mapping for your team.',
          quote: true,
          features: ['HR and line-manager interviews', 'Group level testing', 'Report with recommendations', 'Proposed learning paths']
        },
        {
          name: 'Team track',
          desc: 'Regular modules (professional communication, meetings, email, calls).',
          quote: true,
          featured: true,

          features: ['Quarterly schedule', 'Level-based groups', 'Industry materials', 'Attendance sheets', 'Mid-term and final review']
        },
        {
          name: 'Executive coaching',
          desc: 'One-to-one support for leaders and expatriate managers.',
          quote: true,
          features: ['Enhanced confidentiality', 'Negotiation and pitch scenarios', 'Preparation for overseas assignments', 'Flexible hours']
        }
      ],
      modalities: [
        'French, English, or job-specific bilingual',
        'On-site in Lomé or at your premises',
        'Virtual classes and LMS on request',
        'Groups of 5–20 participants',
        'Contracts and invoicing for corporate clients'
      ],
      process: [
        'Scoping workshop with HR / leadership',
        'Participant placement tests',
        'Syllabus and material design',
        'Session delivery and attendance tracking',
        'Outcome assessment and recommendations'
      ],
      delivery: {
        normal: 'Start within 2–4 weeks after quote and schedule approval.',
        express: 'Fast-track launch for urgent needs (trainer availability permitting).',
        expressNote: 'Express timelines are specified on the signed quote.'
      },
      faq: [
        { q: 'Do you work outside Lomé?', a: 'Yes, in-person on quote across Togo and the region; online serves multi-site teams.' },
        { q: 'Can you train 50 people at once?', a: 'We split level-based groups with dedicated trainers; a detailed quote follows the audit.' },
        { q: 'Do you provide certificates?', a: 'Yes — training certificates with hours and modules completed for HR and funding files.' },
        { q: 'How do I get a quote?', a: 'Use the quote form or Calendly; we schedule a discovery call within 24 hours.' }
      ]
    }
  },

  logo: {
    category: 'design',
    icon: '✨',
    policyKey: 'logo',
    fr: {
      badge: 'Identité visuelle',
      title: 'Création & animation de logo',
      seoTitle: 'Création de logo | Lomé — LINGUAPHIX',
      intro: 'Logos originaux, mémorables et adaptés à tous les supports. Versions statique et animée, fichiers vectoriels et charte de base.',
      metaDescription: 'Création de logo et animation motion à Lomé : fichiers HD, révisions incluses. LINGUAPHIX design.',
      packages: [
        {
          name: 'Logo essentiel',
          desc: 'Concept unique, 2 propositions initiales, fichiers PNG et SVG.',
          priceXof: 40000,
          unit: 'project',
          features: ['2 pistes créatives', '2 allers-retours inclus', 'PNG fond clair / foncé', 'SVG vectoriel', 'Mini guide couleurs']
        },
        {
          name: 'Pack marque',
          desc: 'Logo, déclinaisons, papeterie simple et mockups.',
          priceXof: 90000,
          unit: 'project',
          featured: true,
          features: ['Charte couleurs & typos', 'Carte de visite et entête', 'Mockups réseaux', 'Guide PDF 4 pages', 'Support 30 jours post-livraison']
        },
        {
          name: 'Logo + animation',
          desc: 'Identité statique et version animée courte pour réseaux et intro vidéo.',
          priceXof: 80000,
          unit: 'project',
          features: ['3 propositions logo', 'Motion 5–10 s (MP4, GIF)', 'Favicon et avatar social', '3 révisions par phase', 'Livraison sources AI / AE']
        }
      ],
      modalities: [
        'Brief créatif par questionnaire ou appel',
        'Style moderne, minimal, premium ou playful',
        'Livraison 100 % digitale',
        'Révisions structurées (pas de refonte illimitée)',
        'Cession des droits après paiement intégral'
      ],
      process: [
        'Brief et références visuelles',
        'Moodboard et esquisses',
        'Propositions logo affinées',
        'Finalisation vectorielle',
        'Animation et export multi-formats'
      ],
      delivery: {
        normal: '10 à 15 jours ouvrés selon le forfait et les retours client.',
        express: '5 à 7 jours en option rush.',
        expressNote: 'Majoration express de 25 à 50 % selon la complexité et le créneau.'
      },
      faq: [
        { q: 'Combien de révisions sont incluses ?', a: '2 à 3 tours selon le forfait, sur la même direction créative. Une nouvelle direction compte comme une nouvelle proposition.' },
        { q: 'Recevrai-je les fichiers sources ?', a: 'Oui : AI, SVG et projets d\'animation (After Effects) pour le pack complet.' },
        { q: 'Pouvez-vous repartir de mon ancien logo ?', a: 'Oui, en refonte évolutive ou déclinaison ; précisez-le dans le brief.' },
        { q: 'L\'animation est-elle obligatoire ?', a: 'Non, le forfait essentiel couvre le statique ; l\'animation est une option intégrée au forfait complet.' }
      ]
    },
    en: {
      badge: 'Visual identity',
      title: 'Logo Design & Animation',
      seoTitle: 'Logo design | Lomé — LINGUAPHIX',
      intro: 'Original, memorable logos for every channel. Static and animated versions, vector files, and a basic brand guide.',
      metaDescription: 'Logo design and motion animation in Lomé: HD files, revisions included. LINGUAPHIX creative studio.',
      packages: [
        {
          name: 'Essential logo',
          desc: 'Single concept direction, 2 initial proposals, PNG and SVG files.',
          priceXof: 40000,
          unit: 'project',
          features: ['2 creative routes', '2 revision rounds', 'PNG light / dark backgrounds', 'SVG vector', 'Mini color guide']
        },
        {
          name: 'Brand starter',
          desc: 'Logo, variations, simple stationery, and mockups.',
          priceXof: 90000,
          unit: 'project',
          featured: true,
          features: ['Color and type chart', 'Business card and letterhead', 'Social mockups', '4-page PDF guide', '30-day post-delivery support']
        },
        {
          name: 'Logo + motion',
          desc: 'Static identity plus a short animation for social and video intros.',
          priceXof: 80000,
          unit: 'project',
          features: ['3 logo concepts', '5–10 s motion (MP4, GIF)', 'Favicon and social avatar', '3 revisions per phase', 'AI / AE source files']
        }
      ],
      modalities: [
        'Creative brief via form or call',
        'Modern, minimal, premium, or playful styles',
        '100 % digital delivery',
        'Structured revisions (no unlimited redraws)',
        'Rights transfer after full payment'
      ],
      process: [
        'Brief and visual references',
        'Moodboard and sketches',
        'Refined logo proposals',
        'Vector finalization',
        'Animation and multi-format export'
      ],
      delivery: {
        normal: '10–15 business days depending on package and feedback speed.',
        express: '5–7 days rush option.',
        expressNote: 'Express surcharge of 25–50 % based on complexity and slot.'
      },
      faq: [
        { q: 'How many revisions are included?', a: '2–3 rounds per package on the same creative direction. A new direction counts as a new concept.' },
        { q: 'Will I get source files?', a: 'Yes: AI, SVG, and animation projects (After Effects) on the full pack.' },
        { q: 'Can you refresh my existing logo?', a: 'Yes — evolution or redraw; mention it in the brief.' },
        { q: 'Is animation required?', a: 'No. Essential covers static; animation is included in the full pack.' }
      ]
    }
  },

  montage: {
    category: 'design',
    icon: '🎬',
    policyKey: 'montage',
    fr: {
      badge: 'Post-production',
      title: 'Montage vidéo professionnel',
      seoTitle: 'Montage vidéo professionnel | Lomé — LINGUAPHIX',
      intro: 'Montage dynamique pour clips, interviews, publicités, vlogs, formations et événements. Tarification à l\'heure — narration claire, habillage et export HD/4K.',
      metaDescription: 'Montage vidéo professionnel Lomé : tarif à l\'heure, clips, pubs, événements, HD/4K. LINGUAPHIX.',
      packages: [
        {
          name: 'Clip court',
          desc: 'Jusqu\'à 2 min — réseaux sociaux, teaser, annonce.',
          priceXof: 10000,
          unit: 'hour',
          features: ['Montage + découpage', 'Musique libre de droits', 'Sous-titres simples', '1 aller-retour', 'Export MP4 HD']
        },
        {
          name: 'Production longue',
          desc: 'Événement, webinar, documentaire court — devis selon rushes.',
          priceXof: 20000,
          unit: 'hour',
          features: ['Multi-caméra possible', 'Sound design basique', 'Chapitrage et lower-thirds', 'Livraison formats broadcast', 'Devis détaillé après visionnage']
        },
        {
          name: 'Vidéo standard',
          desc: '3 à 8 minutes — interview, vlog, présentation produit.',
          priceXof: 25000,
          unit: 'hour',
          featured: true,
          features: ['Structure narrative', 'Transitions et habillage', 'Colorimétrie légère', 'Sous-titres FR/EN', '2 révisions', 'Export HD ou 4K']
        }
      ],
      modalities: [
        'Rushes via Drive, WeTransfer ou disque',
        'Premiere Pro / DaVinci Resolve',
        'Style corporate, créatif ou documentaire',
        'Voix off et musique fournies ou sélectionnées',
        'Validation par timecode ou lien de preview'
      ],
      process: [
        'Brief, durée cible et références de style',
        'Ingestion et sélection des meilleurs plans',
        'Premier montage (rough cut)',
        'Retouches, titres, audio et colorimétrie',
        'Export final et archives projet 30 jours'
      ],
      delivery: {
        normal: '7 à 14 jours ouvrés selon la durée finale et le volume de rushes.',
        express: '3 à 5 jours en option rush.',
        expressNote: 'Majoration express de 25 à 50 % selon la durée et l\'urgence.'
      },
      faq: [
        { q: 'Quels formats de rushes acceptez-vous ?', a: 'MP4, MOV, MTS, fichiers prores ; listez la résolution et le nombre de caméras dans le brief.' },
        { q: 'Fournissez-vous la musique ?', a: 'Oui, bibliothèque libre de droits incluse ; une piste client spécifique peut être intégrée si les droits sont cleared.' },
        { q: 'Combien de révisions ?', a: '1 à 2 tours inclus selon le forfait ; les changements majeurs de script peuvent faire l\'objet d\'un supplément.' },
        { q: 'Pouvez-vous ajouter des sous-titres ?', a: 'Oui, incrustés ou fichier SRT, en français et/ou anglais.' }
      ]
    },
    en: {
      badge: 'Post-production',
      title: 'Professional Video Editing',
      seoTitle: 'Professional video editing | Lomé — LINGUAPHIX',
      intro: 'Dynamic editing for clips, interviews, ads, vlogs, training, and events. Hourly rates — clear storytelling, graphics, and HD/4K export.',
      metaDescription: 'Professional video editing in Lomé: hourly rates, clips, ads, events, HD/4K. LINGUAPHIX.',
      packages: [
        {
          name: 'Short clip',
          desc: 'Up to 2 min — social, teaser, promo.',
          priceXof: 10000,
          unit: 'hour',
          features: ['Edit and trim', 'Royalty-free music', 'Simple subtitles', '1 revision round', 'HD MP4 export']
        },
        {
          name: 'Long-form',
          desc: 'Event, webinar, short doc — quoted after footage review.',
          priceXof: 20000,
          unit: 'hour',
          features: ['Multi-cam possible', 'Basic sound design', 'Chapters and lower-thirds', 'Broadcast-ready formats', 'Detailed quote after screening']
        },
        {
          name: 'Standard video',
          desc: '3–8 minutes — interview, vlog, product walkthrough.',
          priceXof: 25000,
          unit: 'hour',
          featured: true,
          features: ['Story structure', 'Transitions and graphics', 'Light color grade', 'FR/EN subtitles', '2 revisions', 'HD or 4K export']
        }
      ],
      modalities: [
        'Footage via Drive, WeTransfer, or drive handoff',
        'Premiere Pro / DaVinci Resolve',
        'Corporate, creative, or documentary styles',
        'VO and music supplied or selected',
        'Approval via timecode or preview link'
      ],
      process: [
        'Brief, target length, and style references',
        'Ingest and best-take selection',
        'First cut (rough)',
        'Graphics, audio, and color polish',
        'Final export; project archive 30 days'
      ],
      delivery: {
        normal: '7–14 business days depending on final length and footage volume.',
        express: '3–5 days rush option.',
        expressNote: 'Express surcharge of 25–50 % based on length and urgency.'
      },
      faq: [
        { q: 'Which footage formats do you accept?', a: 'MP4, MOV, MTS, pro codecs; list resolution and camera count in the brief.' },
        { q: 'Do you provide music?', a: 'Yes — royalty-free library included; client tracks welcome if rights are cleared.' },
        { q: 'How many revisions?', a: '1–2 rounds per package; major script changes may be billed extra.' },
        { q: 'Can you add subtitles?', a: 'Yes — burned-in or SRT, in French and/or English.' }
      ]
    }
  },

  graphic: {
    category: 'design',
    icon: '🖼️',
    policyKey: 'graphic',
    fr: {
      badge: 'Communication visuelle',
      title: 'Design graphique',
      seoTitle: 'Design graphique | Lomé — LINGUAPHIX',
      intro: 'Visuels percutants pour réseaux sociaux, affiches, flyers, cartes de visite et bannières web. Cohérence avec votre identité de marque.',
      metaDescription: 'Design graphique Lomé : réseaux sociaux, affiches, print et web. Par visuel, révisions LINGUAPHIX.',
      packages: [
        {
          name: 'Visuel social',
          desc: '1 publication feed ou story, format optimisé plateforme.',
          priceXof: 15000,
          unit: 'visual',
          features: ['1 concept + 1 révision', 'Formats carré / vertical', 'Export PNG haute résolution', 'Texte fourni par le client']
        },
        {
          name: 'Impression & identité',
          desc: 'Affiche, flyer, carte de visite — prêt à imprimer.',
          priceXof: 50000,
          unit: 'visualProject',
          features: ['Fonds perdus et traits de coupe', 'PDF CMJN + PNG web', 'Relecture mise en page', 'Conseils imprimeur local']
        },
        {
          name: 'Pack communication',
          desc: '5 visuels cohérents pour campagne ou lancement.',
          priceXof: 60000,
          unit: 'visualProject',
          featured: true,
          features: ['Charte respectée ou création palette', '5 déclinaisons', '2 révisions globales', 'Templates Canva ou PSD', 'Livraison sous 7 jours']
        }
      ],
      modalities: [
        'Adobe Illustrator, Photoshop, Canva Pro',
        'Brief texte + références visuelles',
        'Adaptation FR / EN sur devis',
        'Photos stock ou visuels client',
        'Cession droits après paiement'
      ],
      process: [
        'Brief objectif, cible et formats',
        'Proposition créative (mood + esquisse)',
        'Design haute fidélité',
        'Révisions et exports finaux',
        'Livraison dossier organisé par canal'
      ],
      delivery: {
        normal: '3 à 7 jours ouvrés par visuel ou pack selon la charge.',
        express: '24 à 48 h pour visuel urgent (1 visuel simple).',
        expressNote: 'Majoration express de 25 à 50 % selon le nombre de visuels.'
      },
      faq: [
        { q: 'Faut-il fournir les textes ?', a: 'Oui, sauf service de copywriting sur devis. Nous pouvons ajuster la mise en page pour longueur.' },
        { q: 'Pouvez-vous respecter ma charte existante ?', a: 'Oui, envoyez logos, couleurs et polices ; nous créons une charte si vous démarrez.' },
        { q: 'Quelle différence entre visuel et projet logo ?', a: 'Le design graphique couvre des supports ponctuels ; le logo est une identité durable avec fichiers vectoriels dédiés.' },
        { q: 'Proposez-vous l\'impression ?', a: 'Nous livrons les fichiers prêts à imprimer et recommandons des partenaires locaux ; l\'impression reste à votre charge.' }
      ]
    },
    en: {
      badge: 'Visual communication',
      title: 'Graphic Design',
      seoTitle: 'Graphic design | Lomé — LINGUAPHIX',
      intro: 'Impactful visuals for social media, posters, flyers, business cards, and web banners. Aligned with your brand identity.',
      metaDescription: 'Graphic design in Lomé: social, print, web banners. Per-visual pricing with revisions at LINGUAPHIX.',
      packages: [
        {
          name: 'Social visual',
          desc: 'One feed or story post, platform-optimized.',
          priceXof: 15000,
          unit: 'visual',
          features: ['1 concept + 1 revision', 'Square / vertical formats', 'High-res PNG export', 'Client-supplied copy']
        },
        {
          name: 'Print & identity',
          desc: 'Poster, flyer, business card — print-ready.',
          priceXof: 50000,
          unit: 'visualProject',
          features: ['Bleed and crop marks', 'CMYK PDF + web PNG', 'Layout proofreading', 'Local printer guidance']
        },
        {
          name: 'Comms pack',
          desc: '5 cohesive visuals for a campaign or launch.',
          priceXof: 60000,
          unit: 'visualProject',
          featured: true,
          features: ['Brand or new palette', '5 variations', '2 global revision rounds', 'Canva or PSD templates', 'Delivery within 7 days']
        }
      ],
      modalities: [
        'Adobe Illustrator, Photoshop, Canva Pro',
        'Written brief plus visual references',
        'FR / EN adaptation on quote',
        'Stock or client-supplied photos',
        'Rights transfer after payment'
      ],
      process: [
        'Brief: goal, audience, formats',
        'Creative proposal (mood + sketch)',
        'High-fidelity design',
        'Revisions and final exports',
        'Organized delivery by channel'
      ],
      delivery: {
        normal: '3–7 business days per visual or pack depending on workload.',
        express: '24–48 h for one simple urgent visual.',
        expressNote: 'Express surcharge of 25–50 % based on visual count.'
      },
      faq: [
        { q: 'Do I need to supply copy?', a: 'Yes, unless copywriting is quoted separately. We adjust layout for length.' },
        { q: 'Can you follow my brand guidelines?', a: 'Yes — send logos, colors, and fonts; we can build a mini guide if you are starting out.' },
        { q: 'How is this different from a logo project?', a: 'Graphic design covers one-off assets; a logo is a lasting identity with dedicated vector files.' },
        { q: 'Do you handle printing?', a: 'We deliver print-ready files and recommend local partners; printing is on your side.' }
      ]
    }
  },

  livestream: {
    category: 'design',
    icon: '📡',
    policyKey: 'livestream',
    fr: {
      badge: 'Production live',
      title: 'Production de diffusion en direct',
      seoTitle: 'Production live streaming | Lomé — LINGUAPHIX',
      intro: 'Configuration complète pour vos directs : régie, OBS/Streamlabs, son, éclairage et multi-écrans. Webinaires, cultes, conférences et lancements produit.',
      metaDescription: 'Production de diffusion en direct à Lomé : régie, OBS, son et image. Devis événement LINGUAPHIX.',
      packages: [
        {
          name: 'Audit technique',
          desc: 'Analyse de votre setup actuel et recommandations matériel / logiciel.',
          priceXof: 60000,
          unit: 'project',
          features: ['Visio ou visite site Lomé', 'Checklist flux vidéo-audio', 'Scénario de secours', 'Rapport PDF']
        },
        {
          name: 'Accompagnement continu',
          desc: 'Assistance ponctuelle pour créateurs et organisations avec lives récurrents.',
          priceXof: 30000,
          unit: 'assistance',
          features: ['Hotline prioritaire', 'Mises à jour scènes OBS', 'Optimisation bitrate', 'Session coaching incluse']
        },
        {
          name: 'Événement sur mesure',
          desc: 'Production complexe, multi-sites ou besoins spécifiques — devis personnalisé.',
          quote: true,
          features: ['Périmètre et budget sur mesure', 'Équipe et matériel adaptés', 'Planning multi-jours possible', 'Devis détaillé sous 48 h']
        },
        {
          name: 'Événement live',
          desc: 'Opération complète le jour J : régie, streaming multi-plateformes.',
          priceXof: 150000,
          unit: 'day',
          featured: true,
          features: ['Technicien régie dédié', 'Configuration OBS / Streamlabs', 'Tests pré-événement', 'Enregistrement local', 'Support 2 h post-live']
        }
      ],
      modalities: [
        'YouTube, Facebook, Zoom, Teams, RTMP custom',
        'Matériel Linguaphix ou client (sur devis)',
        'Mono ou multi-caméra',
        'Graphiques live (lower-thirds, overlays)',
        'Intervention Lomé et environs ; conseil remote worldwide'
      ],
      process: [
        'Brief événement, plateformes et audience',
        'Repérage technique ou audit à distance',
        'Plan de câblage et tests bande passante',
        'Répétition générale et check-list J-1',
        'Production live et débrief post-événement'
      ],
      delivery: {
        normal: 'Devis sous 48 h ; préparation événement 5 à 10 jours selon l\'envergure.',
        express: 'Intervention urgence possible sous 72 h (disponibilité équipe).',
        expressNote: 'Tarif express communiqué sur le devis signé.'
      },
      faq: [
        { q: 'Faut-il déjà avoir le matériel ?', a: 'Non, nous pouvons louer ou fournir un pack sur devis ; l\'audit précise ce qui est indispensable.' },
        { q: 'Gérez-vous plusieurs plateformes en simultané ?', a: 'Oui, restream vers YouTube, Facebook et autres via OBS ou service dédié.' },
        { q: 'Que se passe-t-il si la connexion coupe ?', a: 'Nous prévoyons bitrate adaptatif, 4G de secours si disponible et enregistrement local de secours.' },
        { q: 'Enregistrez-vous le live ?', a: 'Oui, enregistrement local inclus dans l\'offre événement ; montage post-live en option.' }
      ]
    },
    en: {
      badge: 'Live production',
      title: 'Live Streaming Production',
      seoTitle: 'Live streaming production | Lomé — LINGUAPHIX',
      intro: 'Full setup for your live shows: switcher, OBS/Streamlabs, audio, lighting, and multi-screen. Webinars, worship, conferences, and product launches.',
      metaDescription: 'Live streaming production in Lomé: switcher, OBS, audio and video. Event quote from LINGUAPHIX.',
      packages: [
        {
          name: 'Technical audit',
          desc: 'Review of your current setup and gear / software recommendations.',
          priceXof: 60000,
          unit: 'project',
          features: ['Video call or Lomé site visit', 'Video-audio flow checklist', 'Backup scenario', 'PDF report']
        },
        {
          name: 'Ongoing support',
          desc: 'On-demand assistance for creators and orgs with recurring lives.',
          priceXof: 30000,
          unit: 'assistance',
          features: ['Priority hotline', 'OBS scene updates', 'Bitrate optimization', 'Coaching session included']
        },
        {
          name: 'Custom live production',
          desc: 'Complex production, multi-venue, or special requirements — custom quote.',
          quote: true,
          features: ['Tailored scope and budget', 'Crew and gear to match', 'Multi-day planning available', 'Detailed quote within 48 h']
        },
        {
          name: 'Live event',
          desc: 'Full show-day operation: switching and multi-platform streaming.',
          priceXof: 150000,
          unit: 'day',
          featured: true,
          features: ['Dedicated switcher tech', 'OBS / Streamlabs setup', 'Pre-event tests', 'Local recording', '2 h post-live support']
        }
      ],
      modalities: [
        'YouTube, Facebook, Zoom, Teams, custom RTMP',
        'Linguaphix or client gear (quoted)',
        'Single or multi-camera',
        'Live graphics (lower-thirds, overlays)',
        'On-site in Lomé area; remote consulting worldwide'
      ],
      process: [
        'Event brief, platforms, and audience',
        'Site survey or remote audit',
        'Wiring plan and bandwidth tests',
        'Dress rehearsal and D-1 checklist',
        'Live production and post-event debrief'
      ],
      delivery: {
        normal: 'Quote within 48 h; event prep 5–10 days depending on scale.',
        express: 'Emergency support within 72 h (crew availability).',
        expressNote: 'Express pricing stated on the signed quote.'
      },
      faq: [
        { q: 'Do I need to own equipment already?', a: 'No. We can rent or supply a kit on quote; the audit lists essentials.' },
        { q: 'Can you stream to several platforms at once?', a: 'Yes — restream to YouTube, Facebook, and more via OBS or a dedicated service.' },
        { q: 'What if the connection drops?', a: 'We plan adaptive bitrate, backup 4G when available, and local failover recording.' },
        { q: 'Do you record the live?', a: 'Yes — local recording is included on the event package; post-live editing is optional.' }
      ]
    }
  },

  materiel: {
    category: 'design',
    icon: '🛒',
    policyKey: 'materiel',
    fr: {
      badge: 'Conseil AV',
      title: 'Conseil & achat de matériel',
      seoTitle: 'Conseil matériel audiovisuel | Lomé — LINGUAPHIX',
      intro: 'Expertise pour équiper vos studios, salles de conférence et setups streaming : caméras, micros, lumière, encodeurs et accessoires au meilleur rapport qualité-prix.',
      metaDescription: 'Conseil matériel audiovisuel et streaming Lomé : achat caméras, micros, lumière. Devis LINGUAPHIX.',
      packages: [
        {
          name: 'Diagnostic setup',
          desc: 'Analyse de vos besoins et de l\'existant avec liste d\'achats priorisée.',
          quote: true,
          features: ['Questionnaire détaillé', 'Appel expert 45 min', 'Liste matériel 3 budgets', 'Liens fournisseurs fiables']
        },
        {
          name: 'Accompagnement achat',
          desc: 'Sélection, négociation et réception — focus streaming ou studio.',
          quote: true,
          featured: true,

          features: ['Comparatif marques / modèles', 'Commande groupée possible', 'Conseil import vs local', 'Check installation à distance', 'Garantie et SAV expliqués']
        },
        {
          name: 'Studio clé en main',
          desc: 'Conception complète d\'un espace tournage ou régie fixe.',
          quote: true,
          features: ['Plan acoustique et lumière', 'Câblage et rack', 'Formation prise en main 2 h', 'Documentation maintenance']
        }
      ],
      modalities: [
        'Budgets entrée, milieu et premium',
        'Marques disponibles Togo / import',
        'Neuf et reconditionné certifié',
        'Pas de marge cachée sur produits recommandés',
        'Installation sur site Lomé en option'
      ],
      process: [
        'Définition usages (live, podcast, classe, culte…)',
        'Audit technique et contraintes budget',
        'Shortlist validée avec le client',
        'Suivi commande et livraison',
        'Session de prise en main et réglages de base'
      ],
      delivery: {
        normal: 'Liste d\'achats sous 5 jours ; délais fournisseur variables (souvent 2 à 6 semaines import).',
        express: 'Recherche express sous 48 h pour besoin urgent.',
        expressNote: 'Frais de conseil express distincts des délais logistiques fournisseurs.'
      },
      faq: [
        { q: 'Vendez-vous directement le matériel ?', a: 'Nous conseillons et pouvons centraliser l\'achat ; la facture matériel est transparente, notre prestation est le conseil.' },
        { q: 'Pouvez-vous faire importer du matériel ?', a: 'Oui, avec estimation frais de transport et douane ; délais communiqués avant validation.' },
        { q: 'Quel budget minimum pour un kit streaming ?', a: 'À partir d\'environ 300 000 XOF pour un kit d\'entrée correct ; un devis précis suit le diagnostic.' },
        { q: 'Assurez-vous l\'installation ?', a: 'Installation et réglages sur site à Lomé en option ; tutoriels vidéo inclus pour les clients remote.' }
      ]
    },
    en: {
      badge: 'AV consulting',
      title: 'Equipment Consulting & Purchase',
      seoTitle: 'AV equipment consulting | Lomé — LINGUAPHIX',
      intro: 'Expert guidance to equip studios, meeting rooms, and streaming setups: cameras, mics, lighting, encoders, and accessories at the best value.',
      metaDescription: 'AV and streaming gear consulting in Lomé: cameras, mics, lighting purchase advice. Quote from LINGUAPHIX.',
      packages: [
        {
          name: 'Setup diagnostic',
          desc: 'Needs and current gear review with a prioritized shopping list.',
          quote: true,
          features: ['Detailed questionnaire', '45-min expert call', '3-tier gear list', 'Trusted supplier links']
        },
        {
          name: 'Purchase support',
          desc: 'Selection, negotiation, and handoff — streaming or studio focus.',
          quote: true,
          featured: true,

          features: ['Brand / model comparison', 'Possible group orders', 'Import vs local advice', 'Remote install check', 'Warranty and support explained']
        },
        {
          name: 'Turnkey studio',
          desc: 'Full design for a shoot space or fixed control room.',
          quote: true,
          features: ['Acoustic and lighting plan', 'Cabling and rack layout', '2 h hands-on training', 'Maintenance documentation']
        }
      ],
      modalities: [
        'Entry, mid, and premium budgets',
        'Brands available in Togo / import',
        'New and certified refurbished',
        'No hidden markup on recommended gear',
        'On-site install in Lomé optional'
      ],
      process: [
        'Define use cases (live, podcast, classroom, worship…)',
        'Technical audit and budget constraints',
        'Shortlist approved with client',
        'Order and delivery follow-up',
        'Onboarding session and basic tuning'
      ],
      delivery: {
        normal: 'Shopping list within 5 days; supplier lead times often 2–6 weeks for imports.',
        express: 'Rush research within 48 h for urgent needs.',
        expressNote: 'Express consulting fees are separate from supplier logistics.'
      },
      faq: [
        { q: 'Do you sell hardware directly?', a: 'We advise and can centralize purchasing; hardware invoices are transparent — our fee is consulting.' },
        { q: 'Can you import equipment?', a: 'Yes, with shipping and customs estimates; timelines confirmed before you approve.' },
        { q: 'What is the minimum budget for a streaming kit?', a: 'Roughly 300,000 XOF for a solid entry kit; a firm quote follows the diagnostic.' },
        { q: 'Do you provide installation?', a: 'On-site setup in Lomé is optional; video tutorials are included for remote clients.' }
      ]
    }
  }
};
