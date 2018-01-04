import babel from "rollup-plugin-babel"
import babelrc from "babelrc-rollup"

let pkg = require("./package.json")
let external = Object.keys(pkg.dependencies)
let plugins = [
  babel(
    babelrc({
      presets: [["es2015", { modules: false }]],
    })
  ),
]

export default {
  entry: "./index.js",
  plugins: plugins,
  external: external,
  targets: [
    { format: "cjs", dest: "dist/stream-reader.cjs.js" },
    { format: "es", dest: "dist/stream-reader.es.js" },
  ],
}
