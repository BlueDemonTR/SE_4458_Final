import { Medicine } from "../models"

async function searchMedicine(req, res) {
	const { name = '', skip = 0 } = req.body

	const medicines = await Medicine.find({
		name: new RegExp(name, 'i'),
		old: false
	})
		.skip(skip)
		.limit(50)

	res.send({ medicines: medicines.map(x => x.name) })
}

export default searchMedicine