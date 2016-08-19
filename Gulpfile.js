var gulp 					= require('gulp');
var sass 					= require('gulp-sass');
var notify 				= require('gulp-notify');
var gutil					= require('gulp-util');
var gshell				= require('gulp-shell');
var watch					= require('gulp-watch');
var sourcemaps 		= require('gulp-sourcemaps'); 
var autoprefixer 	= require('gulp-autoprefixer');


var config = {
	scss_path: './assets/scss',
	bower_dir: './bower_components',
	css_dest:  './assets/css',
	js_dest: 	 './assets/js',
	font_dest: './assets/fonts',
};

var autoprefixerOptions = {
	browsers: [
	  "Android 2.3",
	  "Android >= 4",
	  "Chrome >= 20",
	  "Firefox >= 24",
	  "Explorer >= 8",
	  "iOS >= 6",
	  "Opera >= 12",
	  "Safari >= 6"
	]
};

gulp.task('copyjs', ['copyjs:bootstrap', 'copyjs:jquery']);


gulp.task('copyjs:jquery', function() {
	return gulp.src(config.bower_dir + '/jquery/dist/jquery.min.js')
		.pipe(gulp.dest(config.js_dest))
		.pipe(notify({
			title: "jQuery Scripts Copied",
			message: "All javascript for jQuery copied to assets/js"
		}));
});

gulp.task('copyjs:bootstrap', function() {
	return gulp.src(config.bower_dir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
		.pipe(gulp.dest(config.js_dest))
		.pipe(notify({
			title: "Bootstrap Scripts Copied",
			message: "All javascript for Bootstrap copied to assets/js"
		}));
});


gulp.task('copyfonts', ['copyfonts:font-awesome','copyfonts:bootstrap']);

gulp.task('copyfonts:font-awesome', function() {
	return gulp.src(config.bower_dir + '/font-awesome/fonts/**.*')
		.pipe(gulp.dest(config.font_dest))
		.pipe(notify({
			title: "FontAwseome Fonts Copied",
			message: "All font files for FontAwesome have been copied!"
		}));
});

gulp.task('copyfonts:bootstrap', function() {
	return gulp.src(config.bower_dir + '/bootstrap-sass/assets/fonts/**/*.*')
		.pipe(gulp.dest(config.font_dest))
		.pipe(notify({
			title: "Bootstrap Fonts Copied",
			message: "All font files for Bootstrap have been copied!"
		}));
});


gulp.task('compile:scss', function() {
	return gulp.src(config.scss_path + "/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: [
				config.scss_path,
				config.bower_dir + "/bootstrap-sass/assets/stylesheets",
				config.bower_dir + "/font-awesome/scss"
			]
		})
			.on("error", notify.onError(function (error) {
				return "Error: " + error.message;
		})))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write("maps"))
		.pipe(gulp.dest(config.css_dest))
		.pipe(notify({
			title: "SASS/SCSS Compiled",
			message: "All SASS/SCSS files have been compiled!"
		}));
});

gulp.task('watch', ['watch:scss']);

gulp.task('watch:scss', function() {
	gulp.watch(config.scss_path + "/**/*.scss", ['compile:scss']);
});

