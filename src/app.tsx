import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from 'containers/App/App';

const MOUNT_NODE = 'app';

interface RenderProps {
  Container?: React.ReactElement;
}

const render = (props: RenderProps = {}) => {
  const { Container = App } = props;
  ReactDOM.render(
    // tslint:disable-next-line:jsx-wrap-multiline
    Container,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(['containers/App/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // tslint:disable-next-line:max-line-length
    const App = require('./containers/App/App').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render({ Container: App });
  });
}

// Chunked polyfill for browsers without Intl support
render();

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
