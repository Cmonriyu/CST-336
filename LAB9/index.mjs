import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using the POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "m31pldzuqfkiih8i",
    password: "l5xyy2sqwoq27e9m",
    database: "jq5kvtq9c9uc4en9",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.get("/quotesAboutLife ", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, authorId, firstName, lastName FROM quotes NATURAL JOIN authors WHERE quote LIKE '%life%'");
        res.render(results.ejs, rows)
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.get("/dbTest", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})