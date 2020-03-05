import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './containers/App/App';

interface RenderProps {
  Container: JSX.Element;
}

const MOUNT_NODE: string = 'app';

const render = (props: RenderProps) => {
  const { Container } = props;
  ReactDOM.render(Container, document.getElementById(MOUNT_NODE));
};

if (module.hot) {
  module.hot.accept(['./containers/App/App'], () => {
    const MountNode = document.getElementById(MOUNT_NODE);
    if (MountNode) {
      ReactDOM.unmountComponentAtNode(MountNode);
    }
    render({ Container: React.createElement(App) });
  });
}

// Chunked polyfill for browsers without Intl support
render({ Container: React.createElement(App) });

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
