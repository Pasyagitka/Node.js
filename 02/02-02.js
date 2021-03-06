var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    const picname = './pic.png';

    if(request.url === "/png"){
        fs.stat(picname, (err, stat) => {
            if(err) { console.log('error:', err); }
            else {
                let png = fs.readFileSync(picname);
                response.writeHead(200, {'Content-Type': 'image/png'});
                response.end(png, 'binary');
            }
        });
    }
}).listen(5000);

console.log('Server running: 02-02');