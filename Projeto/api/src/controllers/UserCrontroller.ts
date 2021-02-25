import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersReporsitory } from '../repositories/UsersRepository';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersReporsitory);
        const userAlredyExist = await usersRepository.findOne({
            email
        });

        if (userAlredyExist) {
            return response.status(400).json({
                error: "User already exists!"
            })
        };
        const user = usersRepository.create({
            name,
            email
        });
        await usersRepository.save(user);

        return response.json(user);
    }
}

export { UserController };
