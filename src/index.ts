import express, { Application, NextFunction, Request, Response } from 'express';
import router from './routes/shoppingCartRoutes';
import { ShoppingCartService } from './services/shoppingCartService';

const app: Application = express();

const PORT = process.env.PORT || 3002;

// body-parser middleware to parse request bodies
app.use(express.json());
app.use('/cart', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

(async function () {
  await ShoppingCartService.addProduct('cornflakes', 1);
  await ShoppingCartService.addProduct('cheerios', 2);
  await ShoppingCartService.addProduct('cornflakes', 3);
  const cartState = await ShoppingCartService.getCartState();
  console.log(cartState);
})();
