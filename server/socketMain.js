const socketMain = (io) => {
  io.on("connection", (socket) => {
    let machineMacA;
    const auth = socket.handshake.auth;
    console.log(auth.token)
    if(auth.token === "123wefwefm2p3mfmefmmemdqq") {
      socket.join("nodeClient");
    } else if(auth.token === "ownefn23mnf23pmf2epfmqwd") {
      socket.join("reactClient");
    } else {
      socket.disconnect();
      console.log("YOU HAVE BEEN DISCONNECTED!!!")
    }
    console.log(`Someone connected on worker ${process.pid}`)
    socket.emit("welcome", "Welcome to cluster server");

    socket.on("perfData", (data) => {
      // console.log("tick..", data)
      if(!machineMacA) {
        machineMacA = data.macA
        io.to("reactClient").emit("connectedOrNot", {
          machineMacA,
          isAlive: true
        })
      }
      io.to("reactClient").emit("perfData", data);
    })

    socket.on("disconnect", (reason) => {
      // a nodeClient just disconencted, let fornt end know
      io.to("reactClient").emit("connectedOrNot", {
        machineMacA,
        isAlive: false
      })
    })

    // socket.on("testConnection", (data) => {
    //   console.log(data)
    // })

    // socket.on("secondText", (data) => {
    //   console.log(data)
    // })
  });
}

module.exports = socketMain;