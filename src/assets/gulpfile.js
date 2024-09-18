const gulp = require('gulp');
const gulp_config = require('./gulpconfig');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');



var css_tasks = [];



// CSS tasks
Object.entries(config.tasks.css).forEach(([task_name, task_config]) => {
    task_name = 'css-' + task_name;
    css_tasks.push(task_name);
    
    exports[task_name] = () => {
        return gulp
            .src(task_name.src)
            .pipe(rename(task_name.dest_name))
    };
});