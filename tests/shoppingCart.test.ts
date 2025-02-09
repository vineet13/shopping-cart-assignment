import { ShoppingCartService } from '../src/services/shoppingCartService';

describe('ShoppingCartService', () => {
  beforeEach(() => {
    ShoppingCartService.clearCart(); // Ensure fresh cart for each test
  });

  /**
   * Test: Adding a product to the cart
   */
  test('should add a product with correct details', async () => {
    const productName = 'cheerios';
    const quantity = 2;
    const price = 8.43; // Mock price

    await ShoppingCartService.addProduct(productName, quantity);
    const cartState = ShoppingCartService.getCartState();

    expect(cartState.items.length).toBe(1);
    expect(cartState.items[0]).toEqual({ productName, quantity, price });
  });

  /**
   * Test: Subtotal calculation is correct
   */
  test('should calculate subtotal correctly', async () => {
    await ShoppingCartService.addProduct('cornflakes', 2); // 2 * $4.99 = $9.98
    const cartState = ShoppingCartService.getCartState();
    const subtotal = 9.98;
    expect(cartState.total.subtotal).toBe(subtotal.toFixed(2));
  });

  /**
   * Test: Tax calculation is correct (12.5% of subtotal)
   */
  test('should calculate tax correctly', async () => {
    await ShoppingCartService.addProduct('frosties', 4); // 4 * $5.99 = $23.96 subtotal
    const cartState = ShoppingCartService.getCartState();
    const tax = 3.0; // 12.5% of $23.96 = $3.00
    expect(cartState.total.tax).toBe(tax.toFixed(2));
  });

  /**
   * Test: Total payable amount is correct (subtotal + tax)
   */
  test('should calculate total correctly', async () => {
    await ShoppingCartService.addProduct('shreddies', 3); // 3 * $6.49 = $19.47 subtotal
    const cartState = ShoppingCartService.getCartState();
    const total = 21.9; // $19.47 subtotal + $2.43 tax (12.5%)

    expect(cartState.total.total).toBe(total.toFixed(2));
  });

  /**
   * Test: Adding multiple products should be tracked correctly
   */
  test('should correctly add multiple products to the cart', async () => {
    await ShoppingCartService.addProduct('frosties', 3);
    await ShoppingCartService.addProduct('weetabix', 2);

    const cartState = ShoppingCartService.getCartState();

    expect(cartState.items.length).toBe(2);
    expect(cartState.items[0]).toEqual({
      productName: 'frosties',
      quantity: 3,
      price: 5.99,
    });
    expect(cartState.items[1]).toEqual({
      productName: 'weetabix',
      quantity: 2,
      price: 7.29,
    });
  });

  /**
   * Edge Case: Adding a product with a negative quantity should fail
   */
  test('should throw an error when adding a product with negative quantity', async () => {
    await expect(
      ShoppingCartService.addProduct('weetabix', -2)
    ).rejects.toThrow('Quantity must be a positive number.');
  });

  /**
   *  Edge Case: Adding a product without a name should fail
   */
  test('should throw an error when product name is missing', async () => {
    await expect(ShoppingCartService.addProduct('', 1)).rejects.toThrow(
      'Product name and quantity are required.'
    );
  });

  /**
   * Edge Case: Adding a product with a non-numeric quantity should fail
   */
  test('should throw an error when quantity is not a number', async () => {
    await expect(
      ShoppingCartService.addProduct('Watermelon', 'three' as any)
    ).rejects.toThrow('Quantity must be a positive number.');
  });

  /**
   * Edge Case: Ensuring the cart remains empty when no items are added
   */
  test('should return an empty cart initially', () => {
    const cartState = ShoppingCartService.getCartState();
    const total = 0;
    expect(cartState.items.length).toBe(0);
    expect(cartState.total.subtotal).toBe(total.toFixed(2));
    expect(cartState.total.tax).toBe(total.toFixed(2));
    expect(cartState.total.total).toBe(total.toFixed(2));
  });
});
