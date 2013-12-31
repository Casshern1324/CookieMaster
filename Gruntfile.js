module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Remove all files from build directory
		 */
		clean: {
			build: {
				src: [ 'build' ]
			},
		},
		/**
		 * Copy over the bookmarklet as-is
		 */
		copy: {
			main: {
				src: 'src/bookmarklet.js',
				dest: 'build/bookmarklet.js',
			},
		},
		/**
		 * Minify the other JS files into the build directory
		 */
		uglify: {
			build: {
				files: {
					'build/cm-bootstrap.min.js': 'src/cm-bootstrap.js',
					'build/cookiemaster.min.js': 'src/cookiemaster.js'
				}
			}
		},
		/**
		 * Optimize the CSS file
		 */
		cssc: {
			build: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors:    true
				},
				files: {
					'build/cookiemaster.min.css': 'src/cookiemaster.css'
				}
			}
		},
		/**
		 * Minify the CSS file
		 */
		cssmin: {
			build: {
				src:  'build/cookiemaster.min.css',
				dest: 'build/cookiemaster.min.css'
			}
		},
		/**
		 * Increment version number across all files
		 */
		version: {
			options: {
				prefix: '[^\\-][Vv]ersion[\'"]?\\s*[:=]\\s*[\'"]?'
			},
			defaults: {
				src: ['src/cookiemaster.js', 'src/cookiemaster.css', 'src/cm-bootstrap.js']
			},
		},
		/**
		 * Change paths to production ones on build
		 */
		replace: {
			sources: {
				src: ['build/cm-bootstrap.min.js', 'build/bookmarklet.js'],
				overwrite: true,
				replacements: [
					{
						from: '../cookiemaster/src/cookiemaster.js',
						to: '//rawgithub.com/greenc/CookieMaster/master/build/cookiemaster.min.js'
					},
					{
						from: '../cookiemaster/src/cookiemaster.css',
						to: '//rawgithub.com/greenc/CookieMaster/master/build/cookiemaster.min.css'
					},
					{
						from: '../cookiemaster/src/cm-bootstrap.js',
						to: '//rawgithub.com/greenc/CookieMaster/master/build/cm-bootstrap.min.js'
					}
				]
			},
			ccLink: {
				src: ['build/cookiemaster.min.js'],
				overwrite: true,
				replacements: [
					{
						from: 'http://dev:8080/cookieclicker/',
						to: 'http://orteil.dashnet.org/cookieclicker/'
					}
				]
			}
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('css',  ['cssc', 'cssmin']);
	grunt.registerTask('build', ['clean', 'copy', 'css', 'uglify', 'replace']);

};