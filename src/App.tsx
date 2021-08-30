import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Splash from './pages/common/splash';
import Dashboard from './pages/common/dashboard';

const testData = 
[ { id: 1,
    name: 'Outside Garden' }
, { id: 2,
    name: 'Green House'}
, { id: 3,
    name: 'Green' }];

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
          <div>Hello</div>
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
