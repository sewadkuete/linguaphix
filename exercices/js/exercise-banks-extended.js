/**
 * Extended exercise banks for adj, pron, adv, disc, num (fr + en).
 * Loaded by exercise-generator.js via window.ExerciseBanksExtended.
 */
(function (global) {
  global.ExerciseBanksExtended = {
    fr: {
      adj: {
        gap: [
          { sentence: "Elle porte une robe ___ .", answer: "rouge", hint: "couleur invariable", explanation: "Les adjectifs de couleur simples sont invariables : une robe rouge." },
          { sentence: "Ce sont des filles ___ .", answer: "intelligentes", hint: "accord fém. plur.", explanation: "Intelligent → intelligente (fém.) → intelligentes (pl.)." },
          { sentence: "Il est ___ que son frère.", answer: "plus grand", hint: "comparatif de supériorité", explanation: "Plus + adjectif + que : plus grand que." },
          { sentence: "C'est le livre ___ intéressant du monde.", answer: "le plus", hint: "superlatif", explanation: "Le plus + adjectif : le superlatif absolu." },
          { sentence: "Une ___ histoire m'a beaucoup touchée.", answer: "touchante", hint: "participe présent adjectif", explanation: "Touchant (part. prés.) s'accorde : touchante (fém.)." },
          { sentence: "Les portes sont ___ .", answer: "fermées", hint: "participe passé adjectif", explanation: "Fermé comme adjectif → fermées (fém. plur.)." },
          { sentence: "C'est une ___ nouvelle.", answer: "bonne", hint: "adjectif irrégulier", explanation: "Bon → bonne au féminin (pas bonne forme de bon)." },
          { sentence: "Il fait ___ aujourd'hui.", answer: "froid", hint: "adjectif avec il fait", explanation: "Il fait + adjectif invariable (froid, chaud, beau)." }
        ],
        mcq: [
          { question: "« Des ___ (petit) chats. »", options: ["petits", "petites", "petit", "petite"], correct: 0, explanation: "Chats masc. plur. → petits." },
          { question: "Comparatif de « bon » ?", options: ["plus bon", "meilleur", "plus bonne", "bonner"], correct: 1, explanation: "Bon → meilleur (irrrégulier)." },
          { question: "« Une robe ___ (orange). »", options: ["orange", "oranges", "orangée", "orangés"], correct: 0, explanation: "Couleur simple → invariable." },
          { question: "Superlatif de « mauvais » ?", options: ["le plus mauvais", "le pire", "le plus mauvaise", "pirement"], correct: 1, explanation: "Mauvais → le pire (irrrégulier)." },
          { question: "Accord : « Elles sont ___ (content). »", options: ["content", "contents", "contente", "contentes"], correct: 3, explanation: "Elles → contentes (fém. plur.)." },
          { question: "Position de l'adjectif BAGS ?", options: ["Après le nom", "Avant le nom", "Jamais utilisé", "Après le verbe"], correct: 1, explanation: "Beauty, Age, Goodness, Size → souvent avant le nom." },
          { question: "« C'est moins ___ que hier. » (chaud)", options: ["chaud", "chaude", "chauds", "chaudes"], correct: 0, explanation: "Il fait moins chaud — adjectif invariable avec il fait." },
          { question: "Participe passé adjectif : « des fenêtres ___ »", options: ["ouvert", "ouverte", "ouverts", "ouvertes"], correct: 3, explanation: "Fenêtres fém. plur. → ouvertes." }
        ],
        matching: [
          { left: "plus … que", right: "comparatif de supériorité", category: "Comparatifs" },
          { left: "moins … que", right: "comparatif d'infériorité", category: "Comparatifs" },
          { left: "aussi … que", right: "comparatif d'égalité", category: "Comparatifs" },
          { left: "le plus / la plus", right: "superlatif relatif", category: "Superlatifs" },
          { left: "bon → meilleur", right: "comparatif irrégulier", category: "Irréguliers" },
          { left: "mauvais → pire", right: "comparatif irrégulier", category: "Irréguliers" },
          { left: "BAGS (beau, jeune…)", right: "adjectif avant le nom", category: "Position" },
          { left: "participe passé + être", right: "adjectif accordé", category: "Participes" }
        ],
        flashcard: [
          { front: "Accord de l'adjectif ?", back: "Même genre et nombre que le nom — une belle maison, des livres intéressants", category: "Accord" },
          { front: "Comparatif régulier ?", back: "plus + adj. + que — plus grand que", category: "Comparatifs" },
          { front: "Superlatif relatif ?", back: "le/la/les plus + adj. — le plus grand", category: "Superlatifs" },
          { front: "Bon / mauvais au comparatif ?", back: "meilleur / pire (ou plus mauvais)", category: "Irréguliers" },
          { front: "Couleurs simples ?", back: "Invariables — des robes bleu, orange, marron", category: "Couleurs" },
          { front: "Adjectif en -e au masc. ?", back: "Pas de double consonne — une fille intelligente", category: "Accord" },
          { front: "Participe présent comme adj. ?", back: "S'accorde — une histoire touchante", category: "Participes" },
          { front: "Il fait + adjectif ?", back: "Invariable — il fait froid, chaud, beau", category: "Météo" }
        ],
        transform: [
          { instruction: "Mettez au comparatif de supériorité.", original: "Elle est grande.", answer: "Elle est plus grande.", explanation: "Plus + adjectif." },
          { instruction: "Accordez l'adjectif.", original: "Des garçon sportif", answer: "Des garçons sportifs", explanation: "Pluriel → sportifs." },
          { instruction: "Mettez au superlatif.", original: "C'est un film intéressant.", answer: "C'est le film le plus intéressant.", explanation: "Le plus + adjectif." },
          { instruction: "Remplacez « bon » au comparatif.", original: "Ce gâteau est bon.", answer: "Ce gâteau est meilleur.", explanation: "Bon → meilleur." },
          { instruction: "Accordez le participe passé adjectif.", original: "La porte est fermé.", answer: "La porte est fermée.", explanation: "Porte fém. → fermée." },
          { instruction: "Mettez l'adjectif au féminin pluriel.", original: "Des étudiants attentif", answer: "Des étudiantes attentives", explanation: "Fém. plur. → attentives." },
          { instruction: "Comparatif d'égalité.", original: "Il est grand. Elle est grande.", answer: "Il est aussi grand qu'elle.", explanation: "Aussi … que." },
          { instruction: "Corrigez la couleur.", original: "Des chemises vertes claires", answer: "Des chemises vert clair", explanation: "Couleur composée souvent invariable ou selon le premier élément." }
        ]
      },
      pron: {
        gap: [
          { sentence: "___ parle français.", answer: "Je", hint: "pronom sujet 1re pers.", explanation: "Je = pronom sujet 1re personne singulier." },
          { sentence: "Marie me voit. ___ voit Marie.", answer: "Elle", hint: "pronom sujet", explanation: "Elle remplace Marie (fém. sing.)." },
          { sentence: "Je ___ appelle demain.", answer: "t'", hint: "COD devant voyelle", explanation: "Te → t' devant voyelle ; COD de appeler (j'appelle quelqu'un)." },
          { sentence: "C'est le livre ___ j'ai acheté.", answer: "que", hint: "pronom relatif COD", explanation: "Que = COD du verbe acheter." },
          { sentence: "La femme ___ parle est ma tante.", answer: "qui", hint: "pronom relatif sujet", explanation: "Qui = sujet de parler." },
          { sentence: "___ livre préfères-tu ?", answer: "Quel", hint: "adjectif/pronom interrogatif", explanation: "Quel s'accorde avec livre (masc.)." },
          { sentence: "___ est ma voiture, pas la tienne.", answer: "Celle-ci", hint: "pronom démonstratif", explanation: "Celle-ci = celle qui est ici (fém.)." },
          { sentence: "Personne ne ___ comprend.", answer: "me", hint: "pronom COD", explanation: "Me = COD de comprendre." },
        ],
        mcq: [
          { question: "« ___ mange une pomme. » (il)", options: ["Lui", "Il", "Le", "Eux"], correct: 1, explanation: "Il = sujet." },
          { question: "COD : « Je ___ vois. » (tu)", options: ["te", "tu", "t'", "toi"], correct: 0, explanation: "Te = COD devant consonne." },
          { question: "« C'est ___ qui a téléphoné. »", options: ["moi", "me", "je", "mon"], correct: 0, explanation: "Moi après c'est … qui (insistance)." },
          { question: "Relatif lieu : « la ville ___ j'habite »", options: ["que", "qui", "où", "dont"], correct: 2, explanation: "Où = lieu." },
          { question: "« ___ de ces robes te plaît ? »", options: ["Laquelle", "Lesquels", "Lequel", "Quelle"], correct: 0, explanation: "Laquelle = laquelle des robes (fém.)." },
          { question: "« Nous ___ enfants. »", options: ["sommes", "êtes", "est", "sont"], correct: 0, explanation: "Être + attribut : nous sommes (des) enfants." },
          { question: "« Je pense ___ lui. »", options: ["à", "de", "—", "que"], correct: 0, explanation: "Penser à → à + pronom tonique/disjonctif." },
          { question: "Relatif « dont » exprime…", options: ["le lieu", "la possession / complément de", "le sujet", "le COD"], correct: 1, explanation: "Dont = de + relatif — le livre dont je parle." }
        ],
        matching: [
          { left: "je / tu / il", right: "pronom sujet", category: "Sujets" },
          { left: "me / te / le", right: "pronom COD", category: "COD" },
          { left: "lui / leur", right: "pronom COI", category: "COI" },
          { left: "moi / toi / lui", right: "pronom tonique", category: "Toniques" },
          { left: "qui", right: "relatif sujet", category: "Relatifs" },
          { left: "que", right: "relatif COD", category: "Relatifs" },
          { left: "où", right: "relatif lieu/temps", category: "Relatifs" },
          { left: "celui / celle / ceux", right: "pronom démonstratif", category: "Démonstratifs" }
        ],
        flashcard: [
          { front: "Pronoms sujets ?", back: "je, tu, il/elle, nous, vous, ils/elles", category: "Sujets" },
          { front: "COD me/te/se ?", back: "Me, te, se ; le, la, les — devant voyelle : m', t', s'", category: "COD" },
          { front: "COI ?", back: "Me, te, lui, nous, vous, leur — Je lui parle ; Je leur donne ; Tu me parles", category: "COI" },
          { front: "Qui vs que ?", back: "Qui = sujet ; que = COD", category: "Relatifs" },
          { front: "Où et dont ?", back: "Où = lieu ; dont = de qui/duquel", category: "Relatifs" },
          { front: "C'est moi / C'est toi ?", back: "Pronom tonique après c'est", category: "Toniques" },
          { front: "Lequel / laquelle ?", back: "Interrogatif ou relatif avec choix — laquelle ?", category: "Interrogatifs" },
          { front: "Y et en ?", back: "Y = lieu/à ; en = de/quantité", category: "Adverbaux" }
        ],
        transform: [
          { instruction: "Remplacez par un pronom COD.", original: "Je vois Marie.", answer: "Je la vois.", explanation: "Marie fém. → la." },
          { instruction: "Remplacez par un pronom COI.", original: "Je parle à Pierre.", answer: "Je lui parle.", explanation: "À Pierre → lui." },
          { instruction: "Utilisez « en ».", original: "Tu veux des pommes ?", answer: "Tu en veux ?", explanation: "En remplace des pommes (partitif)." },
          { instruction: "Utilisez « y ».", original: "Tu vas à Paris ?", answer: "Tu y vas ?", explanation: "Y remplace à Paris (lieu)." },
          { instruction: "Pronom relatif sujet.", original: "L'homme parle. L'homme est médecin.", answer: "L'homme qui parle est médecin.", explanation: "Qui = sujet." },
          { instruction: "Pronom tonique.", original: "C'est Jean qui a gagné.", answer: "C'est Jean. Lui, il a gagné.", explanation: "Lui = pronom tonique." },
          { instruction: "Interrogatif.", original: "Tu préfères quel film ?", answer: "Quel film préfères-tu ?", explanation: "Quel + inversion ou est-ce que." },
          { instruction: "Démonstratif.", original: "Je prends cette robe, pas l'autre.", answer: "Je prends celle-ci, pas celle-là.", explanation: "Celle-ci / celle-là remplacent robe." }
        ]
      },
      adv: {
        gap: [
          { sentence: "Il parle ___ .", answer: "lentement", hint: "adverbe en -ment", explanation: "Lent → lentement (fém. sing. + -ment)." },
          { sentence: "Je ___ vais au cinéma.", answer: "souvent", hint: "fréquence", explanation: "Souvent = adverbe de fréquence, souvent avant le verbe principal." },
          { sentence: "Elle ne mange ___ .", answer: "pas", hint: "négation", explanation: "Ne … pas encadre le verbe." },
          { sentence: "Il travaille ___ .", answer: "beaucoup", hint: "quantité", explanation: "Beaucoup modifie le verbe travailler." },
          { sentence: "Nous ___ sommes arrivés.", answer: "déjà", hint: "temps / aspect", explanation: "Déjà = adverbe de temps, place après l'auxiliaire." },
          { sentence: "Il fait ___ froid.", answer: "très", hint: "intensité", explanation: "Très intensifie l'adjectif froid." },
          { sentence: "___ , je n'ai pas compris.", answer: "Pourtant", hint: "connecteur adversatif", explanation: "Pourtant = opposition." },
          { sentence: "Elle chante ___ bien.", answer: "vraiment", hint: "adverbe d'intensité", explanation: "Vraiment intensifie bien." }
        ],
        mcq: [
          { question: "Formation adverbe : « rapide »", options: ["rapidement", "rapidemment", "rapide", "rapidesment"], correct: 0, explanation: "Rapide → rapidement (déjà en -e)." },
          { question: "Place de « souvent » ?", options: ["Après le verbe", "Avant le verbe principal", "En début absolu", "Après le sujet toujours"], correct: 1, explanation: "Souvent se place généralement avant le verbe." },
          { question: "Négation complète ?", options: ["ne … jamais", "ne … pas", "ne … plus", "Toutes"], correct: 3, explanation: "Pas, plus, jamais, rien, personne… avec ne." },
          { question: "« ___ , il pleut. » (malgré tout)", options: ["Donc", "Pourtant", "Ensuite", "Puis"], correct: 1, explanation: "Pourtant = adversatif." },
          { question: "Adverbe de lieu ?", options: ["demain", "ici", "souvent", "très"], correct: 1, explanation: "Ici = lieu." },
          { question: "« Il n'___ pas encore arrivé. » (passé composé)", options: ["est", "a", "être", "avoir"], correct: 0, explanation: "Arriver → être au PC : n'est pas arrivé." },
          { question: "Intensité : « ___ difficile »", options: ["très", "beaucoup", "souvent", "demain"], correct: 0, explanation: "Très + adjectif ; beaucoup + verbe." },
          { question: "« ___ tard » (à ce moment)", options: ["Désormais", "Alors", "Souvent", "Peu"], correct: 1, explanation: "Alors = à ce moment-là." }
        ],
        matching: [
          { left: "-ment", right: "formation adverbe", category: "Formation" },
          { left: "ne … pas", right: "négation", category: "Négation" },
          { left: "souvent / toujours", right: "fréquence", category: "Fréquence" },
          { left: "ici / là / partout", right: "lieu", category: "Lieu" },
          { left: "demain / hier", right: "temps", category: "Temps" },
          { left: "très / trop / assez", right: "intensité", category: "Intensité" },
          { left: "donc / pourtant", right: "connecteur", category: "Connecteurs" },
          { left: "bien / mal / mieux", right: "adverbe irrégulier", category: "Irréguliers" }
        ],
        flashcard: [
          { front: "Adverbe en -ment ?", back: "Fém. sing. + -ment — lent → lentement ; actif → activement", category: "Formation" },
          { front: "Ne … pas ?", back: "Négation standard — Je ne sais pas.", category: "Négation" },
          { front: "Ne … plus / jamais ?", back: "Plus = no longer ; jamais = never", category: "Négation" },
          { front: "Fréquence : place ?", back: "Souvent, toujours → avant le verbe — Je vais souvent", category: "Fréquence" },
          { front: "Très vs beaucoup ?", back: "Très + adj/adv ; beaucoup + verbe", category: "Intensité" },
          { front: "Bien vs bon ?", back: "Bien = adverbe ; bon = adjectif", category: "Irréguliers" },
          { front: "Mieux ?", back: "Comparatif de bien — Il chante mieux.", category: "Irréguliers" },
          { front: "Connecteurs adversatifs ?", back: "Mais, pourtant, cependant, néanmoins", category: "Connecteurs" }
        ],
        transform: [
          { instruction: "Mettez à la forme négative.", original: "Il mange des légumes.", answer: "Il ne mange pas de légumes.", explanation: "Ne … pas ; de après négation (pas des)." },
          { instruction: "Formez l'adverbe.", original: "Elle parle (poli).", answer: "Elle parle poliment.", explanation: "Poli → poliment." },
          { instruction: "Ajoutez un adverbe de fréquence.", original: "Je fais du sport le lundi.", answer: "Je fais souvent du sport le lundi.", explanation: "Souvent avant le verbe." },
          { instruction: "Négation avec « plus ».", original: "Il habite ici.", answer: "Il n'habite plus ici.", explanation: "Ne … plus = no longer." },
          { instruction: "Intensifiez avec « très ».", original: "C'est intéressant.", answer: "C'est très intéressant.", explanation: "Très + adjectif." },
          { instruction: "Connecteur de conséquence.", original: "Il pleut. Nous restons.", answer: "Il pleut, donc nous restons.", explanation: "Donc = conséquence." },
          { instruction: "Comparatif de « bien ».", original: "Elle danse bien.", answer: "Elle danse mieux.", explanation: "Bien → mieux." },
          { instruction: "Adverbe de lieu.", original: "Les clés sont sur la table.", answer: "Les clés sont ici / là.", explanation: "Ici/là remplacent le lieu proche/éloigné." }
        ]
      },
      disc: {
        gap: [
          { sentence: "___ tu viens demain ?", answer: "Est-ce que", hint: "interrogation neutre", explanation: "Est-ce que + phrase affirmative = question." },
          { sentence: "Où ___ -tu habiter ?", answer: "vas", hint: "inversion", explanation: "Où vas-tu — inversion sujet-verbe." },
          { sentence: "Je pense ___ il a raison.", answer: "que", hint: "subordonnée complétive", explanation: "Que introduit la proposition complétive." },
          { sentence: "Quand il pleut, je ___ à la maison.", answer: "reste", hint: "subordonnée circonstancielle", explanation: "Quand + indicatif : circonstance de temps." },
          { sentence: "___ livre lis-tu ?", answer: "Quel", hint: "mot interrogatif", explanation: "Quel s'accorde avec livre." },
          { sentence: "Il faut ___ tu étudies.", answer: "que", hint: "subjonctif après il faut", explanation: "Il faut que + subjonctif." },
          { sentence: "Voici le professeur ___ j'ai rencontré.", answer: "que", hint: "relatif COD", explanation: "Que = COD de rencontrer." },
          { sentence: "___ beau temps !", answer: "Quel", hint: "exclamation", explanation: "Quel + nom = exclamation." }
        ],
        mcq: [
          { question: "Question avec « est-ce que » ?", options: ["Tu viens ?", "Est-ce que tu viens ?", "Viens-tu ?", "Les deux B et C"], correct: 3, explanation: "Est-ce que et inversion sont corrects." },
          { question: "Ordre SVO en français ?", options: ["Verbe-Sujet-Objet", "Sujet-Verbe-Objet", "Objet-Verbe-Sujet", "Variable"], correct: 1, explanation: "Français = Sujet-Verbe-Objet principal." },
          { question: "« Il dit ___ il part. »", options: ["que", "qui", "dont", "où"], correct: 0, explanation: "Discours indirect → que." },
          { question: "Négation : place de « pas » ?", options: ["Avant le verbe", "Après le verbe conjugué", "En fin de phrase", "Avant le sujet"], correct: 1, explanation: "Ne … pas autour du verbe." },
          { question: "Subordonnée de cause ?", options: ["parce que", "quand", "si", "que"], correct: 0, explanation: "Parce que = cause." },
          { question: "Inversion soutenue : « ___ -il ? »", options: ["Comment est", "Comment", "Est comment", "Comment il est"], correct: 0, explanation: "Comment est-il ?" },
          { question: "« Si ___ , j'irai. » (condition)", options: ["tu viens", "tu viendras", "tu venais", "tu es venu"], correct: 0, explanation: "Si + présent → futur (condition réelle)." },
          { question: "Exclamation : « ___ belle journée ! »", options: ["Quelle", "Quel", "Qu'elle", "Quelles"], correct: 0, explanation: "Journée fém. → quelle." }
        ],
        matching: [
          { left: "Est-ce que … ?", right: "interrogation standard", category: "Questions" },
          { left: "Inversion sujet-verbe", right: "registre soutenu", category: "Questions" },
          { left: "Sujet-Verbe-Objet", right: "ordre canonique", category: "Syntaxe" },
          { left: "que + subjonctif", right: "subordonnée subjective", category: "Subordonnées" },
          { left: "quand / parce que", right: "subordonnée circonstancielle", category: "Subordonnées" },
          { left: "ne … pas", right: "négation", category: "Syntaxe" },
          { left: "Si … , …", right: "condition", category: "Subordonnées" },
          { left: "Quel / Quelle", right: "interrogatif/exclamatif", category: "Questions" }
        ],
        flashcard: [
          { front: "3 façons de poser une question ?", back: "Intonation ; est-ce que ; inversion", category: "Questions" },
          { front: "Ordre des mots ?", back: "Sujet + Verbe + Objet — Je mange une pomme", category: "Syntaxe" },
          { front: "Il faut que + ?", back: "Subjonctif — Il faut que tu viennes", category: "Subordonnées" },
          { front: "Parce que vs car ?", back: "Tous deux = cause ; car plus formel, après virgule", category: "Connecteurs" },
          { front: "Si + présent → ?", back: "Futur ou impératif (condition réelle)", category: "Condition" },
          { front: "Discours indirect ?", back: "Il dit qu'il part (pas : il dit qu'il partira forcément)", category: "Syntaxe" },
          { front: "Place des pronoms ?", back: "Avant le verbe — Je le vois ; Je lui parle", category: "Syntaxe" },
          { front: "Exclamation ?", back: "Quel/Quelle/Quels/Quelles + nom !", category: "Questions" }
        ],
        transform: [
          { instruction: "Transformez en question avec « est-ce que ».", original: "Tu aimes le chocolat.", answer: "Est-ce que tu aimes le chocolat ?", explanation: "Est-ce que en tête." },
          { instruction: "Mettez à l'inversion.", original: "Tu viens ce soir.", answer: "Viens-tu ce soir ?", explanation: "Verbe-sujet avec trait d'union." },
          { instruction: "Reliez avec « parce que ».", original: "Je reste. Il pleut.", answer: "Je reste parce qu'il pleut.", explanation: "Cause." },
          { instruction: "Subordonnée avec « que ».", original: "Je crois. Il a tort.", answer: "Je crois qu'il a tort.", explanation: "Complétive." },
          { instruction: "Condition avec « si ».", original: "Tu travailles. Tu réussiras.", answer: "Si tu travailles, tu réussiras.", explanation: "Si + présent, futur." },
          { instruction: "Exclamation.", original: "C'est une surprise.", answer: "Quelle surprise !", explanation: "Quelle + nom." },
          { instruction: "Discours indirect.", original: "Il dit : « Je pars. »", answer: "Il dit qu'il part.", explanation: "Que + changement de personne si besoin." },
          { instruction: "Négation.", original: "Elle comprend la leçon.", answer: "Elle ne comprend pas la leçon.", explanation: "Ne … pas." }
        ]
      },
      num: {
        gap: [
          { sentence: "Il y a ___ pommes sur la table.", answer: "cinq", hint: "nombre cardinal", explanation: "Cinq pommes — cardinal invariable devant nom." },
          { sentence: "J'ai ___ frères.", answer: "deux", hint: "nombre", explanation: "Deux frères — pas d'accord du nom avec le nombre." },
          { sentence: "___ étudiants sont arrivés.", answer: "Plusieurs", hint: "quantificateur", explanation: "Plusieurs + nom pluriel." },
          { sentence: "Il n'y a ___ personne.", answer: "personne", hint: "négation + quantificateur", explanation: "Ne … personne = nobody." },
          { sentence: "J'ai bu ___ verre d'eau.", answer: "un", hint: "quantité", explanation: "Un verre = mesure." },
          { sentence: "___ des livres sont intéressants.", answer: "Certains", hint: "quantificateur partitif", explanation: "Certains + des + nom." },
          { sentence: "Elle a ___ ans.", answer: "vingt", hint: "âge", explanation: "Avoir + nombre + ans." },
          { sentence: "Un ___ de la classe est absent.", answer: "tiers", hint: "fraction", explanation: "Un tiers = 1/3." }
        ],
        mcq: [
          { question: "« ___ hommes » (21)", options: ["vingt-et-un", "vingt et un", "vingt-un", "vingt et un hommes"], correct: 1, explanation: "Devant un nom : vingt et un hommes (sans trait d'union)." },
          { question: "« ___ enfants » (beaucoup)", options: ["beaucoup", "beaucoup de", "des beaucoup", "beaucoup des"], correct: 1, explanation: "Beaucoup de + nom." },
          { question: "70 en français ?", options: ["septante", "soixante-dix", "septante-dix", "soixante et dix"], correct: 1, explanation: "Soixante-dix (France)." },
          { question: "« Il y a ___ lait. »", options: ["peu", "peu de", "un peu de", "peu des"], correct: 2, explanation: "Un peu de + nom." },
          { question: "Ordinal : 3e ?", options: ["trois", "troisième", "tierce", "troisièmement"], correct: 1, explanation: "Troisième = 3e." },
          { question: "« ___ deux cents euros. »", options: ["C'est", "Ce sont", "Il est", "Ils sont"], correct: 1, explanation: "Deux cents euros → ce sont (pluriel)." },
          { question: "Ne … ___ (quantité nulle)", options: ["aucun", "personne", "rien", "A et C"], correct: 3, explanation: "Aucun/aucune ; ne … rien." },
          { question: "« La moitié ___ gâteau »", options: ["du", "de le", "de", "des"], correct: 0, explanation: "Moitié de + article → du gâteau." }
        ],
        matching: [
          { left: "un, deux, trois", right: "cardinaux", category: "Nombres" },
          { left: "premier, deuxième", right: "ordinaux", category: "Nombres" },
          { left: "beaucoup de", right: "quantificateur + de", category: "Quantificateurs" },
          { left: "peu de / un peu de", right: "petite quantité", category: "Quantificateurs" },
          { left: "tous / toutes", right: "totalité", category: "Quantificateurs" },
          { left: "plusieurs / certains", right: "partie indéfinie", category: "Quantificateurs" },
          { left: "un tiers / un quart", right: "fraction", category: "Fractions" },
          { left: "vingt et un / vingt-deux", right: "accord 70-99", category: "Accord" }
        ],
        flashcard: [
          { front: "Cardinaux devant nom ?", back: "Invariables — cinq livres, deux cent euros ; deux cents seuls", category: "Nombres" },
          { front: "Beaucoup / trop / assez ?", back: "Toujours + de — beaucoup de monde", category: "Quantificateurs" },
          { front: "Ordinal formation ?", back: "Premier, deuxième, troisième… ou -ième (4e = quatrième)", category: "Ordinaux" },
          { front: "Avoir + âge ?", back: "J'ai vingt ans (pas je suis vingt ans)", category: "Nombres" },
          { front: "Fractions ?", back: "Un demi, un tiers, un quart, trois quarts", category: "Fractions" },
          { front: "Tous vs tout ?", back: "Tous (plur.) ; tout/toute/tous/toutes selon nom", category: "Quantificateurs" },
          { front: "Aucun accord ?", back: "Aucun problème (masc.) ; aucune idée (fém.)", category: "Quantificateurs" },
          { front: "80, 90 en France ?", back: "Quatre-vingts, quatre-vingt-dix", category: "Nombres" }
        ],
        transform: [
          { instruction: "Écrivez en lettres.", original: "42", answer: "quarante-deux", explanation: "Tiret entre dizaines et unités." },
          { instruction: "Mettez au pluriel avec accord.", original: "vingt et un étudiant", answer: "vingt et un étudiants", explanation: "Vingt et un + nom pluriel." },
          { instruction: "Utilisez « beaucoup de ».", original: "Il y a des gens.", answer: "Il y a beaucoup de gens.", explanation: "Beaucoup de remplace des." },
          { instruction: "Ordinal.", original: "C'est le numéro 1.", answer: "C'est le premier.", explanation: "Premier = 1er." },
          { instruction: "Fraction.", original: "La moitié du pain", answer: "Un demi-pain / la moitié du pain", explanation: "Moitié = 1/2." },
          { instruction: "Négation quantité.", original: "J'ai des idées.", answer: "Je n'ai aucune idée.", explanation: "Aucune + nom sing." },
          { instruction: "Cent / cents ?", original: "deux cent", answer: "deux cents", explanation: "Cent → cents quand le nombre se termine (sans nom après)." },
          { instruction: "Quantificateur.", original: "Tous le monde est là.", answer: "Tout le monde est là.", explanation: "Tout le monde (sing.) — locution fixe." }
        ]
      }
    },
    en: {
      adj: {
        gap: [
          { sentence: "She is a ___ student.", answer: "good", hint: "attributive adjective", explanation: "Adjective before noun in English." },
          { sentence: "This book is ___ than that one.", answer: "more interesting", hint: "comparative long adj.", explanation: "More + adjective + than for long adjectives." },
          { sentence: "He is the ___ player on the team.", answer: "best", hint: "superlative", explanation: "Best = superlative of good." },
          { sentence: "The ___ news surprised everyone.", answer: "exciting", hint: "participle as adjective", explanation: "Exciting describes the news (cause of emotion)." },
          { sentence: "I was ___ by the film.", answer: "excited", hint: "-ed participle", explanation: "Excited describes how I felt." },
          { sentence: "An ___ child needs care.", answer: "injured", hint: "past participle adjective", explanation: "Injured = past participle used as adjective." },
          { sentence: "It's ___ cold today.", answer: "extremely", hint: "adverb modifying adjective", explanation: "Extremely modifies cold (adverb + adjective)." },
          { sentence: "She looks ___.", answer: "happy", hint: "linking verb + adjective", explanation: "Look + adjective (not adverb) for state." }
        ],
        mcq: [
          { question: "Comparative of 'bad'", options: ["badder", "worse", "worst", "more bad"], correct: 1, explanation: "Bad → worse → worst (irregular)." },
          { question: "'A ___ day' (sun)", options: ["sun", "sunny", "sunning", "sunned"], correct: 1, explanation: "Sunny = adjective from sun." },
          { question: "Order: 'a beautiful old French table'", options: ["Correct as is", "a French old beautiful table", "an old French beautiful table", "a beautiful French old table"], correct: 0, explanation: "Opinion-size-age-shape-colour-origin-material." },
          { question: "'The news is ___ .'", options: ["interest", "interested", "interesting", "interests"], correct: 2, explanation: "News causes interest → interesting." },
          { question: "Superlative of 'far'", options: ["farther", "farthest / furthest", "most far", "farest"], correct: 1, explanation: "Far → farthest/furthest." },
          { question: "'She feels ___ .' (tire)", options: ["tiring", "tired", "tire", "tires"], correct: 1, explanation: "Person feels tired (-ed)." },
          { question: "Comparative of 'good'", options: ["gooder", "more good", "better", "best"], correct: 2, explanation: "Good → better → best." },
          { question: "'A ___ man' (bore)", options: ["bored", "boring", "bore", "boresome"], correct: 1, explanation: "Man causes boredom → boring." }
        ],
        matching: [
          { left: "-er / -est", right: "short adjective comparison", category: "Comparatives" },
          { left: "more / most", right: "long adjective comparison", category: "Comparatives" },
          { left: "good → better → best", right: "irregular", category: "Irregular" },
          { left: "-ing adjective", right: "effect on others", category: "Participles" },
          { left: "-ed adjective", right: "feeling/state", category: "Participles" },
          { left: "as … as", right: "equality comparison", category: "Comparatives" },
          { left: "linking verbs", right: "be, seem, look, feel", category: "Syntax" },
          { left: "adjective order", right: "opinion before fact adjectives", category: "Order" }
        ],
        flashcard: [
          { front: "Short adj. comparative?", back: "Add -er / -est — tall → taller → tallest", category: "Comparatives" },
          { front: "Long adj. comparative?", back: "More / most — interesting → more interesting", category: "Comparatives" },
          { front: "-ing vs -ed adjectives?", back: "-ing = causes feeling ; -ed = feels it — boring/bored", category: "Participles" },
          { front: "Irregular: good/bad?", back: "Good → better → best ; bad → worse → worst", category: "Irregular" },
          { front: "As … as ?", back: "Equality — She is as tall as her brother.", category: "Comparatives" },
          { front: "Adjective after linking verb?", back: "Be, seem, look, feel, taste + adjective", category: "Syntax" },
          { front: "Adjective order?", back: "Opinion → size → age → colour → origin — a nice big old house", category: "Order" },
          { front: "Less vs fewer?", back: "Less + uncountable ; fewer + countable plural", category: "Quantifiers" }
        ],
        transform: [
          { instruction: "Use the comparative.", original: "This car is fast.", answer: "This car is faster than that one.", explanation: "Add -er or more … than." },
          { instruction: "Use the superlative.", original: "She is a talented singer.", answer: "She is the most talented singer.", explanation: "The most + long adjective." },
          { instruction: "Choose -ing or -ed.", original: "The lecture was (bore).", answer: "The lecture was boring.", explanation: "Lecture causes boredom." },
          { instruction: "Irregular comparative.", original: "This is a good solution.", answer: "This is a better solution.", explanation: "Good → better." },
          { instruction: "Equality comparison.", original: "He is tall. She is tall.", answer: "He is as tall as she is.", explanation: "As … as." },
          { instruction: "Order the adjectives.", original: "a leather brown old bag", answer: "an old brown leather bag", explanation: "Age → colour → material." },
          { instruction: "Linking verb.", original: "She looks happily.", answer: "She looks happy.", explanation: "Look + adjective." },
          { instruction: "Comparative with 'less'.", original: "This exercise is difficult.", answer: "This exercise is less difficult than the last one.", explanation: "Less + adjective + than." }
        ]
      },
      pron: {
        gap: [
          { sentence: "___ is my brother.", answer: "He", hint: "subject pronoun", explanation: "He = subject of is." },
          { sentence: "I saw ___ at the party.", answer: "her", hint: "object pronoun", explanation: "Her = object of saw." },
          { sentence: "This is ___ book, not mine.", answer: "my", hint: "possessive adjective", explanation: "My + noun." },
          { sentence: "The book is ___.", answer: "mine", hint: "possessive pronoun", explanation: "Mine = possessive pronoun (no noun)." },
          { sentence: "___ did you invite ?", answer: "Whom", hint: "object interrogative", explanation: "Whom = object (formal) ; who is also common." },
          { sentence: "The woman ___ called is my aunt.", answer: "who", hint: "relative subject", explanation: "Who = subject of called (people)." },
          { sentence: "That's the house ___ I grew up.", answer: "where", hint: "relative place", explanation: "Where = in which place (defining)." },
          { sentence: "I'll never forget the day ___ we met.", answer: "when", hint: "relative time", explanation: "When = on/in which day (defining)." },
          { sentence: "The man ___ car was stolen called the police.", answer: "whose", hint: "possession", explanation: "Whose + noun = possession in relative clause." },
          { sentence: "___ of these is yours ?", answer: "Which", hint: "demonstrative/interrogative choice", explanation: "Which = choice among options." }
        ],
        mcq: [
          { question: "« ___ and I went home. »", options: ["Me", "Him", "She", "Her"], correct: 2, explanation: "She + I as subjects." },
          { question: "Object: « Give it to ___ . »", options: ["I", "me", "my", "mine"], correct: 1, explanation: "To me = object after preposition." },
          { question: "Possessive: « It's ___ car. »", options: ["her", "hers", "she", "herself"], correct: 0, explanation: "Her + noun." },
          { question: "Relative object: « the man ___ I met »", options: ["who", "whom", "which", "whose"], correct: 1, explanation: "Whom = object (formal) ; who in informal English." },
          { question: "Non-defining: « My brother, ___ lives in Paris, is visiting. »", options: ["who", "which", "that", "where"], correct: 0, explanation: "Non-defining + people → who (never that)." },
          { question: "Defining: « The book ___ I read was great. » (omit pronoun OK)", options: ["who", "which", "that", "A or C"], correct: 3, explanation: "Defining + object → which or that, or omit." },
          { question: "« ___ is this ? » (ownership)", options: ["Who", "Whose", "Who's", "Whom"], correct: 1, explanation: "Whose = possession." },
          { question: "Reflexive: « She hurt ___ . »", options: ["her", "hers", "herself", "she"], correct: 2, explanation: "Herself = reflexive." },
          { question: "Demonstrative: « ___ one do you want ? »", options: ["This", "Which", "What", "Who"], correct: 1, explanation: "Which one = choice." },
          { question: "« It was ___ who called. » (formal)", options: ["he", "him", "his", "himself"], correct: 0, explanation: "It was he who called (subject pronoun after be in formal cleft)." }
        ],
        matching: [
          { left: "I / you / he / she", right: "subject pronouns", category: "Subjects" },
          { left: "me / him / her / them", right: "object pronouns", category: "Objects" },
          { left: "my / your / his / her", right: "possessive adjectives", category: "Possessives" },
          { left: "mine / yours / hers", right: "possessive pronouns", category: "Possessives" },
          { left: "who / which / that", right: "relative pronouns (defining)", category: "Relatives" },
          { left: "whose / where / when / why", right: "relative (possession / place / time / reason)", category: "Relatives" },
          { left: "this / that / these / those", right: "demonstratives", category: "Demonstratives" },
          { left: "myself / yourself", right: "reflexive pronouns", category: "Reflexives" },
          { left: "one / ones", right: "substitute for noun", category: "Indefinite" }
        ],
        flashcard: [
          { front: "Subject vs object pronouns?", back: "I/he/she/they vs me/him/her/them", category: "Pronouns" },
          { front: "Possessive adj. vs pronoun?", back: "My book vs The book is mine", category: "Possessives" },
          { front: "Defining vs non-defining?", back: "Defining: no commas, that OK. Non-defining: commas, who/which only", category: "Relatives" },
          { front: "Who vs whom?", back: "Who = subject ; whom = object (formal)", category: "Interrogatives" },
          { front: "Relative who?", back: "Subject — The man who called", category: "Relatives" },
          { front: "Relative which/that?", back: "Things — The book (that/which) I read", category: "Relatives" },
          { front: "Whose / where / when?", back: "Possession / place / time in defining relatives", category: "Relatives" },
          { front: "Reflexive pronouns?", back: "Myself, yourself, himself, herself, itself, ourselves, themselves", category: "Reflexives" },
          { front: "Demonstratives?", back: "This/that (sing.) ; these/those (pl.)", category: "Demonstratives" },
          { front: "One / ones?", back: "I need a pen — a red one", category: "Substitution" }
        ],
        transform: [
          { instruction: "Replace with an object pronoun.", original: "I know Sarah.", answer: "I know her.", explanation: "Sarah → her (object)." },
          { instruction: "Use a possessive pronoun.", original: "This is my bag.", answer: "This bag is mine.", explanation: "Mine replaces my bag." },
          { instruction: "Combine with a relative clause.", original: "The girl is smart. She sits next to me.", answer: "The girl who sits next to me is smart.", explanation: "Who = subject." },
          { instruction: "Use a reflexive pronoun.", original: "He cut him.", answer: "He cut himself.", explanation: "Reflexive when subject = object." },
          { instruction: "Cleft sentence for emphasis.", original: "John broke the window.", answer: "It was John who broke the window.", explanation: "It was … who …" },
          { instruction: "Replace with 'one'.", original: "I want a blue shirt.", answer: "I want a blue one.", explanation: "One replaces shirt." },
          { instruction: "Correct the pronoun.", original: "Me and him went to the store.", answer: "He and I went to the store.", explanation: "Subject pronouns." },
          { instruction: "Relative clause with 'where'.", original: "That's the café. I met her there.", answer: "That's the café where I met her.", explanation: "Where = place." }
        ]
      },
      adv: {
        gap: [
          { sentence: "She speaks English ___.", answer: "fluently", hint: "adverb -ly", explanation: "Fluent → fluently." },
          { sentence: "I ___ go to the gym.", answer: "often", hint: "frequency adverb", explanation: "Often = frequency, before main verb." },
          { sentence: "He ___ eats meat.", answer: "never", hint: "negative frequency", explanation: "Never = zero frequency." },
          { sentence: "She is ___ late.", answer: "always", hint: "frequency with 'be'", explanation: "Always after be." },
          { sentence: "They worked ___ .", answer: "hard", hint: "adverb same as adjective", explanation: "Hard = adverb (work hard)." },
          { sentence: "It's ___ raining.", answer: "still", hint: "time adverb", explanation: "Still = continuing action." },
          { sentence: "___ , I don't agree.", answer: "However", hint: "connector adverb", explanation: "However = contrast." },
          { sentence: "She runs ___.", answer: "quickly", hint: "-ly adverb", explanation: "Quick → quickly." }
        ],
        mcq: [
          { question: "Adverb from 'happy'", options: ["happyly", "happily", "happy", "happiness"], correct: 1, explanation: "Happy → happily (y → i)." },
          { question: "Position: « I ___ eat breakfast. » (usually)", options: ["eat usually", "usually eat", "usually eats", "eat usually do"], correct: 1, explanation: "Usually before main verb." },
          { question: "« She is ___ tired. » (very)", options: ["very", "much", "many", "lot"], correct: 0, explanation: "Very + adjective." },
          { question: "Negative: « I ___ understand. »", options: ["don't never", "never don't", "don't ever", "not never"], correct: 2, explanation: "Don't ever (not double negative in standard English)." },
          { question: "Adverb of place", options: ["here", "often", "very", "slowly"], correct: 0, explanation: "Here = place." },
          { question: "« He works ___. » (good)", options: ["good", "well", "goodly", "best"], correct: 1, explanation: "Well = adverb ; good = adjective." },
          { question: "Connector: result", options: ["however", "therefore", "although", "whereas"], correct: 1, explanation: "Therefore = result." },
          { question: "« ___ late » (in addition)", options: ["Also", "Too", "Either", "A and B"], correct: 3, explanation: "Also mid-position ; too at end." }
        ],
        matching: [
          { left: "-ly", right: "adverb formation", category: "Formation" },
          { left: "always / often / never", right: "frequency", category: "Frequency" },
          { left: "here / there / everywhere", right: "place", category: "Place" },
          { left: "now / then / already", right: "time", category: "Time" },
          { left: "very / quite / too", right: "degree", category: "Degree" },
          { left: "however / therefore", right: "sentence connectors", category: "Connectors" },
          { left: "well / hard / fast", right: "irregular adverbs", category: "Irregular" },
          { left: "not / never", right: "negation", category: "Negation" }
        ],
        flashcard: [
          { front: "Adverb formation -ly?", back: "Quick → quickly ; happy → happily ; true → truly", category: "Formation" },
          { front: "Frequency adverb position?", back: "Before main verb — I often go ; after be — She is always late", category: "Frequency" },
          { front: "Good vs well?", back: "Good = adjective ; well = adverb — He sings well", category: "Irregular" },
          { front: "Very vs much?", back: "Very + adj/adv ; much + verb/comparative — much better", category: "Degree" },
          { front: "Never position?", back: "Before main verb — I never smoke", category: "Negation" },
          { front: "However vs although?", back: "However starts sentence ; although + clause", category: "Connectors" },
          { front: "Still vs yet?", back: "Still = continuing ; yet = until now (neg/questions)", category: "Time" },
          { front: "Too vs also vs either?", back: "Also (aff.) ; too (end) ; either (neg.)", category: "Addition" }
        ],
        transform: [
          { instruction: "Form the adverb.", original: "She speaks (clear).", answer: "She speaks clearly.", explanation: "Clear → clearly." },
          { instruction: "Add a frequency adverb.", original: "He is late.", answer: "He is always late.", explanation: "Always after be." },
          { instruction: "Use 'however' for contrast.", original: "It rained. We went out.", answer: "It rained. However, we went out.", explanation: "However at start of sentence." },
          { instruction: "Correct the adverb.", original: "She sings good.", answer: "She sings well.", explanation: "Well modifies verb." },
          { instruction: "Negative with 'never'.", original: "I sometimes forget.", answer: "I never forget.", explanation: "Never replaces sometimes." },
          { instruction: "Use 'therefore'.", original: "He studied hard. He passed.", answer: "He studied hard; therefore, he passed.", explanation: "Therefore = result." },
          { instruction: "Place 'often' correctly.", original: "She goes often to the cinema.", answer: "She often goes to the cinema.", explanation: "Often before main verb." },
          { instruction: "Intensify with 'very'.", original: "The test was difficult.", answer: "The test was very difficult.", explanation: "Very + adjective." }
        ]
      },
      disc: {
        gap: [
          { sentence: "___ do you live ?", answer: "Where", hint: "Wh- question", explanation: "Where asks about place." },
          { sentence: "She asked ___ I was ready.", answer: "if", hint: "indirect yes/no question", explanation: "If/whether in indirect questions." },
          { sentence: "___ beautiful the sunset is !", answer: "How", hint: "exclamation", explanation: "How + adjective exclamation." },
          { sentence: "I know ___ he is honest.", answer: "that", hint: "noun clause", explanation: "That introduces content clause." },
          { sentence: "___ you help me, please ?", answer: "Can", hint: "modal question", explanation: "Modal inversion for request." },
          { sentence: "Not only did she win, ___ she broke the record.", answer: "but", hint: "correlative conjunction", explanation: "Not only … but (also)." },
          { sentence: "Rarely ___ I seen such talent.", answer: "have", hint: "inversion after negative adverb", explanation: "Rarely + auxiliary + subject." },
          { sentence: "Tell me ___ your name is.", answer: "what", hint: "embedded question", explanation: "Embedded WH: what your name is (no inversion)." }
        ],
        mcq: [
          { question: "Correct question word order ?", options: ["Where you live?", "Where do you live?", "Where live you?", "You live where?"], correct: 1, explanation: "Auxiliary do + subject + base." },
          { question: "Indirect question: « He asked where ___ . »", options: ["is she", "she is", "does she", "she does"], correct: 1, explanation: "Statement order in embedded clause." },
          { question: "Tag question: « You're ready, ___ ? »", options: ["aren't you", "don't you", "isn't it", "won't you"], correct: 0, explanation: "Match auxiliary and subject." },
          { question: "Conditional: « If it rains, we ___ home. »", options: ["stay", "will stay", "stayed", "staying"], correct: 1, explanation: "First conditional: if + present, will + base." },
          { question: "Exclamation: « ___ fast he runs ! »", options: ["What", "How", "So", "Such"], correct: 1, explanation: "How + adverb/adjective." },
          { question: "Passive question: « ___ the letter sent ? »", options: ["Was", "Did", "Is", "Has"], correct: 0, explanation: "Was + subject + past participle." },
          { question: "Subordinator of reason", options: ["because", "although", "unless", "until"], correct: 0, explanation: "Because = reason." },
          { question: "Fronting for emphasis: « ___ the door ! »", options: ["Do open", "Open", "Opening", "Opened"], correct: 1, explanation: "Imperative: base form." }
        ],
        matching: [
          { left: "Subject-Verb-Object", right: "basic word order", category: "Syntax" },
          { left: "Do/Does + subject + verb", right: "yes/no question", category: "Questions" },
          { left: "Wh-word + auxiliary", right: "Wh- question", category: "Questions" },
          { left: "Statement order in subordinate", right: "indirect question", category: "Questions" },
          { left: "If / when / because", right: "subordinating conjunctions", category: "Clauses" },
          { left: "Although / while", right: "contrast clauses", category: "Clauses" },
          { left: "Not only … but also", right: "correlative pair", category: "Syntax" },
          { left: "Negative adverb + inversion", right: "Never have I …", category: "Inversion" }
        ],
        flashcard: [
          { front: "Basic English word order?", back: "Subject + Verb + Object — I read books", category: "Syntax" },
          { front: "Yes/no question form?", back: "Do/Does/Did + S + V — Do you like tea?", category: "Questions" },
          { front: "Wh- question form?", back: "Wh + aux + S + V — Where do you live?", category: "Questions" },
          { front: "Indirect question?", back: "No inversion — Tell me where she lives", category: "Questions" },
          { front: "Tag questions?", back: "Positive clause → negative tag — You're ready, aren't you?", category: "Questions" },
          { front: "First conditional?", back: "If + present, will + base — If it rains, I will stay", category: "Clauses" },
          { front: "Although vs but?", back: "Although + clause ; but connects two main clauses", category: "Clauses" },
          { front: "Exclamation with How/What?", back: "How + adj/adv ; What + (a) + noun — How nice! What a day!", category: "Exclamations" }
        ],
        transform: [
          { instruction: "Make a Wh- question.", original: "She lives in Paris.", answer: "Where does she live?", explanation: "Where + does + subject + base." },
          { instruction: "Indirect question.", original: "Where is the station?", answer: "Can you tell me where the station is?", explanation: "No inversion in embedded clause." },
          { instruction: "Add a tag question.", original: "You've finished, ___", answer: "You've finished, haven't you?", explanation: "Have → haven't." },
          { instruction: "Combine with 'because'.", original: "I stayed home. I was sick.", answer: "I stayed home because I was sick.", explanation: "Because + reason clause." },
          { instruction: "First conditional.", original: "It rains. We cancel the picnic.", answer: "If it rains, we will cancel the picnic.", explanation: "If + present, will + base." },
          { instruction: "Exclamation with 'What'.", original: "It is a wonderful idea.", answer: "What a wonderful idea!", explanation: "What + (a) + adj + noun." },
          { instruction: "Passive question.", original: "Someone stole the bike.", answer: "Was the bike stolen?", explanation: "Was + subject + past participle." },
          { instruction: "Inversion after 'Never'.", original: "I have never seen this.", answer: "Never have I seen this.", explanation: "Never + have + I." }
        ]
      },
      num: {
        gap: [
          { sentence: "There are ___ apples on the table.", answer: "five", hint: "cardinal number", explanation: "Cardinal + countable plural noun." },
          { sentence: "She is ___ years old.", answer: "twenty", hint: "age", explanation: "Be + number + years old." },
          { sentence: "I have ___ money left.", answer: "little", hint: "quantifier uncountable", explanation: "Little + uncountable (small amount)." },
          { sentence: "___ students passed the exam.", answer: "Most", hint: "quantifier", explanation: "Most + plural countable." },
          { sentence: "We need ___ water.", answer: "some", hint: "indefinite quantity", explanation: "Some + uncountable in affirmative." },
          { sentence: "___ of the cake is gone.", answer: "Half", hint: "fraction", explanation: "Half of + noun." },
          { sentence: "There aren't ___ chairs.", answer: "enough", hint: "quantifier", explanation: "Enough + plural noun." },
          { sentence: "It's the ___ time I've called.", answer: "third", hint: "ordinal", explanation: "Third = 3rd." }
        ],
        mcq: [
          { question: "« ___ people came. » (a large number)", options: ["Much", "Many", "Lot", "Fewer"], correct: 1, explanation: "Many + countable plural." },
          { question: "« ___ water do you need ? »", options: ["How many", "How much", "How lot", "How few"], correct: 1, explanation: "How much + uncountable." },
          { question: "Fraction: 1/4", options: ["a quarter", "a fourthly", "one four", "quarter of"], correct: 0, explanation: "A quarter = 1/4." },
          { question: "« ___ advice did he give ? »", options: ["How many", "How much", "How few", "How little"], correct: 1, explanation: "Advice uncountable → how much." },
          { question: "Few vs a few ?", options: ["Same meaning", "Few = almost none ; a few = some", "A few = negative", "Few = many"], correct: 1, explanation: "Few (negative) vs a few (positive)." },
          { question: "Ordinal of 2", options: ["two", "second", "twice", "twoth"], correct: 1, explanation: "Second = 2nd." },
          { question: "« ___ of the students » (all)", options: ["All", "Every", "Each", "Whole"], correct: 0, explanation: "All of the + plural." },
          { question: "1,000,000", options: ["a million", "one millions", "a million of", "million"], correct: 0, explanation: "A million (singular form)." }
        ],
        matching: [
          { left: "one, two, three", right: "cardinals", category: "Numbers" },
          { left: "first, second, third", right: "ordinals", category: "Numbers" },
          { left: "many / much", right: "large quantity", category: "Quantifiers" },
          { left: "few / little", right: "small quantity", category: "Quantifiers" },
          { left: "some / any", right: "indefinite amount", category: "Quantifiers" },
          { left: "all / most / half", right: "proportion", category: "Quantifiers" },
          { left: "a quarter / a third", right: "fractions", category: "Fractions" },
          { left: "dozen / pair / score", right: "collective numbers", category: "Numbers" }
        ],
        flashcard: [
          { front: "Many vs much?", back: "Many + countable ; much + uncountable", category: "Quantifiers" },
          { front: "Few vs little?", back: "Few + countable ; little + uncountable", category: "Quantifiers" },
          { front: "How many vs how much?", back: "How many + count ; how much + uncount", category: "Questions" },
          { front: "Ordinal suffix?", back: "1st, 2nd, 3rd, 4th… — first, second, third, fourth", category: "Ordinals" },
          { front: "Fractions?", back: "A half, a third, a quarter, three quarters", category: "Fractions" },
          { front: "Some vs any?", back: "Some (affirmative) ; any (neg/questions)", category: "Quantifiers" },
          { front: "All of / most of ?", back: "All of the + noun ; most of the + noun", category: "Proportion" },
          { front: "A dozen ?", back: "12 — a dozen eggs", category: "Collectives" }
        ],
        transform: [
          { instruction: "Write in words.", original: "37", answer: "thirty-seven", explanation: "Hyphen between tens and units." },
          { instruction: "Use 'much' or 'many'.", original: "How ___ (book) do you have?", answer: "How many books do you have?", explanation: "Books countable → many." },
          { instruction: "Ordinal form.", original: "He finished in place 1.", answer: "He finished in first place.", explanation: "First = 1st." },
          { instruction: "Fraction.", original: "50% of the class", answer: "Half of the class", explanation: "50% = half." },
          { instruction: "Negative with 'any'.", original: "I have some questions.", answer: "I don't have any questions.", explanation: "Some → any in negatives." },
          { instruction: "Quantifier with uncountable.", original: "There isn't water.", answer: "There isn't much water.", answerAlt: ["There is little water."], explanation: "Much/little + uncountable." },
          { instruction: "Large number.", original: "2,500", answer: "two thousand five hundred / twenty-five hundred", explanation: "Both forms common in English." },
          { instruction: "Correct the quantifier.", original: "Much people were there.", answer: "Many people were there.", explanation: "People countable → many." }
        ]
      }
    }
  };
})(typeof window !== "undefined" ? window : global);
