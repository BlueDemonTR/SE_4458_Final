import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
	name: String,
	password: String,
	role: {
		type: String,
		enum: ['pharmacy', 'doctor']
	}
})

const User = model('User', UserSchema)

export default User