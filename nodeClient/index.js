const os = require("os");
const io = require("socket.io-client");
const options = {
  auth: {
    token: "123wefwefm2p3mfmefmmemdqq"
  }
}
const socket = io("http://127.0.0.1:3000", options);

socket.on("connect", () => {
  // console.log("We connected to server")
  const nI = os.networkInterfaces(); // a list of all network intrefaces
  let macA;
  // loop through all nI until we find a non-internal one
  for(let key in nI) {
    const isInternetFacing = !nI[key][0].internal;
    if(isInternetFacing) {
      macA = nI[key][0].mac + Math.floor(Math.random()*100000);
      break;
    }
  }

  const perfDataOnterval = setInterval(async () => {
    // every second call performance data and emit
    const perfData = await performanceLoadData();
    perfData.macA = macA;
    socket.emit("perfData", perfData);
  }, 1000);
  // console.log(macA)

  socket.on("disconnect", () => {
    clearInterval(perfDataOnterval);
  })
})

const getCpuLoad = () => new Promise((resolve, reject) => {
  const start = cpuAverage(); // "now" value of load
  setTimeout(() => {
    const end = cpuAverage();
    const idleDiff = end.idle - start.idle;
    const totalDiff = end.total - start.total;
    // console.log(idleDiff, totalDiff)

    const percentOfCpu = 100 - Math.floor(100 * idleDiff / totalDiff);
    resolve(percentOfCpu);
  }, 100)
})

const performanceLoadData = () => new Promise(async (resolve, reject) => {
  const freeMem = os.freemem(); // in bytes
  const totalMem = os.totalmem(); // in bytes
  const cpus = os.cpus();
  const usedMem = totalMem - freeMem;
  const memUseage = Math.floor(usedMem/totalMem*100)/100; // 2 decimal places
  // console.log(freeMem)
  // console.log(totalMem)
  // console.log(memUseage)
  
  const osType = os.type();
  // console.log(osType)
  
  const upTime = os.uptime();
  // console.log(upTime)
  
  const cpuType = cpus[0].model;
  const numCores = cpus.length;
  const cpuSpeed = cpus[0].speed;
  
  // console.log(cpus)
  // console.log(cpuType, numCores, cpuSpeed);

  const cpuLoad = await getCpuLoad();
  resolve({
    freeMem,
    totalMem,
    usedMem,
    memUseage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad
  });
})

function cpuAverage(){
  const cpus = os.cpus();
  // cpus is an array of all cores. We need the average of all the cores which will give us the cpu average
  let idleMs = 0;
  let totalMs = 0;
  // loop through each thread
  cpus.forEach(aCore => {
    // loop through each property of current core
    for(mode in aCore.times){
      // we need all modes for this core added to totalMs
      totalMs += aCore.times[mode];
    }
    // we need idle mode for this core added to idleMs
    idleMs += aCore.times.idle;
  })

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length
  }
}



// const run = async () => {
//   const data = await performanceLoadData();
//   console.log(data)
// }

// run();