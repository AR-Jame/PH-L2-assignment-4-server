
# 📚 Book Management API

A RESTful backend API built with **Node.js**, **TypeScript**, **MongoDB**, and **Mongoose** for managing books and handling borrow requests with quantity tracking and validations.

---

## ✨ Features

- 📖 Add, update, delete books
- 📦 Borrow books with quantity check
- 📊 Get summary of all borrowed books
- 📉 Auto-reduce available copies when borrowed
- 🔒 Validation using **Zod** & **Mongoose**
- 🚀 Deployed on **Vercel**

---

## 📦 Installation & Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AR-Jame/PH-L2-assignment-3
cd book-management-api
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file and add your variables like:

```
MONGODB_URI=your_mongodb_uri
PORT=4000
```

### 4️⃣ Run the project

```bash
npm run dev
```

> If you're using Bun, replace with:

```bash
bun run src/index.ts
```

---

## 🌐 Live API

🔗 **Production URL**:
[https://assignment-3-silk-gamma.vercel.app](https://assignment-3-silk-gamma.vercel.app)

---

## 🧪 API Endpoints

| Method | Endpoint      | Description                              |
| ------ | ------------- | ---------------------------------------- |
| POST   | `/api/books`  | Add a new book                           |
| GET    | `/api/books`  | Fetch all books                          |
| GET   | `/api/books/:bookId`  | Get a single book                           |
| UPDATE    | `/api/books/:bookId` | Update a book by it's id        |
| DELETE   | `/api/books/:bookId` |  Update a book by it's id |
| GET    | `/api/borrow` | Get summary of all borrowed books         |
| POST   | `/api/borrow` | Borrow a book (with quantity validation) |

---


## 📁 Project Structure

```
src/
├── controllers/       # Route logic
├── routes/            # API endpoints
├── models/            # Mongoose schemas
├── validations/       # Zod schema validations
├── interfaces/        # TypeScript types
└── server.ts           # Entry point
```

---

