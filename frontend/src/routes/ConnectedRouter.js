import React, { Component, PropTypes } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import history from 'history';
import StaticRouter from 'react-router/StaticRouter';

import { LOCATION_CHANGE } from './routerReducer';

class DispatchingRouter extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    action: PropTypes.string,
    location: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    basename: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.handleLocationChange(props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleLocationChange(nextProps);
  }

  handleLocationChange = ({ store, action, location }) => {
    store.dispatch({
      type: LOCATION_CHANGE,
      payload: { action, location },
    });
  }

  render() {
    const { history, action, location, basename, ...props } = this.props;

    return (
      <StaticRouter
        action={action}
        location={location}
        basename={basename}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...props}
      />
    );
  }
}

const ConnectedRouter = ({
  store,
  basename,
  forceRefresh,
  getUserConfirmation,
  keyLength,
  ...routerProps,
}, { store:contextStore }) => {

  return (
    <History
      createHistory={ createBrowserHistory }
      historyOptions={{
        basename,
        forceRefresh,
        getUserConfirmation,
        keyLength,
      }}
    >
      {({ history, action, location }) => {
        return (
          <DispatchingRouter
            store={contextStore || store}
            history={history}
            action={action}
            location={location}
            basename={basename}
            {...routerProps}
          />
        );
      }}
    </History>
  );
};

ConnectedRouter.contextTypes = {
  store: PropTypes.object,
};

ConnectedRouter.propTypes = {
  store: PropTypes.object,
  basename: PropTypes.string,
  forceRefresh: PropTypes.bool,
  getUserConfirmation: PropTypes.func,
  keyLength: PropTypes.number,
};

export default ConnectedRouter;