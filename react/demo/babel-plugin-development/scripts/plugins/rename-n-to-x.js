let paramName;

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    paramName = param.name;
    param.name = "x";
  },

  Identifier(path) {
    if (path.node.name === paramName) {
      path.node.name = "x";
    }
  },
};

module.exports = function () {
  return {
    visitor: MyVisitor,
  };
};

/**
'use strict';

function square(x) {
  return x * x;
}
x;

console.log("index.js");
console.log("main.js: n = ", x);
console.log("main.js: square(n) = ", square(x));

 */