const {
  List,
  Dictionary
} = require('Linq');

function P1(a) {
  this.a = a;
}

const list = new List([new P1(1), new P1(10), new P1(12), new P1(14)]);

console.error(list);
console.error(list.push(1213123));
console.error(list.toArray());

for (let i of list) {
  console.error(i)
}

const map1 = new Dictionary();

const test = new P1("sdbnmfbsdnb");
const test2 = new P1("sdbnmfbsdnb");

map1.set("1", new P1(213123))
map1.set("2", new P1(3434))
map1.set("3", new P1(34))
map1.set("4", new P1(3434))
map1.set(test, new P1(3434))
map1.set(test2, new P1(3434))

console.error("map1:", map1)
console.error("map1:", map1.containsKey("1"))
console.error("map1:", map1.getKeys());
console.error("map1:", map1.getValues())

const a = new Array();

console.error(a)