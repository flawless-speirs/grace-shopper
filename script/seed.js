'use strict';

const db = require('../server/db');
const { User, Product, Tag } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ email: 'kevin@email.com', password: '123' }),
    User.create({ email: 'andrew@email.com', password: '123' }),
    User.create({ email: 'michael@email.com', password: '123' }),
    User.create({ email: 'rick@email.com', password: '123' }),
    User.create({ email: 'server@server.com', password: '123' }),
  ]);

  const characters = await Promise.all([
    Product.create({
      name: 'Rick Sanchez',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      description: `Rick Sanchez is a genius scientist whose alcoholism and reckless, nihilistic behavior are a source of concern for his daughter's family, as well as the safety of their son, Morty.`,
      price: 10000.0,
    }),
    Product.create({
      name: 'Morty Smith',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      description: `Mortimer "Morty" Smith Sr. is one of the two eponymous main protagonists in Rick and Morty. He is the grandson of Rick and is often forced to tag along on his various misadventures. Morty attends Harry Herpson High School along with his sister, Summer.`,
      price: 50.0,
    }),
    Product.create({
      name: 'Summer Smith',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      description: `Summer Smith is the daughter of Jerry Smith and Beth Smith, the older sister of Morty Smith, the granddaughter of Leonard Smith, Joyce Smith, Rick Sanchez and Mrs. Sanchez/Diane Sanchez, the great-granddaughter of Rick's Father and a unnamed woman, and the great-niece of the Unnamed Uncle, she currently acts as the older sister and the granddaughter of the Morty Smith and Rick Sanchez from Dimension C-137. She is the only other member of the Smith Family to be aware of that fact.`,
      price: 300.0,
    }),
    Product.create({
      name: 'Beth Smith',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
      description: `Beth Smith (née Sanchez) is the daughter of Rick Sanchez and Mrs. Sanchez/Diane Sanchez, the wife of Jerry Smith, and the mother of Summer Smith and Morty Smith, she is also the daughter-in-law of Leonard Smith and Joyce Smith, and the granddaughter of Rick's Father and a unnamed woman. She currently acts as the mother and the daughter of the Morty Smith and Rick Sanchez from Dimension C-137, respectively. She is currently employed as a veterinary surgeon at St. Equis Hospital.
      Characterized by a superiority complex and abandonment issues, Beth gradually came to struggle with her husband over his contributions to their marriage, due in part to his lower-level position and subsequent employment, further driven by her father influencing her feelings of superiority. Since their divorce, she has focused on raising her two children. However, by the finale she decides to reconnect with Jerry and they are living together with their children and her father.`,
      price: 2500.0,
    }),
    Product.create({
      name: 'Jerry Smith',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
      description: `Jerry Smith is the husband of Beth Smith, the father of Summer Smith and Morty Smith, and the son-in-law of Rick Sanchez and Mrs. Sanchez/Diane Sanchez, he is also the son of Leonard Smith and Joyce Smith, and the nephew of the Unnamed Uncle, he currently acts as the father and the son-in-law of the Morty Smith and Rick Sanchez from Dimension C-137, respectively. He shares the same history as his C-137 counterpart until the Cronenberg disaster, where it was averted in his dimension.
      Jerry always tries to think of the best interest of the family, but his attempt to be the patriarch of the family can often be misguided by his self-centered nature. This causes him a great deal of conflict with Rick, as his father-in-law clearly has no respect for him whatsoever.`,
      price: 0.01,
    }),
    Product.create({
      name: 'Blim Blam',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/50.jpeg',
      description: `Blim Blam is a Korblock murderer who eats babies, and apparently traveled to Earth to do so. He was eventually captured and chained up by Rick in an attempt to cure Blim Blam's "space AIDS" in order to become rich selling the cure. He was discovered by Beth and Jerry, however, and the two's bickering annoyed Blim Blam to the point that he broke free, berated the two by using a translation device Rick had (as he could only speak in alien beforehand), and then left promising never to return to Earth.`,
      price: 100000.0,
    }),
    Product.create({
      name: 'Cronenberg Rick',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/82.jpeg',
      description: `Cronenberg Rick is a version of Rick Sanchez who originates from Cronenberg World. In the episode "Rick Potion No. 9" Cronenberg Rick and Cronenberg Morty take a portal to Earth C-137 after they discovered that C-137 Rick turned the entire population of Earth, except Beth, Jerry and Summer, into Cronenbergs. Cronenberg Rick and Cronenberg Morty did this because they turned the entire population of Cronenberg World into normal Humans and wanted a world where they would fit in.`,
      price: 1000.0,
    }),
    Product.create({
      name: 'Cronenberg Morty',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/83.jpeg',
      description: `Cronenberg Morty is a version of Morty Smith who originates from Cronenberg World. In the episode "Rick Potion No. 9", Cronenberg Rick and Cronenberg Morty take a portal to Earth C-137 after they discovered that C-137 Rick turned the entire population of Earth, except Beth, Jerry and Summer, into Cronenbergs. Cronenberg Rick and Cronenberg Morty did this because they turned the entire population of Cronenberg World into normal Humans and wanted to live in a world where they would fit in.`,
      price: 5.0,
    }),
    Product.create({
      name: 'Hamurai',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/154.jpeg',
      description: `Hamurai was a false character, portrayed by the Alien Parasites. He was mentioned to have gone to college with Reverse Giraffe.`,
      price: 75.0,
    }),
    Product.create({
      name: 'Ice-T',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/162.jpeg',
      description: `Ice-T (also known as Tracy Lauren Marrow), is a well-known human rapper on Earth, who is actually an ageless wandering alien from the dawn of time known as Water-T.`,
      price: 8000.0,
    }),
    Product.create({
      name: 'Morty Jr.',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/230.jpeg',
      description: `Mortimer "Morty" Smith Jr. is Morty Smith's son. Morty Jr. grew from an infant to a full adult at a hyper-increased rate, allowing him to quickly outgrow his father.`,
      price: 799.99,
    }),
    Product.create({
      name: 'Mr. Beauregard',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/236.jpeg',
      description: `Mr. Beauregard is the Smith family butler and saves the family and Cousin Nicky when they are captured by a Nazi. He helps Jerry Smith dislodge his head when it's stuck between the railings on the stairs, as well as attends Morty Smith's dance as his date. Like many of the other characters in the episode, he is a persona created by the Alien Parasites.`,
      price: 19.99,
    }),
    Product.create({
      name: 'Mr. Meeseeks',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/242.jpeg',
      description: `Mr. Meeseeks (voiced by Justin Roiland) is the name of all the Meeseeks summoned by activating a Meeseeks Box. The Meeseeks appear in the fifth episode of the first season, "Meeseeks and Destroy". They are known to inhabit planets across the universe.`,
      price: 600.0,
    }),
    Product.create({
      name: 'Pickle Rick',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/265.jpeg',
      description: `Pickle Rick is a version of Rick Sanchez. His only functional body parts are his eyes and a mouth. This situation forces him to create gruesome means of transportation.`,
      price: 9999999.0,
    }),
    Product.create({
      name: 'Shnoopy Bloopers',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/320.jpeg',
      description: `Shnoopy Bloopers is an alien friend of Rick's who made his first appearance in "The Whirly Dirly Conspiracy." He is the owner of an unnamed restaurant in the Immortality Field Resort.`,
      price: 27.5,
    }),
    Product.create({
      name: 'Squanchy',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/331.jpeg',
      description: `Squanchy is a cat-like anthropomorphic creature that was invited to Rick and Summer's party in "Ricksy Business". He is a recurring character in Rick and Morty, and very good friends with Rick, sharing his love for alcohol.`,
      price: 2.0,
    }),
    Product.create({
      name: 'Pizza Person',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/424.jpeg',
      description: `An anthropomorphized slice of pizza with arms, legs, eyes, and a mouth.`,
      price: 99.99,
    }),
    Product.create({
      name: 'Phone Person',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/428.jpeg',
      description: `An anthropomorphized phone with arms, legs, eyes, and a mouth.`,
      price: 99.99,
    }),
    Product.create({
      name: 'Diane Sanchez',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/94.jpeg',
      description: `Diane Sanchez is a hypothetical version of the ex-wife of Rick Sanchez, the mother of Beth Smith, the mother-in-law of Jerry Smith, and the maternal grandmother of Summer Smith and Morty Smith, who appeared in a memory projection in "The Rickshank Rickdemption". She and her daughter Beth are both killed by a bomb sent by another Rick.`,
      price: 50000.0,
    }),
    Product.create({
      name: 'Birdperson',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
      description: `Birdperson, currently known as Phoenixperson, is a recurring character in Rick and Morty. He is an old friend of Rick's and has seemingly known Morty since he was a baby. He attends Rick's party looking for a new mate after ending his soul-bond with his previous spirit-partner. At the end of the episode, he gets back in the saddle with one of Summer's high school friends, Tammy.`,
      price: 20000.0,
    }),
    Product.create({
      name: 'Ants in my Eyes Johnson',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg',
      description: `Ants in my Eyes Johnson is a store owner who appears in a commercial in Rixty Minutes for his electronics store.`,
      price: 34.99,
    }),
    Product.create({
      name: 'Unity',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/372.jpeg',
      description: `Unity is a collective hivemind and Rick Sanchez's former lover. It is a powerful entity that can control minds, and form alliances. It takes the forms of multiple genders, races, and likely species, but uses both male and female avatars, including around Rick. Unity first appeared in "Auto Erotic Assimilation", where it briefly gets back together with Rick, only for them to separate again at the end of the episode.`,
      price: 60000.0,
    }),
    Product.create({
      name: 'Gear Cop',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/448.jpeg',
      description: `A bio-mechanical alien whose biology, technology, and society is built largely on gears.`,
      price: 2000.0,
    }),
    Product.create({
      name: 'King Jellybean',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/193.jpeg',
      description: `King Jellybean (also referred to as Mr. Jellybean) was a character featured in the episode "Meeseeks and Destroy". King Jellybean was a giant anthropomorphic jelly bean. It was later revealed that he was the king of a poor village that Rick and Morty agreed to help.`,
      price: 0.02,
    }),
    Product.create({
      name: 'Sleepy Gary',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/324.jpeg',
      description: `Sleepy Gary (possibly Gary Smith) was a false character created by the Alien Parasites who invaded the Smith house. He passes himself off as a member of the immediate family, as well as Jerry's lover.`,
      price: 999.99,
    }),
    Product.create({
      name: 'Fart',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/122.jpeg',
      description: `Fart is a gaseous being who appeared in the episode "Mortynight Run". Although technically nameless, it took on the name "Fart" for convenience after Rick insulted it. It communicates through telepathy.`,
      price: 894.99,
    }),
    Product.create({
      name: 'Mr. Needful',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/243.jpeg',
      description: `Mr. Lucius Needful, (also known as the Devil), is the main antagonist of "Something Ricked This Way Comes". Lucius is an eccentric gentleman who runs a vintage antique shop called Needful Things. He hires Summer to help work around the shop, which sells merchandise that curses people.`,
      price: 666.66,
    }),
    Product.create({
      name: 'Abradolf Lincler',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
      description: `Abradolf Lincler is a humanoid experiment debuting in Ricksy Business. He was created when Rick combined the DNA of Abraham Lincoln and Adolf Hitler, in an attempt to create a morally neutral super leader. He failed and the end result was a cognitively dissonant and morally-confused emotional trainwreck.`,
      price: 9.99,
    }),
    Product.create({
      name: 'Shrimply Pibbles',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/321.jpeg',
      description: `Shrimply Pibbles is the galaxy's most influential civil rights leader.`,
      price: 5000.0,
    }),
    Product.create({
      name: 'Scary Terry',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/306.jpeg',
      description: `Scary Terry is a character that appeared as the secondary antagonist in the episode "Lawnmower Dog" and the comic story Morty and Rick in: Mortballs. After a failed attempt at killing them, Scary Terry retreats and heads home. While he is asleep, Rick and Morty incept his dreams and befriend him, he is also the husband of Melissa, and the father of Scary Brandon.`,
      price: 9000.0,
    }),
  ]);

  const tags = await Promise.all([
    Tag.create({ tagName: 'smith' }),
    Tag.create({ tagName: 'rick' }),
    Tag.create({ tagName: 'morty' }),
    Tag.create({ tagName: 'alien' }),
    Tag.create({ tagName: 'ricks_friend' }),
    Tag.create({ tagName: 'miscellaneous' }),
  ]);

  await Promise.all([
    characters[0].addTags([tags[0], tags[1]]),
    characters[1].addTags([tags[0], tags[2]]),
    characters[2].addTags(tags[0]),
    characters[3].addTags(tags[0]),
    characters[4].addTags(tags[0]),
    characters[5].addTags(tags[3]),
    characters[6].addTags(tags[1]),
    characters[7].addTags(tags[2]),
    characters[8].addTags(tags[3]),
    characters[9].addTags(tags[3]),
    characters[10].addTags(tags[2]),
    characters[11].addTags(tags[3]),
    characters[12].addTags(tags[3]),
    characters[13].addTags(tags[1]),
    characters[14].addTags(tags[4]),
    characters[15].addTags(tags[4]),
    characters[16].addTags(tags[5]),
    characters[17].addTags(tags[5]),
    characters[18].addTags(tags[0]),
    characters[19].addTags(tags[4]),
    characters[20].addTags(tags[5]),
    characters[21].addTags(tags[4]),
    characters[22].addTags(tags[3]),
    characters[23].addTags(tags[3]),
    characters[24].addTags(tags[3]),
    characters[25].addTags(tags[3]),
    characters[26].addTags(tags[3]),
    characters[27].addTags(tags[4]),
    characters[28].addTags(tags[3]),
    characters[29].addTags(tags[4]),
  ]);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log('CHARACTER:', characters[0]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${characters.length} characters`);
  console.log(`seeded ${tags.length} tags`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
