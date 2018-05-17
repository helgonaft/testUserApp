'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./assets/styles/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./assets/styles/sass/**/*.scss', ['sass']);
});