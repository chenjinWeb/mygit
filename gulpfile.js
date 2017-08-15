/**
 * Created by admin on 2016/12/26.
 */

var gulp=require("gulp"),
    connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        port: 8099
    });
});
gulp.task("default",["connect"])














