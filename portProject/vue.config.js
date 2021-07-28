module.exports = {
    devServer: {
        host:"192.168.137.1",
        port:8088,
        proxy: {
            '/api': {
                target: 'http://172.16.19.213:8082/qbd',
                // 允许跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}