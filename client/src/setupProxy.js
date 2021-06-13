const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    target: process.env.NODE_ENV === 'production' ? 'https://pocketide-api.herokuapp.com/' : 'http://localhost:8000/',
    changeOrigin: true,
  }));
};