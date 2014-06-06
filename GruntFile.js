module.exports = function (grunt) {
    // load all grunt tasks matching grunt-*
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    var tsAMDOptions = {
        // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
        src: ['lib/**/*.ts'],

        // If specified, generate this file that to can use for reference management
        reference: 'References.d.ts',

        outDir: 'bin/amd',

        // Use to override the default options, http://gruntjs.com/configuring-tasks#options
        options: {
            target: 'es5',
            module: 'amd',
            sourceMap: false,
            declaration: false,
            removeComments: true
        },
    };

    // Copy the AMD options, and switch the module to commonjs.
    var tsCommonJSOptions = JSON.parse(JSON.stringify(tsAMDOptions));
    tsCommonJSOptions.outDir = "bin/commonjs";
    tsCommonJSOptions.options.module = "commonjs";

    grunt.initConfig({

        // Empties folders to start fresh
        clean: {
            development: {
                files: [
                    {
                        dot: true,
                        src: [
                            'bin',
                            'lib/**/**.js',
                        ]
                    }
                ]
            },
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "bin/amd",
                    paths: {},
                    name: "dsa",
                    out: "bin/dsa.amd.min.js"
                }
            }
        },

        ts: {
            amd: tsAMDOptions,
            commonjs: tsCommonJSOptions,
            unit: {
                // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                src: [
                    'lib/Interfaces.d.ts',
                    //'lib/dsa.ts',
                    'test/**/*.ts'
                ],

                // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
                //html: ['test/work/**/*.tpl.html'],

                // If specified, generate this file that to can use for reference management
                reference: 'test/TestReferences.d.ts',

                // If specified, generate an out.js file which is the merged js file
                //out: '',

                // If specified, the generate JavaScript files are placed here. Only works if out is not specified
                //outDir: '.temp',

                //baseDir: '',

                // If specified, watches this directory for changes, and re-runs the current target
                //watch: 'ts',

                // Use to override the default options, http://gruntjs.com/configuring-tasks#options
                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es5',
                    // 'amd' guarantees that the compiled output is sorted according to the dependency graph
                    module: 'amd',
                    // true (default) | false
                    sourceMap: false,
                    // true | false (default)
                    declaration: false,
                    // true (default) | false
                    removeComments: true
                },
            },

            /*
             production: {
             src: ['app/ts/** /*.ts'],
             dest: 'production/app.js',
             options: {
             module: 'commonjs',
             target: 'es5',
             basePath: 'app/ts',
             sourceMap: false,
             declaration: false
             }
             },
             */
            /*
             unit: {
             src: [

             ],
             dest: 'test/js',
             options: {
             module: 'commonjs',
             target: 'es5',
             basePath: 'test/ts',
             sourceMap: false,
             declaration: false
             }
             },
             */
        },

        traceur: {
            options: {
                experimental: true
            },
            typescript: {
                files: {
                    'bin/dist.traceur.js': ['bin/dist.js']
                }
            },
        },

        uglify: {
            production: {
                files: {
                    'bin/dist.min.js': ['bin/dist.traceur.js']
                }

            }
        },


        // The actual grunt server settings
        /*
         connect: {
         options: {
         port: 9000,
         hostname: 'localhost',
         livereload: 35729
         },
         livereload: {
         options: {
         open: true,
         base: [
         developmentPath
         ]
         }
         }
         },
         */

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.js'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            compileDevelopment: [
                'ts:development',
                'tsd:refresh',
            ],
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: true
            },

            typescript: {
                files: 'lib/ts/**/*.ts',
                tasks: [
                    'dev'
                ]
            },

        },

        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: true,

                    // optional: specify config file
                    config: './tsd.json'
                }
            }
        }

    });


    grunt.registerTask('dev', [
        'clean:development',
        'ts:amd'
        //'requirejs'
        //'concurrent:compileDevelopment',
        //'traceur',
        //'watch:typescript'
    ]);

    grunt.registerTask('prod', [
        'dev',
        'ts:commonjs',
        'requirejs'
    ]);

    grunt.registerTask('test', [
        //'clean:unit',
        //'ts:unit',
        'dev',
        'karma'
    ]);
};