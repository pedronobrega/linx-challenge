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

const setup = () => (cluster.isMaster ? new Cluster() : new Worker());

setup();
