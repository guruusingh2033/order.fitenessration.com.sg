var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var nib = require('nib');
var Builder = require('systemjs-builder');


function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('default', function() {
  gulp.watch('app/**/*.styl', ['styles']);
});

var debug = {
	on: function() {
		console.log('on', arguments);
	},
	once: function() {
		console.log('once', arguments);
	},
	emit: function() {
		console.log('emit', arguments);
	},
	write: function() {
		console.log('write', arguments);
	},
	end: function() {
		console.log('end', arguments);
	}
};

gulp.task('styles', function () {
  gulp.src(['app/**/*.styl', '!app/**/_*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({
      // paths:  ['node_modules', 'styles/globals'],
      // import: ['jeet/stylus/jeet', 'stylus-type-utils', 'nib', 'rupture/rupture', 'variables', 'mixins'],
      use: [nib()],
      'include css': true
    }))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('build', function() {
	var builder = new Builder('.', 'systemjs.config.js');
	builder
		.buildStatic('dist/app/main.js', 'dist/app/main.bundle.js', {minify: true, sourceMaps: true})
		.then(function() {
		  console.log('Build complete');
		})
		.catch(function(err) {
		  console.log('Build error');
		  console.log(err);
		});
});