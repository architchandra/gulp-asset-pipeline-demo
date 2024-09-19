// Configuration file for Gulp



var config = {};

// Build directory
config.directories = {};
config.directories.build = '../../public/build';

// Naming config
config.minify_suffix = '.min';



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

    js: {
        alpine: {
            src: [
                '../../node_modules/alpinejs/dist/cdn.js',
            ],
            dest: 'alpine_bundle.js',
            watch: [
                '../../node_modules/alpinejs/dist/cdn.js',
            ],
        },
    }
};



module.exports = config;
