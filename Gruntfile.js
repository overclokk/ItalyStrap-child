module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'js/home.min.js': [
                        '../ItalyStrap/js/src/bootstrapJS/transition.js',
                        // '../ItalyStrap/js/src/bootstrapJS/alert.js',
                        // '../ItalyStrap/js/src/bootstrapJS/button.js',
                        '../ItalyStrap/js/src/bootstrapJS/carousel.js',
                        '../ItalyStrap/js/src/bootstrapJS/collapse.js',
                        '../ItalyStrap/js/src/bootstrapJS/dropdown.js',
                        // '../ItalyStrap/js/src/bootstrapJS/modal.js',
                        // '../ItalyStrap/js/src/bootstrapJS/tooltip.js',
                        // '../ItalyStrap/js/src/bootstrapJS/popover.js',
                        // '../ItalyStrap/js/src/bootstrapJS/scrollspy.js',
                        // '../ItalyStrap/js/src/bootstrapJS/tab.js',
                        '../ItalyStrap/js/src/bootstrapJS/affix.js',
                        'js/src/all.js',
                        'js/src/home.js', // <- Modify this
                    ],

                    'js/singular.min.js': [
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
                        'js/src/all.js',
                        'js/src/singular.js' // <- Modify this
                    ],

                    'js/archive.min.js': [
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
                        'js/src/all.js',
                        'js/src/archive.js' // <- Modify this
                    ],

                    'js/custom.min.js': [
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
                        'js/src/all.js',
                        'js/src/custom.js' // <- Modify this
                    ],                   
                }
            }
        },

        jshint: {
            all: [
                'js/*.js',
                // '!js/bootstrap.min.js',
                // '!js/jquery.min.js'
                ]
        },

        compass:{ // https://github.com/gruntjs/grunt-contrib-compass
            src:{
                options: {
                    sassDir:['css/src/sass'],
                    cssDir:['css/src/'],
                    outputStyle: 'compressed'
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
                "important": false,
                "ids": false,
            }
        },

        watch: { // https://github.com/gruntjs/grunt-contrib-watch
            compass: {
                files: ['css/src/sass/*.{scss,sass}'],
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

    grunt.registerTask('testcssbuild', ['less', 'compass', 'csslint']);
    grunt.registerTask('testcompassbuild', ['compass','cssmin', 'csslint']);
    grunt.registerTask('testjsbuild', ['jshint', 'uglify']);

    grunt.registerTask('test', ['jshint', 'csslint']);
    grunt.registerTask('build', ['uglify', 'less', 'compass']);

    grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
    });

}