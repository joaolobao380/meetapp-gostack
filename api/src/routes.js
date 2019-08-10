import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

/* MIDDLEWARES */
import { authMiddleware, authCreateSession } from './app/middlewares/auth';
import { createUser, updateUser } from './app/middlewares/UserMiddlewares';
import { createAppointment } from './app/middlewares/AppointmentMiddlewares';

/* CONTROLLERS */
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationsController from './app/controllers/NotificationsController';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', createUser, UserController.store);
routes.post('/sessions', authCreateSession, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', updateUser, UserController.update);

routes.post('/appointments', createAppointment, AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.destroy);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationsController.index);
routes.put('/notifications/:id', NotificationsController.update);

routes.post('/files', uploads.single('file'), FileController.store);

export default routes;