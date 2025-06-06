import { Request, Response } from 'express';
import { candidateService } from '../services/candidateService';

export const candidateController = {
  async createCandidate(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, phone, address, education, workExperience } = req.body;
      const cvUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      const candidate = await candidateService.createCandidate({
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        workExperience,
        cvUrl,
      });
      res.status(201).json(candidate);
    } catch (error) {
      res.status(400).json({ error: 'Error creating candidate', details: error.message });
    }
  },

  async getCandidateById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const candidate = await candidateService.getCandidateById(Number(id));
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.json(candidate);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching candidate', details: error.message });
    }
  },

  async getAllCandidates(req: Request, res: Response) {
    try {
      const candidates = await candidateService.getAllCandidates();
      res.json(candidates);
    } catch (error) {
      res.status(400).json({ error: 'Error fetching candidates', details: error.message });
    }
  },

  async updateCandidate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (req.file) {
        data.cvUrl = `/uploads/${req.file.filename}`;
      }
      const candidate = await candidateService.updateCandidate(Number(id), data);
      res.json(candidate);
    } catch (error) {
      res.status(400).json({ error: 'Error updating candidate', details: error.message });
    }
  },

  async deleteCandidate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await candidateService.deleteCandidate(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Error deleting candidate', details: error.message });
    }
  },
}; 