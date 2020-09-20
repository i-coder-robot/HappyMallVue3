module.exports={
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  devServer:{
    open:true,
    host:"localhost",
    port: "9090",
    https: false,
    hotOnly: false,
    proxy: {
      '/api':{
        target:'http://localhost:9090/api',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}
