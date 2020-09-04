import 'dotenv/config';
import cluster from 'cluster';

import Cluster from './cluster';
import Worker from './worker';

// THIS IS NOT THE BETTER WAY TO CLUSTER A NODE SERVER.
// OTHER OPTIONS ARE MORE VIABLE, SUCH AS IPTABLE OR NGINX.
// WHY DID I NOT USE IPTABLE? IT HAS TO BE CONFIGURED MANUALLY.
// TODO - ENHANCEMENT => APPLY NGINX

// setupExpress({});

const setup = () => (cluster.isMaster ? new Cluster() : new Worker());

setup();
