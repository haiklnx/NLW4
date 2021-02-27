import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveyReporsitory } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersReporsitory } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;
        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
        const userRepository = getCustomRepository(UsersReporsitory);
        const surveryRepository = getCustomRepository(SurveyReporsitory);
        const surveyUserRepository = getCustomRepository(SurveysUsersRepository);
        const user = await userRepository.findOne({ email });
        const survey = await surveryRepository.findOne({ id: survey_id });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL,
        }

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: [{ user_id: user.id }, { value: null }],
            relations: ["user", "survey"]
        })

        if (surveyUserAlreadyExists) {
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        };
        if (!user) return response.status(400).json({ error: "user not exist" });
        if (!survey) return response.status(400).json({ error: "survey not exist" });

        // Salvar as informações na tabela surveyUsers
        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveyUserRepository.save(surveyUser);

        // Enviar e-mail para o usuario
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
    };
}

export { SendMailController };
