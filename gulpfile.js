const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const dir = {
    src: './',
    dest : './assets/'
}

const js = {
    src: dir.src + 'js/*.js',
    dest: dir.dest + 'js',
}

const css = {
    src : dir.src + 'css/*.scss',
    dest: dir.dest + 'css',
}

gulp.task('build-js', async () => {
    return gulp.src(js.src)
        .pipe(babel({presets: [['@babel/preset-env',]]}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(js.dest))
});
gulp.task('build-css', async () => {
    return gulp.src(css.src)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 9 version', '> 0.5%'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(css.dest))
})

gulp.task('default', gulp.series('build-js', 'build-css'));
gulp.task('watch', function() {
    gulp.watch(dir.src + 'js/*.js', gulp.series('build-js'));
    gulp.watch(dir.src + 'css/*.scss', gulp.series('build-css'));
});