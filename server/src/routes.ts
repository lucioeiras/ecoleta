import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

routes.get('/points', PointsController.index);
routes.get('/points/:id', PointsController.show);
routes.post('/points', PointsController.create);

routes.get('/items', ItemsController.index);

export default routes;