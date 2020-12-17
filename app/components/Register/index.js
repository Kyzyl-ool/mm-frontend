import React, { useState } from 'react';
import {
  Button, FormGroup, Input, Typography,
} from '@material-ui/core';
import authorizeUser, { registerUser } from '../../services/user';

function Register() {
  const [value, setValue] = useState('');

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
        Currently online users: <b>5</b>
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
