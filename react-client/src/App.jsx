import { useEffect, useState } from "react"
import socket from "./utilities/socketConnection"
import Widget from "./perfDataComponents/Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on("perfData", (data) => {
      setPerformanceData((prevData) => {
        const copyPerfData = { ...prevData };
        copyPerfData[data.macA] = data;
        return copyPerfData;
      });;
    })
    // console.log("Adding perfData listener")
    return () => {
      socket.off("perfData");
    };
  }, []);

  const widgets = Object.values(performanceData).map(d => <Widget data={d} key={d.macA} />)
  

  return (
    <div className="container">
      {widgets}
    </div>
  )
}

export default App
