const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const googleFonts = require('gulp-google-webfonts');
const minifyCss = require('gulp-minify-css');
const minifyHtml = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const tinyPng = require('gulp-tinypng');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const paths = {
  src : './src/',
  dist : './dist/',
  styles : './src/styles/styles.scss',
  scripts : './src/scripts/main.js'
};

const config = {
    server: {
        baseDir: paths.dist
    },
    tunnel: true,
    host: 'localhost',
    port: 9001,
    logPrefix: "Server"
};

/*--- TASKS ---*/
gulp.task('pug', () => {
  gulp.src(paths.src + 'index.pug')
    .pipe(pug({pretty:true}))
    .on('error', err => console.log('Pug:', err.message))
    .pipe(minifyHtml({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  gulp.src(paths.styles)
    .pipe(sass())
    .on('error', err => console.log('Sass:', err.message))
    .pipe(prefixer())
    .pipe(minifyCss())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.dist + 'css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/owl.carousel/dist/owl.carousel.min.js', paths.scripts])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.dist + 'js/'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  gulp.src(['./node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest(paths.dist + 'fonts/'));
});

gulp.task('google', () => {
  gulp.src(paths.src + 'fonts.list')
    .pipe(googleFonts({
      fontsDir: 'fonts/',
    	cssDir: 'css/',
    	cssFilename: 'fonts.css'
    }))
    .pipe(gulp.dest(paths.dist))
})

gulp.task('compress', () => {
  gulp.src([paths.src + 'images/**/*'])
    .pipe(tinyPng('b1cfP2KnNHzmB-b6UyESjAt5GIs8mFpA'))
    .pipe(gulp.dest(paths.dist + 'img/'));
});

gulp.task('build', ['pug', 'sass', 'js']);

gulp.task('watch', () => {
  gulp.watch([paths.src + '**/*.pug', paths.src + 'index.pug'], ['pug']);
  gulp.watch(paths.src + 'styles/**/*.scss', ['sass']);
  gulp.watch(paths.scripts, ['js']);
})

gulp.task('server', () => {
  browserSync.init(config);
});
