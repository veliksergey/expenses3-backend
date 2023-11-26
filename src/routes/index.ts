import express, {Router} from 'express';
import categoryRouter from './category.router';
import typeRouter from './type.router';
import recordRouter from './record.router';
import commonRouter from './common.router';
import settingsRouter from './settings.router';

const router: Router = express.Router();

router.use('/', settingsRouter);
router.use('/categories', categoryRouter);
router.use('/types', typeRouter);
router.use('/records', recordRouter);
router.use('/common', commonRouter);

export default router;