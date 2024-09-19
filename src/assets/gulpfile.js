const gulp = require('gulp');
const config = require('./gulp.config');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const build_directory = config.directories.build;



var css_tasks = [];
var js_tasks = [];
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



// JS Tasks
Object.entries(config.tasks.js).forEach(([task_name, task_config]) => {
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify');

    task_name = 'js-' + task_name;
    js_tasks.push(task_name);
    watch_files.push([
        task_name,
        task_config.watch,
        task_config.watch_config || {},
    ]);

    exports[task_name] = () => {
        return gulp
            .src(task_config.src, { sourcemaps: true })
            .pipe(concat(task_config.dest))
            .pipe(gulp.dest(build_directory))
            .pipe(uglify())
            .pipe(rename({ suffix: config.minify_suffix }))
            .pipe(gulp.dest(build_directory, { sourcemaps: '.' }))
    };
});



// Build task
exports['build'] = gulp.series(css_tasks.map((task) => exports[task]));



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
