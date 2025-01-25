import authorize from "../lib/authorize"

async function createBill(req, res, id) {
	const user = await authorize(id, 'pharmacy')

	if(!user) return res.end()

	try {
		const _res = await axios.post('http://localhost:8082/api/createBill', req.body)

		res.send(_res.data)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default createBill