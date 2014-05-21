module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: ".",

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ["jasmine", "requirejs"],


        // list of files / patterns to load in the browser
        files: [
            // Testing dependencies
            "bower_components/jasmine/dist/jasmine-standalone-2.0.0/lib/jasmine-2.0.0/jasmine.js",
            "node_modules/karma-jasmine/lib/adapter.js",
            "bower_components/requirejs/require.js",
            "node_modules/karma-requirejs/lib/adapter.js",


            // Modifies primitive values to include necessary structures & algorithms functions
            "bin/js/Primitive.js",

            // Dependencies
            "node_modules/es6-collections/build/es6-collections.js",

            {pattern: 'bin/js/**/*.js', included: false},
            {pattern: 'test/**/*Spec.js', included: false},
            'test/main.js'
        ],

        // list of files / patterns to exclude
        exclude: [
            'bin/js/dsa.js'
        ],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            "Chrome",
            "Firefox",
            //"IE"
        ],

        // web server port
        //port: 9000,

        //hostname: "localhost",


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        reporters: ["dots"]
    });
};

