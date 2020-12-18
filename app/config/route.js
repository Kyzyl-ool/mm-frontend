import params from './params/index';

const host = params.API_HOST;
const centrifugo = params.CENTRIFUGO_HOST;

const route = {
  URL_INDEX: `${host}`,
  URL_LOGOUT: `${host}/logout`,
  URL_SETTINGS: `${host}/profile/settings/edit/`,
  URL_HELP: `${host}/help/z78`,
  URL_PROFILE: `${host}/profile`,

  URL_PUSHER_AUTH: `${host}/api/messenger/pusher/authPresence`,
  URL_PUSHER_ONLINE: `${host}/api/messenger/pusher/authOnline`,

  URL_USERS: `${host}/api/users`,
  URL_ONLINE_USERS: `${host}/api/online`,
  URL_USER_AUTHORIZE: `${host}/api/auth`,
  URL_USER_REGISTER: `${host}/api/register`,

  URL_CHAT: `${host}/api/chat`,
  URL_ROOM_MESSAGES: `${host}/api/message`,

  URL_MESSAGE_SEND_USER: `${host}/api/messenger/message/user`,
  URL_MESSAGE_READ: `${host}/api/messenger/message`,

  URL_CENTRIFUGO: `${centrifugo}`,
  URL_CENTRIFUGO_CONNECT: `${centrifugo}/connection/websocket`,
};

export default route;
