import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { App } from '../../../src/containers/App/App';

export const renderer = (req: Request, res: Response, next: NextFunction) => {
  fs.readFile(path.join(__dirname, './../../../build/index.html'), 'utf8', (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    return res.send(
      data.replace(
        '<div id="app"></div>',
        `<div id="app">${ReactDOMServer.renderToString(React.createElement(App))}</div>`,
      ),
    );
  });
};
