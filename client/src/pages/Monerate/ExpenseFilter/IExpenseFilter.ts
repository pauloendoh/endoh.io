import PlaceGetDto from '../../../dtos/monerate/PlaceGetDto';
import ExpenseGetDto from '../../../dtos/monerate/ExpenseGetDto'
import CategoryGetDto from '../../../dtos/monerate/CategoryDtos/CategoryGetDto';

export interface IExpenseFilter {
    placeId: number,
    name: string,
    valueRange: number[],
    categoryId: number,
    minRating: number
}

// PE 2/3 - Should be in another place?
export const getFilteredExpenses = (filter: IExpenseFilter, expenses: ExpenseGetDto[]): ExpenseGetDto[] => {
    let filteredExpenses = [...expenses]

    if (filter.placeId) {
        filteredExpenses = filteredExpenses.filter(e => e.place?.id === filter.placeId)
    }

    if (filter.categoryId) {
        filteredExpenses = filteredExpenses.filter(expense => expense.category?.id === filter.categoryId)
    }

    if (filter.name.length) {
        filteredExpenses = filteredExpenses.filter(
            e =>
                e.name.toUpperCase().includes(filter.name.toUpperCase()) ||
                e.description.toUpperCase().includes(filter.name.toUpperCase()))
    }

    filteredExpenses = filteredExpenses.filter(e => {
        return (filter.valueRange[0] <= e.value && e.value <= filter.valueRange[1])
    })

    if (filter.minRating) {
        filteredExpenses = filteredExpenses.filter(e => e.rating >= filter.minRating)
    }

    return filteredExpenses
}