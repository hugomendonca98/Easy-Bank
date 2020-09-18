const { series, dest, src, watch, parallel } = require("gulp");
const gulpCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const image = require('gulp-image');
const sync = require("browser-sync").create();
const babel = require("gulp-babel");

async function jsTranspiler(){
  src("./Scripts/*.js")
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(dest('public/Scripts/'))
  .pipe(sync.stream());
}

async function jsStart(){
  src("./index.js")
  .pipe(babel({
    presets: ["@babel/env"]
  }))
  .pipe(dest('public/'))
  .pipe(sync.stream());
}

async function css(){
  src("./styles/*.css")
  .pipe(gulpCSS({ compatibility: "ie8" }))
  .pipe(dest("public/styles/"))
  .pipe(sync.stream());
}

async function html(){
  src("./*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest("public/"))
  .pipe(sync.stream());
}

async function images(){
  src("./images/*")
  .pipe(image())
  .pipe(dest("public/images/"))
  .pipe(sync.stream());
}

async function browserSync() {
  sync.init({
      server: {
          baseDir: "./public",
      },
      port: 8080,
  });

  watch('./styles/*.css', css);
  watch('./*.html', htmlmin).on('change', sync.reload);
}

exports.default = series(jsTranspiler, jsStart, css, html, images, browserSync);
