var config = {
	jsConcatFiles: [
		'./app/js/main.js'
	], 
	buildFilesFoldersRemove:[
		'build/sass/', 
		'build/js/!(*.min.js)',
		'build/bower.json',
		'build/bower_components/',
		'build/maps/'
	]
};

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload =  browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
    mainBowerFiles = require('gulp-main-bower-files'),
    gulpFilter = require('gulp-filter'),
	del = require('del');

function errorlog(err){
	console.error(err.message);
	this.emit('end');
}

gulp.task('scripts', function() {
  return gulp.src(config.jsConcatFiles)
	.pipe(sourcemaps.init())
		.pipe(concat('temp.js'))
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(rename('main.min.js'))		
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./app/js/'))
	.pipe(reload({stream:true}));
});


gulp.task('styles', function() {
	gulp.src('app/sass/style.scss')
		.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}))
			.on('error', errorlog)
			.pipe(autoprefixer({
	            browsers: ['last 3 versions'],
	            cascade: false
	        }))	
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('app/css'))
        .pipe(reload({stream:true}));
});

gulp.task('main-bower-files', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('app/bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(gulp.dest('./app/js'));
});

gulp.task('html', function() {
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});

gulp.task('build:cleanfolder', function(cb) {
	del([
		'build/**'
	], cb);
});

gulp.task('build:copy', ['build:cleanfolder'], function() {
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});

gulp.task('build:remove', ['build:copy'], function (cb) {
	del(config.buildFilesFoldersRemove, cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: "./app/"
		}
	});
});


// task to run build server for testing final app
gulp.task('build:serve', function() {
	browserSync({
		server:{
			baseDir: "./build/"
		}
	});
});

gulp.task ('watch', function(){
	gulp.watch('./app/js/**/*.js', ['scripts']);
	gulp.watch('./app/sass/**/*.scss', ['styles']);
	gulp.watch('./app/**/*.html', ['html']);
});

gulp.task('default', ['scripts', 'styles', 'main-bower-files', 'html', 'browser-sync', 'watch']);
