import CategoryGetDto from '../../dtos/monerate/CategoryDtos/CategoryGetDto';
import PlaceGetDto from '../../dtos/monerate/PlaceGetDto';
import { IExpenseFilter } from 'pages/Monerate/ExpenseFilter/IExpenseFilter';
import ExpenseGetDto from '../../dtos/monerate/ExpenseGetDto';

export enum monerateActionTypes {
    SET_EXPENSES = '@monerate/SET_EXPENSES',
    ADD_OR_UPDATE_EXPENSE = '@monerate/ADD_OR_UPDATE_EXPENSE',
    REMOVE_EXPENSE = '@monerate/REMOVE_EXPENSE',

    SET_FILTER = '@monerate/SET_FILTER',

    SET_PLACES = '@monerate/SET_PLACES',
    SET_CATEGORIES = '@monerate/SET_CATEGORIES',

    SET_EDITING_EXPENSE = '@monerate/SET_EDITING_EXPENSE',
    SET_EDITING_PLACE = '@monerate/SET_EDITING_PLACE',
    SET_EDITING_CATEGORY = '@monerate/SET_EDITING_CATEGORY',
}

export interface MonerateState {
    expenses: ExpenseGetDto[]
    filter: IExpenseFilter

    places: PlaceGetDto[]
    categories: CategoryGetDto[]

    editingExpense: ExpenseGetDto,
    editingPlace: PlaceGetDto,
    editingCategory: CategoryGetDto,

}

