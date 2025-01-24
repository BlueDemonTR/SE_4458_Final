import { Schema, model } from 'mongoose'

const MedicineSchema = new Schema({
	name: String,
	price: Number
})

const Medicine = model('Medicine', MedicineSchema)

export default Medicine