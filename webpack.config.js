module.exports = {
    entry: './components/app/app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['env']
                }
            }
            }
        ]
    }
};
