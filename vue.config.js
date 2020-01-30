module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        devtool:'source-map'
    },
    devServer: {
        port:8088
    }
};
