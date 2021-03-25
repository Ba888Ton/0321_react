import { createContext, useReducer } from "react"

const AppReducer = (state, action) => {
    switch (action.type) {
        case 20:
            return { ...state, cost: 20 }
        case 'remove':
            const newExpenses = state.expenses.filter( item => item.id !== action.payload)
            return { ...state, expenses:[ ...newExpenses] }
        case 'add':
            const addExpense = { id:action.payload.id, name:action.payload.name, cost:action.payload.cost }
            console.log(addExpense)
            return { ...state, expenses:[ ...state.expenses, addExpense] }
        default:
            return state;
    }
}

const initialState = {
    budget: 12000,
    expenses: [
        { id:22, name: 'shopping', cost: 42 },
        { id:23, name: 'holiday', cost: 403 },
        { id:24, name: 'car ', cost: 74 },
    ]
}

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    return (
        <AppContext.Provider 
        value={{
            budget: state.budget,
            expenses: state.expenses,
            dispatch,
        }}
        >
            {props.children}
        </AppContext.Provider>
    )
}