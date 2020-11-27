import axios from 'axios';

import route from '../config/route';
import httpOptions from '../helper/http';

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
        console.log('Unauthorized');
      }
    });
};

export default authorizeUser;
