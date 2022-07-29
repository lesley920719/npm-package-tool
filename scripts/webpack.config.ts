import { resolve } from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import toml from 'toml';

const devMode = process.env.NODE_ENV === 'development';

export default {
  mode: 'development',
  entry: ['./src/app.tsx'],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@base': resolve('./'),
      '@src': resolve('./src'),
      '@packages': resolve('./packages'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve('.', 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          // dev mode css don't hot update
          devMode ? {
            loader: 'style-loader',
          } : {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (process.env.NODE_ENV === 'development') {
                  return 'img/[path][name].[ext]';
                }
                return 'img/[contenthash].[ext]';
              },
              limit: false,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: false,
            },
          },
        ],
      },
      {
        test: /\.toml/,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
    ],
  },
  // hot update fix
  optimization: {
    runtimeChunk: 'single'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
} as Configuration;
