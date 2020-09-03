import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import routes from './routes';

import workers from './workers';

const PORT = 3333;
const HOST = 'localhost';

const app = express();

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

// THIS IS NOT THE BETTER WAY TO CLUSTER A NODE SERVER.
// OTHER OPTIONS ARE MORE VIABLE, SUCH AS IPTABLE OR NGINX.
// WHY DID I NOT USE IPTABLE? IT HAS TO BE CONFIGURED MANUALLY.
// TODO - ENHANCEMENT => APPLY NGINX

// This can be setted as environment variable
const isClusterRequired: boolean | string =
  process.env.CLUSTER_REQUIRED || false;

if (cluster.isMaster) {
  workers.setup(isClusterRequired);
} else {
  setupExpress();
}
