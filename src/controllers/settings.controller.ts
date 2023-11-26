export interface Settings {
  env: string;
}

export default class SettingsController {

  public async getSettingList(): Promise<Settings> {

    return Promise.resolve({
      env: process.env.ENV || 'dev',
    });
  }

}