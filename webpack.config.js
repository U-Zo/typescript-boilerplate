const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  const isEnvDevelopment = env.env === 'development';

  return {
    mode: env.env || 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      filename: 'static/js/bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, 'src'),
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    devServer: {
      compress: true,
      client: {
        logging: 'none',
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
  };
};
