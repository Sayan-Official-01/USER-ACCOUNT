const { faker } = require('@faker-js/faker'); 
const mysql = require('mysql2'); 
const express = require('express'); 
const app = express(); 
const path = require("path");
const methodoverride = require("method-override");

app.use(methodoverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',     
  user: 'root',     
  database: 'delta_app',   
  password: '@Sayanpaul721632'  
});

const getRandomUser = () => {
  return [
    faker.string.uuid(),      
    faker.internet.userName(),  
    faker.internet.email(),  
    faker.internet.password(),   
  ];
};

// Home Route
app.get('/', (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]['count(*)'];
      res.render("home", {count});
    });
  } catch (err) {
    console.error("Try-Catch Error:", err); 
  }
});


// Show Route
app.get('/user', (req, res) => {
  let q = `SELECT * FROM user`;
  try{
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers", {users});
    });
  } catch (err) {
    console.error("Try-Catch Error:", err); 
  }
});

// Edit Route
app.get('/user/:id/edit', (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit",{user});
    });
  } catch (err) {
    console.error("Try-Catch Error:", err); 
  }
});

// Update Route
app.patch('/user/:id', (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`

  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if ( user.password != formPass){
        res.send("wrong Password!");
      }else{
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.error("Try-Catch Error:", err); 
  }
});

// DELETE Route
app.delete('/user/:id', (req, res) => {
  let { id } = req.params;
  let q = `DELETE FROM user WHERE id = ?`;

  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (err) {
    console.error("Delete Error:", err);
    res.send("Error deleting user.");
  }
});


app.listen(8080, () => {
  console.log("Server is running on port 8080"); 
});

//  --> To generate fake value

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];
// for (let i = 0; i < 100; i++) {
//   data.push(getRandomUser()); 
// }

// try {
  
//   connection.query(q, [data], (err, result) => {
//     if (err) {
//       console.error("Query Error:", err.message);
//     } else {
//       console.log("Insert Success:", result);     
//     }
//     connection.end(); 
//   });
// } catch (err) {
//   console.error("Try-Catch Error:", err.message); 
// }

