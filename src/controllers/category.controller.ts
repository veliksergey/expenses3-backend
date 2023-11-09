import {Category, PrismaClient, Prisma} from "@prisma/client";

const categoryCtrl = new PrismaClient().category;

export default class CategoryController {

  public async getList(): Promise<Category[]> {

    const list: Category[] = await categoryCtrl.findMany({
      /*select: {
          id: true,
          name: true,
          tags: true,
          records: {
              select: {
                  id: true,
                  name: true,
              }
          },
          types: {
              select: {
                  typeId: true,
              }
          }
      },*/
      // include: {
      // 	types: true,
      // 	records: true,
      // },
      // where: {
      // 	id: {
      // 		gte: 1,
      // 	}
      // },
      orderBy: {
        id: "desc",
      },
      // take: 5,
      // skip: 0,
    });

    return list;

  }

  public async getOne(id: number): Promise<Category | null> {
    return categoryCtrl.findUnique({
      where: {
        id,
      },
      // include: {
      // 	records: true,
      // }
    });
  }

  public async create(payload: Category): Promise<Category | { message: string }> {
    try {
      const result = await categoryCtrl.create({
        data: payload,
      });
      return result;
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {message: "Category with this name already exists in database"};
        }
      }
      return {message: "unknown error happened"};
    }
  }

  public async update(id: number, payload: Category): Promise<Category | {message: string}> {
    try {
        const result = await categoryCtrl.update({
            where: {id: id},
            data: payload,
        });
        return result;
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {message: "Category with this name already exists in database"};
        }
      }
      return {message: "unknown error happened"};
    }
  }

  public async upsert(id: number, payload: Category): Promise<Category | {message: string}> {
    try {
      return categoryCtrl.upsert({
        where: {id},
        update: {name: payload.name, tags: payload.tags},
        create: {name: payload.name, tags: payload.tags},
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {message: "Category with this name already exists in database"};
        }
      }
      return {message: "unknown error happened"};
    }
  }

  public async delete(id: number): Promise<boolean | {message: string}> {
    try {
      await categoryCtrl.delete({
        where: {id}
      });
      return true;
    } catch (e) {
      console.error(e);
      return {message: 'Error: Could not delete category'};
    }
  }

}