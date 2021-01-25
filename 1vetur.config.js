// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    "vetur.completion.autoImport": true,
    "vetur.completion.tagCasing": "kebab",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.scss": "prettier",
    "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
    "vetur.experimental.templateInterpolationService": false,
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "force-expand-multiline"
        }
    }
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: [
   // './packages/repo2', // shorthand for only root.
    './3-前端框架/vue3/1-calculator\node_modules',

    // {
    //   // **required**
    //   // Where is your project?
    //   // It is relative to `vetur.config.js`.
    //   root: './packages/repo1',
    //   // **optional** default: `'package.json'`
    //   // Where is `package.json` in the project?
    //   // We use it to determine the version of vue.
    //   // It is relative to root property.
    //   package: './package.json',
    //   // **optional**
    //   // Where is TypeScript config file in the project?
    //   // It is relative to root property.
    //   tsconfig: './tsconfig.json',
    //   // **optional** default: `'./.vscode/vetur/snippets'`
    //   // Where is vetur custom snippets folders?
    //   snippetFolder: './.vscode/vetur/snippets',
    //   // **optional** default: `[]`
    //   // Register globally Vue component glob.
    //   // If you set it, you can get completion by that components.
    //   // It is relative to root property.
    //   // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
    //   globalComponents: [
    //     './src/components/**/*.vue'
    //   ]
    // }
  ]
}