const mozjpeg = require( 'imagemin-mozjpeg' );
const path = require('path');

/**
 * ============================================================
 *
 * https://www.tutorialspoint.com/nodejs/nodejs_path_module.htm
 *
 * ============================================================
 */
const ABSPATH          = path.resolve( '../../../' );
const WP_CONTENT       = ABSPATH + path.sep + 'wp-content';
const WP_PLUGIN_PATH   = WP_CONTENT + path.sep + 'plugins' + path.sep;
const WPMU_PLUGIN_PATH = WP_CONTENT + path.sep + 'mu-plugins' + path.sep;
const WP_THEME_PATH    = WP_CONTENT + path.sep + 'themes' + path.sep;
const TEMPLATEPATH     = WP_THEME_PATH + 'italystrap' + path.sep;
const STYLESHEETPATH   = WP_THEME_PATH + path.basename( path.resolve() ) + path.sep;

const BOWER_PATH = 'bower_components/';
const BOOTSTRAP_PATH = BOWER_PATH + 'bootstrap/';
const BOOTSTRAP_JS_PATH = BOOTSTRAP_PATH + 'js/dist/';

const auth = {
				host: 'ftp.your-host.tld',
				port: 21,
				authKey: 'key1'
			};
const sftp_auth = {
				host: 'ftp.your-host.tld',
				port: 22,
				authKey: 'sftp'
			};

const parent_path = 'E:/xampp/htdocs/italystrap/wp-content/';

const italystrap_theme = [
	'**',
	'!codecept',
	'!.git/**',
	'!.gitattributes',
	'!.gitignore',
	'!.sass-cache/**',
	'!node_modules/**',
	'!bower/**',
	'!tests/**',
	'!future-inclusions/**',
	'!sass/**',
	'!css/src/**',
	'!js/src/**',
	'!snippets.md',
	'!bower.json',
	'!Gruntfile.js',
	'!package.json',
	'!*.yml',
	'!*.zip',
	'!**/*.map',
];

module.exports = function(grunt) {
	'use strict';

	/**
	 * https://www.npmjs.com/package/load-grunt-tasks
	 */
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        exec: { // https://github.com/jharding/grunt-exec
            bower: 'bower install'
        },

		uglify: {
			dist: {
				files: {
					'js/custom.min.js': [
						// bower_path + '/tether/dist/js/tether.js',
						BOOTSTRAP_JS_PATH + '/util.js',
						// BOOTSTRAP_JS_PATH + '/alert.js',
						// BOOTSTRAP_JS_PATH + '/button.js',
						BOOTSTRAP_JS_PATH + '/carousel.js',
						BOOTSTRAP_JS_PATH + '/collapse.js',
						BOOTSTRAP_JS_PATH + '/dropdown.js',
						BOOTSTRAP_JS_PATH + '/modal.js',
						// BOOTSTRAP_JS_PATH + '/scrollspy.js',
						BOOTSTRAP_JS_PATH + '/tab.js',
						// BOOTSTRAP_JS_PATH + '/tooltip.js',
						// BOOTSTRAP_JS_PATH + '/popover.js',
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
			dist:{
				options: {
					sassDir:['sass'],
					cssDir:['css'],
					outputStyle: 'compressed',
					importPath: BOOTSTRAP_PATH,
					// specify:[
					// '*/**',
					// '!woocommerce/imported'
					// ]
				}
			}
		},

		csslint: { // http://astainforth.com/blogs/grunt-part-2
			files: ['css/*.css', '!css/bootstrap.min.css',],
			options: {
				csslintrc: '.csslintrc'
			}
		},

		postcss: { // https://github.com/nDmitry/grunt-postcss
			options: {
				processors: [
					// require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
					//     require('cssnano')() // minify the result
				]
			},
			dist: {
				src: 'css/*.css'
			}
		},

		/**
		 * Copy updated dependency
		 * $ grunt copy
		 */
		copy: { // https://github.com/gruntjs/grunt-contrib-copy
			jquery: {
				expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
				cwd: BOWER_PATH + 'jquery/dist/',
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
				'../italystrap',
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
						src: italystrap_theme, // What should be included in the zip
						dest: '<%= pkg.name %>/',        // Where the zipfile should go
						filter: 'isFile',
					},
				]
			}
		},

		watch: { // https://github.com/gruntjs/grunt-contrib-watch
			compass: {
				files: ['sass/*.{scss,sass}'],
				tasks: ['css'],
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['js'],
			},
			options: {
				livereload: true,
			},
		},

	});

	grunt.registerTask( 'css', ['compass', 'postcss'] );
	grunt.registerTask( 'js', ['uglify'] );
	grunt.registerTask( 'test', ['jshint', 'csslint'] );

    grunt.registerTask( 'build', [
        // 'exec:bower',
        // 'copy:bootstrapfonts',
        // 'copy:jquery',
		'css',
		'js'
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