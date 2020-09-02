import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import os from 'os';
import routes from './routes';

const PORT = 3333;
const HOST = '0.0.0.0';

const app = express();
let workers: cluster.Worker[] = [];

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
  const numCores = os.cpus().length;
  console.log(`Master cluster setting up ${numCores} workers`);

  for (let i = 0; i < numCores; i += 1) {
    workers.push(cluster.fork());

    workers[i].on('message', message => {
      console.log(message);
    });
  }

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
};

const setupExpress = () => {
  app.use(cors());

  app.use(
    bodyParser.json({
      limit: '10gb',
    }),
  );

  app.use(routes);

  app.listen(PORT, HOST, () => {
    console.log(`Server is up in http://${HOST}:${PORT}`);
  });
};

const setupServer = (isClusterRequired: boolean) => {
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    setupExpress();
  }
};

setupServer(true);
