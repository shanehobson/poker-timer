const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const babelPolyfill = require('babel-polyfill');

//Compile ES2015 with Babel and route to /dist
gulp.task('babel', function () {
    return gulp.src('src/js/script.js')
      .pipe(babel())
      .pipe(gulp.dest("dist/js"));
});