module.exports = function() {
	let gulp = this.gulp,
		path = this.opts.paths,
		$ = this.opts.plugins;

        gulp.src(path.src + 'site.js')
            .pipe($.plumber({ errorHandler: this.opts.errorHandler }))
            .pipe($.sourcemaps.init())
			.pipe($.minify({
                ext:{
                    src:'-debug.js',
                    min:'.js'
                },
                exclude: ['tasks'],
                ignoreFiles: ['.combo.js', '-min.js']
			}))
            .pipe($.size({ gzip: true, showFiles: true }))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(path.src + 'ui.js'))
            .pipe($.browserSync.reload({stream: true}))
};