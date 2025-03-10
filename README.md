> **Note** : This project is **still under development**. Some features, such as payment integration and hosting, are coming soon. We appreciate your patience!

---

# 🍽️ Group Food Ordering

## 📌 Project Overview

**Group Food Ordering** is an innovative platform designed to simplify the process of ordering food for groups. Whether it's for a family gathering, office lunch, or social event, this system allows users to place orders together in a collaborative, efficient, and automated way. It streamlines decision-making and payments, making group food ordering easier than ever before.

---

## 🛠️ Technologies Used

| **Category**        | **Technology Stack**     |
| ------------------- | ------------------------ |
| **Backend**         | Node.js, NestJS, Express |
| **Language**        | Typescript               |
| **Database**        | MySQL                    |
| **ORM**             | TypeORM                  |
| **Security**        | bcrypt, JWT              |
| **Payment**         | InstaPay, Cash           |
| **Hosting**         | Vercel                   |
| **Version Control** | Git, GitHub              |

---

# 📌 System Requirements & Workflow

## **1️⃣ System Requirements**

### **Functional Requirements**

#### 1. **User Management**

- **Sign-Up/Registration**: Users should be able to sign up by providing their name, email, phone number, and password.
- **Login**: Users can log in with their username and password. Admin users (with the `super` role) should have additional privileges for managing restaurants and users.
- **Role Management**: Users can have different roles:
  - **User**: Regular customers who can join groups, view menus, and place orders.
  - **Super User (Admin)**: Admin users who can manage restaurants, menus, and user groups.

#### 2. **Restaurant Management**

- **Create Restaurant**: Admins can create new restaurants with details like name, phone number, image URL, and associated restaurant users.
- **Manage Menus**: Admins can create and manage menus, including adding, updating, or removing menu items.
- **Menu Items**: Each menu item should include details like name, price, optional customizations (e.g., size or flavor), and image URLs.

#### 3. **Group Management**

- **Create Group**: Users can create a group associated with a specific restaurant. The group’s status is set to `running` by default, but can also be `pending`, `completed`, or `cancelled`.
- **Join Group**: Users can join an existing group created by others.

#### 4. **Order Management**

- **Place Orders**: Group members can place individual orders by selecting items from the restaurant's menu. Items can be customized (e.g., size or additional options).
- **Order Status**: Orders are tracked with various statuses such as `pending`, `confirmed`, `arrived`, or `cancelled`.
- **Order Modifications**: Users can update or cancel their orders within a specified time frame. Canceled orders can include a message indicating why the order was canceled.

#### 5. **Menu Customization**

- **Menu Item Customization**: Menu items may have configurable options such as size, toppings, or other customizations.

### Non-Functional Requirements

#### 1. **Performance**

- The system should support multiple concurrent users (restaurant owners, customers, and admin users).

#### 2. **Security**

- **Password Storage**: User passwords should be securely hashed and stored in the database.
- **Role-Based Access Control**: Admin users should have privileges to manage restaurants, menus, and users, while regular users only have access to their groups and orders.
- **Data Validation**: All inputs should be validated for correctness (e.g., valid email format, phone number, etc.) and security (e.g., prevent SQL injection).

#### 3. **Scalability**

- The system should be able to scale horizontally to accommodate more restaurants, users, and orders as the platform grows.
- Database design should be optimized for handling large volumes of data.

#### 4. **Availability**

- The system should ensure high availability and minimal downtime, especially during peak usage hours (e.g., lunch and dinner times).

### Technical Requirements

#### 1. **Backend**

- The backend should be developed using Typescript, Node.js, NestJS, and Express for a scalable, modular, and maintainable architecture.
- RESTful APIs should be provided for communication between the frontend and backend.

#### 2. **Frontend**

- The frontend should be built using modern web technologies React and React Native for a dynamic and responsive user interface.
- The frontend should communicate with the backend via API endpoints to fetch and display real-time data.

#### 3. **Database**

- The database should use MySQL, with the ORM TypeORM to interact with the database seamlessly.

#### 4. **Hosting**

- The system should be hosted on Vercel for easy deployment and scalability.

#### 5. **Testing**

- The system should include unit tests, integration tests, and end-to-end tests to ensure stability and quality.
