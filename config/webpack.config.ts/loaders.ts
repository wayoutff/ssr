import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'

const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true

const cssRegex = /\.module\.css$/
const cssModuleRegex = /\.css$/

const isProd = process.env.NODE_ENV === 'production'

const cssModuleOptions = { localIdentName: '_[local]_[hash:base64:5]' }

// temporary, maybe i can make better solution
// isProd
//   ? { localIdentName: '_[local]_[hash:base64:5]' }
//   : { getLocalIdent: getCSSModuleLocalIdent }

const babelLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-prettier,-svgo![path]'
            }
          }
        }
      ]
    ],
    cacheDirectory: true,
    cacheCompression: process.env.NODE_ENV === 'production',
    compact: process.env.NODE_ENV === 'production'
  }
}

const mdxLoader = {
  test: /\.mdx?$/,
  use: [
    require.resolve('babel-loader'),
    require.resolve('@mdx-js/loader')
  ]
}

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    require.resolve('css-hot-loader'),
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        localsConvention: 'camelCase',
        modules: cssModuleOptions,
        importLoaders: 1,
        sourceMap: generateSourceMap
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ],
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true
}

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    require.resolve('css-hot-loader'),
    MiniCssExtractPlugin.loader,
    require.resolve('css-loader'),
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ],
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true
}

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: require.resolve('css-loader'),
      options: {
        onlyLocals: true,
        localsConvention: 'camelCase',
        importLoaders: 1,
        modules: cssModuleOptions
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: generateSourceMap
      }
    }
  ],
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true
}

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [MiniCssExtractPlugin.loader, 
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: cssModuleOptions
      }
    }
  ],
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true
}

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 2048,
    name: 'assets/[name].[hash:8].[ext]'
  }
}

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false
  }
}

const fileLoaderClient = {
  exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]'
      }
    }
  ]
}

const fileLoaderServer = {
  exclude: [/\.(js|tsx|ts|tsx|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false
      }
    }
  ]
}

export const client = [
  {
    oneOf: [babelLoader, mdxLoader, cssModuleLoaderClient, cssLoaderClient, urlLoaderClient, fileLoaderClient]
  }
]

export const server = [
  {
    oneOf: [babelLoader, mdxLoader, cssModuleLoaderServer, cssLoaderServer, urlLoaderServer, fileLoaderServer]
  }
]

export default { client, server }
