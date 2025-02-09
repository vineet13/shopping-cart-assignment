import axios from 'axios';
import { CartItem } from '../models/shoppingCart';
import * as AppConstants from '../constants';

interface Product {
  id: string;
  title: string;
  price: number;
}

export const ShoppingCartService = (() => {
  let cart: CartItem[] = [];

  const getProductPrice = async (productName: string): Promise<number> => {
    try {
      const response = await axios.get<Product>(
        `${AppConstants.PRICE_API_URL}/products/${encodeURIComponent(productName)}`
      );
      return response.data?.price;
    } catch (error) {
      throw new Error(`Failed to retrieve price for ${productName}`);
    }
  };

  const addProduct = async (productName: string, quantity: number) => {
    try {
      // Validate productName and quantity should be present
      if (!productName || !quantity) {
        const error: any = new Error('Product name and quantity are required.');
        error.status = 400;
        throw error;
      }
      // Validate quantity is a number and greater than 0
      else if (typeof quantity !== 'number' || quantity <= 0) {
        const error: any = new Error('Quantity must be a positive number.');
        error.status = 400;
        throw error;
      }
      const price = await getProductPrice(productName);
      const existingProduct = cart.find(
        (item) => item.productName === productName
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({ productName, quantity, price });
      }
      return {
        message: `Added ${quantity} of ${productName} to the cart at $${price} each.`,
      };
    } catch (error: any) {
      throw error;
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * AppConstants.TAX_RATE;
    const total = subtotal + tax;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const getCartState = () => ({
    items: [...cart], // Return a copy to prevent modification
    total: calculateTotal(),
  });

  const clearCart = () => {
    cart = [];
  };

  return {
    addProduct,
    getCartState,
    clearCart,
  };
})();
