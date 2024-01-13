import io from "socket.io-client";

export const socket = io('https://api.uptwocat.com',{
  auth: {
    "Authorization": `Bearer ${localStorage.getItem('JWT')}`
  }
});

socket.on("connect", () => {
  console.log("Connection Established"); // true
  });
