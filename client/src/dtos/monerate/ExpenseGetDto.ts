import CategoryGetDto from './CategoryDtos/CategoryGetDto';
import PlaceGetDto from './PlaceGetDto';

export default interface ExpenseGetDto {
    id: number;
    userId: number

    name: string;
    value: number;
    rating: number;

    place: PlaceGetDto;
    description: string;
    categories: CategoryGetDto[]

    createdAt: string
    updatedAt: string
}