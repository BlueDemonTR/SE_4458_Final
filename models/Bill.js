import { Schema, model } from 'mongoose'

const BillSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	prescription: {
		type: Schema.Types.ObjectId,
		ref: 'Prescription',
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
	}
})

const Bill = model('Bill', BillSchema)

export default Bill