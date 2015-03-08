var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var symlink = require('gulp-symlink');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src(['./app/prod/**/*.js','bundle.js'], { read: false })
    .pipe(clean({ force: true }));
});


gulp.task("symlink", function () {
    return gulp.src('./app/')
    .pipe(symlink('./node_modules/app/', {force:true}))
});

gulp.task('browserify', function () {
    var b = browserify();
    b.transform(reactify); // use the reactify transform
    b.add('./node_modules/app/components/app.js');
    return b.bundle()
      .pipe(source('app.js'))
        .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./'));
});

gulp.task('build', ['clean', 'symlink','browserify']);