import { useEffect } from "react"
import socket from "../utilities/socketConnection"
import SecondTest from "./SecondTest";

function TestApp() {
  useEffect(() => {
    socket.emit("testConnection", "Am I connected?");
  }, [])

  return (
    <div>
      <h1>Test App</h1>
      <SecondTest />
    </div>
  )
}

export default TestApp
