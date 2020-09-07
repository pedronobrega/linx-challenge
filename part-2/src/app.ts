import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

const path = `./.env.${process.env.ENVIRONMENT}`;
dotenv.config({ path });

const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = Number(process.env.SERVER_PORT) || 8080;

const app = express();

app.use(cors({ methods: ['GET, POST'] }));

app.use(
  bodyParser({
    limit: '10gb',
  }),
);

app.options('*', (req, res) => {
  res.json({ status: 'Ok' });
});

app.use(routes);

app.listen(PORT, HOST, () => {
  console.log(`Server is up in http://${HOST}:${PORT}`);
});
