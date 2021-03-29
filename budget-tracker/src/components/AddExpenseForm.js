import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext'
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";


const AddExpenseForm = () => {
	const { dispatch } = useContext(AppContext)
	const [name, setName] = useState('')
	const [cost, setCost] = useState('')
	return (
		<form onSubmit={e => {
			e.preventDefault()
			dispatch({type: 'add', payload: {
				id: nanoid(),
				name: name,
				cost: Number(cost)
			}})
			setName('')
			setCost('')
		}}>
			<div className='row'>
				<div className='col-sm'>
					<label for='name'>Name</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={e => setName(e.target.value)}
					></input>
				</div>
				<div className='col-sm'>
					<label for='cost'>Cost</label>
					<input
						required='required'
						type='text'
						className='form-control'
						id='cost'
						value={cost}
						onChange={e => setCost(e.target.value)}
					></input>
				</div>

			</div>
            <div className='row'>
            	<div className='col-sm'>
					<button type='submit' className='btn btn-primary mt-3'>
						Save
					</button>
				</div>
            </div>
		</form>
	);
};

export default AddExpenseForm;