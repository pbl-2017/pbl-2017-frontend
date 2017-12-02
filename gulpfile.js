/**
 * Created by akisato on 2017/10/27.
 */

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require("vinyl-source-stream");
var webserver = require('gulp-webserver');
var through2 = require('through2')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')

gulp.task('browserify',function () {
    return gulp.src('./src/app.js')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.message);
                this.emit('end');
            }
        }))
        .pipe(through2.obj(function(file,enc,next){
            return browserify(file.path)
                .transform("babelify",{presets: ["es2015"]},{ compact: false })
                .bundle(function(err,res){
                    if(err){
                        return next(err)
                    }
                    file.contents = res;
                    next(null,file);
                });
        }))
        .pipe(rename({
            basename:"app",
            extname:".js"
        }))
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(gulp.dest('./www/lib'))
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['browserify'])
});

gulp.task('webserver', function() {
    gulp.src('./www/')
        .pipe(webserver({
                host: '127.0.0.1',
                livereload: true
            })
        );
});

gulp.task('default', ['browserify', 'watch','webserver']);