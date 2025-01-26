import { config } from 'dotenv';
import express, { Router } from 'express';
import { fork } from 'child_process'
const app = express();
const router = Router();

var cors = require('cors')


import { connect } from 'mongoose';
import route from './api';
import bodyParser from 'body-parser';
import { spawnd } from 'spawnd';


const path = __dirname + '/frontend/build';
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

app.use('/api', route);
app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

fork('./medicineHandler/app.js')
fork('./notificationsHandler/app.js')
fork('./dataHandler/app.js')