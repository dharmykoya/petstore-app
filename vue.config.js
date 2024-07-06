module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://pet-shop.buckhill.com.hr',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      }
    }
  };