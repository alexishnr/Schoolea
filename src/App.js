import React from 'react';
import {
BrowserRouter as Router,
Route,
} from 'react-router-dom';
import Navigation from './Navigation';
import SignUpPage from './Components/Authentication/SignUp';
import Sign from './Components/Authentication/Sign';
import SchoolForm from './Components/Screens/SchoolForm';
import Home from './Components/Screens/Home';
import * as routes from './routes';
const App = () =>
<Router>
  <div>
    <Route
    exact path={routes.SIGN}
    component={() => <Sign />}
    />
    <Route
    exact path={routes.HOME}
    component={() => <Home />}
    />
    <Route
    exact path={routes.ADD_SCHOOL}
    component={() => <SchoolForm />}
    />
  </div>
</Router>
export default App;
