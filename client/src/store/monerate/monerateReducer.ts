import ExpenseGetDto from 'dtos/monerate/ExpenseGetDto';
import { getHighestExpenseValue } from 'pages/Monerate/ExpenseFilter/ExpenseFilter';
import { Reducer } from 'redux';
import { MonerateActionReturns } from './monerateActions';
import { monerateActionTypes, MonerateState } from './monerateTypes';

const INITIAL_STATE: MonerateState = {
  expenses: [],
  filter: {
    placeId: null,
    name: '',
    valueRange: [0, 1],
    categories: [],
    minRating: 0,
  },

  places: [],
  categories: [],
  
  editingExpense: null
}

const monerateReducer: Reducer<MonerateState, MonerateActionReturns> = (state = INITIAL_STATE, action: MonerateActionReturns): MonerateState => {
  switch (action.type) {
    case monerateActionTypes.SET_EXPENSES:
      return setExpenses(state, action.payload)
    case monerateActionTypes.ADD_OR_UPDATE_EXPENSE:
      return addOrUpdateExpense(state, action.payload)
    case monerateActionTypes.SET_FILTER:
      return { ...state, filter: action.payload }
    case monerateActionTypes.SET_PLACES:
      return { ...state, places: action.payload }
    case monerateActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload }
    case monerateActionTypes.SET_EDITING_EXPENSE:
      return { ...state, editingExpense: action.payload }
    default:
      return { ...state }
  }
}

const setExpenses = (state: MonerateState, expenses: ExpenseGetDto[]): MonerateState => {
  // let maxValue = 1
  // for(const expense of expenses){
  //   if(expense.value > maxValue){
  //     maxValue = expense.value
  //   }
  // }

  state.filter.valueRange[1] = getHighestExpenseValue(expenses)

  return { ...state, expenses }
}


const addOrUpdateExpense = (state: MonerateState, expense: ExpenseGetDto): MonerateState => {

  // In order to Redux detect changes. It might have an easier way, tho. 
  const expenses = [...state.expenses] 

  const expenseIndex = expenses.findIndex(e => e.id === expense.id)
  if (expenseIndex >= 0) {
    expenses[expenseIndex] = expense
  } else {
    expenses.unshift(expense)
  }

  return { ...state, expenses }
}




export default monerateReducer