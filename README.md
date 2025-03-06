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

#### ✅ User Management

- Users can register with a valid email, phone number, and password.
- Each user belongs to a **Holder (Company/Organization)**.
- Only **one admin per Holder** is allowed.
- Users can be either **Admin** or **Regular Users**.

#### ✅ Restaurant & Menu Management

- Admins (Holders) can create **restaurants**.
- Restaurants have **menus** with food items, prices, and optional images.
- Each menu item can have customizable options.

#### ✅ Group Ordering System

- Users can create **Groups** to place collective food orders.
- Each group is associated with a **restaurant** and a **creator** (holder/user).
- Groups have different statuses:
  - `1 = Running`, `2 = Pending`, `3 = Completed`, `4 = Cancelled`
- Groups have a **start date, duration, and end date**.
- Users can **join groups** as **group members**.

#### ✅ Order & Payment Processing

- Users can place **orders** under a group.
- Orders can have:
  - **Delivery location (latitude/longitude)**
- **Order status**
  - `Running, Pending, Arrived, Completed, Cancelled`
- Payment methods:
  - `InstaPay, Cash`
- Payments have statuses:
  - `Pending, Completed, Failed`

#### ✅ Notifications & Triggers

- Users receive **notifications (Email/SMS)** for order status.
- Triggers enforce:
  - **One admin per company**
  - **Valid Egyptian phone numbers**

#### ✅ Security & Integrity

- **UUIDs for primary keys** instead of auto-increment IDs.
- **Foreign keys with cascade/delete rules** to maintain referential integrity.
- **Validation on phone numbers and admin roles.**

---

# **2️⃣ Workflow**

### **1️⃣ User Registration & Authentication**

1. A user **registers** with email, password, phone number, and holder.
2. The system **validates phone numbers** (if role is `user`).
3. If an **admin is created**, it checks if another admin exists for the same holder.
4. The user can **log in** after successful registration.

---

### **2️⃣ Restaurant & Menu Management**

1. An admin (holder) **creates a restaurant**.
2. The restaurant can have a **menu** with items and images.
3. Users can browse restaurants and menus.

---

### **3️⃣ Group Ordering Process**

1. A user creates a **group** linked to a restaurant.
2. The group has a **start date and duration**.
3. Other users **join the group** to place orders.
4. Orders are placed.

---

### **4️⃣ Order Processing & Delivery**

1. Users submit orders within an active group.
2. Orders can have:
   - Delivery location (latitude/longitude)
   - Payment method (InstaPay, Cash)
   - Status (`Running`, `Pending`, `Completed`, etc.)
3. Notifications (SMS/Email) are sent on status updates.

---

### **5️⃣ Payment & Completion**

1. Users make payments.
2. Payments are validated (`Pending, Completed, Failed`).
3. Once the payment is confirmed, the order is finalized.
4. The group can be **closed** after the last order is completed.

---

### **6️⃣ Admin & System Rules**

- Admins manage restaurants and approve groups/orders.
- Orders and groups **auto-close** based on duration.
- Deleted users have their data **set to NULL or cascaded** to prevent orphan records.

---

###
