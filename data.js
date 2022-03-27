if (!localStorage.getItem("story")) {
  localStorage.setItem("story", 1);
}
window.data = {
  mood: 3,
  story: [
    {
      id: 1,
      text: "You are asleep",
      choices: [
        {
          title: "KEEP SLEEPING",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
          mood: 0,
        },
        {
          title: "WAKE ME UP (WAKE ME UP INSIDE)",
          cost: 20,
          unlocked: false,
          nextStoryId: 2,
          mood: 0,
        },
      ],
    },
    {
      id: 2,
      text: "You are awake",
      choices: [
        {
          title: "STAY IN BED",
          cost: 0,
          unlocked: false,
          nextStoryId: 2,
          mood: 0,
        },
        {
          title:
            "STAY IN BED BUT START CHECKING EMAILS/ THINKING ABOUT YOUR DAY",
          cost: 20,
          unlocked: false,
          nextStoryId: 3,
          mood: 0,
        },
        {
          title: "GET UP",
          cost: 200,
          unlocked: false,
          nextStoryId: 3,
          mood: 0,
        },
      ],
    },
    {
      id: 3,
      text: "You get up",
      choices: [
        {
          title: "WHY DID I GET UP? EVERYTHING IS AWFUL. BACK TO BED",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
          mood: 0,
        },
        {
          title:
            "WHY DID I GET UP? EVERYTHING IS AWFUL. GUESS I GOTTA GET GOING ON THIS HORRIBLE TERRIBLE VERY BAD NO GOOD DAY",
          cost: 100,
          unlocked: false,
          nextStoryId: 4,
          mood: 0,
        },
        {
          title:
            "OOO REALLY VIBIN THIS MORNING GONNA KISS MY PLANTS AND MAKE SOME COFFEE",
          cost: 200,
          unlocked: false,
          nextStoryId: 4,
          mood: 0.5,
        },
      ],
    },
    {
      id: 4,
      text: "You walk to the living room to make coffee. Maybe you kiss your plants, I dunno. It’s a weekday in the post-Covid era, so you have work in an hour or so, but the Soft kind of Work where you get to do it from home, so no one is really going to encounter your corporeal being.",
      choices: [
        {
          title: "WATCH TV FOR AS LONG AS HUMANLY POSSIBLE",
          cost: 0,
          unlocked: false,
          nextStoryId: 5,
        },
        {
          title: "GO TO START POKING AROUND YOUR WORK FOR THE DAY",
          cost: 100,
          unlocked: false,
          nextStoryId: 9,
        },
        {
          title: "TAKE A SHOWER,BRUSH TEETH, GET DRESSED",
          cost: 200,
          unlocked: false,
          nextStoryId: 9,
        },
      ],
    },
    {
      id: 5,
      text: "You watch a new episode of something in the 90-day-fiance universe and contemplate if you can afford to call in sick today. Mentally unwell counts as sick, right!??!",
      choices: [
        {
          title: "DO NOTHING BUT STRESS AAAAA",
          cost: 0,
          unlocked: false,
          nextStoryId: 6,
        },
        {
          title: "CALL IN 'SICK'",
          cost: 100,
          unlocked: false,
          nextStoryId: 8,
        },
        {
          title:
            "SHUFFLE TO YOUR DESK, COFFEE IN HAND, JUST IN TIME FOR YOUR MORNING MEETING",
          cost: 200,
          unlocked: false,
          nextStoryId: 9,
        },
      ],
    },
    {
      id: 6,
      text: "Oh no! You fell asleep in a weird position on a ¾ full beanbag for the whole day and now it’s Dark outside. You check your slack and you have several messages from your boss and your coworkers. You check your phone to find several more messages from your friends asking if you’re ok.",

      choices: [
        {
          title: "GO TO BED ",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
        },
        {
          title: "RESPOND TO THE MESSAGES",
          cost: 200,
          unlocked: false,
          nextStoryId: 7,
        },
      ],
    },
    {
      id: 7,
      text: "You type out a smol response to your friends and your boss, apologizing for being MIA and telling them that you’ll be back attem tomorrow (you hope). This takes all of your energy, so back to bed, try again tomorrow.",

      choices: [
        {
          title: "GO TO BED ",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
        },
      ],
    },
    {
      id: 8,
      text: "You send a feeble slack message to your boss, letting them know that you have a “huge migraine” and that you’re too sick to work. In reality, you have Mental Illness, and you are too Depressed to Work. Back to bed, try again tomorrow.",

      choices: [
        {
          title: "GO TO BED ",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
        },
      ],
    },
    {
      id: 9,
      text: "Congratulations! You made it to your meeting! The bare minimum. Today you’re talking about thunks or arrays or linked lists or something. You’re not really sure anymore - the days all blend together.",

      choices: [
        {
          title: "KEEP CAMERA OFF + JUST LISTEN TO MORNING MEETING",
          cost: 0,
          unlocked: false,
          nextStoryId: 10,
        },
        {
          title: "KEEP CAMERA OFF + CHIME IN WHEN NECESSARY'",
          cost: 100,
          unlocked: false,
          nextStoryId: 11,
        },
        {
          title: "CAMERA ON + YOURE TRYING TO CRACK A FEW JOKES",
          cost: 200,
          unlocked: false,
          nextStoryId: 11,
        },
      ],
    },
    {
      id: 10,
      text: "You make it through the meeting without having to interact with or be seen by anyone. You work on solo tasks for the rest of the day. By the time you’re done with work, it’s dark outside.",

      choices: [
        {
          title: "GO TO BED",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
        },
      ],
    },
    {
      id: 11,
      text: "You’re starting to (very slowly) get into the swing of the day. Maybe you have some Things to Add that are Valuable even. You even get really ambitious and schedule another meeting for later in the day, as it’s been on your to-do list and majorly stressing you out. Before you know it…",

      choices: [
        {
          title: "ITS MEETING TIME",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
        },
      ],
    },
    {
      id: 12,
      text: "You enter the zoom waiting room and start to panic. There’s a reason you’ve been putting this off - you have to meet a new mentor. Its hard. It’s stressful. It’s a chance to be minimized or questioned. You take a deep breath and swallow down the lump in your throat. You’re charming, you’re great at advocating for yourself, and you can communicate your needs super clearly and logically. Its all going to be fine, right?",
      choices: [
        {
          title: "ITS MEETING TIME",
          cost: 0,
          unlocked: false,
          nextStoryId: 1,
        },
      ],
    },
  ],
};
