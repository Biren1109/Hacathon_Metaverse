"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import GameCanvas from "../components/gameCanvas";

type Message = {
  id: string;
  message: string;
};

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    // const socket = io("https://qsphackathon-2d-metaverese.onrender.com");
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketReady(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {socketReady && <GameCanvas socket={socketRef.current} />}
    </>
  );
}