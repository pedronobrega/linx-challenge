import { Request, Response } from 'express';

import amqp, { Channel, Connection } from 'amqplib/callback_api';

import queueList from '../config/rabbit-queues';
import ProductDTO from '../utils/interfaces/product.dto';

const AMQP_URL = 'rabbit';
const AMQP_PORT = 5672;

export default class ProductController {
  static async create(req: Request, res: Response): Promise<void> {
    const { body } = req;
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
            channel.assertQueue(queue, { durable: true });

            try {
              body.map((product: ProductDTO) => {
                channel.sendToQueue(
                  queue,
                  Buffer.from(JSON.stringify(product)),
                );
                console.log(` [x] Sent  `);
                return product;
              });
            } catch (error2) {
              console.error(error2);
            }
          });

          setTimeout(() => {
            connection.close();
          }, 500);
        },
      );
    }

    res.send('Ok');
  }
}
