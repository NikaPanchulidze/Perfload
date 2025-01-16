import io from "socket.io-client"

const socket = io.connect("http://localhost:3000", {
  auth: {
    token: "ownefn23mnf23pmf2epfmqwd"
  }
});

// socket.on("connect", (data) => {
//   console.log(data)
// })


export default socket;