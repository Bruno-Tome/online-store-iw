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
## Pages to Be Done

<s>1. **Home Page**  
   - Displays featured products and promotional content</s>

  <s>2. **Product Listing Page**   - Shows all available products with filters for category, price, and availability</s>.

  <s>3. **Product Detail Page**   - Provides detailed information about a single product, including images, description, and reviews</s>.

  <s>4. **Cart Page**   - Shows items added to the cart with options to update quantities or remove items</s>.


<s>5. **Checkout Page**  
   - Collects user information and payment details to complete the order.</s>

<s>6. **Order Confirmation Page**  
   - Displays a confirmation message after a successful order, along with order details.</s>

<s>7. **User Login Page**  
   - Allows users to log into their accounts.</s>

<s?>8. **User Profile Page**  
   - Shows user account details and past orders.</s>

<s>9. **Order History Page**  
    - Lists previous orders with details such as order date, total, and status.</s>

<s>10. **Error Page (404)**  
    - Displays a message when a page is not found.</s>

### Admin Pages


11. **Product Management Page**  
    - Allows admin to view, add, edit, or delete products in the store.

12. **Order Management Page**  
    - Lists all orders with details, statuses, and options to update order status or handle returns.

13. **User Management Page**  
    - Provides a list of registered users with options to view details, edit information, or delete accounts.


## Comments
The project successfully fulfills the requirements set out for an online store with additional features like user authentication,   and a comprehensive test suite. The use of modern technologies such as Next.js and Tailwind CSS made development efficient, while ensuring a great user experience.