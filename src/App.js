import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import MenuBar from './menus/MenuBar';

import Calendar from './routes/calendar/Calendar';
import Login from './routes/login/Login';
import AttendanceList from './routes/attendance-list/AttendanceList';
import Statistics from './routes/Statistics';
import Subjects from './routes/Subjects';
import Profile from './routes/profile/Profile';

import Scan from './routes/scan/Scan';
import Generate from './routes/scan/Generate';

import useToken from './useToken';

function App() {

  let history = useHistory();

  const { token, setToken } = useToken();

  return (
    <div>
      <Router>
        <MenuBar />
        <div className="content">
          <Switch>
            <Route exact path ="/">
              <Calendar />
            </Route>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/subjects">
              <Subjects />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/attendance-list">
              <AttendanceList />
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
            <Route path="/generate">
              <Generate />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
