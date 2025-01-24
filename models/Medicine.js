import { Schema, model } from 'mongoose'

const MedicineSchema = new Schema({
	name: String,
	price: Number,
	old: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const Medicine = model('Medicine', MedicineSchema)

export default Medicine