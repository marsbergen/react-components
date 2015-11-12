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

gulp.task('clean', function () {
  return del([
    'dist',
    '.tmp'
  ]);
});

gulp.task('copy:html', ['clean'], function () {
  return gulp.src('app/**/*')
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('copy:js', ['build'], function () {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('connect', ['clean', 'copy:html', 'build', 'copy:js'], function () {
    connect.server({
        root: '.tmp',
        livereload: true
    })
});

gulp.task('build', ['clean', 'copy:html'], function () {
    return browserify({entries: 'src/app.jsx', extensions: ['.jsx'], debug: true})
        .transform(babelify)
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build', 'copy:js', 'connect'], function () {
    gulp.watch('src/**/*.jsx', ['build', 'copy:js']);
    gulp.watch('app/**/*', ['copy:html']);
});

gulp.task('default', ['watch']);