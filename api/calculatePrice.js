import axios from "axios"
import authorize from "../lib/authorize"

async function calculatePrice(req, res, id) {
	const { content } = req.body

	const user = await authorize(id, 'pharmacy')

	if(!user) return res.end()

	const response = {}

	try {
		console.log(content);
		

		await Promise.all(
			content.map(async medicineName => {
				const _res = await axios.post('http://localhost:8081/api/getPrice', { medicineName })
	
				console.log(response);
						
				response[medicineName] = _res.data
			})
		)

		res.send(response)
	} catch (e) {
		console.log(e);
		
		res.end()
	}
}

export default calculatePrice