var gulp = require('gulp');
var browserSync = require ('browser-sync');
var bower = require ('gulp-bower');
var sass = require ('gulp-sass');
var modRewrite  = require('connect-modrewrite');
var middleware = require('middleware');



//===================================================================

//move assets folder to public/src/files/
gulp.task('assets', function(){
	gulp.src('./_ar-build/assets/**/*')
	.pipe(gulp.dest('./public/src/assets/'));
});

//move files folder to public/src/files/
gulp.task('files',['assets'], function(){
	gulp.src('./_ar-build/files/**/*')
	.pipe(gulp.dest('./public/src/files/'));
});

//move views to public/src/views/
gulp.task('views', ['files'], function(){
	gulp.src('./_ar-build/views/**')
	.pipe(gulp.dest('./public/src/views/'));
});

//move .html files to public/
gulp.task('html', ['views'], function(){
	gulp.src('./_ar-build/html/*.html')
		.pipe(gulp.dest('./public/'));
});

//move img folder contents to public/src/img/
gulp.task('img', ['html'], function(){
	gulp.src('./_ar-build/img/**')
		.pipe(gulp.dest('./public/src/img'));
});

//move .js files from to public/src/js/
gulp.task('scripts', ['img'], function(){
	gulp.src('./_ar-build/js/**/*.js')
		.pipe(gulp.dest('./public/src/js/'));
});

//compile .sass files then move the .css to /public/src/css/
gulp.task('build-ar', ['scripts'], function(){
	gulp.src('./_ar-build/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/src/css/'));
});

//===================================================================

//STYLEGUIDE BUILD
//move assets folder to public/src/files/
gulp.task('assets-st', function(){
	gulp.src('./_st-build/assets/**/*')
	.pipe(gulp.dest('./public/styleguide/src/assets/'));
});

//move files folder to public/src/files/
gulp.task('files-st',['assets-st'], function(){
	gulp.src('./_st-build/files/**/*')
	.pipe(gulp.dest('./public/styleguide/src/files/'));
});

//move views to public/src/views/
gulp.task('views-st', ['files-st'], function(){
	gulp.src('./_st-build/views/**')
	.pipe(gulp.dest('./public/styleguide/src/views/'));
});

//move .html files to public/
gulp.task('html-st', ['views-st'], function(){
	gulp.src('./_st-build/html/*.html')
		.pipe(gulp.dest('./public/styleguide/'));
});

//move img folder contents to public/src/img/
gulp.task('img-st', ['html-st'], function(){
	gulp.src('./_st-build/img/**')
		.pipe(gulp.dest('./public/styleguide/src/img'));
});

//move .js files from to public/src/js/
gulp.task('scripts-st', ['img-st'], function(){
	gulp.src('./_st-build/js/**/*.js')
		.pipe(gulp.dest('./public/styleguide/src/js/'));
});

//compile .sass files then move the .css to /public/src/css/
gulp.task('build-st', ['scripts-st'], function(){
	gulp.src('./_st-build/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/styleguide/src/css/'));
});




//look at the bower components required then move them to the lib folder
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('./public/src/js/lib'));
});


//Watch these files for changes and run the build
gulp.task('watch', function(){
    gulp.watch(
        ['./_ar-build/html/*.html', 
        './_ar-build/js/*.js', 
        './_ar-build/scss/*.scss',
        './_ar-build/scss/**/.scss',
        './_ar-build/img/**', 
        './_ar-build/views/**', 
        './bower_components'],
        ['build-st', 'build-ar']
    )
});


//Create a web server using browser sync and refresh if the assets update
//Middleware added to re-route traffic using HTML5 mode in Angular (ie page/view/id > $routparams.id)
gulp.task('serve', function () {
		var files = [
		'./public/**/*.html',
		'./public/src/js*.js',
		'./public/src/**/*.js',
		'./public/src/css/*.css'
	];

    browserSync.init(files, {
        server: {
            baseDir: './public',
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });

});

gulp.task('build', ['build-ar', 'build-st']);

//The default task and task dependancies
gulp.task('default', ['build-ar','build-st', 'bower', 'watch', 'serve']);
