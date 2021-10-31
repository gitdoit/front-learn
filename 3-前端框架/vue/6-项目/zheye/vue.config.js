module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
