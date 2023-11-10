import express, {Router} from 'express';
import CommonController, {CommonModelName} from '../controllers/common.controller';

const commonRouter: Router = express.Router();
// const commonCtrl = new CommonController()

commonRouter.get('/:model', async (req, res) => {
  const ctrl = new CommonController(req.params.model as CommonModelName);
  const list = await ctrl.getList();
  return res.status(200).json(list);
});

commonRouter.get('/:model/:id', async (req, res) => {
  const id: number = +req.params.id || 0;
  const modelName: CommonModelName = req.params.model as CommonModelName;
  const ctrl = new CommonController(modelName);
  const one = await ctrl.getOne(id);
  if (!one) {
    return res.status(404).json({message: `${modelName} not found`});
  }
  return res.status(200).json(one);
});

commonRouter.post('/:model', async (req, res) => {
  const ctrl = new CommonController(req.params.model as CommonModelName);
  const created = await ctrl.create(req.body);
  return res.status(200).json(created);
});

commonRouter.put('/:model/:id', async (req, res) => {
  const ctrl = new CommonController(req.params.model as CommonModelName);
  const id: number = +req.params.id || 0;

  if (!id) {
    return res.status(400).json({message: 'No id was provided'});
  }

  const updated = await ctrl.update(id, req.body);
  return res.status(200).json(updated);
});

commonRouter.delete('/:model', async (req, res) => {
  const ctrl = new CommonController(req.params.model as CommonModelName);
  const id = req.body.id || 0;

  if (!id) {
    return res.status(400).json({message: "No id was provided"});
  }

  const deleted = await ctrl.delete(id);
  return res.status(200).json({deleted});
});


export default commonRouter;