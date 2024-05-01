const express = require('express')
const app = express();
const cors = require('cors');
const tesConnect = require('./db/testConnect');

class AppController {
    constructor() {
      this.express = express();
      this.middlewares();
      this.routes();
      tesConnect();
    }

    middlewares() {
      this.express.use(express.json());
      this.express.use(cors());
    }

    routes() {
      const apiRoutes= require('./routes/rotas');
      this.express.use('/api/v1/', apiRoutes);
    }
  }

  module.exports = new AppController().express;