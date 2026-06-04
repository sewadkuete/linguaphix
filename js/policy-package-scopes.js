/**
 * Per-package policy clause ids (see policy-content.js SERVICE_POLICIES items).
 */
(function () {
  const TRAD_SIMPLE = [
    'booking',
    'translation',
    'traduction_delivery',
    'payment',
    'confidentiality',
    'cancellation'
  ];
  const TRAD_VOLUME = [...TRAD_SIMPLE, 'refund'];
  const TRAD_OFFICIAL = [...TRAD_SIMPLE, 'refund'];
  const TRAD_BIZ = ['booking', 'translation', 'traduction_delivery', 'payment', 'corporate_training', 'confidentiality', 'cancellation', 'refund'];

  const DESIGN_LOGO_ESSENTIAL = [
    'quote',
    'deposit',
    'brief',
    'revisions',
    'timelines',
    'ownership',
    'cancellation',
    'prohibited'
  ];
  const DESIGN_LOGO_BRAND = [
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
  const DESIGN_LOGO_MOTION = [
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

  const MONTAGE_SHORT = ['quote', 'brief', 'revisions', 'timelines', 'payment', 'cancellation'];
  const MONTAGE_LONG = ['quote', 'deposit', 'brief', 'revisions', 'timelines', 'payment', 'cancellation', 'rush'];
  const MONTAGE_STANDARD = [
    'quote',
    'deposit',
    'brief',
    'revisions',
    'timelines',
    'ownership',
    'payment',
    'cancellation',
    'prohibited'
  ];

  const GRAPHIC_SOCIAL = ['brief', 'revisions', 'timelines', 'payment', 'ownership', 'cancellation'];
  const GRAPHIC_PRINT = ['brief', 'revisions', 'timelines', 'payment', 'ownership', 'licenses', 'cancellation'];
  const GRAPHIC_COMMS = ['brief', 'revisions', 'timelines', 'payment', 'ownership', 'portfolio', 'cancellation'];

  const LIVE_AUDIT = ['quote', 'payment', 'livestream_tech', 'confidentiality', 'timelines'];
  const LIVE_SUPPORT = ['payment', 'livestream_tech', 'timelines', 'cancellation', 'confidentiality'];
  const LIVE_CUSTOM = ['quote', 'brief', 'timelines', 'prohibited', 'confidentiality'];
  const LIVE_EVENT = ['quote', 'deposit', 'livestream_tech', 'timelines', 'payment', 'cancellation', 'confidentiality'];

  const QUOTE_FORMATION = ['quote', 'corporate_training', 'brief', 'payment', 'confidentiality', 'cancellation'];
  const QUOTE_TEAM = ['quote', 'corporate_training', 'deposit', 'payment', 'cancellation', 'confidentiality', 'refund'];
  const QUOTE_EXEC = ['quote', 'corporate_training', 'payment', 'confidentiality', 'recording', 'cancellation'];

  const MATERIEL_DIAG = ['quote', 'equipment_rental', 'timelines', 'payment', 'cancellation'];
  const MATERIEL_BUY = ['quote', 'deposit', 'equipment_rental', 'timelines', 'payment', 'ownership', 'cancellation'];
  const MATERIEL_FULL = ['quote', 'deposit', 'equipment_rental', 'brief', 'timelines', 'payment', 'ownership', 'cancellation'];

  const EXAM_SESSION = [
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
  const EXAM_INTENSIVE = [...EXAM_SESSION];

  const INTERVIEW_BASE = [
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

  const SOUTIEN_HOUR = [
    'booking',
    'cancellation',
    'noshow',
    'payment',
    'refund',
    'online',
    'recording',
    'materials',
    'confidentiality'
  ];
  const SOUTIEN_MONTHLY = [
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

  window.PACKAGE_POLICY_SCOPES = {
    cours: {
      starter: [
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
      ],
      intensive: [
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
      ]
    },
    tcf: {
      diagnostic: EXAM_SESSION,
      review: EXAM_SESSION,
      intensive: EXAM_INTENSIVE
    },
    ielts: {
      strategy: EXAM_SESSION,
      simulation: EXAM_SESSION,
      coaching: EXAM_INTENSIVE
    },
    toeic: {
      diagnostic: EXAM_SESSION,
      sw: EXAM_SESSION,
      intensive: EXAM_INTENSIVE
    },
    interview: {
      discovery: INTERVIEW_BASE,
      confidence: INTERVIEW_BASE,
      mock: INTERVIEW_BASE
    },
    soutien: {
      focused: SOUTIEN_HOUR,
      weekly: SOUTIEN_MONTHLY,
      exam: SOUTIEN_HOUR
    },
    traduction: {
      'pkg-0': TRAD_SIMPLE,
      'pkg-1': TRAD_VOLUME,
      'pkg-2': TRAD_OFFICIAL,
      'biz-0': TRAD_BIZ,
      'biz-1': TRAD_BIZ,
      'biz-2': TRAD_OFFICIAL
    },
    formation: {
      'pkg-0': QUOTE_FORMATION,
      'pkg-1': QUOTE_TEAM,
      'pkg-2': QUOTE_EXEC
    },
    logo: {
      'pkg-0': DESIGN_LOGO_ESSENTIAL,
      'pkg-1': DESIGN_LOGO_BRAND,
      'pkg-2': DESIGN_LOGO_MOTION
    },
    montage: {
      'pkg-0': MONTAGE_SHORT,
      'pkg-1': MONTAGE_LONG,
      'pkg-2': MONTAGE_STANDARD
    },
    graphic: {
      'pkg-0': GRAPHIC_SOCIAL,
      'pkg-1': GRAPHIC_PRINT,
      'pkg-2': GRAPHIC_COMMS
    },
    livestream: {
      'pkg-0': LIVE_AUDIT,
      'pkg-1': LIVE_SUPPORT,
      'pkg-2': LIVE_CUSTOM,
      'pkg-3': LIVE_EVENT
    },
    materiel: {
      'pkg-0': MATERIEL_DIAG,
      'pkg-1': MATERIEL_BUY,
      'pkg-2': MATERIEL_FULL
    }
  };

  /** Extra clauses merged when user picks online / in-person on mode packages */
  window.MODE_POLICY_ADDONS = {
    online: ['online', 'online_platform'],
    inperson: ['inperson_location']
  };

  window.LANGUES_MODE_PACKAGE_SERVICES = new Set([
    'cours',
    'tcf',
    'ielts',
    'toeic',
    'interview',
    'soutien'
  ]);
})();
