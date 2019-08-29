var json2plain = require('../');

var json = {
  "key1":{"lol":{"key1innerkey1":"val1293","key1innerkey2":"val9230"}},
  "key2":{"pop":"nope"},
  "key3":"queen",
  "key4":["run","go","come"],
  "key5":{"nag":["piom","treat","ish","cone"]},
  "key6":900,
  "key7":{"joy":[{"rita":"joh","opera":"mini"},{"rita":"jude","opera":"lala"}]},
  "poop":{"why":"me"},
  "p":"i know right",
  "o":{"nope":"yep","prince":"harry"},
  "q":{"dock":[{"why":"it"},{"why":"rim"}]},
  "tup":"tuk true",
  "new":{"red":"car","love":"harry"},
  "quit":{"doing":[{"all":"them"},{"all":"view"}]}
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
console.log(plain);