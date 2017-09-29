const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/SpaceBattlegrounds.main.ts',
    devtool: false,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'SpaceBattlegrounds.game.js'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("SpaceBattlegrounds.styles.css")
    ]
};