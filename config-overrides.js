const {
    override,
    addDecoratorsLegacy,
    useBabelRc,
    fixBabelImports,
    addLessLoader,
    overrideDevServer
} = require('customize-cra');

module.exports = {
    webpack: override(
        // 使用Babel-plugin-import按需加载
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            // style: 'css', //仅使用按需加载
            style: true // 使用配置主题
        }),
        // 配置主题 yarn add less less-loader
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {'@primary-color': '#1DA57A'},
        }),
        addDecoratorsLegacy(),
        // 使用.babelrc
        // useBabelRc()
    ),
    devServer: overrideDevServer( (configFunction) => {
        configFunction.proxy = {
            '/api/': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {'^/api': '/'},
            },
        };
        return configFunction;
    })
};