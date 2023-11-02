import express, {Request, Response} from 'express';
import TypeController from '../controllers/type.controller';

const typeRouter = express.Router();
const typeCtrl = new TypeController();

typeRouter.get('/', async (req: Request, res: Response) => {
	const list = await typeCtrl.getList();
	return res.status(200).json(list);
});

typeRouter.get('/:id', async (req, res) => {
	const id: number = +req.params.id || 0;
	const type = await typeCtrl.getOne(id);
	if (!type) {
		return res.status(404).json({message: 'type not found'});
	}
	return res.status(200).json(type);
});

export default typeRouter;