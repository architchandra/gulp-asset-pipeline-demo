// Configuration file for Gulp



var config = {};

// Build directory
config.directories = {};
config.directories.build = '../public/build';



config.tasks = {
    css: {
        default: {
            src: 'css/main.css',
            dest_name: 'style.css',
            extra_config: {
                tailwind: 'tailwind.config.js',
            },
        },
    },
};



module.exports = config;