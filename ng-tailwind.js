const wxFrontEndSrc = '/www/wx/apps/wx-frontend/src';

module.exports = {
  configJS: '/www/wx/tailwind.config.js',
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
