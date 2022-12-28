import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (socketSetup = () => {}) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketSetup(socket);
    setSocket(socket);

    return () => socket.close();
  }, []);

  return socket;
};

export default useSocket;
