import CategoryGetDto from '../../dtos/monerate/CategoryDtos/CategoryGetDto';
import PlaceGetDto from '../../dtos/monerate/PlaceGetDto';
import ExpenseGetDto from '../../dtos/monerate/ExpenseGetDto';

export const newExpense: ExpenseGetDto = {
  id: null,
  userId: null,
  name: '',
  value: null,
  rating: null,
  place: null,
  description: '',
  category: null,
  createdAt: '',
  updatedAt: ''
}

export const newPlace: PlaceGetDto = {
  id: null,
  userId: null,
  name: '',
  icon: '',
  bgColor: '#3DAC8D',
  createdAt: '',
  updatedAt: '',
}

export const newCategory: CategoryGetDto = {
  id: null,
  userId: null,
  name: '',
  icon: '',
  bgColor: '#C862AC',
  createdAt: '',
  updatedAt: '',
}