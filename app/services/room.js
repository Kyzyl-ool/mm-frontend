import axios from 'axios';

import store from '../store';
import { messageTextFlushAction } from '../store/actions/message';
import { loadMessages } from './message/loader';
import route from '../config/route';
import httpOptions from '../helper/httpOptions';
import {
  roomCollectionLoadSuccessAction,
  roomSelectAction,
  roomOnlineUpdateAction,
} from '../store/actions/room';

const buildRooms = (collection) => {
  const items = [];

  collection.forEach((room) => {
    room.photo = room.users[0].photo;
    room.name = room.users[0].name;

    items.push(room);
  });

  return items.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

export const selectRoom = (room) => {
  store.dispatch(roomSelectAction(room));
  store.dispatch(messageTextFlushAction());
};

export const loadRooms = () => {
  axios
    .get(
      route.URL_CHAT,
      httpOptions,
    )
    .then((response) => {
      if (response.data.length === 0) {
        return;
      }

      const rooms = buildRooms(response.data);

      store.dispatch(roomSelectAction(rooms[0]));
      store.dispatch(roomCollectionLoadSuccessAction(
        rooms,
        rooms[0],
      ));
      loadMessages(rooms[0].id); // Load messages for the last selected room
    });
};

export const updateOnlineStatuses = (members) => {
  const rooms = store.getState().room.collection;
  const updated = [];

  rooms.forEach((room) => {
    if (members.members[room.users[0].id]) {
      room.users[0].online = true;
    }

    updated.push(room);
  });

  store.dispatch(roomOnlineUpdateAction(updated));
};

export const updateOnlineStatusesMemberAdded = (member) => {
  const rooms = store.getState().room.collection;
  const updated = [];

  rooms.forEach((room) => {
    if (room.users[0].id === Number(member.id)) {
      room.users[0].online = true;
      console.log(`----> ${room.users[0].name} is Online`);
    }

    updated.push(room);
  });

  store.dispatch(roomOnlineUpdateAction(updated));
};

export const updateOnlineStatusesMemberRemoved = (member) => {
  const rooms = store.getState().room.collection;
  const updated = [];

  rooms.forEach((room) => {
    if (room.users[0].id === Number(member.id)) {
      room.users[0].online = false;
      console.log(`----> ${room.users[0].name} is Offline`);
    }

    updated.push(room);
  });

  store.dispatch(roomOnlineUpdateAction(updated));
};

export const getChats = async () => {
  return axios.get(route.URL_CHAT, httpOptions);
};

export const createChat = async (name) => {
  return axios.put(route.URL_CHAT, {
    title: `Chat with ${localStorage.getItem('name')} and ${name}`,
    participants: [],
  }, httpOptions);
};

// export const joinChat = (chat)
