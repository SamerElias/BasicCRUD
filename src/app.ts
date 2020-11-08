import express, { Application, Request, Response, NextFunction } from 'express';
import config from './config/default.json';
import logger, { log } from './middleware/logger';
import bodyParser from 'body-parser';
import { getUsers, getUserById, addUser, removeUser } from './db/controller';

const app: Application = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Hello!' })
});

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', addUser);
app.delete('/users/:id', removeUser);

// Init middleware
app.use(logger);

 
const PORT = process.env.PORT || config.app.port;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));