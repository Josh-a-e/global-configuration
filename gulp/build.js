/**
 * Gulp Task: build
 * Purpose: compile all the es6 into exports that don't require a transform
 */
'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import debug from 'gulp-debug';

gulp.task('build', () => {
    return (
        gulp
            .src([ 'lib/**/*.*', '!lib/**/*.test.*' ])
            .pipe(debug({ title: 'BUILD' }))
            .pipe(babel())
            .pipe(gulp.dest('build'))
    );
});
