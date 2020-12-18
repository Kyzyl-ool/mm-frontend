import React, { useEffect, useState } from 'react';
import {
  Button, FormGroup, Input, Typography,
} from '@material-ui/core';
import axios from 'axios';
import authorizeUser, { registerUser } from '../../services/user';
import httpOptions from '../../helper/httpOptions';
import route from '../../config/route';

function Register() {
  const [value, setValue] = useState('');
  const [currentlyOnline, setCurrentlyOnline] = useState(0);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async () => {
    try {
      await registerUser(value);
      await authorizeUser(value);
    } catch (e) {
      throw Error('Registration has failed');
    }
  };

  useEffect(() => {
    axios.get(route.URL_ONLINE_USERS, httpOptions)
      .then(({ data }) => {
        setCurrentlyOnline(data);
      });
  }, []);

  return (
    <section className="register-container">
      <Typography variant="h1" align="center">
        Welcome!
      </Typography>
      <br />
      <Typography>
        This website is for demonstrating and testing of websocket connection in your bruwser.
      </Typography>
      <br />
      <Typography>
        Enter your name and you will join for chatting among other participants.
      </Typography>
      <br />
      <Typography>
        Currently online users: <b>{currentlyOnline}</b>
      </Typography>
      <FormGroup>
        <Input
          placeholder="Enter your name"
          type="text"
          value={value}
          id="name"
          onChange={onChange}
        />
        <Button onClick={onSubmit}>Confirm</Button>
      </FormGroup>
    </section>
  );
}

export default Register;
