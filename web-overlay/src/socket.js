import io from "socket.io-client";

const params = window.location.search.slice(1).split('&').reduce((acc, s) => {
  const [k, v] = s.split('=')
  return Object.assign(acc, {[k]: v})
}, {})
console.log(params.id)
export const socket = io('https://api.uptwocat.com/overlay',{auth: {id:params.id}})

    socket.on("connect", () => {
      console.log("Connection Established"); // true
});
