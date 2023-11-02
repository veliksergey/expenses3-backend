import {PrismaClient, Record} from '@prisma/client';

const recordCtrl = new PrismaClient().record;

export default class RecordController {
	
	public async getList(): Promise<Record[]> {
		const list: Record[] = await recordCtrl.findMany({
			orderBy: {
				id: 'desc',
			}
		});
		return list;
	}
	
	public async getOne(id: number): Promise<Record | null> {
		const record: Record | null = await recordCtrl.findUnique({
			where: {
				id: id,
			}
		});
		return record;
	}
	
}