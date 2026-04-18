# 🌱 Urban Farming Backend

Backend API for an **Interactive Urban Farming Platform** built with **Express.js**, **Prisma**, and **PostgreSQL**.

This project supports user authentication, vendor management, certification submission, product listing, rental space listing, order management, community posts, rate limiting, pagination, and API documentation. It is designed for an urban farming ecosystem with roles such as **Admin**, **Vendor**, and **Customer**.

---

## 🚀 Features

* User registration and login
* Role-based access control
* Vendor profile management
* Sustainability certification submission
* Product management
* Rental space management
* Order management
* Community post management
* Rate limiting for authentication routes
* Pagination for products and orders
* Swagger API documentation
* Prisma seed script

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Prisma
* **Database:** PostgreSQL
* **Authentication:** JWT
* **Password Hashing:** bcrypt
* **Documentation:** Swagger
* **Rate Limiting:** express-rate-limit

---

## 📁 Project Structure

```text
urban-farming/
├─ server/
│  ├─ prisma/
│  │  ├─ migrations/
│  │  ├─ schema.prisma
│  │  └─ seed.js
│  ├─ src/
│  │  ├─ config/
│  │  ├─ generated/
│  │  ├─ middlewares/
│  │  ├─ modules/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  └─ app.js
│  ├─ .env
│  ├─ package.json
│  ├─ prisma.config.ts
│  └─ server.js
├─ docs/
├─ .gitignore
└─ README.md
```

---

## 👥 User Roles

### 🔑 Admin

* Manages users
* Manages vendors
* Validates certifications
* Monitors platform activity

### 🧑‍🌾 Vendor

* Creates vendor profile
* Submits certification
* Adds products
* Adds rental spaces
* Views vendor orders

### 🛒 Customer

* Registers and logs in
* Views products
* Places orders
* Views own orders
* Creates community posts

---

## 📦 Main Modules

* Auth
* Vendor Profile
* Certification
* Product
* Rental Space
* Order
* Community Post

---

## 📡 API Response Format

### ✅ Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### 📄 Paginated Response

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  },
  "data": []
}
```

### ❌ Error Response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd urban-farming
```

### 2. Navigate to Backend Folder

```bash
cd server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create `.env` File

Inside `server/`, create a `.env` file and add:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/urban_farming_db"
PORT=5000
JWT_SECRET="your_secret_key"
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run Migration

```bash
npx prisma migrate dev
```

### 7. Seed Database

```bash
npx prisma db seed
```

### 8. Start Development Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## 📘 API Documentation

Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

---

## 🔗 Important API Endpoints

### 🔐 Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### 🧑‍🌾 Vendor

* `POST /api/vendor/profile`
* `GET /api/vendor/profile/me`

### 📜 Certifications

* `POST /api/certifications`
* `GET /api/certifications/me`

### 🛍️ Products

* `POST /api/products`
* `GET /api/products`
* `GET /api/products/:id`

### 🏡 Rental Spaces

* `POST /api/rental-spaces`
* `GET /api/rental-spaces`
* `GET /api/rental-spaces/:id`

### 📦 Orders

* `POST /api/orders`
* `GET /api/orders/my-orders`
* `GET /api/orders/vendor-orders`

### 💬 Community Posts

* `POST /api/community-posts`
* `GET /api/community-posts`
* `GET /api/community-posts/:id`

---

## 🌱 Seed Data

The seed script inserts sample data for development and testing, including:

* Admin user
* Customer users
* Vendor users
* Vendor profiles
* Certifications
* Products

---

## 📌 Notes

* Ensure PostgreSQL is running before starting the server
* Update `.env` values according to your environment
* Use Swagger UI to test endpoints easily

---

## 🧾 License

This project is for educational purposes and assignment use.

---
