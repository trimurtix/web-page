(function (require) {

  var gulp = require('gulp');
  var watch = require('gulp-watch');
  var stylus = require('gulp-stylus');
  var gutil = require('gulp-util');
  var jshint = require('gulp-jshint');
  var connect = require('gulp-connect');
  var imagemin = require('gulp-imagemin');
  var useref = require('gulp-useref');
  var historyApiFallback = require('connect-history-api-fallback');
  var concat = require('gulp-concat');
  var changed = require('gulp-changed');
  var psi = require('psi');

  var site = 'http://www.frontlabs.com.br';

  var paths = {
    html:     ['index.html'],
    scripts:  ['app/js/scripts.js'],
    stylus:   ['app/src/stylus/**/*.styl'],
    images:   ['app/images/**/*']
  };

  gulp.task('connect', function() {
    connect.server({
      root: 'app',
      livereload: true,
      port: 8000,
      middleware: function(connect, opt) {
        return [ historyApiFallback({}) ];
      }
    });
  });

  
  
  

    gulp.task('styles', function () {
    return gulp.src(paths.stylus)
      .pipe(stylus())
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('app/css'))
      .pipe(connect.reload());
  });


  gulp.task('html', function () {
    return gulp.src(paths.html)
    .pipe(connect.reload());
  });

  gulp.task('jshint', function() {
    gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

  

  gulp.task('psi-mobile', function (cb) {
    psi({
        nokey: 'true',
        url: site,
        strategy: 'mobile',
    }, cb);
  });

  gulp.task('psi-desktop', function (cb) {
    psi({
        nokey: 'true',
        url: site,
        strategy: 'desktop',
    }, cb);
  });

  gulp.task('useref', function () {
    return gulp.src(paths.html)
      .pipe(useref())
      .pipe(gulp.dest('app'));
  });

  gulp.task('imagemin', function() {
    var  imgSrc = paths.images,
            imgDst = 'app/images';
    gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
  });

  gulp.task('watch', function() {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.stylus, ['styles']);
  });

  gulp.task('default', [ 'html', 'useref', 'imagemin',  'styles', 'watch', 'connect' ]);

}(require));
