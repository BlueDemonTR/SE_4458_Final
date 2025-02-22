import React, { useState } from 'react'
import { Button, Clickable, Col, Input, Row, Text } from '../components'
import { Api } from '../lib'
import PrescriptionItem from './prescriptionItem'

let timer
const Doctor = ({ user, token }) => {
	const [patientTC, setPatientTC] = useState('')
	const [content, setContent] = useState([])
	const [patient, setPatient] = useState(null)
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])

	async function verifyTC() {
		const data = {
			patientTC
		}

		const res = await Api.post(
			'/verifyTC',
			data
		)
		if(!res) return

		setPatient(res)
	}

	async function handleSearch(val) {
		setSearch(val)

		clearTimeout(timer)
		timer = setTimeout(() => {
			searchMedicine()
		}, 500);
	}
	
	async function searchMedicine() {
		const data = {
			name: search
		}

		const res = await Api.post(
			'/searchMedicine',
			data
		)
		if(!res) return

		setResults(res.medicines)
	}

	async function submit() {
		const data = {
			owner: user._id,
			content: content.filter(x => x.count > 0),
			patientTC
		}

		const res = await Api.post(
			'/createPrescription',
			data
		)
		if(!res) return

		window.alert('prescription added')
		window.location.reload()
	}

	function handleAddMedicine() {
		const medicineName = search

		if(content.find(x => x.medicine === medicineName)) {
			setContent(content.map(x => {
				if(x.medicine !== medicineName) return x

				return {
					...x,
					count: x.count + 1
				}
			}))

			return
		}

		setContent([
			...content,
			{
				medicine: medicineName,
				count: 1
			}
		])
	}

	function handleEditMedicine(index, push) {
		setContent(content => content.map((x, i) => {
			if(index !== i) return x

			return {
				...x,
				...push
			}
		}))
	}

	return (
		<Col pad='8px' bg='#BBBBBB' wid='100vw' ht='100vh' noFlex centerAll>
			<Row gap='8px'>
				<Input 
					value={patientTC}
					handleChange={setPatientTC}
					label={'Patient TC'}
				/>

				<Button onClick={verifyTC}>
					Verify
				</Button>
			</Row>

			{patient && (
				<Text>
					Patient's name: {patient.name}
				</Text>
			)}

			<Row>
				<Col>
					<Row>
						<Input 
							value={search}
							handleChange={handleSearch}
							label='medicine name'
						/>

						<Button 
							disabled={results.includes(search)}
							onClick={handleAddMedicine}
						>
							Add
						</Button>
					</Row>

					<Row>
						<Col marg='2px' pad='4px' bg='white' wid='300px' ht='200px' scrollY noFlex start>
							{results.map(x => (
								<Clickable onClick={() => handleSearch(x)}>
									<Text>
										{x}
									</Text>
								</Clickable>
							))}
						</Col>
						<Col marg='2px' pad='4px' bg='white' wid='300px' ht='200px' scrollY noFlex start>
							{content.map((x, i) => (
								<PrescriptionItem 
									item={x}
									handleChange={(push) => handleEditMedicine(
										i,
										push
									)}
								/>
							))}
						</Col>
					</Row>

					<Button onClick={submit}>
						Submit
					</Button>
				</Col>
			</Row>
		</Col>
	)
}

export default Doctor