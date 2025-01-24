import { Schema, model } from 'mongoose'

const PrescriptionSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	patientTC: {
		type: String,
		required: true
	},
	content: {
		type: [{
			medicine: {
				type: Schema.Types.ObjectId,
				ref: 'Medicine'
			},
			count: {
				type: Number,
				min: 0
			}
		}],
		default: []
	},
	complete: {
		type: Boolean,
		default: false
	}
})

const Prescription = model('Prescription', PrescriptionSchema)

export default Prescription