
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Home from './views/Home';
import Chat from './views/Chat';
import Login from './views/Login';
import Signup from './views/Signup';
import Homepage from './views/Homepage';

const App = () => {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/signUp' component={Signup} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/login' component={Login} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
