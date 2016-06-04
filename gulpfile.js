// 引入 gulp及组件
var gulp = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    autoprefixer = require('gulp-autoprefixer'),//css兼容性前缀补全
    jshint = require('gulp-jshint'),           //js检查
    rename = require('gulp-rename'),           //重命名
    clean = require('gulp-clean'),         //清空文件夹
    connect = require('gulp-connect'),//服务,自动刷新
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config.js");

//1.server and livereload
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    //启动服务并自动刷新
    gulp.watch(['./app/*', './src/**/*'], ['html']);
    //自动编译sass
    gulp.watch(['./src/styles/**/*'], ['sass']);
    //webpack自动打包
    gulp.watch(['./src/scripts/**/*'], ['webpack']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        livereload: true,
        port: 80
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});


//2.sass
// 样式
gulp.task('sass', function () {
    return sass('src/styles/pages/*.scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        //.pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/styles'));
});

//3.js检查
gulp.task('jshint', function () {
    return gulp.src('./app/test2.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));  // 对代码进行报错提示
});


//4.imagemin
gulp.task('imagemin', function () {
    return gulp.src('.image/**/*.+(jpeg|jpg|png)')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest('www/screen/'));
});

//5.webpack
gulp.task("webpack", function () {
    var myConfig = Object.create(webpackConfig);
    // run webpack
    webpack(myConfig, function (err, stats) {
       console.log("webpack OK!!!!!");
    });
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);
