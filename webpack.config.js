const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
    },
    plugins:
        [
            new WebpackShellPluginNext({onBuildStart:['php artisan lang:js --quiet'], onBuildEnd:[]})
        ]
};
