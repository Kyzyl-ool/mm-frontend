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
        This website is for demonstrating and testing websocket connection in your browser.
      </Typography>
      <br />
      <Typography>
        Enter your name and you will join for chatting among other participants.
      </Typography>
      <br />
      <Typography>
        After your registration you will be able to create new chat typing other user&lsquo;s name.
        To enable websocket connection you have to press to the chat&lsquo;s item in the list on
        the left side.
      </Typography>
      <br />
      <Typography>
        Pay attention to the fact that this application is in MVP stage so you may find errors and
        report them to me:&nbsp;
        <a href="mailto:kyzyl.okm@phystech.edu">kyzyl.okm@phystech.edu</a>
        or to Maxim: <a href="mailto:jim_hockins@mail.ru">jim_hockins@mail.ru</a>
      </Typography>
      <br />
      <div>
        <Typography>
          Also you are welcome to see the source code in my GitHub:
        </Typography>
        <ul>
          <li>
            <a href="https://github.com/Kyzyl-ool/mm-frontend/">Front-end</a>
          </li>
          <li>
            <a href="https://github.com/Kyzyl-ool/mm-server/">Back-end</a>
          </li>
        </ul>
      </div>
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
