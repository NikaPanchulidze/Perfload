import Cpu from "./Cpu"
import Info from "./Info"
import Mem from "./Mem"
import "./widget.css"
import socket from "../utilities/socketConnection"
import { useEffect, useState } from "react"

function Widget({data}) {
  // console.log(data)
  const [isAlive, setIsAlive] = useState(true);

  const {freeMem, totalMem, usedMem, memUseage, osType, upTime, cpuType, numCores, cpuSpeed, cpuLoad, macA} = data;

  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUseage };
  const infoData = { macA, osType, upTime, cpuType, cpuSpeed, numCores };

  const notAliceDiv = !isAlive ? <div className="not-active">Offline</div> : <></>;

  useEffect(() => {
    socket.on("connectedOrNot", ({isAlive, machineMacA}) => {
      // does not mean THIS client has disconnected (or reconnected)
      // it is for one of the nodeClient that is ticking
      if(machineMacA === macA) {
        setIsAlive(isAlive);
      }
    })
  }, [])

  return (
    <div className="widget row justify-content-evenly">
      {notAliceDiv}
      <Cpu data={cpuData}/>
      <Mem data={memData}/>
      <Info data={infoData}/>
    </div>
  )
}

export default Widget
