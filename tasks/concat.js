module.exports = function() {
    let path = this.opts.paths,
        gulp = this.gulp,
        $ = this.opts.plugins;

gulp.src([path.src + 'site.js'])
       .pipe($.sourcemaps.init())
       .pipe($.size({ gzip: true, showFiles: true }))
       .pipe($.concat('ui.js'))
       .pipe(gulp.dest(path.src))
};
