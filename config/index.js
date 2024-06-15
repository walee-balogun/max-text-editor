const ENV = process.env.ENV;
const config = require('./environments/'+ENV.toLowerCase());

module.exports = config;