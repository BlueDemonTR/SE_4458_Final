import React, { useState } from 'react'
import { Button, Input, Row, Text } from '../components'
import { Api } from '../lib'
import axios from 'axios'

const Auth = ({ handleLogin }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function login() {
		const data = {
			email, password
		}

		const res = await Api.post(
			'/getAuthentication',
			data
		)
		if(!res) return

		handleLogin(res)
	}


	return (
		<Row gap='16px' bg='#DDDDFF' pad='4px'>
			<Row gap='4px'>
				<Text>
					email
				</Text>

				<Input value={email} handleChange={setEmail} />
			</Row>

			<Row gap='4px'>
				<Text>
					Password
				</Text>

				<Input value={password} handleChange={setPassword} />
			</Row>

			<Button onClick={login}>
				Login
			</Button>
		</Row>

	)
}

export default Auth