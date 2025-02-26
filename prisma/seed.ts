import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    } else if (account.role === 'AUDITOR') {
      role = 'AUDITOR' as Role;
    } else if (account.role === 'ANALYST') {
      role = 'ANALYST' as Role;
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  config.defaultScenarios.forEach(async (scenario) => {
    console.log('  Creating base stress test scenarios');
    await prisma.stressScenario.upsert({
      where: { id: scenario.id },
      update: {},
      create: {
        title: scenario.title,
        description: scenario.description,
        excelWorkbookUrl: scenario.excelWorkbookUrl,
      },
    });
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
