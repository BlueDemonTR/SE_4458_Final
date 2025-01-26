import Queue from "queue"
import authorize from "../lib/authorize"
import { Prescription, User } from "../models"

async function createPrescription(req, res, id) {
	const { content, patientTC, owner } = req.body
	
	global.queue.push(async cb => {
		let prescription

		try {

			prescription = await Prescription.create({
				content,
				patientTC,
				owner
			})

		} catch (e) {
			console.log(e);	
		}
		
	
		res.send(prescription)
		cb(null, prescription)
	})
}

export default createPrescription