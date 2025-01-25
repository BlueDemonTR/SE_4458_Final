import { sign } from "jsonwebtoken"
import { User } from "../models"

async function getAuthentication(req, res) {
	const { email, password } = req.body

	const user = await User.findOne({ email, password })

	if(!user) res.end()

	const token = sign(
		{
			id: user._id
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	)

	res.send({ token, user })
}

export default getAuthentication