// khai báo các modul được sử dụng
const { src, dest, parallel, watch, series } = require('gulp'),
        concat = require('gulp-concat'),
        sass = require('gulp-sass')(require('sass')),
        pug = require('gulp-pug'),
        browserSync = require('browser-sync').create()
// Khai báo đường dẫn của các nhóm files
const FilesPath = { 
    sassFiles: 'sass/*.scss',
    htmlFiles: 'pages/*.pug'
 }

const { sassFiles, htmlFiles } = FilesPath;

function sassTask() {
    return src(sassFiles).pipe(sass())
                        .pipe(concat('style.css'))
                        .pipe(dest('dist/css'))
                        .pipe(browserSync.stream());
}

function htmlTask() {
    return src(htmlFiles).pipe(pug({ pretty: true }))
                        .pipe(dest('dist'))
                        .pipe(browserSync.stream());
}

function assetsTask() {
    return src('assets/**').pipe(dest('dist/assets'))
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    watch(sassFiles, sassTask);
    watch(htmlFiles, htmlTask);
}
// Để gọi các task gulp bằng dòng lệnh, ta thêm đoạn code sau:
exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, assetsTask));
