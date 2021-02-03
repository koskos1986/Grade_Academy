const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const sync = require("browser-sync").create();
const svgstore = require("gulp-svgstore");
const del = require("del");
const jsmin = require("gulp-jsmin");
const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const script = () => {
  return gulp.src("source/js/script.js")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/js"));
}

exports.script = script;

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}
exports.html = html;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    open: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const sprite = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest('build/img/'));
}

exports.sprite = sprite;

//Create WebP

const imagewebP = () => {
  return gulp.src('source/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest("build/img/"));
}

exports.webP = imagewebP;

const imageTask = gulp.series(
  sprite,
  images,
  imagewebP
)

exports.imageTask = imageTask;

const clean = () => {
  return del("build");
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

exports.copy = copy;

const build = gulp.series(
  clean,
  copy,
  styles,
  sprite,
  script,
  html
);

exports. build = build;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles")).on("change", sync.reload);
  gulp.watch("source/js/**/*.js", gulp.series("script"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.start = gulp.series(
  build, server, watcher
);
