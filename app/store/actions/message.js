import {
  MESSAGE_COLLECTION_LOAD_SUCCESS,
  MESSAGE_EDIT,
  MESSAGE_SEND,
  MESSAGE_TEXT_FLUSH,
} from './types';

export const messageSendAction = messages => ({
  type: MESSAGE_SEND,
  payload: messages,
});
export const messageEditAction = (roomId, text) => ({
  type: MESSAGE_EDIT,
  payload: {
    roomId,
    text,
  },
});
export const messageTextFlushAction = () => ({
  type: MESSAGE_TEXT_FLUSH,
});
export const messageCollectionLoadSuccessAction = (roomId, messages) => ({
  type: MESSAGE_COLLECTION_LOAD_SUCCESS,
  payload: {
    roomId,
    messages,
  },
});
