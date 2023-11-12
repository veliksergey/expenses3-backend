import {PrismaClient, Prisma} from "@prisma/client";
const categoryCtrl = new PrismaClient().category;
const typeCtrl = new PrismaClient().type;
const accountCtrl = new PrismaClient().account;
const vendorCtrl = new PrismaClient().vendor;
const statusCtrl = new PrismaClient().status;
const conditionCtrl = new PrismaClient().condition;
const userCtrl = new PrismaClient().user;
const projectCtrl = new PrismaClient().project;

export enum CommonModelName {
  category = 'category',
  categories = 'category',
  type = 'type',
  types = 'type',
  account = 'account',
  accounts = 'account',
  vendor = 'vendor',
  vendors = 'vendor',
  status = 'status',
  statuses = 'status',
  condition = 'condition',
  conditions = 'condition',
  user = 'user',
  users = 'user',
  project = 'project',
  projects = 'project',
}
const ctrlList = {
  category: categoryCtrl,
  categories: categoryCtrl,
  type: typeCtrl,
  types: typeCtrl,
  account: accountCtrl,
  accounts: accountCtrl,
  vendor: vendorCtrl,
  vendors: vendorCtrl,
  status: statusCtrl,
  statuses: statusCtrl,
  condition: conditionCtrl,
  conditions: conditionCtrl,
  user: userCtrl,
  users: userCtrl,
  project: projectCtrl,
  projects: projectCtrl,
};

export default class CommonController {
  ctrl: any;

  constructor(modelName: CommonModelName) {
    this.ctrl = ctrlList[modelName];
  }

  public async getList(): Promise<any[]> {
    const list = await this.ctrl.findMany({
      orderBy: {
        id: 'desc',
      }
    });
    return list;
  }

  public async getOne(id: number): Promise<any | null> {
    return this.ctrl.findUnique({
      where: {id,}
    });
  }

  public async create(payload: any): Promise<any> {
    // ToDo: check name duplications
    try {
      return this.ctrl.create({data: payload});
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {message: e.code};
      }
      return {message: "unknown error happened",};
    }
  }

  public async update(id: number, payload: any): Promise<any> {
    // ToDo: check name duplications
    try {
      return this.ctrl.update({
        where: {id},
        data: payload,
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return {message: e.code};
      }
      return {message: "unknown error happened",};
    }
  }

  public async delete(id: number): Promise<any> {
    try {
      await this.ctrl.delete({
        where: {id}
      });
      return true;
    } catch (e) {
      console.error(e);
      return {message: 'Error: Could not delete'};
    }
  }

}