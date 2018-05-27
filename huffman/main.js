var fs = require("fs");
var Huffman = require("./huffman.js");

var text = fs.readFileSync("./input.txt").toString();
var tree = new Huffman(text);

//Encode
var encoded = tree.encode();
fs.writeFile("./encoded.txt", encoded, err => err && console.log(err));

//Decode
var decoded = tree.decode(encoded);
fs.writeFile("./decoded.txt", decoded, err => err && console.log(err));
