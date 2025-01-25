import { Schema, model } from 'mongoose'

const MedicineSchema = new Schema({
	name: String,
	price: Number,
	old: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

// MEDICINE ARE INDEXED BY NAME HERE
MedicineSchema.index({ name: 1 })

const Medicine = model('Medicine', MedicineSchema)

export default Medicine