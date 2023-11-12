import {Prisma, PrismaClient, Record} from '@prisma/client';
const recordCtrl = new PrismaClient().record;

export default class RecordController {
	
	public async getList(): Promise<Record[]> {
		const list: object[] = await recordCtrl.findMany({
			select: {
				id: true,
				name: true,
				amountActual: true,
				startDateActual: true,
				finishDateActual: true,

				type: {select: {id: true, name: true}},
				category: {select: {id: true, name: true}},
				account: {select: {id: true, name: true}},
				vendor: {select: {id: true, name: true}},
				user: {select: {id: true, name: true}},
				status: {select: {id: true, name: true}},

				conditions: true, // ToDo: select

				// parent: {
				// 	select: {
				// 		id: true,
				// 		name: true,
				// 		parentId: true,
				// 		childrenCount: true,
				// 	}
				// },
				children: {
					select: {
						id: true,
						name: true,
						childrenCount: true,
					}
				},
				childrenCount: true,

			},
			orderBy: [
				{finishDateActual: 'desc'},
				{id: 'desc'},
			]
		});
		return list as Record[];
	}
	
	public async getOne(id: number): Promise<Record | null> {
		const record: Record | null = await recordCtrl.findUnique({
			where: {
				id: id,
			}
		});
		return record;
	}

	public async create(payload: Record): Promise<Record | {message: string}> {
		try {

			// ToDo: validation

			const createdRecord  = await recordCtrl.create({
				data: payload,
			});

			return createdRecord;

		} catch (e) {
			console.error(e);
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				return {message: e.code};
			}
			return {message: 'Unknown error happened'};
		}
	}
	
}