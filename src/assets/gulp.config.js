// Configuration file for Gulp



var config = {};

// Directory config
config.directories = {};
config.directories.root = '../../public';
config.directories.build = '../../public/build';
const root_directory = config.directories.root;
const build_directory = config.directories.build;

// Naming config
config.minify_suffix = '.min';



config.tasks = {
    copy: {
        root: {
            src: '../index.html',
            dest: root_directory,
            watch: [
                '../index.html'
            ],
        }
    },

    css: {
        default: {
            src: 'css/main.css',
            dest: build_directory,
            name: 'style.css',
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
            dest: build_directory,
            name: 'alpine_bundle.js',
            watch: [
                '../../node_modules/alpinejs/dist/cdn.js',
            ],
        },
    },

    hash: {
        src: build_directory + '**/*.{css,js}',
        name: 'manifest.json',
        dest: build_directory,
        watch: build_directory + '**/*.{css,js}',
    },
};



module.exports = config;
