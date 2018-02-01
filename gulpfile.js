let gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-prefix');

gulp.task('sass', () => {
    return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 2 versions', '> 5%', 'ie 8']
    }))
    .pipe(gulp.dest('dist/css'))
});


gulp.task('default', ['sass'], () => {
    gulp.watch('sass/**/*.scss', ['sass']);
});
