import { Request, Response } from 'express';
import { getCustomRepository, Repository, RepositoryNotTreeError } from "typeorm";
import { SurveyReporsitory } from "../repositories/SurveysRepository";

class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveyRepository = getCustomRepository(SurveyReporsitory);

        const survey = surveyRepository.create({
            title,
            description
        });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveyReporsitory);

        const all = await surveysRepository.find();

        return response.json(all);
    }

}

export { SurveysController };