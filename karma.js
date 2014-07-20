module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: ".",

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ["jasmine", "requirejs"],


        // list of files / patterns to load in the browser
        files: [
            // Dependencies
            "node_modules/es6-map-shim/es6-map-shim.js",

            // Testing dependencies
            "bower_components/jasmine/lib/jasmine-core/jasmine.js",
            "node_modules/karma-jasmine/lib/adapter.js",
            "bower_components/requirejs/require.js",
            "node_modules/karma-requirejs/lib/adapter.js",


            // Modifies primitive values to include necessary structures & algorithms functions
            "bin/amd/Primitive.js",

            {pattern: 'bin/amd/**/*.js', included: false},
            {pattern: 'test/**/*Spec.js', included: false},
            'test/TestModule.js'
        ],

        // list of files / patterns to exclude
        exclude: [
            'bin/amd/dsa.js'
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
            "Firefox"
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

