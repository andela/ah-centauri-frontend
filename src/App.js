import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          {
          routes.map(route => (
            <Route
              key={route.id}
              exact
              path={route.path}
              component={route.component}
            />
          ))
        }
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
