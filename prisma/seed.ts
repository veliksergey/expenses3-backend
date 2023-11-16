import {PrismaClient, Type} from '@prisma/client';

const prisma = new PrismaClient();

interface TypeModel {
  enum: string;
  name: string;
  description?: string;
  tags?: string[];
}

// types
const types: TypeModel[] = [
  {enum: 'in', name: 'Income', tags: ['in']},
  {enum: 'out', name: 'Expense', tags: ['out']},
  {enum: 'loanIn', name: 'Loan Borrowing', description: 'Loan from the bank/person', tags: ['loan in']},
  {enum: 'loanOut', name: 'Loan Payment', description: 'Monthly payment, balloon payment, interest, other expenses related to this loan', tags: ['loan out']},
  {enum: 'investmentIn', name: 'Investment In', description: 'Someone invested in your project', tags: ['inv in']},
  {enum: 'investmentOut', name: 'Investment Out', description: 'You invested in someone\'s project', tags: ['inv out']},
  {enum: 'subscriptionIn', name: 'Subscription In', description: 'Someone is making regular payments to you', tags: ['sub in']},
  {enum: 'subscriptionOut', name: 'Subscription Out', description: 'You are making regular payments', tags: ['sub out ']},
];

async function main() {

  // types
  let typesCount = 0;
  for await (const type of types) {
    await prisma.type.upsert({
      where: {enum: type.enum},
      update: {
        name: type.name,
        description: type.description,
        tags: type.tags,
      },
      create: {
        enum: type.enum,
        name: type.name,
        description: type.description,
        tags: type.tags,
      }
    });
    typesCount++;
  }

  console.info(`-- Created/updated ${typesCount} types`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });