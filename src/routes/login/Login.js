import React, {useState} from 'react';

import './Login.scss';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';

async function sendLoginRequest(credentials) {
  return fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({ setToken }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await sendLoginRequest({
      email,
      password
    });
    setToken(token);
  }
  
  return (
    <div className="container">
      <FormControl className="FormControl">
        <h2>Log in</h2>
        <TextField
          id="email-input"
          label="Email"
          type="text"
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Stack spacing={2} justifyContent="space-between" alignItems="center" direction="row">
          <Button variant="outlined">Sign up</Button>
          <Button variant="contained" onClick={handleSubmit}>Log in</Button>
        </Stack>
      </FormControl>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};