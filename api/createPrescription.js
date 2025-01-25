import authorize from "../lib/authorize"
import { Prescription, User } from "../models"

async function createPrescription(req, res, id) {
	const { content, patientTC } = req.body
	
	const user = await authorize(id, 'doctor')

	const prescription = await Prescription.create({
		content,
		patientTC,
		owner: user
	})

	res.send(prescription)
}

export default createPrescription