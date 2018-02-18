const cluster = require('cluster');
const http = require('http');
http = require('http');
var numCPUs = require('os').cpus().length;


var workers = {}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running cpu:${numCPUs}`);
  
  
   cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
	delete workers[worker.pid];
	worker = cluster.fork();
	workers[worker.pid] = worker;
   });
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    worker = cluster.fork();
	workers[worker.pid] = worker;
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  /*http.createServer((req, res) => {
    res.writeHead(200);
    console.log('worker'+cluster.worker.id);
    res.end('worker'+cluster.worker.id+',PID:'+process.pid);
  }).listen(8000);*/
  
  var app = require('./app')
    app.listen(3000)

  console.log(`Worker ${process.pid} started`);
}

