import { Schema, model } from 'mongoose'

const DoctorPrescriptionSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Doctor',
		required: true
	},
	patientTC: {
		type: String,
		required: true
	},
	content: {
		type: [{
			type: Schema.Types.ObjectId,
			ref: 'Medicine'
		}],
		default: []
	}
})

const DoctorPrescription = model('DoctorPrescription', DoctorPrescriptionSchema)

export default DoctorPrescription