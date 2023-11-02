import {Category, PrismaClient} from '@prisma/client';

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
			include: {
				types: true,
				records: true,
			},
			where: {
				id: {
					gte: 1,
				}
			},
			orderBy: {
				name: 'asc',
			},
			take: 5,
			skip: 0,
		});
		
		return list;
		
	}
	
	public async getOne(id: number): Promise<Category | null> {
		return categoryCtrl.findUnique({
			where: {
				id,
			},
			include: {
				records: true,
			}
		});
	}
	
	public async create(payload: Category): Promise<Category> {
		const result = await categoryCtrl.create({
			data: payload,
		});
		return result;
	}
	
	public async update(id: number, payload: Category): Promise<Category> {
		const result = await categoryCtrl.update({
			where: {id: id},
			data: payload,
		});
		return result;
	}
	
	public async upsert(id: number, payload: Category): Promise<Category> {
		return categoryCtrl.upsert({
			where: {id},
			update: {name: payload.name, tags: payload.tags},
			create: {name: payload.name, tags: payload.tags},
		});
	}
	
	public async delete(id: number): Promise<Category> {
		return categoryCtrl.delete({
			where: {id}
		});
	}
	
}