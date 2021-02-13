import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/style/main.scss';
import Aux from './hoc/Auxiliary/Auxiliary';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/layout/layout';
import Loader from './component/UI/Loader/Loader';

import LandingPage from './container/LandingPage/LandingPage';
import Admin from './container/Admin/Admin';

// Async Components
const asyncAdminLogin = asyncComponent(() => import('./container/Auth/AdminLogin'));
const asyncSearchTrip = asyncComponent(() => import('./container/SearchTrip/SearchTrip'));
const asyncUserSignup = asyncComponent(() => import('./container/Auth/UserSignup'));
const asyncUserProfile = asyncComponent(() => import('./container/UserProfile/UserProfile'));

function App() {
  return (
    <Aux>
      <Router>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/user/:username" component={asyncUserProfile} />
              <Route path="/user-signup" component={asyncUserSignup} />
              <Route path="/admin-login" component={asyncAdminLogin} />
              <Route path="/admin" component={Admin} />
              <Route path="/search" component={asyncSearchTrip} />
            </Switch>
          </Suspense>
          <Route path="/" exact component={LandingPage} />
        </Layout>
      </Router>
    </Aux>
  );
}

export default App;
