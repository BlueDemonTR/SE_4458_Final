async function sendEmail(email, content) {
	console.log('TO: ' + email);

	console.log(content);	
}

async function notifyPharmacies() {
	/*
	const unfinished = await Prescription.find({ complete: false })

	const pharmacies = await User.find({ role: 'pharmacy' })

	const message = `You have ${unfinished.length} unfinished prescriptions today`

	for (const prescription of unfinished) {
		const bills = await Bill.find({ prescription })

		message += `\n Pres Id: ${prescription._id.toString()}`

		const set = new Set()

		bills.forEach(bill => {
			bill.content.forEach(item => {
				set.add(item.medicine)
			})
		})

		for (const medicineName of Array.from(set)) {
			message += medicineName
		}

	}

	pharmacies.forEach((pharmacy) => sendEmail(pharmacy.email, message))
	*/
}

export default notifyPharmacies