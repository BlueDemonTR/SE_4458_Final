import createBill from './createBill';
import createPrescription from './createPrescription';
import getPrescription from './getPrescription';
import verifyTC from './verifyTC';

var express = require('express');
const { verify } = require('jsonwebtoken');
const { default: getAuthentication } = require('./getAuthentication');

var router = express.Router();

const connectionObject = {
	"GET": {
	},
	"POST": {
		'/getAuthentication': getAuthentication,
		'/getPrescription': getPrescription,
		'/verifyTC': verifyTC,
		'/createBill': createBill,
		'/createPrescription': createPrescription
	}
}

function handleSend(data, status = 200) {
	this.status(status)

	this.write(JSON.stringify(data))
	this.end()
}

function handleMessage(req, res) {
	const method = connectionObject[req.method]

	if(!method) {
    res.status(400)
		res.write("Invalid Method " + req.method)

		res.end()
		return
	}
	
	const url = req.params[0]

	const func = method[url]
	
	if(!func) {
    res.status(400)
		res.write(JSON.stringify(
			{ err: "Invalid Function " + url + " in " + req.method }
		))
		res.end()
		return
	}

	let id

	if(req.headers.authorization) {
		try {
			const token = req.headers.authorization.slice(7)

			console.log(token)

			id = verify(
				token, 
				process.env.JWT_SECRET
			).data
		} catch (error) {
			console.log(error);
			
      res.status(401)
			res.write('Token Expired')
			
			res.end()
			return
		}
	}

	res.send = handleSend

	func(req, res, id)
}

router.use('*', function(req, res, next) {

  handleMessage(req, res)
});

export default router
