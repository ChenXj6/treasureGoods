const path = require('path')
module.exports = {
    publicPath: './',
    outputDir:'dist',
    productionSourceMap: false,
    // assetsDir:'static',
    devServer: {
        // host: '120.25.64.250',//120.25.64.250
        host: 'localhost',
        port: 8080, 
        proxy: {
            '/apis': {
                target: 'http://5016.yesswl.top',
                changeOrigin: true,
                logLevel: 'debug',
                // headers: {
                //     Cookie: ''
                // },
                pathRewrite: {
                  '^/apis': '/'
                }
            }
        },
    },
   
    css: {
        loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: 37.5
              })
            ]
          }
        }
    },
}