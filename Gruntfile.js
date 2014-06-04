module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({

        uglify: {
            dist: {
                files: {
                    'js/bootstrap.min.js': [
                        '../ItalyStrap/js/src/bootstrapJS/transition.js',
                        '../ItalyStrap/js/src/bootstrapJS/alert.js',
                        '../ItalyStrap/js/src/bootstrapJS/button.js',
                        '../ItalyStrap/js/src/bootstrapJS/carousel.js',
                        '../ItalyStrap/js/src/bootstrapJS/collapse.js',
                        '../ItalyStrap/js/src/bootstrapJS/dropdown.js',
                        '../ItalyStrap/js/src/bootstrapJS/modal.js',
                        '../ItalyStrap/js/src/bootstrapJS/tooltip.js',
                        '../ItalyStrap/js/src/bootstrapJS/popover.js',
                        '../ItalyStrap/js/src/bootstrapJS/scrollspy.js',
                        '../ItalyStrap/js/src/bootstrapJS/tab.js',
                        '../ItalyStrap/js/src/bootstrapJS/affix.js',
                    ]
                }
            }
        },

        jshint: {
            all: ['js/*.js', '!js/bootstrap.min.js', '!js/jquery.min.js']
        },

        compass:{ // https://github.com/gruntjs/grunt-contrib-compass
            src:{
                options: {
                    // sassDir:['../ItalyStrap/css/src/sass'],
                    // cssDir:['css'],
                    // outputStyle: 'compressed'
                }
            },
        },

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

        csslint: { // http://astainforth.com/blogs/grunt-part-2
            files: ['css/*.css', '!css/bootstrap.min.css',],
            options: {
                "important": false,
                "ids": false,
            }
        },

        watch: { // https://github.com/gruntjs/grunt-contrib-watch
            css: {
                files: ['**/*.{scss,sass}'],
                tasks: ['testcssbuild'],
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['testjsbuild'],
            },
            options: {
                livereload: 9000,
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('testcssbuild', ['less', 'compass', 'csslint']);
    grunt.registerTask('testjsbuild', ['jshint', 'uglify']);

    grunt.registerTask('test', ['jshint', 'csslint']);
    grunt.registerTask('build', ['uglify', 'less', 'compass']);

    grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
    });

}