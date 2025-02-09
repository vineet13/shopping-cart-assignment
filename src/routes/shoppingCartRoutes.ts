import express, { Router } from 'express';
import { shoppingCartController } from '../controllers/shoppingCartController';

const router: Router = express.Router();

router.get('/', shoppingCartController.getCart);
router.post('/add', shoppingCartController.addProduct);

export default router;
