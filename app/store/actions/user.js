import { USER_AUTHORIZE_FAIL, USER_AUTHORIZE_SUCCESS, USER_ONLINE_UPDATE } from './types';

const authorizeSuccessAction = user => ({
  type: USER_AUTHORIZE_SUCCESS,
  payload: user,
});
export const userOnlineUpdateAction = user => ({
  type: USER_ONLINE_UPDATE,
  payload: user,
});
export const authorizeFailAction = () => ({
  type: USER_AUTHORIZE_FAIL,
});

export default authorizeSuccessAction;
