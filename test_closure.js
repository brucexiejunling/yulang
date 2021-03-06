'use strict';

var YuLang = require('./lib/yulang');
var Parser = YuLang.Parser;
var Interpreter = YuLang.Interpreter;
var onChange = YuLang.onChange;

let test = `
func create() {
  let i = 0
  func inc() {
    i = i + 1
    print(i)
  }
  return inc
}
let add = create()
add() #print 1
add() #print 2
add() #print 3
`;

run();
onChange(run);

function run() {
  var ast = Parser.parse(test);
  console.log('AST:')
  console.log(JSON.stringify(ast, null, 4));
  try {
    var it = new Interpreter(ast);
    it.execute();
  }catch(e) {
    console.log(e.stack);
  }
}
