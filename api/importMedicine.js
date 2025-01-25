import axios from 'axios'

async function importMedicine(req, res) {
	try {
		const _res = await axios.get('http://localhost:8081/api/importMedicine')

		res.send(_res.data)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default importMedicine