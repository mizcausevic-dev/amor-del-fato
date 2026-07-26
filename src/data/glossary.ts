// glossary.ts
// Stoic vocabulary glossary for "Amor del Fato" (Stoicism + modern self-help
// daily-practice app).
//
// Non-fabrication note: Greek and Latin forms below are given in their standard
// scholarly spellings. Where an exact Greek-script form was not held with high
// confidence, the transliteration is given alone rather than an invented
// Greek-script word. Definitions are original phrasing based on how Stoic
// scholars (e.g. A.A. Long, Brad Inwood, Pierre Hadot, John Sellars) present
// these concepts. Ideas are attributed to their sources where a specific
// attribution is warranted; no ancient quotation is placed in a Stoic's mouth
// unless it is genuinely theirs. The concept is described rather than quoted.

export interface GlossaryTerm {
  id: string;          // kebab-case unique, e.g. 'amor-fati'
  term: string;        // display term, e.g. 'Amor Fati'
  origin: string;      // language + original form + transliteration
  short: string;       // a single crisp gloss, 6 to 14 words, usable as a quiz answer
  definition: string;  // 2 to 4 sentences, accurate, original phrasing
  related?: string[];  // ids of related terms (must reference real ids in this file)
}

export interface FaqItem {
  q: string; // real question
  a: string; // concise accurate answer, 1-3 sentences
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'amor-fati',
    term: 'Amor Fati',
    origin: 'Latin: amor fati',
    short: 'Love of one’s fate, embracing whatever happens as needed',
    definition:
      'A love and active acceptance of everything that happens, including hardship and loss, rather than merely tolerating it. The phrase itself was made famous by Nietzsche, but it distills a genuinely Stoic stance: since we do not control external events, our task is to meet each one well and even welcome it as part of a rational whole. In practice it means treating what happens not as an obstacle to your life but as the material of it.',
    related: ['dichotomy-of-control', 'logos', 'the-view-from-above', 'premeditatio-malorum'],
  },
  {
    id: 'dichotomy-of-control',
    term: 'Dichotomy of Control',
    origin: 'Greek: ἐφ’ ἡμῖν (eph’ hemin, "up to us")',
    short: 'Some things are up to us, some are not',
    definition:
      'Epictetus opens the Enchiridion by dividing everything into what is up to us and what is not. Up to us are our judgments, desires, and choices; not up to us are our bodies, reputation, wealth, and external outcomes. Peace of mind comes from investing effort where you have real power and releasing your grip on the rest.',
    related: ['prohairesis', 'stoic-fork', 'preferred-indifferents', 'amor-fati'],
  },
  {
    id: 'premeditatio-malorum',
    term: 'Premeditatio Malorum',
    origin: 'Latin: praemeditatio malorum (premeditation of evils)',
    short: 'Rehearsing possible hardships in advance to prepare calmly',
    definition:
      'A practice of deliberately imagining setbacks, losses, and difficulties before they happen, so their arrival finds you prepared rather than shocked. Seneca recommends this rehearsal to strip future troubles of their power to ambush you. It is often called negative visualization today, and it also deepens gratitude for what you currently have.',
    related: ['memento-mori', 'askesis', 'prosoche', 'amor-fati'],
  },
  {
    id: 'memento-mori',
    term: 'Memento Mori',
    origin: 'Latin: memento mori (remember that you must die)',
    short: 'Remember you will die, so live well now',
    definition:
      'A reminder of your own mortality, used not to depress but to clarify. Keeping death in view strips away trivial worries and pushes you to act well while you can. Marcus Aurelius returns to this idea often, urging himself to do what matters now because the time is limited.',
    related: ['premeditatio-malorum', 'telos', 'the-view-from-above', 'prosoche'],
  },
  {
    id: 'eudaimonia',
    term: 'Eudaimonia',
    origin: 'Greek: εὐδαιμονία (eudaimonia)',
    short: 'Flourishing, a life that goes well through virtue',
    definition:
      'The goal of life in ancient ethics, often translated as flourishing or a life well lived rather than fleeting happiness. For the Stoics, eudaimonia is achieved by living in agreement with nature and reason, which means living virtuously. It is a condition of the whole life, not a passing mood.',
    related: ['arete', 'telos', 'virtue-is-the-only-good', 'cardinal-virtues'],
  },
  {
    id: 'arete',
    term: 'Arete',
    origin: 'Greek: ἀρετή (arete)',
    short: 'Virtue or excellence, doing your role supremely well',
    definition:
      'Excellence or virtue, the quality of performing your function well. For the Stoics the excellence proper to a human being is excellence of character and reason, expressed through the cardinal virtues. Arete is the one thing genuinely good and the sole reliable source of a flourishing life.',
    related: ['cardinal-virtues', 'virtue-is-the-only-good', 'eudaimonia', 'sophos'],
  },
  {
    id: 'cardinal-virtues',
    term: 'The Four Cardinal Virtues',
    origin: 'Greek: φρόνησις, δικαιοσύνη, ἀνδρεία, σωφροσύνη (phronesis, dikaiosyne, andreia, sophrosyne)',
    short: 'Wisdom, justice, courage, and temperance',
    definition:
      'The Stoics, following earlier Greek thought, hold that virtue has four main forms: practical wisdom (phronesis), justice (dikaiosyne), courage (andreia), and temperance or self-discipline (sophrosyne). Wisdom is knowing what is truly good, bad, or indifferent; justice is treating others fairly; courage is standing firm in what is right; temperance is keeping desires in proportion. The Stoics treat them as deeply unified, so that having one fully means having them all.',
    related: ['arete', 'virtue-is-the-only-good', 'eudaimonia', 'sophos'],
  },
  {
    id: 'apatheia',
    term: 'Apatheia',
    origin: 'Greek: ἀπάθεια (apatheia)',
    short: 'Freedom from destructive passions, not cold indifference',
    definition:
      'Freedom from the destructive passions such as fear, craving, and uncontrolled anger. It is not apathy or numbness; the sage still feels rational, healthy emotions. Apatheia means no longer being ruled by irrational impulses that distort judgment, leaving the mind steady and clear.',
    related: ['pathos', 'eupatheia', 'ataraxia', 'sophos'],
  },
  {
    id: 'ataraxia',
    term: 'Ataraxia',
    origin: 'Greek: ἀταραξία (ataraxia)',
    short: 'Tranquility, an untroubled and steady state of mind',
    definition:
      'A calm, untroubled state of mind, free from anxiety and inner turbulence. For the Stoics it is a natural byproduct of living virtuously and correctly judging what is and is not in our control. The term is shared with other ancient schools, but Stoics locate this peace in right reason rather than in withdrawal from the world.',
    related: ['apatheia', 'eupatheia', 'eudaimonia', 'dichotomy-of-control'],
  },
  {
    id: 'prohairesis',
    term: 'Prohairesis',
    origin: 'Greek: προαίρεσις (prohairesis)',
    short: 'The faculty of choice, our capacity to judge and will',
    definition:
      'The faculty of choice or moral will, central to Epictetus. It is the part of us that assents to impressions, forms intentions, and decides how to respond. Because it alone is fully up to us, Epictetus treats it as the true self and the seat of freedom, untouchable by anything external.',
    related: ['dichotomy-of-control', 'hegemonikon', 'katalepsis', 'three-disciplines'],
  },
  {
    id: 'hegemonikon',
    term: 'Hegemonikon',
    origin: 'Greek: ἡγεμονικόν (hegemonikon, "ruling faculty")',
    short: 'The mind’s ruling, command center of reason and judgment',
    definition:
      'The commanding or ruling part of the soul, the seat of reason where impressions are received, judged, and acted upon. In Stoic psychology it governs perception, assent, impulse, and choice. Guarding the health of the hegemonikon, keeping its judgments true, is the core of Stoic self-work.',
    related: ['prohairesis', 'logos', 'phantasia', 'prosoche'],
  },
  {
    id: 'logos',
    term: 'Logos',
    origin: 'Greek: λόγος (logos)',
    short: 'Reason, the rational order running through the cosmos',
    definition:
      'Reason, both the rational faculty in us and the rational structure ordering the whole universe. The Stoics saw the cosmos as governed by logos, an intelligent principle sometimes identified with god or nature. Living well means bringing our own reason into agreement with this larger rational order.',
    related: ['pneuma', 'sympatheia', 'telos', 'cosmopolitanism'],
  },
  {
    id: 'pneuma',
    term: 'Pneuma',
    origin: 'Greek: πνεῦμα (pneuma, "breath")',
    short: 'The active breath-like force pervading and binding nature',
    definition:
      'A fine, breath-like substance the Stoics believed pervades all things and holds them together, blending fire and air. It is the active, tension-bearing force that gives objects their cohesion and living beings their soul. Through pneuma the whole cosmos is unified and interconnected.',
    related: ['logos', 'sympatheia', 'hegemonikon'],
  },
  {
    id: 'oikeiosis',
    term: 'Oikeiosis',
    origin: 'Greek: οἰκείωσις (oikeiosis)',
    short: 'Appropriation, the natural bond expanding from self to all',
    definition:
      'The process by which a creature recognizes what belongs to it and is drawn to care for it, starting with self-preservation. In humans this circle of concern naturally widens from ourselves to family, community, and eventually all rational beings. Oikeiosis grounds the Stoic account of both self-care and justice toward others.',
    related: ['sympatheia', 'cosmopolitanism', 'cardinal-virtues', 'kathekon'],
  },
  {
    id: 'sympatheia',
    term: 'Sympatheia',
    origin: 'Greek: συμπάθεια (sympatheia)',
    short: 'The mutual interconnection of all parts of the cosmos',
    definition:
      'The idea that all parts of the universe are interconnected and mutually affecting, forming one living, coordinated whole. Because everything shares in pneuma and logos, what happens in one part relates to the rest. This vision supports the Stoic call to see yourself as a member of a larger, unified nature.',
    related: ['pneuma', 'logos', 'oikeiosis', 'the-view-from-above'],
  },
  {
    id: 'kathekon',
    term: 'Kathekon',
    origin: 'Greek: καθῆκον (kathekon)',
    short: 'An appropriate action, the fitting thing to do',
    definition:
      'An appropriate or befitting action, the reasonable thing to do given your circumstances and roles. Kathekonta include caring for your health, family, and duties; they can be justified by a reasonable account even when outcomes are uncertain. Done from a virtuous disposition, an appropriate act becomes a fully right action.',
    related: ['cardinal-virtues', 'oikeiosis', 'preferred-indifferents', 'three-disciplines'],
  },
  {
    id: 'katalepsis',
    term: 'Katalepsis',
    origin: 'Greek: κατάληψις (katalepsis)',
    short: 'A secure grasp of a true and reliable impression',
    definition:
      'A firm cognitive grasp, the secure apprehension of a true impression that could not have come from something false. The Stoics made this cataleptic impression their standard of reliable knowledge, the criterion of truth. Building knowledge means assenting only to impressions that meet this rigorous test.',
    related: ['phantasia', 'hegemonikon', 'three-disciplines', 'prohairesis'],
  },
  {
    id: 'phantasia',
    term: 'Phantasia',
    origin: 'Greek: φαντασία (phantasia)',
    short: 'An impression, how something appears to the mind',
    definition:
      'An impression or appearance, the way something presents itself to the mind through the senses or thought. Impressions arrive unbidden, but we retain the power to examine them and decide whether to assent. Much Stoic practice is learning to pause on an impression rather than being swept along by it.',
    related: ['katalepsis', 'hegemonikon', 'prohairesis', 'prosoche'],
  },
  {
    id: 'prosoche',
    term: 'Prosoche',
    origin: 'Greek: προσοχή (prosoche)',
    short: 'Continuous attention to one’s judgments and actions',
    definition:
      'Sustained attention, the alert watchfulness a practicing Stoic keeps over their own judgments, impulses, and actions. It is the mindfulness that catches a faulty impression before it hardens into an emotion or a mistake. Prosoche is what turns Stoic theory into a lived, moment-to-moment discipline.',
    related: ['phantasia', 'three-disciplines', 'askesis', 'hegemonikon'],
  },
  {
    id: 'sophos',
    term: 'Sophos (The Sage)',
    origin: 'Greek: σοφός (sophos, "the wise person")',
    short: 'The ideal wise person who lives in perfect virtue',
    definition:
      'The Stoic ideal of the perfectly wise and virtuous person, someone whose judgments are always sound and whose life fully accords with reason. The sage is a model to aim at rather than a common reality; the Stoics admitted such a person is exceedingly rare. Holding up the sage clarifies the direction of practice for the rest of us who are still progressing.',
    related: ['arete', 'apatheia', 'eupatheia', 'cardinal-virtues'],
  },
  {
    id: 'pathos',
    term: 'Pathos',
    origin: 'Greek: πάθος (pathos, plural pathe)',
    short: 'A passion, a disturbing emotion from mistaken judgment',
    definition:
      'A passion, meaning a disturbing or excessive emotion that springs from a mistaken value judgment, such as fear, craving, distress, or unhealthy pleasure. The Stoics traced these to assenting to false beliefs about what is good or bad. Because a passion rests on an error, correcting the judgment can dissolve it.',
    related: ['eupatheia', 'apatheia', 'phantasia', 'preferred-indifferents'],
  },
  {
    id: 'eupatheia',
    term: 'Eupatheia',
    origin: 'Greek: εὐπάθεια (eupatheia, plural eupatheiai)',
    short: 'A good, rational feeling that the wise person has',
    definition:
      'A good or healthy feeling, the rational counterpart to a destructive passion. The Stoics recognized three main kinds: rational joy, rational caution, and rational wishing or goodwill. These show that the Stoic ideal is not a life without emotion but a life whose feelings rest on true judgments.',
    related: ['pathos', 'apatheia', 'sophos', 'arete'],
  },
  {
    id: 'three-disciplines',
    term: 'The Three Disciplines',
    origin: 'Greek: ὄρεξις, ὁρμή, συγκατάθεσις (orexis, horme, synkatathesis)',
    short: 'Discipline of desire, of action, and of assent',
    definition:
      'A three-part scheme of practice drawn from Epictetus and given its influential modern form by Pierre Hadot. The discipline of desire trains what we want and avoid, aligning them with what is truly good; the discipline of action governs how we act toward others and our duties; the discipline of assent governs which impressions we accept as true. Together they map onto living wisely, justly, and clearly.',
    related: ['prohairesis', 'phantasia', 'kathekon', 'prosoche'],
  },
  {
    id: 'stoic-fork',
    term: 'The Stoic Fork',
    origin: 'English term for Epictetus’s dichotomy of control',
    short: 'A tool sorting each situation into controllable or not',
    definition:
      'A modern name for the practical use of Epictetus’s dichotomy of control, imagined as a fork with two prongs. Faced with any situation you ask whether it is up to you or not, then direct your effort accordingly. It turns the dichotomy from an idea into a quick decision procedure you can run many times a day.',
    related: ['dichotomy-of-control', 'prohairesis', 'preferred-indifferents', 'three-disciplines'],
  },
  {
    id: 'virtue-is-the-only-good',
    term: 'Virtue Is the Only Good',
    origin: 'Latin: summum bonum (the highest good)',
    short: 'Only virtue is truly good; only vice is truly bad',
    definition:
      'The core Stoic ethical claim that virtue alone is genuinely good and vice alone genuinely bad, while everything else is, strictly speaking, neither. Health, wealth, and reputation may be worth pursuing, but they cannot make a life good the way character can. This is why the Stoics say a virtuous person can flourish even in adverse circumstances.',
    related: ['arete', 'cardinal-virtues', 'preferred-indifferents', 'eudaimonia'],
  },
  {
    id: 'preferred-indifferents',
    term: 'Preferred Indifferents',
    origin: 'Greek: ἀδιάφορα / προηγμένα (adiaphora / proegmena)',
    short: 'Things worth having but not good in the strict sense',
    definition:
      'Things that are indifferent to virtue yet still have natural value, such as health, wealth, and a good reputation. The Stoics call them preferred because a reasonable person selects them when possible, while insisting they are not goods in the strict sense; only virtue is good. Their opposites, like illness or poverty, are dispreferred but not evils. This distinction lets a Stoic pursue ordinary aims without staking happiness on outcomes beyond their control.',
    related: ['virtue-is-the-only-good', 'dichotomy-of-control', 'kathekon', 'pathos'],
  },
  {
    id: 'cosmopolitanism',
    term: 'Cosmopolitanism',
    origin: 'Greek: κοσμοπολίτης (kosmopolites, "citizen of the world")',
    short: 'Seeing oneself as a citizen of the whole world',
    definition:
      'The view that every rational person belongs first to a single community of humankind, not only to a local city or nation. Because we all share in reason and logos, the Stoics argued we owe consideration and justice to all people. Marcus Aurelius reflects this when he regards himself as a citizen of the wider world.',
    related: ['oikeiosis', 'logos', 'sympatheia', 'cardinal-virtues'],
  },
  {
    id: 'the-view-from-above',
    term: 'The View From Above',
    origin: 'English term (Hadot) for a Stoic contemplative exercise',
    short: 'Picturing your life from a vast cosmic distance',
    definition:
      'A contemplative exercise of imagining yourself looking down on the earth and your own affairs from a great height, seeing how small and fleeting they are. Pierre Hadot named and highlighted this practice, drawing on passages in Marcus Aurelius. The distance shrinks petty worries and restores a sense of proportion and shared humanity.',
    related: ['sympatheia', 'memento-mori', 'cosmopolitanism', 'amor-fati'],
  },
  {
    id: 'telos',
    term: 'Telos',
    origin: 'Greek: τέλος (telos)',
    short: 'The end or goal of life that everything aims at',
    definition:
      'The end or ultimate goal toward which a life is directed. For the Stoics the telos is to live in agreement with nature and reason, which is the same as living virtuously and so achieving eudaimonia. Naming the telos clearly is what orients all the smaller choices of daily practice.',
    related: ['eudaimonia', 'arete', 'logos', 'virtue-is-the-only-good'],
  },
  {
    id: 'askesis',
    term: 'Askesis',
    origin: 'Greek: ἄσκησις (askesis)',
    short: 'Training, the practical exercises that build virtue',
    definition:
      'Training or disciplined practice, the exercises through which philosophy becomes a way of life rather than mere theory. Stoic askesis includes reflection, journaling, negative visualization, and the daily review of one’s conduct. The word is the root of our modern ascetic, but here it means steady practice aimed at strengthening character.',
    related: ['prosoche', 'premeditatio-malorum', 'three-disciplines', 'arete'],
  },
];

export const faq: FaqItem[] = [
  {
    q: 'What is Stoicism?',
    a: 'Stoicism is an ancient Greek and Roman philosophy of life founded by Zeno of Citium around 300 BCE. It teaches that a good life comes from cultivating virtue and living in agreement with reason and nature, while calmly accepting the things we cannot control.',
  },
  {
    q: 'What is the dichotomy of control?',
    a: 'It is Epictetus’s teaching that some things are up to us and some are not. Our judgments, choices, and efforts are within our power, while outcomes, other people, and external events are not, so we focus our energy on the former and release our grip on the rest.',
  },
  {
    q: 'Does Stoicism mean suppressing emotions?',
    a: 'No. Stoicism aims at freedom from destructive passions that rest on false judgments, not at numbness. Stoics recognize healthy, rational feelings such as joy and goodwill, so the goal is well-founded emotion rather than no emotion at all.',
  },
  {
    q: 'What does amor fati mean?',
    a: 'Amor fati is Latin for love of fate. It means embracing everything that happens, including difficulty, as part of a rational whole, and meeting each event well instead of merely enduring it.',
  },
  {
    q: 'Is Stoicism a religion?',
    a: 'No, Stoicism is a philosophy, not a religion, and it has no worship, clergy, or scripture. The ancient Stoics did hold views about a rational, divine order in nature, but you can practice Stoic ethics whether or not you share those metaphysical beliefs.',
  },
  {
    q: 'How do Stoics practice daily?',
    a: 'Common practices include a morning preview of the day, evening reflection on how you acted, negative visualization of possible setbacks, and paying steady attention to your judgments as impressions arise. The aim is to turn Stoic principles into habits rather than leaving them as abstract ideas.',
  },
  {
    q: 'What is the difference between Stoicism and stoicism?',
    a: 'Capital-S Stoicism is the philosophy with its full framework of ethics, logic, and physics. Lowercase stoicism just means suppressing feelings and enduring pain without complaint, which is a narrow stereotype that misses most of what the philosophy actually teaches.',
  },
  {
    q: 'What is memento mori?',
    a: 'Memento mori is Latin for remember that you must die. It is a reflective reminder of your mortality used to sharpen your priorities and encourage you to live well now, not a morbid preoccupation with death.',
  },
];
