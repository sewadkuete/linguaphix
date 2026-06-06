/**

 * Per-service booking configuration.

 * language-monthly / language-session-modes: online + in-person prices on package cards.

 * standard: single price from SERVICE_PAGES.

 */

(function () {

  function modePrices(online, inperson, popularOnline) {

    return {

      online: { priceXof: online, popular: Boolean(popularOnline) },

      inperson: { priceXof: inperson }

    };

  }



  /** Monthly rates by package × track × mode (XOF). */
  const COURS_TRACK_PRICES = {
    starter: {
      fle_general: { online: 35000, inperson: 45000 },
      fos: { online: 45000, inperson: 55000 },
      esl_general: { online: 35000, inperson: 45000 },
      esl_business: { online: 45000, inperson: 55000 }
    },
    intensive: {
      fle_general: { online: 68000, inperson: 85000 },
      fos: { online: 85000, inperson: 105000 },
      esl_general: { online: 68000, inperson: 85000 },
      esl_business: { online: 85000, inperson: 105000 }
    }
  };

  const COURS_TRACK_GROUPS = {
    fr: [
      {
        tier: 'general',
        title: 'Général',
        items: [
          { id: 'fle_general', language: 'Français', languageShort: 'FR', label: 'FLE (général)' },
          { id: 'esl_general', language: 'Anglais', languageShort: 'EN', label: 'ESL (général)' }
        ]
      },
      {
        tier: 'specialized',
        title: 'Spécialisé',
        items: [
          { id: 'fos', language: 'Français', languageShort: 'FR', label: 'FOS (spécialisé)' },
          {
            id: 'esl_business',
            language: 'Anglais',
            languageShort: 'EN',
            label: 'ESL (business) / ESP / EAP',
            labelShort: 'ESL pro. / ESP / EAP'
          }
        ]
      }
    ],
    en: [
      {
        tier: 'general',
        title: 'General',
        items: [
          { id: 'fle_general', language: 'French', languageShort: 'FR', label: 'FLE (general)' },
          { id: 'esl_general', language: 'English', languageShort: 'EN', label: 'ESL (general)' }
        ]
      },
      {
        tier: 'specialized',
        title: 'Specialized',
        items: [
          { id: 'fos', language: 'French', languageShort: 'FR', label: 'FOS (Specialized)' },
          {
            id: 'esl_business',
            language: 'English',
            languageShort: 'EN',
            label: 'ESL (business) / ESP / EAP',
            labelShort: 'ESL bus. / ESP / EAP'
          }
        ]
      }
    ]
  };

  const COURS_PACKAGES = {
    fr: {
      starter: {
        id: 'starter',
        name: 'Starter',
        subtitle: '4 séances / mois',
        schedule: ['1 h par séance', '1 séance / semaine', '4 séances / mois'],
        period: 'month',
        ...modePrices(35000, 45000, true)
      },
      intensive: {
        id: 'intensive',
        name: 'Intensif',
        subtitle: '8 séances / mois',
        schedule: ['1 h par séance', '2 séances / semaine', '8 séances / mois'],
        period: 'month',
        ...modePrices(68000, 85000)
      }
    },
    en: {
      starter: {
        id: 'starter',
        name: 'Starter',
        subtitle: '4 sessions / month',
        schedule: ['1 hour per session', '1 session per week', '4 sessions / month'],
        period: 'month',
        ...modePrices(35000, 45000, true)
      },
      intensive: {
        id: 'intensive',
        name: 'Intensive',
        subtitle: '8 sessions / month',
        schedule: ['1 hour per session', '2 sessions per week', '8 sessions / month'],
        period: 'month',
        ...modePrices(68000, 85000)
      }
    }
  };



  const LANGUES_SESSION_BOOKING = {

    tcf: {

      fr: {

        diagnostic: {

          id: 'diagnostic',

          name: 'Session diagnostic',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Test blanc et plan d\'action', 'En ligne ou présentiel'],

          period: 'session',

          ...modePrices(10000, 12000)

        },

        review: {

          id: 'review',

          name: 'Bilan pré-examen',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Simulation intégrale', 'Coaching dernière ligne'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        intensive: {

          id: 'intensive',

          name: 'Pack intensif',

          subtitle: '5-6 séances · ~10 h',

          schedule: ['90-120 min par séance', '5-6 séances structurées', '~10 h au total'],

          period: 'month',

          ...modePrices(50000, 55000, true)

        }

      },

      en: {

        diagnostic: {

          id: 'diagnostic',

          name: 'Diagnostic session',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Mock test & action plan', 'Online or in person'],

          period: 'session',

          ...modePrices(10000, 12000)

        },

        review: {

          id: 'review',

          name: 'Pre-exam review',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Full simulation', 'Last-mile coaching'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        intensive: {

          id: 'intensive',

          name: 'Intensive pack',

          subtitle: '5-6 sessions · ~10 h',

          schedule: ['90-120 min per session', '5-6 structured sessions', '~10 h total'],

          period: 'month',

          ...modePrices(50000, 55000, true)

        }

      }

    },

    ielts: {

      fr: {

        strategy: {

          id: 'strategy',

          name: 'Session stratégie',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'IELTS / TOEFL / Cambridge', 'Plan par compétence'],

          period: 'session',

          ...modePrices(10000, 12000)

        },

        simulation: {

          id: 'simulation',

          name: 'Simulation complète',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Test blanc chronométré', 'Debrief et priorités'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        coaching: {

          id: 'coaching',

          name: 'Coaching band score',

          subtitle: '5-6 séances · ~10 h',

          schedule: ['90-120 min par séance', '5-6 séances structurées', '~10 h au total'],

          period: 'month',

          ...modePrices(50000, 55000, true)

        }

      },

      en: {

        strategy: {

          id: 'strategy',

          name: 'Strategy session',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'IELTS / TOEFL / Cambridge', 'Skill-by-skill plan'],

          period: 'session',

          ...modePrices(10000, 12000)

        },

        simulation: {

          id: 'simulation',

          name: 'Full simulation',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Timed full mock', 'Debrief & priorities'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        coaching: {

          id: 'coaching',

          name: 'Band-score coaching',

          subtitle: '5-6 sessions · ~10 h',

          schedule: ['90-120 min per session', '5-6 structured sessions', '~10 h total'],

          period: 'month',

          ...modePrices(50000, 55000, true)

        }

      }

    },

    toeic: {

      fr: {

        diagnostic: {

          id: 'diagnostic',

          name: 'Diagnostic TOEIC',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Score estimé L&R', 'Planning personnalisé'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        sw: {

          id: 'sw',

          name: 'Speaking & Writing',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Modèles S&W', 'Correction rédaction'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        intensive: {

          id: 'intensive',

          name: 'Pack L&R intensif',

          subtitle: '5-6 séances · ~10 h',

          schedule: ['90-120 min par séance', '5-6 séances structurées', '~10 h au total'],

          period: 'month',

          ...modePrices(65000, 72000, true)

        }

      },

      en: {

        diagnostic: {

          id: 'diagnostic',

          name: 'TOEIC diagnostic',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Estimated L&R score', 'Personalized plan'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        sw: {

          id: 'sw',

          name: 'Speaking & Writing',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'S&W templates', 'Writing corrections'],

          period: 'session',

          ...modePrices(15000, 18000)

        },

        intensive: {

          id: 'intensive',

          name: 'Intensive L&R pack',

          subtitle: '5-6 sessions · ~10 h',

          schedule: ['90-120 min per session', '5-6 structured sessions', '~10 h total'],

          period: 'month',

          ...modePrices(65000, 72000, true)

        }

      }

    },

    interview: {

      fr: {

        discovery: {

          id: 'discovery',

          name: 'Session découverte',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Analyse poste / programme', 'Questions clés'],

          period: 'session',

          ...modePrices(25000, 30000)

        },

        confidence: {

          id: 'confidence',

          name: 'Pack confiance',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Simulations multiples', 'Coaching express'],

          period: 'session',

          ...modePrices(35000, 42000)

        },

        mock: {

          id: 'mock',

          name: 'Simulation interview',

          subtitle: '90-120 min · séance',

          schedule: ['90-120 min par séance', 'Entretien blanc + feedback', 'Plan 48 h'],

          period: 'session',

          ...modePrices(20000, 24000, true)

        }

      },

      en: {

        discovery: {

          id: 'discovery',

          name: 'Discovery session',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Role / program analysis', 'Key questions'],

          period: 'session',

          ...modePrices(25000, 30000)

        },

        confidence: {

          id: 'confidence',

          name: 'Confidence pack',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Multiple mocks', 'Express coaching'],

          period: 'session',

          ...modePrices(35000, 42000)

        },

        mock: {

          id: 'mock',

          name: 'Mock interview',

          subtitle: '90-120 min · session',

          schedule: ['90-120 min per session', 'Live mock + feedback', '48-hour plan'],

          period: 'session',

          ...modePrices(20000, 24000, true)

        }

      }

    },

    soutien: {
      fr: {
        focused: {
          id: 'focused',
          name: 'Heure ciblée',
          subtitle: '60 min · à l\'heure',
          schedule: [
            '60 min par séance',
            'Chapitre, devoir ou contrôle',
            'Fiches de révision',
            'Contact parent possible'
          ],
          period: 'hour',
          ...modePrices(10000, 12000)
        },
        weekly: {
          id: 'weekly',
          name: 'Suivi hebdomadaire',
          subtitle: '4 séances / mois',
          schedule: [
            '60 min par séance',
            '1 séance / semaine',
            'Programme officiel',
            'Bilan mensuel aux parents'
          ],
          period: 'month',
          ...modePrices(35000, 45000, true)
        },
        exam: {
          id: 'exam',
          name: 'Préparation examen',
          subtitle: '60 min · à l\'heure',
          schedule: [
            '60 min par séance',
            'Annales et sujets types',
            'Gestion du temps',
            'Planning de révision'
          ],
          period: 'hour',
          ...modePrices(10000, 12000)
        }
      },
      en: {
        focused: {
          id: 'focused',
          name: 'Focused hour',
          subtitle: '60 min · per hour',
          schedule: [
            '60 min per session',
            'Chapter, homework, or test',
            'Revision sheets',
            'Optional parent update'
          ],
          period: 'hour',
          ...modePrices(10000, 12000)
        },
        weekly: {
          id: 'weekly',
          name: 'Weekly support',
          subtitle: '4 sessions / month',
          schedule: [
            '60 min per session',
            '1 session per week',
            'Official curriculum',
            'Monthly parent report'
          ],
          period: 'month',
          ...modePrices(35000, 45000, true)
        },
        exam: {
          id: 'exam',
          name: 'Exam prep block',
          subtitle: '60 min · per hour',
          schedule: [
            '60 min per session',
            'Past papers and drills',
            'Time-management tips',
            'Revision timetable'
          ],
          period: 'hour',
          ...modePrices(10000, 12000)
        }
      }
    }

  };



  const LANGUES_WITH_LANGUAGE = new Set([]);

  const LANGUES_WITH_TRACK = new Set(['cours']);



  const LANGUES_WITH_MODE_PACKAGES = new Set([

    'cours', 'tcf', 'ielts', 'toeic', 'interview', 'soutien'

  ]);



  const BOOKING_PACKAGE_IDS = {

    cours: ['starter', 'intensive'],

    tcf: ['diagnostic', 'review', 'intensive'],

    ielts: ['strategy', 'simulation', 'coaching'],

    toeic: ['diagnostic', 'sw', 'intensive'],

    interview: ['discovery', 'confidence', 'mock'],

    soutien: ['focused', 'weekly', 'exam']

  };



  function getCoursPackages(lang) {

    return COURS_PACKAGES[lang] || COURS_PACKAGES.fr;

  }

  window.getCoursTrackGroups = function getCoursTrackGroups(lang) {
    return COURS_TRACK_GROUPS[lang] || COURS_TRACK_GROUPS.fr;
  };

  window.getCoursTracks = function getCoursTracks(lang) {
    return getCoursTrackGroups(lang).flatMap((group) =>
      group.items.map((item) => ({ id: item.id, label: item.label }))
    );
  };

  window.getCoursTrackPrice = function getCoursTrackPrice(packageId, trackId, mode) {
    const row = COURS_TRACK_PRICES[packageId]?.[trackId];
    if (!row || !mode) return null;
    const xof = row[mode];
    return Number.isFinite(xof) ? xof : null;
  };



  function getSessionModePackages(slug, lang) {

    const block = LANGUES_SESSION_BOOKING[slug];

    return block?.[lang] || block?.fr || null;

  }



  function getTraductionPackageSource(data, audience) {
    if (audience === 'entreprises' && data.businessPackages?.length) {
      return { list: data.businessPackages, idPrefix: 'biz' };
    }
    return { list: data.packages || [], idPrefix: 'pkg' };
  }

  function getStandardPackages(slug, lang) {

    const meta = window.SERVICE_PAGES?.[slug];

    const data = meta?.[lang] || meta?.fr;

    const audience =
      slug === 'traduction' && typeof getTraductionAudienceOrDefault === 'function'
        ? getTraductionAudienceOrDefault()
        : null;

    const source =
      slug === 'traduction'
        ? getTraductionPackageSource(data, audience)
        : { list: data?.packages || [], idPrefix: 'pkg' };

    if (!source.list?.length) return [];

    const ordered = orderPackagesForDisplay(source.list);

    return ordered.map((pkg) => {

      const i = source.list.indexOf(pkg);

      return {

        id: `${source.idPrefix}-${i}`,

        name: pkg.name,

        desc: pkg.desc || '',

        priceXof: pkg.priceXof,

        priceFromXof: pkg.priceFromXof,

        priceToXof: pkg.priceToXof,

        unit: pkg.unit || '',

        dualPageWord: Boolean(pkg.dualPageWord),

        quote: Boolean(pkg.quote),

        featured: Boolean(pkg.featured)

      };

    });

  }



  function resolveBookingPackageId(slug, index) {

    const ids = BOOKING_PACKAGE_IDS[slug];

    if (ids?.[index] != null) return ids[index];

    return `pkg-${index}`;

  }



  /** For 3-package rows: featured (Popular) card is always rightmost. */

  function orderPackagesForDisplay(packages) {

    if (!packages?.length) return [];

    if (packages.length !== 3) return [...packages];

    const list = [...packages];

    const fi = list.findIndex((p) => p.featured);

    if (fi >= 0 && fi !== list.length - 1) {

      const [featured] = list.splice(fi, 1);

      list.push(featured);

    }

    return list;

  }



  window.orderPackagesForDisplay = orderPackagesForDisplay;



  window.getServiceBookingConfig = function getServiceBookingConfig(slug, lang) {

    const meta = window.SERVICE_PAGES?.[slug];

    if (!meta) return null;



    const sessionPkgs = getSessionModePackages(slug, lang);

    const coursPkgs = slug === 'cours' ? getCoursPackages(lang) : null;

    const modePackages = coursPkgs || sessionPkgs;

    const usesModeCards = LANGUES_WITH_MODE_PACKAGES.has(slug);



    const base = {

      slug,

      category: meta.category,

      policyKey: meta.policyKey || slug,

      type: usesModeCards ? (slug === 'cours' ? 'language-monthly' : 'language-session-modes') : 'standard',

      showLanguage: LANGUES_WITH_LANGUAGE.has(slug),

      showTrack: LANGUES_WITH_TRACK.has(slug),

      showMode: true,

      coursPackages: modePackages,

      packages: usesModeCards ? null : getStandardPackages(slug, lang)

    };

    return base;

  };



  window.resolveBookingPackageId = resolveBookingPackageId;

})();


