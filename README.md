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

- **Root Module:** Main entry point orchestrating the loading of other modules.
- **Angular Material Module:** Configurations related to Angular Material UI components.
- **Core:**
  - **Guard:** Router guards for security purposes.
  - **Service:** Handles data access and business logic.
  - **Model:** Defines data structures used in the application.
- **Auth Module:**
  - **Login Component:** Responsible for user authentication and login interface.
  - **Mfa Component:** Responsible for user Secure authentication with OTP.
- **user-control-module:** Manages user details, carts, products, orders and other related functionalities.
- **Shared Module:**
  - **Components:** Reusable UI components like logout dialog, error dialog, and page-not-found.
  - **Service:** Shared services providing common functionality.
  - **Styles:** Common styles used across components.
- **Assets:**
  - **Images:** Stores images used in the application.
- **Environment:**
  - **environment.ts:** Firebase authentication configuration.

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
