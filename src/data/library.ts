// library.ts
// Content library for "Amor del Fato" - Stoic practice meditations.
//
// Non-fabrication note: every quote attributed to a named Stoic below is drawn
// from a public-domain translation (George Long for Marcus Aurelius, Elizabeth
// Carter for Epictetus, Richard Gummere and John W. Basore for Seneca). Where a
// popular line could not be verified against a public-domain source with
// confidence, it is written as original guidance and attributed to
// "Amor del Fato" rather than to a Stoic. Guided-practice scripts and
// journaling prompts are original writing.

export interface Quote {
  text: string;
  author: string;
  source: string;
}

export type ThemeKey =
  | 'control'
  | 'resilience'
  | 'mortality'
  | 'anger'
  | 'gratitude'
  | 'discipline'
  | 'fear'
  | 'purpose'
  | 'relationships'
  | 'adversity';

export interface Session {
  id: string; // kebab-case unique
  title: string;
  subtitle: string; // one line
  theme: ThemeKey;
  durationMin: number; // 3..20
  quote: Quote; // anchor quote for the session
  intro: string; // 1-2 sentence framing
  script: string[]; // 6-14 paragraphs of ORIGINAL guided practice (spoken-word style, calm, direct)
  reflection: string; // one journaling prompt to close
}

export interface Path {
  // a "course" = ordered set of sessions
  id: string;
  title: string;
  description: string; // 1-2 sentences
  theme: ThemeKey;
  emoji: string; // single emoji
  sessionIds: string[]; // must reference real Session ids
}

export interface DailyReflection {
  day: number;
  quote: Quote;
  prompt: string; // journaling prompt is original
}

export interface Exercise {
  id: string;
  title: string;
  premise: string;
  steps: string[]; // classic Stoic exercises, steps original
}

// ---------------------------------------------------------------------------
// SESSIONS
// ---------------------------------------------------------------------------

export const sessions: Session[] = [
  // --- Path 1: The Dichotomy of Control ---------------------------------
  {
    id: 'what-is-yours',
    title: 'What Is Actually Yours',
    subtitle: 'Sorting the world into what you govern and what you do not.',
    theme: 'control',
    durationMin: 8,
    quote: {
      text:
        'Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions.',
      author: 'Epictetus',
      source: 'Enchiridion, 1',
    },
    intro:
      'Most of your tension comes from gripping things that were never yours to hold. This session teaches you to feel the line between the two.',
    script: [
      'Sit however you are sitting. You do not need a special posture. Let your hands rest, and let your shoulders drop away from your ears. Take one slow breath in, and a longer breath out.',
      'We begin with a simple sorting. There are things you govern, and things you do not. That is the whole of it. Your effort, your attention, your choices, your response. Those are yours. The weather, the traffic, the opinions of other people, the outcome once you have acted. Those are not.',
      'Bring to mind one thing pressing on you today. Do not analyze it yet. Just let it sit in front of you, like an object on a table.',
      'Now ask a single question about it. Which part of this is mine to move. Not which part do I wish were mine. Which part actually answers to my choice right now.',
      'Notice that most of what you carry splits cleanly. There is a small piece you can act on, and a large cloud around it that you can only wait on. The cloud feels urgent, but it does not obey you.',
      'Breathe again, and on the exhale, set down the cloud. You are not abandoning the situation. You are returning the parts of it that were never yours to carry.',
      'Rest your attention on the small piece that is yours. It is smaller than the worry, and it is solid. It is something you can actually do. This is where your strength lives, in the part that answers to you.',
      'Take one more breath here. When you open your eyes, you are not trying to control less because you care less. You are aiming your care where it can do work.',
    ],
    reflection:
      'Name one worry from today. Write the one piece of it that answers to your choice, and the part you are choosing to set down.',
  },
  {
    id: 'the-two-columns',
    title: 'The Two Columns',
    subtitle: 'A working sort you can run on any problem.',
    theme: 'control',
    durationMin: 7,
    quote: {
      text:
        'When you meet a hard day, do not ask why it came. Ask which part of it will move if you push, and push only there.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'The dichotomy of control is not a slogan, it is a tool you run. Here you practice running it deliberately, column by column.',
    script: [
      'Settle in. Let the breath find its own slow rhythm without you forcing it. In, and out. You are here to practice a skill, not to reach a mood.',
      'Picture two columns in front of you. The left one is titled, up to me. The right one is titled, not up to me. Everything in your life goes into one or the other, and nothing goes into both.',
      'Bring up a real situation. Something with weight, but not the heaviest thing you carry. We are practicing the sort, so choose something you can hold steadily.',
      'Now name the pieces out loud in your mind, one at a time, and drop each into a column. My preparation. Left column. Whether they say yes. Right column. My honesty in the room. Left. Their mood that day. Right.',
      'Feel how different the two columns are to hold. The left column has weight because you can lift it. The right column has weight only because you are pretending you can lift it.',
      'When you finish sorting, your work becomes obvious. You pour yourself into the left column, fully, without holding back. And you meet the right column with a steady, open hand.',
      'This is not resignation. A warrior who wastes strength on the right column arrives at the real fight already tired. You are learning to arrive with your strength intact.',
      'One last breath. Carry the two columns with you today. When something grips you, sort it before you react.',
    ],
    reflection:
      'Take one current problem and split it into two columns, up to me and not up to me. Which column have you been spending most of your energy on?',
  },
  {
    id: 'releasing-outcomes',
    title: 'Releasing the Outcome',
    subtitle: 'Acting fully, then opening your hand.',
    theme: 'control',
    durationMin: 9,
    quote: {
      text:
        'Do not demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well.',
      author: 'Epictetus',
      source: 'Enchiridion, 8',
    },
    intro:
      'You can do everything right and still not get the result. This session trains the release that lets you keep acting anyway.',
    script: [
      'Find your seat and let the day settle around you. One breath in through the nose, slow and full. One breath out, longer than the breath in.',
      'There is a moment every warrior knows. You have done the work. You have thrown the effort. And now it is out of your hands, traveling toward a result you cannot touch.',
      'Most of us spend that moment clenched, as if squeezing hard enough will bend the outcome. It never does. The squeeze only tires the hand.',
      'Bring to mind something you are waiting on. A decision, a reply, a result already in motion. Feel where you are gripping it in your body. Often it sits in the jaw, or the chest, or the stomach.',
      'On your next exhale, loosen that grip by one degree. Not all the way. Just one degree. You are not giving up. You are proving to yourself that the grip was never what moved the outcome.',
      'Say to yourself, quietly. I gave what was mine to give. The rest belongs to how the world turns.',
      'Notice that letting go of the outcome does not lower your standard for the effort. If anything it raises it, because now your whole self goes into the part that is yours, and none of it leaks into the part that is not.',
      'Breathe again. Feel the difference between wishing the result would come, and being ready to meet whatever result does. The first is a cage. The second is freedom.',
      'When you rise, do the next right thing in front of you, and let the far result travel on without your grip strangling it.',
    ],
    reflection:
      'Write about an outcome you are waiting on. What is the effort that was fully yours, and can you say honestly that you gave it?',
  },
  {
    id: 'control-under-pressure',
    title: 'Control Under Pressure',
    subtitle: 'Finding the line when everything is loud.',
    theme: 'control',
    durationMin: 10,
    quote: {
      text:
        'If thou art pained by any external thing, it is not this thing that disturbs thee, but thy own judgement about it. And it is in thy power to wipe out this judgement now.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 8.47',
    },
    intro:
      'It is easy to sort calmly on a quiet morning. This session rehearses the sort under real pressure, so you have it when you need it.',
    script: [
      'Sit and let the breath deepen. In, and out. We are going to practice for a hard moment now, while things are calm, so the skill is ready later when things are not.',
      'Recall a recent moment when you lost the line. When something external hit you and you reacted before you chose. Do not judge yourself for it. Just watch the replay.',
      'See the moment the pressure arrived. Feel the heat rise, the pulse quicken, the story start to spin about what this means and who is to blame.',
      'Here is the teaching. Between the thing that happened and your suffering about it, there is a judgement. The event did not disturb you. Your verdict about the event disturbed you. And the verdict is yours to write.',
      'Run the replay again, but this time insert a single breath between the event and the reaction. One breath. In that breath, ask, what actually happened, stripped of the story. Not what it means. What occurred.',
      'Often the raw event is small. A tone of voice. A delay. A word. The mountain was built by the judgement, not the event.',
      'Practice the pause now. Picture the pressure returning. Feel the heat. And instead of the old reaction, take the breath, name the raw event, and choose your response from the calm on the other side of the breath.',
      'You will not do this perfectly. No one does. But every time you insert the breath, you widen the gap between the world acting on you and you choosing your answer.',
      'Take a final slow breath. The pressure will come again. The pause is yours, and you can carry it into the storm.',
    ],
    reflection:
      'Describe a moment pressure made you react before you chose. What was the raw event, and what was the judgement you added on top of it?',
  },

  // --- Path 2: Facing Adversity ----------------------------------------
  {
    id: 'obstacle-as-path',
    title: 'The Obstacle Becomes the Path',
    subtitle: 'Turning the thing in your way into the way forward.',
    theme: 'adversity',
    durationMin: 9,
    quote: {
      text:
        'The wall in front of you is not only in your way. It is also the ground you will climb. Meet it as material, not as insult.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'The Stoics held that a blocked action can advance you if you let the block itself teach you. This session trains that turn.',
    script: [
      'Sit down and let your weight settle. Breathe in slowly, and out. There is something in your way right now. We are going to look at it directly.',
      'Bring the obstacle into view. The delay, the setback, the person, the limit. Do not soften it and do not exaggerate it. Just see it as it is, standing in your path.',
      'Notice your first reaction to it. For most of us the first reaction is a complaint. This should not be here. Why me. Feel that complaint, and then set it gently aside, because it does no work.',
      'Now ask a different question. Given that this wall is here, what does it make possible that an open road would not. Patience trains under delay. Courage trains under fear. Ingenuity trains under limit.',
      'The wall is not on your side, and we will not pretend it is a gift. But the wall is material. It is the exact resistance your strength needs in order to grow. Muscle only builds against a load.',
      'Look at the obstacle again and find the one action it still leaves open to you. There is always at least one. Even when the road forward is blocked, there is a step to the side, or a way to prepare, or a thing to learn.',
      'Breathe into that one open action. This is the turn. You stop asking the wall to move, and you start using the wall to climb.',
      'The warrior is not the one who never meets a wall. It is the one who has learned that the wall and the way are often the same stone.',
      'One more breath. When you rise, take the single open action the obstacle still allows.',
    ],
    reflection:
      'Name the wall in front of you right now. What capacity could climbing it build in you that an easy road never would?',
  },
  {
    id: 'the-inner-citadel',
    title: 'The Inner Citadel',
    subtitle: 'Retreating into the one place the storm cannot reach.',
    theme: 'resilience',
    durationMin: 8,
    quote: {
      text:
        'It is in thy power whenever thou shalt choose to retire into thyself. For nowhere either with more quiet or more freedom from trouble does a man retire than into his own soul.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.3',
    },
    intro:
      'You do not need a quiet room to find quiet. This session builds the retreat you carry inside you, always available.',
    script: [
      'Wherever you are, let it be enough. Close your eyes if that helps. Breathe in, and out, and let the outside world keep making its noise without you chasing it.',
      'People look for rest in far places. A shore, a mountain, a holiday that is always just out of reach. But there is a retreat closer than any of those, and it is open to you at any hour.',
      'It is the still point inside you, the place where your judgements are made. No one can enter it without your permission. No event can occupy it unless you invite the event in.',
      'Go there now. Picture a small, plain, well built room at the center of you. Stone walls. A single steady light. Nothing in it can be taken, because nothing in it is made of things.',
      'The noise of the day is still out there, and you can hear it faintly, like weather against the walls. But in here it is quiet, because in here you decide what things mean.',
      'Sit in this room and notice that you are already whole. The trouble outside did not follow you in. It cannot. It lives in the world of events, and this room is not made of events.',
      'You can return here any time. In a crowded meeting. In a hard conversation. In the middle of a sleepless night. One breath, and you are back in the citadel, deciding calmly what to carry and what to leave at the wall.',
      'Take a final breath in your quiet room. Then open the door and walk back out, carrying its stillness with you into the noise.',
    ],
    reflection:
      'When today did you feel most scattered? Describe the retreat inside you, and one phrase that would call you back to it.',
  },
  {
    id: 'setback-reframe',
    title: 'The Setback Reframe',
    subtitle: 'It is not the event, it is the verdict you gave it.',
    theme: 'adversity',
    durationMin: 8,
    quote: {
      text:
        'Men are disturbed not by the things which happen, but by the opinions about the things.',
      author: 'Epictetus',
      source: 'Enchiridion, 5',
    },
    intro:
      'A setback arrives as a fact, then you wrap it in a story. This session separates the two so the fact stops feeling like a wound.',
    script: [
      'Sit and let the breath slow. In, and out. Bring to mind a setback, something that did not go the way you wanted.',
      'Watch how your mind handles it. First there is the plain event, and then almost instantly there is a verdict. This is a disaster. I always fail at this. It is over.',
      'The verdict feels like part of the event, welded to it, inseparable. But it is not. It was added by you, and what was added by you can be revised by you.',
      'Separate them now. On one side, the bare fact. State it in the flattest possible words, with no adjectives. A thing happened. A result came in. A door closed.',
      'On the other side, the story you wrapped around it. See how much heavier the story is than the fact. The fact is a stone. The story is the whole avalanche you built from it.',
      'You do not have to swing to false cheer. We are not pretending the setback is secretly good. We are only refusing to add suffering that the fact did not require.',
      'Hold the bare fact one more time, without the story. Notice that it is survivable. Facts almost always are. It is the stories about facts that feel unsurvivable.',
      'Breathe. When you rise, keep an eye on the gap between what happened and the verdict you rush to give it. In that gap is all your freedom.',
    ],
    reflection:
      'Write the flattest, most adjective-free version of a recent setback. Then write the story you added. What does the story cost you?',
  },
  {
    id: 'endurance-training',
    title: 'Training to Endure',
    subtitle: 'Building the capacity to stay when staying is hard.',
    theme: 'resilience',
    durationMin: 10,
    quote: {
      text:
        'Endurance is not clenching your teeth and waiting for the storm to pass. It is learning to breathe steadily while it is still raining.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Some hardships cannot be reframed away, they can only be outlasted. This session trains the quiet, patient strength that outlasts them.',
    script: [
      'Settle in and let your breath lengthen. We are training a specific muscle today, the one that lets you stay steady inside something that is not ending soon.',
      'Some trouble is a door you walk through and it closes behind you. But some trouble is a season. It does not resolve in a day. It has to be lived through, week after week.',
      'Bring to mind a hardship like that, one you cannot fix today and cannot escape today. A long recovery, a hard stretch of work, a grief that is still fresh.',
      'Notice the urge to demand that it be over. That urge is natural, and it is also exhausting. Every hour you spend fighting the fact that it exists is an hour not spent enduring it well.',
      'Try something different. Instead of straining toward the end, sink into this single day. You do not have to endure the whole season right now. You only have to endure today, and today is manageable.',
      'Breathe into the current hour. This hour you can carry. When the mind leaps ahead to the endless weeks, gently return it. Not the weeks. This hour.',
      'Endurance is built like this, one steady hour laid on top of another. You are not waiting for strength to arrive. You are becoming strong in the act of staying.',
      'Feel your own steadiness. It is quieter than the dramatic strength of a single hard push. It is the strength of a root, of a tide, of something that simply does not leave.',
      'One last breath. You do not need to see the end of the season to endure this day inside it. Carry only today.',
    ],
    reflection:
      'What season are you enduring right now? Write down the single next hour, and what carrying it well would look like.',
  },

  // --- Path 3: Memento Mori --------------------------------------------
  {
    id: 'this-could-be-the-last',
    title: 'As If It Were the Last',
    subtitle: 'Letting the shortness of life sharpen the present.',
    theme: 'mortality',
    durationMin: 8,
    quote: {
      text:
        'Since it is possible that thou mayest depart from life this very moment, regulate every act and thought accordingly.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 2.11',
    },
    intro:
      'Remembering death is not morbid, it is clarifying. This session uses your finitude to cut through what does not matter.',
    script: [
      'Sit and breathe. In, and out. We are going to touch a thought most people spend their lives avoiding, and we are going to find it steadying rather than frightening.',
      'You will die. Not today, most likely, but certainly. This is not a threat. It is the plain condition of every living thing, and it is the thing that makes a life a life.',
      'Let the fact rest in front of you without flinching. You do not have to dramatize it. Just hold it. Your time here has an edge, and the edge is what gives the middle its worth.',
      'Now bring in your day. The tasks, the small frictions, the things you told yourself were urgent. Hold them up against the fact of your finitude.',
      'Notice how the light changes. Some of what felt heavy this morning shrinks to nothing. A grudge you were nursing. A worry about what someone thought. In the light of the edge, they lose their grip.',
      'And notice what grows brighter. The people you love. The work that actually matters to you. The chance to act well today. Death does not make these smaller. It makes them precious.',
      'This is the gift the Stoics found in remembering death. Not fear, but focus. When you know the day is finite, you stop spending it on things you would not miss.',
      'Breathe once more. When you rise, let the edge sharpen you. Spend today as something that will not come again, because it will not.',
    ],
    reflection:
      'If today held more weight than most, what would you stop giving your attention to, and what would you finally give it to?',
  },
  {
    id: 'borrowed-time',
    title: 'Everything Is on Loan',
    subtitle: 'Holding what you love with an open hand.',
    theme: 'mortality',
    durationMin: 9,
    quote: {
      text:
        'Never say of anything, I have lost it, but I have returned it. Is your child dead? It is returned.',
      author: 'Epictetus',
      source: 'Enchiridion, 11',
    },
    intro:
      'Everything you have was given for a while, not forever. This session softens the grip that turns love into fear of loss.',
    script: [
      'Find your seat and let the breath settle. In, slow. Out, slower. This session asks you to hold something tender, so be gentle with yourself as we go.',
      'Think of the things you would call yours. The people you love. Your health. Your work. The roof over you. We say we own these, but that is not quite true.',
      'They were given to you. For a season, for a while, on loan. You did not create the people you love, and you will not keep them forever, and neither will they keep you.',
      'This can sound bleak, but stay with it, because there is warmth on the other side. When you know a thing is on loan, you stop taking it for granted, and you start actually seeing it.',
      'Bring one loved person to mind. Instead of the low background fear of losing them, try gratitude that you have them at all, right now, today. They were never guaranteed. And here they are.',
      'When we grip what we love out of fear, we crush it, and we miss it while it is still here, too busy dreading its absence. The open hand holds better than the clenched one.',
      'Practice the open hand now. Picture holding what you love on an upturned palm, not in a fist. It is not going anywhere in this moment. And this moment is the only place it ever actually is.',
      'When a loss does come, and it will, this practice does not erase the grief. But it lets you say, I was lucky to hold this at all, rather than only, it was taken from me.',
      'One final breath. Go and look at what you love today as something on loan, and therefore as something to actually notice while it is here.',
    ],
    reflection:
      'Name one person or thing you have been treating as guaranteed. How would today change if you held it as something on loan?',
  },
  {
    id: 'the-view-from-the-end',
    title: 'The View From the End',
    subtitle: 'Letting your future self weigh in on today.',
    theme: 'mortality',
    durationMin: 9,
    quote: {
      text:
        'Do not act as if thou wert going to live ten thousand years. While thou livest, while it is in thy power, be good.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.17',
    },
    intro:
      'Look back on this stretch of life from its far end, and its real priorities come into focus. This session borrows that vantage point.',
    script: [
      'Sit and let the breath find its rhythm. In, and out. We are going to travel to the far end of your life, not to frighten you, but to borrow the clarity that lives there.',
      'Imagine yourself many years from now, near the end, looking back across the whole span. The you of that moment has seen how it all turned out. That you knows what mattered.',
      'From there, look back at today. This ordinary day you are living right now. What does your future self, at the end, want you to remember to do with it.',
      'Listen. That older, wiser version of you rarely says, work more frantically, or win that argument, or worry harder about what people think. That is almost never the message from the end.',
      'The message from the end tends to be simpler. Be kind to the people in front of you. Do the work that is actually yours to do. Do not postpone your real life waiting for a better day.',
      'Notice the things your future self would tell you not to waste time on. The grudge. The endless comparison. The days spent half present, scrolling past your own life.',
      'You do not have ten thousand years. You have this run of days, and it is enough to live well if you stop treating it as a rehearsal for some later, realer life.',
      'Come back now from the far end, carrying its counsel. The end is not here yet. What is here is today, and today is where being good actually happens.',
      'One more breath. Live this ordinary day as the older, wiser you would have you live it.',
    ],
    reflection:
      'Picture yourself at the far end of your life looking back at today. What would that self thank you for doing, and what would they wish you had let go?',
  },
  {
    id: 'gratitude-for-finitude',
    title: 'Grateful for the Edge',
    subtitle: 'Why a life that ends is a life that counts.',
    theme: 'gratitude',
    durationMin: 7,
    quote: {
      text:
        'It is not that we have a short time to live, but that we waste much of it.',
      author: 'Seneca',
      source: 'On the Shortness of Life',
    },
    intro:
      'The shortness of life is usually mourned. This session flips it, and finds gratitude in the very fact that time is limited.',
    script: [
      'Settle in and breathe slowly. In, and out. This is a short session about a short life, and about why its shortness is not only a loss.',
      'We tend to complain that life is too short. But consider what a life with no edge would actually be. If your days were endless, no single day would carry any weight at all.',
      'It is the limit that gives value. A word matters because you cannot say infinite words. A morning matters because you do not have infinite mornings. Scarcity is what makes a thing precious.',
      'So the edge of your life is not only the thing that takes your days away. It is also the thing that makes each day worth anything in the first place.',
      'The real waste is not that life is short. The real waste is spending a short, precious thing as though it were long and cheap. Half attending. Endlessly postponing.',
      'Bring to mind one hour you spent well recently. Fully present, doing something that mattered to you. That hour had weight precisely because your hours are numbered.',
      'Let a small gratitude rise, not despite the shortness, but for it. The edge is why anything counts. Thank the edge, and then go and stop wasting the days it frames.',
      'One last breath. A finite life is not a curse to survive. It is a rare thing to spend well.',
    ],
    reflection:
      'Where are you spending your limited days as if they were unlimited? Name one hour tomorrow you will refuse to waste.',
  },

  // --- Path 4: Mastering Anger -----------------------------------------
  {
    id: 'the-pause-before-reaction',
    title: 'The Pause Before the Reaction',
    subtitle: 'Winning the half second where anger is decided.',
    theme: 'anger',
    durationMin: 8,
    quote: {
      text:
        'Anger arrives fast, but it still needs your permission to act. The pause is where you decide whether to grant it.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Anger is decided in a tiny window between the spark and the outburst. This session trains you to find and hold that window.',
    script: [
      'Sit and let your breath deepen. In, and out. We are going to practice for the moment anger flares, while you are calm, so the practice is ready when the flare comes.',
      'Anger does not usually build slowly. It leaps. Something happens, and in a heartbeat the heat is up, the words are loaded, and the reaction is already halfway out of your mouth.',
      'But there is a gap, small as it is, between the spark and the act. Half a second. And in that half second the whole thing is decided. Win that gap, and you keep yourself. Lose it, and the anger keeps you.',
      'Recall a moment you lost the gap recently. Something lit you up and you reacted before you chose. Watch the replay without shame. We are studying it, not judging it.',
      'Now find the exact instant of the spark, and freeze it there. Right before the reaction. Feel the heat rising, the pressure building, the body already leaning into the outburst.',
      'Insert one breath here. Just one. In through the nose, slow. This single breath is the whole practice. It stretches the gap from a half second into something you can actually stand inside.',
      'Inside that stretched breath, notice you have a choice you did not have a moment ago. You can still speak, but now you choose the words. You can still act, but now you aim the action.',
      'Practice it again. Feel the spark, take the breath, choose the response. The anger may still be there, but it is now yours to direct, not the other way around.',
      'One more slow breath. The spark will come again today. The gap is yours if you remember to breathe into it.',
    ],
    reflection:
      'Recall the last time anger acted before you chose. If you had taken one breath in the gap, what might you have done differently?',
  },
  {
    id: 'others-are-human',
    title: 'They Are Only Human',
    subtitle: 'Expecting people as they are, not as you wish.',
    theme: 'relationships',
    durationMin: 9,
    quote: {
      text:
        'Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 2.1',
    },
    intro:
      'Much anger is really surprise, the shock that people acted like people. This session removes the surprise so the anger has less fuel.',
    script: [
      'Sit and breathe slowly. In, and out. This session is about other people, and about the quiet expectation that keeps setting you up to be angry.',
      'Notice how much anger begins with a kind of shock. They cut in line. They were rude. They let me down. And underneath the anger sits a hidden assumption, they should not have.',
      'But look honestly at the world. People are, on any given day, sometimes careless, sometimes selfish, sometimes unkind. Not because they are monsters, but because they are human, distracted, afraid, caught in their own storms.',
      'The Stoics started the day by expecting exactly this. Not with bitterness, but with realism. I will meet difficult people today, because there are difficult people, and some days I am one of them.',
      'Bring to mind someone who tends to anger you. See them clearly. Now drop the expectation that they should be other than they are. See them as they actually are, shaped by things you cannot see.',
      'When you stop being surprised that a person acted like themselves, most of the anger loses its fuel. You saved the shock, and the shock was half the fire.',
      'This is not lowering your standards for your own conduct. You still act well. But you stop demanding that others meet a standard they never agreed to, and you stop being wounded when they do not.',
      'There is even room for something warmer here. The same person who frustrates you is, like you, doing their imperfect best inside a hard life. That does not excuse harm, but it softens the reflexive anger.',
      'One last breath. Go into your day expecting people to be people. You will be angry far less, because you will be surprised far less.',
    ],
    reflection:
      'Who reliably angers you? Write the hidden expectation you are holding them to. What changes if you expect them as they actually are?',
  },
  {
    id: 'cooling-the-flame',
    title: 'Cooling the Flame',
    subtitle: 'The strongest answer to wrong is not becoming it.',
    theme: 'anger',
    durationMin: 8,
    quote: {
      text:
        'The best way of avenging thyself is not to become like the wrong doer.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 6.6',
    },
    intro:
      'When someone wrongs you, the pull is to answer in kind. This session shows why refusing that pull is the real victory.',
    script: [
      'Sit and let the breath slow. In, and out. Someone has wronged you, or will, and this session is about what you become in response.',
      'When we are wronged, the fastest impulse is to match it. They were cruel, so we sharpen our cruelty. They were unfair, so we plan our own unfairness. It feels like justice. It is mostly contagion.',
      'Bring to mind a wrong done to you, one that still stings. Feel the pull to answer it in the same currency it was paid in. That pull is anger promising you relief.',
      'But look at where that road leads. If you answer cruelty with cruelty, the cruelty has won twice. Once when it hit you, and again when it turned you into a version of itself.',
      'The Stoic sees a different kind of revenge, quieter and far more complete. Refuse to become like the one who wronged you. Stay yourself. Keep your conduct clean when theirs was not.',
      'This is not weakness. It takes far more strength to hold your character under attack than to abandon it. Anyone can catch the fire. It is rare to refuse to burn.',
      'Picture yourself meeting the wrong without becoming the wrong. Steady. Fair. Unwilling to be lowered. Notice that this is not defeat. It is the one response the wrongdoer cannot take from you.',
      'You may still act to protect yourself, to set a limit, to seek justice. But you do it as yourself, not as a copy of the thing that hurt you.',
      'One final breath. When the wrong comes, guard the one thing that is fully yours. Do not let it turn you into what you are standing against.',
    ],
    reflection:
      'Recall a wrong that tempted you to answer in kind. What would staying fully yourself, uncorrupted by it, have looked like?',
  },
  {
    id: 'anger-and-judgment',
    title: 'Anger Lives in the Verdict',
    subtitle: 'Pull the judgement, and the anger loses its ground.',
    theme: 'anger',
    durationMin: 9,
    quote: {
      text:
        'Take away thy opinion, and then there is taken away the complaint, I have been harmed. Take away the complaint, I have been harmed, and the harm is taken away.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.7',
    },
    intro:
      'Anger stands on a judgement, that you were harmed, that it was unjust. This session examines the judgement the anger is built on.',
    script: [
      'Settle in and breathe. In, and out. We are going to look underneath a piece of anger and find the judgement holding it up.',
      'Every anger rests on a verdict. I have been wronged. This is unfair. This should not be. Pull the verdict, and the anger has nothing to stand on. It is the judgement, not the event, that carries the sting.',
      'Bring up a live piece of anger, something still warm. Do not act on it, just hold it in front of you like a specimen.',
      'Find the verdict underneath it. Say it plainly. I was harmed. I was disrespected. This is unjust. There is always a verdict there, doing the real work of the anger.',
      'Now question the verdict, honestly, not to excuse anyone, but to see clearly. Was I actually harmed, or was I inconvenienced. Was this aimed at me, or did it simply happen near me.',
      'Sometimes the verdict holds up, and a real wrong was done. Even then, notice, the anger is optional. You can meet a real wrong with steady action instead of hot reaction. The verdict about the wrong is separate from the fire about it.',
      'Often the verdict does not hold up. When you look closely, the harm was mostly your interpretation, a story of disrespect built on a small and ambiguous act. Remove the story, and the harm dissolves.',
      'Feel what happens as you loosen the verdict. The anger has less to grip. It does not vanish on command, but it thins, because you have taken away the ground it was standing on.',
      'One more breath. When anger flares today, look for the verdict beneath it, and ask whether that verdict is true, before you let it move you.',
    ],
    reflection:
      'Take a current anger and write the verdict beneath it in one plain sentence. Now test it. Is it fully true, or partly a story you added?',
  },

  // --- Path 5: Morning and Evening Routine -----------------------------
  {
    id: 'morning-preparation-practice',
    title: 'Preparing for the Day',
    subtitle: 'Rehearsing the day before it happens to you.',
    theme: 'discipline',
    durationMin: 7,
    quote: {
      text:
        'In the morning when thou risest unwillingly, let this thought be present: I am rising to the work of a human being.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 5.1',
    },
    intro:
      'The Stoics began the day by rehearsing it. This morning practice sets your intention and braces you for friction before it arrives.',
    script: [
      'Sit at the start of your day and take one full breath. In, and out. Before the day happens to you, you are going to meet it on purpose.',
      'Part of you may not want to rise into this day. That is human, and it is fine. Notice the reluctance, and then remember what you are rising for. You are rising to do the work a person is here to do.',
      'Now walk through the day ahead in your mind, quickly. See the main things you will meet. The tasks, the people, the moments that usually test you.',
      'Where do you expect friction. A hard conversation. A tempting shortcut. A person who tends to provoke you. Name these now, calmly, so they do not ambush you later.',
      'For each one, set a small intention. In that conversation, I will stay steady. At that shortcut, I will do it right. With that person, I will not be baited.',
      'You will not get all of these perfectly, and that is not the goal. The goal is to enter the day already having chosen your posture, so you are choosing, not merely reacting.',
      'Set one clear aim for the whole day, something within your control. Not that everything goes well, but that you meet whatever comes as the kind of person you want to be.',
      'Take a final breath. Now rise into the work of a human being, prepared, deliberate, and already awake to the day rather than dragged into it.',
    ],
    reflection:
      'What is the one point of friction you expect today? Write the posture you intend to meet it with.',
  },
  {
    id: 'rising-to-the-work',
    title: 'Rising to the Work',
    subtitle: 'Meeting reluctance and moving anyway.',
    theme: 'discipline',
    durationMin: 6,
    quote: {
      text:
        'The feeling that you do not want to begin is not a reason to stay down. It is simply the first thing you get to move through.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Almost no worthwhile morning starts with enthusiasm. This short session trains you to act before the motivation arrives.',
    script: [
      'Wherever you are as the day begins, take one slow breath. In, and out. This is a short practice about the gap between not wanting to and doing it anyway.',
      'Notice the reluctance in you right now. The pull of the warm bed, the screen, the delay. It is real, and it is loud, and it will tell you a convincing story about why later is better.',
      'Here is the thing the reluctance hides. Motivation usually does not come before the action. It comes after you begin. You are waiting for a feeling that only shows up once you have moved.',
      'So you do not need to feel ready. You have never needed to feel ready. You only need to make the first small motion, and let the readiness catch up.',
      'Choose the very first physical step of your day. Feet on the floor. The first task opened. The shoes on. Not the whole mountain, just the first step.',
      'On your next exhale, commit to that single first step, regardless of how you feel about it. The feeling can come or not come. The step happens either way.',
      'This is the whole discipline in miniature. You stop negotiating with the reluctance, and you simply move. Do this each morning and you become someone who acts, rather than someone who waits to feel like acting.',
      'One last breath. The reluctance is allowed to be there. Take the first step through it now.',
    ],
    reflection:
      'What is the very first physical step of your morning that you tend to negotiate with? What would it look like to stop negotiating?',
  },
  {
    id: 'evening-review-practice',
    title: 'The Evening Review',
    subtitle: 'Sitting with the day honestly before you sleep.',
    theme: 'discipline',
    durationMin: 9,
    quote: {
      text:
        'At the end of the day, do not ask whether it went well. Ask whether you acted well, because only the second answer is yours to keep.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'The Stoic Seneca ended each day by reviewing his own conduct without flattery or cruelty. This session teaches that honest nightly audit.',
    script: [
      'Lie or sit comfortably as the day closes. Take one long breath out, letting the day begin to settle. We are going to look back over it, gently and honestly.',
      'The philosopher Seneca described sitting each night and putting his day on trial before himself. Not to punish, but to learn. Where did I do well. Where did I fall short. What will I do differently.',
      'Begin there. Let the day replay, from waking until now. Do not narrate or defend it. Just watch it pass, like reviewing footage.',
      'First, look for where you acted well. A moment you were patient. A time you told the truth. A place you did the harder, right thing. Name these plainly and let yourself acknowledge them. This is not vanity, it is accurate accounting.',
      'Now look for where you fell short. A moment you were sharp with someone. A task you avoided. A place you were baited into anger or excess. Name these too, without cruelty. You are a coach reviewing the tape, not a judge handing down a sentence.',
      'For each shortfall, do not sink into guilt. Guilt just loops. Instead ask the useful question, what will I do differently when this comes again. Turn the miss into a plan.',
      'Notice the tone that works here. Honest but kind. If you are cruel to yourself, you will stop looking, because it hurts too much. If you flatter yourself, you learn nothing. Aim for the steady middle, the honest friend.',
      'Now let the day go. You have taken from it what it had to teach. Carrying it further into the night helps no one and steals your rest.',
      'One final slow breath out. The day is reviewed, its lessons kept, its weight set down. You are ready to sleep as someone who faced the day honestly.',
    ],
    reflection:
      'Name one thing you did well today and one thing you would do differently. For the second, write what you will do when it comes again.',
  },
  {
    id: 'the-days-accounting',
    title: 'The Day Set Down',
    subtitle: 'Releasing what is finished so you can rest.',
    theme: 'discipline',
    durationMin: 6,
    quote: {
      text:
        'A day that is over asks nothing more of you. The only thing it can still give is a lesson, and the only thing it can still take is your sleep.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Once you have reviewed the day, the practice is to actually set it down. This short session helps you release it and rest.',
    script: [
      'Settle into the place where you will sleep. Take one slow breath out. The day is done, and this practice is about letting it be done.',
      'Some part of you may still be running the day, replaying a conversation, rehearsing tomorrow, holding a small regret on a loop. Notice that this replaying changes nothing. The day is already finished.',
      'You have already taken the lesson from it, if there was one to take. Beyond that lesson, the day has nothing left to give you. Holding it now only costs you your rest.',
      'Picture the day as something you can set down. A pack you have been carrying. Feel its weight in your hands, all the tasks and frictions and small victories of it.',
      'On your next long exhale, set the pack down. You are not throwing it away, you kept what mattered. You are simply putting down what is finished.',
      'If a piece of the day floats back up, and it may, do not fight it. Just notice it, remind yourself the day is complete, and let it drift off again.',
      'Feel your body soften now that it is not bracing against a day that is already over. There is nothing left to do tonight. Tomorrow will ask for you when it comes.',
      'One final breath out. The day is set down. Rest is yours now, and you have earned it by facing the day and then releasing it.',
    ],
    reflection:
      'What piece of today are you still carrying that is already finished? Write it down here so you can stop holding it in your head.',
  },

  // --- Path 6: Fear and Anxiety ----------------------------------------
  {
    id: 'suffering-in-imagination',
    title: 'Suffering in Advance',
    subtitle: 'Noticing how much of the pain is imagined.',
    theme: 'fear',
    durationMin: 8,
    quote: {
      text:
        'We suffer more often in imagination than in reality.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 13',
    },
    intro:
      'Most anxiety is pain borrowed from a future that has not happened. This session shows you how much of the suffering is imagined.',
    script: [
      'Sit and breathe slowly. In, and out. This session is about fear, and about the strange fact that most of what we dread never arrives.',
      'Anxiety works by living in the future. It takes a thing that might happen and treats it as if it were already happening, so you suffer it now, in advance, on credit.',
      'Bring to mind something you are anxious about. A conversation, an outcome, an unknown. Notice that it has not happened. You are, right now, entirely safe in this present moment. The suffering is arriving ahead of the event.',
      'Consider how often this has happened before. How many nights you spent bracing for a disaster that never came, or that came much smaller than the version you feared. The imagined version is almost always worse than the real one.',
      'This is not because you are foolish. The mind is built to run threat simulations. But a simulation is not the event, and treating the simulation as real is how you end up suffering a hundred hardships to face one.',
      'Come back to the present moment, the only place that is actually real. In this moment, are you safe. Almost always, in the moment itself, the answer is yes. The threat is in the imagined future, not the actual now.',
      'When the fear pulls you forward into the imagined disaster, gently return to now. Feel your breath. Feel the surface under you. This moment is manageable, and this moment is the only one you are actually in.',
      'One more breath. You will still prepare for real futures, that is wisdom. But you can stop pre-suffering the imagined ones, and that alone will return most of your peace.',
    ],
    reflection:
      'What are you suffering in advance right now? Write down how many past fears actually arrived as badly as you imagined.',
  },
  {
    id: 'premeditation-of-adversity',
    title: 'Meeting the Fear Head On',
    subtitle: 'Looking straight at what you dread, calmly.',
    theme: 'fear',
    durationMin: 9,
    quote: {
      text:
        'A fear you refuse to look at grows in the dark. A fear you examine in daylight almost always turns out smaller than its shadow.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Avoiding a fear feeds it. This session teaches the Stoic practice of turning toward the feared thing and examining it steadily.',
    script: [
      'Sit and let the breath slow. In, and out. We are going to turn toward a fear rather than away from it, which is the opposite of what fear wants.',
      'Fear survives on avoidance. As long as you refuse to look at the thing you dread, it stays vague and enormous, a shadow on the wall that could be anything.',
      'The Stoics did something counterintuitive. Instead of pushing the fear away, they deliberately looked at it. They asked, what exactly is it that I am afraid of. And they held the question steady.',
      'Bring your fear into view now. Not the fuzzy dread, but the specific thing. What, precisely, are you afraid will happen. Put it into plain words, as concretely as you can.',
      'Notice that the act of naming it precisely already shrinks it. Vague fear is huge. Specific fear has edges, and edges mean it is a finite thing, not an infinite one.',
      'Now look at the named fear and ask, if this did happen, what would I actually do. Not collapse, but do. There is almost always a response available, a next step, a way through.',
      'Feel the difference between the shadow and the examined thing. The shadow was unsurvivable. The examined thing, while unwelcome, has a shape, and shapes can be met.',
      'You are not inviting the hardship. You are refusing to be ruled by a version of it that lives only in the dark. Daylight is the enemy of dread.',
      'One final breath. Keep the habit of turning toward what you fear and naming it exactly. What you can see clearly, you can face.',
    ],
    reflection:
      'Write your fear in the most specific words you can. Then write the one thing you would actually do if it happened.',
  },
  {
    id: 'the-worst-case-walk-through',
    title: 'Walking Through the Worst Case',
    subtitle: 'Discovering you could handle even the hard version.',
    theme: 'fear',
    durationMin: 10,
    quote: {
      text:
        'Rehearsing hardship is not pessimism. It is how you take away its power to ambush you.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'The Stoic practice of premeditatio malorum walks calmly through the worst case, not to dread it, but to prove you could meet it.',
    script: [
      'Sit and take a few slow breaths. In, and out. This is a longer practice, and it asks some courage, because we are going to walk deliberately into the worst case. Stay steady. You are safe here.',
      'Fear keeps its power by staying just out of view. It hints at catastrophe but never lets you see the whole thing, because if you saw the whole thing, you might discover it is survivable.',
      'So let us look. Take the situation you fear and follow it all the way to its worst realistic outcome. Not a fantasy of endless doom, but the honest hard version. What is the worst that could genuinely happen.',
      'Picture it arriving. Let yourself see it. The bad news, the loss, the failure, whatever it is. Do not rush past it. Sit in the scene as if it had already happened.',
      'Now, from inside that worst case, ask the crucial question. What would I do next. Because life would continue. There would be a next morning, and a next step, and a way forward, even here.',
      'Watch yourself handle it. See yourself doing the hard practical things that would need doing. Making the call. Rebuilding. Adapting. You are more capable than the fear admits, and here is the proof, running in front of you.',
      'Notice too that even in the worst case, much would remain. The people who care about you. Your ability to act well. The core of you that no external loss can reach. The catastrophe is smaller than the fear implied, because it leaves so much standing.',
      'Feel the fear loosen. You have now seen the worst and watched yourself survive it. It can no longer ambush you, because you have already been there in rehearsal and walked back out.',
      'Come back to the present. The worst case is not here. Most likely it will never come. But if it did, you now know, from the inside, that you could meet it.',
      'One last slow breath. You looked at the thing you most wanted to avoid, and you are still steady. That steadiness is yours to keep.',
    ],
    reflection:
      'Walk your worst realistic case to the end. Write what you would actually do next, and what would still remain standing.',
  },
  {
    id: 'grounding-in-the-now',
    title: 'Back to This Moment',
    subtitle: 'Returning from the imagined future to the real present.',
    theme: 'fear',
    durationMin: 6,
    quote: {
      text:
        'Fear lives in a time that is not here. Peace is almost always waiting in the present, if you will come back to it.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Anxiety yanks you into an imagined future. This short session is a fast way back to the present, where you are actually safe.',
    script: [
      'Wherever you are, plant your feet and take one slow breath. In, and out. This is a short practice for when the mind has run ahead into fear, and you need to come back.',
      'Right now your mind may be somewhere in the future, in a scene that has not happened, feeling a threat that is not present. We are going to walk it home to now.',
      'Start with your breath. Feel the air come in, and feel it leave. The breath is only ever happening now. It is a rope back to the present, always in your hand.',
      'Now bring in your body. Feel the weight of you on the chair or the floor. Feel your feet, your hands, the temperature of the air. All of this is happening now, and now is solid.',
      'Look around, if your eyes are open, and name a few plain things you can see. A wall. A window. An object. These are real and present, unlike the imagined future the fear was showing you.',
      'Ask yourself, in this actual moment, right now, am I safe. Not in the imagined scene, but here. Almost always the honest answer is yes. The danger was in the future you were visiting, not the present you are in.',
      'Rest in that for a moment. You are here. It is now. And now is manageable. The future will become now one step at a time, and you will meet each step as it actually arrives, not all at once in your imagination.',
      'One final breath. Whenever the fear pulls you forward, use the breath, the body, and the plain things you can see to walk yourself home to now.',
    ],
    reflection:
      'Name three plain things around you right now. In this actual present moment, what is genuinely true about your safety?',
  },

  // --- Path 7: Discipline and Will -------------------------------------
  {
    id: 'the-first-hard-thing',
    title: 'The First Hard Thing',
    subtitle: 'Doing the difficult task first, on purpose.',
    theme: 'discipline',
    durationMin: 7,
    quote: {
      text:
        'The task you most want to avoid is usually the one carrying the most of your day. Do it first, and the rest gets lighter.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Willpower is strongest early and leaks all day. This session trains you to spend it on the hardest thing first.',
    script: [
      'Sit and take a slow breath. In, and out. This session is about the one task you keep pushing to later, and why later is the wrong place for it.',
      'There is usually one thing on your list you are quietly avoiding. You know the one. Every time your eye passes over it, something in you flinches and moves on to easier work.',
      'Notice what the avoidance costs. That task does not go away. It sits there all day, draining a low background dread, coloring everything else you do with the knowledge that it is still waiting.',
      'The discipline here is simple and hard. Do the avoided thing first, before the easier work, while your will is fresh. Not because it is pleasant, but because it is heavy, and heavy things are best lifted early.',
      'Bring the avoided task to mind now. Feel the flinch. Now, instead of moving past it, look straight at it. What is the actual first step. Not the whole task, the first concrete step.',
      'See yourself doing that first step at the start of your day, before the emails, before the easy busywork you use to feel productive while avoiding the real thing.',
      'Feel what the rest of the day becomes once the hard thing is done. Lighter. Freer. The dread is gone, spent early, and everything after it is downhill.',
      'This is how will is built. Not by grand acts, but by repeatedly doing the avoided thing first, until being the person who does it becomes simply who you are.',
      'One last breath. Name your first hard thing for tomorrow, and commit to meeting it before the easy work.',
    ],
    reflection:
      'What task are you avoiding right now? Write its first concrete step, and commit to doing it before anything easier.',
  },
  {
    id: 'voluntary-discomfort-practice',
    title: 'Choosing Discomfort',
    subtitle: 'Practicing hardship on purpose so it loses its grip.',
    theme: 'discipline',
    durationMin: 8,
    quote: {
      text:
        'Set aside a certain number of days, during which you shall be content with the scantiest and cheapest fare, and say to yourself, Is this the condition that I feared?',
      author: 'Seneca',
      source: 'Letters to Lucilius, 18',
    },
    intro:
      'Seneca practiced poverty and hardship deliberately, to discover it was not as terrible as the fear of it. This session brings that practice to your life.',
    script: [
      'Sit and breathe slowly. In, and out. This session is about choosing small discomforts on purpose, and why that choice makes you free.',
      'Much of our life is spent arranging comfort and dreading its loss. We build a soft nest and then live in quiet fear that something will take it away. The fear can be larger than the loss would ever be.',
      'Seneca had a remedy. Every so often, he chose hardship deliberately. Plain food, rough clothes, a hard bed. And in the middle of it he asked himself, is this the thing I was so afraid of. It usually was not.',
      'The practice does two things. It proves to you that you could survive far less than you have, which quietly dissolves the fear of losing what you have. And it sharpens your gratitude for the comfort you return to.',
      'Bring to mind one small voluntary discomfort you could choose this week. A cold end to your shower. A day without a thing you lean on. A walk in weather you would normally avoid. Something real but manageable.',
      'Picture yourself in the middle of that chosen discomfort. Notice that you are fine. Uncomfortable, yes, but fundamentally fine. The discomfort has edges, and you are larger than it.',
      'Feel how this changes your relationship to comfort. You no longer cling to it out of fear, because you have proven you can do without. Comfort becomes something you enjoy, not something you are enslaved by.',
      'This is the strange freedom the Stoics found. By choosing hardship on purpose, in small doses, you take away the power that the fear of hardship had over you.',
      'One last breath. Choose your one small discomfort for this week, and meet it as training, not as punishment.',
    ],
    reflection:
      'What one small discomfort could you choose this week on purpose? What fear might it help you prove is smaller than you thought?',
  },
  {
    id: 'keeping-your-word',
    title: 'Keeping Your Word to Yourself',
    subtitle: 'Building the self-trust that discipline is made of.',
    theme: 'purpose',
    durationMin: 8,
    quote: {
      text:
        'Every promise you keep to yourself is a deposit. Discipline is just the balance you have built by keeping more than you break.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Discipline is not raw force, it is self-trust. This session builds the habit of keeping the small promises you make to yourself.',
    script: [
      'Sit and take a slow breath. In, and out. This session is about the promises you make to yourself, and why keeping them is the root of all discipline.',
      'Think about how much you trust a person who breaks their word to you again and again. Not much. Now notice that you make promises to yourself constantly, and that you break a lot of them.',
      'I will start tomorrow. I will only check it once. I will go to bed early. Each broken promise is small, but together they teach you a quiet, corrosive lesson, that your word to yourself does not mean much.',
      'Discipline is really the opposite of that. It is having kept enough small promises to yourself that you believe yourself when you say you will do a thing. It is self-trust, banked over time.',
      'So the practice is not to make grand vows. Grand vows are usually broken, and each break withdraws from the account. The practice is to make small promises and keep them, exactly as stated.',
      'Bring one small promise to mind, something well within your power. Not a life overhaul. A single, specific, keepable thing you will do today or tomorrow.',
      'Make it concrete enough that there is no wiggle room, no way to half do it and call it done. Then commit to it, knowing that the point is not the task itself but the deposit it makes in your self-trust.',
      'Picture yourself keeping it. Feel the small, solid weight of having done exactly what you said. Do this enough times and you become someone whose word, even to yourself, is good.',
      'One last breath. Choose one small promise, keep it exactly, and let it be a deposit in the account that discipline is made of.',
    ],
    reflection:
      'Write one small, specific promise to yourself that you can keep in the next day. How will you know you kept it exactly?',
  },
  {
    id: 'desire-and-restraint',
    title: 'The Space Around a Craving',
    subtitle: 'Wanting something without being ruled by it.',
    theme: 'discipline',
    durationMin: 8,
    quote: {
      text:
        'A craving is a wave. You do not have to fight it or obey it. You can watch it rise, crest, and pass while you stay on the shore.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'Restraint is not about killing desire, it is about not being commanded by it. This session teaches you to sit with a craving without acting on it.',
    script: [
      'Sit and let the breath slow. In, and out. This session is about wanting, and about the space between a craving and the action it demands.',
      'A craving feels like a command. The urge arrives, and it insists that it must be satisfied right now, or something terrible will happen. But look closely, and the command is a bluff.',
      'Bring to mind a craving you know well. A habit you reach for, a thing you consume, a distraction you grab. Notice how it presents itself as urgent, as if it cannot be resisted.',
      'Now try something. Instead of fighting the craving or obeying it, just watch it. Treat it like a wave in the ocean. It is rising now, and it feels enormous. But waves do what waves do. They crest, and then they fall.',
      'Sit on the shore and watch this wave. You do not have to paddle out into it, and you do not have to run from it. You just observe it, breathing, while it does its thing.',
      'Notice that a craving, unfed, does not actually grow forever. It peaks, and then, if you do not act on it, it recedes. It always recedes. You have felt this before but rarely stayed long enough to see it.',
      'Feel the freedom in this. You are not killing desire, which is neither possible nor the point. You are simply discovering that you can have a craving and not be commanded by it. The wave can rise, and you can stay on the shore.',
      'Each time you watch a craving crest and pass without acting, you weaken its authority over you. You become the one who chooses, rather than the one who is dragged.',
      'One last breath. The next craving that arrives, try watching it as a wave. Let it rise, let it pass, and notice that you were free the whole time.',
    ],
    reflection:
      'Recall a craving you usually obey. What would it be like to watch it as a wave, without acting, until it passed?',
  },

  // --- Path 8: Gratitude and Enough ------------------------------------
  {
    id: 'enough-as-a-practice',
    title: 'Enough Is a Practice',
    subtitle: 'Poverty is wanting more, not having little.',
    theme: 'gratitude',
    durationMin: 8,
    quote: {
      text:
        'It is not the man who has too little, but the man who craves more, that is poor.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 2',
    },
    intro:
      'The feeling of not-enough follows people at every level of wealth. This session reframes enough as something you practice, not something you acquire.',
    script: [
      'Sit and breathe slowly. In, and out. This session is about the word enough, and why it is a practice rather than a finish line.',
      'Notice the quiet engine of wanting more that runs under most days. When this is done, I will rest. When I have that, I will be satisfied. The line called enough keeps moving just ahead of you, always a little out of reach.',
      'Here is the trap. The man who craves more is poor no matter how much he has, because the craving is the poverty, not the lack. And the man content with enough is rich no matter how little he has.',
      'So enough is not a number you reach. It is a practice you do. It is the deliberate act of turning to what is already here and calling it sufficient.',
      'Bring your attention to your life as it actually is right now. Not the version with the next thing added. This version. The roof, the food, the people, the breath in your body.',
      'Say to yourself, honestly, this is enough. Not that you will never want anything more, but that right now, as it is, this is genuinely sufficient for a good life. Because it is.',
      'Feel how the craving loosens when you do this. The engine of more quiets, just a little. You are not chasing a moving line. You are standing still and noticing you already arrived.',
      'This is the practice of enough. You will have to do it again tomorrow, because the craving grows back. But each time you practice, you spend a little less of your life running toward a horizon that recedes.',
      'One last breath. Look at your life as it is, and practice the word. Enough.',
    ],
    reflection:
      'Where has your line called enough kept moving ahead of you? Write down what is already here that is genuinely sufficient.',
  },
  {
    id: 'the-returned-gift',
    title: 'A Gift, Not a Given',
    subtitle: 'Seeing the ordinary as something you were lent.',
    theme: 'gratitude',
    durationMin: 7,
    quote: {
      text:
        'The things you stopped noticing are the same things you would beg to have back. Gratitude is just noticing them before they are gone.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'What we have long enough, we stop seeing. This session refreshes your sight so the ordinary becomes visible again.',
    script: [
      'Sit and take a slow breath. In, and out. This session is about the things you have stopped seeing, precisely because you have had them so long.',
      'The mind is built to notice change and ignore constants. So the steady goods of your life, the ones that are simply always there, fade into the background until you barely register them at all.',
      'But consider. A person who lost their sight would give anything to see the ordinary room you are ignoring. A person far from home would ache for the ordinary evening you are half present for. The ordinary is only ordinary because you still have it.',
      'Bring to mind one plain, constant good in your life that you have stopped noticing. Your health, or a part of it that works. A person who is reliably there. A comfort so steady you forgot it was a comfort.',
      'Look at it now as if it were new. As if you had just been given it, or just gotten it back after losing it. Feel how it would look through the eyes of someone who did not have it.',
      'This is what gratitude actually is. Not forced positivity, but corrected sight. Seeing clearly what is here, before its absence forces you to see it.',
      'Notice that everything in this category was, in truth, lent rather than owned. Given for a while. That is not a sad thought, it is what makes the thing precious enough to be grateful for.',
      'Rest for a moment in the sight of one ordinary good, freshly seen. This is the wealth you already have and keep forgetting to spend.',
      'One last breath. Go and look at one taken-for-granted thing today as the gift it quietly is.',
    ],
    reflection:
      'Name one ordinary, constant good you have stopped noticing. Describe it as if you had just gotten it back after losing it.',
  },
  {
    id: 'counting-what-is-here',
    title: 'Counting What Is Here',
    subtitle: 'A simple inventory of the present goods.',
    theme: 'gratitude',
    durationMin: 6,
    quote: {
      text:
        'The mind reaches for what is missing by default. Gratitude is the deliberate act of counting what is present instead.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'The mind drifts toward what is lacking. This short session deliberately turns it toward what is present and counts it.',
    script: [
      'Sit and take one slow breath. In, and out. This is a short and simple practice. We are going to count what is here.',
      'Left to itself, the mind gravitates toward the gap. The thing missing, the thing wrong, the thing not yet done. This is useful for solving problems and terrible for being at peace.',
      'So we do the opposite on purpose. We turn the attention, deliberately, toward what is present, and we count it, one item at a time.',
      'Start with your body. Name one thing about it that is working right now. A breath that comes easily. Legs that carry you. Eyes that read. Whatever is functioning, name it, and let it count.',
      'Now your immediate surroundings. Name one thing here that is a genuine good. Warmth, or shelter, or quiet, or safety in this moment. Name it plainly, and let it count.',
      'Now the people. Bring to mind one person who is, in some way, on your side. Not perfectly, but really. Name them, and let them count.',
      'Notice that you did not have to invent any of this. It was all already here. The gratitude did not add goods to your life, it simply pointed your attention at the ones already present.',
      'Feel the small shift this produces. Nothing external changed, but the felt shape of your life is different, fuller, because you counted the present instead of the missing.',
      'One last breath. Any time the mind runs to the gap, you can run this count. The goods are already here, waiting to be numbered.',
    ],
    reflection:
      'Count three present goods right now, one from your body, one from your surroundings, one a person. Write them down.',
  },
  {
    id: 'the-morning-inventory',
    title: 'The Morning Inventory',
    subtitle: 'Starting the day from what you already have.',
    theme: 'gratitude',
    durationMin: 6,
    quote: {
      text:
        'How you begin the day sets the lens for it. Start from lack, and the day looks poor. Start from enough, and the same day looks full.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    intro:
      'The first thoughts of the day set its tone. This short morning practice starts you from abundance rather than lack.',
    script: [
      'As your day begins, sit for a moment and take one slow breath. In, and out. Before the day fills with tasks and demands, we set the lens you will see it through.',
      'The first thoughts of a morning are powerful. If you begin from what is missing, the whole day tends to look like a scramble to fill a gap. If you begin from what is present, the same day looks like something you get to spend.',
      'So before anything else, take a brief inventory of what you already have, this morning, before you have done a single thing to earn it.',
      'You woke up. That is not guaranteed, and today it happened. Let that count. You have another day, unearned, simply given.',
      'You have a body that carried you into this morning. Perhaps not perfectly, but it brought you here. Let that count.',
      'You have people, somewhere, who matter to you and to whom you matter. Bring one to mind. Let that count.',
      'You have this day, largely unwritten, with room in it to act well, to help someone, to do the work that is yours. Let that count as the opportunity it is.',
      'Notice that you have not yet done anything, and already the account is full. This is the lens. You enter the day from enough, not from lack.',
      'One last breath. Now go into the day, spending from abundance rather than chasing a gap.',
    ],
    reflection:
      'Before your day fills up, list what you already have this morning that you did nothing to earn. How does it change the day ahead?',
  },
];

// ---------------------------------------------------------------------------
// PATHS
// ---------------------------------------------------------------------------

export const paths: Path[] = [
  {
    id: 'dichotomy-of-control',
    title: 'The Dichotomy of Control',
    description:
      'The foundational Stoic skill. Learn to feel the line between what answers to your choice and what does not, and to spend your strength only where it works.',
    theme: 'control',
    emoji: '⚖️',
    sessionIds: [
      'what-is-yours',
      'the-two-columns',
      'releasing-outcomes',
      'control-under-pressure',
    ],
  },
  {
    id: 'facing-adversity',
    title: 'Facing Adversity',
    description:
      'Meet obstacles as material rather than insult. Build the inner steadiness that turns setbacks into training and outlasts what cannot be fixed.',
    theme: 'adversity',
    emoji: '🪨',
    sessionIds: [
      'obstacle-as-path',
      'the-inner-citadel',
      'setback-reframe',
      'endurance-training',
    ],
  },
  {
    id: 'memento-mori',
    title: 'On Mortality (Memento Mori)',
    description:
      'Let the edge of life sharpen the middle of it. Use your finitude to cut through what does not matter and hold what does with an open hand.',
    theme: 'mortality',
    emoji: '⏳',
    sessionIds: [
      'this-could-be-the-last',
      'borrowed-time',
      'the-view-from-the-end',
      'gratitude-for-finitude',
    ],
  },
  {
    id: 'mastering-anger',
    title: 'Mastering Anger',
    description:
      'Win the small gap where anger is decided. Learn to expect people as they are, to refuse to become the wrong done to you, and to pull the verdict anger stands on.',
    theme: 'anger',
    emoji: '🔥',
    sessionIds: [
      'the-pause-before-reaction',
      'others-are-human',
      'cooling-the-flame',
      'anger-and-judgment',
    ],
  },
  {
    id: 'morning-evening-routine',
    title: 'Morning & Evening Routine',
    description:
      'Bookend your day the Stoic way. Rehearse the morning before it happens to you, and review the evening honestly before you set it down to rest.',
    theme: 'discipline',
    emoji: '🌅',
    sessionIds: [
      'morning-preparation-practice',
      'rising-to-the-work',
      'evening-review-practice',
      'the-days-accounting',
    ],
  },
  {
    id: 'fear-and-anxiety',
    title: 'Fear & Anxiety',
    description:
      'Stop suffering futures that have not happened. Turn toward what you dread, walk calmly through the worst case, and find your way back to the present.',
    theme: 'fear',
    emoji: '🧭',
    sessionIds: [
      'suffering-in-imagination',
      'premeditation-of-adversity',
      'the-worst-case-walk-through',
      'grounding-in-the-now',
    ],
  },
  {
    id: 'discipline-and-will',
    title: 'Discipline & Will',
    description:
      'Build discipline as self-trust rather than force. Do the hard thing first, choose discomfort on purpose, keep your word to yourself, and stay free of your cravings.',
    theme: 'discipline',
    emoji: '💪',
    sessionIds: [
      'the-first-hard-thing',
      'voluntary-discomfort-practice',
      'keeping-your-word',
      'desire-and-restraint',
    ],
  },
  {
    id: 'gratitude-and-enough',
    title: 'Gratitude & Enough',
    description:
      'Practice enough as an act rather than a finish line. Correct your sight so the ordinary becomes visible again, and start each day from abundance.',
    theme: 'gratitude',
    emoji: '🙏',
    sessionIds: [
      'enough-as-a-practice',
      'the-returned-gift',
      'counting-what-is-here',
      'the-morning-inventory',
    ],
  },
];

// ---------------------------------------------------------------------------
// DAILY REFLECTIONS (60)
// ---------------------------------------------------------------------------

export const dailyReflections: DailyReflection[] = [
  {
    day: 1,
    quote: {
      text:
        'Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions.',
      author: 'Epictetus',
      source: 'Enchiridion, 1',
    },
    prompt:
      'List one thing weighing on you. Circle the single part of it that answers to your choice today.',
  },
  {
    day: 2,
    quote: {
      text:
        'Men are disturbed not by the things which happen, but by the opinions about the things.',
      author: 'Epictetus',
      source: 'Enchiridion, 5',
    },
    prompt:
      'Write a bare fact from today with no adjectives. Then write the opinion you wrapped around it.',
  },
  {
    day: 3,
    quote: {
      text:
        'We suffer more often in imagination than in reality.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 13',
    },
    prompt:
      'What are you dreading that has not happened? How many past dreads arrived as badly as you pictured?',
  },
  {
    day: 4,
    quote: {
      text:
        'The best way of avenging thyself is not to become like the wrong doer.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 6.6',
    },
    prompt:
      'Where were you tempted to answer harshness with harshness? What would staying yourself look like?',
  },
  {
    day: 5,
    quote: {
      text:
        'It is not the man who has too little, but the man who craves more, that is poor.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 2',
    },
    prompt:
      'Name something you already have that would satisfy a past version of you. Sit with it as enough.',
  },
  {
    day: 6,
    quote: {
      text:
        'Since it is possible that thou mayest depart from life this very moment, regulate every act and thought accordingly.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 2.11',
    },
    prompt:
      'If today carried real weight, what would you stop giving your attention to?',
  },
  {
    day: 7,
    quote: {
      text:
        'A wall in front of you is also the ground you will climb. Meet it as material, not as insult.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What obstacle is in your way? What capacity could climbing it build that an easy road never would?',
  },
  {
    day: 8,
    quote: {
      text:
        'Do not demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well.',
      author: 'Epictetus',
      source: 'Enchiridion, 8',
    },
    prompt:
      'What outcome are you gripping? Write the effort that was fully yours, then loosen the grip one degree.',
  },
  {
    day: 9,
    quote: {
      text:
        'Never say of anything, I have lost it, but I have returned it.',
      author: 'Epictetus',
      source: 'Enchiridion, 11',
    },
    prompt:
      'Name something you treat as guaranteed. How would today change if you held it as something on loan?',
  },
  {
    day: 10,
    quote: {
      text:
        'In the morning when thou risest unwillingly, let this thought be present: I am rising to the work of a human being.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 5.1',
    },
    prompt:
      'What is the very first step of your morning that you tend to negotiate with? Commit to it.',
  },
  {
    day: 11,
    quote: {
      text:
        'It is in thy power whenever thou shalt choose to retire into thyself.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.3',
    },
    prompt:
      'When were you most scattered today? Describe one phrase that would call you back to your inner quiet.',
  },
  {
    day: 12,
    quote: {
      text:
        'It is not that we have a short time to live, but that we waste much of it.',
      author: 'Seneca',
      source: 'On the Shortness of Life',
    },
    prompt:
      'Where are you spending limited days as if they were unlimited? Name one hour you will not waste tomorrow.',
  },
  {
    day: 13,
    quote: {
      text:
        'If thou art pained by any external thing, it is not this thing that disturbs thee, but thy own judgement about it.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 8.47',
    },
    prompt:
      'Recall a moment pressure made you react. What was the raw event, and what judgement did you add?',
  },
  {
    day: 14,
    quote: {
      text:
        'Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 2.1',
    },
    prompt:
      'Who reliably angers you? Write the hidden expectation you hold them to that they never agreed to.',
  },
  {
    day: 15,
    quote: {
      text:
        'Every promise you keep to yourself is a deposit. Discipline is the balance you build by keeping more than you break.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Write one small, specific promise you can keep in the next day. How will you know you kept it exactly?',
  },
  {
    day: 16,
    quote: {
      text:
        'Do not act as if thou wert going to live ten thousand years. While thou livest, while it is in thy power, be good.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.17',
    },
    prompt:
      'What would your future self, looking back from the far end, thank you for doing with today?',
  },
  {
    day: 17,
    quote: {
      text:
        'A craving is a wave. You can watch it rise, crest, and pass while you stay on the shore.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Recall a craving you usually obey. What would watching it pass, without acting, have felt like?',
  },
  {
    day: 18,
    quote: {
      text:
        'Take away thy opinion, and then there is taken away the complaint, I have been harmed.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.7',
    },
    prompt:
      'Take a current anger and write the verdict beneath it. Is it fully true, or partly a story you added?',
  },
  {
    day: 19,
    quote: {
      text:
        'The task you most want to avoid is usually the one carrying the most of your day.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What task are you avoiding? Write its first concrete step and commit to doing it before easier work.',
  },
  {
    day: 20,
    quote: {
      text:
        'Set aside a certain number of days during which you shall be content with the scantiest fare, and say, Is this the condition that I feared?',
      author: 'Seneca',
      source: 'Letters to Lucilius, 18',
    },
    prompt:
      'What one small discomfort could you choose this week? What fear might it prove smaller than you thought?',
  },
  {
    day: 21,
    quote: {
      text:
        'The things you stopped noticing are the same things you would beg to have back.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Name one ordinary good you have stopped noticing. Describe it as if you just got it back.',
  },
  {
    day: 22,
    quote: {
      text:
        'At the end of the day, ask whether you acted well, because only that answer is yours to keep.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Name one thing you did well today and one you would do differently. What will you do when it returns?',
  },
  {
    day: 23,
    quote: {
      text:
        'Nothing, Lucilius, is ours, except time.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 1',
    },
    prompt:
      'Where did your time go today? Was it spent, or did it leak away without your noticing?',
  },
  {
    day: 24,
    quote: {
      text:
        'Fear lives in a time that is not here. Peace is usually waiting in the present.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Name three plain things around you right now. In this actual moment, what is true about your safety?',
  },
  {
    day: 25,
    quote: {
      text:
        'Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 5.16',
    },
    prompt:
      'What thought did you repeat most today? What color is it dyeing your mind?',
  },
  {
    day: 26,
    quote: {
      text:
        'The wall and the way are often the same stone.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Take one obstacle and find the single action it still leaves open to you. Name that action.',
  },
  {
    day: 27,
    quote: {
      text:
        'While we are postponing, life speeds by.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 1',
    },
    prompt:
      'What have you been postponing while telling yourself later is better? What would starting today look like?',
  },
  {
    day: 28,
    quote: {
      text:
        'Anger arrives fast, but it still needs your permission to act.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Recall the last time anger acted before you chose. If you had taken one breath, what might have changed?',
  },
  {
    day: 29,
    quote: {
      text:
        'They are slaves, people declare. Nay, rather they are men.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 47',
    },
    prompt:
      'Who did you treat today as less than fully human? What would it mean to see them as an equal?',
  },
  {
    day: 30,
    quote: {
      text:
        'Everything has two handles, the one by which it may be carried, the other by which it cannot.',
      author: 'Epictetus',
      source: 'Enchiridion, 43',
    },
    prompt:
      'Take one hard situation. What is the handle you have been gripping, and what is the other handle?',
  },
  {
    day: 31,
    quote: {
      text:
        'The feeling that you do not want to begin is not a reason to stay down.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What did reluctance talk you out of today? What is the first small motion that would move you through it?',
  },
  {
    day: 32,
    quote: {
      text:
        'It is not that we have a short time to live, but that we waste much of it.',
      author: 'Seneca',
      source: 'On the Shortness of Life',
    },
    prompt:
      'What did you spend today on that you would not miss? What deserved that time instead?',
  },
  {
    day: 33,
    quote: {
      text:
        'The mind reaches for what is missing by default. Gratitude is counting what is present instead.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Count three present goods, one from your body, one from your surroundings, one a person.',
  },
  {
    day: 34,
    quote: {
      text:
        'Men are disturbed not by the things which happen, but by the opinions about the things.',
      author: 'Epictetus',
      source: 'Enchiridion, 5',
    },
    prompt:
      'What disturbed you today? Separate the event from your opinion of it and hold them apart.',
  },
  {
    day: 35,
    quote: {
      text:
        'Endurance is learning to breathe steadily while it is still raining.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What season are you enduring? Write only the next single hour, and what carrying it well looks like.',
  },
  {
    day: 36,
    quote: {
      text:
        'Since it is possible that thou mayest depart from life this very moment, regulate every act and thought accordingly.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 2.11',
    },
    prompt:
      'What grudge or worry would lose its grip if you truly remembered your time is finite?',
  },
  {
    day: 37,
    quote: {
      text:
        'A fear you refuse to look at grows in the dark. A fear you examine in daylight turns out smaller.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Write your fear in the most specific words you can. Then write what you would actually do if it happened.',
  },
  {
    day: 38,
    quote: {
      text:
        'The best way of avenging thyself is not to become like the wrong doer.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 6.6',
    },
    prompt:
      'Where did someone lower themselves toward you today? How did you keep, or lose, your own conduct?',
  },
  {
    day: 39,
    quote: {
      text:
        'How you begin the day sets the lens for it. Start from enough, and the same day looks full.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'List what you already have this morning that you did nothing to earn. How does it reframe the day?',
  },
  {
    day: 40,
    quote: {
      text:
        'Do not demand that things happen as you wish, but wish that they happen as they do happen.',
      author: 'Epictetus',
      source: 'Enchiridion, 8',
    },
    prompt:
      'What are you demanding reality change? What would it mean to meet it as it actually is?',
  },
  {
    day: 41,
    quote: {
      text:
        'A day that is over asks nothing more of you.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What finished piece of today are you still carrying in your head? Write it here and set it down.',
  },
  {
    day: 42,
    quote: {
      text:
        'In the morning when thou risest unwillingly, let this thought be present: I am rising to the work of a human being.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 5.1',
    },
    prompt:
      'What is the work a human being is here to do that you can do today, however small?',
  },
  {
    day: 43,
    quote: {
      text:
        'The craving is the poverty, not the lack.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What are you craving more of right now? Is the discomfort the lack itself, or the wanting?',
  },
  {
    day: 44,
    quote: {
      text:
        'If thou art pained by any external thing, it is in thy power to wipe out this judgement now.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 8.47',
    },
    prompt:
      'What external thing pained you today? Try rewriting the judgement you gave it.',
  },
  {
    day: 45,
    quote: {
      text:
        'Rehearsing hardship is not pessimism. It is taking away its power to ambush you.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Walk your worst realistic case to the end. What would you do next, and what would remain standing?',
  },
  {
    day: 46,
    quote: {
      text:
        'It is in thy power whenever thou shalt choose to retire into thyself.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.3',
    },
    prompt:
      'When did you need your inner quiet today but forget you had it? What pulls you back to it fastest?',
  },
  {
    day: 47,
    quote: {
      text:
        'The obstacle in your way is the exact resistance your strength needs to grow.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What resistance are you resenting that is actually the load your strength is building against?',
  },
  {
    day: 48,
    quote: {
      text:
        'Never say of anything, I have lost it, but I have returned it.',
      author: 'Epictetus',
      source: 'Enchiridion, 11',
    },
    prompt:
      'What did you lose, or fear losing, recently? What changes if you say it was returned, not taken?',
  },
  {
    day: 49,
    quote: {
      text:
        'You do not have to endure the whole season today. You only have to endure today.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Where is your mind leaping ahead to the endless weeks? Bring it back to only this day. What does it need?',
  },
  {
    day: 50,
    quote: {
      text:
        'Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 2.1',
    },
    prompt:
      'Who will likely frustrate you tomorrow? Decide now, calmly, how you intend to meet them.',
  },
  {
    day: 51,
    quote: {
      text:
        'Motivation usually comes after you begin, not before.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What are you waiting to feel ready for? What is the first motion you could make before the readiness arrives?',
  },
  {
    day: 52,
    quote: {
      text:
        'We suffer more often in imagination than in reality.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 13',
    },
    prompt:
      'What imagined version of a future event are you living inside? What is actually true in the present?',
  },
  {
    day: 53,
    quote: {
      text:
        'The edge of your life is what makes each day worth anything at all.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Name one hour you spent well recently. Let its weight come from the fact that your hours are numbered.',
  },
  {
    day: 54,
    quote: {
      text:
        'Take away thy opinion, and the harm is taken away.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.7',
    },
    prompt:
      'Where do you feel harmed? Test whether the harm is the event itself or the opinion you attached to it.',
  },
  {
    day: 55,
    quote: {
      text:
        'You are not killing desire. You are discovering you can have it and not be commanded by it.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What desire commanded you today? What would having it, without obeying it, have looked like?',
  },
  {
    day: 56,
    quote: {
      text:
        'It is not the man who has too little, but the man who craves more, that is poor.',
      author: 'Seneca',
      source: 'Letters to Lucilius, 2',
    },
    prompt:
      'Where has your line called enough kept moving ahead of you? What here is already sufficient?',
  },
  {
    day: 57,
    quote: {
      text:
        'The examined fear has a shape, and shapes can be met.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'Name a vague dread precisely. Notice how naming its edges changes how large it feels.',
  },
  {
    day: 58,
    quote: {
      text:
        'Do not act as if thou wert going to live ten thousand years.',
      author: 'Marcus Aurelius',
      source: 'Meditations, Book 4.17',
    },
    prompt:
      'What are you postponing as if you had endless time? What would doing it now cost, and what would waiting cost?',
  },
  {
    day: 59,
    quote: {
      text:
        'Gratitude is not forced positivity. It is corrected sight.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'What is one thing you saw clearly today only because you slowed down to look? Describe it.',
  },
  {
    day: 60,
    quote: {
      text:
        'You have this run of days, and it is enough to live well if you stop treating it as a rehearsal.',
      author: 'Amor del Fato',
      source: 'Original guidance',
    },
    prompt:
      'After sixty days of practice, what is one Stoic habit that has actually changed how you meet a hard moment?',
  },
];

// ---------------------------------------------------------------------------
// EXERCISES
// ---------------------------------------------------------------------------

export const exercises: Exercise[] = [
  {
    id: 'dichotomy-of-control',
    title: 'The Dichotomy of Control',
    premise:
      'The core Stoic sort. Peace and effectiveness both come from spending yourself only on what answers to your choice, and meeting the rest with an open hand.',
    steps: [
      'Take the situation that is troubling you and write it at the top of a page.',
      'Draw two columns beneath it, one titled up to me, the other titled not up to me.',
      'List every piece of the situation and drop each into exactly one column. Your effort, attention, and choices go left. Other people, outcomes, and events go right.',
      'Look at the right column and, on purpose, set it down. You are not abandoning the situation, you are returning the parts that were never yours to carry.',
      'Look at the left column and pick the single most useful action in it. Commit to doing that today.',
      'When you notice yourself gripping something from the right column, name it out loud as not mine, and return your attention to the left.',
    ],
  },
  {
    id: 'negative-visualization',
    title: 'Negative Visualization (Premeditatio Malorum)',
    premise:
      'Deliberately imagining loss and hardship before it happens does two things at once. It softens the fear of the hardship, and it refreshes your gratitude for what you still have.',
    steps: [
      'Choose one thing you value and tend to take for granted. A person, your health, your work, your home.',
      'Sit quietly and imagine, calmly and concretely, that it was gone. Do not dramatize it, just picture the plain fact of its absence.',
      'Stay with the imagined loss long enough to feel it. Notice what you would miss, and what you would give to have it back.',
      'Now return to the present, where the thing is still here, and let the relief become gratitude. See it freshly, as something on loan rather than owned.',
      'For a feared future event, follow it instead to its worst realistic outcome, then ask, if this happened, what would I actually do next.',
      'Close by noticing that you have both loosened a fear and sharpened your appreciation, without anything external having to change.',
    ],
  },
  {
    id: 'view-from-above',
    title: 'The View From Above',
    premise:
      'Zooming out to see your life from a great height shrinks your troubles to their true size and reconnects you to the larger whole you are part of.',
    steps: [
      'Close your eyes and picture yourself where you are sitting right now.',
      'Slowly rise in your imagination, until you can see the whole building, then the town, then the region spread out below.',
      'Keep rising until you see the curve of the earth, the continents, the vast turning world with billions of lives on it, each as vivid to them as yours is to you.',
      'From this height, look back at the problem that felt so large. Notice its true proportion against the scale of everything.',
      'Hold both truths at once. Your problem is real and worth your care, and it is also small, and both being true is a relief, not a dismissal.',
      'Descend slowly back to your body, carrying the wider perspective with you into the ordinary size of your day.',
    ],
  },
  {
    id: 'evening-review',
    title: 'The Evening Review',
    premise:
      'The Stoic Seneca ended each day by putting his own conduct on trial before himself, honestly and without cruelty, so that every day became a teacher.',
    steps: [
      'At the close of the day, sit quietly and let the day replay from waking until now, without defending or narrating it.',
      'Ask first, where did I act well today. Name the moments plainly and let yourself acknowledge them. This is accurate accounting, not vanity.',
      'Ask next, where did I fall short. Name these without cruelty, as a coach reviewing the tape, not a judge handing down a sentence.',
      'For each shortfall, replace guilt with a plan. Ask, what will I do differently when this comes again, and answer concretely.',
      'Keep the tone of an honest friend, kind enough that you keep looking, truthful enough that you actually learn.',
      'When the review is done, deliberately set the day down. You have taken its lesson, and carrying it further only steals your rest.',
    ],
  },
  {
    id: 'morning-preparation',
    title: 'Morning Preparation',
    premise:
      'Meeting the day on purpose, before it happens to you, lets you choose your posture in advance so that you respond deliberately instead of merely reacting.',
    steps: [
      'Before the day fills up, sit for a few minutes and take a slow breath. Acknowledge any reluctance, then remember what you are rising to do.',
      'Walk quickly through the day ahead in your mind and see the main things you will meet, the tasks and the people.',
      'Name the points of likely friction. A hard conversation, a tempting shortcut, a person who tends to provoke you.',
      'For each friction, set a small intention in advance. In that conversation I will stay steady. At that shortcut I will do it right.',
      'Set one clear aim for the whole day that is within your control, not that everything goes well, but that you meet whatever comes as the person you want to be.',
      'Take a final breath and enter the day already having chosen your stance, so that you are choosing rather than being dragged.',
    ],
  },
  {
    id: 'voluntary-discomfort',
    title: 'Voluntary Discomfort',
    premise:
      'Choosing small hardships on purpose, as Seneca did, proves that you could survive far less than you have. That proof dissolves the fear of loss and sharpens gratitude for comfort.',
    steps: [
      'Choose one small, safe discomfort to practice this week. A cold end to a shower, a plain and simple meal, a day without something you lean on.',
      'Before you begin, remind yourself that this is training, not punishment, and that its purpose is freedom, not suffering.',
      'Enter the discomfort deliberately and stay present inside it. Notice that you are uncomfortable and, at the same time, fundamentally fine.',
      'In the middle of it, ask Seneca question. Is this the condition that I so feared. Notice how much smaller the reality is than the dread was.',
      'When you return to comfort, pause and actually feel it, letting the contrast turn ordinary ease into something you clearly appreciate.',
      'Repeat regularly in small doses, so that the fear of losing comfort steadily loses its power over your choices.',
    ],
  },
];
