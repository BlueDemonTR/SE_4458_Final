import axios from "axios";

async function getPrescription(req, res, id) {
	const user = await authorize(id)

	if(!user) return res.end()

	try {
		const _res = await axios.post('http://localhost:8082/api/getPrescription', { ...req.body, owner: id })

		res.send(_res.data)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default getPrescription