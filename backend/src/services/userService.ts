import prisma from '../config/database';
import { User } from '@prisma/client';

export const userService = {
  async createUser(data: { email: string; name?: string }): Promise<User> {
    return prisma.user.create({
      data,
    });
  },

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async updateUser(id: number, data: { email?: string; name?: string }): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  },

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  },
}; 