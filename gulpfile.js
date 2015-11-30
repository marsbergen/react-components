var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var assign = require('lodash.assign');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

var files = {
  mainFile: 'src/app.jsx',
  bundleFile: 'bundle.js',
  appDir: 'app',
  srcDir: 'src',
  tmpDir: '.tmp',
  distDir: 'dist',
  allFiles: '/**/*'
};

gulp.task('clean', function () {
  return del([
    files.distDir,
    '.tmp'
  ]);
});

gulp.task('copy:app', ['clean'], function () {
  return gulp.src(files.appDir + files.allFiles)
    .pipe(gulp.dest(files.tmpDir))
    .pipe(connect.reload());
});

gulp.task('copy:dist', ['build'], function () {
  return gulp.src(files.distDir + files.allFiles)
    .pipe(gulp.dest(files.tmpDir))
    .pipe(connect.reload());
});

gulp.task('connect', ['clean', 'copy:app', 'build', 'copy:dist'], function () {
    connect.server({
        root: files.tmpDir,
        livereload: true
    })
});

gulp.task('build:static', ['clean'], function () {
  return gulp.src(files.appDir + files.allFiles)
    .pipe(gulp.dest(files.distDir));
})

gulp.task('build', ['clean', 'copy:app', 'build:static'], function () {
    return browserify({entries: files.mainFile, extensions: ['.jsx'], debug: true})
        .transform(babelify)
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(files.bundleFile))
        .pipe(gulp.dest(files.distDir));
});

gulp.task('watch', ['clean', 'copy:app', 'build', 'copy:dist', 'connect'], function () {
  gulp.watch(files.srcDir + files.allFiles + '.jsx', ['build', 'copy:dist']);
  gulp.watch(files.appDir + files.allFiles, ['copy:app']);
});

gulp.task('default', ['watch']);
