const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#009600',
                            '@font-family': 'Ubuntu, sans-serif',
                            '@border-radius-base': '5px',
                            '@layout-header-background': '#fff',
                            '@layout-header-padding': '0px'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};