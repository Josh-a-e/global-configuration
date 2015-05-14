/**
 * Gulp Task: test
 * Purpose: run all the tests
 */

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import debug from 'gulp-debug';

gulp.task('test', () => {
    return (
        gulp
            .src([ 'test/**/*' ])
            .pipe(debug({ title: 'TEST' }))
            .pipe(mocha())
    );
});

// module.exports = function testTaskGenerator(taskName, options) {
//     gulp.task(taskName, [ '_test' ], function gulpTest() {
//         const watchForChanges = !!argv.watch;

//         if (watchForChanges) {
//             const directory = path.join(options.baseDir, (argv.dir || '.'), '**');
//             util.log('watching for changes in ' + directory);
//             gulp.watch([ directory ], [ '_' + taskName ]);
//         }
//     });

//     gulp.task('_' + taskName, function gulpTest() {
//         const watchForChanges = !!argv.watch;
//         const bailOnFirstError = !!argv.bail;

//         const testsGlob = path.join(options.baseDir, (argv.dir || '/**/'), (argv.file || '*.test.*'));
//         let failedTests = 0;
//         util.log('running tests...');
//         return (
//             gulp
//                 .src([ testsGlob ], { read: false })
//                 .pipe(debug())
//                 .pipe(mocha({ reporter: 'list', bail: bailOnFirstError }))
//                 .on('error', function mochaOnError(error) {
//                     util.log(util.colors.red('mocha error:'));
//                     util.log(error);
//                     failedTests++;
//                 })
//                 .on('end', function mochaOnEnd() {
//                     util.log('tests complete for ' + testsGlob + ' with ' + failedTests + ' failures');
//                     if (!watchForChanges) {
//                         if (failedTests === 0) {
//                             util.log(util.colors.green(asciiArt.boatAfloat));
//                         } else {
//                             util.log(util.colors.red(asciiArt.mushroomCloud));
//                         }
//                         process.exit();
//                     }
//                 })
//         );
//     });
// };
