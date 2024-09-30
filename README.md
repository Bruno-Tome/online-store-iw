# online-store-iw
Online store repo for the group assignment

Online Store built using Next.js, Nest, TailwindUi and Mongo

Figma link with navigation diagram: https://www.figma.com/design/JvARrYxnhTTfzOW1NNE1UQ/Mockups?node-id=102-1175&node-type=canvas&t=PD7toEToxDp5F4Z4-0

# Project Report

## Group Identification
- **Group Name**: [Insert Group Name]
- **Members**: 
  - Felipe Cecato - 12547785
  - Bruno Tomé Rosa - 10276654
  - Gustavo Barbosa Sanchez - 11802440

---

## Requirements
The initial requirements for this online store project were provided in the assignment. However, the following additional requirements were implemented:
1. **User Authentication**: Implemented using NextAuth.js for secure user login and session management.
2. **Cart Functionality**: Ability to add, remove, and update items in the cart, stored locally using `localStorage`.


## Stored data

- User accounts
- Products
- Orders


## Project Description
This project is an e-commerce web application built using **Next.js** and **Tailwind UI**. The application allows users to browse products, add them to a cart, and proceed to checkout. It also includes a backend API to manage products, users, and orders.

### Key Features:
- **Next.js for Server-Side Rendering (SSR)**: Provides fast load times and better SEO by pre-rendering pages on the server.
- **Tailwind CSS for Styling**: Utilized Tailwind UI components for responsive and modern UI design.

---

## Comments About the Code
- **Folder Structure**: The project follows the standard Next.js folder structure. Components are organized in the `/components` folder, while pages are placed inside their respective folder.
- **Code Documentation**: Each function is documented using JSDoc for better readability. For example:
  ```js
  /**
   * Adds a product to the cart.
   * @param {Object} product - The product object.
   */
  const addToCart = (product) => {
    // Implementation here
  };
  ```
- **Reusable Components**: The UI components are built to be reusable across multiple pages (e.g., `ProductCard`, `CartItem`, `Button`).

---

## Test Plan
We will implement both unit and integration tests using **Jest** and **React Testing Library**.

### Unit Tests:
- **Product Component**: Verifies the rendering of product details.
- **Cart Functionality**: Tests add, update, and remove operations.

### Integration Tests:
- **Product Page**: Ensures the correct display of product details and interactions.
- **Checkout Process**: Verifies the payment process from cart to Stripe integration.


---


---

## Build Procedures
### Prerequisites:
1. Install Node.js (version 18.x or higher).
2. Install npm (included with Node.js installation).
3. Install PostgreSQL (optional, if using a database for persistent storage).

### Installation Steps:
1. Clone the repository:
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```bash
 
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Build for production:
```bash
npm run build
```
<!-- 
### Running tests:
1. For unit and integration tests:
   ```bash
   npm run test
   ```
2. For end-to-end tests:
   ```bash
   npm run cypress:open
   ``` -->

---
---

## Comments
The project successfully fulfills the requirements set out for an online store with additional features like user authentication,   and a comprehensive test suite. The use of modern technologies such as Next.js and Tailwind CSS made development efficient, while ensuring a great user experience.