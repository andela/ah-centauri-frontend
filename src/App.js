import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import store from './store';

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
