import prisma from '../config/database';

export const candidateService = {
  async createCandidate(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    education?: any[];
    workExperience?: any[];
    cvUrl?: string;
  }) {
    return prisma.candidate.create({
      data: {
        ...data,
        education: data.education || [],
        workExperience: data.workExperience || [],
      },
    });
  },

  async getCandidateById(id: number) {
    return prisma.candidate.findUnique({
      where: { id },
    });
  },

  async getAllCandidates() {
    return prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async updateCandidate(id: number, data: any) {
    return prisma.candidate.update({
      where: { id },
      data,
    });
  },

  async deleteCandidate(id: number) {
    return prisma.candidate.delete({
      where: { id },
    });
  },

  async updateCandidateStatus(id: number, status: string) {
    return prisma.candidate.update({
      where: { id },
      data: { status },
    });
  },
}; 