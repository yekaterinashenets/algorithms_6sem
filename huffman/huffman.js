module.exports = class Huffman {
  constructor(text) {
    this.data = text;
    this.symbols = this.getSymbolsOccurance(text);
    this.initTree();
  }

  getSymbolsOccurance(data) {
    let symbols = [];
    let idxs = [];
    for (let i = 0; i < data.length; i++) {
      let index = idxs[data[i]] || -1;
      if (index == -1) {
        symbols.push({ notation: data[i], frequency: 1 });
        for (let j = 0; j < symbols.length; j++) {
          if (symbols[j].notation == data[i]) {
            index = j;
            idxs[symbols[j].notation] = index;
          }
        }
      } else symbols[index].frequency++;
    }
    return symbols;
  }

  initTree() {
    this.tree = [];
    this.tree.children = this.symbols;
    while (this.mergeTree(this.tree.children)) {
      this.tree.deepness++;
    }
  }

  mergeTree(tree) {
    if (tree.length <= 2) return false;
    tree.sort((x, y) => x.frequency - y.frequency);
    let temp = [tree[0], tree[1]];

    tree[0] = {
      children: [temp[0], temp[1]],
      frequency: temp[0].frequency + temp[1].frequency,
      notation: temp[0].notation + temp[1].notation
    };
    tree.splice(1, 1);
    return true;
  }

  encode() {
    let res = "";
    for (let i = 0; i < this.data.length; i++) {
      res += this.getBitsByNotation(this.tree, this.data[i]);
    }
    return res;
  }

  decode(encoded) {
    let res = "";
    for (let i = 0; i < encoded.length; i++) {
      let j = 1;
      while (this.isPath(this.tree, encoded.substr(i, j))) j++;
      res += this.getNotationByBits(this.tree, encoded.substr(i, j));
      i += j - 1;
      continue;
    }
    return res;
  }

  getBitsByNotation(node, notation, bits) {
    if (bits === undefined) bits = "";
    if (node.notation == notation) return bits;
    else if (node.children !== undefined) {
      if (node.children[0].notation.indexOf(notation) != -1)
        return this.getBitsByNotation(node.children[0], notation, bits + "0");
      else
        return this.getBitsByNotation(node.children[1], notation, bits + "1");
    } else return null;
  }

  getNotationByBits(tree, bits) {
    let root = tree;
    for (let i = 0; i < bits.length; i++) {
      if (root.children !== undefined) {
        root = root.children[parseInt(bits[i])];
      }
    }
    if (root.notation.length == 1) return root.notation;
    else return null;
  }

  isPath(tree, bits) {
    return this.getNotationByBits(tree, bits) == null;
  }
};
