var mozjpeg = require( 'imagemin-mozjpeg' );
var path = require( 'path' );

/**
 * https://www.tutorialspoint.com/nodejs/nodejs_path_module.htm
 */
var ABSPATH          = path.resolve( '../../../' );
var WP_CONTENT       = ABSPATH + path.sep + 'wp-content';
var WP_PLUGIN_PATH   = WP_CONTENT + path.sep + 'plugins' + path.sep;
var WPMU_PLUGIN_PATH = WP_CONTENT + path.sep + 'mu-plugins' + path.sep;
var WP_THEME_PATH    = WP_CONTENT + path.sep + 'themes' + path.sep;
var TEMPLATEPATH     = WP_THEME_PATH + 'italystrap' + path.sep;
var STYLESHEETPATH   = WP_THEME_PATH + path.basename( path.resolve() ) + path.sep;

var bower_path = 'bower_components/';
var bootstrap_path = bower_path + 'bootstrap-sass/assets/';
var bootstrap_js_path = bootstrap_path + 'javascripts/bootstrap/';
var bootstrap_fonts_path = bootstrap_path + 'fonts/bootstrap/';

var auth = {
				host: 'ftp.overclokk.net',
				port: 21,
				authKey: 'key1'
			};
var sftp_auth = {
				host: 'ftp.overclokk.net',
				port: 22,
				authKey: 'sftp'
			};

var parent_path = 'E:/xampp/htdocs/italystrap/wp-content/';

module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        exec: { // https://github.com/jharding/grunt-exec
            bower: 'bower install'
        },

		uglify: {
			dist: {
				files: {
					'js/home.min.js': [
						bootstrap_js_path + '/transition.js',
						// bootstrap_js_path + '/alert.js',
						// bootstrap_js_path + '/button.js',
						bootstrap_js_path + '/carousel.js',
						bootstrap_js_path + '/collapse.js',
						bootstrap_js_path + '/dropdown.js',
						// bootstrap_js_path + '/modal.js',
						// bootstrap_js_path + '/tooltip.js',
						// bootstrap_js_path + '/popover.js',
						// bootstrap_js_path + '/scrollspy.js',
						// bootstrap_js_path + '/tab.js',
						bootstrap_js_path + '/affix.js',
						'js/src/all.js',
						'js/src/home.js', // <- Modify this
					],

					'js/singular.min.js': [
						bootstrap_js_path + '/transition.js',
						bootstrap_js_path + '/alert.js',
						bootstrap_js_path + '/button.js',
						bootstrap_js_path + '/carousel.js',
						bootstrap_js_path + '/collapse.js',
						bootstrap_js_path + '/dropdown.js',
						bootstrap_js_path + '/modal.js',
						bootstrap_js_path + '/tooltip.js',
						bootstrap_js_path + '/popover.js',
						bootstrap_js_path + '/scrollspy.js',
						bootstrap_js_path + '/tab.js',
						bootstrap_js_path + '/affix.js',
						'js/src/all.js',
						'js/src/singular.js' // <- Modify this
					],

					'js/archive.min.js': [
						bootstrap_js_path + '/transition.js',
						bootstrap_js_path + '/alert.js',
						bootstrap_js_path + '/button.js',
						bootstrap_js_path + '/carousel.js',
						bootstrap_js_path + '/collapse.js',
						bootstrap_js_path + '/dropdown.js',
						bootstrap_js_path + '/modal.js',
						bootstrap_js_path + '/tooltip.js',
						bootstrap_js_path + '/popover.js',
						bootstrap_js_path + '/scrollspy.js',
						bootstrap_js_path + '/tab.js',
						bootstrap_js_path + '/affix.js',
						'js/src/all.js',
						'js/src/archive.js' // <- Modify this
					],

					'js/custom.min.js': [
						bootstrap_js_path + '/transition.js',
						bootstrap_js_path + '/alert.js',
						bootstrap_js_path + '/button.js',
						bootstrap_js_path + '/carousel.js',
						bootstrap_js_path + '/collapse.js',
						bootstrap_js_path + '/dropdown.js',
						bootstrap_js_path + '/modal.js',
						bootstrap_js_path + '/tooltip.js',
						bootstrap_js_path + '/popover.js',
						bootstrap_js_path + '/scrollspy.js',
						bootstrap_js_path + '/tab.js',
						bootstrap_js_path + '/affix.js',
						'js/src/all.js',
						'js/src/custom.js' // <- Modify this
					],                   
				}
			}
		},

		jshint: {
			all: [
				'js/src/*.js',
				],
			options: true,
		},

		compass:{ // https://github.com/gruntjs/grunt-contrib-compass
			dev:{
				options: {
					sassDir:['sass'],
					cssDir:['css/src'],
					environment: 'development',
					// sourcemap: true,
					importPath: bootstrap_path + 'stylesheets'
				}
			},
			dist:{
				options: {
					sassDir:['sass'],
					cssDir:['css'],
					outputStyle: 'compressed',
					importPath: bootstrap_path + 'stylesheets',
					// specify:[
					// '*/**',
					// '!woocommerce/imported'
					// ]
				}
			}
		},

		/**
		 * LESS IS DEPRECATED, USE COMPASS
		 *
		 * @type {Object}
		 */
		less: { // https://github.com/gruntjs/grunt-contrib-less
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'css/bootstrap.min.css': ['css/src/less/bootstrap.less'],
				  }
			}
		},

		// cssmin: {
		//     combine: {
		//       files: {
		//         'css/custom.min.css': ['css/custom.css']
		//       }
		//     }
		// },

		csslint: { // http://astainforth.com/blogs/grunt-part-2
			files: ['css/*.css', '!css/bootstrap.min.css',],
			options: {
				csslintrc: '.csslintrc'
			}
		},

		/**
		 * Copy updated dependency
		 * $ grunt copy
		 */
		copy: { // https://github.com/gruntjs/grunt-contrib-copy
			bootstrapfonts: {
				expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
				cwd: bootstrap_fonts_path,
				src: ['**'],
				dest: 'fonts/',
				filter: 'isFile',
			},
			jquery: {
				expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
				cwd: bower_path + 'jquery/dist/',
				src: ['jquery.min.js'],
				dest: 'js/',
				filter: 'isFile',
			},
			parent_theme: {
				expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
				cwd: parent_path + 'themes/ItalyStrap/',
				src: ['**', '!node_modules/**', '!bower/**', '!tests/**'],
				dest: '../italystrap/',
				filter: 'isFile',
			},
			parent_plugins: {
				expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
				cwd: parent_path + 'plugins/italystrap-extended/',
				src: ['**', '!node_modules/**', '!bower/**', '!tests/**', '!bower_components/**', '!future-inclusions/**', '!bower.json', '!codeception.yml'],
				dest: '../../plugins/italystrap/',
				// dest: '../../plugins/italystrap/',
				// dest: 'E:/vagrant-local/www/gjav/htdocs/wp-content/plugins/italystrap/',
				filter: 'isFile',
			},
		},

		clean: { // https://github.com/gruntjs/grunt-contrib-clean
			options: { force: true },
			clean: [
				'../ItalyStrap',
				'../../plugins/italystrap'
			]
		},

		compress: { // https://github.com/gruntjs/grunt-contrib-compress
			main: {
				options: {
					archive: '../<%= pkg.name %> <%= pkg.version %>.zip' // Create zip file in theme directory
				},
				files: [
					{
						src: [
							'**' ,
							'!.git/**',
							'!.sass-cache/**',
							'!bower/**',
							'!node_modules/**',
							'!.gitattributes',
							'!.gitignore',
							'!.csslintrc',
							'!.jshintrc',
							// '!bower.json',
							'!Gruntfile.js',
							'!package.json',
							'!*.zip'], // What should be included in the zip
						dest: '<%= pkg.name %>/',        // Where the zipfile should go
						filter: 'isFile',
					},
				]
			}
		},

		watch: { // https://github.com/gruntjs/grunt-contrib-watch
			compass: {
				files: ['sass/*.{scss,sass}'],
				tasks: ['testcompassbuild'],
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['testjsbuild'],
			},
			options: {
				livereload: true,
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask( 'testcssbuild', ['compass', 'csslint'] );
	grunt.registerTask( 'testcompassbuild', ['compass','cssmin', 'csslint'] );
	grunt.registerTask( 'testjsbuild', ['jshint', 'uglify'] );

	grunt.registerTask('test', ['jshint', 'csslint']);

    grunt.registerTask( 'build', [
        'exec:bower',
        'copy:bootstrapfonts',
        'copy:jquery',
        'compass',
        'uglify'
        ]
    );

    /**
     * This task is only for my personal use.
     */
    grunt.registerTask( 'parent', [
        'clean',
        'copy:parent_theme',
        'copy:parent_plugins',
        ]
    );

	grunt.event.on('watch', function( action, filepath ) {
		grunt.log.writeln( filepath + ' has ' + action );
	});

	/**
	 * http://gruntjs.com/api/grunt.log
	 */
    grunt.registerTask( 'debug', 'Debug mode.', function( arg ) {
        // var msg = 'Doing something...';
        // var ABSPATH = path.resolve('../../../' );
        // var theme_name = path.basename( path.resolve() );
        // grunt.verbose.write( theme_name );
        // grunt.verbose.write( ABSPATH );
        // grunt.verbose.write( WP_CONTENT );
        // grunt.verbose.write( STYLESHEETPATH );
        grunt.verbose.write( arg );
        // grunt.verbose.write( pkg.name );
        return null;
    });
};