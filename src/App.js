import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Aux from './hoc/Auxiliary/Auxiliary';
import './app.scss';
import Layout from './hoc/layout/layout';
import Loader from './component/UI/Loader/Loader';

import LandingPage from './container/LandingPage/LandingPage';
const SearchTrip = lazy(() => import('./container/SearchTrip/SearchTrip'));
const Admin = lazy(() => import('./container/Admin/Admin'));
const AdminLogin = lazy(() => import('./container/Auth/AdminLogin'));
const UserSignUP = lazy(() => import('./container/Auth/UserSignup'));
const UserProfile = lazy(() => import('./container/UserProfile/UserProfile'));

function App() {
  return (
    <Aux>
      <Router>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/user/:username" component={UserProfile} />
              <Route path="/user-signup" component={UserSignUP} />
              <Route path="/admin-login" component={AdminLogin} />
              <Route path="/admin" component={Admin} />
              <Route path="/search" component={SearchTrip} />
            </Switch>
          </Suspense>
          <Route path="/" exact component={LandingPage} />
        </Layout>
      </Router>

    </Aux>
  );
}

export default App;
