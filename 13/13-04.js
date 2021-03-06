const net = require('net');

let HOST = '127.0.0.1';
let PORT = 2000;

let client = new net.Socket();
let buf = new Buffer.alloc(4);
let timerId = null;
client.connect(PORT, HOST, ()=> {
    console.log('Client CONNECTED: ', client.remoteAddress + ' ' + client.remotePort);
    let k = 0;
    timerId = setInterval(() => {
        console.log(`Client sending number: ${++k}`);
        client.write((buf.writeInt32LE(k, 0), buf));
    }, 1*1000);
    setTimeout(() => {clearInterval(timerId); client.end();}, 20*1000);
})

client.on('data', (data)=> {console.log('Client received: ', data.readInt32LE()); });
client.on('close', ()=> {console.log('Closing client...');});
client.on('error', ()=> {console.log('Client ERROR');});