# SafePass: Your Secure Password Vault

SafePass is a secure and user-friendly password management web application. It enables users to store, retrieve, update, and delete passwords for different websites. The project is built using a modern tech stack to ensure an efficient, secure, and seamless experience.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

- **Password Management**: Add, update, and delete saved passwords.
- **Search Functionality**: Quickly find saved passwords by site name or username.
- **Secure Display**: Passwords are hidden by default but can be revealed when needed.
- **Copy Functionality**: Quickly copy site names, usernames, or passwords to the clipboard.
- **Responsive Design**: Works across various devices with a sleek, intuitive UI.

---

## Technologies Used

### Frontend

- React.js
- Tailwind CSS
- React Icons
- React Toastify for notifications
- Vite for fast development and builds

### Backend

- Express.js
- MongoDB (via the MongoDB Node.js Driver)
- dotenv for environment variable management
- Body-parser for parsing request payloads
- CORS for cross-origin resource sharing

---

## Setup and Installation

### Prerequisites

- Node.js installed on your system.
- MongoDB installed and running locally on `mongodb://localhost:27017`.

### Clone the Repository

```bash
git clone https://github.com/yourusername/safepass.git
cd safepass

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend

2.Install dependencies:
```bash
npm install

3.Start the server:
```bash
node index.js
The backend server will run on http://localhost:3000.

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend

2. Install dependencies:
```bash
npm install

3. Start the development server:
```bash
npm run dev

The frontend application will run on http://localhost:5173.

---

### Usage
1. Open the application in your browser at http://localhost:5173.
2. Use the input fields to add a new password.
3. View saved passwords in a table format.
4. Edit or delete passwords as needed.
5. Copy any data to the clipboard by clicking the copy icons.

---

### API Endpoints

Base URL: http://localhost:3000
1. Get all passwords

- Method: GET
- URL: /
- Description: Fetches all stored passwords.

2. Add a new password

- Method: POST
- URL: /
- Payload:
```json
{
  "site": "example.com",
  "username": "yourusername",
  "password": "yourpassword"
}

- Description: Adds a new password to the database.

3. Delete a password

- Method: DELETE
- URL: /
- Payload:
```json
{
  "id": "unique-id-of-password"
}

- Description: Deletes a password from the database.

---

### Future Enhancements
- Add user authentication for enhanced security.
- Implement encryption for stored passwords.
- Provide password strength analysis.
- Add dark mode support.
- Deploy the application to a live server.

---