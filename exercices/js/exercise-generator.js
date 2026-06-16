/**
 * Generates 40 exercises per level×category (8 per type).
 * Templates keyed by language + category; level adjusts difficulty labels.
 */
(function (global) {
  const PER_TYPE = 8;
  const TYPES = ["gap", "mcq", "matching", "flashcard", "transform"];

  /* ── FLE question banks (representative sets per category) ── */
  const FLE = {
    nom: {
      gap: [
        { sentence: "Je mange ___ pain et ___ salade.", answer: "du / de la", hint: "article partitif", explanation: "Substances → du (masc.), de la (fém.)." },
        { sentence: "___ enfants jouent dans ___ parc.", answer: "Les / le", hint: "article défini", explanation: "Les (pluriel) + le parc (masc. sing.)." },
        { sentence: "C'est ___ belle ___ .", answer: "une / maison", hint: "indéfini + nom", explanation: "Une devant consonne ; belle s'accorde au féminin." },
        { sentence: "Il n'y a pas ___ sucre dans ___ thé.", answer: "de / le", hint: "négation + défini", explanation: "Après pas → de ; le thé = défini connu." },
        { sentence: "Nous avons acheté ___ livres et ___ magazine.", answer: "des / un", hint: "indéfini pluriel/singulier", explanation: "Des livres (pl.) ; un magazine (masc.)." },
        { sentence: "Elle va à ___ école près de ___ gare.", answer: "l' / la", hint: "élision", explanation: "École → l' (voyelle) ; gare → la (fém.)." },
        { sentence: "Je bois ___ eau et ___ café.", answer: "de l' / du", hint: "partitif", explanation: "Eau (fém.) → de l' ; café (masc.) → du." },
        { sentence: "___ professeur parle aux ___ .", answer: "Le / élèves", hint: "défini + pluriel", explanation: "Le professeur (masc.) ; les élèves (pl.)." }
      ],
      mcq: [
        { question: "Après « ne…pas », quel article ?", options: ["du", "de", "le", "un"], correct: 1, explanation: "Négation → de/d' sans article." },
        { question: "« ___ ami » (masc. sing.)", options: ["Le", "La", "Les", "Une"], correct: 0, explanation: "Ami est masculin singulier → le/ un." },
        { question: "Partitif devant « eau » ?", options: ["du", "de la", "de l'", "des"], correct: 2, explanation: "Eau féminin → de l'eau." },
        { question: "Pluriel de « un chat » ?", options: ["un chats", "des chat", "des chats", "les chats"], correct: 2, explanation: "Un → des au pluriel indéfini." },
        { question: "« à + le » = ?", options: ["à le", "au", "du", "aux"], correct: 1, explanation: "Contraction obligatoire : au." },
        { question: "Genre de « table » ?", options: ["masculin", "féminin", "neutre", "variable"], correct: 1, explanation: "La table → féminin." },
        { question: "« ___ États-Unis »", options: ["Le", "La", "Les", "Des"], correct: 2, explanation: "Pays pluriel → les." },
        { question: "Article zéro : « Il est ___ . »", options: ["un médecin", "médecin", "le médecin", "du médecin"], correct: 1, explanation: "Attribut de profession → pas d'article." }
      ],
      matching: [
        { left: "le / la / les", right: "article défini", category: "Articles" },
        { left: "un / une / des", right: "article indéfini", category: "Articles" },
        { left: "du / de la / de l'", right: "article partitif", category: "Articles" },
        { left: "de ( après pas )", right: "négation", category: "Articles" },
        { left: "au / aux", right: "à + le/les", category: "Contractions" },
        { left: "du / des", right: "de + le/les", category: "Contractions" },
        { left: "genre M/F", right: "à mémoriser", category: "Nom" },
        { left: "pluriel en -s", right: "règle régulière", category: "Nom" }
      ],
      flashcard: [
        { front: "Article défini masculin singulier ?", back: "le (+ nom masc. sing.) — ex. le livre", category: "Articles" },
        { front: "Partitif devant nom masc. ?", back: "du — ex. du pain", category: "Articles" },
        { front: "Négation + partitif ?", back: "de / d' — ex. pas de pain", category: "Articles" },
        { front: "à + le = ?", back: "au — ex. au marché", category: "Contractions" },
        { front: "de + les = ?", back: "des — ex. des enfants (possession)", category: "Contractions" },
        { front: "Pluriel indéfini ?", back: "des — ex. des stylos", category: "Pluriel" },
        { front: "Attribut profession sans article ?", back: "Il est médecin (pas un médecin)", category: "Article zéro" },
        { front: "Genre : comment l'apprendre ?", back: "Mot par mot avec l'article (le/la)", category: "Genre" }
      ],
      transform: [
        { instruction: "Mettez à la forme négative.", original: "J'ai du lait.", answer: "Je n'ai pas de lait.", explanation: "Partitif → de après négation." },
        { instruction: "Mettez au pluriel.", original: "un chat noir", answer: "des chats noirs", explanation: "Article + nom + adj. s'accordent." },
        { instruction: "Contractez la préposition.", original: "Je vais à le cinéma.", answer: "Je vais au cinéma.", explanation: "à + le = au." },
        { instruction: "Remplacez par un partitif.", original: "Je mange du pain.", answer: "Je mange du pain.", explanation: "Déjà correct — du pain." },
        { instruction: "Article défini ou indéfini ? Corrigez.", original: "C'est le nouveau professeur.", answer: "C'est un nouveau professeur.", explanation: "Première mention → indéfini." },
        { instruction: "Mettez « de la » ou « du ».", original: "Elle achète ___ viande.", answer: "Elle achète de la viande.", explanation: "Viande = fém. → de la." },
        { instruction: "Contractez.", original: "Le livre de le professeur", answer: "Le livre du professeur", explanation: "de + le = du." },
        { instruction: "Forme négative.", original: "Il y a des problèmes.", answer: "Il n'y a pas de problèmes.", explanation: "des → de après pas." }
      ]
    },
    verb: {
      gap: [
        { sentence: "Nous ___ (parler) français en classe.", answer: "parlons", hint: "verbe -er, 1re pl.", explanation: "Parler → nous parlons." },
        { sentence: "Tu ___ (être) étudiant ?", answer: "es", hint: "être, 2e sing.", explanation: "Tu es." },
        { sentence: "Ils ___ (aller) au cinéma demain.", answer: "vont", hint: "aller, 3e pl.", explanation: "Aller → ils vont." },
        { sentence: "Je ___ (avoir) faim.", answer: "ai", hint: "avoir, 1re sing.", explanation: "J'ai faim." },
        { sentence: "Elle ___ (finir) ses devoirs.", answer: "finit", hint: "verbe -ir, 3e sing.", explanation: "Finir → elle finit." },
        { sentence: "Vous ___ (prendre) le bus ?", answer: "prenez", hint: "prendre, 2e pl.", explanation: "Prendre → vous prenez." },
        { sentence: "Demain, je ___ (aller) voyager.", answer: "vais", hint: "futur proche", explanation: "Futur proche : aller + infinitif → je vais voyager." },
        { sentence: "___ (Parler) plus fort, s'il te plaît !", answer: "Parle", hint: "impératif tu", explanation: "Impératif 2e sing. -er : pas de -s." }
      ],
      mcq: [
        { question: "« Ils ___ contents. »", options: ["est", "es", "sont", "sommes"], correct: 2, explanation: "Ils → sont (être)." },
        { question: "Futur proche de « manger » (je)", options: ["je mange", "je vais manger", "je mangerai", "je mangeais"], correct: 1, explanation: "Futur proche = aller + infinitif." },
        { question: "Impératif « parler » (tu)", options: ["Parles", "Parle", "Parlez", "Parlons"], correct: 1, explanation: "Pas de -s à l'impératif tu des -er." },
        { question: "« Nous ___ (avoir) un chat. »", options: ["a", "as", "avons", "avez"], correct: 2, explanation: "Nous avons." },
        { question: "3e pers. sing. de « finir »", options: ["finis", "finit", "finissons", "finissent"], correct: 1, explanation: "Il/elle finit." },
        { question: "Passé composé de « manger » (il)", options: ["il mange", "il a mangé", "il mangeait", "il mangera"], correct: 1, explanation: "Avoir + participe passé." },
        { question: "« Tu ___ (pouvoir) m'aider ? »", options: ["peux", "peut", "pouvons", "peuvent"], correct: 0, explanation: "Tu peux." },
        { question: "Présent de « être » (vous)", options: ["es", "est", "êtes", "sont"], correct: 2, explanation: "Vous êtes." }
      ],
      matching: [
        { left: "je suis / tu es", right: "être (présent)", category: "Verbes" },
        { left: "j'ai / tu as", right: "avoir (présent)", category: "Verbes" },
        { left: "je parle / nous parlons", right: "verbe -er", category: "Verbes" },
        { left: "je vais + infinitif", right: "futur proche", category: "Temps" },
        { left: "avoir + participe passé", right: "passé composé", category: "Temps" },
        { left: "Parle ! / Parlez !", right: "impératif", category: "Mode" },
        { left: "il/elle/on + 3e sing.", right: "accord sujet-verbe", category: "Syntaxe" },
        { left: "aller / venir", right: "verbes fréquents", category: "Verbes" }
      ],
      flashcard: [
        { front: "Futur proche ?", back: "aller (conjugué) + infinitif — Je vais partir.", category: "Temps" },
        { front: "Passé composé ?", back: "avoir/être + p.p. — J'ai mangé.", category: "Temps" },
        { front: "Impératif tu (-er) ?", back: "Radical sans -s — Parle !", category: "Mode" },
        { front: "Nous form of parler ?", back: "parlons", category: "Conjugaison" },
        { front: "Ils form of être ?", back: "sont", category: "Conjugaison" },
        { front: "Elle form of avoir ?", back: "a", category: "Conjugaison" },
        { front: "Présent = quelles valeurs ?", back: "Habituel, vérité générale, en cours", category: "Temps" },
        { front: "Verbe pronominal au PC ?", back: "Auxiliaire être + accord — Elle s'est levée.", category: "Pronominal" }
      ],
      transform: [
        { instruction: "Mettez au futur proche.", original: "Je mange une pizza.", answer: "Je vais manger une pizza.", explanation: "Aller + infinitif." },
        { instruction: "Mettez à la forme négative.", original: "Tu parles anglais.", answer: "Tu ne parles pas anglais.", explanation: "ne…pas encadrant." },
        { instruction: "Mettez à l'impératif (tu).", original: "Tu écoutes.", answer: "Écoute !", explanation: "Impératif affirmatif tu." },
        { instruction: "Mettez au passé composé.", original: "Il mange une pomme.", answer: "Il a mangé une pomme.", explanation: "Avoir + mangé." },
        { instruction: "Conjuguez « finir » (nous, présent).", original: "Nous ___ nos devoirs.", answer: "Nous finissons nos devoirs.", explanation: "Finir → finissons." },
        { instruction: "Question avec inversion.", original: "Tu viens.", answer: "Viens-tu ?", explanation: "Inversion sujet-verbe (soutenu)." },
        { instruction: "Mettez « est-ce que ».", original: "Tu aimes le café ?", answer: "Est-ce que tu aimes le café ?", explanation: "Interrogation neutre." },
        { instruction: "Mettez au présent (ils, prendre).", original: "Ils ___ le train.", answer: "Ils prennent le train.", explanation: "Prendre → ils prennent." }
      ]
    }
  };

  /* ── ESL question banks ── */
  const ESL = {
    nom: {
      gap: [
        { sentence: "I saw ___ dog. ___ dog was big.", answer: "a / The", hint: "indefinite then definite", explanation: "First mention → a ; second → the." },
        { sentence: "She needs ___ hour to finish.", answer: "an", hint: "vowel sound", explanation: "Hour starts with vowel sound → an." },
        { sentence: "___ information you gave was useful.", answer: "The", hint: "definite", explanation: "Specific information → the." },
        { sentence: "There are three ___ on the table.", answer: "books", hint: "regular plural", explanation: "Book → books." },
        { sentence: "I don't have ___ money.", answer: "any", hint: "negative", explanation: "Negative → any (or no)." },
        { sentence: "___ children are playing outside.", answer: "The", hint: "definite plural", explanation: "Known children → the." },
        { sentence: "Would you like ___ cup of tea?", answer: "a", hint: "indefinite", explanation: "One non-specific cup → a." },
        { sentence: "___ water is essential for life.", answer: "—", answerAlt: [""], hint: "uncountable general", explanation: "General uncountable → no article." }
      ],
      mcq: [
        { question: "Choose: ___ university student", options: ["a", "an", "the", "—"], correct: 0, explanation: "University = /juː/ consonant sound → a." },
        { question: "Plural of 'child'", options: ["childs", "children", "childes", "childrens"], correct: 1, explanation: "Irregular plural: children." },
        { question: "'Advice' is…", options: ["countable", "uncountable", "always plural", "both"], correct: 1, explanation: "Advice is uncountable." },
        { question: "Correct: ___ news is good.", options: ["A", "An", "The", "Some news are"], correct: 2, explanation: "Specific news → the ; news is singular." },
        { question: "'Two ___' (foot)", options: ["foots", "feet", "footes", "feets"], correct: 1, explanation: "Irregular: foot → feet." },
        { question: "General statement: ___ love music.", options: ["The people", "People", "A people", "Peoples"], correct: 1, explanation: "General plural → no article." },
        { question: "___ honest man", options: ["a", "an", "the", "—"], correct: 1, explanation: "Silent h → vowel sound → an." },
        { question: "Some + uncountable?", options: ["some waters", "some water", "a water", "many water"], correct: 1, explanation: "Some + uncountable noun." }
      ],
      matching: [
        { left: "a / an", right: "indefinite article", category: "Articles" },
        { left: "the", right: "definite article", category: "Articles" },
        { left: "-s / -es", right: "regular plural", category: "Nouns" },
        { left: "man → men", right: "irregular plural", category: "Nouns" },
        { left: "water, advice", right: "uncountable", category: "Nouns" },
        { left: "a piece of", right: "counting uncountables", category: "Nouns" },
        { left: "no article", right: "general plural/uncountable", category: "Articles" },
        { left: "some / any", right: "indefinite quantity", category: "Quantifiers" }
      ],
      flashcard: [
        { front: "a vs an rule?", back: "Consonant SOUND → a ; vowel SOUND → an", category: "Articles" },
        { front: "When use 'the'?", back: "Shared knowledge, unique things, second mention", category: "Articles" },
        { front: "Uncountable nouns?", back: "No a/an, no plural -s — water, advice, news", category: "Nouns" },
        { front: "Regular plural?", back: "Add -s/-es — cats, boxes", category: "Nouns" },
        { front: "Irregular example?", back: "child → children ; person → people", category: "Nouns" },
        { front: "Measure phrase?", back: "a glass of water, a piece of advice", category: "Nouns" },
        { front: "General plural?", back: "No article — I like dogs / People need water", category: "Articles" },
        { front: "Some in offers?", back: "Would you like some tea?", category: "Quantifiers" }
      ],
      transform: [
        { instruction: "Make plural.", original: "one child, two foot", answer: "one child, two feet / two children", explanation: "Irregular plurals." },
        { instruction: "Add articles.", original: "I read book. Book is interesting.", answer: "I read a book. The book is interesting.", explanation: "First → a ; second → the." },
        { instruction: "Correct the article.", original: "She gave me an useful advice.", answer: "She gave me some useful advice.", explanation: "Advice uncountable → some, no an." },
        { instruction: "Negative form.", original: "I have some money.", answer: "I don't have any money.", explanation: "Some → any in negatives." },
        { instruction: "Use measure phrase.", original: "a water", answer: "a glass of water", explanation: "Uncountable needs measure." },
        { instruction: "Correct plural.", original: "three mans", answer: "three men", explanation: "man → men." },
        { instruction: "General statement.", original: "The dogs are loyal animals.", answer: "Dogs are loyal animals.", explanation: "General → no article." },
        { instruction: "a or an?", original: "a hour", answer: "an hour", explanation: "Silent h → an." }
      ]
    },
    verb: {
      gap: [
        { sentence: "She ___ (work) in London.", answer: "works", hint: "present simple, 3rd sing.", explanation: "He/she/it + verb-s." },
        { sentence: "I ___ (not / like) coffee.", answer: "don't like", hint: "negative present", explanation: "Don't + base form." },
        { sentence: "They ___ (study) now.", answer: "are studying", hint: "present continuous", explanation: "Am/is/are + -ing for now." },
        { sentence: "We ___ (go) to Paris last year.", answer: "went", hint: "past simple", explanation: "Past time → past simple." },
        { sentence: "He ___ (can) swim very well.", answer: "can", hint: "modal", explanation: "Modal + base form." },
        { sentence: "I ___ (just / finish) my homework.", answer: "have just finished", hint: "present perfect", explanation: "Have/has + past participle." },
        { sentence: "It ___ (rain) when we arrived.", answer: "was raining", hint: "past continuous", explanation: "Background action → was/were + -ing." },
        { sentence: "She ___ (meet) him tomorrow.", answer: "is going to meet", hint: "future plan", explanation: "Going to for plans." }
      ],
      mcq: [
        { question: "Present simple: He ___ to school.", options: ["go", "goes", "going", "is go"], correct: 1, explanation: "3rd person singular → goes." },
        { question: "Past of 'buy'", options: ["buyed", "bought", "buys", "buying"], correct: 1, explanation: "Irregular: bought." },
        { question: "Present perfect: I ___ never ___ there.", options: ["have / been", "has / been", "had / be", "am / been"], correct: 0, explanation: "Have + past participle." },
        { question: "Modal for ability", options: ["must", "can", "should", "will"], correct: 1, explanation: "Can = ability." },
        { question: "Negative past: She ___ come.", options: ["don't", "doesn't", "didn't", "wasn't"], correct: 2, explanation: "Didn't + base form." },
        { question: "Future with 'will' for instant decision", options: ["I'll help you!", "I'm helping you!", "I help you!", "I helped you!"], correct: 0, explanation: "Will for spontaneous decision." },
        { question: "Present continuous now", options: ["She reads.", "She is reading.", "She read.", "She has read."], correct: 1, explanation: "Action in progress → -ing." },
        { question: "Past participle of 'write'", options: ["writed", "wrote", "written", "writing"], correct: 2, explanation: "Write – wrote – written." }
      ],
      matching: [
        { left: "works / goes", right: "present simple 3rd -s", category: "Tenses" },
        { left: "am/is/are + -ing", right: "present continuous", category: "Tenses" },
        { left: "did + base", right: "past simple negative", category: "Tenses" },
        { left: "have/has + pp", right: "present perfect", category: "Tenses" },
        { left: "will + base", right: "future simple", category: "Tenses" },
        { left: "can / must / should", right: "modals", category: "Modals" },
        { left: "was/were + -ing", right: "past continuous", category: "Tenses" },
        { left: "going to + base", right: "future plan", category: "Tenses" }
      ],
      flashcard: [
        { front: "Present simple 3rd person?", back: "Add -s/-es — He works, She goes", category: "Tenses" },
        { front: "Present continuous form?", back: "am/is/are + verb-ing", category: "Tenses" },
        { front: "Present perfect form?", back: "have/has + past participle", category: "Tenses" },
        { front: "Past simple regular?", back: "verb + -ed — walked, played", category: "Tenses" },
        { front: "Modal + verb?", back: "Base form — can go, must study", category: "Modals" },
        { front: "Past continuous?", back: "was/were + -ing", category: "Tenses" },
        { front: "Future with plan?", back: "going to + base", category: "Tenses" },
        { front: "Irregular past example?", back: "go → went ; see → saw", category: "Tenses" }
      ],
      transform: [
        { instruction: "Make negative.", original: "She likes tea.", answer: "She doesn't like tea.", explanation: "Doesn't + base form." },
        { instruction: "Make question.", original: "They live here.", answer: "Do they live here?", explanation: "Do/Does + subject + base." },
        { instruction: "Put in past simple.", original: "I visit my grandma.", answer: "I visited my grandma.", explanation: "Regular → -ed." },
        { instruction: "Present continuous.", original: "He reads a book.", answer: "He is reading a book.", explanation: "Is + -ing." },
        { instruction: "Present perfect with 'just'.", original: "She arrives.", answer: "She has just arrived.", explanation: "Has + just + pp." },
        { instruction: "Use 'going to'.", original: "We will travel next week.", answer: "We are going to travel next week.", explanation: "Plan → going to." },
        { instruction: "Add modal (must).", original: "You finish your work.", answer: "You must finish your work.", explanation: "Must + base." },
        { instruction: "Past continuous.", original: "It rains at 8 pm yesterday.", answer: "It was raining at 8 pm yesterday.", explanation: "Background → was raining." }
      ]
    }
  };

  function synthesizeFromPoint(lang, catId, type, point, index, level) {
    const isFr = lang === "fr";
    const p = point.replace(/[()]/g, "").trim();
    if (type === "gap") {
      return {
        sentence: isFr ? `Complétez (point : ${p}) : « Il ___ … »` : `Complete (${p}): "She ___ …"`,
        answer: isFr ? "…" : "…",
        hint: p,
        explanation: isFr ? `Règle : ${p} (niveau ${level}).` : `Rule: ${p} (level ${level}).`
      };
    }
    if (type === "mcq") {
      return {
        question: isFr ? `Concernant « ${p} », quelle affirmation est correcte ?` : `About "${p}", which is correct?`,
        options: isFr ? ["Option A correcte", "Option B", "Option C", "Option D"] : ["Correct option A", "Option B", "Option C", "Option D"],
        correct: 0,
        explanation: isFr ? `Point clé : ${p}.` : `Key point: ${p}.`
      };
    }
    if (type === "matching") {
      return { left: p, right: isFr ? "définition / exemple" : "definition / example", category: p.split(/[/\s]/)[0] };
    }
    if (type === "flashcard") {
      return {
        front: (isFr ? "Dans une phrase du niveau " + level + ", quel choix convient pour : " : "In a " + level + " sentence, which form fits: ") + p + " ?",
        back: isFr ? "Voir le précis de cours, section « " + p + " »." : "See course notes, section « " + p + " ».",
        category: p,
        options: isFr
          ? ["Forme A (analyser le contexte)", "Forme B", "Forme C", "Forme D"]
          : ["Form A (analyse context)", "Form B", "Form C", "Form D"],
        correct: 0
      };
    }
    return {
      instruction: isFr ? `Appliquez : ${p}` : `Apply: ${p}`,
      original: isFr ? "Phrase modèle à transformer." : "Model sentence to transform.",
      answer: isFr ? "Phrase transformée selon la règle." : "Transformed sentence following the rule.",
      explanation: p
    };
  }

  function levelBand(level) {
    if (level === "A1" || level === "A2") return "A1";
    if (level === "B1" || level === "B2") return "B1";
    return "C1";
  }

  function getBank(lang, level, catId, type) {
    const banks = lang === "fr" ? FLE : ESL;
    const ext = global.ExerciseBanksExtended;
    const band = levelBand(level);
    if (ext && ext[lang] && ext[lang]._byLevel && ext[lang]._byLevel[band] &&
        ext[lang]._byLevel[band][catId] && ext[lang]._byLevel[band][catId][type]) {
      return ext[lang]._byLevel[band][catId][type];
    }
    if (ext && ext[lang] && ext[lang][catId] && ext[lang][catId][type]) {
      return ext[lang][catId][type];
    }
    if (banks[catId] && banks[catId][type]) return banks[catId][type];
    return [];
  }

  function cloneItem(item, id, type) {
    const copy = JSON.parse(JSON.stringify(item));
    copy._id = id;
    copy.type = type;
    return copy;
  }

  function generateExerciseSet(lang, level, catId, catData) {
    const points = (catData && catData.points) || ["Point grammatical"];
    const exercises = [];
    let id = 1;

    TYPES.forEach(function (type) {
      const bank = getBank(lang, level, catId, type);
      const typeItems = [];
      for (let i = 0; i < PER_TYPE; i++) {
        let item;
        if (bank[i]) {
          item = cloneItem(bank[i], id, type);
        } else if (bank[i % bank.length]) {
          item = cloneItem(bank[i % bank.length], id, type);
          item._variant = i;
        } else {
          item = synthesizeFromPoint(lang, catId, type, points[i % points.length], i, level);
          item._id = id;
          item.type = type;
        }
        item.number = id;
        typeItems.push(item);
        id++;
      }
      if (type === "flashcard") {
        typeItems.forEach(function (fc, fi) {
          var item = fc;
          if (global.FlashcardOptions && global.FlashcardOptions.hardenFlashcard) {
            item = global.FlashcardOptions.hardenFlashcard(fc, lang, catId, fi);
          }
          item.number = fc.number;
          item.type = "flashcard";
          exercises.push(item);
        });
      } else {
        typeItems.forEach(function (it) { exercises.push(it); });
      }
    });

    return exercises;
  }

  global.ExerciseGenerator = {
    PER_TYPE: PER_TYPE,
    TYPES: TYPES,
    generateExerciseSet: generateExerciseSet
  };
})(typeof window !== "undefined" ? window : global);
