import React from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import { nanoid } from "nanoid";

const ExpenseList = () => {
	const { expenses, dispatch } = React.useContext(AppContext)
	const delItem = id => {
		dispatch({type: 'remove', payload: id})
	}
    return (
		<>
			<ul className='list-group'>
				{expenses.map((expense) => (
					<ExpenseItem  id={expense.id} key={expense.id} name={expense.name} cost={expense.cost} delItem={delItem} />
				))}
			</ul>
		</>

    )
}

export default ExpenseList