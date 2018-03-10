// Gulp Dependencies
const gulp    = require('gulp');
const connect = require('gulp-connect-php');
const bs      = require('browser-sync');
const sass    = require('gulp-sass');
const image   = require('gulp-image');
const prefix  = require('gulp-autoprefixer');
const clean   = require('gulp-clean');
const plumber = require('gulp-plumber');
const gutil   = require('gulp-util');
const mq      = require('gulp-combine-mq');

// Dev Source
const src     = '_development/';
const srcSASS = src + '_scss/';
const srcPHP  = src + '_php/';
const srcJS   = src + '_js/';
const srcIMG  = src + '_images/';

// Prod Dist
const dist    = '_production/';
const dirCSS  = dist + 'css/';
const dirJS   = dist + 'js/';
const dirIMG  = dist + 'images/';

// Error Handeling
const gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('error (' + error.plugin + '):')
      + gutil.colors.white(error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

// Run Tasks
gulp.task('php', function() {
  return gulp.src([srcPHP + '*.php', '!' + srcPHP + '_*.php', srcPHP + '**/*.html'])
    .pipe(gulp.dest(dist))
    .pipe(bs.stream());
});

gulp.task('sass', function() {
  return gulp.src(srcSASS + '*.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['> 5%']
    }))
    .pipe(mq({
      beautify: false
    }))
    .pipe(gulp.dest(dirCSS))
    .pipe(bs.stream());
});

gulp.task('js', function() {
  gulp.src(srcJS + '*')
    .pipe(gulp.dest(dirJS))
    .pipe(bs.stream());
});

gulp.task('clean-images', function() {
  return gulp.src(dirIMG, {read: false})
    .pipe(clean());
})

gulp.task('image', ['clean-images'], function() {
  gulp.src([srcIMG + '**/*.png', srcIMG + '**/*.jpg', srcIMG + '**/*.svg'])
    .pipe(image())
    .pipe(gulp.dest(dirIMG))
    .pipe(bs.stream());
});

gulp.task('phpserver', function() {
  connect.server({
    base: '_production',
    port: 8010,
    stdio: 'ignore',
    keepalive: true
  });
});

gulp.task('serve', ['phpserver', 'watch'], function() {
  bs ({
    proxy: '127.0.0.1:8010',
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('watch', ['php', 'sass', 'js', 'image'], function() {
  gulp.watch(srcSASS + '*.scss', ['sass']);
  gulp.watch(srcJS + '*.js', ['js'])
  gulp.watch(srcPHP + '*.php', ['php']);
  gulp.watch([srcIMG + '**/*.png', srcIMG + '**/*.jpg', srcIMG + '**/*.svg'], ['image']);
});

gulp.task('all', ['php', 'sass', 'js', 'image']);

gulp.task('default', ['serve']);
