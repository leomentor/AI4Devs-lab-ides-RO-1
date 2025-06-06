import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const { email, name } = req.body;
      const user = await userService.createUser({ email, name });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error creating user' });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching user' });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, name } = req.body;
      const user = await userService.updateUser(Number(id), { email, name });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error updating user' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userService.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Error deleting user' });
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching users' });
    }
  },
}; 