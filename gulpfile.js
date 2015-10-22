var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
var gutil = require("gulp-util");
var imagemin = require('gulp-imagemin');
var minify = require('gulp-minify-css');
var notify = require("gulp-notify");
var path = require('path');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var webpack = require('webpack');

var config = {
  buildPath: 'build/',
  sass: {
    src: "frontend/stylesheets/**/*.{sass,scss}",
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'frontend/images' // Used by the image-url helper
    }
  },
  js: {
    src: "frontend/javascripts/**",
  },
  images: {
    src: "frontend/images/**",
  },
  bower_components: [
    "./bower_components/normalize.css/normalize.css",
    "./bower_components/material-design-icons/iconfont/*.ttf"
  ]
};

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  this.emit('end');
};

// ==================== TASKS =========================

gulp.task('default', ['build-dev', 'images', 'sass', 'bower', 'watch']);

gulp.task('build', function(callback) {
  var tasks = [['images'], ['sass'], ['webpack:build']];

  tasks.push(callback);

  gulpSequence.apply(this, tasks);
});

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(changed(config.buildPath)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.buildPath));
});

gulp.task('sass', function () {
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.settings))
    .on('error', handleErrors)
    .pipe(concat('build.css'))
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.buildPath));
});

gulp.task('bower', function() {
  return gulp.src(config.bower_components)
    .pipe(gulp.dest(config.buildPath));
})

gulp.task('watch', function(callback) {
  watch(config.sass.src, function() { gulp.start('sass'); });
  watch(config.images.src, function() { gulp.start('images'); });
});

// ====================== WEBPACK ============================

var webpackConfig = {
  entry: './frontend/javascripts/main.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'frontend', 'javascripts'),
        loaders: ['jsx', 'babel']
      }
    ]
  },
  plugins: [],
  stats: {
    colors: true
  },
  devtool: 'sourcemap'
}

gulp.task("build-dev", ["webpack:build-dev"], function() {
  watch(config.js.src, function() { gulp.start('webpack:build-dev'); });
});

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    // gutil.log("[webpack:build-dev]", stats.toString({
    //   colors: true
    // }));
    callback();
  });
});

