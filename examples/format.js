var json2plain = require('../lib/json2plain');
var plain2json = require('../lib/plain2json');

var json = {
  "key1":{"lol":{"key1innerkey1":"val1293","key1innerkey2":"val9230"}},
  "key2":{"pop":"nope"},
  "key3":"queen",
  "key4":["run","go","come"],
  "key5":{"nag":["piom","treat","ish","cone"]},
  "key6":900,
  "poop":{"why":"me"},
  "p":"i know right",
  "o":{"nope":"yep","prince":"harry","df":"dfdf"},
  "tup":"tuk true",
  "new":{"red":"car","love":"harry"}
};

function space2underline(string) {
  return string.replace(/ /g, "_");
}

var options = {
  list: '##',
  value: '$$',
  formatKey: space2underline
};

var plain = json2plain(json, options);
console.log(plain + '\n');

var json = plain2json(plain);
json = '{' + json + '}'
console.log(json);
console.log(JSON.parse(json));