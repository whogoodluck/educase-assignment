# 📱 Educase Assignment – Pixel-Perfect React App

> A modern, pixel-perfect React application built from an Adobe XD design, demonstrating clean code practices, responsive UI, and seamless navigation.

## 🎯 Project Overview

This project was developed as part of a **React JS Intern/Fresher interview qualifier task**.
The goal was to accurately convert a provided **Adobe XD design** into a functional React application with **pixel-perfect UI**, smooth navigation, and clean, maintainable code.

The application centers a mobile app interface on the web, closely following the design specifications and best frontend development practices.

## 🎨 Design Reference

- **Adobe XD Design**:
  [https://xd.adobe.com/view/b68eea25-003d-4a5d-8fdd-d463eeb20b32-e3dd](https://xd.adobe.com/view/b68eea25-003d-4a5d-8fdd-d463eeb20b32-e3dd)

## 🚀 Live Demo

- **Hosted Application**:
  👉 [https://educase-assignment-igsg.onrender.com](https://educase-assignment-igsg.onrender.com)

## 💻 Source Code

- **GitHub Repository**:
  👉 [https://github.com/whogoodluck/educase-assignment](https://github.com/whogoodluck/educase-assignment)

## ✨ Features

### 📐 UI & UX

- Pixel-perfect implementation of the provided Adobe XD design
- Mobile app interface centered on the webpage
- Fully responsive layout
- Clean and consistent spacing, typography, and colors
- Smooth page navigation and transitions

### 🧭 Navigation

- Seamless navigation between pages
- Optimized routing for performance and user experience
- Intuitive user flow matching the design

### 🧪 Forms & Validation

- Form handling with **React Hook Form**
- Schema-based validation using **Zod**
- User-friendly validation messages
- Clean and accessible form UI

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL

## 📁 Project Structure

The project follows a **clean and scalable structure**, keeping frontend and backend concerns well separated and easy to maintain.

```
educase-assignment/
├── server/            # Backend (Node.js + Express + Prisma)
├── web/               # Frontend (React + TypeScript)
├── prisma/            # Prisma schema & migrations
├── README.md
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/whogoodluck/educase-assignment.git
cd educase-assignment
```

2. **Install Backend Dependencies**

```bash
npm install
```

3. **Install Frontend Dependencies**

```bash
cd web
npm install
```

4. **Environment Setup**

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/yourdb"
JWT_SECRET="YOUR_SECRET_KEY"
```

5. **Database Setup**

```bash
npx prisma migrate deploy
npx prisma generate
```

6. **Run the Application**

```bash
# Backend
npm run dev

# Frontend (inside /web)
npm run dev
```
