import React, {useState} from 'react';

import './Register.scss';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

async function sendRegisterRequest(credentials) {
  return fetch('http://127.0.0.1:5000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      if (!data.ok)  {
        return;
      }
      return data.json();
    }); 
 }

export default function Login(props) {

  let history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [className, setClassName] = useState();
  const [CNP, setCNP] = useState();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const resp = await sendRegisterRequest({
      "email": email,
      "parola": password,
      "prenume": firstName,
      "nume": lastName,
      "grupa": className,
      "rol": "student",
      "cnp": CNP
    });
    console.log(resp);
    if (resp !== undefined) {
      history.push("/profile");
    } else {
      setLoginError(resp);
    }
  }
  
  return (
    <div className="container">
      <FormControl className="FormControl">
        <h2>Sign up</h2>
        <TextField
          id="email-input"
          label="Email"
          type="text"
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="firstname-input"
          label="First name"
          type="text"
          onChange={e => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          id="lastname-input"
          label="Last name"
          type="text"
          onChange={e => setLastName(e.target.value)}
        />
        <br />
        <TextField
          id="cnp-input"
          label="CNP"
          type="text"
          onChange={e => setCNP(e.target.value)}
        />
        <br />
        <TextField
          id="class-input"
          label="Class"
          type="text"
          onChange={e => setClassName(e.target.value)}
        />
        <br />
        <TextField
          id="password-input"
          label="Pick a password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <Stack spacing={2} justifyContent="space-between" alignItems="center" direction="row">
          <Button variant="outlined" onClick={ () => history.push("/login") }>Log in</Button>
          <Button variant="contained" onClick={ handleSubmit }>Sign up</Button>
        </Stack>
        {/* {loginError !== undefined ? <p className="error-message">Error: {loginError}</p> : ""} */}
      </FormControl>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};