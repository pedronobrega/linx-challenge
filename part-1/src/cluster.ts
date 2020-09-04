import os from 'os';
import cluster from 'cluster';

let workers: cluster.Worker[] = [];

cluster.on('online', worker => {
  console.log(`Worker ${worker.process.pid} is listening`);
});

cluster.on('exit', (worker, code, signal) => {
  console.log(
    `Worker  ${worker.process.pid} died with code:  ${code} , and signal: ${signal}`,
  );
  console.log('Starting a new worker');
  cluster.fork();
  workers.push(cluster.fork());
  workers[workers.length - 1].on('message', (message: any) => {
    console.log(message);
  });
});

class Cluster {
  constructor() {
    this.setupClusters();
  }

  setupClusters = (): void => {
    const numCores =
      process.env.CLUSTER_REQUIRED || false ? os.cpus().length : 1;

    console.log(`Master cluster setting up ${numCores} workers`);

    for (let i = 0; i < numCores; i += 1) {
      workers.push(cluster.fork({ id: i }));
    }
  };
}

export default Cluster;
