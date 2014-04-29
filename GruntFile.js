module.exports = function(grunt) {
  // load all grunt tasks matching grunt-*
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Empties folders to start fresh
    clean: {
      development: {
        files: [{
          dot: true,
          src: [
            'lib/js',

          ]
        }]
      },

      unit: {
        files: [{
          dot: true,
          src: [
            'test/js',

          ]
        }]
      },
    },

    // Compiles TypeScript to JavaScript
    ts: {
      development: {
        // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
        src: [
          'lib/ts/**/TreeNode.ts',
          'lib/ts/**/*.ts'
        ],

        // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
        //html: ['test/work/**/*.tpl.html'],

        // If specified, generate this file that to can use for reference management
        reference: 'lib/References.d.ts',

        // If specified, generate an out.js file which is the merged js file
        out: 'lib/js/dist.js',

        // If specified, the generate JavaScript files are placed here. Only works if out is not specified
        //outDir: 'test/outputdirectory',

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

      unit: {
        // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
        src: [
          'lib/ts/**/*.ts',
          'test/ts/**/*.ts'
        ],

        // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
        //html: ['test/work/**/*.tpl.html'],

        // If specified, generate this file that to can use for reference management
        reference: 'test/TestReferences.d.ts',

        // If specified, generate an out.js file which is the merged js file
        //out: '',

        // If specified, the generate JavaScript files are placed here. Only works if out is not specified
        outDir: 'test/js',

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
        files:{
          'lib/js/dist.traceur.js': ['lib/js/dist.js']
        }
      },
    },

    uglify: {
      production: {
        files: {
          'lib/js/dist.min.js': ['lib/js/dist.traceur.js']
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
        configFile: 'test/karma.js'
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
    'ts:development',
    //'concurrent:compileDevelopment',
    'traceur',
    //'watch:typescript'
  ]);

  grunt.registerTask('prod', [
    'dev',
    'uglify'
  ]);

  grunt.registerTask('unit', [
    'clean:unit',
    'ts:unit',
    'karma'
  ]);
};