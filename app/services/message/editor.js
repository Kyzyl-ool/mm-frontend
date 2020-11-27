import store from '../../store';
import { insertMockToMessages, updateMockedMessage } from './loader';
import { messageEditAction } from '../../store/actions/message';
import CentrifugeSingleton from '../centrifuge';

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
  // const userId = state.room.selected.users[0].id;

  if (text.trim().length === 0) {
    return;
  }

  const mock = mockMessage(text, state.user.me);
  //   const data = {
  //   from: state.user.me.id,
  //   to: userId,
  //   text,
  // };

  CentrifugeSingleton.getInstance().publish('news', 1)
    .then(() => {
      insertMockToMessages(mock);
      updateMockedMessage(mock);
    });
};

export const editText = (value) => {
  const state = store.getState().room;
  const selectedRoom = state.selected;

  // Dispatch event
  store.dispatch(messageEditAction(selectedRoom.id, value));
};
