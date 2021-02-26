import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersReporsitory } from '../repositories/UsersRepository';

class UserController {
    //Quando a rota POST for chamada vai criar um novo usuário
    async create(request: Request, response: Response) {
        //Desestruturação do objeto que vai ser enviado no request
        //Podem ser adicionados ou removidos os atributos
        //De acordo o o model/User                                  
        const { name, email } = request.body;

        //Pega a as funções que podem ser aplicadas no DB
        //CRUD
        const usersRepository = getCustomRepository(UsersReporsitory);

        //Retorna dados utilizando a propriedade do objeto que quer achar
        const userAlredyExist = await usersRepository.findOne({
            email
        });

        if (userAlredyExist) {
            return response.status(400).json({
                error: "User already exists!"
            })
        };

        //Sempre vai ser preciso criar o objeto antes de fazer o post no DB
        const user = usersRepository.create({
            name,
            email
        });

        // Faz o post no DB utilizando os dados informados
        await usersRepository.save(user);

        return response.status(201).json(user);
    }
    // Método para exibir todos 
    async show(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersReporsitory);
        const allUsers = await usersRepository.find();
        return response.json(allUsers);
    }
}

export { UserController };
