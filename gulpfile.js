/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var G_PATH={
  basePath:'./',
  srcPath:'lib/',
  distPath:'dist'
};

//minifyjs
gulp.task('minifyjs', function() {
    return gulp.src(G_PATH.srcPath+'*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(G_PATH.distPath));
});

gulp.task('default',['minifyjs']);