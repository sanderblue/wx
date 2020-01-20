const wxFrontEndSrc = './apps/wx-frontend/src';

console.log('Building Tailwind CSS...');
console.log('CWD:', process.cwd());

module.exports = {
  configJS: './tailwind.config.js',
  sourceCSS: `${wxFrontEndSrc}/app/styles/tailwind.scss`,
  outputCSS: `${wxFrontEndSrc}/assets/styles.css`,
  sass: true,

  // PurgeCSS Settings
  purge: false,
  keyframes: false,
  fontFace: false,
  rejected: false,
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extensions: ['.ts', '.html', '.js'],
  extractors: [],
  content: [],
};
