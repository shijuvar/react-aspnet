var gulp = require('gulp');
var clean = require('gulp-clean');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('clean', function () {
    return gulp.src(['./app/prod/**/*.js','bundle.js'], { read: false })
    .pipe(clean({ force: true }));
});


gulp.task('react', function () {
    gulp.src(['./app/components/*.js'])
        .pipe(react())
        .pipe(gulp.dest('./app/prod/'));

});

gulp.task('browserify', function () {
    gulp.src(['./app/prod/*.js','!./app/components/*.js'])
    .pipe(browserify())
        .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('build', ['react', 'browserify']);