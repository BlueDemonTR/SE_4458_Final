import { config } from 'dotenv';
import express, { Router } from 'express';
const app = express();
const router = Router();

var cors = require('cors')


import { connect } from 'mongoose';
import route from './api';
import bodyParser from 'body-parser';

const port = 8082;

config()

const corsSettings = {
  origin: ['http://127.0.0.1:57958', 'http://localhost:3000', 'http://localhost:8082']
}

global.queue = new Queue({ results: [], autostart: true })

app.use(bodyParser.json())
app.use(cors(corsSettings))


async function startDatabase() {
  await connect(process.env.DB_URI, {})
  console.log('connected to database')
}

startDatabase()

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

app.use('/api', route);
app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})