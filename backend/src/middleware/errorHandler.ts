import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({ error: 'Database error', details: err.message });
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    return res.status(400).json({ error: 'File upload error', details: err.message });
  }

  // Validation errors
  if (Array.isArray(err.errors)) {
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }

  // Custom errors
  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }

  // Fallback
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message || err });
} 