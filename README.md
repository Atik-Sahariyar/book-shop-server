# Book Shop Server

The **Book Shop Server** is a backend API built with **Node.js**, **Express** **Typescript**, and **MongoDB**. It manages books (products) and orders while providing features like revenue calculation and comprehensive API endpoints.

---

## Features

- Manage Products:
  - Create, update, delete, and fetch products.
- Manage Orders:
  - Place orders for products.
  - Calculate total revenue from orders.
- Robust error handling.
- Scalable and modular architecture.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for schema modeling)
- **Language**: TypeScript
- **Utilities**: Aggregation Framework, Validation, Error Handling
- **Hosting**: Designed for deployment to environments like cPanel or cloud services.

---

## Installation

### Prerequisites

Ensure the following are installed:

- Node.js (>=14.x)
- MongoDB (local or cloud)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd book-shop-server

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file at the root of the project with the following variables:
   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000

4. Start the development server:

   ```bash
   npm run start:dev

5. To build the project:
   ```bash
   npm run build
   

# API Documentation

## Base URL
The server live link: `https://book-shop-server-wheat.vercel.app`
The server listens at the configured port, e.g., `http://localhost:5000`.

---

## Products API

### 1. Create Product

- **Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "category": "Fiction",
    "price": 20.99,
    "quantity": 100
  }


## API Endpoints

### Products API

1. **Create Product**  
   `POST /api/products`

2. **Get All Products**  
   `GET /api/products`

3. **Get Product by ID**  
   `GET /api/products/:productId`

4. **Update Product**  
   `PUT /api/products/:productId`

5. **Delete Product**  
   `DELETE /api/products/:productId`

---

### Orders API

1. **Create Order**  
   `POST /api/orders`

2. **Calculate Total Revenue**  
   `GET /api/orders/revenue`


## Error Handling

All errors are handled centrally with the `sendErrorResponse` utility function. Responses include meaningful messages, HTTP status codes, and error details for debugging (in development mode).







