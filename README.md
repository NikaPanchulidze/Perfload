
# Perfload

**Monitor all your devices' hardware resource usage in real-time.**

## Tech Stack

- **REACT**
- **NODEJS**

## Libraries

- **SOCKET.IO**: Used for managing and caching server state, enabling real-time communication.
- **EXPRESS**: Enables navigation and routing within the application.
- **STICKY**: Ensures that each client connection is consistently routed to the same worker process in a Node.js cluster, allowing for reliable handling of long-lived connections like WebSockets.
- **CLUSTER-ADAPTER**: A package for synchronizing messages across multiple workers in a Node.js cluster setup, ensuring scalable and efficient communication.

## Getting Started

### 1. Clone the Repository:
```bash
git clone https://github.com/NikaPanchulidze/Perfload
```

### 2. Navigate to the Main Directory:
```bash
cd Perfload
```

### 3. Navigate to the Project's Directories:
```bash
cd nodeClient
cd react-client
cd server
```

### 4. Download Necessary Libraries for Each Directory:
```bash
npm i
```

### 5. Start the "react-client" Project in a Web Browser:
```bash
npm run dev
```

### 6. Start the "server" Project Locally:
```bash
node server.js
```

### 7. Start the "nodeClient" Project Locally:
```bash
node index.js
```

## Project Structure

- **`nodeClient/`**: Run on all devices you want to get performance data.
- **`react-client/`**: Displays all data on the admin panel.
- **`server/`**: Receives information from different `nodeClient` devices and sends it to the `react-client` for display.

## Features

- One person can monitor the hardware usage of other computers in real-time.
- Implemented with **Socket.IO** for real-time data updates, ensuring instant feedback on hardware usage.
- **Cluster Module** is used to improve scalability by utilizing multiple CPU cores for handling incoming connections efficiently.
- **Sticky Sessions** ensure each client’s data is consistently routed to the same worker, maintaining the integrity of long-lived connections like WebSockets.
- **Cluster Adapter** ensures that all worker processes share real-time data, even if a client connects to different workers.

## ⚠️ **ATTENTION:**
For testing purposes, each device is represented by a combination of its **MAC address** and a random number, making it easier to add multiple users from the same computer.
