import Queue from "queue"
import authorize from "../lib/authorize"
import { Prescription, User } from "../models"

async function createPrescription(req, res, id) {
	const { content, patientTC } = req.body
	
	global.queue.push(async cb => {
		const prescription = await Prescription.create({
			content,
			patientTC,
			owner: id
		})
	
		res.send(prescription)
		cb(null, prescription)
	})
}

export default createPrescription