import os from 'os';
import cluster from 'cluster';

let workers: cluster.Worker[] = [];

const setup = (isClusterRequired: boolean | string): void => {
  const numCores = isClusterRequired === true ? os.cpus().length : 1;
  // const numCores = 1;
  console.log(`Master cluster setting up ${numCores} workers`);

  for (let i = 0; i < numCores; i += 1) {
    workers.push(cluster.fork());

    workers[i].on('message', message => {
      console.log(message);
    });
  }
};

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
  workers[workers.length - 1].on('message', message => {
    console.log(message);
  });
});

export default { setup };
