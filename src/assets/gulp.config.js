// Configuration file for Gulp



var config = {};

// Directory config
config.directories = {};
config.directories.root = '../../public';
config.directories.build = '../../public/build';

// Naming config
config.minify_suffix = '.min';



config.tasks = {
    copy: {
        root: {
            src: '../index.html',
            dest: 'index.html',
            watch: [
                '../index.html'
            ],
        }
    },

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
