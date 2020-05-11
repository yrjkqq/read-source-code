const updateParamNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.paramName) {
      path.node.name = "x";
    }
  }
};

const MyVisitor = {
  // 将函数声明中使用到 n 做为参数的地方全部修改为 x
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    const paramName = param.name;
    param.name = "x";

    path.traverse(updateParamNameVisitor, { paramName });
  }
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
n;

console.log("index.js");
console.log("main.js: n = ", n);
console.log("main.js: square(n) = ", square(n));

 */
