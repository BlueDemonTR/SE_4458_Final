import { Schema, model } from 'mongoose'

const MedicineSchema = new Schema({
	name: String
}, { timestamps: true })

const Medicine = model('Medicine', MedicineSchema)

export default Medicine