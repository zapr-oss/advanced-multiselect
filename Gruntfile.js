'use strict';

module.exports = function (grunt) {


grunt.initConfig({

	uglify: {
		my_target: {
		  files: {
		    'advancedMultiselectDirective.min.js': ['advancedMultiselectDirective.js']
		  }
		}
	},

	concat: {
	    options: {
	      separator: ';',
	    },
	    dist: {
	      src: ['advancedMultiselect/advancedMultiselectDirective.js', 'templates.js'],
	      dest: 'advancedMultiselectDirective.js',
	    },
	},

	ngtemplates: {
	  dist: {
	    options: {
	      module: 'advancedMultiselect'
	    },
	    cwd: 'advancedMultiselect/',
	    src: 'advancedMultiselect.html',
	    dest: 'templates.js',
	    htmlmin: {
	            removeComments: true,
	            collapseWhitespace: true,
	            collapseBooleanAttributes: true
	    }
	  }
	},

	cssmin: {
		options: {
			//
		},
		compress: {
			files: [{
				expand: true,
				cwd: 'advancedMultiselect/',
				src: ['*.css', '!*.min.css'],
				dest: "",
				ext: ".min.css",
				extDot: 'last'
			}]
		}
	}

});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-angular-templates');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin']);

};