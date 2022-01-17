export const Tweets: Record<string, Array<string>> = {
  ["Charge RPG"]: [
    `
You want to start a new campaign, but you don't know which system to use? You should check-out Charge RPG! 

It's free, open and developed by the Fari community. 

Check it out below! https://fari-rpgs.itch.io/charge-rpg
`,
    `
If you're familiar with Blades in the Dark, picking up Charge RPG is going to be a lot easier than you think.

Charge is built on the same core FitD, but with a new twist

It's free to play, and it's open source! https://fari-rpgs.itch.io/charge-rpg
`,
    `
Charge RPG is a free, open and generic role-playing game.

⚡ It's free as in beer.
⚡ You can use it in any setting.
⚡ It's maintained by a community, which means anyone can contribute to it.

https://fari-rpgs.itch.io/charge-rpg
`,
  ],
  ["Newsletter"]: [
    `
Did you know I have a newsletter? Yeah that's right!

Subscribe now to get notified when I release a new game!

https://fari-rpgs.com/newsletter
    `,

    `
I'm working on a new project and its going to be AMAZING!

Subscribe to my newsletter to get notified when it's out!

https://fari-rpgs.com/newsletter
    `,
    `
If you follow me on itch, you should also subscribe to my newsletter!

You'll be sure to never miss when I release new games!

https://fari-rpgs.com/newsletter
`,
    `
HEY! I have a newsletter!

Subscribe now to get notified when I release all the cool stuff I'm working on!

https://fari-rpgs.com/newsletter
`,
  ],
  ["Charge SRD"]: [
    `
Making your own TTRPG has never been this easy.

Copy and fill-in the gaps from the Charge SRD to make an impactful game with forward momentum.

Download now! https://fari-rpgs.itch.io/charge-srd
`,

    `
Featured by Dice Breaker as one of the best tabletop RPG systems to hack into a custom game, Charge is the SRD you are looking for.

It's "fill-in-the-gaps" format makes it super easy to get started in making your own game.

Read for free! https://fari-rpgs.itch.io/charge-srd
`,

    `
If you want to make your own TTRPG, you should check-out the Charge SRD.

Take its core and fill-in the gaps to make the game you've always wanted.

Read for free! https://fari-rpgs.itch.io/charge-srd
`,
    `
Tons of people are currently making really cool stuff using the Charge SRD.

Y'all have no idea how this makes me happy.

If you also want to make an impactful game with forward momentum, check it out below! https://fari-rpgs.itch.io/charge-srd
`,
  ],
  ["HOPES & DREAMS"]: [
    `
War is brewing. Tension is rising. Everyone knows it, but the older folks aren’t doing anything about it. 

Living in the Wasteland is not living, it’s surviving. 

We’ve got to do something for our future, because nobody else will.

https://fari-rpgs.itch.io/hopes-and-dreams
`,

    `
HOPES & DREAMS is a rules-lite ttrpg where you play as young adults who want to make a difference in a world that won’t let them. 

Government officials are corrupted, and the future looks bleak. 

It's time to do something, Dreamer! https://fari-rpgs.itch.io/hopes-and-dreams
`,
  ],
  ["The Path Of The Wolves"]: [
    `
If you love the #Witcher universe, you should check out The Path of the Wolves!

It's hack of Charge RPG that's ready to use so you can slay monsters either silver or steel! 

Available for free! https://fari-rpgs.itch.io/the-path-of-the-wolves
`,
    `
If you like slaying monsters and brewing potions, I've got something for you.

The Path Of The Wolves is a hack of Charge RPG to play within the #Witcher universe.

Check it out, it's free! https://fari-rpgs.itch.io/the-path-of-the-wolves
`,
    `
Silver for monster, steel for men.

Play as a Wolf and slay some monsters in this #Witcher hack of Charge RPG.

Download for free! https://fari-rpgs.itch.io/the-path-of-the-wolves
`,
    `
The #Witcher universe is so cool.

If you want to play a TTRPG game in this super interesting world, check out The Path of the Wolves!

Download for free! https://fari-rpgs.itch.io/the-path-of-the-wolves
`,
  ],
  ["Charge Creation Jam"]: [
    `
It's TIME TO JAM!

That's right, the #ChargeCreationJam has already started!

You have until March 31st to submit your game/extra!

Let's do it! ⚡⚡ https://itch.io/jam/charge-creation-jam
`,

    `
You've just finished your latest project, and are looking for a new project?

Join the #ChargeCreationJam!

You have until March 31st to submit something either powered or compatible with Charge! https://itch.io/jam/charge-creation-jam
    `,

    `
+40 designers already joined the #ChargeCreationJam!

You too can make a game using the super simple #ChargeSRD

Join the jam now! https://itch.io/jam/charge-creation-jam
`,

    `
We're currently looking for more designers to join the #ChargeCreationJam.

It's simple: make something either powered or compatible with Charge and publish it on itch!

Join 40+ designers and submit your game! https://itch.io/jam/charge-creation-jam
`,
  ],
  ["Compatible With Charge"]: [
    `
The Charge Party Extra by @therabidbanana is a fantastic addition to the core game.

It uses a Party Sheet to track assets, allies, and enemies.

This makes it SO MUCH EASIER to define the position/effect of action rolls.

https://therabidbanana.itch.io/charge-party-extra
    `,
    `
If you're looking for an additional way to represent dangerous threats in your Charge game, checkout the Threat Level extra by Othelarian.

It uses an opposed dice pool to hinders the player's efforts.

https://othelarian.itch.io/charge-extra-threat-level
    `,
  ],
  ["Powered By Charge"]: [],
  ["Patreon"]: [
    `
Patreon supporters at any level get access all my games for free.

Become a Patron for starting at 1$ per month! https://fari-rpgs.com/patreon
`,
  ],
};

function validateAllTweetsLength() {
  const keys = Object.keys(Tweets);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const tweets = Tweets[key];
    tweets.forEach((tweet) => {
      if (tweet.length > 280) {
        const error = {
          message: `Tweet "${key}" is too long!`,
          length: tweet.length,
          tweet,
        };
        throw error;
      }
    });
  }
}

validateAllTweetsLength();
