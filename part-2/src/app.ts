import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const HOST = '0.0.0.0';
const PORT = 8080;

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
