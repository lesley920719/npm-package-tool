import { resolve } from 'path';
import { Configuration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import RcDeclarationWebpackPlugin from '../packages/rc-declaration-webpack-plugin';

export default {
  mode: 'production',
  entry: ['./packages/react-md/src/index.tsx'],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  output: {
    filename: 'index.js',
    path: resolve('.', 'lib/react-md'),
    libraryTarget: 'commonjs2',
    clean: true,
  },
  plugins: [
    new RcDeclarationWebpackPlugin({ declarationDir: './lib/react-md/' }),
    new CopyPlugin({
      patterns: [
        {
          from: './packages/react-md/README.md',
          to: './README.md',
        },
        {
          from: './packages/react-md/package1.json',
          to: './package.json',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
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
        test: /\.(j|t)sx?$/,
        exclude: /node-modules/,
        use: ['babel-loader'],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
} as Configuration;
