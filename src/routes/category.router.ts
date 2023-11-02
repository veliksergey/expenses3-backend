import express, {Request, Response} from 'express';
import CategoryController from '../controllers/category.controller';

const categoryRouter = express.Router();
const categoryCtrl = new CategoryController();

categoryRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
	const categoryList = await categoryCtrl.getList();
	return res.status(200).json(categoryList);
});

categoryRouter.get('/:id', async (req, res) => {
	const id: number = +req.params.id || 0;
	const category = await categoryCtrl.getOne(id);
	if (!category) {
		return res.status(404).json({message: 'category not found'});
	}
	return res.status(200).json(category);
});

categoryRouter.post('/', async (req: Request, res: Response) => {
	const category = await categoryCtrl.create(req.body);
	return res.status(200).json(category);
});

export default categoryRouter;