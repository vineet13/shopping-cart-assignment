A shopping cart application built using TypeScript that allows users to add products to a cart, retrieve the cart state, and calculate totals including tax.
  
## Features
* Add products to the cart with a specified quantity.
* Retrieve the cart state including subtotal, tax, and total payable.
* Ensures proper validation (e.g., prevents adding negative quantities and empty product names).
* Fully tested using Jest.

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

* Node.js (Recommended: LTS version)
* npm or yarn

### Clone the Repository
```md
git clone https://github.com/vineet13/shopping-cart-api.git
cd shopping-cart-api
```

### Install Dependencies
```md
npm install
```

## Running the Project

### Start the Price API

The Price API is an HTTP service that returns product price details based on the product name.

```md
npm run serve-products
```
Base URL:
```sh
http://localhost:3001/
```

View Product: GET /products/{product}

List of available products
* cheerios
* cornflakes
* frosties
* shreddies
* weetabix

### Start the Development Server

```md
npm run dev
```

This starts the server in development mode with TypeScript support at http://localhost:3001/.

### Build for Production

```md
npm run build
```

This compiles TypeScript into JavaScript inside the dist/ folder.

### Run the Production Server

```md
npm run start
```

This runs the compiled JavaScript version of the project.

## API Endpoints

### 1️⃣ Add Product to Cart
```md
POST /cart/add
```

#### Request Body:
```md
{
  "productName": "weetabix",
  "quantity": 2
}
```

 #### Response
```sh
{
  "message": "Added 2 of weetabix to the cart at $7.29 each."
}
```

### 2️⃣ View Cart
```sh
GET /cart
```
#### Response:
```sh
{
  "items": [
    { "productName": "weetabix", "quantity": 2, "price": 7.29 }
  ],
  "total" : { subtotal: '14.58', tax: '1.82', total: '16.40' }
}
```

## Running Tests
The project includes unit tests for the shopping cart. Run the tests using:
```sh
npm test
```

The test suite ensures the correctness of the shopping cart implementation by verifying:

* ✅ Adding Products: Confirms products are added to the cart successfully.
* ✅ Cart Calculations: Ensures accurate computation of subtotal, tax, and total.
* ✅ Quantity Updates: If the same product is added multiple times, the quantity updates accordingly.
* ✅ Negative Test Cases:
	*	Ensures an error is thrown if the quantity is less than 0.
  *	Ensures an error is thrown if the product name is empty.
* ✅ Test Coverage: The test results should demonstrate 100% coverage of all critical functionalities.

## Assumptions & Tradeoffs
* Tax Rate: Fixed at 12.5% of the subtotal.
* Price API Dependency: Product prices are fetched dynamically from the Price API. The API must be running for cart operations to work.
* In-Memory Cart Storage: The cart state is maintained in memory with no persistent storage, as per the assignment guidelines.

