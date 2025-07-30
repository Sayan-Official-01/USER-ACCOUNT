
# Fake User Insertion Script (Node.js + MySQL)

## 1. 📦 Packages Used
- **@faker-js/faker**: Generates fake/random user data (like usernames, emails, passwords).
- **mysql2**: Allows Node.js to connect to and interact with a MySQL database.

---

## 2. 🚀 How to Start MySQL Server
- Make sure MySQL is installed and the server is running.
- Start it via MySQL Workbench **OR** from Command Prompt:

```
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

- Or use the **Windows Services Panel** to manually start "MySQL".

---

## 3. 🏗️ Creating the Database and Table

### SQL Commands:
```sql
CREATE DATABASE delta_app;

CREATE TABLE user (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);
```

---

## 4. 🧠 What the Code Does
- Connects to the MySQL database named `delta_app`.
- Generates 10 fake users using the Faker library.
- Uses a bulk `INSERT INTO ... VALUES ?` query to insert all users at once.
- Handles any errors using `try/catch` and asynchronous callbacks.
- Closes the database connection after execution.

---

## 5. 🛠 How to Use This Script
1. Ensure your MySQL server is running.
2. Make sure the `delta_app` database and `user` table exist.
3. Run the script using Node.js:
```bash
node your_script.js
```

4. Check your database — 10 new fake users should be inserted.

---

## 👤 Author
*Your Name Here* (Replace with your actual name if needed)

------------------------------------------index.js-------------------------------------------------------

// Import required packages
const { faker } = require('@faker-js/faker'); // Used to generate fake/random user data
const mysql = require('mysql2'); // Used to connect and run queries on MySQL
const express = require('express'); // Web framework for Node.js (not used in this snippet but commonly used)
const app = express(); // Create an instance of Express app (not used in this snippet but commonly used)


// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',            // Database host (usually 'localhost' for local DB)
  user: 'root',                 // MySQL username (default is usually 'root')
  database: 'delta_app',        // Name of the database you're working with
  password: '@Sayanpaul721632'  // MySQL user password
});

// Function to generate one random user using faker
// Returns an array in the order: [id, username, email, password]
const getRandomUser = () => {
  return [
    faker.string.uuid(),           // Unique user ID
    faker.internet.userName(),     // Random username
    faker.internet.email(),        // Random email
    faker.internet.password(),     // Random password
  ];
};

// SQL query with placeholder to insert multiple rows
let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// Generate 10 random users and store them in an array
let data = [];
for (let i = 0; i < 10; i++) {
  data.push(getRandomUser()); // Push each generated user into the data array
}

// Execute the SQL insert query
try {
  // 'data' is passed as [data] to match the ? placeholder for bulk insert
  connection.query(q, [data], (err, result) => {
    if (err) {
      console.error("Query Error:", err.message); // Print error if query fails
    } else {
      console.log("Insert Success:", result);     // Show success result
    }
    connection.end(); // Close the database connection after query finishes
  });
} catch (err) {
  console.error("Try-Catch Error:", err.message); // Will only catch sync errors (rare here)
}

app.get('/', (req, res) => {
  res.send('welcome to the Delta App'); // Respond with a welcome message
});

app.listen(8080, () => {
  console.log("Server is running on port 8080"); // Start the Express server (not used in this snippet)
}); // Listen on port 3000
   

