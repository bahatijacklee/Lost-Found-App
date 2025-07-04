# 📚 Lost & Found App

A modern web application to help universities manage their campus lost and found items. Users can report lost or found items, search for items, and admins can verify or approve submissions.

---

## 🚀 Features

✅ **Lost & Found Management**

* Report lost or found items with details, categories, locations, and photos.
* Automated status updates (pending, verified, claimed).

✅ **Authentication**

* Secure login using JWT (JSON Web Tokens).
* Role-based access: Students vs. Admins.

✅ **Admin Dashboard**

* Approve or reject reported items.
* View statistics (items pending, verified, claimed, total users).

✅ **User Dashboard & Profile**

* Track your own items (lost, found, claimed).
* Edit or delete items.

✅ **Responsive UI**

* Built with React, Tailwind CSS, and Lucide Icons.
* Clean, mobile-friendly interface.

---

## 🏗 Tech Stack

### Frontend

* **React** + **TypeScript**
* **Tailwind CSS** for styling
* **React Router** for routing
* **Context API & custom hooks** for state
* **Lucide Icons**

### Backend

* **Node.js** + **Express.js**
* **MongoDB** (via Mongoose)
* **JWT** for authentication & authorization

---

## 📂 Directory Structure

```
src/
 ├── components/     # Reusable UI components (Badge, Button, Input, ItemCard, etc.)
 ├── context/        # AuthContext for managing user sessions
 ├── hooks/          # useItems hook for item state
 ├── pages/          # App pages (Dashboard, Search, Report, Admin, Profile, etc.)
 ├── types/          # TypeScript type definitions
 ├── App.tsx         # Root component
 ├── main.tsx        # Entry point
 └── index.css       # Tailwind styles
```

---

## ⚡ Getting Started

### 🔧 Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/your-username/lost-found-app.git
cd lost-found-app
npm install
```

---

### 🚀 Run Frontend Locally

Start the React frontend.

```bash
npm run dev
```

The app will start on: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Backend Setup

> You will implement the backend using **Node.js, Express.js, MongoDB, and JWT**.

1. Navigate to your backend directory:

```bash
cd backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file and add your environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:

```bash
npm start
```

Your API will run on: [http://localhost:5000](http://localhost:5000)

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## ✨ Credits

* Built with ❤️ by **Bahati Jacklee**
* Inspired by real campus needs to streamline lost & found processes.

---
