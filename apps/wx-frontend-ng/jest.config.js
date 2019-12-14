module.exports = {
  name: 'wx-frontend-ng',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/wx-frontend-ng',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
