import { config } from 'dotenv';
import express, { Router } from 'express';
const app = express();
const router = Router();

const path = __dirname + '/views/';
const port = 8080;

config()

import { connect } from 'mongoose';
import axios from 'axios';
import { read } from 'xlsx';
import { route } from './api';

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