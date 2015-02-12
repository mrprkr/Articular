var gulp = require('gulp');
var browserSync = require ('browser-sync');
var bower = require ('gulp-bower');
var sass = require ('gulp-sass');
var modRewrite  = require('connect-modrewrite');
var middleware = require('middleware');


//move assets folder to public/src/files/
gulp.task('assets', function(){
	gulp.src('./build/assets/**/*')
	.pipe(gulp.dest('./public/src/assets/'));
});

//move files folder to public/src/files/
gulp.task('files',['assets'], function(){
	gulp.src('./build/files/**/*')
	.pipe(gulp.dest('./public/src/files/'));
});

//move views to public/src/views/
gulp.task('views', ['files'], function(){
	gulp.src('./build/views/**')
	.pipe(gulp.dest('./public/src/views/'));
});

//move .html files to public/
gulp.task('html', ['views'], function(){
	gulp.src('./build/html/*.html')
		.pipe(gulp.dest('./public/'));
});

//move img folder contents to public/src/img/
gulp.task('img', ['html'], function(){
	gulp.src('./build/img/**')
		.pipe(gulp.dest('./public/src/img'));
});

//move .js files from to public/src/js/
gulp.task('scripts', ['img'], function(){
	gulp.src('./build/js/**/*.js')
		.pipe(gulp.dest('./public/src/js/'));
});

//compile .sass files then move the .css to /public/src/css/
gulp.task('build', ['scripts'], function(){
	gulp.src('./build/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/src/css/'));
});

//look at the bower components required then move them to the lib folder
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('./public/src/js/lib'));
});

//Watch these files for changes and run the build
gulp.task('watch', function(){
    gulp.watch(
        ['./build/html/*.html', './build/js/*.js', './build/scss/*.scss','./build/img/**', './build/views/**', './bower_components'],
        ['build']
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

//The default task and task dependancies
gulp.task('default', ['build', 'bower', 'watch', 'serve']);
