'use strict';

module.exports = function (grunt) {


grunt.initConfig({

	uglify: {
		my_target: {
		  files: {
		    'advancedMultiselectDirective.min.js': ['advancedMultiselect/advancedMultiselectDirective.js', 'templates.js']
		  }
		}
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
	}

});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-angular-templates');

grunt.registerTask('default', ['uglify']);

};