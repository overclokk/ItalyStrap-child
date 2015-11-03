module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'js/home.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        // 'js/src/bootstrapJS/alert.js',
                        // 'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        // 'js/src/bootstrapJS/modal.js',
                        // 'js/src/bootstrapJS/tooltip.js',
                        // 'js/src/bootstrapJS/popover.js',
                        // 'js/src/bootstrapJS/scrollspy.js',
                        // 'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
                        'js/src/all.js',
                        'js/src/home.js', // <- Modify this
                    ],

                    'js/singular.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        'js/src/bootstrapJS/alert.js',
                        'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        'js/src/bootstrapJS/modal.js',
                        'js/src/bootstrapJS/tooltip.js',
                        'js/src/bootstrapJS/popover.js',
                        'js/src/bootstrapJS/scrollspy.js',
                        'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
                        'js/src/all.js',
                        'js/src/singular.js' // <- Modify this
                    ],

                    'js/archive.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        'js/src/bootstrapJS/alert.js',
                        'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        'js/src/bootstrapJS/modal.js',
                        'js/src/bootstrapJS/tooltip.js',
                        'js/src/bootstrapJS/popover.js',
                        'js/src/bootstrapJS/scrollspy.js',
                        'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
                        'js/src/all.js',
                        'js/src/archive.js' // <- Modify this
                    ],

                    'js/custom.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        'js/src/bootstrapJS/alert.js',
                        'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        'js/src/bootstrapJS/modal.js',
                        'js/src/bootstrapJS/tooltip.js',
                        'js/src/bootstrapJS/popover.js',
                        'js/src/bootstrapJS/scrollspy.js',
                        'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
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
            src:{
                options: {
                    sassDir:['css/src/sass'],
                    cssDir:['css/'],
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
                csslintrc: '.csslintrc'
            }
        },

        /**
         * Copy updated dependency
         * $ grunt copy
         */
        copy: { // https://github.com/gruntjs/grunt-contrib-copy
            css: {
                expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
                cwd: '../ItalyStrap/css/',
                src: ['**'],
                dest: 'css/',
                filter: 'isFile',
            },
            js: {
                expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
                cwd: '../ItalyStrap/js/',
                src: ['**'],
                dest: 'js/',
                filter: 'isFile',
            },
            fonts: {
                expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
                cwd: '../ItalyStrap/fonts/',
                src: ['**'],
                dest: 'fonts/',
                filter: 'isFile',
            },
            scriptphp: {
                expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
                cwd: '../ItalyStrap/lib/',
                src: ['script.php'],
                dest: 'lib/',
                filter: 'isFile',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/PARENT_PATH\s\./g,"CHILD_PATH .");
                    },
                },
            },
            // jquery: {
            //     expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
            //     cwd: '../ItalyStrap/js/',
            //     src: ['jquery.min.js'],
            //     dest: 'js/',
            //     filter: 'isFile',
            // },
            img: {
                expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
                cwd: '../ItalyStrap/img/',
                src: ['**'],
                dest: 'img/',
                filter: 'isFile',
            },
            parent: {
                expand: true, // https://github.com/gruntjs/grunt-contrib-copy/issues/90
                cwd: 'E:/xampp/htdocs/italystrap/wp-content/themes/ItalyStrap/',
                src: ['**', '!node_modules/**', '!bower/**'],
                dest: '../ItalyStrap/',
                filter: 'isFile',
            },
        },

        clean: { // https://github.com/gruntjs/grunt-contrib-clean
            options: { force: true },
            clean: ['../ItalyStrap']

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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('testcssbuild', ['less', 'compass', 'csslint']);
    grunt.registerTask('testcompassbuild', ['compass','cssmin', 'csslint']);
    grunt.registerTask('testjsbuild', ['jshint', 'uglify']);

    grunt.registerTask('parent', ['clean', 'copy:parent']);

    grunt.registerTask('copysrc', [
                                'copy:css',
                                'copy:js',
                                'copy:fonts',
                                'copy:scriptphp',
                                'copy:img'
                                ]);

    grunt.registerTask('child-init', ['parent', 'copysrc']);

    grunt.registerTask('test', ['jshint', 'csslint']);
    grunt.registerTask('build', ['uglify', 'less', 'compass']);

    grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
    });

}