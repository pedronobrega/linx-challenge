import amqp, { Channel } from 'amqplib/callback_api';
import queueList from './config/rabbit-queues';
import consumer from './consumer';

const AMQP_URL = 'rabbit';
const AMQP_PORT = 5672;

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
