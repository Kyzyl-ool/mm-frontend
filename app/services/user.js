import axios from 'axios';

import route from '../config/route';
import httpOptions from '../helper/httpOptions';
import authorizeSuccessAction, { authorizeFailAction } from '../store/actions/user';
import store from '../store';

// TODO: Надо email и password брать из формы авторизации (который тоже надо сделать)
const authorizeUser = () => {
  axios
    .post(
      route.URL_USER_AUTHORIZE,
      {
        email: 'kyzyloolk@mail.ru',
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
    });
};

export default authorizeUser;
