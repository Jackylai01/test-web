import { loadToken } from '@helpers/token';
import { isBrowser } from '@helpers/utils';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../fixtures/constants';

function getIP() {
  if (isBrowser()) {
    const ip = localStorage.getItem('ip');
    return `${ip}`;
  }
  return '';
}

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectedId, setConnectedId] = useState<string>('');

  useEffect(() => {
    const { accessToken } = loadToken();
    const socketIo = io(SOCKET_URL, {
      transports: ['websocket'],
      query: {
        token: accessToken,
        ip: getIP(),
      },
      autoConnect: true,
      upgrade: false,
    });
    socketIo.on('connect', () => {
      console.log('connect', socketIo.id);
      setConnectedId(socketIo.id);
    });
    socketIo.on('disconnect', () => () => {
      console.log('disconnect', socketIo.id);
      setConnectedId('');
    });
    setSocket(socketIo);
    return function () {
      socketIo.off('connect');
      socketIo.off('disconnect');
    };
  }, []);

  return {
    socket,
    connectedId,
  };
};

export default useSocket;
