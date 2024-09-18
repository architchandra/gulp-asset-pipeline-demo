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
            .src(task_config.src)
            .pipe(rename(task_config.dest))
            .pipe(postcss([
                require('postcss-import'),
            ]))
            .pipe(gulp.dest(config.directories.build));
    };
});