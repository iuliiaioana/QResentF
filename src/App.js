import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MenuBar from './menus/MenuBar';

import Calendar from './routes/Calendar';
import Scan from './routes/Scan';
import Login from './routes/Login';
import Statistics from './routes/Statistics';
import Subjects from './routes/Subjects';
import Profile from './routes/Subjects';

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
              <Login />
            </Route>
            <Route path="/subjects">
              <Subjects />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/statistics">
              <Statistics />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/scan">
              <Scan />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
