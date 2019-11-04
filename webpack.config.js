const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'index.js', // <-- Important
		libraryTarget: 'this' // <-- Important
	},
	target: 'node', // <-- Important
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	externals: [nodeExternals()] // <-- Important
};
