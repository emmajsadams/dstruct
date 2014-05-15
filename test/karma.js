module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: "",

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      "../node_modules/es6-collections/build/es6-collections.js",


      "../bin/dist.js",
      //TODO Tracuer?
      //"../bin/dist.traceur.js",

      // Specifications
      "../.temp/test/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [],

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
      "IE"
    ],

    // web server port
    //port: 9000,

    //hostname: "localhost",


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    reporters: ["story"]
  });
};

