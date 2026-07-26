// readings.ts
// Curated public-domain Stoic source-text excerpts for the Readings feature.
//
// PROVENANCE (why you can trust these strings)
// Every `text` below is reproduced verbatim from a public-domain translation and
// was cross-checked against a primary digitization before inclusion:
//   - Meditations   - Marcus Aurelius, tr. George Long (1862). Verified against
//                     classics.mit.edu (Books 1-6) and lexundria.com per-section (Books 7-12).
//   - Enchiridion   - Epictetus, tr. Elizabeth Carter (1758). Verified against the
//                     genuine 1758 Carter text (livingstoicism.com). NOTE: this is the
//                     original "in our power" Carter, not the later modernized
//                     "in our control" revision that circulates on some sites.
//   - Letters       - Seneca, "Moral Letters to Lucilius", tr. Richard Mott Gummere
//                     (Loeb, 1917-25). Verified against en.wikisource.org per-letter pages.
//   - Discourses    - Epictetus, tr. George Long (1877). Verified against
//                     en.wikisource.org per-chapter pages.
//
// Excerpts are kept short (mostly 1-4 sentences). Original source punctuation and
// archaic spelling are preserved intentionally; do not "correct" them.

export type ReadingSource = 'meditations' | 'enchiridion' | 'letters' | 'discourses'

export interface Reading {
  id: string // kebab-case unique, e.g. 'meditations-2-1'
  source: ReadingSource
  sourceLabel: string // human label, e.g. 'Meditations'
  ref: string // precise citation, e.g. 'Book 2.1' / 'Chapter 5' / 'Letter 1'
  author: string // 'Marcus Aurelius' | 'Epictetus' | 'Seneca'
  translator: string // public-domain translator
  text: string // verbatim public-domain translation
  theme: string // one short lowercase tag
}

export const readings: Reading[] = [
  // ----------------------------------------------------------------------------
  // MEDITATIONS - Marcus Aurelius, tr. George Long
  // ----------------------------------------------------------------------------
  {
    id: 'meditations-2-1',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 2.1',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `Begin the morning by saying to thyself, I shall meet with the busy-body, the ungrateful, arrogant, deceitful, envious, unsocial. All these things happen to them by reason of their ignorance of what is good and evil.`,
    theme: 'adversity',
  },
  {
    id: 'meditations-4-3',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 4.3',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `Men seek retreats for themselves, houses in the country, sea-shores, and mountains; and thou too art wont to desire such things very much. But this is altogether a mark of the most common sort of men, for it is in thy power whenever thou shalt choose to retire into thyself.`,
    theme: 'tranquility',
  },
  {
    id: 'meditations-5-1',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 5.1',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `In the morning when thou risest unwillingly, let this thought be present—I am rising to the work of a human being. Why then am I dissatisfied if I am going to do the things for which I exist and for which I was brought into the world?`,
    theme: 'discipline',
  },
  {
    id: 'meditations-4-17',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 4.17',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `Do not act as if thou wert going to live ten thousand years. Death hangs over thee. While thou livest, while it is in thy power, be good.`,
    theme: 'mortality',
  },
  {
    id: 'meditations-4-7',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 4.7',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `Take away thy opinion, and then there is taken away the complaint, 'I have been harmed.' Take away the complaint, 'I have been harmed,' and the harm is taken away.`,
    theme: 'control',
  },
  {
    id: 'meditations-5-16',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 5.16',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts.`,
    theme: 'discipline',
  },
  {
    id: 'meditations-6-6',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 6.6',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `The best way of avenging thyself is not to become like the wrong doer.`,
    theme: 'anger',
  },
  {
    id: 'meditations-2-11',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 2.11',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `Since it is possible that thou mayest depart from life this very moment, regulate every act and thought accordingly.`,
    theme: 'mortality',
  },
  {
    id: 'meditations-7-9',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 7.9',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `All things are implicated with one another, and the bond is holy; and there is hardly anything unconnected with any other thing.`,
    theme: 'nature',
  },
  {
    id: 'meditations-8-47',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 8.47',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `If thou art pained by any external thing, it is not this thing that disturbs thee, but thy own judgment about it. And it is in thy power to wipe out this judgment now.`,
    theme: 'control',
  },
  {
    id: 'meditations-10-16',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 10.16',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `No longer talk about the kind of man that a good man ought to be, but be such.`,
    theme: 'action',
  },
  {
    id: 'meditations-12-17',
    source: 'meditations',
    sourceLabel: 'Meditations',
    ref: 'Book 12.17',
    author: 'Marcus Aurelius',
    translator: 'George Long',
    text: `If it is not right, do not do it: if it is not true, do not say it.`,
    theme: 'discipline',
  },

  // ----------------------------------------------------------------------------
  // ENCHIRIDION - Epictetus, tr. Elizabeth Carter (1758)
  // ----------------------------------------------------------------------------
  {
    id: 'enchiridion-1',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 1',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Of things, some are in our power and others not. In our power are opinion, pursuit, desire, aversion, and, in one word, whatever are our own actions. Not in our power are body, property, reputation, command, and, in one word, whatever are not our own actions.`,
    theme: 'control',
  },
  {
    id: 'enchiridion-5',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 5',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Men are disturbed, not by things, but by the principles and notions which they form concerning things. Death, for instance, is not terrible, else it would have appeared so to Socrates. But the terror consists in our notion of death, that it is terrible.`,
    theme: 'adversity',
  },
  {
    id: 'enchiridion-8',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 8',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Require not things to happen as you wish, but wish them to happen as they do happen, and you will go on well.`,
    theme: 'acceptance',
  },
  {
    id: 'enchiridion-11',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 11',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Never say of anything, I have lost it; but, I have restored it. Is your child dead? It is restored. Is your wife dead? She is restored.`,
    theme: 'loss',
  },
  {
    id: 'enchiridion-15',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 15',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Remember, that you must behave in life as at an entertainment. Is anything brought round to you? Put out your hand and take your share with moderation.`,
    theme: 'moderation',
  },
  {
    id: 'enchiridion-20',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 20',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Remember, that not he who gives ill language or a blow affronts, but the principle which represents these things as affronting.`,
    theme: 'anger',
  },
  {
    id: 'enchiridion-33',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 33',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Immediately prescribe some character and form of conduct to yourself, which you may keep both alone and in company.`,
    theme: 'discipline',
  },
  {
    id: 'enchiridion-43',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 43',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `Everything has two handles, the one by which it may be borne, the other by which it cannot.`,
    theme: 'perspective',
  },
  {
    id: 'enchiridion-48',
    source: 'enchiridion',
    sourceLabel: 'Enchiridion',
    ref: 'Chapter 48',
    author: 'Epictetus',
    translator: 'Elizabeth Carter',
    text: `The condition and characteristic of a vulgar person, is, that he never expects either benefit or hurt from himself, but from externals. The condition and characteristic of a philosopher is, that he expects all hurt and benefit from himself.`,
    theme: 'responsibility',
  },

  // ----------------------------------------------------------------------------
  // LETTERS TO LUCILIUS - Seneca, tr. Richard Mott Gummere
  // ----------------------------------------------------------------------------
  {
    id: 'letters-1',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 1',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `Nothing, Lucilius, is ours, except time. We were entrusted by nature with the ownership of this single thing, so fleeting and slippery that anyone who will can oust us from possession.`,
    theme: 'time',
  },
  {
    id: 'letters-2-focus',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 2',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `Everywhere means nowhere. When a person spends all his time in foreign travel, he ends by having many acquaintances, but no friends.`,
    theme: 'focus',
  },
  {
    id: 'letters-2-wealth',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 2',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `It is not the man who has too little, but the man who craves more, that is poor.`,
    theme: 'desire',
  },
  {
    id: 'letters-3',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 3',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `When friendship is settled, you must trust; before friendship is formed, you must pass judgment.`,
    theme: 'friendship',
  },
  {
    id: 'letters-9',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 9',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `I can show you a philtre, compounded without drugs, herbs, or any witch's incantation: "If you would be loved, love."`,
    theme: 'love',
  },
  {
    id: 'letters-13',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 13',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality.`,
    theme: 'fear',
  },
  {
    id: 'letters-47',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 47',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `Kindly remember that he whom you call your slave sprang from the same stock, is smiled upon by the same skies, and on equal terms with yourself breathes, lives, and dies.`,
    theme: 'humanity',
  },
  {
    id: 'letters-78',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 78',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `Pain is slight if opinion has added nothing to it; but if, on the other hand, you begin to encourage yourself and say, 'It is nothing,—a trifling matter at most; keep a stout heart and it will soon cease'; then in thinking it slight, you will make it slight.`,
    theme: 'pain',
  },
  {
    id: 'letters-101',
    source: 'letters',
    sourceLabel: 'Letters to Lucilius',
    ref: 'Letter 101',
    author: 'Seneca',
    translator: 'Richard Mott Gummere',
    text: `Let us postpone nothing. Let us balance life's account every day.`,
    theme: 'mortality',
  },

  // ----------------------------------------------------------------------------
  // DISCOURSES - Epictetus, tr. George Long
  // ----------------------------------------------------------------------------
  {
    id: 'discourses-1-1-power',
    source: 'discourses',
    sourceLabel: 'Discourses',
    ref: 'Book 1.1',
    author: 'Epictetus',
    translator: 'George Long',
    text: `As then it was fit to be so, that which is best of all and supreme over all is the only thing which the gods have placed in our power, the right use of appearances; but all other things they have not placed in our power.`,
    theme: 'control',
  },
  {
    id: 'discourses-1-1-reason',
    source: 'discourses',
    sourceLabel: 'Discourses',
    ref: 'Book 1.1',
    author: 'Epictetus',
    translator: 'George Long',
    text: `I have given you a small portion of us, this faculty of pursuing an object and avoiding it, and the faculty of desire and aversion, and, in a word, the faculty of using the appearances of things; and if you will take care of this faculty and consider it your only possession, you will never be hindered, never meet with impediments.`,
    theme: 'reason',
  },
  {
    id: 'discourses-1-1-will',
    source: 'discourses',
    sourceLabel: 'Discourses',
    ref: 'Book 1.1',
    author: 'Epictetus',
    translator: 'George Long',
    text: `Man, what are you talking about? Me in chains? You may fetter my leg, but my will not even Zeus himself can overpower.`,
    theme: 'freedom',
  },
  {
    id: 'discourses-1-1-death',
    source: 'discourses',
    sourceLabel: 'Discourses',
    ref: 'Book 1.1',
    author: 'Epictetus',
    translator: 'George Long',
    text: `I must die. Must I then die lamenting? I must be put in chains. Must I then also lament?`,
    theme: 'mortality',
  },
  {
    id: 'discourses-4-1',
    source: 'discourses',
    sourceLabel: 'Discourses',
    ref: 'Book 4.1',
    author: 'Epictetus',
    translator: 'George Long',
    text: `He is free who lives as he wishes to live; who is neither subject to compulsion nor to hindrance, nor to force; whose movements to action are not impeded, whose desires attain their purpose, and who does not fall into that which he would avoid.`,
    theme: 'freedom',
  },
  {
    id: 'discourses-2-18',
    source: 'discourses',
    sourceLabel: 'Discourses',
    ref: 'Book 2.18',
    author: 'Epictetus',
    translator: 'George Long',
    text: `Every habit and faculty is maintained and increased by the corresponding actions: the habit of walking by walking, the habit of running by running.`,
    theme: 'discipline',
  },
]

/** Look up a single reading by id. */
export function readingById(id: string): Reading | undefined {
  return readings.find((r) => r.id === id)
}

const SOURCE_ORDER: ReadingSource[] = [
  'meditations',
  'enchiridion',
  'letters',
  'discourses',
]

/** Group readings by source, in a stable canonical order (for the browse view). */
export function readingsBySource(): Array<{
  source: ReadingSource
  label: string
  items: Reading[]
}> {
  return SOURCE_ORDER.map((source) => ({
    source,
    label: readings.find((r) => r.source === source)?.sourceLabel ?? source,
    items: readings.filter((r) => r.source === source),
  })).filter((g) => g.items.length > 0)
}

/**
 * Deterministic reading for a given local day ("YYYY-MM-DD"). Same day -> same
 * reading for everyone, no storage needed; a simple string hash keeps the walk
 * through the collection stable and well-distributed across the year.
 */
export function dailyReading(dateLocal: string): Reading {
  let hash = 0
  for (let i = 0; i < dateLocal.length; i++) {
    hash = (hash * 31 + dateLocal.charCodeAt(i)) >>> 0
  }
  return readings[hash % readings.length]
}
