import express from 'express';
import dbConnection from './config/dbConnection.js';
import bodyParser from 'body-parser';
import Logging from './library/Logging.js';
import routes from './routes/index.js';
import config from './config/config.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

dbConnection()
    .then(() => {
        startServer();
    })
    .catch(() => {});


const startServer = () => {
    app.use('/api/v1', routes);

    app.listen(port, () => {
        Logging.info(`Server is listening on port ${config.server.port}`);
    });
};
