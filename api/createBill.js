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
}

export default createBill