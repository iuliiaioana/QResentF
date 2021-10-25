import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MenuBar from './menus/MenuBar';
import Calendar from './routes/Calendar';

function App() {
  return (
    <div>
      <Router>
        <MenuBar />
        <div className="content">
          <Switch>
            <Route path ="/home">
              
            </Route>
            <Route path="/login">
              
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/profile">
              
            </Route>
            <Route path="/subjects">
              
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
