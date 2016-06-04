var webpack = require('webpack');
var path = require("path");
var nodemodulesPath = path.resolve(__dirname, 'node_modules');
module.exports = {

    //页面入口文件配置
    entry: {
        index: './src/scripts/entry/index.js',//首页
        aggregation: './src/scripts/entry/aggregation.js',//领导主页
        separate: './src/scripts/entry/separate.js',//小区详情页
        admin: './src/scripts/entry/admin.js',//管理员页面
        investigator: './src/scripts/entry/investigator.js',//调查员
        areaManager: './src/scripts/entry/area-manager.js',//片区负责人
        comprehensiveAnalyse: './src/scripts/entry/comprehensive-analyse.js'//综合分析员
    },
    //入口文件输出配置
    output: {
        path: './dist/scripts/',
        filename: '[name].min.js'
    },

    module: {
        //加载器配置，由于我只用webpack处理js，这里不需要配置
        loaders: []
    },
    //其它解决方案配置
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js'],
        //别名配置
        alias: {
            "root": path.join(__dirname, "/src/scripts"),
            "uiBootstrap": path.join(__dirname, "/src/scripts/common/ui-bootstrap-tpls-0.12.0.min.js"),
            "componentRoot": path.join(__dirname, "/src/scripts/common/component")
        }
    },
    //插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 2
        })
    ]
};