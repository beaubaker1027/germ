import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Splash from './pages/common/splash';
import Dashboard from './pages/common/dashboard';
import Info from './pages/plant/info';
import { v4 } from 'uuid'

interface IdParam {
  id: string
};

export interface InfoParams extends IdParam {
};

export interface EditParams extends IdParam {

}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Splash/>
        </Route>
        <Route exact path='/plants'>
          <Dashboard/>
        </Route>
        <Route path='/plants/add'>
          <div>Hello</div>
        </Route>
        <Route path='/plants/edit/:id'>
          <div>Hello</div>
        </Route>
        <Route path='/plants/:id'>
          <Info/>
        </Route>
        <Route path='/journal'>
          <div>Hello</div>
        </Route>
        <Route path='/journal/add'>
          <div>Hello</div>
        </Route>
        <Route path='/journal/edit/:id'>
          <div>Hello</div>
        </Route>
        <Route path='/journal/:id'>
          <div>Hello</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
