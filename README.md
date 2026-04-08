# 📚 Bookstore

This is a full-stack project combining a bookstore system with user management. Users can sign up, log in, view books, and manage their account. Admin-like functionality allows managing books and users with create, update, and delete operations.

The project uses React for the frontend, Node.js/Express for the backend, and MySQL for the database.

## Features

### User Features
- Sign up and log in with email & password
- View list of books
- View book details (title, author, price, stock, description)
- Update personal details (name, email)

### Admin / Management Features
- Add, update, delete books
- View list of users
- Update or delete user accounts
- Dashboard with separate sections for Books and Users

## Tech Stack
- Frontend: React, JSX, CSS-in-JS
- Backend: Node.js, Express
- Database: MySQL
- HTTP Client: Axios

## Project Structure
bookstore-app/
├─ backend/
│  ├─ controllers/
│  │  ├─ authController.js
│  │  └─ userController.js
│  ├─ db.js
│  ├─ routes/
│  └─ server.js
├─ frontend/
│  └─ src/
│     ├─ App.jsx
│     └─ index.js
└─ README.md

## Installation & Running Locally
1. Clone the repo:
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-folder>

2.Install backend dependencies:
cd backend
npm install

3.Install frontend dependencies:
cd ../frontend
npm install

4.Create a MySQL database and update the db.js file with your credentials.

5.Start the backend:
cd ../backend
npm start

6.Start the frontend:
cd ../frontend
npm start

7.Open your browser and navigate to http://localhost:3000.

# Screenshot of Project 

![Bookstore](screenshot_of_project/bookstore.png)  
Bookstore page where new books can be added with details such as title, author, and price.

![Dashboard](screenshot_of_project/Dashboard.png)  
Dashboard page that acts as the main navigation hub, allowing you to choose between user management or bookstore features.

![Delete/Update](screenshot_of_project/delete_update.png)  
Page for deleting or updating existing book records, ensuring the catalog stays accurate.

![Description](screenshot_of_project/description.png)  
Detailed description page showing complete information about a selected book.

![Login](screenshot_of_project/Login.png)  
Login page for existing users to securely access their accounts.

![Signup](screenshot_of_project/Signup.png)  
Signup page where new users can register by entering their details before accessing the system.

![Update Book](screenshot_of_project/Updatebook.png)  
Update book page that allows editing and modifying book details already in the catalog.

![Users](screenshot_of_project/Users.png)  
User management page where admins can delete or update user accounts.




Built by Anchal Bisht
