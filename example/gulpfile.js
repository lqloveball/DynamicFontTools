var gulp = require('gulp'); //gulp
var fs = require('fs'); //文件系统
var glob = require('glob');
var path = require('path'); //路径习题
var browserSync = require('browser-sync').create(); //自动刷新调试
/*进行开发环境测试*/
gulp.task('build', function() {
    //启动browserSync服务
    browserSync.init({
        server: './',
        port: 3030,
        open: "external"
    });

});
