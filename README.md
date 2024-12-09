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

## API Documentation

The backend API is built using **Nest.js** and provides endpoints to manage products, users, and orders. To access the swagger documentation, run the backend server and navigate to `http://localhost:3000/api`.

---
## HTTP Client

The HTTP client used in this project is the Rest HTTP Client extension for Visual Studio Code. This extension allows us to send HTTP requests directly from the editor, making it easier to test the backend API endpoints and share the requests with the team.

### Installation:
1. Install the **Rest HTTP Client** extension from the Visual Studio Code Marketplace.
2. Open the file with the `.http` extension (e.g., `client.http`).
3. Click on the **Send Request** button next to the request you want to execute.
4. View the response in the editor or the output panel.

---

## Build Procedures
### Prerequisites:
1. Install Node.js (version 18.x or higher).
2. Install npm (included with Node.js installation).

### Running the Docker Compose Environment

This guide provides instructions to run the Docker Compose environment, which includes the **backend**, **front-end**, and **MongoDB** services.

---

### Prerequisites
1. **Install Docker**  
   Ensure Docker and Docker Compose are installed on your system:
   - [Docker Installation Guide](https://docs.docker.com/get-docker/)
   - [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)



### Steps to Run the Environment

#### 1. **Start All Services**
To run all services together:
```bash
docker-compose up --build
```

- The `--build` flag ensures the Docker images are rebuilt with the latest code changes.
- Services included:
  - **Backend**: Exposed at `http://localhost:3000`
  - **Front-end**: Exposed at `http://localhost:4000`
  - **MongoDB**: Exposed at `mongodb://localhost:27017`

#### 2. **Run Individual Services**

If you want to run a specific service, use the `docker-compose up` command with the service name.

##### a. **Run the Backend**
```bash
docker-compose up --build backend
```
- Exposed at: `http://localhost:3000`
- Automatically connects to the MongoDB instance.

##### b. **Run the Front-end**
```bash
docker-compose up --build front-end
```
- Exposed at: `http://localhost:4000`

##### c. **Run MongoDB**
```bash
docker-compose up mongo
```
- Accessible at: `mongodb://localhost:27017`

#### 3. **Stop Services**
To stop the environment, press `Ctrl+C` in the terminal running `docker-compose up`. Alternatively, you can stop all services with:
```bash
docker-compose down
```
This will remove containers but retain volumes (like database data).

---

### Notes

1. **Persistent MongoDB Data**  
   Data stored in MongoDB is persisted in the `mongo-data` volume. If you want to remove this data, run:
   ```bash
   docker volume rm project-root_mongo-data
   ```

2. **Hot Reloading for Development**  
   The backend and front-end services are configured to watch for code changes in their respective directories. Edit your code locally, and the changes will be reflected in the running containers.

3. **Custom Network**  
   All services are connected to the `app-network` to facilitate inter-service communication. The backend can access MongoDB via `mongodb://mongo:27017`.

4. **Environment Variables**  
   You can configure additional environment variables in the `environment` section of the `docker-compose.yml` file or using an `.env` file.

---

## Running the Frontend Locally
1. ** CD into the frontend folder
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Access the application**:
6. **Open your browser** and navigate to `http://localhost:4000` to view the application. (note: the port may vary depending on your configuration, if running directly on your machine, the port will be 5000)

## Running the Backend Locally
1. ** CD into the backend folder
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
4. **Start the development server**:
   ```bash
   npm run start:dev
   ```
5. **Access the application**:
6. **Open your client** :
   Navigate to `http://localhost:3000` to view the application.

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

## To Do
### Context Store => 
Important: Update the context use the useReducer hook to fix context providers
- [x] Create Provider Wrappers
- [x] Create Provider for Cart
  - [x] Create a context to store the cart state
- [x] Create Provider for Products
  - [x] Create a context for the product data (List of products, current product)
- [x] Create Provider for Orders
  - [x] Create a context for the order data (List of orders, current order) 
  - [ ] Create a context for the current order being done
- [ ] Create Provider for Auth
  - [ ] Create a context to store the user data
  - [ ] Create a context for the login status
  - [ ] Use Auth provider to wrap the app and routes that require authentication

### API interface
- [ ] integrate api client with context update calls 

### Components and integration

- [ ] Componentize the app
  - [ ] Store
      - [ ] Create a component for the Navbar
      - [ ] Create a component for the Product Card
        - [ ] Fetch products from the API
      - [ ] Create a component for the Cart Item
        - [ ] Fetch cart items from the context
    - [ ] Profile
      - [ ] Create a component for the Profile Page and Update
        - [ ] Fetch user data from the context and update with API
  - [ ] Admin 
    - [ ] Create shareable components for the Admin pages
    - [ ] Componentize Orders
      - [ ] Fetch orders from the API
      - [ ] Update order with PopUp
    - [ ] Componentize Users
      - [ ] Fetch users from the API
      - [ ] Update user with PopUp
    - [ ] Componentize Products
      - [ ] Fetch products from the API
      - [ ] Update user with PopUp


## Comments
The project successfully fulfills the requirements set out for an online store with additional features like user authentication,   and a comprehensive test suite. The use of modern technologies such as Next.js and Tailwind CSS made development efficient, while ensuring a great user experience.