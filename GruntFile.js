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
    typescript: {
      development: {
        src: ['app/ts/**/*.ts'],
        dest: '.tmp/dist.js',
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3,
          basePath: "app/ts",
          sourceMap: false,
          declaration: false
        }
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
      unit: {
        src: [
          'app/ts/**/*.ts',
          'test/unit/**/*.ts'
        ],
        options: {
          module: 'commonjs',
          target: 'es5',
          sourceMap: false,
          declaration: false
        }
      },
/*
      integration: {
        src: [
          'test/integration/** /*.ts'
        ],
        //dest: 'test/integration.js',
        options: {
          module: 'commonjs',
          target: 'es5',
          sourceMap: false,
          declaration: false
        }
      }
*/
    },

    traceur: {
      options: {

        experimental: true
      },
      project: {
        files:{
          'app/dist.js': ['.tmp/dist.js']
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
          "production/app.js": productionPath + "/app.js"
        }

      }
    },

    concat: {},

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      compileDevelopment: [
        "typescript:development",
        "tsd:refresh",
      ],
      compileProduction: [
        "less:production",
        "typescript:production"
      ],
      production: [
        'imagemin',
        'svgmin'
      ]
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
    'clean:development',
    'concurrent:compileDevelopment',
    'traceur'
  ]);

  grunt.registerTask('unit', [
    'typescript:unit',
    'karma'
  ]);
};