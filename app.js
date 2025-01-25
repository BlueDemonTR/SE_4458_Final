import { config } from 'dotenv';
import express, { Router } from 'express';
const app = express();
const router = Router();

var cors = require('cors')


import { connect } from 'mongoose';
import route from './api';
import hasWeeklySchedulePassed from './lib/hasWeeklySchedulePassed';
import importMedicine from './lib/importMedicine';
import hourlyScheduler from './lib/scheduler';
import bodyParser from 'body-parser';


const path = __dirname + '/views/';
const port = 8080;

config()

const corsSettings = {
  origin: ['http://127.0.0.1:57958', 'http://localhost:3000']
}

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

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

router.get('/sharks', function(req,res){
  res.sendFile(path + 'sharks.html');
});

app.use('/api', route);
app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})

hourlyScheduler()