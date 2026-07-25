// enrichment.ts
// Depth layer for the Stoic practice library. This file adds philosopher
// context, curated collections, per-session takeaways, and per-day reflection
// notes on top of the existing content in library.ts. It does not modify
// library.ts and references only ids that exist there.
//
// Non-fabrication note: the philosopher biographies below use only
// well-established, encyclopedic facts (dates, public roles, principal
// surviving works, and standard historical record). No anecdotes, quotes, or
// invented specifics. sessionTakeaways and reflectionNotes are original
// guidance written for this file and are not attributed to any Stoic.
//
// House style: no em dashes, brand-neutral voice, no product name.

import type { ThemeKey } from './library';

export interface PhilosopherBio {
  id: string; // kebab-case: 'marcus-aurelius', 'epictetus', 'seneca', 'musonius-rufus'
  name: string;
  era: string; // e.g. "121 – 180 AD"
  role: string; // one short line
  bio: string; // 3-5 sentences, well-established biographical facts only
  work: string; // key surviving work
  themes: ThemeKey[]; // app themes they speak to most
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string; // one line
  emoji: string;
  sessionIds: string[]; // 3-6 real session ids from library.ts
}

// ---------------------------------------------------------------------------
// PHILOSOPHERS
// ---------------------------------------------------------------------------

export const philosophers: PhilosopherBio[] = [
  {
    id: 'marcus-aurelius',
    name: 'Marcus Aurelius',
    era: '121 – 180 AD',
    role: 'Roman emperor',
    bio:
      'Marcus Aurelius was Roman emperor from 161 to 180 AD, the last of the rulers later grouped as the Five Good Emperors. He was schooled in Stoic philosophy from a young age and carried its ideas into a reign dominated by war on the northern frontier and an outbreak of plague. Throughout that period he kept a private journal of Stoic reflections, written to himself and never meant for publication. That journal survives as the Meditations. He was succeeded by his son Commodus.',
    work: 'Meditations',
    themes: ['control', 'mortality', 'anger', 'discipline'],
  },
  {
    id: 'epictetus',
    name: 'Epictetus',
    era: 'c. 50 – c. 135 AD',
    role: 'Freed slave and teacher',
    bio:
      'Epictetus was born into slavery around the middle of the first century AD in Hierapolis, in Phrygia, part of modern Turkey. Enslaved in Rome, he studied Stoic philosophy while still in bondage and continued to teach after he was freed. When philosophers were banished from Rome, he moved on and established a school in Nicopolis in Greece. He wrote nothing himself; his teaching survives through notes taken by his student Arrian, known as the Discourses and the shorter handbook, the Enchiridion.',
    work: 'Discourses and the Enchiridion',
    themes: ['control', 'discipline', 'fear', 'resilience'],
  },
  {
    id: 'seneca',
    name: 'Seneca',
    era: 'c. 4 BC – 65 AD',
    role: 'Statesman and tutor to Nero',
    bio:
      'Seneca the Younger was born in Corduba, in Roman Spain, around 4 BC. He became a leading statesman, orator, and writer in Rome, and served as tutor and later political advisor to the emperor Nero. Earlier in his career he had been exiled to Corsica under the emperor Claudius before being recalled. Accused of taking part in a conspiracy against Nero, he was ordered by the emperor to take his own life in 65 AD. His surviving works include a large collection of moral letters and philosophical essays.',
    work: 'Letters to Lucilius',
    themes: ['mortality', 'gratitude', 'fear', 'discipline'],
  },
  {
    id: 'musonius-rufus',
    name: 'Gaius Musonius Rufus',
    era: 'c. 30 – c. 100 AD',
    role: 'Roman Stoic teacher',
    bio:
      'Musonius Rufus was a Roman Stoic philosopher of the first century AD, born in Volsinii in Etruria. He taught Stoicism in Rome and was among the most respected teachers of his day, and Epictetus was one of his students. He was exiled more than once, including to the island of Gyaros under the emperor Nero. His lectures survive as a set of discourses recorded by others, and he is well known for teaching that philosophy must be practiced in daily conduct, and that women as well as men should study it.',
    work: 'Lectures (Discourses)',
    themes: ['discipline', 'purpose', 'relationships'],
  },
];

// ---------------------------------------------------------------------------
// COLLECTIONS (curated groupings of real session ids)
// ---------------------------------------------------------------------------

export const collections: Collection[] = [
  {
    id: 'for-a-hard-day',
    title: 'For a Hard Day',
    subtitle: 'Steadiness for when the day is pushing back.',
    emoji: '🌧️',
    sessionIds: [
      'endurance-training',
      'the-inner-citadel',
      'setback-reframe',
      'control-under-pressure',
      'obstacle-as-path',
    ],
  },
  {
    id: 'morning-arming',
    title: 'Morning Arming',
    subtitle: 'Meet the day on purpose before it happens to you.',
    emoji: '🛡️',
    sessionIds: [
      'morning-preparation-practice',
      'rising-to-the-work',
      'the-morning-inventory',
      'the-first-hard-thing',
    ],
  },
  {
    id: 'before-sleep',
    title: 'Before Sleep',
    subtitle: 'Review the day, then set it down and rest.',
    emoji: '🌙',
    sessionIds: [
      'evening-review-practice',
      'the-days-accounting',
      'releasing-outcomes',
      'grounding-in-the-now',
    ],
  },
  {
    id: 'three-minute-reset',
    title: 'Three-Minute Reset',
    subtitle: 'The shortest sessions, for a quick return to center.',
    emoji: '⏱️',
    sessionIds: [
      'rising-to-the-work',
      'the-days-accounting',
      'grounding-in-the-now',
      'counting-what-is-here',
      'the-morning-inventory',
    ],
  },
  {
    id: 'when-anger-rises',
    title: 'When Anger Rises',
    subtitle: 'Win the small gap where anger is decided.',
    emoji: '🔥',
    sessionIds: [
      'the-pause-before-reaction',
      'others-are-human',
      'cooling-the-flame',
      'anger-and-judgment',
    ],
  },
  {
    id: 'facing-loss',
    title: 'Facing Loss',
    subtitle: 'Holding what is finite with an open hand.',
    emoji: '🕯️',
    sessionIds: [
      'borrowed-time',
      'this-could-be-the-last',
      'the-view-from-the-end',
      'gratitude-for-finitude',
    ],
  },
  {
    id: 'taming-anxiety',
    title: 'Taming Anxiety',
    subtitle: 'Stop suffering futures that have not arrived.',
    emoji: '🌊',
    sessionIds: [
      'suffering-in-imagination',
      'premeditation-of-adversity',
      'the-worst-case-walk-through',
      'grounding-in-the-now',
    ],
  },
  {
    id: 'wanting-less',
    title: 'Wanting Less',
    subtitle: 'Practice enough, and loosen the pull of more.',
    emoji: '🍃',
    sessionIds: [
      'enough-as-a-practice',
      'the-returned-gift',
      'counting-what-is-here',
      'desire-and-restraint',
    ],
  },
];

// ---------------------------------------------------------------------------
// SESSION TAKEAWAYS (one concrete micro-action per session, imperative)
// ---------------------------------------------------------------------------

export const sessionTakeaways: Record<string, string> = {
  'what-is-yours':
    'Pick the one worry riding you today, name the single part that answers to your choice, and put your hands only on that.',
  'the-two-columns':
    'Before you react to the next problem, sort it out loud into up to me and not up to me, then spend yourself only on the left column.',
  'releasing-outcomes':
    'Choose one result you are waiting on, unclench your grip by a single degree, and tell yourself you gave what was yours to give.',
  'control-under-pressure':
    'The next time heat rises, insert one breath, state the raw event without the story, and answer from the far side of that breath.',
  'obstacle-as-path':
    'Look at the wall in your way and take the one action it still leaves open, instead of asking it to move.',
  'the-inner-citadel':
    'When the day scatters you, take one breath and step into your inner quiet before you decide what anything means.',
  'setback-reframe':
    'Write today’s setback in the flattest words you can, then notice how much of the weight was the story you added on top.',
  'endurance-training':
    'Stop trying to carry the whole season and commit only to enduring the single hour in front of you.',
  'this-could-be-the-last':
    'Hold your task list against the fact that today will not return, and drop whatever you would not actually miss.',
  'borrowed-time':
    'Look at one person you love as something lent rather than owned, and let yourself notice them while they are here.',
  'the-view-from-the-end':
    'Ask your older self at the far end of life what to do with today, then go do that one thing.',
  'gratitude-for-finitude':
    'Name one hour you will refuse to waste, and let its value come from the fact that your hours are counted.',
  'the-pause-before-reaction':
    'When the spark of anger hits, take one slow breath inside the gap and choose your words from there.',
  'others-are-human':
    'Drop the hidden demand that a difficult person be other than they are, and meet them as they actually come.',
  'cooling-the-flame':
    'When someone wrongs you, guard your own conduct and refuse to become a copy of the thing that hurt you.',
  'anger-and-judgment':
    'Find the verdict sitting under your anger, say it in one plain sentence, and test whether it is fully true.',
  'morning-preparation-practice':
    'Name the one point of friction you expect today and decide, right now, the posture you will meet it with.',
  'rising-to-the-work':
    'Stop waiting to feel ready and make the first small physical motion of your day before the motivation arrives.',
  'evening-review-practice':
    'Tonight, name one thing you did well and one you would do differently, and turn the second into a plan.',
  'the-days-accounting':
    'Picture today as a pack in your hands and set it down on one long exhale so it stops stealing your rest.',
  'suffering-in-imagination':
    'When dread pulls you into the future, come back to this moment and check whether you are actually safe right now.',
  'premeditation-of-adversity':
    'Name your fear in the most specific words you can, then decide the one thing you would do if it happened.',
  'the-worst-case-walk-through':
    'Walk your worst realistic case to its end, watch yourself handle it, and notice how much would still be standing.',
  'grounding-in-the-now':
    'When your mind races ahead, name three plain things you can see and let your breath walk you back to now.',
  'the-first-hard-thing':
    'Do the task you are avoiding first thing, while your will is fresh, before you touch any easier work.',
  'voluntary-discomfort-practice':
    'Choose one small discomfort this week on purpose, meet it as training, and notice it was smaller than the fear of it.',
  'keeping-your-word':
    'Make one small, specific promise to yourself today and keep it exactly, as a deposit in your own trust.',
  'desire-and-restraint':
    'The next craving that arrives, watch it like a wave without acting, and stay on the shore until it passes.',
  'enough-as-a-practice':
    'Look at your life as it is right now, without the next thing added, and practice calling it enough.',
  'the-returned-gift':
    'Pick one ordinary good you stopped noticing and look at it today as if you had just gotten it back.',
  'counting-what-is-here':
    'Count three present goods, one from your body, one from your surroundings, one a person, before the day fills up.',
  'the-morning-inventory':
    'Before you do anything to earn it, list what you already have this morning and enter the day from there.',
};

// ---------------------------------------------------------------------------
// REFLECTION NOTES (how to use each daily reflection today, days 1..60)
// ---------------------------------------------------------------------------

export const reflectionNotes: Record<number, string> = {
  1: 'Do not try to sort your whole life. Take the one thing weighing on you, find its movable part, and act only there today.',
  2: 'Catch yourself once today narrating a plain event. Strip the adjectives and see what is actually left underneath.',
  3: 'Notice one thing you are dreading, then check the record. Count how often past dreads arrived as badly as you pictured.',
  4: 'Watch for one moment you are tempted to match someone’s harshness. Hold your own conduct instead and let that be the win.',
  5: 'Pick one thing you already have that a younger you wanted badly. Sit with it long enough to feel it as enough.',
  6: 'Let the shortness of the day decide one thing you stop giving attention to, and redirect that attention on purpose.',
  7: 'Name the obstacle in your way and ask what capacity climbing it would build. Treat it as a load, not an insult.',
  8: 'Find the outcome you are gripping. Write the effort that was fully yours, then loosen the grip a single degree.',
  9: 'Choose one thing you treat as guaranteed and hold it as lent for the day. Notice how that changes how you handle it.',
  10: 'Meet the first reluctant moment of the morning by naming what you are rising to do, then move before the mood catches up.',
  11: 'Find the moment today you feel most scattered. Have one short phrase ready that calls you back to your own quiet.',
  12: 'Choose one hour tomorrow in advance and protect it. Decide now what it is for so it does not leak away.',
  13: 'When something external stings today, separate the raw event from the verdict you add, and rewrite only the verdict.',
  14: 'Before you meet people today, expect that some will be difficult. Let the lost surprise take the fuel out of your anger.',
  15: 'Make one small, specific promise this morning and keep it exactly. Let keeping it matter more than the size of the task.',
  16: 'Ask what your future self would thank you for today, then do that one thing before the day ends.',
  17: 'The next urge you usually obey, watch it rise and fall without acting. Notice how long it actually takes to pass.',
  18: 'Take one live anger and write the verdict under it. Test whether you were truly harmed or only inconvenienced.',
  19: 'Find the task you keep sliding past. Do its first concrete step before you open anything easier.',
  20: 'Pick one small discomfort to meet this week on purpose. In the middle of it, ask whether it is as bad as the dread was.',
  21: 'Choose one steady good you have stopped seeing. Look at it today as if you had just gotten it back after losing it.',
  22: 'Tonight, ask whether you acted well, not whether the day went well. Keep the first answer and release the second.',
  23: 'Track where your hours actually went today. Notice the difference between time you spent and time that leaked away.',
  24: 'When fear pulls you forward, plant your feet and name three real things around you. Come back to the present on purpose.',
  25: 'Notice the one thought you repeated most today. Decide whether it is a color you want your mind taking on.',
  26: 'Take the obstacle in front of you and find the single action it still allows. Do that, rather than argue with the wall.',
  27: 'Name one thing you keep pushing to later. Take the smallest possible step on it today instead of tomorrow.',
  28: 'Recall the last time anger moved before you did. Rehearse the single breath that would have opened a choice.',
  29: 'Notice anyone you treated today as less than fully human. Practice seeing them, once, as an equal.',
  30: 'Take one hard situation and find both handles. Set down the one that cannot be carried and lift the one that can.',
  31: 'Spot one thing reluctance talked you out of. Make the first small motion toward it before you feel like it.',
  32: 'Look back at where today went and find one thing you would not miss. Give that time to something that deserves it.',
  33: 'Turn your attention from the gap to what is here. Count three present goods before you get back into your own head.',
  34: 'Take one thing that disturbed you today and hold the event and your opinion of it apart. Notice which one carries the sting.',
  35: 'If you are in a long hard season, stop measuring the whole thing. Name only the next hour and what carrying it well looks like.',
  36: 'Bring one grudge or worry up against the fact that your time is finite, and watch whether it keeps its grip.',
  37: 'Take a vague dread and write it in specific words. Then decide the one thing you would actually do if it came.',
  38: 'Notice where someone lowered themselves toward you today. Check whether you kept your own conduct or borrowed theirs.',
  39: 'Before the day fills up, list what you already have that you did nothing to earn. Enter the day from that, not from lack.',
  40: 'Find where you are demanding reality be different. Practice meeting it as it actually is, then act from there.',
  41: 'Name the finished piece of today you are still replaying. Write it down here so you can stop holding it in your head.',
  42: 'Ask what the work of a human being is that you can do today, however small, and then do that piece on purpose.',
  43: 'Name what you are craving more of. Check whether the discomfort is the lack itself or the wanting underneath it.',
  44: 'Take one external thing that pained you today and rewrite the judgement you gave it. Keep the fact, change the verdict.',
  45: 'Walk your worst realistic case all the way to the end. Name what you would do next and what would still be standing.',
  46: 'Find the moment you needed your inner quiet today but forgot you had it. Note what pulls you back to it fastest.',
  47: 'Take the resistance you are resenting and treat it as the load your strength grows against. Lean into it once today.',
  48: 'Bring up something you lost, or fear losing. Try saying it was returned rather than taken, and watch what shifts.',
  49: 'When your mind leaps to the endless weeks, bring it back to this one day. Ask only what today needs from you.',
  50: 'Decide now, calmly, how you will meet the person likely to frustrate you tomorrow. Choose the posture before the moment.',
  51: 'Stop waiting to feel ready for one thing. Make the first motion and let the readiness catch up to you.',
  52: 'Notice the imagined future you are living inside. Name what is actually true in the present, and stay there.',
  53: 'Name one hour you spent well recently. Let its weight come from the fact that your hours are numbered, then spend the next one that way.',
  54: 'Find where you feel harmed and test the source. Separate the event from the opinion you attached to it.',
  55: 'Take one desire that ran you today. Picture having it without obeying it, and try that the next time it arrives.',
  56: 'Find where your line called enough keeps sliding forward. Name what is already here that is genuinely sufficient.',
  57: 'Take a vague dread and name it precisely. Notice how giving it edges changes how large it feels.',
  58: 'Name one thing you are postponing as if time were endless. Weigh what doing it now costs against what waiting costs.',
  59: 'Find one thing you saw clearly today only because you slowed down. Describe it, and let that be gratitude in practice.',
  60: 'Look back over the practice and name one habit that changed how you meet a hard moment. Carry that one forward on purpose.',
};
