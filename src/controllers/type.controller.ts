import {PrismaClient, Type} from '@prisma/client';

const ctrl = new PrismaClient().type;

export default class TypeController {
	
	public async getList(): Promise<Type[]> {
		const list = await ctrl.findMany({
			orderBy: {
				name: 'asc',
			}
		});
		return list;
	}
	
	public async getOne(id: number): Promise<Type | null> {
		const type: Type | null = await ctrl.findUnique({
			where: {
				id: id,
			}
		});
		return type;
	}
	
}