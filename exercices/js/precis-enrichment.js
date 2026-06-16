/**
 * Enrichit GRAMMAR_DATA : points cliquables = contenu principal du précis (sans vue d'ensemble).
 */
(function (global) {
  const CEFR_NOTES = {
    fr: {
      A1: "Niveau découverte : formules simples, oral prioritaire, peu de théorie.",
      A2: "Niveau survie élargie : passés de base, pronoms compléments, négations composées.",
      B1: "Niveau seuil : subjonctif, futur, doubles pronoms, textes structurés.",
      B2: "Niveau avancé : temps du passé complexes, registre soutenu, argumentation.",
      C1: "Extension autonomie : subj. imparfait réceptif, passé simple, modalité fine, registres, coréférence.",
      C2: "Extension maîtrise : métalangue, liaisons, variation sociolinguistique, implicature, passé antérieur réceptif."
    },
    en: {
      A1: "Discovery level: simple chunks, speaking first, minimal theory.",
      A2: "Elementary: basic past tenses, object pronouns, extended negation.",
      B1: "Threshold: perfect vs past, conditionals, passive, reported speech.",
      B2: "Advanced: complex conditionals, formal register, cohesion.",
      C1: "Extension proficiency: Aktionsart, narrative tenses, epistemic/journalistic modals, register, coreference.",
      C2: "Extension mastery: metalanguage, implicature, sociolinguistic variation, archaic recognition."
    }
  };

  const PRECIS_SUPPLEMENTS = {
    fr: {
      "A1|nom": "• Pluriel régulier : ajouter -s au singulier.\n  Ex. : un livre → des livres, la table → les tables.\n• Genre grammatical : chaque nom est masculin ou féminin — apprenez le avec son article (le/la).",
      "A1|adv": "• Fréquence : toujours, souvent, parfois, rarement, jamais — après le verbe simple.\n• Lieu : ici, là, là-bas.\n• Temps : aujourd'hui, demain, hier.",
      "A1|disc": "• Phrase de base : Sujet + Verbe + Complément.\n• Négation : ne + verbe + pas.\n• Question : Est-ce que tu… ? ou intonation montante.",
      "A1|num": "• Nombres 0–100.\n• Partitif : du, de la, de l'.\n• beaucoup de, un peu de + nom.",
      "A2|nom": "• Contractions : au, aux, du, des.\n• Locutions sans article : en voiture, à pied.\n• Noms composés : chefs-d'œuvre, grands-parents.",
      "A2|verb": "• PC : avoir/être + p.p. (accord avec être).\n• Imparfait : description, habitude.\n• PC vs imparfait : action ponctuelle / toile de fond.",
      "A2|adj": "• Comparatif : plus/moins/aussi…que.\n• Irréguliers : meilleur, mieux, pire.\n• Superlatif : le/la/les plus + adj.",
      "A2|pron": "• COD : le, la, les — avant le verbe.\n• COI : lui, leur.\n• y (lieu) et en (quantité).",
      "A2|adv": "• ne…plus, ne…jamais, ne…rien, ne…personne.\n• très, assez, trop + adjectif.",
      "A2|disc": "• Séquence : d'abord, ensuite, enfin.\n• Relatives qui/que (essentielles).\n• Parce que / donc / mais.",
      "A2|num": "• Ordinaux : premier, deuxième…\n• Fractions : un tiers, la moitié.",
      "B1|verb": "• Subjonctif : il faut que tu viennes.\n• Futur simple : je partirai demain.\n• Passif : Le rapport a été signé.",
      "B1|pron": "• Ordre : me/te/se → le/la/les → lui/leur → y → en.\n• dont, où, lequel.",
      "B1|num": "• la plupart de + pluriel.\n• environ, presque + quantité.",
      "B2|nom": "• GN complexes, substantivation.\n• liaisons obligatoires/interdites.",
      "B2|verb": "• conditionnel passé, subjonctif passé.\n• futur antérieur, infinitif passé.",
      "B2|adj": "• accord en (COD antéposé).\n• collectif/fraction, paires adj./part.",
      "B2|adv": "• ne…guère, ne…point (littéraire).\n• certes, or (modalité).",
      "B2|disc": "• clivage, inversion stylistique.\n• hypothèse 3e degré, connecteurs B2.",
      "B2|pron": "• auquel, duquel (prép. complexes).\n• quiconque, nul (soutenu).",
      "B2|num": "• la moitié, le tiers — accord variable.\n• à hauteur de (formel).",
      "C1|verb": "• Subjonctif imparfait : qu'il fût, qu'elle eût (réceptif).\n• Conditionnel journalistique : serait impliqué.\n• Modalité : devoir épistémique vs déontique.",
      "C1|disc": "• Clivées : C'est X qui/que…\n• Détachées : Fatiguée, elle… / Son travail terminé…\n• Registres : soutenu / courant / familier.",
      "C1|adv": "• Épistémiques : apparemment, vraisemblablement, soi-disant.\n• Litote : Ce n'est pas sans intérêt.\n• Euphémisme : Il nous a quittés.",
      "C1|pron": "• Coréférence textuelle.\n• on : valeurs multiples.",
      "C1|num": "• maints, force + nom (littéraire).",
      "C2|verb": "• Passé antérieur : Quand il eut fini, il sortit (réceptif).\n• Subj. plus-que-parfait : qu'il eût fini.",
      "C2|disc": "• Métalangue : anaphore, coréférence, implicature.\n• Variation : diatopique, diastratique, diaphasique.",
      "C2|adv": "• Figures : hyperbate, anacoluthe, zeugme.\n• Implicature (Grice) et présupposé.",
      "C2|nom": "• Liaisons facultatives = registre soutenu.\n• Liaisons interdites : après et, h aspiré.",
      "C2|num": "• Numéraux composés avec traits d'union.\n• Registres de quantification."
    },
    en: {
      "A1|adv": "• always, often, sometimes, never — mid position.\n• here, there.\n• today, tomorrow, yesterday.",
      "A1|disc": "• S + V + O word order.\n• don't/doesn't + base verb.\n• Do you…? questions.",
      "A1|num": "• Numbers 0–100.\n• some/any.\n• a lot of, a little.",
      "A2|nom": "• Countable vs uncountable (systematic).\n• some / any / no.\n• Compound nouns : bus stop, swimming pool.",
      "A2|verb": "• Past simple : regular -ed / irregular list.\n• Present perfect intro : have/has + PP.\n• Used to : past habits.",
      "A2|adj": "• Comparative : -er / more…than.\n• Superlative : the -est / the most.\n• as…as / not as…as.",
      "A2|pron": "• me, you, him, her, us, them.\n• something / anything / nothing.",
      "A2|adv": "• never, already, yet, still.\n• very, too, enough.",
      "A2|num": "• first, second, third.\n• a third, half.",
      "A2|disc": "• first, then, finally.\n• because / so / but.\n• defining vs non-defining relatives (who/which/that).",
      "B1|verb": "• Present perfect vs past simple (finished time).\n• Passive : The letter was sent.\n• Reported speech : She said she was tired.",
      "B1|pron": "• whose, where, when, whom, why.\n• myself / each other.",
      "B1|disc": "• If + present, will (1st conditional).\n• If + past, would (2nd conditional intro).\n• Question tags : isn't it?",
      "B1|num": "• the majority of, a number of.",
      "B2|nom": "• complex noun phrases.\n• substantivization (the + adj.).",
      "B2|verb": "• third / mixed conditionals.\n• passive all tenses, modals + have, reporting verbs.",
      "B2|adj": "• the…the… comparatives.\n• reduced relative clauses.",
      "B2|adv": "• Never/Rarely inversion.\n• no sooner…than.",
      "B2|disc": "• cleft, inversion, participle clauses.\n• hence, thus, conversely.",
      "B2|pron": "• to whom / by which (formal).\n• whatever, whoever; preparatory it.",
      "B2|num": "• half of, a third of.\n• in the region of.",
      "C1|verb": "• Aktionsart : states vs achievements.\n• Narrative tenses + historical present.\n• Epistemic modals : must be, can't have.\n• Journalistic : may/might/could + unconfirmed.",
      "C1|disc": "• Cleft systematic : It was X who… / What I need is…\n• Detached : Tired, she… / His work finished…\n• Register mapping : formal → informal.",
      "C1|adv": "• Epistemic : ostensibly, reportedly.\n• Hedges : somewhat, tend to.\n• Boosters : clearly, undoubtedly.",
      "C1|pron": "• cohesion, ellipsis.\n• generic they.",
      "C2|verb": "• Full aspect mastery : will have been working.\n• Archaic recognition : thou art, if he be.",
      "C2|disc": "• Metalanguage : anaphora, coreference, deixis.\n• Sociolinguistic variation : BrE/AmE, registers.",
      "C2|adv": "• Implicature (Grice) : Some passed → not all.\n• Presupposition : stopped smoking → smoked before.",
      "C2|num": "• literary quantifiers.\n• academic/statistical phrasing."
    }
  };

  /** Découpe le précis en blocs • et ⚠️ (avec lignes de suite : Ex., indentation) */
  function parsePrecisBlocks(text) {
    const blocks = [];
    if (!text) return blocks;
    text.split("\n").forEach(function (line) {
      const t = line.trim();
      if (!t) return;
      const isBullet = t.indexOf("•") === 0;
      const isWarning = t.indexOf("⚠️") === 0;
      const isContinuation = blocks.length && (
        /^Ex\.?\s*:/i.test(t) ||
        /^e\.g\.?\s*:/i.test(t) ||
        /^\s/.test(line) ||
        /^(I |I'm |I'|You |He |She |It |We |They |Je |J'|Tu |Il |Elle |On |Nous |Vous |Ils |Elles |Don't |Do not |Please )/.test(t) ||
        (!isBullet && !isWarning && !/^[A-ZÀ-Ü]/.test(t) && t.length < 120)
      );
      if (isBullet || isWarning) {
        blocks.push({ text: t, isWarning: isWarning, examples: [] });
      } else if (isContinuation) {
        blocks[blocks.length - 1].text += "\n" + t;
        if (/^Ex\.?\s*:/i.test(t) || /^e\.g\.?\s*:/i.test(t)) {
          blocks[blocks.length - 1].examples.push(t.replace(/^Ex\.?\s*:\s*/i, "").replace(/^e\.g\.?\s*:\s*/i, ""));
        }
      } else if (t.length > 20 && !t.match(/^[A-ZÀ-Ü][^.!?]{0,80}\.$/)) {
        blocks.push({ text: t, isWarning: false, examples: [] });
      } else if (blocks.length === 0 && t.length > 10) {
        blocks.push({ text: t, isWarning: false, examples: [], isIntro: true });
      }
    });
    blocks.forEach(function (b) {
      if (!b.examples.length) {
        b.text.split("\n").forEach(function (ln) {
          const lt = ln.trim();
          if (/^Ex\.?\s*:/i.test(lt)) b.examples.push(lt.replace(/^Ex\.?\s*:\s*/i, ""));
        });
      }
    });
    return blocks;
  }

  const GENERIC_WORDS = {
    fr: ["article", "articles", "verbe", "verbes", "adjectif", "adjectifs", "pronom", "pronoms", "nom", "noms", "temps", "mode", "forme", "formes", "usage", "niveau"],
    en: ["article", "articles", "verb", "verbs", "adjective", "adjectives", "pronoun", "pronouns", "noun", "nouns", "tense", "tenses", "form", "forms", "usage", "level"]
  };

  function pointTokens(point, lang) {
    const generic = GENERIC_WORDS[lang] || GENERIC_WORDS.fr;
    const tokens = [];
    const paren = point.match(/\(([^)]+)\)/);
    if (paren) {
      paren[1].split(/[,/]+/).forEach(function (t) {
        const w = t.trim().toLowerCase().replace(/^de\s+/, "de ");
        if (w.length > 1) tokens.push({ w: w, weight: 3 });
      });
    }
    point.toLowerCase().replace(/[()]/g, " ").split(/[\s/,'\-&]+/).forEach(function (w) {
      w = w.replace(/[^a-zàâäéèêëïîôùûüç0-9'-]/g, "");
      if (w.length > 2 && generic.indexOf(w) < 0) tokens.push({ w: w, weight: 2 });
    });
    return tokens;
  }

  function scorePointMatch(blockText, point, lang) {
    lang = lang || "fr";
    const bt = blockText.toLowerCase();
    const pl = point.toLowerCase();

    if (pl.indexOf("indéfini") >= 0 && bt.indexOf("indéfini") < 0) return 0;
    if (pl.indexOf("partitif") >= 0 && bt.indexOf("partitif") < 0) return 0;
    if (bt.indexOf("partitif") >= 0 && pl.indexOf("partitif") < 0) return 0;
    if (pl.indexOf("défini") >= 0 && pl.indexOf("indéfini") < 0) {
      if (bt.indexOf("article défini") < 0 && bt.indexOf("défini (") < 0 && bt.indexOf("défini :") < 0) return 0;
    }
    if (pl.indexOf("definite") >= 0 && pl.indexOf("indefinite") < 0 && bt.indexOf("definite") < 0 && bt.indexOf("the") < 0) return 0;
    if (pl.indexOf("indefinite") >= 0 && bt.indexOf("indefinite") < 0 && bt.indexOf(" a ") < 0 && bt.indexOf(" an ") < 0) return 0;

    const tokens = pointTokens(point, lang);
    if (!tokens.length) return 0;
    var score = 0;
    var hits = 0;
    tokens.forEach(function (tok) {
      if (bt.indexOf(tok.w) >= 0) {
        score += tok.weight;
        hits++;
      }
    });
    if (hits === 0) return 0;
    const head = point.split("(")[0].trim().toLowerCase();
    if (head.length > 4 && bt.indexOf(head) >= 0) score += 4;
    return score;
  }

  function cleanRuleLine(text) {
    return text
      .replace(/^⚠️\s*/, "")
      .replace(/^•\s*/, "")
      .split("\n")[0]
      .replace(/\s*Ex\.\s*:.*$/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /** Extrait toutes les règles (•) et avertissements du précis */
  function getRuleBlocks(blocks) {
    return blocks.filter(function (b) {
      return !b.isIntro && b.text.indexOf("•") === 0;
    });
  }

  /** Exemples explicites (Ex. / e.g.) + phrases et listes inline */
  function extractExamplesFromText(text, lang) {
    const examples = [];
    if (!text) return examples;
    const lines = text.split("\n");

    lines.forEach(function (line) {
      const t = line.trim();
      if (!t || t.indexOf("⚠️") === 0) return;
      if (/^Ex\.?\s*:/i.test(t)) {
        pushUnique(examples, t.replace(/^Ex\.?\s*:\s*/i, ""));
        return;
      }
      if (/^e\.g\.?\s*:/i.test(t)) {
        pushUnique(examples, t.replace(/^e\.g\.?\s*:\s*/i, ""));
        return;
      }
      if (isExampleSentence(t, lang)) pushUnique(examples, t);
    });

    lines.forEach(function (line) {
      const t = line.trim();
      if (!t || t.indexOf("•") !== 0) return;
      const body = t.replace(/^•\s*/, "");
      const colon = body.indexOf(":");
      if (colon < 0) return;
      const after = body.slice(colon + 1).trim();
      if (after.length < 4 || after.length > 220) return;
      if (/→/.test(after) || /[,;]/.test(after) || isExampleSentence(after, lang)) {
        pushUnique(examples, after.replace(/^⚠️\s*/, ""));
      }
    });

    return examples;
  }

  function isExampleSentence(text, lang) {
    if (!text || text.length > 180) return false;
    if (/^⚠️/.test(text)) return false;
    if (/^(Piège|Trap)\s*:/i.test(text)) return false;
    const starters = lang === "fr"
      ? /^(Je |J'|Tu |Il |Elle |On |Nous |Vous |Ils |Elles |C'est |Ce |Ne |N'|Qu'|Où |Quand |Est-ce )/
      : /^(I |I'm |I'|You |He |She |It |We |They |There |This |That |These |Those |Do |Does |Did |Don't |Doesn't |Is |Are |Was |Were |Have |Has |Had |Can |Could |Will |Would |Please |Someone |Someone's )/;
    if (starters.test(text)) return true;
    if (/→/.test(text) && text.length < 100) return true;
    if (/^[a-zàâäéèêëïîôùûüç]{2,}\s*→/.test(text)) return true;
    if (/^[A-Za-zÀ-Ü][^.!?]{2,60}[.!?]$/.test(text) && text.split(/\s+/).length >= 2 && text.split(/\s+/).length <= 18) return true;
    return false;
  }

  function pushUnique(arr, item) {
    const v = (item || "").replace(/\s+/g, " ").trim();
    if (v && arr.indexOf(v) < 0) arr.push(v);
  }

  function collectGlobalExamples(blocks, lang) {
    const all = [];
    blocks.forEach(function (b) {
      extractExamplesFromText(b.text, lang).forEach(function (ex) { pushUnique(all, ex); });
    });
    return all;
  }

  function examplesFromPointLabel(point, lang) {
    const examples = [];
    const paren = point.match(/\(([^)]+)\)/);
    if (!paren) return examples;
    const forms = paren[1].split(/[,/]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (lang === "fr") {
      forms.slice(0, 4).forEach(function (f) {
        if (f.length > 1) pushUnique(examples, f.charAt(0).toUpperCase() + f.slice(1) + ".");
      });
    } else {
      forms.slice(0, 4).forEach(function (f) {
        if (/^[aeiou]/i.test(f)) pushUnique(examples, "an " + f);
        else if (f.length > 1) pushUnique(examples, "a " + f);
      });
    }
    return examples;
  }

  function extractRulesFromBlock(b) {
    const rules = [];
    const main = cleanRuleLine(b.text);
    if (main) pushUnique(rules, main);
    b.text.split("\n").forEach(function (line) {
      const t = line.trim();
      if (!t || t.indexOf("•") !== 0 || t === b.text.trim()) return;
      const rule = cleanRuleLine(t);
      if (rule) pushUnique(rules, rule);
    });
    return rules;
  }

  function fallbackBlockForPoint(blocks, pointIndex) {
    const bullets = getRuleBlocks(blocks).filter(function (b) { return !b.isWarning; });
    if (!bullets.length) return null;
    return bullets[pointIndex % bullets.length];
  }

  function primaryBlockForPoint(blocks, pointIndex) {
    const bullets = getRuleBlocks(blocks).filter(function (b) { return !b.isWarning; });
    if (!bullets.length) return null;
    return bullets[Math.min(pointIndex, bullets.length - 1)];
  }

  function mergeRelatedBlocks(blocks, point, lang, pointIndex) {
    var related = pickRelatedBlocks(blocks, point, lang);
    const primary = primaryBlockForPoint(blocks, pointIndex);
    if (primary && !related.some(function (b) { return b.text === primary.text; })) {
      related.unshift(primary);
    }
    if (!related.length && primary) related = [primary];
    if (!related.length) {
      const fb = fallbackBlockForPoint(blocks, pointIndex);
      if (fb && !fb.isIntro) related = [fb];
    }
    return related;
  }

  function pickRelatedBlocks(blocks, point, lang) {
    var related = blocks.filter(function (b) {
      return !b.isIntro && !b.isWarning && scorePointMatch(b.text, point, lang) > 0;
    });
    related.sort(function (a, b) { return scorePointMatch(b.text, point, lang) - scorePointMatch(a.text, point, lang); });

    if (related.length > 1) {
      var topScore = scorePointMatch(related[0].text, point, lang);
      related = related.filter(function (b) {
        return scorePointMatch(b.text, point, lang) >= Math.max(3, topScore * 0.7);
      });
    }

    if (!related.length) {
      related = blocks.filter(function (b) {
        return !b.isIntro && b.isWarning && scorePointMatch(b.text, point, lang) >= 4;
      });
      related.sort(function (a, b) { return scorePointMatch(b.text, point, lang) - scorePointMatch(a.text, point, lang); });
    }

    if (!related.length) {
      var best = null;
      var bestScore = 0;
      blocks.forEach(function (b) {
        if (b.isIntro) return;
        var s = scorePointMatch(b.text, point, lang);
        if (s > bestScore) { bestScore = s; best = b; }
      });
      if (best && bestScore >= 3) related = [best];
    }
    return related;
  }

  function makeBrief(lang, level, point, blocks, intro, pointIndex) {
    const isFr = lang === "fr";
    const related = mergeRelatedBlocks(blocks, point, lang, pointIndex);
    if (related.length) {
      const line = cleanRuleLine(related[0].text);
      if (line.length > 12) return line;
    }
    if (intro) {
      return intro.split("\n")[0].trim();
    }
    return isFr
      ? "Au niveau " + level + ", ce point concerne : " + point + ". Lisez les règles et exemples ci-dessous."
      : "At " + level + ", this topic covers: " + point + ". Read the rules and examples below.";
  }

  function formatPointDetail(lang, level, point, basePrecis, supplement, catId, pointIndex, pointsCount) {
    if (global.GrammarDeepContent) {
      const deep = global.GrammarDeepContent.resolveDeepContent(lang, level, catId, pointIndex, point);
      if (deep) {
        return global.GrammarDeepContent.formatDeepDetail(deep, lang);
      }
    }

    const isFr = lang === "fr";
    const L = function (fr, en) { return isFr ? fr : en; };
    const fullText = (basePrecis || "") + "\n" + (supplement || "");
    const blocks = parsePrecisBlocks(fullText);
    const introBlock = blocks.find(function (b) { return b.isIntro; });
    const intro = introBlock ? introBlock.text : (basePrecis || "").split("\n").filter(function (l) { return l.trim() && l.indexOf("•") !== 0; })[0] || "";
    const globalExamples = collectGlobalExamples(blocks, lang);

    var related = mergeRelatedBlocks(blocks, point, lang, pointIndex);

    var parts = [];
    parts.push(L("📌 EN BREF", "📌 IN SHORT"));
    parts.push(makeBrief(lang, level, point, blocks, intro, pointIndex));

    parts.push("");
    parts.push(L("📖 À RETENIR", "📖 KEY RULES"));
    var ruleLines = [];
    related.forEach(function (b) {
      if (b.isIntro) return;
      extractRulesFromBlock(b).forEach(function (r) { pushUnique(ruleLines, r); });
    });
    if (!ruleLines.length) {
      const primary = primaryBlockForPoint(blocks, pointIndex);
      if (primary) {
        extractRulesFromBlock(primary).forEach(function (r) { pushUnique(ruleLines, r); });
      }
    }
    if (!ruleLines.length && intro) {
      pushUnique(ruleLines, intro.split("\n")[0].trim());
    }
    if (intro && ruleLines.length > 1) {
      const introLine = intro.split("\n")[0].trim();
      ruleLines = ruleLines.filter(function (r) { return r !== introLine; });
    }
    if (!ruleLines.length) {
      ruleLines.push(L(
        "Point du programme " + level + " : " + point + ".",
        level + " syllabus topic: " + point + "."
      ));
    }
    ruleLines.slice(0, 6).forEach(function (r) { parts.push("• " + r); });

    var allExamples = [];
    related.forEach(function (b) {
      if (b.isIntro) return;
      extractExamplesFromText(b.text, lang).forEach(function (ex) { pushUnique(allExamples, ex); });
    });
    if (allExamples.length < 2) {
      const primary = primaryBlockForPoint(blocks, pointIndex);
      if (primary) {
        extractExamplesFromText(primary.text, lang).forEach(function (ex) { pushUnique(allExamples, ex); });
      }
    }
    if (!allExamples.length) {
      examplesFromPointLabel(point, lang).forEach(function (ex) { pushUnique(allExamples, ex); });
    }
    if (allExamples.length < 2 && globalExamples.length > 1) {
      const perPoint = Math.max(2, Math.ceil(globalExamples.length / Math.max(pointsCount, 1)));
      const start = (pointIndex * perPoint) % globalExamples.length;
      for (var ei = 0; ei < perPoint && allExamples.length < 4; ei++) {
        pushUnique(allExamples, globalExamples[(start + ei) % globalExamples.length]);
      }
    }

    parts.push("");
    parts.push(L("📝 EXEMPLES", "📝 EXAMPLES"));
    if (allExamples.length) {
      allExamples.slice(0, 5).forEach(function (ex) { parts.push("Ex. : " + ex); });
    } else {
      parts.push(L(
        "Ex. : consultez les exercices de cette leçon pour des phrases d'application.",
        "Ex. : use the lesson exercises for practice sentences."
      ));
    }

    const pl = point.toLowerCase();
    var warnings = related.filter(function (b) { return b.isWarning; });
    if (!warnings.length) {
      warnings = blocks.filter(function (b) {
        return b.isWarning && scorePointMatch(b.text, point, lang) >= 3;
      });
    }
    if (!warnings.length && (pl.indexOf("indéfini") >= 0 || pl.indexOf("partitif") >= 0)) {
      warnings = blocks.filter(function (b) {
        return b.isWarning && b.text.toLowerCase().indexOf("négation") >= 0;
      });
    }
    if (!warnings.length) {
      warnings = blocks.filter(function (b) {
        return b.isWarning && scorePointMatch(b.text, point, lang) >= 3;
      }).slice(0, 2);
    }
    if (warnings.length) {
      parts.push("");
      parts.push(L("⚠️ ATTENTION", "⚠️ WATCH OUT"));
      warnings.forEach(function (b) {
        parts.push(simplifyBlock(b.text, isFr));
      });
    }

    return parts.join("\n");
  }

  /** Allège le texte brut pour le rendre plus direct */
  function simplifyBlock(text, isFr) {
    return text
      .replace(/^⚠️\s*/, isFr ? "Piège : " : "Trap: ")
      .replace(/^•\s*/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildSections(lang, level, catId) {
    return [];
  }

  function enrichGrammarData(lang) {
    const data = global.GRAMMAR_DATA;
    if (!data) return;
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const cats = ["nom", "verb", "adj", "pron", "adv", "disc", "num"];

    levels.forEach(function (level) {
      if (!data[level]) return;
      cats.forEach(function (catId) {
        const entry = data[level][catId];
        if (!entry) return;

        const supplement = (PRECIS_SUPPLEMENTS[lang] || {})[level + "|" + catId] || "";

        entry.sections = buildSections(lang, level, catId);
        entry.pointsDetail = (entry.points || []).map(function (p, i) {
          return {
            id: "pt-" + i,
            label: p,
            detail: formatPointDetail(
              lang, level, p, entry.précis || "", supplement, catId, i, (entry.points || []).length
            )
          };
        });
        entry.cefrNote = (CEFR_NOTES[lang] || CEFR_NOTES.fr)[level] || "";
        entry.level = level;
        entry.category = catId;
      });
    });
  }

  global.enrichGrammarData = enrichGrammarData;
})(typeof window !== "undefined" ? window : global);
