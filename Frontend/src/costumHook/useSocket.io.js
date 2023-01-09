import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { URL_API } from "../baseUrl/url";

const useSocket = (socketSetup = () => {}) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(URL_API, {
      transports: ["websocket"],
    });

    socketSetup(socket);
    setSocket(socket);

    return () => socket.close();
  }, []);

  return socket;
};

export default useSocket;
