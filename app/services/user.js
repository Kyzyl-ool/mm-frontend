import axios from 'axios';

import route from '../config/route';
import httpOptions from '../helper/httpOptions';
import authorizeSuccessAction, { authorizeFailAction } from '../store/actions/user';
import store from '../store';

const authorizeUser = (email = localStorage.getItem('name')) => {
  axios
    .post(
      route.URL_USER_AUTHORIZE,
      {
        email,
        passwordHash: 'MmNmMjRkYmE1ZmIwYTMwZTI2ZTgzYjJhYzViOWUyOWUxYjE2MWU1YzFmYTc0MjVlNzMwNDMzNjI5MzhiOTgyNA==',
      },
      httpOptions,
    )
    .then(({ data }) => {
      store.dispatch(authorizeSuccessAction(data));
    })
    .catch(({ response }) => {
      if (response.status === 401) {
        store.dispatch(authorizeFailAction());
      }
      localStorage.removeItem('token');
      localStorage.removeItem('centrifugeToken');
      localStorage.removeItem('name');
    });
};

export const registerUser = (email) => {
  return axios
    .put(
      route.URL_USER_REGISTER,
      {
        email,
        passwordHash: 'MmNmMjRkYmE1ZmIwYTMwZTI2ZTgzYjJhYzViOWUyOWUxYjE2MWU1YzFmYTc0MjVlNzMwNDMzNjI5MzhiOTgyNA==',
        middleName: '-',
        lastName: '-',
        firstName: email,
      },
    );
};

export default authorizeUser;
