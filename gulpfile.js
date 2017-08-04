// Imports
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var runSeq = require('run-sequence');

// Compile Sass and move to dist
gulp.task('sass', function () {
  return gulp
    .src('./assets/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'));
});

// Compile JS and move to dist
gulp.task('js', function () {
  return gulp
    .src('./assets/js/main.js')
    .pipe(gulp.dest('./dist'));
});

// Compile CSS plugins and move to dist
gulp.task('plugins:css', function () {
  return gulp.src([
               './node_modules/normalize.css/normalize.css',
               './node_modules/bootstrap/dist/css/bootstrap.min.css',
               './node_modules/font-awesome/css/font-awesome.min.css',
               './node_modules/animate.css/animate.min.css'
             ])
             .pipe(concatCss("plugins.css"))
             .pipe(gulp.dest('./dist'));
});

// Compile JS plugins and move to dist
gulp.task('plugins:js', function () {
  return gulp.src([
               './node_modules/jquery/dist/jquery.min.js',
               './node_modules/bootstrap/dist/js/bootstrap.min.js'
             ])
             .pipe(concat('plugins.js'))
             .pipe(gulp.dest('./dist'));
});

// Move everything to public
gulp.task('public', function () {
  gulp.src("./index.html").pipe(gulp.dest('public'));
  gulp.src("./dist/**/*").pipe(gulp.dest('public'));
  gulp.src('./assets/img/**/*').pipe(gulp.dest('public/img'));
  gulp.src('./assets/fonts/**/*').pipe(gulp.dest('public/fonts'));
  gulp.src('./node_modules/font-awesome/fonts/**/*').pipe(gulp.dest('public/font-awesome/fonts'));
});

// Build everything
gulp.task('build', function (cb) {
  runSeq(['sass', 'js', 'plugins:css', 'plugins:js'],
    'public',
    cb);
});

// Watch for changes
gulp.task('watch', function () {
  return gulp
    .watch(['./assets/**/*', './index.html'], ['build'])
    .on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// Build and watch for changes
gulp.task('default', ['build', 'watch']);