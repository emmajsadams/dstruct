// NOTE: This is currently not used. Grunt is used instead. Eventually this project may be migrated to gulp.

var gulp = require('gulp');
var ts = require('gulp-typescript');

var dir = {
  ts: 'lib',
  js: 'bin'
};
var tsSelector = '/*.ts';
var tsProject = ts.createProject({
  declarationFiles: false,
  noExternalResolve: false,
  module: 'amd'
});

gulp.task('compile:dev', function() {
  var tsResult = gulp.src(tsSelector, { cwd: dir.ts })
    .pipe(ts());

  return tsResult.js.pipe(gulp.dest(dir.js));
});

gulp.task('dev', ['compile:dev']);

gulp.task('default', ['dev']);