import express, {Request, Response} from 'express';
import RecordController from '../controllers/record.controller';

const router = express.Router();
const recordCtrl = new RecordController();

router.get('/', async (req: Request, res: Response) => {
	const list = await recordCtrl.getList();
	return res.status(200).json(list);
});

router.get('/:id', async (req, res) => {
	const id: number = +req.params.id || 0;
	const record = await recordCtrl.getOne(id);
	if (!record) {
		return res.status(404).json({message: '404 - Record not found'});
	}
	return res.status(200).json(record);
});

router.post('/', async (req, res) => {
	const createdRecord = await recordCtrl.create(req.body);
	return res.status(200).json(createdRecord);
});

export default router;