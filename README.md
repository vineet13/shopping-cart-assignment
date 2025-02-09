A shopping cart application built using TypeScript that allows users to add products to a cart, retrieve the cart state, and calculate totals including tax.

## Features

- Add products to the cart with a specified quantity.
- Retrieve the cart state including subtotal, tax, and total payable.
- Ensures proper validation (e.g., prevents adding negative quantities and empty product names).
- Fully tested using Jest.

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (Recommended: LTS version)
- npm or yarn

### Clone the Repository

```md
git clone https://github.com/vineet13/shopping-cart-api.git
cd shopping-cart-api
```

### Install Dependencies

```md
npm install or yarn install
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

- cheerios
- cornflakes
- frosties
- shreddies
- weetabix

### Start the Development Server

```md
npm run dev
```

This starts the server in development mode with TypeScript support.

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

- ### Add Product to Cart

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

- ### View Cart

```sh
GET /cart
```

#### Response:

```sh
{
  "items": [
    { "productName": "weetabix", "quantity": 2, "price": 7.29 }
  ],
  "total": 14.58
}
```

## Running Tests

The project includes unit tests for the shopping cart. Run the tests using:

```sh
npm test
```

## Error Handling

The application includes robust error handling for:

- Invalid product names (Products not in the Price API)
- Negative or zero quantities
- Network errors while fetching product prices
