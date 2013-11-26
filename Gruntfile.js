var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload') ({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      app: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.coffee'],
          dest: 'build',
          rename: function(dest, src) {
            return dest + '/' + src.replace(/\.coffee$/, '.js');
          }
        }]
      }
    },
    
    copy: {
      app: {
        files: [
          // deploying files into build dir
          {expand: true, flatten: true, src: ['app/assets/style/*'], dest: 'build/assets/style/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['app/assets/img/*'], dest: 'build/assets/img/', filter: 'isFile'},
          {expand: true, cwd: 'app/extern/', src: '**/*', dest: 'build/extern/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['app/*.html'], dest: 'build/'},
        ]
      }
    },
    
    clean:{
      app: {
        src: ['build']
      }
    },
    
    // this, is orgasmically neat
    watch: {
        bower:{
            files: ['app/bower_components/*'],
        },
        coffee: {
            files: ['app/scripts/**/*.coffee'],
            tasks: ['coffee:app']
        },
        css: {
            files: ['app/assets/style/**/*.css'],
        },
        img: {
            files: ['app/assets/img/**/*.{png,jpg,jpeg,gif}'],
        },
        livereload: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            files: [
                'build/app/{scripts,assets}/**/*'
            ]
        }
    },
    connect: {
        options: {
            port: 9000,
            hostname: 'localhost'
        },
        livereload: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, 'build'),
                    ];
                }
            }
        }
    },
    open: {
        server: {
            path: 'http://localhost:<%= connect.options.port %>'
        }
    },
    
    
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Tasks
  grunt.registerTask('build', ['clean','coffee', 'copy']);
  grunt.registerTask('server', function (target) {
      if (target === 'build') {
          return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }

      grunt.task.run([
        'build',
        'connect:livereload',
        'open',
        'watch'
      ]);
  });
  
  grunt.registerTask('default', ['build']);
};