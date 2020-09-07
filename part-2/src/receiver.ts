import amqp, { Channel } from 'amqplib/callback_api';
import dotenv from 'dotenv';

import queueList from './config/rabbit-queues';
import consumer from './consumer';

const path = `./.env.${process.env.ENVIRONMENT}`;
dotenv.config({ path });

const AMQP_URL = process.env.AMQP_URL || 'localhost';
const AMQP_PORT = Number(process.env.AMQP_PORT) || 5672;

amqp.connect(
  `amqp://guest:guest@${AMQP_URL}:${AMQP_PORT}`,
  (error0: any, connection: any) => {
    if (error0) {
      console.error(error0);
    }

    connection.createChannel((error1: any, channel: Channel) => {
      if (error1) {
        console.error(error1);
      }

      queueList.forEach(queue => {
        channel.assertQueue(queue);

        console.log(` [*] Waiting for messages in ${queue}`);

        channel.consume(
          queue,
          msg => consumer.consume(queue, msg?.content.toString()),
          {
            noAck: true,
          },
        );
      });
    });
  },
);
