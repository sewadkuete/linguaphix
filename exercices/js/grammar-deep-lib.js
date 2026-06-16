(function(global) {
  "use strict";

  function G(brief, formation, rules, examples, pitfalls, register, seeAlso) {
    return {
      brief: brief,
      formation: formation,
      rules: rules,
      examples: examples,
      pitfalls: pitfalls && pitfalls.length ? pitfalls : [rules[0]],
      register: register || "",
      seeAlso: seeAlso || ""
    };
  }

  var fr = {
    nom_definite: G(
      "L'article défini (le, la, l', les) désigne une personne ou une chose identifiée, unique ou déjà mentionnée.",
      "Masc. sing. : le | Fém. sing. : la | Devant voyelle/h muet : l' | Pluriel (tous genres) : les",
      ["Le/la/les s'accordent en genre et en nombre avec le nom.", "L' remplace le ou la devant voyelle ou h muet.", "Les peut désigner une catégorie entière : les enfants.", "Avec complément : le livre de Pierre."],
      ["Le chat dort sur le canapé.", "La fille lit un roman.", "L'école commence à huit heures.", "Les étudiants préparent l'examen."],
      ["*l'héros → le héros (h aspiré).", "*le amie → mon amie / l'amie (élision obligatoire)."],
      "À l'écrit, le « e » de le/les se prononce ; à l'oral, élision fréquente (l'ami).",
      "Article indéfini → A1|nom|Article indéfini (un, une, des)"
    ),
    nom_indefinite: G(
      "L'article indéfini (un, une, des) introduit une entité non précisée ou mentionnée pour la première fois.",
      "Masc. sing. : un | Fém. sing. : une | Pluriel : des",
      ["Un/une = une unité parmi d'autres, non identifiée.", "Des = plusieurs instances non spécifiées.", "Devant adjectif + nom : un grand arbre.", "Après c'est : C'est un médecin."],
      ["J'ai acheté un vélo neuf.", "Elle porte une robe bleue.", "Des oiseaux chantent dans le jardin.", "C'est un excellent professeur."],
      ["Après négation : *pas des amis → pas d'amis (de/d')."],
      "Oral : des souvent réduit [də] ; à l'écrit, des reste obligatoire à l'affirmatif.",
      "Article défini → A1|nom|Article défini ; négation + de → A1|nom|Article partitif"
    ),
    nom_partitive: G(
      "Le partitif (du, de la, de l', des) exprime une quantité indéfinie, surtout avec des matières ou des dénombrables au pluriel.",
      "Masc. : du (= de + le) | Fém. : de la | Devant voyelle : de l' | Pluriel comptable : des",
      ["Avec manger, boire, acheter, vouloir, avoir besoin de.", "Du/de la/de l' = une partie de (substance).", "Après négation : de (Je n'ai pas de pain).", "Quantité précise : un kilo de pommes (pas *du kilo)."],
      ["Je mange du fromage.", "Elle boit de l'eau minérale.", "Nous avons besoin de patience.", "Ils achètent des légumes frais."],
      ["Négation : *pas du pain → pas de pain.", "*beaucoup du monde → beaucoup de monde."],
      "Québec : partitif identique ; oral France : « de » seul après pas très fréquent à l'oral familier.",
      "Expressions de quantité → A1|num|beaucoup de, peu de"
    ),
    nom_contractes: G(
      "Les contractions fusionnent à et de avec le/les.",
      "à + le → au\nà + les → aux\nde + le → du\nde + les → des\n\nPas de contraction : à la, de la, à l', de l'",
      ["Au/aux remplace à le/à les.", "Du/des dans le partitif.", "Pas de contraction avec la : à la gare.", "Devant pronoms : j'y vais, j'en veux."],
      ["Je vais au marché.", "Elle parle aux enfants.", "Il mange du riz.", "Nous pensons aux vacances."],
      ["Erreur : à le marché au lieu de au marché."],
      "À l'écrit, contractions obligatoires ; à l'oral, de la/à la inchangés.",
      "Articles de base → A1|nom|Article défini ; locutions sans article → A2|nom"
    ),
    nom_zero: G(
      "L'article zéro apparaît avec professions, matières et expressions générales.",
      "Profession : Il est médecin.\nMatière : J'étudie le français.\nHeure : Il est midi.\nRepas : déjeuner, dîner",
      ["Après être + profession : pas d'article.", "Avec devenir : devenir professeur.", "Noms propres sans article : Paris.", "Titres : le président Macron."],
      ["Mon frère est ingénieur.", "Elle devient directrice.", "Nous déjeunons à midi.", "Victor habite à Lyon."],
      ["Avec adjectif : C'est un bon médecin (article requis)."]
    ),
    pluriel_regulier: G(
      "Le pluriel régulier des noms s'obtient en ajoutant -s au singulier.",
      "singulier + -s → pluriel | chat → chats | table → tables",
      ["Règle de base : +s au nom singulier.", "Le déterminant s'accorde : les + nom pluriel.", "L'adjectif épithète s'accorde aussi.", "Singulier en -s, -x, -z : pluriel identique (le nez → les nez)."],
      ["Un chat → des chats.", "La fille → les filles.", "Mon livre → mes livres.", "Le nez → les nez."],
      ["*des chat → des chats (oubli du -s).", "*des chevals → des chevaux (irrégulier)."],
      "",
      "Pluriel irrégulier et noms composés → A2|nom"
    ),
    nom_composes: G(
      "Les noms composés forment leur pluriel selon la nature de chaque élément.",
      "verbe + nom : les passe-temps, les grands-pères\n\nadverbe + nom : les arrière-grands-parents\n\nnom + nom : les chefs-d'œuvre\n\nadjectif + nom : les bleu marine (invariables)\n\nverbe + adj./nom : les laissez-passer",
      ["Verbe + nom : pluriel sur le nom (des cache-col).", "Adverbe + nom : pluriel sur le nom (des arrière-boutiques).", "Nom + nom : pluriel sur le 2e nom (des chefs-d'œuvre).", "Adjectif + nom invariable : bleu marine, rose bonbon ; sinon accord (grands-pères, sourds-muets)."],
      ["Les grands-parents sont arrivés.", "Les chefs-d'œuvre du musée.", "Des passeports et des laissez-passer.", "Des arrière-petits-enfants."],
      ["Des chef-d'œuvres → des chefs-d'œuvre (pluriel sur le 2e élément)."],
      "Apprendre en blocs lexicaux ; règles de pluriel surtout à l'écrit.",
      "Pluriel régulier → A1|nom|Pluriel régulier"
    ),
    nom_negation_de: G(
      "Après négation, indéfinis et partitifs deviennent de (ou d').",
      "Pas de un/une/des/du/de la → de/d'\n\nJe n'ai pas de stylo.\nIl ne mange pas de viande.\nElle n'a pas d'argent.",
      ["Ne...pas/plus/jamais → de + nom.", "Exception : ne...que garde l'article.", "De → d' devant voyelle.", "Ce n'est pas un problème (identité)."],
      ["Je n'ai pas de questions.", "Nous n'avons plus de lait.", "Il ne boit jamais de café.", "Ce ne sont pas des erreurs graves."],
      ["Pas du pain mais de pain."]
    ),
    verb_etre_avoir: G(
      "Être et avoir sont les deux auxiliaires fondamentaux ; leurs formes au présent sont irrégulières et très fréquentes.",
      "ÊTRE : je suis, tu es, il/elle/on est, nous sommes, vous êtes, ils/elles sont\nAVOIR : j'ai, tu as, il/elle/on a, nous avons, vous avez, ils/elles ont",
      ["Être : état, identité, localisation, profession (sans article).", "Avoir : possession, âge (J'ai 20 ans), faim/soif/peur.", "Auxiliaires au passé composé.", "On + verbe à la 3e pers. sing. : On est prêts (oral)."],
      ["Je suis étudiant.", "Tu as raison.", "Nous sommes en France.", "Ils ont deux enfants."],
      ["*J'ai 20 ans → correct ; *Je suis 20 ans → faux.", "*Il est un médecin → Il est médecin (profession sans article)."],
      "Oral : « on est » pour « nous sommes » très courant ; à l'écrit scolaire, distinguer on (indéfini) et nous.",
      "Verbes en -er → A1|verb|Verbes en -er groupe 1"
    ),
    verb_present_er: G(
      "Les verbes du 1er groupe (-er) forment le présent en ajoutant les terminaisons -e, -es, -e, -ons, -ez, -ent au radical.",
      "PARLER : je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent\nRadical + -e, -es, -e, -ons, -ez, -ent",
      ["Groupe le plus productif : chanter, aimer, travailler.", "4 formes orales identiques : je/tu/il/ils → [parl].", "Verbes en -ger : nous mangeons (e conservé).", "Verbes en -cer : nous commençons (ç devant a/o)."],
      ["Je parle français.", "Tu aimes le café.", "Nous travaillons ensemble.", "Ils chantent bien."],
      ["*Je parl → je parle (terminaison obligatoire à l'écrit).", "Impératif tu : *Parles ! → Parle ! (pas de -s)."],
      "Oral : je/tu/il/ils souvent identiques ; nous/vous/ez distincts.",
      "Être & avoir → A1|verb|Être & avoir (présent) ; impératif → A1|verb|Impératif"
    ),
    verb_present_ir: G(
      "Les verbes du 2e groupe (-ir) ont -iss- au pluriel : -is, -is, -it, -issons, -issez, -issent.",
      "FINIR : je finis, tu finis, il/elle finit, nous finissons, vous finissez, ils/elles finissent\n\nChoisis, punis, réussis suivent ce modèle.",
      ["-iss- obligatoire au pluriel.", "2e groupe = -ir + -iss- au pluriel.", "1er groupe en -ir (couvrir) ≠ 2e groupe.", "Participe passé 2e grp : -i (finir → fini)."],
      ["Je finis mes devoirs.", "Elle choisit un livre.", "Nous réussissons l'examen.", "Ils grandissent vite."],
      ["Ouvir, couvrir sont du 3e groupe malgré -ir."]
    ),
    verb_present_re: G(
      "Les verbes en -re perdent le -d- à la 3e personne du singulier.",
      "ATTENDRE : j'attends, tu attends, il/elle attend, nous attendons, vous attendez, ils/elles attendent\n\nVENDRE : je vends, tu vends, il vend, nous vendons, vous vendez, ils vendent",
      ["3e sing. : -d- du radical disparaît.", "Radical + -s, -s, Ø, -ons, -ez, -ent.", "Attendre, vendre, répondre sont fréquents.", "PP souvent en -u (attendu, vendu)."],
      ["J'attends le bus.", "Tu réponds à la question.", "Il vend sa voiture.", "Nous entendons la cloche."],
      ["3e sing. attend, pas attendd."]
    ),
    verb_aller: G(
      "Aller est irrégulier au présent et sert au futur proche.",
      "je vais, tu vas, il/elle/on va, nous allons, vous allez, ils/elles vont\n\nFutur proche : aller (conj.) + infinitif",
      ["Présent totalement irrégulier.", "Futur proche : intention proche.", "Aller + infinitif = futur proche.", "PC : je suis allé(e) (auxiliaire être)."],
      ["Je vais au cinéma.", "Tu vas comprendre.", "Nous allons partir demain.", "Ils vont très vite."],
      ["PC avec être : je suis allé(e), pas j'ai allé."]
    ),
    verb_venir: G(
      "Venir et ses composés (devenir, revenir) suivent un modèle en -iens/-ient.",
      "VENIR : je viens, tu viens, il/elle vient, nous venons, vous venez, ils/elles viennent\n\nDEvenir : je deviens, il devient",
      ["Radical ven-/vien- alternance.", "PC avec être : je suis venu(e).", "Venir de + inf. = action récente.", "Préposition de : venir de Paris."],
      ["Je viens de Marseille.", "Elle vient de terminer.", "Nous venons vous voir.", "Ils viennent d'arriver."],
      ["Venir de + inf. ≠ venir de + lieu."]
    ),
    verb_faire: G(
      "Faire est très fréquent pour actions, météo et expressions idiomatiques.",
      "je fais, tu fais, il/elle/on fait, nous faisons, vous faites, ils/elles font\n\nPC : j'ai fait",
      ["Auxiliaire avoir au PC.", "Météo : Il fait beau/froid.", "Expressions : faire attention, faire semblant.", "Causatif : faire + inf. (Je fais réparer)."],
      ["Je fais mes devoirs.", "Il fait du sport.", "Nous faisons la cuisine.", "Qu'est-ce que tu fais ?"],
      ["Ne pas confondre faire et aller pour météo anglaise."]
    ),
    verb_pouvoir_vouloir: G(
      "Pouvoir (capacité/permission) et vouloir (volonté) ont des radicaux irréguliers.",
      "POUVOIR : je peux, tu peux, il/elle peut, nous pouvons, vous pouvez, ils/elles peuvent\n\nVOULOIR : je veux, tu veux, il/elle veut, nous voulons, vous voulez, ils/elles veulent",
      ["Pouvoir + infinitif sans de.", "Vouloir + inf. ou nom.", "Conditionnel : je voudrais (politesse).", "Impératif : veuillez (formule)."],
      ["Je peux vous aider.", "Veux-tu du thé ?", "Nous voulons réussir.", "Ils peuvent partir."],
      ["Pouvoir ≠ savoir pour compétence."],
      "Je voudrais / Pourriez-vous : registre courant poli (conditionnel, pas paradigme complet).",
      "Devoir (obligation) → A2|verb ; conditionnel complet → B1|verb"
    ),
    verb_savoir_connaitre: G(
      "Savoir = connaissance factuelle ; connaître = familiarité avec personne/lieu.",
      "SAVOIR : je sais, tu sais, il sait, nous savons, vous savez, ils savent\n\nCONNAÎTRE : je connais, tu connais, il connaît, nous connaissons, vous connaissez, ils connaissent",
      ["Savoir + inf. ou subordonnée.", "Connaître + nom/personne.", "PC savoir : j'ai su ; connaître : j'ai connu.", "Je ne sais pas vs Je ne connais pas."],
      ["Je sais nager.", "Tu connais Marie ?", "Nous savons la vérité.", "Ils connaissent bien Paris."],
      ["Savoir par cœur ≠ connaître par cœur (les deux existent)."],
      "Distinction fondamentale dès A2 ; savoir + infinitif très productif.",
      "Pouvoir (capacité) → A2|verb"
    ),
    verb_prendre_metre: G(
      "Prendre et mettre sont irréguliers avec alternances vocaliques.",
      "PRENDRE : je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent\n\nMETTRE : je mets, tu mets, il met, nous mettons, vous mettez, ils mettent",
      ["Prendre : transport, repas, décision.", "Mettre : placement, vêtements.", "Composés : comprendre, apprendre, promettre.", "PC : pris, mis."],
      ["Je prends le train.", "Elle met son manteau.", "Nous prenons une décision.", "Ils mettent la table."],
      ["Apprendre ≠ comprendre au sens."]
    ),
    pc_avoir: G(
      "Le passé composé avec avoir exprime une action achevée dans le passé.",
      "avoir (présent) + participe passé\n\nJ'ai mangé, tu as parlé, il a fini, nous avons vu, vous avez écrit, ils ont dormi",
      ["Majorité des verbes avec avoir.", "Action ponctuelle ou résultat présent.", "Marqueurs : hier, déjà, jamais (passé).", "PP régulier -er : -é ; -ir 2e grp : -i ; -re : -u."],
      ["J'ai terminé mon travail.", "Tu as téléphoné hier.", "Nous avons visité Rome.", "Ils ont beaucoup ri."],
      ["Ne pas confondre avec imparfait pour description."],
      "Oral : PC très fréquent ; imparfait pour narration descriptive.",
      "PC avec être → A2|verb|Passé composé (être) ; opposition PC/imparfait → A2|verb"
    ),
    pc_etre: G(
      "Seize verbes de mouvement/changement d'état se conjuguent avec être au PC.",
      "être (présent) + participe passé\n\nVerbes : aller, venir, arriver, partir, entrer, sortir, monter, descendre, retourner, passer, rester, tomber, naître, mourir, devenir, revenir\n\nJe suis allé(e), elle est partie",
      ["Auxiliaire être obligatoire pour ces verbes.", "Accord du PP avec le sujet.", "Retourner/rester/passer + être si changement de lieu.", "Passer un examen / passer du temps → avoir."],
      ["Je suis arrivé(e) à huit heures.", "Elle est sortie du bureau.", "Nous sommes restés une semaine.", "Ils sont nés en Italie."],
      ["Passer avec avoir = transitif (J'ai passé l'examen)."],
      "Liste des verbes être à mémoriser dès A2.",
      "Accord du p.p. → A2|verb|Accord du participe passé"
    ),
    pc_accord_pp: G(
      "Avec être, le participe passé s'accorde en genre et nombre avec le sujet.",
      "Sujet F sing. : allée, venue, née\nSujet F pl. : allées, parties, nées\nSujet M pl. : allés, venus\n\nElle est allée. Ils sont partis. Marie et Paul sont arrivés.",
      ["Accord avec sujet si auxiliaire être.", "Avec avoir : accord si COD avant verbe.", "Elle s'est lavée (reflexif, accord sujet).", "Elle s'est lavé les mains (COD après, pas accord)."],
      ["Marie est venue.", "Les filles sont parties.", "Ils se sont regardés.", "Elle s'est acheté un livre."],
      ["COD placement détermine l'accord avec avoir."],
      "À l'oral, accord féminin parfois moins marqué ; à l'écrit, obligatoire.",
      "Verbes pronominaux → A2|verb|Verbes pronominaux"
    ),
    pc_pp_irreguliers: G(
      "De nombreux participes passés sont irréguliers et doivent être mémorisés.",
      "faire → fait | voir → vu | prendre → pris | mettre → mis\nécrire → écrit | lire → lu | boire → bu | connaître → connu\nouvrir → ouvert | offrir → offert | recevoir → reçu",
      ["Listes fréquentes : fait, vu, pris, dit, écrit.", "Ouverts en -ert : couvert, offert.", "Dire → dit ; lire → lu.", "Apprendre → appris."],
      ["J'ai lu ce roman.", "Tu as bu du café.", "Nous avons écrit une lettre.", "Ils ont reçu un cadeau."],
      ["Ouvert ≠ ouvrir régulier."]
    ),
    imparfait_endings: G(
      "L'imparfait se forme avec le radical du nous au présent + terminaisons -ais, -ais, -ait, -ions, -iez, -aient.",
      "PARLER (nous parlons) → je parlais, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient\n\nÊTRE : j'étais, tu étais, il était, nous étions, vous étiez, ils étaient\n\nTerminaisons : -ais, -ais, -ait, -ions, -iez, -aient",
      ["Radical = nous au présent sans -ons.", "Seul être est totalement irrégulier.", "1re personne sing. et pl. : -ais/-ions (pas de confusion).", "Toutes les personnes partagent le même radical."],
      ["Je parlais français enfant.", "Tu étais toujours en retard.", "Il pleuvait hier.", "Nous habitions à Lyon."],
      ["Radical finiss- → finiss-ions, pas fin-ions."],
      "Formation régulière ; être à mémoriser à part.",
      "Valeurs de l'imparfait → A2|verb|Imparfait (emplois)"
    ),
    imparfait_usage: G(
      "L'imparfait décrit habitudes, descriptions et actions en cours dans le passé.",
      "Imparfait seul ou avec PC\n\nQuand j'étais petit, je jouais au parc.\nIl faisait beau ; nous marchions.",
      ["Description, habitude, background.", "Action interrompue par PC.", "États, météo, émotions passées.", "Marqueurs : toujours, souvent, chaque jour."],
      ["Il faisait froid ce matin-là.", "Je lisais quand tu as téléphoné.", "Nous allions à la plage chaque été.", "Elle était fatiguée."],
      ["Ne pas utiliser pour action unique terminée seule."],
      "Narration : imparfait = toile de fond ; PC = incident.",
      "Opposition PC / imparfait → A2|verb"
    ),
    imparfait_vs_pc: G(
      "PC = action ponctuelle ; imparfait = description, habitude ou durée.",
      "PC : J'ai mangé à midi (fait achevé)\nImparfait : Je mangeais quand il est arrivé (action en cours)\n\nQuand + imparfait, PC pour l'incident",
      ["PC first, imparfait background.", "Deux actions passées : PC si antériorité brève.", "Imparfait pour simultanéité descriptive.", "Autrefois + imparfait pour habitudes."],
      ["Je regardais la télé quand il a sonné.", "Hier, j'ai vu Pierre.", "Autrefois, on voyageait en train.", "Elle a dit qu'elle était malade."],
      ["Erreur : *Quand j'ai eu 10 ans → Quand j'avais 10 ans."],
      "Critère DELF A2 : maîtriser l'opposition dans le récit.",
      "Passé composé (avoir/être) → A2|verb"
    ),
    futur_proche: G(
      "Le futur proche exprime une action imminente ou une intention proche.",
      "aller (présent) + infinitif\n\nJe vais partir, tu vas manger, il va arriver, nous allons étudier, vous allez comprendre, ils vont venir",
      ["Plus immédiat que futur simple.", "Intention ou plan quasi certain.", "Aller conjugué selon le sujet.", "Négation : ne vais pas partir."],
      ["Je vais te téléphoner.", "Nous allons dîner ensemble.", "Il va pleuvoir.", "Ils vont s'installer ici."],
      ["Ne pas confondre avec présent de proximité anglais."]
    ),
    futur_simple: G(
      "Le futur simple se forme avec l'infinitif + terminaisons -ai, -as, -a, -ons, -ez, -ont.",
      "PARLER : je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront\n\nFINIR : je finirai, tu finiras...\n\nÊTRE : je serai | AVOIR : j'aurai | ALLER : j'irai | FAIRE : je ferai",
      ["Infinitif entier + terminaisons.", "Verbes irréguliers : radical futur spécial.", "Promesse, prédiction, futur lointain.", "Futur antérieur : aurai + PP."],
      ["Je t'appellerai demain.", "Tu réussiras l'examen.", "Il fera beau ce week-end.", "Nous partirons en juin."],
      ["Radical futur irrégulier : je verrai, j'aurai, je serai."],
      "Subordonnée temporelle : Quand tu seras prêt… (futur, pas présent).",
      "Futur proche → A1|verb ; futur antérieur → B2|verb"
    ),
    futur_anterieur: G(
      "Le futur antérieur exprime une action future antérieure à une autre action future.",
      "avoir/être (futur) + participe passé\n\nJ'aurai fini, tu seras parti, nous aurons mangé, ils seront arrivés",
      ["Action terminée avant un futur repère.", "Quand + futur antérieur, futur simple.", "Avec être : accord du PP.", "Hypothèse passée : Il aura oublié."],
      ["Quand tu arriveras, j'aurai déjà mangé.", "D'ici demain, nous serons partis.", "Elle aura terminé avant midi.", "Ils auront oublié notre rendez-vous."],
      ["Ne pas confondre avec conditionnel passé."],
      "Écrit soutenu et argumentation ; rare à l'oral courant.",
      "Futur simple → B1|verb ; conditionnel passé → B2|verb"
    ),
    conditionnel_present: G(
      "Le conditionnel présent exprime hypothèse, politesse ou information non confirmée.",
      "Infinitif + terminaisons imparfait : -ais, -ais, -ait, -ions, -iez, -aient\n\nJe parlerais, tu finirais, il serait, nous aurions, vous iriez, ils feraient",
      ["Hypothèse avec si + imparfait.", "Demande polie : Je voudrais...", "Journalisme : Le président serait malade.", "Futur dans le passé (discours indirect)."],
      ["Je voudrais un café.", "Tu devrais étudier plus.", "Si j'avais le temps, je voyagerais.", "Il dit qu'il viendrait."],
      ["Si + présent → futur, pas conditionnel."]
    ),
    conditionnel_passe: G(
      "Le conditionnel passé exprime un regret ou une action non réalisée dans le passé.",
      "avoir/être (conditionnel) + participe passé\n\nJ'aurais aimé, tu serais venu(e), nous aurions pu, ils auraient dû",
      ["Regret : J'aurais dû...", "Si + plus-que-parfait → conditionnel passé.", "Information non confirmée au passé.", "Avec être : accord PP."],
      ["J'aurais aimé venir.", "Tu aurais pu me prévenir.", "Si j'avais su, je serais resté.", "Elle aurait eu 30 ans hier."],
      ["Ne pas confondre avec plus-que-parfait seul."],
      "Regret, reproche et hypothèse 3e degré ; courant à l'oral et à l'écrit.",
      "Plus-que-parfait → B1|verb ; hypothèse 3e degré → B2|disc"
    ),
    conditionnel_politesse: G(
      "Le conditionnel adoucit demandes, suggestions et opinions.",
      "Je voudrais, pourriez-vous, auriez-vous, j'aimerais, serait-il possible\n\nConditionnel des verbes vouloir, pouvoir, devoir",
      ["Voudrais > veux pour politesse.", "Pourriez-vous... ? formule standard.", "On pourrait + inf. pour suggestion.", "Je dirais que... pour opinion atténuée."],
      ["Je voudrais réserver une table.", "Pourriez-vous m'aider ?", "On pourrait partir plus tôt.", "J'aimerais en savoir plus."],
      ["Conditionnel ≠ futur dans les questions directes."],
      "A2 : formules fixes seulement ; paradigme complet en B1.",
      "Conditionnel présent (hypothèses) → B1|verb"
    ),
    subjonctif_present: G(
      "Le subjonctif présent exprime doute, subjectivité, nécessité ou sentiment.",
      "Radical + -e, -es, -e, -ions, -iez, -ent (souvent)\n\nPARLER : que je parle, que tu parles, qu'il parle, que nous parlions, que vous parliez, qu'ils parlent\n\nÊTRE : que je sois | AVOIR : que j'aie | ALLER : que j'aille | FAIRE : que je fasse",
      ["Après il faut que, vouloir que, douter que.", "Expressions : avant que, pour que, sans que.", "Verbes émotion : je suis content que...", "Négation du subjonctif : ne...pas normal."],
      ["Il faut que tu viennes.", "Je veux qu'il réussisse.", "Bien qu'il pleuve, nous sortons.", "Je doute qu'elle ait raison."],
      ["Que je parle, pas *que je parles (1er grp 1re pers.)."],
      "À l'écrit : subjonctif après émotion/volonté ; à l'oral : indicatif parfois toléré.",
      "Subjonctif passé → B2|verb ; après que + indicatif (règle B1)"
    ),
    subjonctif_passe: G(
      "Le subjonctif passé exprime une action antérieure dans une proposition subjonctive.",
      "avoir/être (subjonctif) + participe passé\n\nQue j'aie fini, qu'il soit parti, que nous ayons vu, qu'elles soient arrivées",
      ["Antériorité par rapport au verbe principal.", "Je regrette qu'il soit parti.", "Il faut que tu aies terminé avant.", "Avec être : accord.", "Après une fois que (parfois indicatif si fait acquis)."],
      ["Je suis content qu'elle soit venue.", "Il faut que tu aies fini.", "Je doute qu'ils aient compris.", "Bien qu'il ait plu, le match a eu lieu."],
      ["Subjonctif passé rare à l'oral ; indicatif parfois accepté."],
      "Écrit soutenu et subordonnées de sentiment ; plus rare à l'oral.",
      "Subjonctif présent → B1|verb ; conditionnel passé → B2|verb"
    ),
    subjonctif_triggers: G(
      "Certaines conjonctions et constructions imposent le subjonctif.",
      "il faut que | vouloir que | douter que | craindre que\nbien que | quoique | pour que | avant que | sans que\nle plus... que | le seul... qui",
      ["Volonté, nécessité, émotion → subjonctif.", "Concession : bien que + subj.", "But : pour que + subj.", "Superlatif subjectif : le meilleur film que j'aie vu."],
      ["Il est important que vous soyez à l'heure.", "Je crains qu'il ne vienne pas.", "C'est le livre le plus intéressant que j'aie lu.", "Pour que tu comprennes, je t'explique."],
      ["Craindre que + ne explétif (ne pas négatif)."]
    ),
    imperatif_present: G(
      "L'impératif exprime ordre, conseil ou invitation (2e pers. tu/vous, 1re pl. nous).",
      "2e sing. tu : radical + -e (pas de -s pour -er) → Parle !\n2e pl. vous : -ez → Parlez !\n1re pl. nous : -ons → Parlons !\n\nÊtre : sois/soyons/soyez | Avoir : aie/ayons/ayez",
      ["Pas de sujet prononcé.", "Verbes -er : pas de -s (Parle !).", "Nous = inclusion du locuteur.", "Négation : Ne parle pas !"],
      ["Écoute-moi !", "Finissez vos devoirs !", "Allons-y !", "Soyez patients !"],
      ["Parles ! est incorrect à l'impératif tu pour -er."]
    ),
    imperatif_pronoms: G(
      "Avec impératif affirmatif, les pronoms se placent après avec trait d'union.",
      "Affirmatif : Donne-le-moi ! Parle-lui ! Allez-y !\nNégatif : Ne me le donne pas ! Ne lui parle pas !\n\nOrdre : verbe + le/la/les + moi/toi/lui/nous/vous/leur + y + en",
      ["Trait d'union obligatoire affirmatif.", "Pronoms après le verbe.", "Moi/toi à l'impératif (pas me/te).", "Négatif : pronoms avant ne."],
      ["Donnez-moi la clé.", "Ne t'inquiète pas.", "Dis-le-lui !", "Allons-nous-en !"],
      ["Donne-moi-le → Donne-le-moi (ordre COD/COI)."]
    ),
    pron_cod: G(
      "Les pronoms COD (le, la, l', les) remplacent un complément d'objet direct.",
      "le (M sing.) | la (F sing.) | l' (devant voyelle) | les (pl.)\n\nJe vois le chat → Je le vois.\nTu aimes Marie → Tu l'aimes.",
      ["Placés avant le verbe conjugué.", "Accord PP avec COD précédent (avoir).", "Elle les a vus (COD les avant).", "Impératif affirmatif : après le verbe."],
      ["Je le connais.", "Tu la regardes.", "Nous les invitons.", "Il m'a vue hier."],
      ["Lui est COI, pas COD."],
      "Place devant le verbe ; impératif affirmatif : après (Prends-le !).",
      "Pronoms COI → A2|pron ; doubles pronoms → B1|pron"
    ),
    pron_coi: G(
      "Les pronoms COI (me, te, lui, nous, vous, leur) remplacent surtout à + personne (lui/leur à la 3e pers.). Me/te/nous/vous peuvent aussi être COD.",
      "me, te, lui, nous, vous, leur\n\nJe parle à Pierre → Je lui parle.\nTu téléphones à tes parents → Tu leur téléphones.",
      ["Répondent surtout à à qui ? (personne).", "Lui/leur uniquement à la 3e personne.", "Pas d'accord PP avec COI.", "Devant verbe : Je leur donne un cadeau."],
      ["Je lui écris une lettre.", "Tu me parles ?", "Nous vous remercions.", "Elle leur a offert des fleurs."],
      ["Ne pas confondre lui (COI) et il (sujet)."],
      "Personnes : lui/leur ; jamais y pour une personne.",
      "Pronom y → A2|pron"
    ),
    pron_y: G(
      "Y remplace un complément de lieu (à + lieu) ou à + chose (y compris à + infinitif).",
      "J'y vais. (= je vais au cinéma)\nTu y penses. (= tu penses à cela)\n\nY = there / to it",
      ["Lieu : aller, rester, être → y.", "À + chose : penser, réussir, tenir → y.", "Un seul y par phrase.", "Impératif : Vas-y !"],
      ["Tu vas au marché ? Oui, j'y vais.", "Penses-tu à ton examen ? J'y pense.", "Restez-y !", "Nous y sommes allés."],
      ["Y ne remplace pas une personne (lui/leur)."],
      "Lieu et à + chose abstrait ; pas de personne.",
      "Pronom en → A2|pron"
    ),
    pron_en: G(
      "En remplace de + nom ou quantité, ou complément introduit par de.",
      "Tu as des pommes ? J'en ai. (= j'ai des pommes)\nCombien de livres ? J'en ai trois.\n\nParler de → J'en parle.",
      ["Quantité partitive : en.", "De + nom : en (sauf personne → dont).", "En + verbe pronominal : s'en aller.", "Un seul en par phrase."],
      ["Tu veux du café ? J'en veux.", "Combien en voulez-vous ?", "Il en a parlé hier.", "Nous nous en sommes allés."],
      ["En ne remplace pas une personne."],
      "Accord du p.p. si COD en précède le verbe (J'en ai cueillies).",
      "Dont (relatif) → B1|pron"
    ),
    pron_order: G(
      "L'ordre des pronoms devant le verbe est fixe en français.",
      "me/te/se/nous/vous → le/la/les → lui/leur → y → en → verbe\n\nJe le lui donne. | Tu m'en parles. | Il y en a.",
      ["Ordre strict devant verbe conjugué.", "Impératif affirmatif : verbe + COD + COI + y + en.", "Ne...pas entoure le bloc pronominal.", "Un pronom par catégorie ; y et en peuvent coexister."],
      ["Je te le donne.", "Il nous en a parlé.", "Donne-le-moi !", "Il y en a beaucoup."],
      ["Je le lui donne, pas *Je lui le donne."],
      "B1 : système complet ; impératif : Donnez-y-en !",
      "Pronoms COD/COI simples → A2|pron"
    ),
    pron_sujet: G(
      "Les pronoms sujets sont obligatoires en français sauf à l'impératif.",
      "je, tu, il/elle/on, nous, vous, ils/elles\n\nOn = nous (oral) ou indéfini (On dit que...)",
      ["Toujours exprimés sauf impératif.", "On remplace souvent nous à l'oral.", "Il/elle pour choses (genre grammatical).", "Elision : je → j' devant voyelle."],
      ["Je travaille.", "On va au cinéma.", "Elle est professeure.", "Ils arrivent demain."],
      ["Ne pas omettre le sujet comme en espagnol/italien."]
    ),
    pron_reflechis: G(
      "Les pronoms réfléchis indiquent que le sujet et l'objet sont identiques.",
      "me, te, se, nous, vous, se\n\nJe me lave. | Tu te promènes. | Il se lève. | Nous nous reposons.",
      ["Verbes pronominaux : se lever, s'appeler.", "PC avec être : Je me suis levé(e).", "Accord PP avec sujet réfléchi.", "COI réfléchi : se parler, se téléphoner."],
      ["Je me réveille à sept heures.", "Tu t'habilles vite.", "Elle s'est cassé le bras.", "Nous nous sommes rencontrés."],
      ["Elle s'est lavé les mains : pas d'accord (COD après)."]
    ),
    pron_relatif_qui: G(
      "Qui fonctionne comme sujet du verbe dans la proposition relative.",
      "L'homme qui parle... | La fille qui chante...\n\nQui = sujet ; pas d'élision",
      ["Sujet de la relative : qui + verbe.", "Ne peut pas être COD (→ que).", "Qui pour personnes et choses.", "Préposition + qui : avec qui, pour qui."],
      ["L'étudiant qui réussit est motivé.", "Le livre qui m'intéresse est ici.", "La personne avec qui je travaille.", "Voici celui qui a gagné."],
      ["La personne que j'ai vue (COD → que)."]
    ),
    pron_relatif_que: G(
      "Que (qu' devant voyelle) est COD du verbe relatif.",
      "Le film que j'ai vu... | L'ami qu'elle aime...\n\nQue = COD",
      ["COD de la relative.", "Peut être omis à l'oral après nom.", "Que pour personnes et choses.", "Préposition + lequel/laquelle si COI."],
      ["Le restaurant que tu recommandes.", "La chanson qu'il chante.", "Les livres que nous lisons.", "C'est tout ce que je sais."],
      ["Ce dont j'ai besoin (pas ce que)."]
    ),
    pron_relatif_dont: G(
      "Dont remplace de + nom (complément ou possession).",
      "L'auteur dont le livre... | Le sujet dont je parle...\n\nDont = of which / whose / about which",
      ["Remplace de + nom.", "Possession : la fille dont le père...", "Verbes + de : parler de, avoir besoin de.", "Dont ne suit jamais un nom directement sans verbe."],
      ["Voici l'homme dont je t'ai parlé.", "La ville dont il est originaire.", "C'est le projet dont nous rêvions.", "Les enfants dont les parents sont absents."],
      ["Dont remplace personne (de lui → dont)."]
    ),
    pron_relatif_ou: G(
      "Où remplace un complément de lieu ou de temps.",
      "La ville où j'habite. | Le jour où nous sommes partis.\n\nOù = where / when",
      ["Lieu : où = dans lequel / où.", "Temps : le moment où, l'époque où.", "Pas ou (ou = or) : où avec accent.", "La maison où je suis né."],
      ["Paris est la ville où j'ai étudié.", "Je me souviens du jour où nous nous sommes rencontrés.", "La salle où se déroule la conférence.", "L'époque où il faisait froid."],
      ["Confusion ou (choix) / où (lieu)."]
    ),
    pron_interrogatif: G(
      "Les pronoms interrogatifs demandent une information sur une personne ou chose.",
      "Qui ? Que/Qu'est-ce que ? Quoi ? Lequel/Laquelle ?\n\nQui est-ce ? | Qu'est-ce que tu fais ? | À quoi penses-tu ?",
      ["Qui = personne (sujet ou COD).", "Que devant verbe ; qu'est-ce que devant sujet+verbe.", "Quoi après préposition.", "Lequel accord avec nom sous-entendu."],
      ["Qui vient ce soir ?", "Que veux-tu ?", "De quoi parlez-vous ?", "Lequel de ces livres préfères-tu ?"],
      ["Qu'est-ce que (COD) vs Qu'est-ce qui (sujet)."]
    ),
    pron_indefini: G(
      "Les pronoms indéfinis expriment quantité ou identité imprécise.",
      "chacun, quelqu'un, personne, rien, tout, quelque chose, chaque, plusieurs, certains",
      ["Personne/rien + ne (double négation).", "Quelqu'un, quelque chose (affirmatif).", "Chacun/chaque + sing.", "Tout le monde/tout + sing. ; tous + plur. ; toute/toutes + fém."],
      ["Quelqu'un a frappé.", "Je ne vois personne.", "Chacun a son opinion.", "Tout le monde est content."],
      ["Personne ne vs Pas personne (registre)."]
    ),
    pron_tonique: G(
      "Les pronoms toniques (moi, toi, lui, elle, nous, vous, eux, elles) insistent ou complètent.",
      "Moi, je pense que... | C'est pour toi. | Lui, il sait.\n\nAprès préposition : avec moi, chez eux",
      ["Après préposition obligatoire.", "Moi aussi, moi non plus.", "C'est moi qui... (mise en relief).", "Lui/elle/eux/elles à la 3e pers."],
      ["C'est moi.", "Viens avec nous.", "Elle est plus grande que lui.", "Eux, ils ne savent pas."],
      ["Lui (M) vs elle (F) toniques distincts."]
    ),
    adj_feminine: G(
      "La plupart des adjectifs féminins ajoutent -e au masculin.",
      "grand → grande | petit → petite | bleu → bleue | heureux → heureuse\n\nIrréguliers : beau → belle | nouveau → nouvelle | vieux → vieille | bon → bonne | long → longue",
      ["Règle générale : +e.", "Double consonne parfois : bon → bonne.", "Adjectifs en -eux → -euse.", "Beau → bel devant consonne m. ; belle au fém. ; beaux/belles au plur."],
      ["Un garçon intelligent → une fille intelligente.", "Il est heureux ; elle est heureuse.", "Un beau jardin ; une belle fleur.", "Mon vieux livre ; ma vieille amie."],
      ["Bel homme, pas *beau homme (beau devant consonne m.)."]
    ),
    adj_plural: G(
      "Le pluriel des adjectifs s'obtient généralement en ajoutant -s.",
      "grand → grands/grandes | bleu → bleus/bleues\n\nIrréguliers : -al → -aux (général → généraux) | -eau → -eaux (beau → beaux)",
      ["Règle : +s au masculin et féminin.", "-al → -aux au masculin pluriel.", "-s, -x, -z invariables au sing.", "Accord avec nom qu'ils qualifient."],
      ["Des livres intéressants.", "Les maisons blanches.", "Des problèmes généraux.", "Les beaux jours."],
      ["Couleur invariable si nom : des robes orange."]
    ),
    adj_place: G(
      "La plupart des adjectifs se placent après le nom ; certains courants se placent avant.",
      "Après : une maison blanche, un chat noir\nAvant (BAGS) : Beauty, Age, Good/bad, Size → une belle fille, un grand homme, une bonne idée",
      ["Position normale : après le nom.", "BAGS + quelques autres avant.", "Sens change parfois : un grand homme vs un homme grand.", "Adverbes de quantité avant : une très belle voiture."],
      ["Une voiture rouge.", "Un jeune étudiant.", "Un ancien professeur (= ex-).", "Un professeur ancien (= vieux)."],
      ["Cher = expensive après, dear avant."]
    ),
    adj_possessifs: G(
      "Les adjectifs possessifs accordent avec l'objet possédé, pas le possesseur.",
      "mon/ma/mes | ton/ta/tes | son/sa/ses | notre/nos | votre/vos | leur/leurs\n\nSon père (= le père de lui ou d'elle)",
      ["Accord avec objet possédé.", "Mon devant voyelle : mon amie.", "Leur/leurs : pas d'accord avec possesseur.", "Son/sa ambigu : son amie (il ou elle)."],
      ["Mon frère et ma sœur.", "Leur maison est grande.", "Son téléphone ne marche pas.", "Nos vacances approchent."],
      ["Ma amie → mon amie (élision)."]
    ),
    adj_demonstratifs: G(
      "Ce, cet, cette, ces précèdent le nom pour le désigner.",
      "ce (M devant consonne) | cet (M devant voyelle/h muet) | cette (F) | ces (pl.)\n\ncet homme, cet arbre, cette idée, ces livres",
      ["Cet devant voyelle/h muet masculin.", "C'est + adj/nom sans article.", "Ce/cet/cette/ces + nom spécifique.", "Celui/celle/ceux/celles = pronom."],
      ["Cet étudiant travaille bien.", "Cette décision est importante.", "Ces résultats nous surprennent.", "Ce projet me passionne."],
      ["Ce garçon, pas cet garçon (cons.)."]
    ),
    adj_comparatif: G(
      "Le comparatif compare deux éléments : plus...que, moins...que, aussi...que.",
      "Plus + adj. + que | Moins + adj. + que | Aussi + adj. + que\n\nPlus grand que | Moins cher que | Aussi intelligent que",
      ["Plus/moins/aussi + adjectif + que.", "Irréguliers : bon → meilleur ; mauvais → pire/plus mauvais.", "Bien → mieux ; mal → pis/plus mal.", "Aussi pour égalité."],
      ["Il est plus grand que moi.", "Cette solution est meilleure.", "Elle court aussi vite que lui.", "C'est moins difficile que prévu."],
      ["Meilleur (adj.) vs mieux (adv.)."],
      "Comparaison de deux éléments ; que + complément.",
      "Superlatif → A2|adj ; irréguliers → A2|adj"
    ),
    adj_superlatif: G(
      "Le superlatif exprime le degré maximal : le plus... / le moins...",
      "Le/la/les plus + adj. | Le/la/les moins + adj.\n\nLe plus grand | La plus belle | Les moins chers",
      ["Article défini + plus/moins + adj.", "Meilleur/pire sans plus.", "Superlatif absolu : très, extrêmement, fou.", "Le plus... de : le plus grand de la classe."],
      ["C'est le film le plus intéressant.", "Elle est la plus talentueuse.", "Ce sont les moins chers.", "Un livre excellent (absolu)."],
      ["Le plus bon → le meilleur."],
      "Adjectif après le nom : le film le plus intéressant.",
      "Comparatif → A2|adj"
    ),
    adj_irreguliers: G(
      "Certains adjectifs ont des formes irrégulières au comparatif et superlatif.",
      "bon → meilleur → le meilleur\nmauvais → pire/plus mauvais → le pire\nbien → mieux | mal → pis/plus mal\n\nbeau → plus beau / plus belle → le plus beau / la plus belle",
      ["Meilleur remplace plus bon.", "Pire est plus courant que plus mauvais.", "Mieux est adverbe comparatif.", "Avant le nom : ancien (ex-), petit (jeune) ; après : ancien (vieux), petit (taille)."],
      ["C'est un meilleur choix.", "La situation est pire.", "Il chante mieux que moi.", "C'est la pire erreur."],
      ["Plus bon est rare ; préférer meilleur."],
      "Meilleur/mieux : distinction adj./adv. essentielle à A2.",
      "Comparatif régulier → A2|adj"
    ),
    neg_ne_pas: G(
      "La négation standard encadre le verbe avec ne...pas.",
      "Ne + verbe + pas\n\nJe ne sais pas. | Il ne vient pas. | Nous n'avons pas fini.\n\nNe/elision : n' devant voyelle",
      ["Ne...pas encadre le verbe conjugué.", "Pronoms entre ne et verbe.", "Pas de après négation.", "Pas de ne expletif sauf craindre que."],
      ["Je ne comprends pas.", "Elle n'a pas téléphoné.", "Nous ne partons pas demain.", "Il ne mange jamais de viande."],
      ["Ne pas oublier ne à l'écrit."]
    ),
    neg_plus_jamais: G(
      "Plus, jamais, rien, personne renforcent ou remplacent pas dans la négation.",
      "ne...plus (no longer) | ne...jamais (never) | ne...rien (nothing) | ne...personne (nobody)\n\nJe ne fume plus. | Il ne dit jamais la vérité.",
      ["Plus = cessation.", "Jamais = fréquence nulle.", "Rien/personne comme COD.", "Ne...que = restriction (only)."],
      ["Je ne travaille plus ici.", "Elle ne ment jamais.", "Je ne vois rien.", "Il n'a parlé à personne."],
      ["Ne...que : Je ne mange que des légumes (only)."],
      "Extension de ne…pas (A1) ; rien/personne en sujet : inversion (Rien ne…).",
      "Ne…pas de base → A1|adv"
    ),
    neg_que: G(
      "Ne...que exprime la restriction : seulement.",
      "Ne + verbe + que + nom/inf.\n\nJe ne mange que des fruits.\nIl n'a que dix ans.",
      ["Que remplace pas pour restriction.", "Article normal après que.", "Ne...que sur l'élément restreint.", "Différent de ne...pas du tout."],
      ["Je n'ai que deux euros.", "Elle ne parle que français.", "Nous ne restons qu'une heure.", "Il ne veut que dormir."],
      ["Ne...que vs not only...but also (pas équivalent)."]
    ),
    adv_ment: G(
      "Les adverbes en -ment se forment à partir de l'adjectif féminin + -ment.",
      "lent → lente → lentement | vrai → vraie → vraiment | heureux → heureuse → heureusement\n\nAdjectif M en -ant/-ent : récent → récemment",
      ["Féminin + -ment (règle standard).", "-ant/-ent → -amment/-emment.", "Adjectif M -i → -iment (vrai → vraiment).", "Adverbes irréguliers : bien, mal, vite."],
      ["Il parle lentement.", "Elle est vraiment gentille.", "Nous avons récemment déménagé.", "Ils travaillent efficacement."],
      ["Possiblement n'existe pas ; dire peut-être."]
    ),
    adv_place: G(
      "Les adverbes se placent généralement après le verbe conjugué ou autour du verbe.",
      "Position : sujet + verbe + adverbe | sujet + adverbe + verbe (long/complexe)\n\nIl parle souvent. | Souvent, il arrive en retard.",
      ["Après verbe simple : verbe + adv.", "Long adverbe ou nuance : adv. + verbe.", "Entre auxiliaire et PP : a souvent mangé.", "Ne...pas autour du verbe, adv. après pas parfois."],
      ["Je travaille beaucoup.", "Elle ne comprend pas toujours.", "Hier, nous sommes partis.", "Il a bien réussi son examen."],
      ["Position change la nuance (seulement vs only)."]
    ),
    adv_irreguliers: G(
      "Bien, mal, vite, plutôt, très sont adverbes fréquents sans -ment.",
      "bien | mal | vite | plutôt | très | beaucoup | trop | assez | peu\n\nComparatif : mieux | pis",
      ["Bien ≠ bon (adv. vs adj.).", "Mieux comparatif de bien.", "Très + adj. ; beaucoup + verbe.", "Plutôt = rather / instead."],
      ["Il chante bien.", "Elle conduit vite.", "C'est plutôt difficile.", "Je le connais beaucoup."],
      ["Bon (adj.) après verbe familier vs Bien."]
    ),
    rel_qui: G(
      "La proposition relative avec qui introduit une information sur le sujet.",
      "Antécédent + qui + verbe\n\nL'homme qui travaille ici est mon oncle.",
      ["Qui = sujet relatif.", "Virgules si non essentielle.", "Essentielle : pas de virgules.", "Qui pour personne et chose."],
      ["Le professeur qui enseigne le français.", "La machine qui ne fonctionne pas.", "Les amis qui voyagent.", "C'est moi qui ai gagné."],
      ["C'est moi qui ai, pas *qui a (accord)."],
      "Introduction A2 ; dont/où/lequel → B1.",
      "Proposition relative que (COD) → A2|disc"
    ),
    rel_que: G(
      "Que introduit une relative où le pronom est COD.",
      "Antécédent + que/qu' + sujet + verbe\n\nLe livre que tu as prêté est intéressant.",
      ["Que = COD.", "Qu' devant voyelle.", "Relative essentielle sans virgules.", "Lequel/laquelle si COI avec prép."],
      ["La lettre qu'il a écrite.", "Les photos que j'ai prises.", "Tout ce que je possède.", "La personne que j'ai rencontrée."],
      ["Accord PP si COD que avant verbe avoir."],
      "Relative essentielle (sans virgules) à A2.",
      "Qui (sujet relatif) → A2|disc ; dont → B1|pron"
    ),
    rel_dont: G(
      "Dont relie l'antécédent à un complément introduit par de.",
      "Antécédent + dont + verbe (+ complément)\n\nLe film dont l'histoire est vraie...",
      ["De + nom → dont.", "Avoir besoin de, parler de, etc.", "Possession : le livre dont l'auteur...", "Dont = complément de ; où = lieu/temps ; que = COD sans de."],
      ["L'artiste dont nous avons vu l'expo.", "Voici le sujet dont il s'agit.", "Les enfants dont je m'occupe.", "C'est un problème dont tout le monde parle."],
      ["Confondre dont (de) et où (lieu/temps)."]
    ),
    rel_ou: G(
      "Où introduit une relative de lieu ou de temps.",
      "Lieu/temps + où + proposition\n\nLa région où il vit est magnifique.",
      ["Lieu : où = dans lequel.", "Temps : le jour où.", "Accent grave obligatoire.", "Le pays d'où il vient (d'où pour provenance)."],
      ["La chambre où je dors.", "L'année où j'ai obtenu mon diplôme.", "Le café où nous nous retrouvons.", "L'époque où tout était différent."],
      ["Où vs que pour temps (le moment que)."]
    ),
    passive_voix: G(
      "La voix passive met l'accent sur l'action subie : être + participe passé.",
      "être (conj.) + participe passé (+ par + agent)\n\nLe livre est lu par les élèves.\nLa maison a été vendue.",
      ["Agent avec par (parfois de).", "Accord PP avec sujet.", "Passive = mettre en avant le patient.", "On + actif ≈ passive impersonnelle."],
      ["La lettre a été envoyée.", "Ce problème sera résolu.", "Le français est parlé au Québec.", "Il a été invité à la fête."],
      ["Passive pronominale ≠ passive (Il s'est lavé)."],
      "Écrit formel et journalistique ; oral : on + actif fréquent.",
      "Passif nuancé (se faire) → B2|verb"
    ),
    gerondif: G(
      "Le gérondif exprime simultanéité ou manière : en + participe présent.",
      "en + participe présent (-ant)\n\nEn parlant, en mangeant, en ayant fini\n\nIl apprend en écoutant.",
      ["En + -ant (radical nous sans -ons + ant).", "Simultanéité avec action principale.", "Manière de faire.", "Ayant/d'étant pour antériorité (rare)."],
      ["Elle étudie en écoutant de la musique.", "En travaillant dur, il a réussi.", "Ne pas confondre avec participe présent seul.", "En arrivant, j'ai vu qu'il pleuvait."],
      ["Participe présent sans en : adjectif ou nom."],
      "Même sujet obligatoire dans les deux propositions.",
      "Participe présent → B2|disc"
    ),
    discours_rapporte: G(
      "Le discours indirect transforme les paroles rapportées avec concordance des temps.",
      "Direct : Il dit : « Je suis malade. »\nIndirect : Il dit qu'il est malade.\n\nPrésent → imparfait | PC → plus-que-parfait | Futur → conditionnel",
      ["Conjonction que + proposition.", "Concordance des temps si verbe introducteur au passé.", "Pronoms et repères temporels changent.", "Questions indirectes : il demande si / ce que."],
      ["Elle a dit qu'elle viendrait.", "Il m'a demandé où j'habitais.", "Ils ont annoncé qu'ils partaient.", "Elle se demande s'il a raison."],
      ["Concordance si introducteur au présent plus souple."],
      "Introducteur au passé : concordance stricte à l'écrit.",
      "Plus-que-parfait → B1|verb ; concordance avancée → B2|disc"
    ),
    plus_que_parfait: G(
      "Le plus-que-parfait exprime une action antérieure à une autre action passée.",
      "avoir/être (imparfait) + participe passé\n\nJ'avais mangé, tu étais parti, nous avions vu, ils étaient nés",
      ["Antériorité dans le passé.", "Avec PC ou imparfait dans principale.", "Si + plus-que-parfait → conditionnel passé.", "Avec être : accord."],
      ["Quand il est arrivé, j'avais déjà fini.", "Elle pensait qu'il était parti.", "Si j'avais su, je serais venu.", "Nous avions visité Rome avant."],
      ["Ne pas confondre avec PC seul."],
      "Marque l'antériorité dans le récit et le discours indirect.",
      "Conditionnel passé → B2|verb"
    ),
    passe_simple_etre: G(
      "Le passé simple de être et avoir est fréquent à l'écrit narratif.",
      "ÊTRE : je fus, tu fus, il fut, nous fûmes, vous fûtes, ils furent\n\nAVOIR : j'eus, tu eus, il eut, nous eûmes, vous eûtes, ils eurent",
      ["Registre littéraire/narratif.", "Action brève ponctuelle.", "Alterne avec imparfait (description).", "Rare à l'oral."],
      ["Il fut un temps où...", "Elle eut une idée soudaine.", "Nous fûmes surpris.", "Ils eurent peur."],
      ["Passé simple ≠ imparfait pour description."],
      "Écrit narratif et littéraire ; jamais à l'oral courant (C1).",
      "Alternance PS/imparfait → B2|verb ; formes -er → passe_simple_er ; passé antérieur → C2|verb"
    ),
    passe_simple_er: G(
      "Le passé simple des verbes -er ajoute des terminaisons spécifiques au radical.",
      "PARLER : je parlai, tu parlas, il parla, nous parlâmes, vous parlâtes, ils parlèrent\n\nTerminaisons : -ai, -as, -a, -âmes, -âtes, -èrent",
      ["Radical + terminaisons passé simple.", "3e pl. -èrent très reconnaissable.", "Verbes -cer : commença.", "Verbes -ger : mangea."],
      ["Il entra dans la pièce.", "Elle regarda par la fenêtre.", "Nous marchâmes longtemps.", "Ils crièrent de joie."],
      ["Parla (PS) vs parlait (imparfait)."]
    ),
    passe_simple_irreg: G(
      "Les verbes irréguliers ont des radicaux spécifiques au passé simple.",
      "FAIRE : je fis, il fit, nous fîmes, ils firent\n\nVENIR : je vins, il vint, nous vînmes, ils vinrent\n\nPOUVOIR : je pus, il put | VOIR : je vis, il vit",
      ["Radicaux courts souvent.", "Fit, dit, vit monosyllabiques.", "Vînmes, fîmes avec accent circonflexe.", "Très fréquent dans romans."],
      ["Il fit un geste.", "Elle vint me voir.", "Ils dirent la vérité.", "Le roi mourut en 1715."],
      ["Vis (PS voir) vs vis (prés vivre)."]
    ),
    participe_present: G(
      "Le participe présent se forme en -ant et peut être adjectif ou gérondif avec en.",
      "Radical nous + -ant : parlant, finissant, prenant\n\nAdjectif : une fille charmante\nGérondif : en parlant",
      ["Formation : nous sans -ons + -ant.", "Adjectif verbal : accord avec le nom (une histoire touchante).", "Gérondif : en + participe présent (en parlant).", "Ne pas confondre avec participe passé."],
      ["Les étudiants travaillant ici sont sérieux.", "Une rivière coulant vers la mer.", "En lisant, il s'est endormi.", "C'est une histoire touchante."],
      ["Intéressant (adj.) vs intéressé (PP)."]
    ),
    concordance_temps: G(
      "La concordance des temps régit les temps en subordonnée après un verbe au passé.",
      "Introducteur présent : temps directs\nIntroducteur passé : présent→imparfait, PC→PQP, futur→conditionnel\n\nIl dit qu'il vient / qu'il viendrait",
      ["Présent introducteur : liberté.", "Passé introducteur : concordance stricte à l'écrit.", "Exception : vérités générales au présent.", "Conditionnel = futur dans le passé."],
      ["Il pensait que tu avais raison.", "Elle croyait qu'il viendrait.", "Ils ont dit qu'ils étaient fatigués.", "Il savait que la Terre est ronde."],
      ["Oral plus souple qu'écrit littéraire."]
    ),
    hypothese_si: G(
      "Les propositions avec si suivent des schémas temporels fixes.",
      "Si + présent → futur/présent/imperatif\nSi + imparfait → conditionnel présent\nSi + plus-que-parfait → conditionnel passé",
      ["Pas de conditionnel après si.", "Si j'avais le temps, je lirais.", "Si j'avais su, je serais venu.", "Si tu veux, on part."],
      ["Si tu viens, je serai content.", "Si j'étais riche, je voyagerais.", "Si tu avais étudié, tu aurais réussi.", "Si pleut, reste (familier)."],
      ["Erreur : *Si j'aurais → Si j'avais."],
      "3e degré et mixte : registre argumenté et écrit ; 1er/2e degré en B1.",
      "Hypothèse 1er/2e degré → B1|disc ; conditionnel passé → B2|verb"
    ),
    dislocation: G(
      "La dislocation met un élément en tête pour l'emphase, avec pronom reprenant.",
      "Moi, je pense que... | Les enfants, ils jouent.\n\nCleft : C'est Pierre qui a gagné.",
      ["Thème en tête + reprise pronominale.", "Oral très fréquent.", "C'est... qui/que pour focalisation.", "Mise en relief stylistique."],
      ["Mon frère, il habite à Lyon.", "C'est demain qu'il part.", "Les livres, je les adore.", "C'est moi qui l'ai fait."],
      ["Registre oral vs formel écrit."],
      "Oral courant et écrit expressif ; thème topicalisé (C1).",
      "Clivées formelles → C1|disc ; redoublement → cod_coi_redouble ; intro → B2|disc"
    ),
    mise_en_relief: G(
      "Structures cleft et ne...que mettent un élément en relief.",
      "C'est + élément + qui/que + phrase\nNe...que pour restriction\n\nCe n'est pas Pierre que je cherche, c'est Paul.",
      ["C'est... qui (sujet) / que (COD).", "Ce sont... pour pluriel.", "Ne...que = seulement.", "Inversion stylistique possible."],
      ["C'est demain qu'il arrive.", "Ce sont mes parents que j'appelle.", "Je n'ai que cinq minutes.", "Rarement ai-je vu cela."],
      ["Ce que c'est que (registre familier)."],
      "Clivage courant à l'oral et à l'écrit ; ne…que plus restrictif (C1).",
      "Intro clivage → B2|disc ; pseudo-clivées → C1|disc ; inversion → inversion_stylistique"
    ),
    inversion_stylistique: G(
      "L'inversion sujet-verbe marque le registre forme ou littéraire.",
      "Rarement ai-je vu... | Ainsi parla-t-il.\n\nInversion après adverbe en tête de phrase",
      ["Sujet-verbe inversé après adverbe.", "-t- euphonique : a-t-il.", "Registre soutenu/littéraire.", "Questions : inversion standard."],
      ["Peut-être viendra-t-il.", "Jamais n'ai-je oublié.", "Ainsi finit l'histoire.", "Comment vas-tu ?"],
      ["Inversion obligatoire questions formelles."],
      "Écrit soutenu, presse et littérature ; rare à l'oral courant.",
      "Mise en relief (clivage) → B2|disc ; négation littéraire → B2|adv"
    ),
    locutions_verbales: G(
      "Les locutions verbales associent un verbe à un nom ou adverbe avec sens idiomatique.",
      "avoir peur | prendre conscience | faire semblant | mettre en place | venir de + inf.",
      ["Sens souvent non composable.", "Avoir : avoir peur, avoir faim, avoir besoin. Être : être en retard, être d'accord.", "Venir de + inf. = passé récent.", "Faire + inf. causatif."],
      ["Il a peur du dark.", "Elle prend une décision.", "Nous faisons attention.", "Ils viennent d'arriver."],
      ["Traduction mot à mot incorrecte."]
    ),
    prepositions_lieu: G(
      "Les prépositions de lieu situent dans l'espace : à, en, au, aux, dans, sur, chez.",
      "à + ville | en + région/pays F | au/aux + pays M | dans + contenant | sur + surface | chez + personne",
      ["Pays F : en France, en Italie.", "Pays M : au Canada, au Japon.", "Ville : à Paris.", "Pays pluriel : aux États-Unis, aux Pays-Bas."],
      ["Je vis en France.", "Il travaille à Londres.", "Le livre est sur la table.", "Nous allons chez Marie."],
      ["En France, pas *à France (pays féminin)."]
    ),
    prepositions_temps: G(
      "Prépositions temporelles : à, en, dans, depuis, pendant, pour, il y a.",
      "à + heure | en + mois/année/saison | dans + futur | depuis + point de départ | pendant + durée",
      ["À midi, à 8 heures.", "En janvier, en 2020.", "Dans une heure (futur).", "Depuis 2010 (continu)."],
      ["Je me lève à sept heures.", "En été, il fait chaud.", "Il revient dans deux jours.", "J'habite ici depuis cinq ans."],
      ["Depuis + présent, pas passé composé seul."]
    ),
    numeraux: G(
      "Les nombres et ordinaux ont des règles d'accord et d'orthographe.",
      "Cardinaux : vingt et un, cent, mille (invariables sauf un)\nOrdinaux : premier/première, deuxième, troisième\n\nMillion/milliard + de + nom",
      ["Vingt et un, cent un : accord.", "Premier avant nom ; 1er/1re en abrégé.", "Deuxième vs second (deux seulement).", "Cent/vingt/mille + nom : invariable (deux cent euros) ; accord si seul (deux cents)."],
      ["C'est le troisième étage.", "Vingt-deux étudiants.", "Les deux premiers jours.", "Un million d'euros."],
      ["Deux cent euros devant nom ; deux cents seuls (sans nom après)."]
    ),
    orthographe_1990: G(
      "Les rectifications orthographiques de 1990 uniformisent certains traits d'union et pluriels.",
      "Numéraux composés : vingt-et-un (seul), vingt et un + nom, cent-deux\n\nMots composés : week-end / weekend (variantes admises)\n\nPluriels recommandés : oignons, jugeaux",
      ["Trait d'union si le numéral est seul (vingt-et-un) ; sans trait d'union devant nom (vingt et un hommes).", "Virgule remplacée par trait d'union : mille-neuf-cent.", "Week-end/weekend : les deux graphies admises.", "Pluriels simplifiés : oignon → oignons (recommandation)."],
      ["Vingt et un hommes.", "Cent-vingt-deux pages.", "Le week-end prochain.", "Des oignons frits."],
      ["Vingt-et-un seul ; vingt et un + nom."]
    ),
    en_yon_usage: G(
      "En, y et pronoms relatifs composés enrichissent la cohésion textuelle (C1).",
      "en (de/quantité) | y (à/lieu) | lequel/laquelle/lesquels + prép.",
      ["En/y un seul par verbe.", "Lequel après préposition.", "Dont pour de + nom.", "Où pour lieu/temps."],
      ["Voici le dossier dont j'ai besoin.", "La table sur laquelle j'écris.", "J'y suis allé hier.", "Il en a pris trois."],
      ["Duquel/de laquelle formel vs dont."]
    ),
    subordonnees_causal: G(
      "Les subordonnées causales et consécutives lient raison et résultat (C1/C2).",
      "Car, parce que, puisque (cause) | si bien que, tellement... que (conséquence)\n\nComme il pleut, je reste.",
      ["Parce que + indicatif.", "Puisque = cause connue.", "Si bien que + indicatif consécutif.", "Subjonctif rare sauf avant que."],
      ["Je reste parce qu'il pleut.", "Puisque tu es là, aide-moi.", "Il parle si vite que je ne comprends pas.", "Comme il est tard, nous partons."],
      ["Car en tête de phrase (formel)."]
    ),
    subordonnees_concessive: G(
      "Les subordonnées concessives expriment l'opposition : bien que, quoique, même si.",
      "Bien que + subjonctif | Quoique + subjonctif | Même si + indicatif",
      ["Bien que/quoique + subj.", "Même si + indicatif (fait réel).", "Malgré + nom (préposition).", "Concession vs opposition."],
      ["Bien qu'il pleuve, nous sortons.", "Quoique fatigué, il continue.", "Même si c'est difficile, j'essaie.", "Malgré la pluie, le match a lieu."],
      ["Bien que + indicatif oral vs subj. écrit."]
    ),
    ne_explétif: G(
      "Le ne explétif n'a pas valeur négative ; il suit certaines conjonctions (C2).",
      "Craindre que + ne | Avant que + ne | Empêcher que + ne\n\nJe crains qu'il ne vienne.",
      ["Ne sans pas après craindre que.", "Avant que + ne (précaution).", "Registre soutenu.", "Ne explétif ≠ négation."],
      ["Il craint qu'elle ne parte.", "Avant qu'il ne soit trop tard...", "Empêche qu'il ne tombe.", "Sans que personne ne sache."],
      ["Ne explétif disparaît à l'oral."],
      "Écrit soutenu et littéraire uniquement (C2).",
      "Subjonctif après craindre → B1|verb ; avant que → subordonnee_temps"
    ),
    style_register: G(
      "Registres de langue (soutenu, courant, familier) influencent choix grammaticaux (C2).",
      "Soutenu : nous souhaitons | Courant : on veut | Familier : on veut\n\nPassé simple littéraire vs PC oral",
      ["Soutenu : vous, passé simple, subjonctif fréquent.", "Courant : tu/on, passé composé, indicatif.", "Familier : ellipse, n' omis à l'oral.", "Passé simple = écrit narratif ; subjonctif plus exigé à l'écrit."],
      ["Je vous prie de bien vouloir... (formel).", "Tu peux m'aider ? (courant).", "Il fut accueilli (littéraire).", "C'est pas grave (familier, n' pas ne)."],
      ["Négation sans ne à l'oral."],
      "Cartographie diaphasique : soutenu / courant / familier (C2).",
      "Modalité fine → C1|verb ; clivées et registres → C1|disc ; variation sociolinguistique → C2|disc"
    ),
    verbe_impersonnel: G(
      "Les verbes impersonnels n'ont pas de sujet réel ; il est impersonal.",
      "Il pleut. | Il faut. | Il est important de. | Il y a.\n\nAgreement : il faut que + subj.",
      ["Il impersonnel + verbe 3e sing.", "Il faut + inf. ou subordonnée.", "Il y a = there is/are.", "Il est + adj. + de + inf."],
      ["Il pleut beaucoup.", "Il faut étudier.", "Il y a des problèmes.", "Il est facile de comprendre."],
      ["Il faut que + subjonctif obligatoire."]
    ),
    pron_leur_en: G(
      "Combinaisons pronominales complexes avec leur, en, y dans les registres avancés.",
      "Il leur en a parlé. | Donnez-leur-en. | Il y en a qui pensent...\n\nOrdre : … + lui/leur → y → en",
      ["Leur + en ensemble possible.", "Impératif : Donne-leur-en.", "Y en a (existence).", "Ordre fixe devant verbe : COD → COI → y → en."],
      ["Il leur en a donné trois.", "Je leur en ai parlé.", "Il y en a beaucoup.", "Donnez-y-en !"],
      ["Maximum un pronom par catégorie ; y et en peuvent coexister."],
    ),
    adj_num_ord: G(
      "Accord des adjectifs numéraux ordinaux et fractions (C1).",
      "premier/première | deuxième/second | demi/demi/demie selon position\n\nUne demi-heure | un demi-litre | à moitié",
      ["Premier accord avec nom.", "Second = deux seulement.", "Demi invariable devant nom (une demi-heure) ; demie après (une heure et demie).", "Fractions : un tiers, deux tiers."],
      ["La première fois.", "Le second chapitre.", "Une demi-bouteille.", "Il est arrivé à moitié parcours."],
      ["Demi-heure vs une heure et demie."]
    ),
    mode_indirect: G(
      "Le conditionnel et subjonctif dans le discours indirect libre (C2).",
      "Il viendrait demain. (discours indirect libre)\nIl faudrait partir. (conseil rapporté)",
      ["Pas de guillemets ni que.", "Conditionnel = futur incertain rapporté.", "Style narratif avancé.", "Subjonctif pour subjectivité rapportée."],
      ["Il pensait : demain je partirais.", "Elle se disait qu'il fallût agir.", "Ils estimaient que ce fût une erreur.", "Style littéraire XXe siècle."],
      ["Discours indirect libre vs indirect."]
    ),
    temps_grammatical: G(
      "Les temps verbaux s'organisent en système : présent, passé, futur, avec modes indicatif/subjonctif/conditionnel.",
      "Présent | Passé (PC, imparfait, PS, PQP) | Futur (proche, simple, antérieur)\nModes : indicatif, subjonctif, conditionnel, impératif",
      ["Chaque temps a des valeurs (description, narration, anticipation).", "Concordance lie subordonnée à principale.", "Aspect accompli/inaccompli via auxiliaires.", "Mode exprime attitude du locuteur."],
      ["Le présent de vérité générale.", "Le PC pour résultat présent.", "L'imparfait pour toile de fond.", "Le futur simple pour promesse."],
      ["Mélanger temps sans logique narrative."]
    ),
    verbe_pronominal: G(
      "Les verbes pronominaux se construisent avec un pronom réfléchi (me, te, se, nous, vous, se).",
      "s'appeler, se lever, se souvenir, se plaindre\n\nPC : Je me suis levé(e). | Impératif : Lève-toi !",
      ["Sens réfléchi, réciproque ou pseudo-pronominal.", "Auxiliaire être au PC sauf cas rares.", "Accord PP avec sujet réfléchi.", "Négation : ne pas se lever."],
      ["Je me lève tôt.", "Ils s'appellent Pierre et Marie.", "Elle se souvient de tout.", "Nous nous sommes rencontrés en 2020."],
      ["Se laver les mains : pas d'accord sur lavé."],
      "PC avec être + accord : Elle s'est levée.",
      "Accord du p.p. → A2|verb"
    ),
    emploi_on: G(
      "On remplace souvent nous à l'oral et peut être indéfini ou général.",
      "On part. (= nous partons)\nOn dit que... (= il est dit)\n\nVerbe toujours à la 3e pers. sing.",
      ["Valeur nous inclusive à l'oral.", "On indéfini = people/one.", "Passivisation : On m'a volé mon sac.", "On + verbe singulier toujours."],
      ["On va au cinéma ce soir.", "On ne sait jamais.", "Ici, on parle français.", "On m'a dit que tu étais malade."],
      ["On est allés (familier plur.) vs on est allé (standard)."]
    ),
    infinitif_passe: G(
      "L'infinitif passé exprime l'antériorité par rapport au verbe principal.",
      "Après avoir/être : avoir mangé, être parti\n\nAprès merci de, après, sans : Après avoir fini, nous sommes sortis.",
      ["Avoir/être + PP à l'infinitif.", "Antériorité par rapport à action principale.", "Après prépositions temporelles.", "Registre écrit surtout."],
      ["Après avoir lu le livre, il l'a commenté.", "Sans avoir réfléchi, il a accepté.", "Merci d'être venu.", "Il prétend avoir terminé."],
      ["Après finir vs après avoir fini (antériorité)."],
      "Écrit argumenté et formules de politesse ; moins fréquent à l'oral.",
      "Futur antérieur → B2|verb ; gérondif → B1|verb"
    ),
    parole_directe: G(
      "La parole directe reproduit les mots exacts avec guillemets et ponctuation.",
      "Il dit : « Je suis fatigué. »\n— Viens-tu ? — demanda-t-elle.\n\nVirgule ou deux-points avant guillemets",
      ["Guillemets français « » ou \" \".", "Tiret cadratin pour dialogue.", "Points d'interrogation/exclamation à l'intérieur.", "Majuscule après ouverture selon style."],
      ["« J'arrive demain », annonce-t-il.", "Elle répond : « D'accord. »", "« Où vas-tu ? » demande-t-il.", "« Quelle surprise ! » s'exclame Marie."],
      ["Ponctuation avant fermeture des guillemets en français."]
    ),
    orthographe_pluriel: G(
      "Le pluriel des noms et adjectifs suit des règles avec exceptions fréquentes.",
      "Règle : +s | -au/-eau/-eu → -x (jeu→jeux) | -al → -aux\n\nBijou→bijoux | travail→travaux | œil→yeux",
      ["Pluriel en -s par défaut.", "-al → -aux sauf exceptions (bal→bals).", "-au, -eau, -eu → -x (jeu→jeux, bateau→bateaux).", "Invariables : noms propres, certains emprunts (un requiem → des requiem)."],
      ["Des chevaux dans le pré.", "Les travaux avancent.", "Des journaux sur la table.", "Les yeux bleus de l'enfant."],
      ["Des chevals → des chevaux."]
    ),
    liaison_co: G(
      "La liaison et l'enchaînement lient les mots à l'oral entre consonne finale et voyelle initiale.",
      "Les‿ enfants | vous‿ avez | un‿ ami\n\nLiaison obligatoire, facultative ou interdite",
      ["Liaison après déterminants, pronoms.", "Interdite après et, singulier invariable.", "Liaison avec on, ils ont.", "Enchaînement sans [z]/[t] obligatoire."],
      ["Les amis arrivent [lezami].", "Vous avez raison [vuzav].", "Un homme est entré.", "Ils ont fini [ilzɔ̃]."],
      ["Liaison incorrecte change le sens parfois."],
      "Oral soutenu ; liaisons facultatives = marqueurs de registre (C2).",
      "Intro liaisons → B2|nom ; variation sociolinguistique → C2|disc"
    ),
    cod_coi_redouble: G(
      "Le redoublement pronominal insiste sur le complément (C1).",
      "Je le lui ai dit moi-même.\nPaul, je l'ai vu hier.\n\nDislocation + reprise pronominale",
      ["Thème en tête + pronom.", "Moi-même, lui-même pour insistance.", "Registre oral et écrit expressif.", "Ordre pronominal inchangé."],
      ["Ce livre, je l'ai lu deux fois.", "Marie, je lui ai téléphoné.", "Lui, il ne sait rien.", "Moi, je pense le contraire."],
      ["Ne pas confondre avec double complément."],
      "Oral expressif et écrit journalistique (C1).",
      "Dislocation → dislocation ; coréférence → C1|pron ; ordre pronoms → B1|pron"
    ),
    subordonnee_temps: G(
      "Les subordonnées temporelles : quand, lorsque, pendant que, dès que, avant que, après que.",
      "Quand/Lorsque + indicatif (fait réel)\nAvant que + subjonctif | Après que + indicatif\nPendant que + imparfait (simultanéité)",
      ["Quand/lorsque interchangeables souvent.", "Avant que + subj. (+ ne explétif).", "Après que + indicatif (pas subj.).", "Dès que + futur/futur antérieur pour futur."],
      ["Quand il pleut, je reste.", "Pendant qu'il dormait, on est entrés.", "Avant qu'il ne parte, parle-lui.", "Dès qu'il arrivera, nous mangerons."],
      ["Après qu'il vienne → après qu'il vient/vienne (indicatif)."]
    ),
    accord_past_participle_avoir: G(
      "Avec avoir, le PP s'accorde avec le COD seulement s'il le précède.",
      "Les pommes qu'il a mangées.\nIl a mangé des pommes. (pas d'accord)\n\nCOD avant → accord ; COD après → pas d'accord",
      ["Que + COD antécédent → accord.", "Pronom COD le/la/les avant → accord.", "COD après verbe → invariable.", "Femme que j'ai vue."],
      ["Les lettres que j'ai écrites.", "J'ai écrit des lettres.", "La fille qu'ils ont accueillie.", "Il a pris les clés."],
      ["Accord avec COI jamais avec avoir."]
    ),
    futur_dans_passe: G(
      "Le conditionnel présent exprime le futur vu depuis un passé (concordance).",
      "Il dit qu'il viendrait demain. (= il a dit : je viendrai demain)\n\nFutur direct → conditionnel dans le passé",
      ["Concordance : futur → conditionnel.", "Discours indirect au passé.", "Nuances modale de non-réalisation possible.", "Journalisme : Le ministre démissionnerait."],
      ["Elle pensait qu'il pleuvrait.", "Ils ont annoncé qu'ils partiraient.", "On croyait que ce serait facile.", "Il a promis qu'il reviendrait."],
      ["Conditionnel ≠ imparfait de politesse seul."],
      "Journalistique (info non confirmée) et discours indirect (C1).",
      "Conditionnel journalistique → C1|verb ; concordance → B2|verb ; discours indirect → B1|verb"
    ),
    lexique_terminologie: G(
      "Terminologie grammaticale C1/C2 pour analyser la langue.",
      "Proposition, phrase, groupe nominal, complément circonstanciel\nAntécédent, relatif, coreférence, reprise anaphorique",
      ["Phrase = unité ponctuée ; proposition = unité verbale.", "Antécédent précède le relatif.", "Anaphore : pronom reprenant antécédent.", "Isotopie thématique en cohésion."],
      ["L'antécédent du pronom est flou.", "Deux propositions coordonnées par et.", "La reprise anaphorique par il.", "Champ lexical de la mer."],
      ["Confondre phrase et proposition."],
      "Métalangue académique et analytique (C2).",
      "Coréférence → C1|pron ; cohésion textuelle → cohesion_textuelle ; métalangue → C2|disc"
    ),
    verbe_semiaux: G(
      "Les verbes semi-auxiliaires (devoir, pouvoir, vouloir, savoir, aller, venir de) modulent le sens verbal.",
      "devoir + inf. (obligation) | pouvoir + inf. (capacité) | vouloir + inf. (volonté)\nsavoir + inf. (savoir-faire) | aller + inf. (futur proche) | venir de + inf. (passé récent)",
      ["Semi-auxiliaires + infinitif sans de.", "Valeurs modales ou aspectuelles.", "Devrait/pourrait au conditionnel.", "Venir de + inf. uniquement passé récent."],
      ["Je dois partir.", "Il peut nager.", "Elle veut réussir.", "Il vient de téléphoner."],
      ["Devoir ≠ must anglais dans tous contextes."]
    ),
    cohesion_textuelle: G(
      "La cohésion textuelle lie les phrases par reprises, connecteurs et progression thématique (C2).",
      "Connecteurs : d'abord, ensuite, en revanche, en conclusion\nReprises : synonymes, pronoms, déterminants démonstratifs",
      ["Progression thématique du connu au nouveau.", "Connecteurs logiques explicites.", "Reprise lexicale et pronominale.", "Paragraphe = unité thématique."],
      ["Premièrement, examinons le contexte.", "En revanche, les coûts augmentent.", "Ce phénomène s'explique par...", "En conclusion, la réforme est nécessaire."],
      ["Connecteurs sans logique entre idées."],
      "Écrit académique, argumentatif et expert (C2).",
      "Coréférence → C1|pron ; métalangue → lexique_terminologie ; connecteurs B2 → B2|disc"
    )
  };

  var en = {
    nom_indefinite_an: G(
      "Indefinite articles a and an introduce a non-specific singular countable noun.",
      "a + consonant sound | an + vowel sound\na book, a university (y sound) | an apple, an hour (silent h)",
      ["Use a before consonant sounds.", "Use an before vowel sounds (not just vowel letters).", "An hour, an MBA; a university, a European.", "Only with singular countables."],
      ["I need a pen.", "She is an engineer.", "He waited an hour.", "It is a useful tool."],
      ["*an university → a university (y sound).", "*a apple → an apple."],
      "Formal writing: a/an required with singular countables; spoken English often drops them in fixed phrases.",
      "Definite article the → A1|nom|Definite article (the)"
    ),
    nom_definite_the: G(
      "The definite article the refers to something specific, unique, or already mentioned.",
      "the + singular or plural noun\nPronunciation: /ðə/ before consonant, /ðiː/ before vowel",
      ["Specific or second mention: I saw a dog. The dog was big.", "Unique referents: the sun, the moon.", "Superlative: the best.", "Some geographic names take the (the UK, the Alps)."],
      ["The students in my class are friendly.", "Close the door, please.", "She is the best player.", "I read the article you sent."],
      ["*the Paris → Paris (most cities without the).", "*the nature → nature (zero article for general abstract)."],
      "Spoken: weak form /ðə/ very common; strong /ðiː/ before vowels and for emphasis.",
      "Zero article → A1|nom|Zero article (general nouns)"
    ),
    nom_zero: G(
      "The zero article omits a/an/the with general plurals, uncountables, and many fixed expressions.",
      "General plural: Cats are independent.\nUncountable: I like music.\nMeals/transport: at breakfast, by bus | Languages: I speak French",
      ["General statements about categories: no article.", "Uncountable nouns without article in general sense.", "By + transport: by car, by train.", "Most proper names: Paris, Mount Everest."],
      ["Water is essential.", "Children learn quickly.", "She studies biology.", "We met at lunch."],
      ["*the French (language) → French ; the French = the French people."],
      "",
      "Countable vs uncountable → A1|nom|Countable vs uncountable"
    ),
    nom_countable: G(
      "Countable nouns take a/an in the singular; uncountable nouns use some/any/much without a/an.",
      "Countable: a chair, two chairs, many chairs\nUncountable: some water, much information, a piece of advice",
      ["A/an only with singular countables.", "Many + countables; much + uncountables (questions/negatives).", "Some in affirmative; any in questions/negatives.", "Piece of / bit of + uncountable for a unit."],
      ["I bought a new laptop.", "There is some milk in the fridge.", "How many books do you have?", "She gave me an interesting piece of news."],
      ["*informations → information (uncountable).", "*a water → some water / a glass of water."],
      "A2 extends A1 distinction systematically; meaning shifts (a coffee vs coffee).",
      "Some / any / no → A2|nom ; zero article → A1|nom"
    ),
    verb_present_simple: G(
      "The present simple expresses habits, facts, routines, and permanent states.",
      "I/You/We/They + base verb\nHe/She/It + base verb + -s/-es\n\nI work. She works. They live. He goes.",
      ["Habits: I wake up at seven.", "Facts: The Earth revolves around the Sun.", "Stative verbs usually simple, not continuous.", "Frequency adverbs before main verb; after be: She is never late."],
      ["I drink coffee every morning.", "She teaches English.", "They live in Tokyo.", "He usually arrives on time."],
      ["Present simple for scheduled future: The train leaves at six."]
    ),
    verb_present_3sg_s: G(
      "Third person singular adds -s or -es to the base verb in present simple.",
      "he/she/it + verb-s\n\nwalk → walks | watch → watches | go → goes | study → studies\n\nhas (have), does (do), says (say)",
      ["Add -s for most verbs.", "-es after s, sh, ch, x, z, o: passes, watches.", "Consonant + y → -ies: tries.", "Irregular: have → has, do → does, go → goes."],
      ["She walks to school.", "He watches TV every night.", "It rains a lot here.", "My brother studies medicine."],
      ["He go is wrong; he goes is correct."]
    ),
    verb_spelling_present: G(
      "Spelling rules for -s/-es in third person singular follow consonant and vowel patterns.",
      "-ch/-sh/-ss/-x/-z/-o → -es: fix → fixes, go → goes\nConsonant + y → -ies: carry → carries\nVowel + y → -s: play → plays\n\nkeep → keeps (silent e)",
      ["-es after sibilants and o.", "-ies when y follows consonant.", "Vowel + y keeps y: enjoy → enjoys.", "Irregular verbs must be memorized."],
      ["She fixes computers.", "He tries hard.", "They enjoy music.", "It goes fast."],
      ["Study → studies, not studys."]
    ),
    verb_to_be: G(
      "The verb to be (am/is/are) links subjects to descriptions, identity, and location.",
      "I am | You are | He/She/It is | We are | They are\n\nNegative: am not, isn't, aren't\nContractions: I'm, you're, he's, we're, they're",
      ["Am with I only.", "Is with he/she/it.", "Are with you/we/they.", "To be + adjective/noun/place."],
      ["I am tired.", "She is a doctor.", "We are at home.", "They are not ready."],
      ["Its (possessive) vs it's (it is)."]
    ),
    verb_present_continuous: G(
      "The present continuous describes actions happening now or temporary situations.",
      "am/is/are + verb-ing\n\nI am reading. She is cooking. They are waiting.\n\nSpelling: run → running, write → writing, lie → lying",
      ["Action in progress now.", "Temporary situations.", "Future arrangements: I'm meeting John tomorrow.", "Stative verbs rarely continuous: know, like, want."],
      ["I am studying right now.", "She is living with her parents temporarily.", "They are playing football.", "We are leaving tomorrow."],
      ["I am knowing is wrong; I know is correct."]
    ),
    verb_stative: G(
      "Stative verbs describe states, not actions, and usually avoid continuous forms.",
      "know, believe, understand, want, need, like, love, hate, prefer, seem, appear, own, belong\n\nI know the answer. (not I am knowing)",
      ["Mental states: know, believe, think (opinion).", "Emotions: love, hate, prefer.", "Possession: have (own), belong.", "Senses/appearance: seem, taste (when state)."],
      ["I understand the problem.", "She wants a new phone.", "This belongs to me.", "He seems tired."],
      ["Think meaning opinion: I think so (not I am thinking so)."]
    ),
    verb_past_simple_ed: G(
      "Regular past simple forms add -ed to the base verb.",
      "walk → walked | play → played | stop → stopped\n\nSpelling: live → lived | try → tried | study → studied\n\nDouble consonant: stop → stopped",
      ["Regular: base + -ed.", "Consonant + y → -ied.", "Silent e: add -d only.", "Double final consonant after short vowel: plan → planned."],
      ["I walked to work yesterday.", "She studied all night.", "They stopped the car.", "We played tennis last week."],
      ["Stoped is wrong; stopped is correct."],
      "Primary past tense at A2; finished time markers (yesterday, last week, ago).",
      "Irregular past simple → A2|verb ; present perfect intro → A2|verb"
    ),
    verb_past_simple_irregular: G(
      "Irregular past simple verbs have unique forms that must be memorized.",
      "go → went | see → saw | take → took | give → gave | make → made\nbuy → bought | think → thought | come → came | get → got\n\nSame form as base: put → put, cut → cut",
      ["No -ed pattern for irregulars.", "Groups: sing/sang/sung, ring/rang/rung.", "Same past and past participle: put, cut, hit.", "Different all three: go/went/gone."],
      ["I went to Paris last year.", "She saw a movie.", "They bought a new car.", "He thought about it."],
      ["I goed is wrong; I went is correct."],
      "Memorize high-frequency list for A2 narrative.",
      "Used to (past habits) → A2|verb"
    ),
    verb_present_perfect: G(
      "The present perfect (have/has + past participle) links past to now; past simple marks finished time.",
      "Present perfect: have/has + past participle\nI have seen it. She has gone. They have lived here for years.\n\nPast simple: base + -ed / irregular\nI saw it yesterday. She went last week.\n\nTime markers: ever, never, just, already, yet, for, since (→ present perfect)\nyesterday, last week, in 2010, ago (→ past simple)",
      ["Present perfect: result now, experience, unfinished time.", "Past simple: completed action at a definite past time.", "British English prefers present perfect with just/already/yet.", "Do not use past simple with for/since duration."],
      ["I have finished my homework. (result now)", "I finished it at 5 pm. (exact time)", "Have you ever been to London?", "I visited London in 2019."],
      ["I have seen him yesterday is wrong (use past simple with yesterday)."],
      "Intro at A2; full contrast deepened at B1.",
      "For/since → A2|verb ; past simple → A2|verb"
    ),
    verb_present_perfect_forsince: G(
      "For measures duration; since marks the starting point with present perfect.",
      "for + period: for two hours, for years\nsince + point: since 2010, since Monday, since I was a child\n\nI have lived here for five years. / since 2019.",
      ["For + length of time.", "Since + specific moment.", "Present perfect with for/since.", "How long + present perfect."],
      ["I have worked here for three years.", "She has been ill since Tuesday.", "We have waited for an hour.", "They have known him since childhood."],
      ["Since two years is wrong; for two years or since 2022."]
    ),
    verb_past_continuous: G(
      "Past continuous describes an ongoing past action, often interrupted by past simple.",
      "was/were + verb-ing\n\nI was reading when he called.\nThey were playing while it rained.",
      ["Background action in progress.", "Interrupted by past simple.", "Two simultaneous past actions.", "Past continuous for polite requests (I was wondering...)."],
      ["I was cooking when the phone rang.", "She was studying all evening.", "They were laughing at the joke.", "We were walking home at eight."],
      ["When I arrived, he was leaving (not he left for ongoing)."]
    ),
    verb_past_perfect: G(
      "Past perfect shows an action completed before another past action.",
      "had + past participle\n\nWhen I arrived, she had already left.\nHe had finished before I came.",
      ["Earlier of two past events.", "Often with before, after, when, by the time.", "Reported speech backshift.", "Third conditional uses past perfect in if-clause."],
      ["I had never seen snow before I moved to Canada.", "She had finished when I called.", "They had already eaten.", "By 2020, he had written three books."],
      ["Past perfect vs past simple: sequence matters."]
    ),
    verb_going_to: G(
      "Going to expresses plans, intentions, and predictions based on evidence.",
      "am/is/are + going to + base verb\n\nI'm going to study. She is going to rain. (dark clouds)\n\nNegative: isn't going to | Question: Are you going to...?",
      ["Plans and intentions.", "Predictions with evidence.", "More definite than will for plans.", "Going to vs will for spontaneous decisions."],
      ["I am going to visit my parents.", "Look at those clouds—it is going to rain.", "They are going to start a business.", "Are you going to join us?"],
      ["Will for spontaneous: The phone is ringing. I'll answer."]
    ),
    verb_will: G(
      "Will expresses spontaneous decisions, promises, predictions, and offers.",
      "will + base verb (won't = will not)\n\nI will help you. She will probably win. It will be fine.\n\nContractions: I'll, you'll, he'll",
      ["Instant decisions: I'll take it.", "Promises and offers.", "Predictions without evidence.", "Won't for refusal: He won't listen."],
      ["I will call you tomorrow.", "Don't worry, everything will be OK.", "She won't tell anyone.", "Will you help me, please?"],
      ["Shall I...? for offers (British)."]
    ),
    verb_future_continuous: G(
      "Future continuous describes an action in progress at a future time.",
      "will be + verb-ing\n\nThis time tomorrow, I will be flying to New York.\nAt eight, they will be having dinner.",
      ["Action in progress at future moment.", "Polite inquiry: Will you be using the car?", "Parallel future events.", "Often with at this time tomorrow."],
      ["I will be working at noon.", "She will be studying all weekend.", "They will be arriving around six.", "We will be waiting for you."],
      ["Future continuous vs going to for simple future plans."]
    ),
    verb_future_perfect: G(
      "Future perfect shows an action completed before a future point.",
      "will have + past participle\n\nBy next year, I will have graduated.\nShe will have finished by then.",
      ["By + future time + will have + PP.", "Completion before deadline.", "Less common in speech.", "By the time + present, will have + PP."],
      ["By 2030, they will have moved.", "I will have completed the course by June.", "She will have left before you arrive.", "We will have known each other for twenty years."],
      ["By next week, I will finish → will have finished for completion."]
    ),
    modal_can: G(
      "Can expresses ability, permission, and possibility.",
      "can + base verb | cannot/can't\n\nI can swim. Can I leave early? It can get cold here.\n\nPast: could",
      ["Ability: I can drive.", "Permission: Can I go?", "Possibility: It can happen.", "Could for past ability or polite request."],
      ["She can speak three languages.", "Can you help me?", "You can't park here.", "Could you open the window?"],
      ["Can vs may for formal permission."],
      "Could/would for polite requests at A2.",
      "Must / have to → A2|verb"
    ),
    modal_must: G(
      "Must expresses strong obligation, necessity, or logical certainty.",
      "must + base verb | must not/mustn't\n\nYou must wear a seatbelt. She must be tired. (deduction)\n\nPast: had to (obligation) | must have + PP (deduction)",
      ["Strong obligation.", "Prohibition: mustn't.", "Logical deduction: He must be at home.", "Mustn't ≠ don't have to."],
      ["You must finish this today.", "Students must not cheat.", "He must be joking.", "She must have forgotten."],
      ["Mustn't (prohibited) vs don't have to (not necessary)."]
    ),
    modal_should: G(
      "Should gives advice, recommendations, and expectations.",
      "should + base verb | shouldn't\n\nYou should rest. He shouldn't eat so much.\n\nPast: should have + PP (regret/criticism)",
      ["Advice: You should see a doctor.", "Expectation: The package should arrive tomorrow.", "Should have + PP: regret.", "Ought to similar to should."],
      ["You should try this restaurant.", "She should be here soon.", "I should have studied harder.", "They shouldn't drive so fast."],
      ["Should vs must: advice vs obligation."]
    ),
    modal_have_to: G(
      "Have to expresses external obligation; must often expresses internal or strong obligation.",
      "have/has/had to + base verb\n\nI have to work tomorrow. She had to leave early.\n\nNegative: don't have to (no obligation)",
      ["External rules: I have to wear a uniform.", "Past: had to.", "Don't have to = unnecessary.", "Must for personal conviction."],
      ["Do you have to pay?", "He has to take the exam.", "We didn't have to wait long.", "You don't have to come if you're busy."],
      ["Mustn't vs don't have to distinction critical."]
    ),
    modal_might_could: G(
      "Might, may, and could express possibility and polite requests.",
      "might/may/could + base verb\n\nIt might rain. Could I borrow your pen?\n\nMay (formal permission) | Might (less certain)",
      ["Might/may: possibility.", "Could: polite request or past ability.", "May I...? formal permission.", "Might have + PP: past possibility."],
      ["She might be late.", "Could you repeat that?", "It may snow tonight.", "He might have missed the bus."],
      ["May vs might: similar possibility; may slightly more formal."]
    ),
    passive_be_pp: G(
      "The passive voice uses be + past participle; the agent is optional with by.",
      "am/is/are + PP | was/were + PP | will be + PP\n\nThe letter was written by John.\nEnglish is spoken worldwide.",
      ["Object becomes subject.", "By + agent when important.", "All tenses possible with appropriate be.", "Get-passive informal: He got fired."],
      ["The window was broken.", "The report is being prepared.", "The cake was eaten.", "Spanish is spoken in Mexico."],
      ["Only transitive verbs form passive."],
      "Formal writing and reports; spoken English often prefers active.",
      "Passive all tenses → B2|verb"
    ),
    reported_speech: G(
      "Reported speech shifts tense, pronouns, and time expressions when reporting what someone said.",
      "Direct: He said, \"I am tired.\"\nReported: He said (that) he was tired.\n\nPresent → past | Past → past perfect | will → would",
      ["Say/tell + that clause.", "Tell needs object: tell me that...", "Tense backshift when reporting past.", "Time words change: today → that day, tomorrow → the next day."],
      ["She said she was busy.", "He told me he would come.", "They asked if I was ready.", "She explained that she had left early."],
      ["No backshift if statement still true (optional)."],
      "Backshift standard when reporting verb is past.",
      "Present perfect contrast → B1|verb"
    ),
    conditional_zero: G(
      "Zero conditional states general truths: if + present, present.",
      "If + present simple, present simple\n\nIf you heat ice, it melts.\nIf water boils, it becomes steam.",
      ["Facts and scientific truths.", "Both clauses present simple.", "When can replace if for habits.", "Real and always true."],
      ["If I am tired, I go to bed early.", "If it rains, the ground gets wet.", "Plants die if they don't get water.", "If you mix red and blue, you get purple."],
      ["Don't use will in zero conditional result clause."]
    ),
    conditional_first: G(
      "First conditional expresses real future possibilities: if + present, will.",
      "If + present simple, will + base verb\n\nIf it rains, I will stay home.\nIf you study, you will pass.",
      ["Real future possibility.", "If-clause present, main clause will.", "Unless = if not.", "As soon as/when + present for future."],
      ["If she calls, I will answer.", "We will be late if we don't hurry.", "If you need help, let me know.", "Unless you hurry, you will miss the train."],
      ["If it will rain is wrong in if-clause; use present."],
      "Real and likely future outcomes.",
      "Second conditional → B1|disc ; zero conditional → B2|disc"
    ),
    conditional_second: G(
      "Second conditional expresses unreal present/future: if + past, would.",
      "If + past simple, would + base verb\n\nIf I had money, I would travel.\nIf I were you, I would accept.",
      ["Hypothetical present/future.", "If I were (subjunctive formal).", "Would in main clause only.", "Could/might replace would."],
      ["If I won the lottery, I would quit my job.", "If she were here, she would help.", "I would buy a house if I could.", "What would you do if you lost your phone?"],
      ["If I was vs if I were: were preferred formal."],
      "Intro at B1; third conditional at B2.",
      "First conditional → B1|disc"
    ),
    conditional_third: G(
      "Third conditional expresses unreal past: if + past perfect, would have + PP.",
      "If + had + PP, would have + PP\n\nIf I had studied, I would have passed.\nIf she had known, she would have come.",
      ["Regret about past.", "Both clauses refer to unreal past.", "Could/might have in result.", "If only / I wish + past perfect similar."],
      ["If they had left earlier, they would have caught the train.", "I would have helped if you had asked.", "If it hadn't rained, we would have gone out.", "She would have succeeded if she had tried."],
      ["Would have in if-clause is wrong: If I would have..."],
      "Regret and counterfactual past ; common in speaking and writing.",
      "Second conditional → B1|disc ; mixed conditionals → B2|verb ; wish/if only → B2|verb"
    ),
    conditional_mixed: G(
      "Mixed conditionals combine unreal past condition with present result, or vice versa.",
      "If + past perfect, would + base (past → present)\nIf I had studied medicine, I would be a doctor now.\n\nIf + past, would have + PP (present habit → past)",
      ["Past action affects present.", "Present state affects past outcome (less common).", "Flexible time reference.", "Context determines meaning."],
      ["If I had taken that job, I would be rich now.", "If she were smarter, she would have succeeded.", "If you had listened, you would understand now.", "If he didn't smoke, he would have lived longer."],
      ["Identify which clause refers to which time."],
      "Argumentation and narrative ; links past decisions to present outcomes.",
      "Third conditional → B2|verb ; second conditional → B1|disc"
    ),
    comp_er_more: G(
      "Comparatives use -er for short adjectives or more + adjective for longer ones.",
      "Short: tall → taller | fast → faster | big → bigger\nLong: more interesting | more beautiful\n\nThan after comparative: bigger than",
      ["One syllable: add -er.", "Two syllables -y: happy → happier.", "Two+ syllables: more + adj.", "Less + adj. for opposite."],
      ["She is taller than her brother.", "This book is more interesting.", "Today is colder than yesterday.", "He runs faster than me."],
      ["More better is wrong; better alone is comparative."],
      "As…as / not as…as for equality at A2.",
      "Irregular comparatives → A2|adj ; superlative → A2|adj"
    ),
    comp_irregular: G(
      "Irregular comparatives and superlatives must be memorized.",
      "good → better → best | bad → worse → worst\nfar → farther/further → farthest/furthest\nlittle → less → least | much/many → more → most",
      ["Good/well → better/best.", "Bad/badly → worse/worst.", "Far → farther or further.", "No -er with irregulars."],
      ["This is better than that.", "She is the best student.", "Things got worse.", "I have less time than you."],
      ["More good is wrong; better is correct."],
      "Good/better/best and bad/worse/worst are A2 essentials.",
      "Regular -er / more → A2|adj"
    ),
    superlative: G(
      "Superlatives use the + -est or the most + adjective.",
      "the + tallest | the most interesting\n\nIn + place: the tallest in the class\nOf + group: the best of all",
      ["The + superlative.", "Short adj. + -est.", "Long adj.: the most + adj.", "In/of for group reference."],
      ["He is the tallest boy in class.", "It was the most exciting game.", "She is the best of all candidates.", "This is the least expensive option."],
      ["The most tallest is wrong; the tallest is correct."],
      "Within-a-group comparison; the + superlative.",
      "Comparative → A2|adj"
    ),
    pron_subject: G(
      "Subject pronouns (I, you, he, she, it, we, they) perform the action of the verb.",
      "I, you, he, she, it, we, they\n\nShe works hard. They are students.\n\nIt for things and animals.",
      ["Required in English (unlike Spanish).", "I always capitalized.", "They singular gender-neutral.", "It for weather/time/distance."],
      ["I live in London.", "He is my colleague.", "They arrived early.", "It is raining."],
      ["Me and John → John and I as subject."]
    ),
    pron_object: G(
      "Object pronouns (me, you, him, her, it, us, them) receive the action.",
      "me, you, him, her, it, us, them\n\nShe called me. I saw them. Give it to him.",
      ["After verb: tell me.", "After preposition: with her.", "Him/her/it for third person.", "Between phrasal verbs: pick it up."],
      ["Can you help me?", "I know him well.", "She gave us a gift.", "They invited her."],
      ["Between you and I → between you and me."],
      "Indirect objects: Give me the book / Give the book to me.",
      "Indefinite compounds → A2|pron ; subject pronouns → A1|pron"
    ),
    pron_possessive: G(
      "Possessive adjectives and pronouns show ownership.",
      "Adjectives: my, your, his, her, its, our, their + noun\nPronouns: mine, yours, his, hers, ours, theirs\n\nIts (poss.) vs it's (it is)",
      ["Possessive adj. before noun.", "Possessive pron. alone: This is mine.", "His for M and F possessor.", "No apostrophe in its (poss.)."],
      ["This is my book.", "That car is theirs.", "Is this yours?", "Her phone is new."],
      ["It's = it is; its = possessive."]
    ),
    pron_reflexive: G(
      "Reflexive pronouns refer back to the subject: myself, yourself, himself, etc.",
      "myself, yourself, himself, herself, itself, ourselves, yourselves, themselves\n\nI hurt myself. She taught herself.",
      ["Subject and object same person.", "By myself = alone.", "Emphatic: I myself saw it.", "Enjoy yourself!"],
      ["He cut himself shaving.", "We enjoyed ourselves.", "She lives by herself.", "They blamed themselves."],
      ["Contact myself is wrong unless reflexive intended."]
    ),
    pron_demonstrative: G(
      "Demonstrative pronouns point to specific things: this, that, these, those.",
      "Singular: this (near), that (far)\nPlural: these (near), those (far)\n\nThis is my seat. Those are expensive.",
      ["This/these for near.", "That/those for far.", "Can replace nouns: I prefer this.", "Demonstrative + noun: this book."],
      ["This is delicious.", "Those are my keys.", "I like that idea.", "These shoes are comfortable."],
      ["This/these for time: this week, that day."]
    ),
    pron_indefinite: G(
      "Indefinite pronouns refer to non-specific people or things.",
      "someone, anybody, nothing, everything, everyone, something, none, each, either, neither\n\nSomeone called. I don't know anything.",
      ["Some- in affirmative.", "Any- in questions/negatives.", "No- = negative: nothing, nobody.", "Everyone + singular verb."],
      ["Is anyone home?", "Nothing happened.", "Everyone is welcome.", "Somebody left their bag."],
      ["Everyone... they (singular they accepted)."],
      "Something/anything pattern mirrors some/any at A2.",
      "Some / any → A1|num"
    ),
    pron_singular_they: G(
      "Singular they uses they/them/their to refer to one person of unspecified or non-binary gender.",
      "Someone left their bag.\nEach student should bring their textbook.\nAlex said they would arrive late.\n\nThem/their/theirs with singular antecedent",
      ["They for unknown gender (someone, anyone, each person).", "Their/them/theirs agree with singular they.", "Verb often plural: They are here (singular sense).", "Accepted in APA, Chicago 17, and informal registers."],
      ["If someone calls, tell them I'll call back.", "Each employee must sign their name.", "Jamie forgot their keys.", "Nobody said they were leaving."],
      ["Formal style guides may still prefer he or she in some contexts."]
    ),
    pron_interrogative: G(
      "Interrogative pronouns introduce questions: who, what, which, whom.",
      "Who (subject) | Whom (object, formal) | What | Which\n\nWho called? What do you want? Which is better?",
      ["Who = subject.", "Whom formal object: To whom?", "What for things.", "Which for choice among options."],
      ["Who is at the door?", "What happened?", "Which do you prefer?", "Whom did you see? (formal)"],
      ["Who vs whom: whom after preposition formal."]
    ),
    pron_relative_who: G(
      "Who introduces relative clauses referring to people (and sometimes pet animals).",
      "Defining: The woman who lives next door...\nNon-defining: My friend, who lives abroad, is visiting.\n\nWho = subject or object (informal object)",
      ["Who for people as subject.", "Whom for object in formal writing.", "Defining and non-defining.", "Who can replace that for people in defining clauses.", "Never omit who when it is the subject."],
      ["The student who won is smart.", "Anyone who knows the answer...", "My friend, who lives abroad, is visiting.", "The people who called left a message."],
      ["The man who I met → whom/that in formal English; who common in speech."]
    ),
    pron_relative_which: G(
      "Which refers to things and animals; also whole clauses in non-defining relatives.",
      "Defining: The book which I read...\nNon-defining: My car, which is old, still runs.\nWhole clause: He passed, which surprised us.",
      ["Which for things and animals.", "Defining and non-defining (commas).", "Which can refer to a whole sentence/clause.", "That also possible in defining (informal).", "Never omit which when it is the subject."],
      ["The film which we saw was great.", "This house, which was built in 1900, is listed.", "He passed the exam, which surprised us.", "The topic which interests me is climate."],
      ["Non-defining: only which (never that)."]
    ),
    pron_relative_that: G(
      "That introduces defining relative clauses for people, animals, and things.",
      "The book that I bought... | The man that called...\n\nDefining only — no commas",
      ["Defining/restrictive clauses only.", "People, animals, and things.", "Can omit when object: The book (that) I read.", "Never used in non-defining clauses (between commas).", "More informal than who/which."],
      ["Everything that glitters is not gold.", "The person that I met was kind.", "This is the best movie that I have seen.", "The house that Jack built."],
      ["Not: My brother, that lives in Paris… → who/which + commas."]
    ),
    pron_relative_whose: G(
      "Whose shows possession in relative clauses.",
      "The student whose essay won...\nA company whose products are popular...",
      ["Whose = possessive relative.", "Usually people and animals.", "Formal style: also things (a town whose history…).", "Whose + noun required.", "Of which / the … of which = formal for things."],
      ["The author whose book I read...", "People whose names I forgot.", "A town whose history is fascinating.", "The student whose phone rang apologized."],
      ["Whose for things is standard in modern English; of which is more formal."]
    ),
    pron_relative_where: G(
      "Where introduces defining relative clauses referring to a place.",
      "The town where I grew up. | I know a restaurant where the food is excellent.\n\nWhere = in/at which (place)",
      ["Places only — not people or things.", "Defining clauses (informal alternative to in/at which).", "The café where we met.", "Not used for named landmarks in non-defining info (use which)."],
      ["That's the house where I was born.", "The school where she teaches is nearby.", "I visited the village where my grandparents lived.", "The room where we had the meeting was small."],
      ["Not: people who… (never where for people)."]
    ),
    pron_relative_when: G(
      "When introduces defining relative clauses referring to a time.",
      "The day when we met. | There isn't a day when I don't feel busy.\n\nWhen = on/in/at which (time)",
      ["Times, days, moments, periods.", "Defining clauses (informal alternative to on/in which).", "I'll never forget the day when…", "Also why for reasons, where for places."],
      ["The moment when everything changed.", "1999 was the year when I graduated.", "There was a time when we met every week.", "The day when the shop closed was a Monday."],
      ["When as subject cannot be omitted: *The day we met* only if when is object complement."]
    ),
    rel_defining: G(
      "Defining relative clauses give essential information to identify who or what is meant.",
      "The man who called is my boss.\nEssential information — no commas",
      ["Restrictive/essential.", "No commas.", "who / which / that (that = defining only).", "Omit pronoun only if object.", "where / when / why in defining clauses."],
      ["Students who study pass.", "The car that I want is sold.", "The food which he cooked was good.", "Something I said upset her."],
      ["Commas change meaning: defining vs non-defining."],
      "Primary introduction at A2; whose/where/when extended at B1.",
      "Non-defining relatives → A2|disc"
    ),
    rel_non_defining: G(
      "Non-defining relative clauses add extra, non-essential information; commas required.",
      "My brother, who lives in Paris, is visiting.\nExtra info — commas essential",
      ["Non-restrictive / extra information.", "Commas both sides (or one comma before clause at end).", "who for people; which for things.", "That never used.", "Pronoun cannot be omitted."],
      ["London, which is the capital, is busy.", "Sarah, who I know well, called.", "The sun, which is a star, provides light.", "My car, which I bought last year, broke down."],
      ["Not: My car, that I bought… → which + commas."],
      "Intro at A2 with commas; never that in non-defining.",
      "Defining relatives → A2|disc ; whose/where → B1|pron"
    ),
    quant_many_much: G(
      "Many with countables; much with uncountables; a lot of for both in affirmative.",
      "many books | much water | a lot of time/people\n\nHow many? How much?",
      ["Many + plural countable.", "Much + uncountable (questions/negatives).", "A lot of informal affirmative both.", "So many / so much for emphasis."],
      ["How many siblings do you have?", "I don't have much money.", "There are many options.", "She has a lot of experience."],
      ["Much in affirmative formal; a lot of common spoken."]
    ),
    quant_few_little: G(
      "Few/a few and little/a little differ in connotation: negative vs positive.",
      "few (almost none) vs a few (some)\nlittle (almost none) vs a little (some)\n\nFew people came. A few people came.",
      ["Few/little = not enough (negative).", "A few/a little = some (positive).", "Few + plural; little + uncount.", "Very few, very little for emphasis."],
      ["I have little time (not enough).", "I have a little time (some).", "Few students failed.", "A few friends visited."],
      ["Few vs a few completely changes meaning."],
      "A2 quantifier nuance; both/either/neither in précis.",
      "Many / much → A2|num"
    ),
    quant_some_any: G(
      "Some in affirmative; any in questions, negatives, and conditionals.",
      "some: I have some friends.\nany: Do you have any? I don't have any.\n\nSome in offers/requests: Would you like some tea?",
      ["Some affirmative.", "Any questions/negatives.", "Some in polite requests.", "No = not any."],
      ["There is some milk.", "Are there any problems?", "I don't have any cash.", "Would you like some coffee?"],
      ["Some in questions when expecting yes."]
    ),
    quant_all_every: G(
      "All, every, and each express totality or distribution.",
      "all + plural/uncount | every + singular | each + singular\n\nAll students | every student | each student",
      ["All + noun (plural or uncount).", "Every + singular noun.", "Each emphasizes individuals.", "All of / each of + pronoun."],
      ["All children need love.", "Every day is different.", "Each person has a ticket.", "All of us agree."],
      ["Every students is wrong; every student."]
    ),
    adj_ed_ing: G(
      "-ed adjectives describe feelings or passive state; -ing describes cause or active quality.",
      "bored vs boring | interested vs interesting | tired vs tiring\n\nI am bored. The film is boring.",
      ["-ed = how someone feels.", "-ing = causing the feeling.", "Amazed vs amazing.", "Confused vs confusing."],
      ["I am interested in art.", "The lecture was boring.", "She was surprised by the news.", "It was an exciting game."],
      ["I am boring means you bore others."]
    ),
    adj_order: G(
      "Multiple adjectives follow a typical order: opinion, size, age, shape, color, origin, material, purpose.",
      "Opinion-Size-Age-Shape-Color-Origin-Material-Purpose\n\nA beautiful old Italian house\nA small round wooden table",
      ["Opinion before fact.", "Size before color.", "Material near noun.", "Not all adjectives in one sentence usually."],
      ["A lovely big red balloon.", "An old French wine.", "A small black leather bag.", "A nice wooden chair."],
      ["A red big car sounds unnatural."]
    ),
    adj_comparative_form: G(
      "Form comparatives and superlatives according to syllable count and spelling.",
      "1 syllable: hot → hotter → hottest\n2 syllables -y: easy → easier\n2+ syllables: careful → more careful\n\nDouble consonant: big → bigger",
      ["-er/-est short adjectives.", "-y → -ier/-iest.", "More/most long adjectives.", "Irregular: good, bad, far."],
      ["This is easier than I thought.", "She is the happiest person I know.", "It was more difficult than expected.", "He is taller than his father."],
      ["More easier is double comparative error."]
    ),
    imperative: G(
      "The imperative gives commands or instructions using the base verb.",
      "Affirmative: Open the door. Be quiet.\nNegative: Don't open the window. Do not touch.\n\nSubject you omitted",
      ["Base verb for command.", "Don't + base for negative.", "Do not emphatic formal.", "Please + imperative polite."],
      ["Close the book.", "Don't be late.", "Please sit down.", "Let's go (let us)."],
      ["Be + adjective imperative: Be careful."]
    ),
    cleft_it: G(
      "It-cleft sentences emphasize one element: It is/was... that/who...",
      "It was John who called.\nIt is tomorrow that we leave.\n\nIt-cleft for focus",
      ["It is/was + focus + that/who.", "Who for people; that for things.", "Stress on focused element.", "Cleft for contrast or correction."],
      ["It was Mary who won.", "It is money that causes problems.", "It wasn't me who broke it.", "It is here that we met."],
      ["It-cleft vs pseudo-cleft (What I need is...)."],
      "Oral and written emphasis ; common for contrast and correction.",
      "Wh-cleft → B2|disc ; preparatory it → B2|pron"
    ),
    cleft_wh: G(
      "Wh-cleft (pseudo-cleft) uses what-clause for emphasis.",
      "What I need is a vacation.\nWhat she said was surprising.\n\nWhat-clause + be + focus",
      ["What I did was call him.", "All I want is peace.", "What happened was unexpected.", "Reverse wh-cleft: A vacation is what I need."],
      ["What I love is chocolate.", "What we need is time.", "All he said was goodbye.", "What surprised me was her reaction."],
      ["What-clause as subject singular verb."],
      "Written and spoken focus ; what-clauses frequent in argumentation.",
      "It-cleft → B2|disc ; what-clauses → B2|pron"
    ),
    inversion: G(
      "Inversion places auxiliary before subject for emphasis or formal style.",
      "Never have I seen... | Rarely does he... | Not only did she...\n\nOnly after + inversion",
      ["Negative adverb fronting → inversion.", "Never, rarely, seldom, hardly, not only.", "Auxiliary before subject.", "No inversion with subject pronoun only after so/neither."],
      ["Never have I been so surprised.", "Rarely do we see such talent.", "Not only did he win, but he broke the record.", "Only then did I understand."],
      ["Never I have seen → Never have I seen."],
      "Formal writing, speeches and literary style ; rare in casual speech.",
      "Negative adverbs → B2|adv ; cleft sentences → B2|disc"
    ),
    inversion_neither: G(
      "So/neither inversion agrees with positive/negative previous statement.",
      "I am tired. So am I. / I can't swim. Neither can I.\n\nSo + auxiliary + subject (positive)\nNeither/Nor + auxiliary + subject (negative)",
      ["So am I / So do I for agreement positive.", "Neither am I / Neither do I negative.", "Auxiliary matches first clause.", "Nor = neither formal."],
      ["She loves coffee. So do I.", "He hasn't finished. Neither have I.", "I can drive. So can she.", "They won't come. Nor will we."],
      ["So I am wrong; So am I correct."]
    ),
    question_tags: G(
      "Question tags confirm information; positive statement → negative tag, and vice versa.",
      "You're coming, aren't you?\nShe isn't ready, is she?\n\nMatch auxiliary and subject pronoun",
      ["Same auxiliary as main clause.", "Positive clause → negative tag.", "Negative clause → positive tag.", "Intonation: rising (real question) vs falling (expect agreement)."],
      ["It's cold, isn't it?", "You haven't seen him, have you?", "She can swim, can't she?", "They live here, don't they?"],
      ["I am late, amn't I? → aren't I? (British)."],
      "Basic tags at A2; match auxiliary (do/does/did, can, have).",
      "Sequencing connectors → A2|disc"
    ),
    phrasal_verbs: G(
      "Phrasal verbs combine verb + particle (up, off, out) with idiomatic meaning.",
      "look up, give up, take off, find out, turn on\n\nSeparable: turn off the light / turn the light off",
      ["Particle changes meaning.", "Separable: object between verb and particle.", "Inseparable: look after someone.", "Transitive phrasal verbs can passivize oddly."],
      ["Please turn off the TV.", "She looked up the word.", "He gave up smoking.", "We need to find out the truth."],
      ["Look up her vs look her up if separable."]
    ),
    used_to: G(
      "Used to expresses past habits or states no longer true; be used to means accustomed.",
      "used to + base: I used to smoke. (past habit)\nbe/get used to + -ing/noun: I'm used to the noise.\n\nDid you use to...? (question)",
      ["Used to = past habit/state.", "Be used to = accustomed to.", "Get used to = become accustomed.", "Used to only past; no present *use to habit."],
      ["I used to live in Rome.", "She is used to working late.", "Did you use to play tennis?", "They got used to the cold."],
      ["Used to vs would for past repeated actions (would not stative)."],
      "Past habits no longer true; distinct from be used to + -ing.",
      "Past simple → A2|verb"
    ),
    wish_if_only: G(
      "Wish and if only express regrets or desires about present/past.",
      "Present regret: wish + past simple (I wish I had money)\nPast regret: wish + past perfect (I wish I had studied)\n\nIf only = stronger wish",
      ["Wish + past for present unreal.", "Wish + past perfect for past regret.", "Wish + would for annoying habit.", "If only similar but more emotional."],
      ["I wish I spoke French.", "I wish I had listened.", "I wish it would stop raining.", "If only I had more time!"],
      ["Wish I was vs were: were formal."]
    ),
    participle_clauses: G(
      "Participle clauses shorten subordinate clauses using -ing or past participle.",
      "Walking home, I saw an accident. (= While I was walking)\nWritten in 1990, the book is a classic.\n\nHaving finished, we left.",
      ["-ing for active/simultaneous.", "Past participle for passive.", "Having + PP for prior action.", "Dangling participle error if subject mismatch."],
      ["Seen from above, the city is beautiful.", "Not knowing what to do, she called.", "Having eaten, we went out.", "Tired from work, he slept early."],
      ["Walking home, the accident happened → dangling (wrong subject)."]
    ),
    ellipsis: G(
      "Ellipsis omits repeated words when meaning stays clear.",
      "A: Are you coming? B: I am. (ellipsis of coming)\nShe can swim and he can too.\n\nAuxiliary retention in short answers",
      ["Avoid repetition.", "So/neither ellipsis.", "Short answers: Yes, I have.", "Shared elements in parallel structures."],
      ["I haven't read it, but she has.", "He will help if you will.", "Who wants coffee? I do.", "She likes tea and he coffee. (ellipsis of likes)"],
      ["Yes, I have read vs Yes, I have (ellipsis)."]
    ),
    there_existential: G(
      "There is/are introduces existence; there agrees with following noun.",
      "There is a book. There are many books.\nThere was / There have been\n\nThere + be + noun",
      ["There as dummy subject.", "Verb agrees with noun after.", "There is + singular; there are + plural.", "There in all tenses with be."],
      ["There is a problem.", "There are three options.", "There has been an accident.", "There will be a meeting tomorrow."],
      ["There's + plural informal; there are preferred formal."]
    ),
    so_such: G(
      "So + adjective/adverb; such + (a/an) + adjective + noun.",
      "so big | so quickly\nsuch a day | such beautiful weather\n\nSo... that / Such... that (result)",
      ["So + adj/adv.", "Such + noun phrase.", "So big a house = such a big house.", "So many/much/few/little + noun."],
      ["It was so cold that we stayed inside.", "Such a lovely day!", "She is so talented.", "There was so much noise."],
      ["Such big vs so big (such + adj + noun)."]
    ),
    too_enough: G(
      "Too means excessive; enough indicates sufficient degree.",
      "too + adj/adv (+ for/to)\nadj/adv + enough (+ to)\n\nToo tired to walk | Old enough to vote",
      ["Too = more than acceptable.", "Enough after adj; before noun.", "Too... to = impossible because of excess.", "Enough... to = sufficient for."],
      ["It's too hot to go out.", "She is old enough to drive.", "I don't have enough time.", "He runs too fast for me."],
      ["Enough big → big enough (word order)."]
    ),
    no_none: G(
      "No + noun; none alone or none of + noun/pronoun.",
      "no money, no friends\nnone / none of the students / none of it\n\nNo = not any before noun",
      ["No + noun (no article).", "None pronoun alone.", "None of + the/my/these + plural.", "None can be singular or plural verb."],
      ["I have no idea.", "None of this makes sense.", "There were none left.", "She has no children."],
      ["No any money is wrong; no money or not any money."]
    ),
    both_either_neither: G(
      "Both (two), either (one of two), neither (not either) for pairs.",
      "both A and B | either A or B | neither A nor B\n\nBoth are ready. Neither is correct.",
      ["Both + and.", "Either + or.", "Neither + nor.", "Singular verb with neither/either officially."],
      ["Both my parents work.", "Either option is fine.", "Neither answer is correct.", "I like both tea and coffee."],
      ["Neither of them are → is (formal singular)."]
    ),
    articles_geography: G(
      "Geographic names use the, zero article, or fixed patterns.",
      "the United States | the Alps | the Nile\nFrance | Mount Everest | Lake Baikal\n\nthe + plural countries/states | zero + single country",
      ["The + plural names: the Philippines.", "The + rivers, oceans, deserts.", "Zero + single countries, cities.", "The + UK, the US (abbreviations)."],
      ["She lives in the Netherlands.", "We crossed the Atlantic.", "They visited Japan.", "The Sahara is vast."],
      ["The France is wrong; France or I live in France."]
    ),
    prepositions_time: G(
      "Time prepositions: at, on, in, for, since, during, by, until.",
      "at 5 o'clock | on Monday | in July | for two hours | since 2020\n\nduring the meeting | by Friday | until noon",
      ["At + time of day/night.", "On + day/date.", "In + month/year/season.", "For + duration; since + start point."],
      ["The meeting is at three.", "I was born on May 5.", "We rest in summer.", "I have waited for an hour."],
      ["In the morning vs at night (fixed)."]
    ),
    prepositions_place: G(
      "Place prepositions: in, on, at, under, above, between, among, next to.",
      "in the room | on the table | at the door\nunder the bed | between A and B | among friends",
      ["In enclosed space.", "On surface.", "At specific point/address.", "Between two; among three+."],
      ["She is in the kitchen.", "The book is on the shelf.", "Meet me at the station.", "He sat between his parents."],
      ["In/on/at for transport: in a car, on a bus, at home."]
    ),
    passive_modal: G(
      "Passive with modals: modal + be + past participle.",
      "can be done | must be finished | should be sent\n\nThe work must be completed by Friday.",
      ["Modal + be + PP.", "All modals except will have same pattern.", "Agent with by optional.", "Continuous passive: is being built."],
      ["It can be repaired.", "The letter should be posted.", "This mustn't be shared.", "The bridge is being constructed."],
      ["Must be done vs have to be done."]
    ),
    reported_questions: G(
      "Reported questions use if/whether (yes/no) or question word + statement order.",
      "Direct: \"Are you ready?\" → He asked if I was ready.\nDirect: \"Where do you live?\" → She asked where I lived.",
      ["No question order in reported.", "If/whether for yes-no.", "Wh-word + subject + verb.", "Ask + object + if/wh."],
      ["He asked whether I was coming.", "She wanted to know what I wanted.", "They asked where I had been.", "I asked if she could help."],
      ["He asked where was I → where I was."]
    ),
    reported_commands: G(
      "Reported commands and requests use tell/ask + object + to-infinitive.",
      "Direct: \"Close the door.\" → He told me to close the door.\n\"Don't smoke.\" → She told him not to smoke.",
      ["Tell/ask/order + obj + to inf.", "Negative: told me not to.", "Say not used with object + to (say to me).", "Warn/advise + obj + to."],
      ["The teacher told us to be quiet.", "She asked me not to tell.", "He ordered them to leave.", "They advised him to rest."],
      ["He said me to go → He told me to go."]
    ),
    noun_clauses: G(
      "Noun clauses function as subjects or objects: that, wh-, if clauses.",
      "That she left surprised me.\nI know that he is honest.\nWhat you said is true.",
      ["That-clause after know, think, say.", "Wh-clause as subject/object.", "If/whether for yes-no noun clauses.", "That omission informal object position."],
      ["I believe that she is right.", "What he needs is support.", "The problem is that we are late.", "I wonder whether they will come."],
      ["That omission: I think (that) he knows."]
    ),
    adverb_position: G(
      "Adverb placement varies: mid (frequency), end (manner), front (emphasis).",
      "Frequency: usually before main verb, after be\nManner: end | Time: end often\n\nShe often reads. | He reads quickly.",
      ["Frequency between subject and verb.", "After am/is/are.", "Manner at end.", "Front for emphasis: Suddenly, he left."],
      ["I always eat breakfast.", "She is never late.", "They worked hard yesterday.", "Fortunately, nobody was hurt."],
      ["She goes often → She often goes (frequency position)."]
    ),
    double_comparatives: G(
      "Double comparatives show parallel increase: the more... the more...",
      "The more you practice, the better you get.\nThe harder he worked, the more tired he became.",
      ["The + comparative..., the + comparative...", "Parallel structure.", "Shows cause-effect relationship.", "The + adj/adv comparative both clauses."],
      ["The sooner, the better.", "The more I learn, the less I know.", "The colder it gets, the more we spend on heating.", "The longer you wait, the harder it becomes."],
      ["More you practice → The more you practice."]
    ),
    perfect_continuous: G(
      "Perfect continuous emphasizes duration up to a point: have/has been + -ing.",
      "I have been waiting for an hour.\nShe has been working here since 2020.",
      ["Have/has been + -ing.", "Duration until now.", "How long + present perfect continuous.", "Contrast with present perfect simple (completion vs duration)."],
      ["I have been studying all day.", "It has been raining since morning.", "How long have you been living here?", "She has been feeling ill lately."],
      ["I've been knowing → I've known (stative)."]
    ),
    causative_have_get: G(
      "Causative have/get + object + past participle: someone else does the action.",
      "I had my hair cut. | She got the car repaired.\nHave/get + obj + PP",
      ["Have something done = arrange for service.", "Get more informal.", "Hair cut, car fixed common collocations.", "Get someone to do = persuade."],
      ["I need to have my eyes tested.", "He got his wallet stolen.", "She had the house painted.", "I'll get him to help us."],
      ["I cut my hair (I did it) vs I had my hair cut (barber)."]
    ),
    subjunctive_formal: G(
      "Formal subjunctive uses base verb after certain expressions (American English).",
      "I suggest that he be on time.\nIt is essential that she attend.\n\nBase form for all persons",
      ["That + base verb (no -s).", "Suggest, recommend, insist, demand.", "More common American formal.", "British often uses should + inf."],
      ["They demanded that he leave.", "It is vital that every student be present.", "I recommend that she take a break.", "The judge ordered that the witness appear."],
      ["British: I suggest he should go."]
    ),
    discourse_markers: G(
      "Discourse markers organize speech and writing (B2+): however, moreover, nevertheless.",
      "However, Moreover, Nevertheless, Furthermore, In contrast, On the other hand\n\nHowever at sentence start with comma",
      ["However = contrast.", "Moreover/furthermore = addition.", "Nevertheless = despite that.", "Punctuation with conjunctive adverbs."],
      ["The plan is risky; however, it might work.", "Moreover, costs have risen.", "It was difficult. Nevertheless, we succeeded.", "Furthermore, evidence supports this."],
      ["However comma when joining two independent clauses with semicolon."],
      "Academic and formal writing ; hence/thus/conversely at B2.",
      "B2 connectors → B2|disc ; formal connectors → B1|adv"
    ),
    emphasis_do: G(
      "Emphatic do/does/did stresses the verb in affirmative sentences.",
      "I do understand. | She did call you. | They do work hard.\n\nDo/does/did + base verb (no -s with does emphasis on base? does + base)",
      ["Do/does/did + base for emphasis.", "Contradiction: I did lock the door!", "Does + base: He does know.", "Not used with modals or be."],
      ["I do want to help.", "She did finish the project.", "They do care about you.", "We did warn them."],
      ["Emphatic did + base: He did go, not he did goes."]
    ),
    quantifiers_advanced: G(
      "Advanced quantifiers: plenty of, a great deal of, a number of, the majority of.",
      "plenty of + count/uncount | a great deal of + uncount\na number of + plural verb | the majority of + plural",
      ["Plenty of informal enough.", "A great deal of formal much.", "A number of + plural verb.", "The majority of + plural."],
      ["There is plenty of time.", "A great deal of effort was required.", "A number of issues were raised.", "The majority of voters agreed."],
      ["A number of is plural; the number of is singular."]
    ),
    relative_whereby: G(
      "Formal relative adverbs: whereby, wherein (B2+ legal/formal register).",
      "A system whereby users can vote...\nThe contract wherein terms are stated...",
      ["Whereby = by which.", "Formal/written register.", "Wherein = in which (very formal).", "Standard where/when suffice in everyday English."],
      ["They established a process whereby complaints are handled.", "A method whereby data is protected.", "Formal documents use wherein.", "Everyday: the way in which / where."],
      ["Whereby rare in conversation."]
    ),
    hedging_language: G(
      "Hedging softens claims in academic writing (C1): might, tend to, appear to, somewhat.",
      "The results suggest... | It appears that... | This may indicate...\n\nAvoid absolute claims",
      ["Modal verbs for caution.", "Seem/appear/tend to.", "Somewhat, relatively, generally.", "Academic objectivity."],
      ["This may suggest a correlation.", "The data tend to support the theory.", "It would appear that costs have risen.", "The policy is somewhat effective."],
      ["Over-hedging weakens argument; balance needed."],
      "Academic and journalistic writing (C1).",
      "Epistemic adverbs → C1|adv ; boosters vs hedges → C1|adv ; formal register → register_formal"
    ),
    ergative_verbs: G(
      "Ergative verbs allow subject to be doer or undergoer: open, break, increase.",
      "She opened the door. / The door opened.\nThey broke the glass. / The glass broke.",
      ["Transitive and intransitive same verb.", "Intransitive = change of state.", "No passive needed for intransitive use.", "Open, close, start, increase, improve."],
      ["Sales increased last quarter.", "He increased prices.", "The window broke.", "She broke the window."],
      ["The door was opened vs The door opened (different nuance)."]
    ),
    binomials: G(
      "Binomial pairs are fixed coordinated phrases (C1): pros and cons, by and large.",
      "Pros and cons | Safe and sound | By and large | Trial and error\n\nFixed order rarely reversed",
      ["Fixed word order.", "And/or linking.", "Idiomatic pairs.", "Register varies formal/informal."],
      ["We discussed the pros and cons.", "They arrived safe and sound.", "By and large, it worked.", "Learning happens through trial and error."],
      ["Cons and pros sounds unnatural."],
      "Academic and journalistic fixed phrases (C1).",
      "Dense noun phrases → C1|nom ; collocations → collocations_verb"
    ),
    modals_deduction: G(
      "Modals for deduction: must (certain), might/could (possible), can't (impossible).",
      "must be | might/could be | can't be\n\nPast: must have + PP | might have + PP | can't have + PP",
      ["Must = logical certainty now.", "Can't = logical impossibility.", "Must have + PP = certain past.", "Might/could have = possible past."],
      ["She must be at home. (I'm sure)", "He can't be serious.", "They must have left already.", "She might have forgotten."],
      ["Mustn't ≠ must not deduction; mustn't = prohibition."],
      "Epistemic modality — deduction and probability (C1).",
      "Epistemic vs deontic → C1|verb ; journalistic modals → C1|verb ; modals B1 → B1|verb"
    ),
    determiners_each_every: G(
      "Determiners quantify or specify nouns: each, every, all, both, half, either, neither.",
      "each student (individual focus) | every student (group as units)\nall students | both books | half the class",
      ["Each emphasizes individuals separately.", "Every = all members of group.", "Both for two items.", "Half + of + the + noun."],
      ["Each participant received a certificate.", "Every child needs love.", "Both options are valid.", "Half of the cake is gone."],
      ["Every students → every student."]
    ),
    word_formation: G(
      "Word formation: prefixes (un-, re-, mis-) and suffixes (-tion, -ness, -ful, -less).",
      "unhappy | rewrite | mislead\nhappiness | careful | useless\n\nNoun -tion from verbs: act → action",
      ["Prefix changes meaning.", "Suffix changes word class.", "-ful/-less = with/without.", "-ness for abstract nouns from adjectives."],
      ["She was unhappy with the result.", "This is a careful analysis.", "The happiness of children matters.", "They misread the instructions."],
      ["Careful (adj.) vs carefully (adv.)."]
    ),
    linking_words: G(
      "Linking words connect ideas: addition, contrast, cause, result, sequence.",
      "Addition: moreover, furthermore, in addition\nContrast: however, although, whereas\nCause: because, since, due to\nResult: therefore, consequently, as a result",
      ["However contrasts (comma/semicolon).", "Although + clause (concession).", "Therefore result (formal).", "Because vs because of + noun."],
      ["The cost rose; therefore, prices increased.", "Although it rained, we went out.", "Due to the weather, the event was cancelled.", "Furthermore, evidence supports this."],
      ["Because of the rain was, is wrong structure."]
    ),
    academic_passive: G(
      "Academic writing favors passive and nominalization for objectivity.",
      "The experiment was conducted. | An increase was observed.\nNominalization: analyze → analysis",
      ["Passive hides agent.", "Nominalization: verb → noun.", "Impersonal structures: It is argued that...", "Avoid I/we in formal papers sometimes."],
      ["Data were collected over six months.", "It has been suggested that climate is changing.", "A significant difference was found.", "The implementation of the policy..."],
      ["Overuse of passive reduces clarity."]
    ),
    modals_probability: G(
      "Expressing probability without modals: bound to, likely to, unlikely, certain to.",
      "be bound to | be likely to | be unlikely to | be certain to\n\nAdjectives + to-infinitive",
      ["Bound to = almost certain.", "Likely/unlikely + to inf.", "Certain/sure + to inf.", "Probable that + clause."],
      ["She is bound to succeed.", "It is likely to rain.", "They are unlikely to agree.", "He is certain to win."],
      ["Bound to vs must (register difference)."]
    ),
    collocations_verb: G(
      "Collocations are fixed verb-noun/adj combinations native speakers use.",
      "make a decision | do homework | take a photo | pay attention\nheavy rain | strong coffee | fast asleep",
      ["Make vs do common confusion.", "Take vs have: take a shower.", "Adjective + noun fixed: heavy rain.", "Learn as chunks not word-by-word."],
      ["She made a mistake.", "I need to do the dishes.", "Pay attention in class.", "We had heavy rain yesterday."],
      ["Make homework → do homework."]
    ),
    register_formal: G(
      "Formal register uses latinate vocabulary, passive, and complete structures (C1).",
      "Commence vs start | Purchase vs buy | Request vs ask for\nNo contractions; complete sentences",
      ["Avoid contractions in formal writing.", "Latinate verbs more formal.", "Passive for objectivity.", "Complete question forms not ellipsis."],
      ["We request your presence at the meeting.", "The report was submitted on time.", "I would appreciate your response.", "Participants are required to register."],
      ["Over-formality in casual email sounds odd."],
      "Formal written register — academic, legal, institutional (C1).",
      "Register mapping → C1|disc ; academic passive → academic_passive ; hedging → hedging_language"
    ),
    tense_consistency: G(
      "Maintain tense consistency in paragraphs unless time shift is logical.",
      "Narrative past: all past tenses unless direct speech present\nAcademic present for general truths",
      ["Historical present for vividness optional.", "Don't shift randomly past/present.", "Present for literature analysis.", "Flashback uses past perfect."],
      ["She walked in and sat down.", "The author argues that society changes.", "He had already left when I arrived.", "In 1990, the company was founded."],
      ["Random tense shifts confuse readers."]
    ),
    extraposition: G(
      "Extraposition moves heavy clauses to end: It is clear that... / There is no doubt that...",
      "It + be + adj + that clause\nThere + be + noun + that clause\n\nIt is important that everyone attend.",
      ["It dummy subject + that clause.", "Heavy subject moved to end.", "There is no doubt that...", "Formal and academic."],
      ["It is essential that he be informed.", "There is evidence that supports this.", "It surprised me that she left.", "It is unlikely that they will agree."],
      ["That-clause as subject without it is heavy."],
      "Formal and academic syntax (C1).",
      "Cleft sentences → C1|disc ; anticipatory it → C2|pron ; academic passive → academic_passive"
    ),
    fronting_emphasis: G(
      "Fronting places elements at sentence start for emphasis (B2+).",
      "Never have I seen such beauty.\nThis I cannot accept.\n\nObject fronting: That much I know.",
      ["Negative adverb inversion.", "Object fronting literary.", "This/That fronted for contrast.", "Complement fronting rare formal."],
      ["Only then did I realize.", "Such was his anger that he left.", "This much is clear.", "Harder than expected was the exam."],
      ["Fronting changes information structure not meaning core."]
    ),
    correlative_conjunctions: G(
      "Correlative pairs join parallel structures: both...and, either...or, not only...but also.",
      "both A and B | either A or B | neither A nor B | not only A but also B",
      ["Parallel grammatical structure required.", "Both...and plural verb if both plural.", "Either...or verb agrees nearer subject.", "Not only...but also emphasis."],
      ["Both the teacher and the students agreed.", "Either coffee or tea is fine.", "Not only did he win, but he also broke the record.", "Neither John nor Mary was available."],
      ["Both...and with non-parallel forms is error."]
    ),
    reduced_relative: G(
      "Reduced relative clauses omit relative pronoun and auxiliary (B2+).",
      "The man (who is) standing there...\nThe book (that was) written in 1990...\n\nActive: -ing | Passive: past participle",
      ["Present participle for active.", "Past participle for passive.", "Only when relative pronoun is subject.", "Defining clauses mainly."],
      ["Anyone wanting tickets should queue.", "The issues discussed were complex.", "Students failing the exam must retake.", "The letter sent yesterday arrived."],
      ["The man wanting to leave him → ambiguous; use full clause."]
    ),
    narrative_tenses: G(
      "Narrative sequences combine past simple, continuous, perfect for storytelling.",
      "Past simple: main events | Past continuous: background\nPast perfect: earlier event before past simple",
      ["Past simple advances plot.", "Past continuous sets scene.", "Past perfect for flashback.", "Mix for natural narrative."],
      ["The sun was shining when we left.", "I had never seen him before that day.", "She opened the door and screamed.", "They were having dinner when the phone rang."],
      ["Past perfect overuse when simple past suffices."],
      "Narrative and literary writing (C1).",
      "Historical present → C1|verb ; past simple/continuous → A2|verb, B2|verb ; aspect → C1|verb"
    ),
    subject_verb_agreement: G(
      "Subject-verb agreement requires matching number, especially with collective nouns and intervening phrases.",
      "The team is/are... (BrE allows plural) | Neither...nor + verb\nThe number of + singular | A number of + plural",
      ["Singular subject → singular verb.", "Collective nouns: team, government (context).", "Neither/nor agrees with nearer subject.", "Each/every + singular."],
      ["The news is surprising.", "Neither the teacher nor the students were ready.", "A number of issues were raised.", "Each of the candidates has a platform."],
      ["The data is/are (field-dependent)."]
    ),
    cohesion_devices: G(
      "Cohesion devices link sentences: reference, substitution, ellipsis, lexical chains (C1).",
      "Reference: it, this, they | Substitution: one, do so | Ellipsis: shared verb omitted\nLexical chain: climate → warming → emissions",
      ["Reference pronouns need clear antecedent.", "One replaces countable noun.", "Ellipsis avoids repetition.", "Lexical chains unify paragraphs."],
      ["Climate change affects ecosystems. It also impacts economies.", "I need a pen. Do you have one?", "She can swim and he can too.", "Pollution, emissions, and carbon all relate."],
      ["Ambiguous it without clear antecedent."],
      "Academic writing and extended discourse (C1).",
      "Coreference → C1|pron ; cleft/extraposition → C1|disc ; B2 cohesion → B2|disc"
    )
  };

  global.GRAMMAR_DEEP_LIB = { fr: fr, en: en };
})(typeof window !== "undefined" ? window : global);
