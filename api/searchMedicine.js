import axios from 'axios'

async function searchMedicine(req, res) {
	const { name = '', skip = 0 } = req.body

	try {
		const _res = await axios.post('http://localhost:8081/api/searchMedicine', req.body)

		res.send(_res.data)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default searchMedicine