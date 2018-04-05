// require gulp dependencies
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('scripts', function(){
    return gulp.src('./dist/app.js')
            //.pipe(uglify())
            .pipe(concat('bundle.min.js'))
            .pipe(gulp.dest('./dist/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 4000
  });
});