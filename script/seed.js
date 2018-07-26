'use strict';

const db = require('../server/db');
const { User, Product } = require('../server/db/models');

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
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
      name: 'Pickle Rick',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/265.jpeg',
      description: `Pickle Rick is a version of Rick Sanchez. His only functional body parts are his eyes and a mouth. This situation forces him to create gruesome means of transportation.`,
      price: 9999999.0,
    }),
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${characters.length} characters`);
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
