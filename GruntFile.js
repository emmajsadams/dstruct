module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // load all grunt tasks matching grunt-*
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var tsAMDOptions = {
        // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
        src: ['lib/**/*.ts'],

        // If specified, generate this file that to can use for reference management
        // reference: 'References.d.ts',

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
                src: [
                    'lib/Interfaces.d.ts',
                    //'lib/dsa.ts',
                    'test/**/*.ts'
                ],
                //reference: 'test/TestReferences.d.ts',
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: false,
                    declaration: false,
                    removeComments: true
                },
            },
        },
/*
        // TODO: are these tasks still needed?
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

         // Run some tasks in parallel to speed up the build process
         concurrent: {},
 */

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.js'
            }
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