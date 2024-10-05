import { Server } from "socket.io";

function setupMaintenanceSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected to maintenance socket");

    socket.on("disconnect", () => {
      console.log("Client disconnected from maintenance socket");
    });
  });

  function notifyMaintenanceUpdate(data) {
    console.log("notifyMaintenanceUpdate", data);
    //a fake data to test the socket
    io.emit("maintenance-status-update", data);
  }

  return {
    notifyMaintenanceUpdate,
  };
}

export default setupMaintenanceSocket;
