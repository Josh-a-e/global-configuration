// /**
//  * Gulp Task: coverage
//  * Purpose: populate /coverage with data
//  */

// import gulp from 'gulp';
// import debug from 'gulp-debug';
// import istanbul from 'gulp-istanbul';
// import mocha from 'gulp-mocha';
// import babel from 'gulp-babel';

// gulp.task('coverage', (callback) => {
//     return (
//         gulp.src([ 'lib/**/*' ])
//             .pipe(babel())
//             .pipe(debug({ title: 'COVERAGE 1' }))
//             .pipe(istanbul()) // Covering files
//             .pipe(istanbul.hookRequire()) // Force `require` to return covered files
//             .on('finish', () => {
//                 gulp.src([ 'test/*.js' ])
//                     .pipe(debug({ title: 'COVERAGE 2' }))
//                     .pipe(mocha())
//                     .pipe(istanbul.writeReports())
//                     .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
//                     .on('end', callback);
//             })
//     );
// });
