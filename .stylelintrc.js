module.exports = {
  defaultSeverity: 'error',
  extends: [ 'stylelint-config-standard' ],
  // plugins: [ 'stylelint-scss' ],
  rules: {
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'indentation': [ 2, { baseIndentLevel: 1 } ],
    'number-leading-zero': null,
    'no-eol-whitespace': null,
    'no-descending-specificity': null,
    'unit-no-unknown': null
  }
}
