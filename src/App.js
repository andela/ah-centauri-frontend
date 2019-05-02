import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import { Container } from 'semantic-ui-react';
import reducers from './reducers';
import setAuthToken from './utils/setAuthToken';

import Header from "./components/layout/Header";
import Footer from './components/layout/Footer';
import routes from './routes/index'

// eslint-disable-next-line valid-typeof,no-underscore-dangle
const composeEnhancers = typeof window === 'objects' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const token = localStorage.getItem('AUTH_TOKEN');

const store = createStore(
  reducers,
  {
    auth: { authenticated: token },
  },
  composeEnhancers(applyMiddleware(reduxThunk)),
);

if (token) {
  // Set auth token header auth to axios on every request
  setAuthToken(token);
}


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Container className="bg-gray">
        <Header/>
        <Switch>

          {
            routes.map( (route)=>{
              return <Route
              exact path={route.path}
              component={route.component}/>
            })
          }

        </Switch>
        <Footer/>
      </Container>
    </BrowserRouter>
  </Provider>
);

export default App;
