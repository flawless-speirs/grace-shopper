import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
  ('Connected!');
});

export default socket;
