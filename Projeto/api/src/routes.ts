import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserCrontroller';
import { SendMailController } from './controllers/SendMailController';


const router = Router();
const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.get('/users', userController.show);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/sendMail', sendMailController.execute);

export { router };
