const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Configure MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});


// Add Shop - POST /Shops
app.post("/Shops", (req, res) => {
    const {shop_id,name,contactNumber,email,Address,city}= req.body;
    
 
    const query = "INSERT INTO bookshop (shop_id, name, contactNumber, email, Address, city) VALUES (?, ?, ?, ?, ?, ?)";
    
    connection.query(query, [shop_id, name, contactNumber, email, Address, city], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding new shop", details: err.message });
        }
        res.status(201).json({ message: "Shop has been added successfully." });
    });
});





//delete shopBook
app.delete("/Shops/:shop_id", (req, res) => {
    const query = "DELETE FROM bookshop WHERE shop_id = ?";
    
    connection.query(query, [req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the book", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book has been deleted" });
    });
});

//get all shopbook
app.get("/shops", (req, res) => {
    const query = "SELECT * FROM bookshop ";
    
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the shopbook", details: err.message });
        }
        res.json(result);
    });
});


//get shopbook by id 
app.get("/Shops/:shop_id",(req,res)=>{

    const query="select * from bookshop  WHERE shop_id = ?" 
    connection.query(query,[req.params.shop_id],(err,results)=>{
        if (err) {
            return res.status(500).json({ error: "Error retrieving the shopbook ", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "shopbook not found" });
        }
        res.json(results[0]);
    });
});

//get shopbook by city
app.get("/Shops/city/:city", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE LOWER(city) = LOWER(?)";

    connection.query(query, [req.params.city], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the shopbooks", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No shopbooks found in this city" });
        }
        res.json({
            count: results.length, 
            shops: results 
        });
    });
});


//get shopbook by name
app.get("/Shops/name/:name", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE LOWER(name) = LOWER(?)";

    connection.query(query, [req.params.name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the shopbooks", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No shopbooks found with this name" });
        }
        res.json({
            count: results.length, 
            shops: results 
        });
    });
});

//get shopbook by email
app.get("/Shops/email/:email", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE LOWER(email) = LOWER(?)";

    connection.query(query, [req.params.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the shopbooks", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No shopbooks found with this email" });
        }
        res.json({
            count: results.length, 
            shops: results 
        });
    });
});


// Update bookshop by ID -name 
app.put("/shops/:shop_id", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Missing required fields (name )" });
    }

    const query = "UPDATE bookshop SET name = ? WHERE shop_id = ?";
    
    connection.query(query, [name, req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating name of bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "bookshop not found" });
        }
        res.status(200).json({ message: "name of bookshop has been updated" });
    });
});

// Update bookshop by ID - email
app.put("/shopss/:shop_id", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Missing required fields (email)" });
    }

    const query = "UPDATE bookshop SET email = ? WHERE shop_id = ?";
    
    connection.query(query, [email, req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating email of bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "bookshop not found" });
        }
        res.status(200).json({ message: "email of bookshop has been updated" });
    });
});


// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`);
});
