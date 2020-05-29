// @ts-check

const { baseConfig } = require("./baseConfig")
const { ciConfig } = require("./ciConfig")
const { debugConfig } = require("./debugConfig")
const { developmentConfig } = require("./developmentConfig")
const { productionConfig } = require("./productionConfig")
const { serverConfig } = require("./serverConfig")
const { v2Config } = require("./v2Config")

module.exports = {
  baseConfig,
  ciConfig,
  debugConfig,
  developmentConfig,
  productionConfig,
  serverConfig,
  v2Config,
}
