import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Pusher from 'pusher-js';
import { setPusherClient } from 'react-pusher';
import routes from './routes';
import store from './store';


const pusherClient = new Pusher('c9b472a2b977d40a8285', {
  cluster: 'us2',
  forceTLS: true,
});

setPusherClient(pusherClient);

const switchRoutes = (
  <Switch>
    {routes
      .map((prop, key) => (
        <Route
          exact
          path={prop.path}
          component={prop.component}
          key={key}
        />
      ))}
  </Switch>
);

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        {switchRoutes}
      </div>
    </Router>
  </Provider>
);

export default App;
