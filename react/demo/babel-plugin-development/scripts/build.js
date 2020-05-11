const rollup = require("rollup");
const sizes = require("./plugins/sizes-plugin");
const babel = require("rollup-plugin-babel");

const babelPlugins = [
  ["@babel/plugin-proposal-class-properties", { loose: true }],
];

const inputOptions = {
  input: "index.js",
  treeshake: false,
  plugins: [
    babel({
      exclude: "node_modules/**",
      plugins: babelPlugins.concat([
        require("./plugins/rename-n-to-x-recursive.js"),
        // require("./plugins/rename-n-to-x.js"),
        // require("./plugins/rename-n-to-x.js"),
        [
          require("./plugins/first-plugin.js"),
          {
            option1: true,
          },
        ],
      ]),
    }),

    sizes({
      getSize: (size, gzip) => {
        console.log("size = ", size, ", gzip = ", gzip);
      },
    }),
  ],
};

const outputOptions = {
  file: "dist/bundle.js",
  format: "cjs",
  strict: false,
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
