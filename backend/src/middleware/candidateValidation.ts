import { Request, Response, NextFunction } from 'express';

export function validateCandidate(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email } = req.body;
  const errors: string[] = [];

  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
    errors.push('El nombre es obligatorio.');
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
    errors.push('El apellido es obligatorio.');
  }
  if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errors.push('El correo electrónico es obligatorio y debe tener un formato válido.');
  }

  // Opcional: validar teléfono, dirección, educación, experiencia, etc.

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
} 