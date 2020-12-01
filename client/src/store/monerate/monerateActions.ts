import CategoryGetDto from '../../dtos/monerate/CategoryDtos/CategoryGetDto';
import PlaceGetDto from '../../dtos/monerate/PlaceGetDto';
import { IExpenseFilter } from 'pages/Monerate/ExpenseFilter/IExpenseFilter';
import { action } from 'typesafe-actions';
import ExpenseGetDto from '../../dtos/monerate/ExpenseGetDto';
import { monerateActionTypes } from './monerateTypes';

export const setExpenses = (expenses: ExpenseGetDto[]) => action(monerateActionTypes.SET_EXPENSES, expenses)

export const addOrUpdateExpense = (expense: ExpenseGetDto) => action(monerateActionTypes.ADD_OR_UPDATE_EXPENSE, expense)

export const setFilter = (filter: IExpenseFilter) => action(monerateActionTypes.SET_FILTER, filter)

export const setPlaces = (places: PlaceGetDto[]) => action(monerateActionTypes.SET_PLACES, places)

export const setCategories = (places: CategoryGetDto[]) => action(monerateActionTypes.SET_CATEGORIES, places)

export const startNewExpense = () => {
  const newExpense: ExpenseGetDto = {
    id: null,
    userId: null,
    name: '',
    value: null,
    rating: null,
    place: null,
    description: '',
    categories: [],
    createdAt: '',
    updatedAt: ''
  }
  return action(monerateActionTypes.SET_EDITING_EXPENSE, newExpense)
}

export const editExpense = (expense: ExpenseGetDto) => action(monerateActionTypes.SET_EDITING_EXPENSE, expense)

export const closeExpenseModal = () => action(monerateActionTypes.SET_EDITING_EXPENSE, null)

// PE 2/3 - Perigo da pessoa esquecer de colocar aqui....
export type MonerateActionReturns =
  ReturnType<typeof setExpenses> |
  ReturnType<typeof addOrUpdateExpense> |
  ReturnType<typeof setFilter> |
  ReturnType<typeof setPlaces> |
  ReturnType<typeof startNewExpense> |
  ReturnType<typeof editExpense> |
  ReturnType<typeof closeExpenseModal> |
  ReturnType<typeof setCategories>

