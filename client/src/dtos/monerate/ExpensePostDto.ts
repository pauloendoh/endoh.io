import CategoryGetDto from './CategoryDtos/CategoryGetDto';

export default interface ExpensePostDto{
    id: number, 
    placeId?: number
    description: string;
    name: string;
    rating: number;
    value: number;

    categories: CategoryGetDto[]
}