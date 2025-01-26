import axios from "axios"
import authorize from "../lib/authorize"

async function createPrescription(req, res, id) {
	const user = await authorize(id, 'doctor')

	if(!user) return res.end()

	try {
		const _res = await axios.post('http://localhost:8082/api/createPrescription', req.body)

		res.send(_res.data)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default createPrescription