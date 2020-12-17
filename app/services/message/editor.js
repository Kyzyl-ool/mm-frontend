import axios from 'axios';
import store from '../../store';
import { insertMockToMessages, updateMockedMessage } from './loader';
import { messageEditAction } from '../../store/actions/message';
import CentrifugeSingleton from '../centrifuge';
import route from '../../config/route';
import httpOptions from '../../helper/httpOptions';

const mockMessage = (text, user) => {
  return {
    mocked: true,
    id: Math.random(),
    timestamp: Date.now(),
    text,
    user: {
      id: user.id,
    },
    readers: [
      {
        user: {
          id: user.id,
        },
      },
    ],
  };
};

export const sendMessage = () => {
  const state = store.getState();
  const { text } = state.message;
  const roomId = state.room.selected.id;

  if (text.trim().length === 0) {
    return;
  }

  const mock = mockMessage(text, state.user.me);

  const users = state.room.selected.users.map(user => user.id).sort();

  CentrifugeSingleton.getInstance().publish(`messages_${users.join('-')}#${users.join(',')}`, 1)
    .then(() => {
      insertMockToMessages(mock);
      updateMockedMessage(mock);
    });

  axios.put(`${route.URL_ROOM_MESSAGES}/${roomId}`, {
    text,
  }, httpOptions);
};

export const editText = (value) => {
  const state = store.getState().room;
  const selectedRoom = state.selected;

  // Dispatch event
  store.dispatch(messageEditAction(selectedRoom.id, value));
};
