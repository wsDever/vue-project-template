const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CopyWebpackPlugin = require('copy-webpack-plugin')
/**
 * 环境变量
 * @type {String}
 */
const ENV = process.env.NODE_ENV;

const setPath = url => path.resolve(__dirname, url);


/**
 * 配置（公共部分）
 * @type {Object}
 */
let config = {
  /**
   * 入口文件设置
   * @type {Object}
   */
  entry: {
    main: ['./src/index.js']
  },

  /**
   * 自动引入后缀名 & 解析别名规则
   * @type {Object}
   */
  resolve: {
    alias: {
      // 全局
      '@assets': setPath('src/assets'),
      '@config': setPath('src/configs'),
      '@router': setPath('src/routers'),
	  '@page': setPath('src/pages'),
		//   ...
    },
    extensions: ['.ts', '.vue', '.js', '.scss', '.css']
  },

  /**
   * loader 规则
   * @type {Object}
   */
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [setPath('src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        include: [setPath('src')],
        use: [
          ENV === 'development' ? 'vue-style-loader' : ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: setPath('src'),
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: 'img/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: setPath('src'),
        loader: 'url-loader',
        options: {
          limit: 200000,
          name: 'media/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|woff|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.css$/,
        include: setPath('node_modules'),
        loader: 'css-loader',
      },
    ]
  },

  /**
   * 插件列表
   * @type {Array}
   */
  plugins: [
    // vue loader 必用
    new VueLoaderPlugin(),

    // 全局环境变量定义
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(ENV)
    }),

    // html 文件
    new HtmlWebpackPlugin({
      // favicon: './src/assets/favicon.ico',
      template: './index.html',
      filename: './index.html',
      inject: 'body'
    }),
    new ExtractCssChunks({
      filename: 'css/[name].[hash:5].css',
      chunkFilename: 'css/[name].[id].[hash:5].css',
      hot: ENV === 'development',
      orderWarning: ENV === 'development',
      reloadAll: ENV === 'development',
      cssModules: false
    })
  ],

  /**
   * 优化配置
   */
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  }
};

/**
 * 开发环境配置
 */
if (ENV === 'development') {
  config.mode = ENV;
  config.output = {
    publicPath: "/",
    path: "/"
  };
  config.devtool = 'cheap-eval-source-map';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    historyApiFallback: true,
    clientLogLevel: 'warning',
    hot: true,
    host: '0.0.0.0',
    port: '8081',
    stats: {
      assets: true,
      performance: true,
      timings: true,
      builtAt: false,
      children: false,
      chunks: false,
      hash: false,
      entrypoints: false,
      modules: false,
      cached: false,
      cachedAssets: false
    }
  };
}

/**
 * 发布配置 和 测试
 */
if (ENV !== 'development') {
  config.output = {
    filename: 'script/[name].[chunkhash:5].js',
    path: setPath('dist'),
    publicPath: '/'
  };
  config.devtool = 'none';
  config.plugins.push(
    new CompressionPlugin({
      cache: true,
      threshold: 10240
    })
  );
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  // config.plugins.push(new BundleAnalyzerPlugin());
  
  // copy 文件
//   config.plugins.push(new CopyWebpackPlugin([{
// 	  from: 'alone',
// 	  to: 'alone',
// 	  ignore: ['*.less']
// 	}
//   ]))
  config.optimization.minimizer = [
    // 优化 js
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      terserOptions: {
        warnings: false,
        compress: {
          drop_console: false,
          drop_debugger: false
          // ,pure_funcs: ['console.log'] // 移除console
        }
      }
    }),
    // 优化 css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true },
        mergeLonghand: false,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ];
}

module.exports = config;
