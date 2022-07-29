import config from './webpack.config';
import CopyPlugin from 'copy-webpack-plugin';
import { container } from 'webpack';
const { ModuleFederationPlugin } = container;

delete config.devtool;
config.mode = 'production';
(config.output as any).filename = 'js/[name].[contenthash].bundle.js';
(config.module as any).rules.push({
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node-modules/,
  use: [
    'babel-loader',
  ],
});
(config.plugins as any).push(
  new ModuleFederationPlugin({
    name: 'packageLib',
    filename: 'js/remoteEntry.js',
    exposes: {
      './router': './src/pageRouter',
    },
  }),
  new CopyPlugin({
    patterns: [
      {
        from: './public',
        to: './',
      },
    ],
  })
);
config.optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 20000,
    minRemainingSize: 0,
    maxSize: 80000,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
};

export default { ...config };
