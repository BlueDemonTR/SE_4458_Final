import authorize from "../lib/authorize"
import { Bill, Medicine, Prescription, User } from "../models"

async function createBill(req, res, id) {
	const { content, prescription } = req.body
	
	const user = await authorize(id, 'pharmacy')

	const bill = await Bill.create({
		content,
		prescription,
		owner: user
	})

	res.send(bill)

	const bills = await Bill.find({ prescription })
	const covered = new Set()

	bills.forEach(bill => {
		bill.content.forEach(item => {
			covered.add(item.medicine)
		})
	})


	const _prescription = await Prescription.findById(prescription)

	if(!_prescription.content.find(item => covered.has(item.medicine))) {
		await _prescription.updateOne({ complete: true })
	}
}

export default createBill