import { config } from 'dotenv';
import express, { Router } from 'express';
const app = express();
const router = Router();

import puppeteer from 'puppeteer';

const path = __dirname + '/views/';
const port = 8080;

config()

import { connect } from 'mongoose';
import axios from 'axios';
import { read } from 'xlsx';

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

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})


async function name(params) {
  const res = await axios.get('https://www.titck.gov.tr/dinamikmodul/43')
  const page = String(res.data)
  const tableStart = page.indexOf('id="myTable"')
  const badgeStart = page.indexOf('class="badge"', tableStart)
  const hrefStart = page.indexOf('href="', badgeStart) + 'href="'.length 
  const hrefEnd = page.indexOf('"', hrefStart)
  const link = page.slice(hrefStart, hrefEnd)

  const xml = await axios.get(link, { responseType: 'arraybuffer' })

  const parsed = read(xml.data, { type: 'buffer' })

  const aktifUrunler = parsed.Sheets[parsed.SheetNames[0]]

  const urunListesi = []

  Object.keys(aktifUrunler).forEach(key => {
    if(!key.startsWith('A')) return

    urunListesi.push(aktifUrunler[key].v)
  })

  return urunListesi
}

name().then(console.log)