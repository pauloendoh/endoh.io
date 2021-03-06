import CategoryPostDto from '../../dtos/monerate/Category/CategoryPostDto';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Category from '../../entity/monerate/Category';
import authMiddleware from '../../middlewares/authMiddleware';
import CategoryRepository from '../../repositories/CategoryRepository';
import ErrorMessage, { MyErrorsResponse } from '../../utils/ErrorMessage';
import { MyAuthRequest } from '../../utils/MyAuthRequest';
import { myConsoleError } from '../../utils/myConsoleError';
import placeRoute from './placeRoute';


const categoryRoute = Router()

categoryRoute.post('/', authMiddleware, async (req: MyAuthRequest, res) => {
    const sentCategory = req.body as CategoryPostDto
    const user = req.user
    const categoryRepo = getCustomRepository(CategoryRepository)

    try {

        await categoryRepo.saveCategoryPostDto(sentCategory, user)
        const categories = await categoryRepo.getCategoriesFromUser(user)

        return res.json(categories)
    } catch (err) {
        myConsoleError(err.message)
        return res.status(400).json(new ErrorMessage(err.message))
    }
})

categoryRoute.get('/', authMiddleware, async (req: MyAuthRequest, res) => {
    const categoryRepo = getCustomRepository(CategoryRepository)

    const user = req.user

    try {
        const categories = await categoryRepo.getCategoriesFromUser(user)
        return res.json(categories)
    }
    catch (err) {
        myConsoleError(err.message)
        return res.status(400).json(new ErrorMessage(err.message))
    }
})


categoryRoute.delete('/:id', authMiddleware, async (req: MyAuthRequest, res) => {
    const categoryRepo = getCustomRepository(CategoryRepository)
    const { user } = req
    const categoryId = parseFloat(req.params.id)

    try {
        const result = await categoryRepo.delete({ id: categoryId, user })
        if (result.affected) {
            const categories = await categoryRepo.getCategoriesFromUser(user)
            return res.status(200).json(categories)
        }
        else {
            return res.status(400).json(new MyErrorsResponse('Category id not found, or user is not owner.'))
        }
    }
    catch (err) {
        myConsoleError(err.message)
        return res.status(400).json(new MyErrorsResponse(err.message))
    }

})


export default categoryRoute