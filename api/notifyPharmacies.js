import axios from 'axios'

async function notifyPharmacies(req, res) {
	try {
		const _res = await axios.get('http://localhost:8083/api/notifyPharmacies')

		res.send(_res.data)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default notifyPharmacies