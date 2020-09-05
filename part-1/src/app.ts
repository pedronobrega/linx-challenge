import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

interface SetupObject {
  host?: string;
  port?: number;
}

const PORT = Number(process.env.SERVER_PORT) || 8080;
const HOST = process.env.SERVER_HOST || '0.0.0.0';

const app = express();

const setupExpress = (setupObject: SetupObject): void => {
  app.use(cors({ methods: ['GET, POST'] }));

  app.use(
    bodyParser.json({
      limit: '10gb',
    }),
  );

  app.options('*', (req, res) => {
    res.json({ status: 'Ok' });
  });

  app.use(routes);

  let { port, host } = setupObject;
  port = (port && port) || PORT;
  host = (host && host) || HOST;

  app.listen(port, host, () => {
    console.log(`Server is up in http://${host}:${port}`);
  });
};

export default setupExpress;
