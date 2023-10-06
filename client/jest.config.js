module.exports = {
    "transform": {
        "\\.js$": "<rootDir>/node_modules/babel-jest"
      },
      globals: {
        "process.env": {
          AXIOS_BASE_URL: "http://localhost:8000/",
        },
      },
  };