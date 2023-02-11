// Integrando Path a Webpack para trabajar con rutas de archivos y directorios.
const path = require('path');
// Importando los plugins a Webpack que usaremos en nuestro proyecto
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// módulo a exportar con la configuración deseada del proyecto.
module.exports = { 
  // punto de entrada, nuestro elemento inicial.
  entry: './src/index.js',
  
  output: { // punto de salida, dónde se va a enviar el bundle de webpack. Por defecto la carpeta se llamará dist.
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development', // indicamos que este será la configuración para el modo de desarrollo
  devtool: 'source-map',
  resolve: { // que extensiones utilizará el proyecto para que webpack sepa como leer los archivos del proyecto. 
    extensions: ['.js'],
    alias: { // Agregando alias a nuestro directorios
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: { // configuración de Babel
    rules: [
      { // rule para usar babel-loader
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {// rule para usar css-loader
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      { // rule para exportar imágenes
        test: /\.png/,
        type: 'asset/resource'
      }, 
      { // rule para usar el loaders de fuentes
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash].[ext]"
        }
      },
    ]
  },
  plugins: [ // Sección de plugins

    new HtmlWebpackPlugin({ // instancia de HtmlWebpackPlugin
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    // instancia de MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    // instancia de CopyPlugin
    new CopyPlugin({ // que elementos vamos a utilizar
      patterns: [
        {// donde de encuentran los archivos a mover
          from: path.resolve(__dirname, "src", "assets/images"),
          // a dónde se moverán los archivos
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3006,
    open: true,
  },
}