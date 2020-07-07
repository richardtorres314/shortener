const Path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/Index.tsx',
	resolve: {
		extensions: [
			'.ts',
			'.tsx',
			'.js'
		]
	},
	devServer: {
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					'ts-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	output: {
		path: Path.join(__dirname, 'dist/assets'),
		publicPath: '/'
	}
};
