
import React, { useState } from 'react'
import { Input, Row, Text } from '../components'

const BillItem = ({ item, handleChange, price }) => {
	const { count, medicine } = item 

	function handleEditCount(val) {
		handleChange(
			{ count: parseInt(val) }
		)
	}
	
	if(count < 1) return null

	return (
		<Row>
			<Text>{medicine}</Text>

			<Input 
				value={count}
				handleChange={handleEditCount}
				type='number'
				min={0}
				wid='30px'
			/>

			{price && (
				<Text>{count * price}</Text>
			)}
		</Row>
	)
}

export default BillItem