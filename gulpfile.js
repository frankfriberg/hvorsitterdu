// Skivd Gulp PHP v0.5 26.03.18
// Gulp Dependencies
const gulp    = require('gulp');
const html    = require('gulp-html');
const bs      = require('browser-sync');
const inject  = require('bs-html-injector');
const sass    = require('gulp-sass');
const image   = require('gulp-imagemin');
const prefix  = require('gulp-autoprefixer');
const clean   = require('gulp-clean');
const ftp     = require('vinyl-ftp');
const fexists = require('file-exists');
const connect = require('gulp-connect-php');

// Dev Source
const src     = '_development/';
const srcSASS = src + '_scss/';
const srcHTML = src + '_html/';
const srcPHP  = src + '_php/';
const srcJS   = src + '_js/';
const srcIMG  = src + '_images/';

// Prod Dist
const dist    = '_production/';
const dirCSS  = dist + 'css/';
const dirJS   = dist + 'js/';
const dirIMG  = dist + 'images/';

// fexists('./serverfile').then(exists => {
//   const serverfile = require('./serverfile');
// });

// Development Tasks
gulp.task('html', function() {
  return gulp.src(srcHTML + '*.html')
    .pipe(gulp.dest(dist));
});

gulp.task('php', function() {
  return gulp.src(srcPHP + '*.php')
    .pipe(gulp.dest(dist));
});

gulp.task('sass', function() {
  return gulp.src(srcSASS + '*.scss')
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(prefix({browsers: ['> 5%']}))
    .pipe(gulp.dest(dirCSS))
    .pipe(bs.stream());
});

gulp.task('js', function() {
  return gulp.src(srcJS + '*')
    .pipe(gulp.dest(dirJS))
    .pipe(bs.stream());
});

gulp.task('clean-images', function() {
  return gulp.src(dirIMG, {read: false})
    .pipe(clean());
})

gulp.task('image', ['clean-images'], function() {
  return gulp.src(srcIMG + '**/*')
    .pipe(image())
    .pipe(gulp.dest(dirIMG))
    .pipe(bs.stream());
});

gulp.task('serve', ['watch'], function() {
  connect.server({
    stdio: 'ignore',
    base: dist
  }, function() {
    bs({
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch(dist + '*.php').on('change', function() {
    bs.reload();
  });
});

// gulp.task('deploy', function() {
//   fexists('./serverfile').then(exists => {
//     var connection = ftp.create( {
//       host:     serverfile.host,
//       user:     serverfile.user,
//       password: serverfile.password
//     });
//
//     gulp.src(dist + '*', { base: '.', buffer: false })
//       .pipe(connection.newer(''))
//       .pipe(connection.dest(''));
//   });
// });

gulp.task('watch', ['html', 'sass', 'js', 'image'], function() {
  gulp.watch(srcSASS + '*.scss', ['sass']);
  gulp.watch(srcJS + '*.js', ['js']);
  gulp.watch(srcHTML + '*.html', ['html']);
  gulp.watch(srcPHP + '*.php', ['php'])
  gulp.watch(srcIMG + '**/*', ['image']);
});

gulp.task('watch-sass', function() {
  gulp.watch(srcSASS + '*.scss', ['sass']);
});

gulp.task('build', ['html', 'sass', 'js', 'image']);
gulp.task('default', ['serve']);
