module.exports = function(grunt) {

	grunt.initConfig({

		// read the project info
		pkg: grunt.file.readJSON('package.json'),

		// add temp folder for grunt-tasks
		clean: {
			dist: ['grunt-tmp']
		},

		// copy images from assets to build
		copy: {
			dist: {
				files: [
					{ flatten: true, expand: true, src: ['assets/images/*'], dest: 'build/images/', filter: 'isFile' },
					{ expand: true, flatten: true, src: ['assets/fonts/*'], dest: 'build/fonts/', filter: 'isFile' }
				]
			}
		},

		// merge all the js-files with concat
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['assets/js/libs/*.js', 'assets/js/app.js'],
				dest: 'grunt-tmp/production.js'
			}
		},

		// uglify files
		uglify: {
			all: {
				files: {
				'build/js/production.min.js': ['grunt-tmp/production.js']
				}
			}
		},

		// minify images
		imagemin: {
			all: {
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/images/'
				}]
			}
		},

		// sass > css
		sass: {
			options: {
				style: 'compressed',
				sourcemap: 'none' // ta bort sourcemap - stäng av vid debug
			},
			dist: {
				files: {
				'build/css/master.css': 'assets/scss/master.scss'
				}
			}
		},

		postcss: {
			options: {
				map: false, // ta bort sourcemaps från postcss
				processors: [
					require('autoprefixer')({browsers: ['last 2 version', 'ie 8', 'ie 9']}),
					require('cssnano')() // minify the result
				]
			},
			dist: {
				src: 'build/css/*.css' // -> src/css/file1.css, src/css/file2.css
			}
		},

		// watch our files
		watch: {
			options: {
					livereload: true
			},
			php: {
				files: ['*.php']
			},
			scripts: {
				files: ['assets/js/app.js'],
				tasks: ['concat','uglify','clean']
			},
			sass: {
				files: ['assets/scss/*.scss','assets/scss/*/*.scss'],
				tasks: ['sass', 'postcss']
			},
			images: {
				files: ['assets/images/*.{png,jpg,gif}'],
				tasks: ['copy', 'imagemin']
			},
		},

		browserSync: {
		    dev: {
		        bsFiles: {
		            src : ["build/css/*.css", "build/js/*.js", "*.html"]
		        },
		        options: {
					server: './'
		        }
		    }
		}

	});

	// load all our tasks
	require('load-grunt-tasks')(grunt);

	// default task
	grunt.registerTask('default', [
		'clean',
		'copy',
		'concat',
		'uglify',
		'imagemin',
		'sass',
		'postcss',
		'clean'
	]);
};
