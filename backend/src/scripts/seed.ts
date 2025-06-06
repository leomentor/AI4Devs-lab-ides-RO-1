import prisma from '../config/database';

async function main() {
  try {
    // Create a test candidate
    const candidate = await prisma.candidate.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        address: '123 Main St',
        education: [
          {
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            institution: 'University of Example',
            year: 2020
          }
        ],
        workExperience: [
          {
            company: 'Tech Corp',
            position: 'Software Developer',
            startDate: '2020-01-01',
            endDate: '2022-12-31',
            description: 'Full-stack development'
          }
        ],
        status: 'NEW'
      }
    });

    console.log('Created test candidate:', candidate);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 