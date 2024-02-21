module.exports = {
    "transform": {
        "\\.js$": "<rootDir>/node_modules/babel-jest"
      },
      globals: {
        "process.env": {
          AXIOS_BASE_URL: "http://52.203.237.18/",
        },
      },
  };