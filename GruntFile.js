// Paths should not end with a forward slash!
var appPath = "app";
var appFileName = "App";

// Development and production paths must also be manually changed for less.files, uglify.files key
var productionPath = "production";
var developmentPath = "development";

module.exports = function(grunt) {
  // load all grunt tasks matching grunt-*
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    copy: {
      development: {
        expand: true,
        cwd: appPath,
        src: [
          'images/**/*',
          'views/**/*.html',
          'index.html'
        ],
        dest: developmentPath
      },
      developmentBower: {
        expand: true,
        src: [
          'bower_components/**/*'
        ],
        dest: developmentPath
      },
      production: {
        expand: true,
        cwd: appPath,
        src: [
          'images/**/*',
          'views/**/*.html',
          'index.html'
        ],
        dest: productionPath
      }
    },

    // Compiles TypeScript to JavaScript
    ts: {
      development: {
        // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
        src: [
          'ts/**/*.ts'
        ],

        // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
        //html: ["test/work/**/*.tpl.html"],

        // If specified, generate this file that to can use for reference management
        reference: "References.d.ts",

        // If specified, generate an out.js file which is the merged js file
        out: 'js/dist.js',

        // If specified, the generate JavaScript files are placed here. Only works if out is not specified
        //outDir: 'test/outputdirectory',

        // If specified, watches this directory for changes, and re-runs the current target
        //watch: 'ts',

        // Use to override the default options, http://gruntjs.com/configuring-tasks#options
        options: {
          // 'es3' (default) | 'es5'
          target: 'es5',
          // 'amd' (default) | 'commonjs'
          module: 'commonjs',
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
          basePath: "app/ts",
          sourceMap: false,
          declaration: false
        }
      },
  */
      /*
      unit: {
        src: [
          'ts/** /*.ts',
          'test/ts/** /*.ts'
        ],
        dest: 'test/js',
        options: {
          module: 'commonjs',
          target: 'es5',
          basePath: "test/ts",
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
      project: {
        files:{
          'js/dist.js': ['js/dist.traceur.js']
        }
      },
    },


    // The actual grunt server settings
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

    // Empties folders to start fresh
    clean: {
      development: {
        files: [{
          dot: true,
          src: [
            developmentPath
          ]
        }]
      },
      production: {
        files: [{
          dot: true,
          src: [
            productionPath
          ]
        }]
      }
    },


    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.js'
      }
    },

    uglify: {
      production: {
        files: {
          "js/dist.min.js": ["js/dist.traceur.js"]
        }

      }
    },

    concat: {},

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      compileDevelopment: [
        "ts:development",
        "tsd:refresh",
      ],
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        livereload: true
      },

      typescript: {
        files: appPath + '/ts/**/*.ts',
        tasks: [
          'typescript:development',
          'copy:development'
        ]
      },

      styles: {
        files: [appPath + '/styles/**/*.less'],
        tasks: [
          'less:development',
          'copy:development'
        ]
      },

      static: {
        files: [
          appPath + '/index.html',
          appPath + '/views/**/*.html',
          appPath + '/images/**/*'
        ],
        tasks: [
          'copy:development'
        ]
      }
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

  grunt.registerTask('serve', [
    'dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev', [
    //'clean:development',
    'concurrent:compileDevelopment',
    'traceur'
  ]);

  grunt.registerTask('prod', [
    'dev',
    'uglify'
  ]);

  grunt.registerTask('unit', [
    'typescript:unit',
    'karma'
  ]);
};