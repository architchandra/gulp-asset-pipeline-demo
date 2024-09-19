// Configuration file for Gulp



var config = {};

// Build directory
config.directories = {};
config.directories.build = '../../public/build';
// var buildDirectory = config.directories.build;



config.tasks = {
    css: {
        default: {
            src: 'css/main.css',
            dest: 'style.css',
            extra_config: {
                tailwind: 'tailwind.config.js',
            },
            watch: [
                'css/**/*.css',
                'tailwind.config.js',
            ],
        },
    },
};



module.exports = config;
