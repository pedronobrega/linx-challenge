import queueList from './config/rabbit-queues';
import productConsumer from './utils/consumers/product.consumer';

export default {
  async consume(queue: string, msg: any): Promise<void> {
    switch (queue) {
      case queueList.get('createProductQueue'):
        await productConsumer.consumeCreation(msg);
        break;
      default:
        console.error(
          `Informed queue ${queueList} does not have a defined consumer`,
        );
    }
  },
};
