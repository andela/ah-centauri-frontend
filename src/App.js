import React from 'react';
import { createBrowserHistory } from 'history';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import routes from './routes';
import store from './store';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const hist = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={hist}>
      <Container className="bg-gray">
        <Header history={hist}/>
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
        <Footer />
      </Container>
    </Router>
  </Provider>
);

export default App;
