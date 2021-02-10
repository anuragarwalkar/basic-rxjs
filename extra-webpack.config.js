const { JsonFormatter } = require("tslint/lib/formatters");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        firebaseAPIKey: JSON.stringify(process.env.FIREBASE_API_KEY),
      },
    }),
  ],
};
