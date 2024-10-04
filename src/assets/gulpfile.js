const gulp = require('gulp');
const config = require('./gulp.config');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');



var copy_tasks = [];
var css_tasks = [];
var js_tasks = [];
var watch_files = [];



// Copy tasks
Object.entries(config.tasks.copy).forEach(([task_name, task_config]) => {
    task_name = 'copy-' + task_name;
    copy_tasks.push(task_name);

    watch_files.push([
        task_name,
        task_config.watch,
        task_config.watch_config || {},
    ]);

    exports[task_name] = () => {
        return gulp
            .src(task_config.src)
            .pipe(gulp.dest(task_config.dest));
    };
});



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
            .pipe(rename(task_config.name))
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
            .pipe(concat(task_config.name))
            .pipe(gulp.dest(task_config.dest))
            .pipe(uglify())
            .pipe(rename({ suffix: config.minify_suffix }))
            .pipe(gulp.dest(task_config.dest, { sourcemaps: '.' }))
    };
});



// Hash tasks
const hashConfig = config.tasks.hash;

function generateHash() {
    const hashsum = require('gulp-hashsum');

    return gulp
        .src(config.tasks.hash.src)
        .pipe(hashsum({
            filename: config.tasks.hash.dest + '/manifest.json',
            json: true,
        }));
}
function prettyHash() {
    const jsonFormat = require('gulp-json-format');

    return gulp
        .src(hashConfig.dest + '/manifest.json')
        .pipe(jsonFormat(4))
        .pipe(gulp.dest(hashConfig.dest));
}
exports.hash = gulp.series(generateHash, prettyHash);

watch_files.push([
    'hash',
    hashConfig.watch,
    { ignoreInitial: true },
]);



// Build task
exports['build'] = gulp.series(
    css_tasks.map((task) => exports[task]),
    js_tasks.map((task) => exports[task]),
    exports.hash
);



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
