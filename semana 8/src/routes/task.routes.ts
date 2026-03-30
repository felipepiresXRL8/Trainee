import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();

router.get('/', TaskController.list);
router.get('/:id', TaskController.show);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;