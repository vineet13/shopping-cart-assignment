import { NextFunction, Request, Response } from 'express';
import { ShoppingCartService } from '../services/shoppingCartService';

export const shoppingCartController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productName, quantity } = req.body;
      const response = await ShoppingCartService.addProduct(
        productName,
        quantity
      );
      res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  },

  getCart: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(ShoppingCartService.getCartState());
    } catch (error: any) {
      next(error);
    }
  },
};
