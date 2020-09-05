/** Global */
import dotenv from 'dotenv';
import cluster from 'cluster';

const path = `./.env.${process.env.ENVIRONMENT}`;
dotenv.config({ path });

/** Modules */
// eslint-disable-next-line import/first
import Cluster from './cluster';
// eslint-disable-next-line import/first
import Worker from './worker';

// THIS IS NOT THE BETTER WAY TO CLUSTER A NODE SERVER.
// OTHER OPTIONS ARE MORE VIABLE, SUCH AS IPTABLE OR NGINX.
// WHY DID I NOT USE IPTABLE? IT HAS TO BE CONFIGURED MANUALLY.
// TODO - ENHANCEMENT => APPLY NGINX

// setupExpress({});

const setup = () => (cluster.isMaster ? new Cluster() : new Worker());

setup();
