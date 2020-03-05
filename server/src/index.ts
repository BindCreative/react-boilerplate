import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { renderer } from './lib/renderer';

const app = express();
const port = process.env.PORT || 3000;
const { NODE_ENV } = process.env;
const router = express.Router();

if (NODE_ENV === 'production') {
  router.use('^/$', renderer);
  router.use(express.static(path.resolve(__dirname, '../../build'), { maxAge: '1d' }));
} else {
  const webpackConfig = require('../../internal/webpack/webpack.dev.babel');
  const compiler = webpack(webpackConfig);
  console.log(123, webpackConfig.output.publicPath);
  router.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  router.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  );
}

app.use(router);
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
