const cluster = require('cluster')
const numCPUs = require('os').cpus().length

cluster.setupMaster({
  exec : './server.js'
})

for (let i = 0; i < numCPUs; i++) { 
  cluster.fork()
}

cluster.on('disconnect', function(worker) { 
  console.log('a process disconnect!')
  cluster.fork()
})