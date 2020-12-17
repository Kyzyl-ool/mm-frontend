// eslint-disable-next-line no-unused-vars
import { AxiosRequestConfig } from 'axios';
import store from '../store/index';

/**
 * @type {AxiosRequestConfig}
 */
const options = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${(function foo() {
      console.log(store.getState().user.me.token);
      return store.getState().user.me.token || localStorage.getItem('token');
    }())}`,
  },
};

export default options;
