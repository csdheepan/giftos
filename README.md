# Angular 16 Firebase ShopEasy E-Commerce Web Application

## Project Overview:
This e-commerce web application is designed to provide a seamless shopping experience for users. The application allows users to browse through a variety of products, add items to their cart, and place orders. The main focus of the project is on the frontend, leveraging Angular for building a dynamic and responsive user interface. Firebase is used for backend services, including authentication, database management, and hosting.

The application features a comprehensive user management system, including user registration, login, and two-step verification for enhanced security. The product catalog is dynamically populated, allowing users to search and filter products efficiently. The cart management system enables users to add, update, or remove items from their cart before proceeding to place an order.

While the current implementation does not include payment integration, it provides a solid foundation that can be extended with additional features such as payment processing, order tracking, and user reviews.

## Tech Stack:
- Frontend: Angular 16
- Backend: Google Firebase (Firestore Database)
- Hosting : Google Firebase

## Features:
- User Registration and Login: Create an account, log in, and log out.
- Two-Step Verification: Enhanced security for user accounts.
- Product Catalog: Browse and search for products.
- Cart Management: Add, update, and remove items from the cart.
- Order Processing: Place and view orders.

## Usuage:
- User Registration and Login: Register a new account or log in with existing credentials.
- Two-Step Verification: Follow the prompts to set up two-step verification.
- Product Catalog: Browse through the list of available products.
- Cart Management: Add desired products to your cart and manage quantities.
- Order Processing: Review your cart and place an order.

## Project Structure:
The project is structured with the following modules:

- Root Module : This is the main module of the Angular application, serving as the entry point and orchestrating the loading of other modules.

- Angular Material Module : This module likely contains imports and configurations related to Angular Material, a UI component library for Angular applications.

- cart-products: This component handles the display of products in the user's cart and the orders they have placed. It includes logic and services to manage the cart and order data.

- full: This component implements a side menu bar for navigation. It acts as a parent for various child routes, enabling easy navigation between different parts of the application.

- giftos: This is the landing page component of the application. It serves as the first point of interaction for users, showcasing featured products and special offers.

- guard: This module includes security features, specifically using Angular's CanActivate guard to protect routes that require authentication.

- login: This component handles user login functionality. It includes forms and services for user authentication.

- mfa: This component implements two-step verification for enhanced security. It manages the setup and verification processes for multi-factor authentication.

 - modal: This module contains modal components used across the application. Modals are used for dialogs, alerts, and other pop-up interactions.

- model: This module defines the data models and interfaces used throughout the application. These models ensure consistent data structures.

- order-placed: This component provides the order confirmation message. It displays a confirmation message and order details once a user places an order.

- page-not-found: This component includes the 404 error page. It is displayed when a user navigates to a non-existent route.

- product: This component handles the display of all products. It includes logic for listing products, displaying product details, and filtering/searching products.

- services: This module contains service files that manage business logic and data interactions. Services handle API calls and data processing.

- shared: This module contains shared components, directives, and pipes that are used across the application. It promotes code reuse and consistency.

- user-order: This component allows users to view the orders they have placed. It includes logic for displaying order history and details.

- user-details: This component manages user details and profiles. It includes logic and services for displaying and updating user information.

- assets
  --Images :  Stores all images used in the application.

- environment
  --environment.ts- It contains Firebase authentication details

## Setup and Installation:
1. Clone the repository using the command 👉🏻 git clone https://github.com/csdheepan/giftos.git

2. Verify Node.js and npm installation using the command node -v , npm -v :
- Node version: v18.19.0
- Npm version: 10.2.3
3. Navigate to the project directory.
4. Run `npm install` command to install the dependencies.
5. Run the application using `ng serve`.
6. The application is now running successfully on localhost. Please check your browser.

## Hosted Website:
The application is hosted on Google Firebase.

Link: [https://giftos-2bff5.web.app/](https://giftos-2bff5.web.app/)

## Functionality:
- **User Registration and Login:** Users can create accounts and log in.
- **Product Listings:** Users can view a list of products available for purchase, including details such as price, description, and images.
- **Shopping Cart:** Users can add products to a shopping cart and proceed to checkout to complete their purchase.
- **Order Management:**Users can view their order history, track the status of their orders, and manage returns or exchanges.
- **Responsive Design:** The application is fully responsive for a seamless user experience.
<!-- - **Preview the diagram for better understanding:** ![Application Functionality Diagram](src/assets/images/application-diagram.jpg) -->

## Future Improvements:
- **Payment Integration:** Allow users to send money through application.
- Additional features and enhancements for an enriched user experience.

## Database:
The application utilizes Google Firestore Database for efficient data storage and retrieval.

<!-- ## Database Design:
![firestore database design diagram](src/assets/images/database-design.jpg) -->


## Contact Information:
For any questions or further information, feel free to contact:

- **Name:** Dheepan S
- **Email:** csdheepan18@gmail.com
- **Website:** [dheepanportfolio.in](https://dheepanportfolio.in)
