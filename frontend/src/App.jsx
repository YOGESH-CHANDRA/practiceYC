
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
// const [inputValue,setInutValue] =useState("");
const [messages, setMessages] = useState("");

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );


const submitHandler=(e)=>{
  e.preventDefault();
  socket.emit("message", messages);
  setMessages("");
  
}


  useEffect(() => {
    socket.on("connect", (socket) => {
      
      console.log("connected",socket, socket?.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
   <>
    <h1>HI i am yogesh chandra</h1>
    <form onSubmit={submitHandler}>
      <input type="text" onChange={(e)=>setMessages(e.target.value)} value={messages}/>
      <button type="submit">submit</button>
    </form>
   
   </>
  );
};

export default App;
