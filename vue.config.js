module.exports = {
    configureWebpack: config => {
        config.externals = {
            'better-sqlite3': 'commonjs better-sqlite3'
        };
    },
    pluginOptions: {
        electronBuilder: {
            externals: ['better-sqlite3']
        }
    }
}
