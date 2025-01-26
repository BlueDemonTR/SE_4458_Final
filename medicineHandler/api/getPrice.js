import { Medicine } from "../models"

async function getPrice(req, res) {
	const { medicineName } = req.body
	
	const medicine = await Medicine.findOne({ name: medicineName })

	res.send(medicine.price ?? 0)
}

export default getPrice