const gulp = require('gulp');
const config = require('./gulp.config');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');



var css_tasks = [];
var watch_files = [];



// CSS tasks
Object.entries(config.tasks.css).forEach(([task_name, task_config]) => {
    task_name = 'css-' + task_name;
    css_tasks.push(task_name);

    watch_files.push([
        task_name,
        task_config.watch,
        task_config.watch_config || {},
    ]);

    exports[task_name] = () => {
        return gulp
            .src(task_config.src, { sourcemaps: true })
            .pipe(rename(task_config.dest))
            .pipe(postcss(
                [
                    require('postcss-import'),
                    require('tailwindcss/nesting'),
                    task_config.extra_config?.tailwind
                        ? require('tailwindcss')(task_config.extra_config.tailwind)
                        : false,
                    require('autoprefixer'),
                ].filter((plugin) => !!plugin)
            ))
            .pipe(gulp.dest(config.directories.build, { sourcemaps: '.' }));
    };
});



// Watch tasks
function watch() {
    watch_files.forEach(([task_name, task_files, task_watch_config = {}]) => {
        gulp.watch(
            task_files,
            Object.assign({ ignoreInitial: false }, task_watch_config),
            gulp.series(task_name)
        );
    });
}



exports.default = watch;
