const path = require('path');

const people = `
Name          |  NEUID      |  Slack handle    | github username
Xinyu Jiang   |  001548315  |  @Xinyu Jiang    | NyahJ

`.split('\n') // convert to array of lines
.filter( line => !!line.replace(/\s/g,'' )); // Remove empty lines

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
