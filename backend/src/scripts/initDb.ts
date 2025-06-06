import prisma from '../config/database';

async function main() {
  try {
    // Create initial user if needed
    const user = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
      },
    });

    console.log('Database initialized successfully');
    console.log('Created user:', user);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 