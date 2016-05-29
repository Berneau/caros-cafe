var gulp = require('gulp')
var sass = require('gulp-sass')
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browsersync = require('browser-sync').create()


gulp.task('styles', function() {
  return gulp.src('css/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe(browsersync.reload({stream: true}))
})

gulp.task('scripts', function() {
  return browserify('js/main.js')
   .bundle()
   .pipe(source('main.js'))
   .pipe(gulp.dest('dist/js'))
   .pipe(browsersync.stream());
})

gulp.task('assets', function() {
	return gulp.src('assets/**/*')
	.pipe(gulp.dest('dist/assets'))
	.pipe(browsersync.reload({stream: true}));
})

gulp.task('copy', function() {
	return gulp.src('index.html')
	.pipe(gulp.dest('dist'))
	.pipe(browsersync.stream())
})

gulp.task('serve', function() {
	browsersync.init({
		server: './dist'
  })

  gulp.watch('css/*.scss', ['styles'])
  gulp.watch('js/*.js', ['scripts'])
  gulp.watch('*.html', ['copy'])
  gulp.watch('app/assets/**/*', ['assets'])

})

gulp.task('default', ['styles', 'scripts', 'assets', 'copy', 'serve'])
