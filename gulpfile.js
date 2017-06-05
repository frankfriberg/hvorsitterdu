// Gulp Dependencies
const gulp    = require('gulp');
const pug     = require('gulp-pug');
const bs      = require('browser-sync').create();
const sass    = require('gulp-sass');
const image   = require('gulp-imagemin');
const prefix  = require('gulp-autoprefixer');
const clean   = require('gulp-clean');
const plumber = require('gulp-plumber');
const gutil   = require('gulp-util');
const mq      = require('gulp-combine-mq');

// Dev Source
const src     = '_development/';
const srcSASS = src + '_scss/';
const srcPUG  = src + '_pug/';
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
gulp.task('pug', function() {
  return gulp.src([srcPUG + '*.pug', '!' + srcPUG + '_*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(dist))
    .pipe(bs.stream());
});

gulp.task('sass', function() {
  return gulp.src(srcSASS + '*.scss')
    .pipe(sass())
    .pipe(prefix({
      browsers: ['> 5%'],
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
  gulp.src(srcIMG + '**/*')
    .pipe(image())
    .pipe(gulp.dest(dirIMG))
    .pipe(bs.stream());
});

gulp.task('serve', ['watch'], function() {
  bs.init({
    server: dist
  });
});

gulp.task('watch', ['pug', 'sass', 'js', 'image'], function() {
  gulp.watch(srcSASS + '*.scss', ['sass']);
  gulp.watch(srcJS + '*.js', ['js'])
  gulp.watch(srcPUG + '*.pug', ['pug']);
  gulp.watch(srcIMG + '**/*', ['image']);
});

gulp.task('default', ['serve']);
