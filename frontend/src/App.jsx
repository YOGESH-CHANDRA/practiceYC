import { io } from "socket.io-client";

import React, { useEffect, useMemo, useState } from "react";

const App = () => {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", msg);
    setMsg("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server ", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server ", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="m-10 border border-red-500 p-5">
      <div className="text-center">App</div>
      <form className="flex justify-center my-5" onSubmit={submitHandler}>
        <input
          className="border border-red-200 w-1/2 p-2"
          type="text"
          id="message"
          placeholder="enter your message here "
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="mx-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
