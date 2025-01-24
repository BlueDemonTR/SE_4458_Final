import { sign } from "jsonwebtoken"
import { User } from "../models"

async function getAuthentication(req, res) {
	const { username, password } = req.body

	const user = await User.findOne({ username, password })

	if(!user) res.end()

	const token = sign(
		{
			id: user._id
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	)

	res.send({ token })
}

export default getAuthentication