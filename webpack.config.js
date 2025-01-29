const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

// Carga manual de variables de entorno
const dotenv = require("dotenv");

// Detecta el entorno y carga el archivo adecuado
const isProduction = process.env.NODE_ENV === "production";
dotenv.config({
  path: isProduction ? "./.env" : "./.env.local",
});

const deps = require("./package.json").dependencies;
const printCompilationMessage = require("./compilation.config.js");

module.exports = (_, argv) => {
  console.log(`Ejecutando proyecto en modo ${isProduction ? "producción" : "desarrollo"}`);

  return {
    output: {
      publicPath: `http://localhost:${process.env.APP_PORT}/`,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        '~': path.resolve(__dirname, 'src/sasf-commons'),
        '@': path.resolve(__dirname, 'src'),
      },
    },

    devServer: {
      port: process.env.APP_PORT,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      watchFiles: [path.resolve(__dirname, "src")],
      onListening: function (devServer) {
        const port = devServer.server.address().port;

        printCompilationMessage("compiling", port);

        devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
          setImmediate(() => {
            if (stats.hasErrors()) {
              printCompilationMessage("failure", port);
            } else {
              printCompilationMessage("success", port);
            }
          });
        });
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          // Aqui nunca se agregan los remotos, esto se debe a que se cargan dinamicamente.
        },
        exposes: {
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv({
        path: isProduction ? "./.env" : "./.env.local",
      }),
    ],
  };
};
