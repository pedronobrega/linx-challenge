import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const PORT = 3333;
const HOST = '0.0.0.0';

const app = express();

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
