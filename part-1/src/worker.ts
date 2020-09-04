import app from './app';

class Worker {
  constructor() {
    this.setupServer();
  }

  setupServer = (): void => {
    const BASE_PORT = Number(process.env.SERVER_PORT) || 8080;
    return app({ port: BASE_PORT + Number(process.env.id) });
  };
}

export default Worker;
