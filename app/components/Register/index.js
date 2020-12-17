import React, { useState } from 'react';
import {
  Button, FormGroup, Input, Typography,
} from '@material-ui/core';

function Register() {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <section className="register-container">
      <Typography variant="h1" align="center">
          Welcome!
      </Typography>
      <Typography>
        This website is for demonstrating and testing of websocket connection in your bruwser.
      </Typography>
      <Typography>
        Enter your name and you will join for chatting among other participants.
      </Typography>
      <Typography>
        Currently online users: <Typography style={{ display: 'inline' }}><b>5</b></Typography>
      </Typography>
      <FormGroup>
        <Input
          placeholder="Enter your name"
          type="text"
          value={value}
          onChange={onChange}
        />
        <Button type="submit">Confirm</Button>
      </FormGroup>
    </section>
  );
}

export default Register;
