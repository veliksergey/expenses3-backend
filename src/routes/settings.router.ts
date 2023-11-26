import express, {Request, Response, Router} from 'express';
import SettingsController, {Settings} from '../controllers/settings.controller';

const settingsRouter: Router = express.Router();
const settingsCtrl: SettingsController = new SettingsController();

settingsRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  const settings: Settings = await settingsCtrl.getSettingList();
  return res.status(200).json(settings);
});

export default settingsRouter;