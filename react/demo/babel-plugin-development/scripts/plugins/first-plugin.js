module.exports = function ({ types: t }) {
  return {
    pre(state) {
      this.cache = new Map();
    },
    post(state) {
      console.log(this.cache);
    },
    visitor: {
      StringLiteral(path) {
        this.cache.set(path.node.value, 1);
      },
      BinaryExpression(path) {
        if (path.node.operator !== "===") {
          return;
        }
        path.node.left = t.identifier("sebmck");
        path.node.right = t.identifier("dork");
        path.replaceWith(
          t.binaryExpression("**", path.node.left, t.numericLiteral(2))
        );
      },
      FunctionDeclaration(path) {
        path.insertBefore(
          t.expressionStatement(
            t.stringLiteral("Because I'm easy come, easy go.")
          )
        );
        path.insertAfter(
          t.expressionStatement(t.stringLiteral("A little high, little low."))
        );
      },
      ClassMethod(path) {
        path
          .get("body")
          .unshiftContainer(
            "body",
            t.expressionStatement(t.stringLiteral("before"))
          );
        path
          .get("body")
          .pushContainer(
            "body",
            t.expressionStatement(t.stringLiteral("after"))
          );
      },
      // 重复的 visitor 会前后覆盖
      FunctionDeclaration(path, state) {
        console.log(state.opts);
        // { option1: true, option2: false }
      },
      // FunctionDeclaration(path) {
      //   // path.replaceWithSourceString(`function add(a, b) {
      //   //   return a + b;
      //   // }`);
      //   path.remove();
      // },
      // VariableDeclaration(path) {
      //   // if the current path is pathA
      //   console.log(path.inList); // true
      //   console.log(path.listKey); // "body"
      //   console.log(path.key); // 0
      //   // console.log(path.getSibling(0)); // pathA
      //   // console.log(path.getSibling(path.key + 1)); // pathB
      //   // console.log(path.container); // [pathA, pathB, pathC]
      // },
    },
  };
};
