import { useEffect } from "react";
import socket from "../utilities/socketConnection"

function SecondTest() {
  useEffect(() => {
    socket.emit("secondText", "secondText");
  }, [])

  return (
    <div>
      <h2>Second text</h2>
    </div>
  )
}

export default SecondTest
