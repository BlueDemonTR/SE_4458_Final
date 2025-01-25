import { sign } from "jsonwebtoken"
import { Prescription } from "../models"

async function getPrescription(req, res) {
	const { prescriptionID } = req.body

	const prescription = await Prescription.findById(prescriptionID)
		.populate('content.medicine')

	if(!prescription) res.end()

	res.send({ prescription })
}

export default getPrescription