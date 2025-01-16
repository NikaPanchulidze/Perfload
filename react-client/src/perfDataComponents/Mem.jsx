import { useRef } from "react"
import drawCircle from "../utilities/canvasLoadAnimation"

function Mem({data}) {
  const memRef = useRef();

  const {freeMem, memUseage, totalMem, usedMem} = data;
  // console.log(usedMem)

  const totalMemInGB = Math.floor(totalMem/1073741824*100)/100
  const freeMemInGB = Math.floor(freeMem/1073741824*100)/100
  const usedMemInGb = Math.floor(usedMem/1073741824*100)/100
  drawCircle(memRef.current, 100-usedMemInGb);

  return (
    <div className="mem col-3">
      <h3>Memory Useage</h3>
      <div className="canvas-wrapper">
        <canvas ref={memRef} width="200" height="200"></canvas>
        <div className="mem-text">{memUseage*100}%</div>
      </div>
      <div>
        Total Memory: {totalMemInGB}gb
      </div>
      <div>
        Free Memory: {freeMemInGB}gb
      </div>
    </div>
  )
}

export default Mem
