const bcrypt = require('bcryptjs');

let { genSalt, hash, compare } = bcrypt;
const { promisify } = require ('util');

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

module.exports.compare = compare;
module.exports.hash = plainText => genSalt().then(salt =>(hash(plainText, salt)));

/*
Setting module.exports allows the database_module function to be called like a
function when required. Simply setting exports wouldn't allow the function to be
exported because node exports the object module.exports references.
The following code wouldn't allow the user to call the function.
*/