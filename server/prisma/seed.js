import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('A iniciar o seeding...');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const employeePassword = await bcrypt.hash('driver123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@odisseia.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@odisseia.com',
            password: adminPassword,
            role: 'EMPLOYER',
        },
    });

    const employee = await prisma.user.upsert({
        where: { email: 'driver@odisseia.com' },
        update: {},
        create: {
            name: 'Driver One',
            email: 'driver@odisseia.com',
            password: employeePassword,
            role: 'EMPLOYEE',
        },
    });

    console.log({ admin, employee });
    console.log('Seeding finalizado.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });