import axios from 'axios';

import route from '../config/route';
import httpOptions from '../helper/http';
import { authorizeFailAction } from '../store/actions/user';
import store from '../store';

const authorizeUser = () => {
  axios
    .get(
      route.URL_USER_AUTHORIZE,
      httpOptions,
    )
    .then(() => {

    })
    .catch(({ response }) => {
      if (response.status === 401) {
        store.dispatch(authorizeFailAction());
      }
    });
};

export default authorizeUser;
