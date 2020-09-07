import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import amqp, { Channel, Connection } from 'amqplib/callback_api';
import queueList from './config/rabbit-queues';
import ProductDTO from './utils/interfaces/product.dto';

const AMQP_URL = 'localhost';
const AMQP_PORT = 5672;

const HOST = 'localhost';
const PORT = 8080;

const app = express();

app.use(cors({ methods: ['GET, POST'] }));

app.use(
  bodyParser.json({
    limit: '10gb',
  }),
);

app.options('*', (req, res) => {
  res.json({ status: 'Ok' });
});

app.get('/ping', (req: Request, res: Response) => res.send('pong'));
app.post('/products', (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);
  if (body) {
    amqp.connect(
      `amqp://guest:guest@${AMQP_URL}:${AMQP_PORT}`,
      (error0: any, connection: Connection) => {
        if (error0) {
          console.error(error0);
        }

        connection.createChannel((error1: any, channel: Channel) => {
          if (error1) {
            console.error(error1);
          }

          const queue = queueList.get('createProductQueue');
          channel.assertQueue(queue, { durable: false });
          try {
            body.map((product: ProductDTO) => {
              channel.sendToQueue(queue, Buffer.from(product));
              console.log(` [x] Sent  `);
              return product;
            });
          } catch (error2) {
            console.error(error2);
          }
        });
        setTimeout(() => {
          connection.close();
          process.exit(0);
        }, 500);
      },
    );
  }

  res.send('Ok');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is up in http://${HOST}:${PORT}`);
});
