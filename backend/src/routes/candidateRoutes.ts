import { Router } from 'express';
import { candidateController } from '../controllers/candidateController';
import { upload } from '../config/upload';
import { validateCandidate } from '../middleware/candidateValidation';

const router = Router();

router.post('/candidates', upload.single('cv'), validateCandidate, candidateController.createCandidate);
router.get('/candidates', candidateController.getAllCandidates);
router.get('/candidates/:id', candidateController.getCandidateById);
router.put('/candidates/:id', upload.single('cv'), validateCandidate, candidateController.updateCandidate);
router.delete('/candidates/:id', candidateController.deleteCandidate);

export default router; 