const gulp = require('gulp');
const config = require('./gulpconfig');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');



var css_tasks = [];



// CSS tasks
Object.entries(config.tasks.css).forEach(([task_name, task_config]) => {
    task_name = 'css-' + task_name;
    css_tasks.push(task_name);

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
