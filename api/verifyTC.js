import { Medicine, User } from "../models"

async function verifyTC(req, res) {
	const { patientTC } = req.body
	
	const name = 'Gerçek Kişi'

	res.send({ name })
}

export default verifyTC