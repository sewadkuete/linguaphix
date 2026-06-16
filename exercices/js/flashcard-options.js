/**
 * Flashcards à choix multiples exigeantes — énoncé en contexte, pas de réponse évidente.
 */
(function (global) {
  const CONTEXTS = {
    fr: {
      nom: [
        { front: "« Il mange ___ pain frais. » — Quel article convient ?", options: ["du", "de la", "le", "des"], correct: 0, back: "Partitif masculin singulier = du." },
        { front: "« Elle va ___ école à huit heures. »", options: ["à l'", "au", "en", "à la"], correct: 0, back: "École → voyelle → à l'école." },
        { front: "« Je n'ai pas ___ argent sur moi. » — Après négation ?", options: ["de", "de l'", "du", "des"], correct: 0, back: "Négation → de/d' (pas du/de la)." },
        { front: "« C'est ___ professeur de mathématiques. » — Première mention ?", options: ["un", "le", "du", "— (sans article)"], correct: 0, back: "Première mention → un/une." },
        { front: "« Il est ___ médecin à l'hôpital. » — Profession ?", options: ["— (sans article)", "un", "le", "du"], correct: 0, back: "Attribut de profession → pas d'article." },
        { front: "« Nous habitons ___ États-Unis. »", options: ["aux", "en", "au", "les"], correct: 0, back: "à + les (pays pl.) = aux." },
        { front: "« Tu veux ___ eau ? »", options: ["de l'", "du", "de la", "la"], correct: 0, back: "Partitif fém. → de l'eau." },
        { front: "« ___ livres sur la table sont à moi. »", options: ["Les", "Des", "De", "Un"], correct: 0, back: "Référence définie → les." }
      ],
      verb: [
        { front: "« Demain, nous ___ visiter le musée. »", options: ["allons", "sommes", "avons", "irons"], correct: 0, back: "Futur proche : aller + infinitif." },
        { front: "« Hier, elle ___ son examen. » (finir)", options: ["a fini", "finissait", "finit", "va finir"], correct: 0, back: "Passé composé : auxiliaire + participe passé." },
        { front: "« Quand j'étais petit, je ___ au parc chaque dimanche. »", options: ["allais", "suis allé", "vais", "irai"], correct: 0, back: "Habitude passée → imparfait." },
        { front: "« ___ plus fort, s'il te plaît ! » (parler, tu)", options: ["Parle", "Parles", "Parlez", "Parlons"], correct: 0, back: "Impératif tu -er : pas de -s." },
        { front: "« Ils ___ fatigués après le voyage. »", options: ["sont", "est", "es", "sommes"], correct: 0, back: "Ils → sont." },
        { front: "« Tu ___ me prêter ton stylo ? »", options: ["peux", "peut", "pouvons", "puisse"], correct: 0, back: "Tu → peux." },
        { front: "« Si tu viens, nous ___ contents. »", options: ["serons", "serions", "sommes", "étions"], correct: 0, back: "Si + présent → futur." },
        { front: "« Elle ___ ses devoirs tous les soirs. » (finir)", options: ["finit", "finissait", "a fini", "finira"], correct: 0, back: "Habitude → présent." }
      ],
      adj: [
        { front: "« Elle est ___ que sa sœur. » (grand)", options: ["plus grande", "plus grand", "grander", "la plus grand"], correct: 0, back: "Comparatif accordé au féminin." },
        { front: "« C'est le film ___ intéressant de l'année. »", options: ["le plus", "plus", "le mieux", "pluser"], correct: 0, back: "Superlatif : le plus + adj." },
        { front: "« Des robes ___ . » (orange)", options: ["orange", "oranges", "orangées", "orangers"], correct: 0, back: "Couleur simple → invariable." },
        { front: "« Il est ___ content de sa note. »", options: ["bien", "bon", "meilleur", "bonne"], correct: 0, back: "Adverbe bien avec content." },
        { front: "« Une ___ histoire vraie. » (touchant)", options: ["touchante", "touchant", "touchants", "touchamment"], correct: 0, back: "Participe adj. accordé fém." },
        { front: "« ___ maison blanche. » — Ordre des adjectifs ?", options: ["Une grande", "Une blanche grande", "Grande une", "Blanche une"], correct: 0, back: "BAGS avant le nom ; couleur après." },
        { front: "« Ce pain est ___ bon. »", options: ["meilleur", "plus bon", "bonner", "le bon"], correct: 0, back: "Bon → meilleur." },
        { front: "« Les portes sont ___ . » (fermer)", options: ["fermées", "fermé", "fermés", "fermant"], correct: 0, back: "PP adj. fém. pl." }
      ],
      pron: [
        { front: "« Tu aimes ce film ? — Oui, je ___ aime. »", options: ["le", "lui", "y", "en"], correct: 0, back: "COD masc. → le." },
        { front: "« Je téléphone à Marie. → Je ___ téléphone. »", options: ["lui", "le", "y", "en"], correct: 0, back: "COI → lui." },
        { front: "« Tu vas à Paris ? — Oui, j'___ vais. »", options: ["y", "en", "lui", "le"], correct: 0, back: "Lieu → y." },
        { front: "« Tu as des enfants ? — Oui, j'___ ai deux. »", options: ["en", "y", "les", "leur"], correct: 0, back: "Partitive → en." },
        { front: "« ___ livre est à toi ? »", options: ["Quel", "Qui", "Que", "Lequel"], correct: 0, back: "Quel + nom." },
        { front: "« L'homme ___ je parle est professeur. »", options: ["à qui", "que", "dont", "où"], correct: 0, back: "Parler à → à qui." },
        { front: "« Donne-___ ! » (COD le, impératif)", options: ["le-moi", "moi-le", "me le", "le me"], correct: 0, back: "Impératif : verbe + le + moi." },
        { front: "« ___ est venu ? » — Sujet ?", options: ["Qui", "Que", "Quoi", "Lequel"], correct: 0, back: "Sujet → Qui." }
      ],
      adv: [
        { front: "« Il ___ mange de viande. » — Restriction ?", options: ["ne…que", "ne…pas", "ne…plus", "ne…jamais"], correct: 0, back: "Ne…que = seulement." },
        { front: "« Elle parle ___ . » (lent)", options: ["lentement", "lente", "lent", "lente ment"], correct: 0, back: "Adj. fém. + -ment." },
        { front: "« Je ___ fume. » — Cessation ?", options: ["ne…plus", "ne…pas", "ne…que", "ne…rien"], correct: 0, back: "Ne…plus." },
        { front: "« Il est ___ grand pour son âge. »", options: ["très", "très bon", "plus", "mieux"], correct: 0, back: "Très + adj." },
        { front: "« ___ , il a changé d'avis. »", options: ["Cependant", "Cependant que", "Cependant de", "En cependant"], correct: 0, back: "Connecteur d'opposition." },
        { front: "« Elle travaille ___ . » (toujours)", options: ["toujours", "jamais", "tout", "tous"], correct: 0, back: "Fréquence après verbe." },
        { front: "« Il parle ___ français. »", options: ["bien", "bon", "meilleur", "bonne"], correct: 0, back: "Adverbe bien + verbe." },
        { front: "« ___ personne n'est parfait. »", options: ["Nulle", "Aucune", "Personne", "Rien"], correct: 0, back: "Nulle personne (soutenu)." }
      ],
      disc: [
        { front: "« ___ tu viens demain ? » — Neutre ?", options: ["Est-ce que", "Est-ce", "Est", "Es-ce que"], correct: 0, back: "Est-ce que + SVO." },
        { front: "« Il a dit ___ il partirait. »", options: ["que", "si", "quoi", "dont"], correct: 0, back: "Discours indirect : que." },
        { front: "« ___ il pleut, nous restons. » — Cause ?", options: ["Comme", "Comment", "Combien", "Quand"], correct: 0, back: "Comme = cause connue." },
        { front: "« Je cherche quelqu'un ___ parle chinois. »", options: ["qui", "que", "dont", "où"], correct: 0, back: "Relatif sujet → qui." },
        { front: "« ___ tu le savais, tu aurais agi autrement. »", options: ["Si", "Que", "Quand", "Comme"], correct: 0, back: "Si + PQP → conditionnel passé." },
        { front: "« C'est ___ qui a gagné. » — Clivée ?", options: ["lui", "le", "y", "en"], correct: 0, back: "C'est… qui…" },
        { front: "« Bien qu'il ___ fatigué, il continue. »", options: ["soit", "est", "sera", "serait"], correct: 0, back: "Bien que + subjonctif." },
        { front: "« Il travaille ___ réussir. » — But ?", options: ["pour", "pour que", "afin que", "de"], correct: 0, back: "Pour + infinitif (même sujet)." }
      ],
      num: [
        { front: "« ___ étudiants ont réussi. » (la plupart)", options: ["La plupart des", "La moitié des", "Peu des", "Assez des"], correct: 0, back: "La plupart de + pl." },
        { front: "« Il y a ___ de bruit. »", options: ["beaucoup", "beaucoup des", "du beaucoup", "des beaucoup"], correct: 0, back: "Beaucoup de + nom." },
        { front: "« ___ 80 ans, il voyage encore. »", options: ["À", "En", "Vers", "Dans"], correct: 0, back: "À + âge." },
        { front: "« Le ___ mai. »", options: ["premier", "première", "un", "one"], correct: 0, back: "1er mai." },
        { front: "« ___ tiers du groupe. »", options: ["Un", "Une", "Le", "La"], correct: 0, back: "Un tiers." },
        { front: "« Je n'ai ___ argent. »", options: ["pas d'", "pas de l'", "pas du", "pas des"], correct: 0, back: "Pas de/d'." },
        { front: "« ___ cent vingt-et-un élèves. »", options: ["Cent vingt et un", "Cent-vingt-un", "Cent vingt-et-un", "Cents vingt un"], correct: 2, back: "Traits d'union (1990)." },
        { front: "« ___ de mes amis sont venus. »", options: ["Plusieurs", "Peu", "Beaucoup", "Assez"], correct: 0, back: "Plusieurs de + nom." }
      ]
    },
    en: {
      nom: [
        { front: "'She bought ___ umbrella.'", options: ["an", "a", "the", "— (none)"], correct: 0, back: "Vowel sound → an." },
        { front: "'I need ___ information about the course.'", options: ["some", "an", "a", "many"], correct: 0, back: "Uncountable → some." },
        { front: "'___ children in the garden are my neighbours.'", options: ["The", "A", "An", "Some"], correct: 0, back: "Definite reference → the." },
        { front: "'He is ___ honest man.'", options: ["an", "a", "the", "—"], correct: 0, back: "Silent h → an." },
        { front: "'I like ___ music when I study.'", options: ["— (no article)", "the", "a", "an"], correct: 0, back: "General uncountable → zero." },
        { front: "'There are two ___ in the room.' (child)", options: ["children", "childs", "childes", "childrens"], correct: 0, back: "Irregular plural." },
        { front: "'Can I have ___ glass of water?'", options: ["a", "an", "the", "some"], correct: 0, back: "Measure phrase." },
        { front: "'I saw ___ dog. ___ dog was very friendly.'", options: ["a … The", "the … A", "an … An", "— … The"], correct: 0, back: "a then the." }
      ],
      verb: [
        { front: "'She ___ TV every evening.'", options: ["watches", "watch", "is watching", "watched"], correct: 0, back: "Habit → present simple -es." },
        { front: "'Look! They ___ football in the park.'", options: ["are playing", "play", "played", "have played"], correct: 0, back: "Now → continuous." },
        { front: "'I ___ never ___ to Japan.'", options: ["have … been", "has … been", "did … go", "am … going"], correct: 0, back: "Present perfect." },
        { front: "'When I was young, I ___ in the countryside.'", options: ["lived", "have lived", "am living", "live"], correct: 0, back: "Past simple." },
        { front: "'It ___ rain tomorrow.'", options: ["will", "is", "was", "has"], correct: 0, back: "Will + base." },
        { front: "'You ___ smoke here.' — Prohibition?", options: ["mustn't", "don't have to", "shouldn't have", "won't"], correct: 0, back: "Mustn't." },
        { front: "'If it rains, we ___ at home.'", options: ["will stay", "would stay", "stayed", "stay"], correct: 0, back: "First conditional." },
        { front: "'She ___ her keys. She can't find them.'", options: ["has lost", "lost", "loses", "is losing"], correct: 0, back: "Present perfect result." }
      ],
      adj: [
        { front: "'This book is ___ than that one.' (interesting)", options: ["more interesting", "interestinger", "most interesting", "the more interesting"], correct: 0, back: "More + long adj." },
        { front: "'She felt ___ after the news.' (bore)", options: ["bored", "boring", "bore", "boredly"], correct: 0, back: "-ed vs -ing." },
        { front: "'It was the ___ day of my life.' (good)", options: ["best", "better", "goodest", "most good"], correct: 0, back: "Good → best." },
        { front: "'An ___ Italian leather bag.'", options: ["expensive old", "old expensive", "Italian old expensive", "old Italian expensive"], correct: 0, back: "Opinion before age." },
        { front: "'The exam was ___ difficult.'", options: ["extremely", "extreme", "extremest", "more extreme"], correct: 0, back: "Adverb + adj." },
        { front: "'I'm ___ tired to go out.'", options: ["too", "very", "so", "enough"], correct: 0, back: "Too + adj + to." },
        { front: "'She's not ___ to drive.'", options: ["old enough", "enough old", "older enough", "enough older"], correct: 0, back: "Adj + enough." },
        { front: "'The ___ students passed.' (success)", options: ["successful", "success", "successfully", "succession"], correct: 0, back: "Adj + noun." }
      ],
      pron: [
        { front: "'___ gave you this gift?'", options: ["Who", "Whom", "Which", "Whose"], correct: 0, back: "Subject → who." },
        { front: "'This is ___ book, not mine.'", options: ["her", "she", "hers", "herself"], correct: 0, back: "Possessive adj." },
        { front: "'The man ___ called yesterday is my uncle.'", options: ["who", "whom", "which", "whose"], correct: 0, back: "Relative subject." },
        { front: "'She looked at ___ in the mirror.'", options: ["herself", "her", "she", "hers"], correct: 0, back: "Reflexive." },
        { front: "'___ of the two options do you prefer?'", options: ["Which", "What", "Who", "Whose"], correct: 0, back: "Limited choice." },
        { front: "'That's ___ car — the red one.'", options: ["their", "there", "they're", "them"], correct: 0, back: "Their + noun." },
        { front: "'I don't know ___ he meant.'", options: ["what", "which", "who", "whom"], correct: 0, back: "What clause." },
        { front: "'___ is yours?'", options: ["Which one", "Who", "Whose one", "What one"], correct: 0, back: "Which one." }
      ],
      adv: [
        { front: "'She ___ arrives on time.'", options: ["always", "all ways", "all way", "in always"], correct: 0, back: "Frequency adverb." },
        { front: "'He speaks English ___.' (good)", options: ["well", "good", "goodly", "best"], correct: 0, back: "Well = adverb." },
        { front: "'I ___ eat meat.'", options: ["never", "not", "no", "none"], correct: 0, back: "Never." },
        { front: "'She worked ___ and passed.'", options: ["hard", "hardly", "hardly ever", "hardness"], correct: 0, back: "Hard vs hardly." },
        { front: "'It's ___ late to start now.'", options: ["too", "very", "so", "enough"], correct: 0, back: "Too + adj." },
        { front: "'___, I disagree with that point.'", options: ["However", "Hardly", "Forever", "Sometime"], correct: 0, back: "However." },
        { front: "'They have ___ finished.'", options: ["already", "yet", "still", "ever"], correct: 0, back: "Already + perfect." },
        { front: "'Come ___.'", options: ["here", "her", "hear", "hair"], correct: 0, back: "Place adverb." }
      ],
      disc: [
        { front: "'___ you like coffee?'", options: ["Do", "Does", "Are", "Have"], correct: 0, back: "Do-support." },
        { front: "'Never ___ I seen such a view.'", options: ["have", "has", "had", "am"], correct: 0, back: "Inversion." },
        { front: "'She asked me ___ I was leaving.'", options: ["if", "that", "what", "—"], correct: 0, back: "If/whether." },
        { front: "'Although it rained, we ___ out.'", options: ["went", "go", "going", "goes"], correct: 0, back: "Although + clause." },
        { front: "'Not only ___ he arrive late…'", options: ["did", "does", "do", "was"], correct: 0, back: "Not only did he…" },
        { front: "'The report, ___ was published yesterday, is controversial.'", options: ["which", "that", "who", "what"], correct: 0, back: "Non-defining → which." },
        { front: "'I wish I ___ more time.'", options: ["had", "have", "would have", "has"], correct: 0, back: "Wish + past." },
        { front: "'___ the weather was bad, we enjoyed the trip.'", options: ["Although", "Despite", "However", "Because"], correct: 0, back: "Although + clause." }
      ],
      num: [
        { front: "'How ___ students are there?'", options: ["many", "much", "little", "fewer"], correct: 0, back: "Many + count." },
        { front: "'There is ___ water left.'", options: ["little", "few", "many", "several"], correct: 0, back: "Little + uncount." },
        { front: "'A ___ of people attended.'", options: ["number", "amount", "much", "little"], correct: 0, back: "A number of." },
        { front: "'She has ___ friends than before.'", options: ["fewer", "less", "little", "few"], correct: 0, back: "Fewer + count." },
        { front: "'About ___ of the cake is gone.'", options: ["half", "many", "few", "several"], correct: 0, back: "Half of." },
        { front: "'___ 50% of voters agreed.'", options: ["About", "Many", "Few", "Several"], correct: 0, back: "About + %." },
        { front: "'I need ___ sugar for the recipe.'", options: ["some", "any", "many", "few"], correct: 0, back: "Some + uncount." },
        { front: "'___ one knew the answer.'", options: ["No", "Any", "Many", "Several"], correct: 0, back: "No one." }
      ]
    }
  };

  function hardenFlashcard(fc, lang, catId, index) {
    const pool = (CONTEXTS[lang] && CONTEXTS[lang][catId]) || [];
    if (pool.length) {
      const pick = pool[index % pool.length];
      return Object.assign({}, pick, { category: fc.category || pick.category, type: "flashcard", _hardened: true });
    }
    return Object.assign({}, fc, {
      front: fc.front,
      options: ["A", "B", "C", "D"],
      correct: 0,
      back: fc.back,
      type: "flashcard"
    });
  }

  global.FlashcardOptions = { hardenFlashcard: hardenFlashcard };
})(typeof window !== "undefined" ? window : global);
