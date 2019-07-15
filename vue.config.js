// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: 'raw-loader'
                }
            ]
        }
    }
}